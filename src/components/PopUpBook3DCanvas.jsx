import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createOpenPageTexture,
  createPaperEdgeTexture,
  createBackCloudsLayerTexture,
  createMidBackVillageTexture,
  createArchedHillTexture,
  createPondFloraLayerTexture,
  createBridgeStripTexture,
  createStandeeTexture
} from './popUpArtTextures';

/**
 * Membangun geometri halaman buku melengkung 3D (Curved Open Book Page)
 */
function createCurvedPageGeometry(width, depth, segX, segZ, side) {
  const geo = new THREE.PlaneGeometry(width, depth, segX, segZ);
  geo.rotateX(-Math.PI / 2);

  // Geser pivot ke tepi jilid tengah (x = 0)
  const shiftX = side === 'right' ? width / 2 : -width / 2;
  geo.translate(shiftX, 0, 0);

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const u = Math.abs(x) / width; // 0 di jilid tengah, 1 di tepi luar
    // Kurva lengkungan kertas buku terbuka yang alami
    const archY = Math.sin(u * Math.PI) * 0.24 * (1 - 0.22 * u) + u * 0.03;
    pos.setY(i, archY);
  }
  geo.computeVertexNormals();
  return geo;
}

/**
 * Panggung WebGL Three.js untuk Buku Pop-Up 3D Nyata
 * Mendukung lipatan buka-tutup mekanis, bayangan lembut antar kertas,
 * halaman melengkung 3D, animasi balik halaman melingkar, dan orbit kamera bebas.
 */
export default function PopUpBook3DCanvas({
  park,
  extras,
  isBookOpen,
  flipDirection,
  flipTriggerId,
  onToggleBook
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    isBookOpen,
    openProgress: isBookOpen ? 1 : 0,
    unfoldProgress: isBookOpen ? 1 : 0,
    flipProgress: -1, // -1 = idle, 0..1 = aktif membalik halaman
    flipDir: 'next',
    targetAzimuth: 0,
    targetElevation: 0.44, // ~25 derajat di atas meja
    currentAzimuth: 0,
    currentElevation: 0.44,
    hoverOffsetAz: 0,
    hoverOffsetEl: 0,
    isDragging: false,
    hasDragged: false,
    lastPointer: { x: 0, y: 0 },
    velAz: 0,
    velEl: 0
  });

  const sceneRefs = useRef(null);

  // Sinkronkan status buka/tutup buku dari props
  useEffect(() => {
    stateRef.current.isBookOpen = isBookOpen;
  }, [isBookOpen]);

  // Sinkronkan perubahan bab Taman Nasional & picu animasi balik halaman 3D
  useEffect(() => {
    if (!sceneRefs.current) return;
    const { updateTextures } = sceneRefs.current;

    if (flipTriggerId > 0) {
      stateRef.current.flipProgress = 0;
      stateRef.current.flipDir = flipDirection || 'next';
      // Lipat diorama sejenak lalu buka kembali setelah halaman membalik
      setTimeout(() => {
        updateTextures(park, extras);
      }, 280);
    } else {
      updateTextures(park, extras);
    }
  }, [park, extras, flipTriggerId, flipDirection]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 540;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 60);
    camera.position.set(0, 4.2, 10.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Pencahayaan Studio Lembut + Bayangan Nyata
    const hemiLight = new THREE.HemisphereLight(0xfcfdff, 0x8795a1, 1.05);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff4e0, 1.65);
    sunLight.position.set(5.5, 9.5, 6.5);
    sunLight.castShadow = true;
    const shadowRes = window.innerWidth < 768 ? 512 : 1024;
    sunLight.shadow.mapSize.width = shadowRes;
    sunLight.shadow.mapSize.height = shadowRes;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 26;
    const d = 6.5;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    sunLight.shadow.normalBias = 0.025;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xdbeafe, 0.5);
    rimLight.position.set(-6, 5, -5);
    scene.add(rimLight);

    // 3. Meja Studio Penangkap Bayangan
    const tablePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(36, 36),
      new THREE.ShadowMaterial({ opacity: 0.22 })
    );
    tablePlane.rotation.x = -Math.PI / 2;
    tablePlane.position.y = -0.32;
    tablePlane.receiveShadow = true;
    scene.add(tablePlane);

    // 4. Grup Utama Buku 3D
    const bookRoot = new THREE.Group();
    bookRoot.position.y = -0.05;
    scene.add(bookRoot);

    // Material Hardcover Merah-Terakota & Tepi Kertas
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0xa83820,
      roughness: 0.72,
      metalness: 0.04
    });
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0x842613,
      roughness: 0.75,
      metalness: 0.04
    });
    const paperEdgeTex = createPaperEdgeTexture();
    const paperEdgeMat = new THREE.MeshStandardMaterial({
      map: paperEdgeTex,
      roughness: 0.9
    });
    const creamUnderMat = new THREE.MeshStandardMaterial({
      color: 0xf4ebd9,
      roughness: 0.88
    });

    // Punggung Tengah Hardcover
    const spineMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 5.46, 20, 1, false, 0, Math.PI),
      spineMat
    );
    spineMesh.rotation.z = Math.PI / 2;
    spineMesh.rotation.y = Math.PI / 2;
    spineMesh.position.y = -0.18;
    spineMesh.castShadow = true;
    spineMesh.receiveShadow = true;
    bookRoot.add(spineMesh);

    // --- SAYAP KANAN BUKU ---
    const rightWingGroup = new THREE.Group();
    bookRoot.add(rightWingGroup);

    const rightCover = new THREE.Mesh(
      new THREE.BoxGeometry(4.36, 0.12, 5.46),
      coverMat
    );
    rightCover.position.set(2.22, -0.22, 0);
    rightCover.castShadow = true;
    rightCover.receiveShadow = true;
    rightWingGroup.add(rightCover);

    const rightPaperBlock = new THREE.Mesh(
      new THREE.BoxGeometry(4.12, 0.22, 5.16),
      [paperEdgeMat, creamUnderMat, creamUnderMat, creamUnderMat, paperEdgeMat, paperEdgeMat]
    );
    rightPaperBlock.position.set(2.08, -0.06, 0);
    rightPaperBlock.castShadow = true;
    rightPaperBlock.receiveShadow = true;
    rightWingGroup.add(rightPaperBlock);

    const rightPageGeo = createCurvedPageGeometry(4.15, 5.18, 28, 12, 'right');
    const rightPageMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.88,
      metalness: 0.0
    });
    const rightPageMesh = new THREE.Mesh(rightPageGeo, rightPageMat);
    rightPageMesh.position.y = 0.05;
    rightPageMesh.receiveShadow = true;
    rightWingGroup.add(rightPageMesh);

    // --- SAYAP KIRI BUKU (BERENGSEL BUKA/TUTUP) ---
    const leftWingGroup = new THREE.Group();
    bookRoot.add(leftWingGroup);

    const leftCover = new THREE.Mesh(
      new THREE.BoxGeometry(4.36, 0.12, 5.46),
      coverMat
    );
    leftCover.position.set(-2.22, -0.22, 0);
    leftCover.castShadow = true;
    leftCover.receiveShadow = true;
    leftWingGroup.add(leftCover);

    const leftPaperBlock = new THREE.Mesh(
      new THREE.BoxGeometry(4.12, 0.22, 5.16),
      [creamUnderMat, paperEdgeMat, creamUnderMat, creamUnderMat, paperEdgeMat, paperEdgeMat]
    );
    leftPaperBlock.position.set(-2.08, -0.06, 0);
    leftPaperBlock.castShadow = true;
    leftPaperBlock.receiveShadow = true;
    leftWingGroup.add(leftPaperBlock);

    const leftPageGeo = createCurvedPageGeometry(4.15, 5.18, 28, 12, 'left');
    const leftPageMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.88,
      metalness: 0.0
    });
    const leftPageMesh = new THREE.Mesh(leftPageGeo, leftPageMat);
    leftPageMesh.position.y = 0.05;
    leftPageMesh.receiveShadow = true;
    leftWingGroup.add(leftPageMesh);

    // --- LEMBARAN KERTAS MEMBALIK 3D (DYNAMIC CURLING SHEET) ---
    const flipGeo = new THREE.PlaneGeometry(4.12, 5.16, 30, 10);
    flipGeo.rotateX(-Math.PI / 2);
    flipGeo.translate(2.06, 0, 0);
    const flipBasePos = flipGeo.attributes.position.array.slice();
    const flipMat = new THREE.MeshStandardMaterial({
      color: 0xfbf7ee,
      roughness: 0.85,
      side: THREE.DoubleSide
    });
    const flipSheetMesh = new THREE.Mesh(flipGeo, flipMat);
    flipSheetMesh.position.y = 0.08;
    flipSheetMesh.visible = false;
    flipSheetMesh.castShadow = true;
    flipSheetMesh.receiveShadow = true;
    bookRoot.add(flipSheetMesh);

    // 5. GRUP DIORAMA POP-UP KERTAS 3D BERLAPIS
    const dioramaGroup = new THREE.Group();
    dioramaGroup.position.set(0, 0.14, -0.22);
    bookRoot.add(dioramaGroup);

    const makePopUpPlane = (w, h, zPos, xPos = 0, rotY = 0) => {
      const geo = new THREE.PlaneGeometry(w, h);
      geo.translate(0, h / 2, 0);
      const mat = new THREE.MeshStandardMaterial({
        transparent: false,
        alphaTest: 0.42,
        side: THREE.DoubleSide,
        roughness: 0.86,
        metalness: 0.01
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(xPos, 0, zPos);
      mesh.rotation.y = rotY;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      dioramaGroup.add(mesh);
      return { mesh, mat, baseRotY: rotY };
    };

    // Lapisan Pop-Up Utama (dari belakang ke depan)
    const layerBackClouds = makePopUpPlane(7.2, 3.55, -1.78);
    const layerMidVillage = makePopUpPlane(6.8, 3.35, -1.04);
    const layerArchedHill = makePopUpPlane(6.4, 2.85, -0.26);
    const layerPondFlora = makePopUpPlane(6.9, 2.55, 0.48);

    // Sayap Tebing Samping Miring (membuat bukit melingkar 3D nyata saat di-orbit)
    const hillWingLeft = makePopUpPlane(2.1, 1.5, -0.08, -2.05, 0.42);
    const hillWingRight = makePopUpPlane(2.1, 1.5, -0.08, 2.05, -0.42);

    // Jembatan Gantung Kertas Diagonal 3D (menghubungkan bukit ke lipatan tengah)
    const bridgeLeft = makePopUpPlane(2.35, 0.72, 0.86, -1.32, -0.32);
    bridgeLeft.mesh.rotation.z = -0.22;

    const bridgeRight = makePopUpPlane(2.25, 0.72, 0.92, 1.28, 0.34);
    bridgeRight.mesh.rotation.z = 0.20;

    // Kolam Air Biru 3D Mendatar di Atas Halaman Kanan
    const pondDiscGeo = new THREE.CircleGeometry(0.88, 32);
    pondDiscGeo.rotateX(-Math.PI / 2);
    const pondMat = new THREE.MeshStandardMaterial({
      color: 0x219ebc,
      roughness: 0.32,
      metalness: 0.08
    });
    const pondMesh = new THREE.Mesh(pondDiscGeo, pondMat);
    pondMesh.position.set(0.82, 0.13, 0.35);
    pondMesh.receiveShadow = true;
    dioramaGroup.add(pondMesh);

    // Standee Kertas Depan (Satwa Kunci, Penjaga Hutan, & Jamur Putih)
    const standeeFauna = makePopUpPlane(1.18, 1.18, 1.24, -0.28, 0.08);
    const standeeRanger = makePopUpPlane(0.95, 0.95, 1.38, 1.72, -0.14);
    const standeeMushroom = makePopUpPlane(0.82, 0.82, 1.48, -1.92, 0.16);

    const popUpLayers = [
      { item: layerBackClouds, delay: 0.0 },
      { item: layerMidVillage, delay: 0.1 },
      { item: layerArchedHill, delay: 0.18 },
      { item: hillWingLeft, delay: 0.2 },
      { item: hillWingRight, delay: 0.2 },
      { item: layerPondFlora, delay: 0.28 },
      { item: bridgeLeft, delay: 0.34 },
      { item: bridgeRight, delay: 0.34 },
      { item: standeeFauna, delay: 0.42 },
      { item: standeeRanger, delay: 0.46 },
      { item: standeeMushroom, delay: 0.48 }
    ];

    // Fungsi pembaruan tekstur sesuai bab Taman Nasional
    const updateTextures = (activePark, activeExtras) => {
      const disposeAndSet = (mat, newTex) => {
        if (mat.map && mat.map !== newTex) mat.map.dispose();
        mat.map = newTex;
        mat.needsUpdate = true;
      };

      disposeAndSet(leftPageMat, createOpenPageTexture('left', activePark, activeExtras));
      disposeAndSet(rightPageMat, createOpenPageTexture('right', activePark, activeExtras));
      disposeAndSet(layerBackClouds.mat, createBackCloudsLayerTexture(activePark, activeExtras));
      disposeAndSet(layerMidVillage.mat, createMidBackVillageTexture(activePark, activeExtras));

      const hillTex = createArchedHillTexture(activePark, activeExtras);
      disposeAndSet(layerArchedHill.mat, hillTex);
      hillWingLeft.mat.map = hillTex;
      hillWingLeft.mat.needsUpdate = true;
      hillWingRight.mat.map = hillTex;
      hillWingRight.mat.needsUpdate = true;

      disposeAndSet(layerPondFlora.mat, createPondFloraLayerTexture(activePark, activeExtras));

      const bridgeTex = createBridgeStripTexture(activePark, activeExtras);
      disposeAndSet(bridgeLeft.mat, bridgeTex);
      bridgeRight.mat.map = bridgeTex;
      bridgeRight.mat.needsUpdate = true;

      disposeAndSet(standeeFauna.mat, createStandeeTexture('fauna', activePark, activeExtras));
      disposeAndSet(standeeRanger.mat, createStandeeTexture('ranger', activePark, activeExtras));
      disposeAndSet(standeeMushroom.mat, createStandeeTexture('mushroom', activePark, activeExtras));

      pondMat.color.set(activeExtras.dioramaTheme.waterTop);
    };

    updateTextures(park, extras);
    sceneRefs.current = { updateTextures };

    // 6. Interaksi Pointer (Drag untuk Memutar Kamera 3D + Hover Parallax)
    const domEl = renderer.domElement;

    const onPointerDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.hasDragged = false;
      stateRef.current.lastPointer = { x: e.clientX, y: e.clientY };
      stateRef.current.velAz = 0;
      stateRef.current.velEl = 0;
    };

    const onPointerMove = (e) => {
      const st = stateRef.current;
      if (st.isDragging) {
        const dx = e.clientX - st.lastPointer.x;
        const dy = e.clientY - st.lastPointer.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          st.hasDragged = true;
        }
        st.lastPointer = { x: e.clientX, y: e.clientY };

        const dAz = -dx * 0.0055;
        const dEl = dy * 0.0045;
        st.targetAzimuth = Math.max(-0.88, Math.min(0.88, st.targetAzimuth + dAz));
        st.targetElevation = Math.max(0.22, Math.min(0.95, st.targetElevation + dEl));
        st.velAz = dAz * 0.55;
        st.velEl = dEl * 0.55;
      } else {
        const rect = domEl.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        st.hoverOffsetAz = nx * 0.18;
        st.hoverOffsetEl = ny * 0.09;
      }
    };

    const onPointerUp = () => {
      if (!stateRef.current.isDragging) return;
      stateRef.current.isDragging = false;
      if (!stateRef.current.hasDragged && !stateRef.current.isBookOpen && onToggleBook) {
        onToggleBook();
      }
    };

    const onPointerLeave = () => {
      stateRef.current.isDragging = false;
      stateRef.current.hoverOffsetAz = 0;
      stateRef.current.hoverOffsetEl = 0;
    };

    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domEl.addEventListener('pointerleave', onPointerLeave);

    // 7. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth || 900;
      const nh = container.clientHeight || 540;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // 8. Loop Animasi 60 FPS (Fisika Lipatan Pop-Up, Halaman Membalik, & Orbit Halus)
    let animId = null;
    let isVisible = true;
    const startTimeMs = performance.now();
    let lastTimeMs = startTimeMs;

    const animate = () => {
      if (!isVisible) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(animate);
      const nowMs = performance.now();
      const dt = Math.min((nowMs - lastTimeMs) / 1000, 0.05);
      lastTimeMs = nowMs;
      const elapsed = (nowMs - startTimeMs) / 1000;
      const st = stateRef.current;

      // Inersia kamera setelah drag dilepas
      if (!st.isDragging) {
        st.targetAzimuth = Math.max(-0.88, Math.min(0.88, st.targetAzimuth + st.velAz));
        st.targetElevation = Math.max(0.22, Math.min(0.95, st.targetElevation + st.velEl));
        st.velAz *= 0.91;
        st.velEl *= 0.91;
      }

      const desiredAz = st.targetAzimuth + st.hoverOffsetAz;
      const desiredEl = st.targetElevation + st.hoverOffsetEl;
      st.currentAzimuth += (desiredAz - st.currentAzimuth) * 0.1;
      st.currentElevation += (desiredEl - st.currentElevation) * 0.1;

      const camRadius = st.isBookOpen ? 11.2 : 9.4;
      camera.position.x = Math.sin(st.currentAzimuth) * Math.cos(st.currentElevation) * camRadius;
      camera.position.y = Math.sin(st.currentElevation) * camRadius + 0.65;
      camera.position.z = Math.cos(st.currentAzimuth) * Math.cos(st.currentElevation) * camRadius;
      camera.lookAt(st.isBookOpen ? 0 : 1.1, st.isBookOpen ? 0.95 : 0.15, 0);

      // Animasi buka/tutup sampul buku
      const targetOpen = st.isBookOpen ? 1 : 0;
      st.openProgress += (targetOpen - st.openProgress) * 0.09;

      // Sayap kiri berotasi dari tertutup (Math.PI) ke terbuka penuh (0)
      leftWingGroup.rotation.z = -(1 - st.openProgress) * Math.PI;
      rightWingGroup.rotation.z = 0;

      // Animasi lipatan diorama pop-up (terlipat saat buku menutup atau sedang membalik halaman)
      const isFlipping = st.flipProgress >= 0;
      const targetUnfold = st.isBookOpen && !isFlipping ? 1 : 0;
      st.unfoldProgress += (targetUnfold - st.unfoldProgress) * 0.11;

      popUpLayers.forEach(({ item, delay }, idx) => {
        const localProgress = Math.max(
          0,
          Math.min(1, (st.unfoldProgress - delay * 0.45) / (1 - delay * 0.45))
        );
        // Berdiri dari rebahan (-PI/2) menuju tegak (0)
        const baseFoldX = -(1 - localProgress) * (Math.PI * 0.48);
        // Getaran angin kertas halus agar terasa hidup
        const breeze = localProgress > 0.85 ? Math.sin(elapsed * 1.5 + idx * 0.9) * 0.012 : 0;
        item.mesh.rotation.x = baseFoldX + breeze;
        item.mesh.scale.y = 0.05 + 0.95 * localProgress;
        item.mesh.visible = localProgress > 0.02;
      });

      pondMesh.scale.setScalar(0.01 + 0.99 * st.unfoldProgress);
      pondMesh.visible = st.unfoldProgress > 0.05;

      // Animasi 3D Balik Halaman Melingkar (Page Curl Mesh)
      if (isFlipping) {
        st.flipProgress += dt * 1.45;
        if (st.flipProgress >= 1) {
          st.flipProgress = -1;
          flipSheetMesh.visible = false;
        } else {
          flipSheetMesh.visible = true;
          const p = st.flipDir === 'next' ? st.flipProgress : 1 - st.flipProgress;
          const sweepAngle = p * Math.PI;
          const posAttr = flipGeo.attributes.position;

          for (let i = 0; i < posAttr.count; i++) {
            const bx = flipBasePos[i * 3];
            const bz = flipBasePos[i * 3 + 2];
            const u = bx / 4.12;
            const bend = Math.sin(p * Math.PI) * Math.sin(u * Math.PI) * 0.65;
            const angle = sweepAngle + bend * 0.45;

            const nx = Math.cos(angle) * bx;
            const ny = Math.sin(angle) * bx + Math.sin(p * Math.PI) * 0.25;
            posAttr.setXYZ(i, nx, ny, bz);
          }
          posAttr.needsUpdate = true;
          flipGeo.computeVertexNormals();
        }
      }

      renderer.render(scene, camera);
    };

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisible = entry.isIntersecting;
        if (isVisible && animId === null) {
          lastTimeMs = performance.now();
          animate();
        }
      },
      { rootMargin: '120px 0px' }
    );
    visibilityObserver.observe(container);

    animate();

    return () => {
      isVisible = false;
      if (animId) cancelAnimationFrame(animId);
      visibilityObserver.disconnect();
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domEl.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="popup-webgl-canvas-wrap"
      aria-label="Kanvas 3D Interaktif Buku Pop-Up"
    />
  );
}

