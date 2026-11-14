import * as THREE from 'three';

/**
 * Generator tekstur kertas kerajinan (paper-craft) realistis untuk Buku Pop-Up 3D.
 * Setiap bab Taman Nasional (park.id) menghasilkan siluet lanskap, bangunan,
 * vegetasi, jembatan, dan standee satwa/peneliti yang berbeda-beda.
 */

function addPaperGrain(ctx, width, height, alpha = 0.045) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 20) continue;
    const noise = ((Math.sin(i * 12.9898) * 43758.5453) % 1) * 28 - 14;
    const shift = noise * alpha * 12;
    data[i] = Math.max(0, Math.min(255, data[i] + shift));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + shift));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + shift));
  }
  ctx.putImageData(imgData, 0, 0);
}

function createCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return { canvas, ctx: canvas.getContext('2d') };
}

function toTexture(canvas) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function getParkId(park) {
  return park?.id || 'tn-ujung-kulon';
}

function drawLayeredFoliage(ctx, cx, cy, r, lightCol, midCol, darkCol, rimCol) {
  ctx.save();
  ctx.shadowColor = 'rgba(20, 32, 22, 0.24)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 5;

  // Rim backing kertas krem tipis
  if (rimCol) {
    ctx.fillStyle = rimCol;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Bayangan kanopi dasar
  const baseGrad = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.28, r * 0.12, cx, cy, r);
  baseGrad.addColorStop(0, lightCol);
  baseGrad.addColorStop(0.55, midCol);
  baseGrad.addColorStop(1, darkCol);
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Rumpun daun kecil berlapis untuk tekstur realistis
  const tufts = [
    [-0.36, -0.22, 0.48, lightCol],
    [0.28, -0.28, 0.44, lightCol],
    [-0.18, 0.28, 0.42, midCol],
    [0.34, 0.2, 0.4, darkCol]
  ];
  tufts.forEach(([ox, oy, sr, col]) => {
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(cx + ox * r, cy + oy * r, r * sr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Highlight tepi daun bagian atas
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.86, Math.PI * 1.12, Math.PI * 1.82);
  ctx.stroke();
  ctx.restore();
}

function drawRealisticTrunk(ctx, x, topY, bottomY, width, barkDark = '#3f2a1d', barkLight = '#6e4c36') {
  const g = ctx.createLinearGradient(x - width / 2, topY, x + width / 2, topY);
  g.addColorStop(0, barkDark);
  g.addColorStop(0.45, barkLight);
  g.addColorStop(1, barkDark);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(x - width * 0.42, topY);
  ctx.lineTo(x + width * 0.42, topY);
  ctx.lineTo(x + width * 0.65, bottomY);
  ctx.lineTo(x - width * 0.65, bottomY);
  ctx.closePath();
  ctx.fill();

  // Serat kulit kayu vertikal
  ctx.save();
  ctx.strokeStyle = 'rgba(25, 16, 10, 0.35)';
  ctx.lineWidth = 1.6;
  for (let i = -2; i <= 2; i++) {
    const lx = x + i * (width * 0.16);
    ctx.beginPath();
    ctx.moveTo(lx, topY + 10);
    ctx.quadraticCurveTo(lx + (i % 2 === 0 ? 3 : -3), (topY + bottomY) / 2, lx, bottomY - 8);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPalmTree(ctx, x, y, height, leanX, theme) {
  ctx.save();
  // Batang melengkung beruas
  ctx.strokeStyle = '#6c4f37';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + leanX * 0.45, y - height * 0.52, x + leanX, y - height);
  ctx.stroke();

  ctx.strokeStyle = '#9c7858';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x - 2, y);
  ctx.quadraticCurveTo(x + leanX * 0.45 - 2, y - height * 0.52, x + leanX - 2, y - height);
  ctx.stroke();

  // Pelepah daun palem / lontar
  const topX = x + leanX;
  const topY = y - height;
  const angles = [-2.6, -2.0, -1.4, -0.7, -0.1, 0.45];
  angles.forEach((ang, idx) => {
    ctx.save();
    ctx.translate(topX, topY);
    ctx.rotate(ang);
    ctx.fillStyle = idx % 2 === 0 ? theme.canopyMid : theme.canopyLight;
    ctx.strokeStyle = theme.canopyDark;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(38, -18, 78, 8);
    ctx.quadraticCurveTo(38, 10, 0, 0);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });
  ctx.restore();
}

function drawPaperCutRim(ctx, pathFn, rimColor, shadowAlpha = 0.24) {
  ctx.save();
  ctx.shadowColor = `rgba(34, 24, 14, ${shadowAlpha})`;
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 6;
  ctx.strokeStyle = rimColor;
  ctx.lineWidth = 10;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  pathFn();
  ctx.stroke();
  ctx.restore();
}

/**
 * Tekstur halaman buku cetak (kertas krem berserat, ilustrasi cat air sesuai bab, & tipografi)
 */
export function createOpenPageTexture(side, park, extras) {
  const { canvas, ctx } = createCanvas(1024, 1024);
  const theme = extras.dioramaTheme;
  const parkId = getParkId(park);

  // Dasar kertas krem hangat dengan bayangan lipatan jilid tengah
  const paperGrad = ctx.createLinearGradient(
    side === 'left' ? 1024 : 0,
    0,
    side === 'left' ? 0 : 1024,
    0
  );
  paperGrad.addColorStop(0, '#c8b99e');
  paperGrad.addColorStop(0.06, '#ece2cf');
  paperGrad.addColorStop(0.24, '#fbf7ee');
  paperGrad.addColorStop(0.93, '#f7f1e3');
  paperGrad.addColorStop(1, '#e6dac3');
  ctx.fillStyle = paperGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Latar cat air bioma di bagian atas halaman
  const lawnGrad = ctx.createRadialGradient(
    side === 'left' ? 760 : 260,
    380,
    40,
    side === 'left' ? 620 : 400,
    420,
    560
  );
  lawnGrad.addColorStop(0, theme.canopyLight);
  lawnGrad.addColorStop(0.55, parkId === 'tn-lorentz' ? '#cbd5e1' : parkId === 'tn-komodo' ? '#ead2ac' : '#c9d9a7');
  lawnGrad.addColorStop(1, 'rgba(251, 247, 238, 0)');
  ctx.fillStyle = lawnGrad;
  ctx.fillRect(0, 40, 1024, 650);

  // Elemen air / jalur khusus bab di permukaan halaman
  ctx.save();
  ctx.globalAlpha = 0.62;
  ctx.fillStyle = side === 'right' ? theme.waterTop : theme.hillUpper;
  ctx.beginPath();
  if (side === 'right') {
    ctx.ellipse(420, 440, 210, 118, -0.15, 0, Math.PI * 2);
  } else {
    ctx.ellipse(620, 460, 215, 98, 0.12, 0, Math.PI * 2);
  }
  ctx.fill();

  // Riak air atau alur batu di halaman
  ctx.strokeStyle = 'rgba(255,255,255,0.45)';
  ctx.lineWidth = 3;
  if (side === 'right') {
    ctx.beginPath();
    ctx.ellipse(420, 440, 155, 78, -0.15, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // Bingkai garis ganda ala buku ensiklopedia klasik
  ctx.strokeStyle = 'rgba(130, 114, 90, 0.24)';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, 952, 952);
  ctx.strokeStyle = 'rgba(130, 114, 90, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(48, 48, 928, 928);

  // Kolom teks cetak di bagian depan/bawah halaman sesuai bab aktif
  ctx.fillStyle = '#473d31';
  ctx.font = 'bold 26px Georgia, serif';
  const headerText =
    side === 'left'
      ? `${park.name.toUpperCase()}  |  ${park.province}`
      : `${extras.ecoRole.toUpperCase()}`;
  ctx.fillText(headerText.slice(0, 48), 88, 738);

  // Subjudul bab
  ctx.fillStyle = '#736553';
  ctx.font = 'italic 20px Georgia, serif';
  const subText =
    side === 'left'
      ? extras.biomeSubtitle || ''
      : `Spesies Kunci: ${extras.dioramaTheme.faunaLabel}`;
  ctx.fillText(subText.slice(0, 62), 88, 770);

  // Garis-garis teks cetak tipografi buku
  ctx.fillStyle = 'rgba(74, 64, 52, 0.58)';
  const lineWidths = [820, 795, 830, 750, 810, 610];
  lineWidths.forEach((lw, idx) => {
    const y = 804 + idx * 24;
    ctx.fillRect(88, y, lw, 5);
  });

  // Footer halaman
  ctx.fillStyle = 'rgba(90, 80, 67, 0.72)';
  ctx.font = 'italic 21px Georgia, serif';
  ctx.fillText(
    side === 'left' ? 'Atlas Ekologi Nusantara' : extras.globalIssue?.tag || 'Konservasi Biosfer',
    side === 'left' ? 88 : 640,
    968
  );

  addPaperGrain(ctx, 1024, 1024, 0.038);
  return toTexture(canvas);
}

/**
 * Tekstur tepi tumpukan kertas buku berlapis-lapis
 */
export function createPaperEdgeTexture() {
  const { canvas, ctx } = createCanvas(512, 128);
  ctx.fillStyle = '#ebe1ce';
  ctx.fillRect(0, 0, 512, 128);
  for (let y = 0; y < 128; y += 4) {
    ctx.fillStyle = y % 8 === 0 ? '#d8ccb5' : '#f7f1e3';
    ctx.fillRect(0, y, 512, 2);
  }
  addPaperGrain(ctx, 512, 128, 0.03);
  return toTexture(canvas);
}

/**
 * LAPIS 1 (PALING BELAKANG): Awan, Pegunungan/Gunung Api/Gletser, & Pohon Cakrawala per Bab
 */
export function createBackCloudsLayerTexture(park, extras) {
  const { canvas, ctx } = createCanvas(1280, 640);
  const theme = extras.dioramaTheme;
  const parkId = getParkId(park);

  // Awan kertas die-cut lembut di kiri & kanan
  const drawCloud = (cx, cy, scale) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.shadowColor = 'rgba(40, 32, 24, 0.16)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 5;
    ctx.fillStyle = theme.skyCloud;
    ctx.strokeStyle = '#d8cbb5';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 45, 58, Math.PI * 0.5, Math.PI * 1.5);
    ctx.arc(54, 14, 52, Math.PI, Math.PI * 2);
    ctx.arc(118, 22, 46, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(166, 48, 42, Math.PI * 1.5, Math.PI * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  drawCloud(80, 185, 1.05);
  drawCloud(960, 175, 1.0);

  if (parkId === 'tn-lorentz') {
    // Puncak Jaya & Gletser Salju Abadi Papua
    const drawSnowPeak = (px, py, w, h) => {
      ctx.save();
      drawPaperCutRim(ctx, () => {
        ctx.moveTo(px - w / 2, py + h);
        ctx.lineTo(px, py);
        ctx.lineTo(px + w / 2, py + h);
        ctx.closePath();
      }, theme.skyCloud);

      const rockG = ctx.createLinearGradient(px - w / 2, py, px + w / 2, py + h);
      rockG.addColorStop(0, '#475569');
      rockG.addColorStop(0.55, '#334155');
      rockG.addColorStop(1, '#1e293b');
      ctx.fillStyle = rockG;
      ctx.beginPath();
      ctx.moveTo(px - w / 2, py + h);
      ctx.lineTo(px, py);
      ctx.lineTo(px + w / 2, py + h);
      ctx.closePath();
      ctx.fill();

      // Kubah gletser salju putih kebiruan
      const snowG = ctx.createLinearGradient(px, py, px, py + h * 0.48);
      snowG.addColorStop(0, '#ffffff');
      snowG.addColorStop(1, '#bae6fd');
      ctx.fillStyle = snowG;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - w * 0.24, py + h * 0.45);
      ctx.lineTo(px - w * 0.08, py + h * 0.36);
      ctx.lineTo(px + w * 0.04, py + h * 0.48);
      ctx.lineTo(px + w * 0.24, py + h * 0.42);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };
    drawSnowPeak(470, 120, 360, 510);
    drawSnowPeak(750, 75, 420, 555);
  } else if (parkId === 'tn-kerinci-seblat') {
    // Kerucut Gunung Api Kerinci Berkabut
    ctx.save();
    const volG = ctx.createLinearGradient(440, 85, 860, 630);
    volG.addColorStop(0, '#3a5a40');
    volG.addColorStop(0.6, '#2d4a36');
    volG.addColorStop(1, '#1b4332');
    ctx.fillStyle = volG;
    ctx.strokeStyle = theme.skyCloud;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(310, 630);
    ctx.quadraticCurveTo(510, 300, 600, 95);
    ctx.lineTo(665, 95);
    ctx.quadraticCurveTo(760, 300, 970, 630);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Kepulan kabut/asap kawah halus
    ctx.fillStyle = 'rgba(255,255,255,0.68)';
    ctx.beginPath();
    ctx.ellipse(635, 84, 58, 22, -0.08, 0, Math.PI * 2);
    ctx.ellipse(690, 64, 42, 18, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else if (parkId === 'tn-komodo') {
    // Kepulauan Kerucut Padar & Burung Laut
    const drawIslandPeak = (cx, topY, w) => {
      ctx.fillStyle = '#b08968';
      ctx.strokeStyle = theme.skyCloud;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(cx - w / 2, 630);
      ctx.quadraticCurveTo(cx - w * 0.14, topY + 60, cx, topY);
      ctx.quadraticCurveTo(cx + w * 0.18, topY + 65, cx + w / 2, 630);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };
    drawIslandPeak(490, 195, 300);
    drawIslandPeak(770, 145, 340);

    // Siluet burung laut
    ctx.strokeStyle = '#5c4033';
    ctx.lineWidth = 4;
    [[420, 145], [465, 125], [840, 110]].forEach(([bx, by]) => {
      ctx.beginPath();
      ctx.arc(bx - 10, by, 10, Math.PI, 0);
      ctx.arc(bx + 10, by, 10, Math.PI, 0);
      ctx.stroke();
    });
  } else if (parkId === 'tn-ujung-kulon') {
    // Siluet Anak Krakatau di cakrawala + pohon cemara pantai menjulang
    ctx.fillStyle = '#7b8b82';
    ctx.strokeStyle = theme.skyCloud;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(350, 630);
    ctx.lineTo(485, 290);
    ctx.lineTo(540, 290);
    ctx.lineTo(680, 630);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    drawRealisticTrunk(ctx, 780, 220, 630, 38, '#4a3222', '#7a5740');
    drawLayeredFoliage(ctx, 745, 195, 92, theme.canopyLight, theme.canopyMid, theme.canopyDark, theme.skyCloud);
    drawLayeredFoliage(ctx, 835, 215, 86, theme.canopyMid, theme.canopyDark, '#14281d', theme.skyCloud);
  } else {
    // Kanopi Raksasa Hutan Hujan (Gunung Leuser & Tanjung Puting)
    drawRealisticTrunk(ctx, 680, 215, 630, 44, '#3d281a', '#6d4c37');
    drawLayeredFoliage(ctx, 585, 200, 108, theme.canopyLight, theme.canopyMid, theme.canopyDark, theme.skyCloud);
    drawLayeredFoliage(ctx, 760, 220, 112, theme.canopyMid, theme.canopyDark, '#14281d', theme.skyCloud);
    drawLayeredFoliage(ctx, 675, 138, 104, '#d9ed92', theme.canopyLight, theme.canopyMid, theme.skyCloud);
  }

  addPaperGrain(ctx, 1280, 640, 0.042);
  return toTexture(canvas);
}

/**
 * LAPIS 2 (TENGAH-BELAKANG): Arsitektur & Vegetasi Khas Tiap Bab Taman Nasional
 */
export function createMidBackVillageTexture(park, extras) {
  const { canvas, ctx } = createCanvas(1280, 640);
  const theme = extras.dioramaTheme;
  const parkId = getParkId(park);

  // Pohon bingkai kiri & kanan disesuaikan per bioma
  if (parkId === 'tn-komodo') {
    drawPalmTree(ctx, 210, 630, 370, 28, theme);
    drawPalmTree(ctx, 1055, 630, 390, -24, theme);
  } else {
    drawRealisticTrunk(ctx, 228, 290, 630, 28, '#4a3222', '#75533c');
    drawLayeredFoliage(ctx, 185, 265, 64, theme.canopyLight, theme.canopyMid, theme.canopyDark, theme.skyCloud);
    drawLayeredFoliage(ctx, 272, 260, 66, theme.canopyMid, theme.canopyDark, '#14281d', theme.skyCloud);
    drawLayeredFoliage(ctx, 228, 204, 58, '#d4e09b', theme.canopyLight, theme.canopyMid, theme.skyCloud);

    drawRealisticTrunk(ctx, 1055, 285, 630, 28, '#3d281a', '#684732');
    drawLayeredFoliage(ctx, 1015, 270, 62, theme.canopyMid, theme.canopyDark, '#14281d', theme.skyCloud);
    drawLayeredFoliage(ctx, 1098, 288, 64, theme.canopyDark, '#14281d', '#0b1912', theme.skyCloud);
    drawLayeredFoliage(ctx, 1055, 212, 60, theme.canopyLight, theme.canopyMid, theme.canopyDark, theme.skyCloud);
  }

  // Bangunan / Landmark Khas per Bab
  if (parkId === 'tn-ujung-kulon') {
    // Mercusuar Tanjung Layar klasik putih-merah + Pos Jaga RPU
    ctx.save();
    ctx.translate(490, 130);
    drawPaperCutRim(ctx, () => {
      ctx.moveTo(45, 0);
      ctx.lineTo(105, 0);
      ctx.lineTo(125, 310);
      ctx.lineTo(25, 310);
      ctx.closePath();
    }, theme.skyCloud);

    // Menara mercusuar belang merah-putih
    ctx.fillStyle = '#f8f5ee';
    ctx.beginPath();
    ctx.moveTo(48, 30);
    ctx.lineTo(102, 30);
    ctx.lineTo(122, 308);
    ctx.lineTo(28, 308);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#c1121f';
    ctx.fillRect(42, 95, 66, 44);
    ctx.fillRect(35, 195, 80, 46);

    // Ruang lampu kaca bercahaya kuning
    ctx.fillStyle = '#fde047';
    ctx.fillRect(50, 0, 50, 32);
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(42, 0);
    ctx.lineTo(75, -34);
    ctx.lineTo(108, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Pondok Pos RPU di kanan
    ctx.save();
    ctx.translate(770, 245);
    ctx.fillStyle = '#efe5d1';
    ctx.strokeStyle = theme.skyCloud;
    ctx.lineWidth = 5;
    ctx.fillRect(0, 75, 145, 145);
    ctx.fillStyle = '#8d6346';
    ctx.beginPath();
    ctx.moveTo(-14, 78);
    ctx.lineTo(72, 4);
    ctx.lineTo(158, 78);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#3d281a';
    ctx.fillRect(26, 102, 36, 44);
    ctx.fillRect(86, 102, 34, 34);
    ctx.restore();
  } else if (parkId === 'tn-tanjung-puting') {
    // Rumah Panggung Kayu Ulin Camp Leakey + Perahu Kelotok Sungai Sekonyer
    ctx.save();
    ctx.translate(430, 195);
    // Tiang panggung kayu ulin
    ctx.fillStyle = '#4a3222';
    [22, 72, 132, 182].forEach((tx) => ctx.fillRect(tx, 165, 14, 145));

    // Badan rumah kayu
    ctx.fillStyle = '#b08968';
    ctx.strokeStyle = theme.skyCloud;
    ctx.lineWidth = 5;
    ctx.fillRect(10, 75, 195, 96);
    ctx.strokeRect(10, 75, 195, 96);

    // Atap sirap bertingkat khas Kalimantan
    ctx.fillStyle = '#5c4033';
    ctx.beginPath();
    ctx.moveTo(-10, 82);
    ctx.lineTo(108, 6);
    ctx.lineTo(226, 82);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f4a261';
    ctx.fillRect(40, 100, 36, 36);
    ctx.fillRect(138, 100, 36, 36);
    ctx.restore();

    // Perahu Kelotok di sisi kanan
    ctx.save();
    ctx.translate(745, 315);
    ctx.fillStyle = '#8d6346';
    ctx.strokeStyle = theme.skyCloud;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 72);
    ctx.lineTo(210, 72);
    ctx.lineTo(182, 118);
    ctx.lineTo(24, 118);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Atap kanopi kelotok putih-biru
    ctx.fillStyle = '#f8f5ee';
    ctx.fillRect(36, 20, 118, 52);
    ctx.fillStyle = '#0096c7';
    ctx.fillRect(36, 12, 118, 14);
    ctx.restore();
  } else if (parkId === 'tn-komodo') {
    // Perahu Pinisi Layar Mengembang & Pondok Savana NTT
    ctx.save();
    ctx.translate(455, 175);
    // Lambung Pinisi
    ctx.fillStyle = '#6c462f';
    ctx.strokeStyle = theme.skyCloud;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 185);
    ctx.lineTo(225, 185);
    ctx.lineTo(190, 232);
    ctx.lineTo(35, 232);
    ctx.closePath();
    ctx.fill();
    // Tiang & layar segitiga Pinisi
    ctx.fillStyle = '#4a3222';
    ctx.fillRect(72, 12, 8, 175);
    ctx.fillRect(148, 36, 7, 150);
    ctx.fillStyle = '#fdf8ef';
    ctx.beginPath();
    ctx.moveTo(80, 18);
    ctx.quadraticCurveTo(138, 86, 80, 165);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(155, 42);
    ctx.quadraticCurveTo(205, 102, 155, 168);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Pondok beratap kerucut alang-alang savana
    ctx.save();
    ctx.translate(790, 240);
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(26, 98, 92, 120);
    ctx.fillStyle = '#b5835a';
    ctx.beginPath();
    ctx.moveTo(-4, 102);
    ctx.lineTo(72, 4);
    ctx.lineTo(148, 102);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  } else if (parkId === 'tn-lorentz') {
    // Stasiun Riset Alpin Berpanel Surya & Kubah Observasi Gletser
    ctx.save();
    ctx.translate(465, 215);
    ctx.fillStyle = '#e2e8f0';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    ctx.fillRect(16, 75, 165, 130);
    ctx.strokeRect(16, 75, 165, 130);
    // Atap miring tahan salju + lapisan salju
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(0, 82);
    ctx.lineTo(98, 8);
    ctx.lineTo(196, 82);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(4, 72);
    ctx.lineTo(98, 2);
    ctx.lineTo(192, 72);
    ctx.lineTo(98, 20);
    ctx.closePath();
    ctx.fill();
    // Panel surya biru
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(44, 108, 48, 34);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(114, 108, 34, 42);
    ctx.restore();

    // Menara pengukur cuaca alpin
    ctx.save();
    ctx.translate(795, 185);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(35, 260);
    ctx.lineTo(60, 20);
    ctx.lineTo(85, 260);
    ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(60, 20, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Menara Kanopi Rimba & Pondok Riset (Leuser & Kerinci Seblat)
    ctx.save();
    ctx.translate(455, 165);
    const roofG = ctx.createLinearGradient(0, 0, 170, 105);
    roofG.addColorStop(0, '#b08968');
    roofG.addColorStop(1, '#7f5539');
    ctx.fillStyle = roofG;
    ctx.beginPath();
    ctx.moveTo(0, 105);
    ctx.lineTo(86, 6);
    ctx.lineTo(172, 105);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#efe5d1';
    ctx.fillRect(20, 105, 132, 125);
    ctx.fillStyle = '#5c4033';
    ctx.fillRect(46, 128, 30, 42);
    ctx.fillRect(98, 128, 28, 28);
    ctx.restore();

    // Menara pantau kanopi kayu tinggi di kanan
    ctx.save();
    ctx.translate(775, 155);
    ctx.fillStyle = '#5c4033';
    ctx.fillRect(20, 96, 14, 240);
    ctx.fillRect(92, 96, 14, 240);
    ctx.fillStyle = '#8d6346';
    ctx.beginPath();
    ctx.moveTo(2, 92);
    ctx.lineTo(64, 6);
    ctx.lineTo(126, 92);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e7dcc8';
    ctx.fillRect(14, 92, 98, 64);
    ctx.restore();
  }

  addPaperGrain(ctx, 1280, 640, 0.042);
  return toTexture(canvas);
}

/**
 * LAPIS 3 (TENGAH UTAMA): Tebing / Terowongan / Air Terjun / Kaldera per Bab
 */
export function createArchedHillTexture(park, extras) {
  const { canvas, ctx } = createCanvas(1280, 560);
  const theme = extras.dioramaTheme;
  const parkId = getParkId(park);

  // Pagar pengaman kayu di punggung tebing
  ctx.strokeStyle = '#7f5539';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(295, 175);
  ctx.quadraticCurveTo(580, 68, 865, 168);
  ctx.stroke();

  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const px = 295 + t * 570;
    const py = 175 - Math.sin(t * Math.PI) * 58;
    ctx.strokeStyle = '#6c462f';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(px, py - 14);
    ctx.lineTo(px, py + 30);
    ctx.stroke();
  }

  // Rongga gelap di balik tebing
  ctx.fillStyle = theme.hillArchShadow;
  ctx.beginPath();
  ctx.moveTo(270, 550);
  ctx.lineTo(270, 210);
  ctx.quadraticCurveTo(580, 90, 895, 210);
  ctx.lineTo(895, 550);
  ctx.closePath();
  ctx.fill();

  // Dinding Tebing Kertas bertekstur batuan
  const cliffGrad = ctx.createLinearGradient(250, 140, 910, 540);
  if (parkId === 'tn-lorentz') {
    cliffGrad.addColorStop(0, '#94a3b8');
    cliffGrad.addColorStop(0.5, '#64748b');
    cliffGrad.addColorStop(1, '#334155');
  } else {
    cliffGrad.addColorStop(0, '#c9a682');
    cliffGrad.addColorStop(0.5, theme.hillArch);
    cliffGrad.addColorStop(1, '#7f5539');
  }
  ctx.fillStyle = cliffGrad;
  ctx.strokeStyle = theme.skyCloud;
  ctx.lineWidth = 7;

  ctx.beginPath();
  ctx.moveTo(245, 550);
  ctx.lineTo(245, 222);
  ctx.quadraticCurveTo(580, 95, 915, 222);
  ctx.lineTo(915, 550);
  ctx.lineTo(820, 550);
  ctx.lineTo(820, 330);
  ctx.arc(765, 330, 55, 0, Math.PI, true);
  ctx.lineTo(710, 550);
  ctx.lineTo(650, 550);
  ctx.lineTo(650, 290);
  ctx.arc(580, 290, 70, 0, Math.PI, true);
  ctx.lineTo(510, 550);
  ctx.lineTo(450, 550);
  ctx.lineTo(450, 335);
  ctx.arc(395, 335, 55, 0, Math.PI, true);
  ctx.lineTo(340, 550);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Detail khusus bab pada lengkungan tengah
  if (parkId === 'tn-gunung-leuser' || parkId === 'tn-kerinci-seblat') {
    // Air terjun jernih mengalir dari terowongan tengah
    const wfGrad = ctx.createLinearGradient(580, 230, 580, 545);
    wfGrad.addColorStop(0, '#e0f2fe');
    wfGrad.addColorStop(0.5, theme.waterTop);
    wfGrad.addColorStop(1, '#ffffff');
    ctx.fillStyle = wfGrad;
    ctx.fillRect(542, 240, 76, 305);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(556, 245, 14, 290);
    ctx.fillRect(590, 250, 10, 285);
  } else {
    // Tangga batu realistis dengan anak tangga berbayang
    ctx.save();
    ctx.translate(534, 320);
    ctx.fillStyle = '#ebd8bf';
    ctx.strokeStyle = '#9c7858';
    ctx.lineWidth = 3;
    ctx.fillRect(0, 0, 92, 225);
    ctx.strokeRect(0, 0, 92, 225);
    for (let sy = 18; sy < 220; sy += 22) {
      ctx.fillStyle = '#c9a682';
      ctx.fillRect(4, sy, 84, 8);
      ctx.fillStyle = 'rgba(74, 50, 34, 0.25)';
      ctx.fillRect(4, sy + 8, 84, 4);
    }
    ctx.fillStyle = '#d5c3b3';
    ctx.fillRect(-18, -14, 22, 238);
    ctx.fillRect(88, -14, 22, 238);
    ctx.restore();
  }

  // Bibir rumput / salju / pasir overhang di atas tebing
  ctx.fillStyle = parkId === 'tn-lorentz' ? '#f8fafc' : parkId === 'tn-komodo' ? '#f5ebe0' : '#dde5b6';
  ctx.strokeStyle = '#c5b99b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(235, 222);
  ctx.quadraticCurveTo(580, 90, 925, 222);
  for (let x = 925; x >= 235; x -= 46) {
    ctx.quadraticCurveTo(
      x - 23,
      255 - Math.sin(((x - 235) / 690) * Math.PI) * 95,
      x - 46,
      222 - Math.sin(((x - 281) / 690) * Math.PI) * 92
    );
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  addPaperGrain(ctx, 1280, 560, 0.045);
  return toTexture(canvas);
}

/**
 * LAPIS 4 (DEPAN): Vegetasi Bioma & Flora Khas Tiap Bab
 */
export function createPondFloraLayerTexture(park, extras) {
  const { canvas, ctx } = createCanvas(1280, 480);
  const theme = extras.dioramaTheme;
  const parkId = getParkId(park);

  // Pohon depan kiri realistis
  if (parkId === 'tn-komodo') {
    drawPalmTree(ctx, 160, 470, 330, 34, theme);
  } else {
    drawRealisticTrunk(ctx, 168, 210, 475, 26, '#3d281a', '#684732');
    drawLayeredFoliage(ctx, 130, 195, 60, theme.canopyMid, theme.canopyDark, '#14281d', theme.skyCloud);
    drawLayeredFoliage(ctx, 204, 200, 62, theme.canopyDark, '#14281d', '#0b1912', theme.skyCloud);
    drawLayeredFoliage(ctx, 168, 138, 58, theme.canopyLight, theme.canopyMid, theme.canopyDark, theme.skyCloud);
  }

  // Rumpun flora khusus kanan-tengah sesuai bab
  if (parkId === 'tn-komodo') {
    // Terumbu karang warna-warni & kaktus savana
    const corals = [
      [840, 355, 42, '#f97316'],
      [910, 340, 50, '#fb7185'],
      [980, 360, 44, '#f59e0b'],
      [1055, 345, 46, '#2dd4bf']
    ];
    corals.forEach(([cx, cy, r, col]) => {
      drawLayeredFoliage(ctx, cx, cy, r, col, col, '#7c2d12', theme.skyCloud);
    });
  } else if (parkId === 'tn-lorentz') {
    // Semak tundra alpin & rumpun pakis bersalju
    [350, 845, 945, 1045].forEach((fx, i) => {
      drawLayeredFoliage(
        ctx,
        fx,
        320 - (i % 2) * 35,
        54,
        '#f8fafc',
        theme.canopyLight,
        theme.canopyDark,
        theme.skyCloud
      );
    });
  } else {
    // Rumpun bunga/jamur kanopi berlapis yang realistis
    const drawCanopyCluster = (x, y, w, h, topColor) => {
      ctx.fillStyle = '#d4b895';
      ctx.fillRect(x - 10, y + 20, 20, h);

      const g = ctx.createLinearGradient(x - w / 2, y, x + w / 2, y + 40);
      g.addColorStop(0, topColor);
      g.addColorStop(1, theme.accentPop);
      ctx.fillStyle = g;
      ctx.strokeStyle = theme.skyCloud;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(x - w / 2, y + 36);
      ctx.lineTo(x - w * 0.24, y - 10);
      ctx.lineTo(x + w * 0.24, y - 10);
      ctx.lineTo(x + w / 2, y + 36);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    drawCanopyCluster(355, 240, 100, 185, theme.accentSoft);
    drawCanopyCluster(855, 195, 118, 215, theme.accentSoft);
    drawCanopyCluster(955, 165, 130, 240, theme.accentPop);
    drawCanopyCluster(1055, 225, 115, 195, theme.accentSoft);
  }

  // Pohon kanan ujung
  drawRealisticTrunk(ctx, 1132, 230, 470, 22, '#4a3222', '#705038');
  drawLayeredFoliage(ctx, 1110, 190, 46, theme.accentSoft, theme.accentPop, '#9a3412', theme.skyCloud);
  drawLayeredFoliage(ctx, 1155, 195, 42, theme.accentPop, '#dc2626', '#7f1d1d', theme.skyCloud);

  addPaperGrain(ctx, 1280, 480, 0.042);
  return toTexture(canvas);
}

/**
 * Tekstur Jembatan Kertas 3D Miring (kayu ulin / bambu / batu tergantung bab)
 */
export function createBridgeStripTexture(park, extras) {
  const { canvas, ctx } = createCanvas(512, 160);
  const parkId = getParkId(park);
  const deckCol = parkId === 'tn-lorentz' ? '#cbd5e1' : '#e6d5b8';
  const railCol = parkId === 'tn-lorentz' ? '#475569' : '#6c462f';

  ctx.fillStyle = deckCol;
  ctx.strokeStyle = railCol;
  ctx.lineWidth = 6;
  ctx.fillRect(10, 92, 492, 34);
  ctx.strokeRect(10, 92, 492, 34);

  ctx.strokeStyle = railCol;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(12, 40);
  ctx.lineTo(500, 40);
  ctx.stroke();

  for (let x = 24; x <= 488; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 34);
    ctx.lineTo(x, 126);
    ctx.stroke();
  }

  addPaperGrain(ctx, 512, 160, 0.035);
  return toTexture(canvas);
}

/**
 * Tekstur Standee Satwa Kunci, Peneliti, & Flora Ikonik Khas Tiap Bab
 */
export function createStandeeTexture(kind, park, extras) {
  const { canvas, ctx } = createCanvas(256, 256);
  const theme = extras.dioramaTheme;
  const parkId = getParkId(park);

  if (kind === 'fauna') {
    // Kartu Die-Cut Kertas Krem dengan bayangan lembut
    ctx.save();
    ctx.shadowColor = 'rgba(30, 22, 14, 0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = theme.skyCloud;
    ctx.strokeStyle = '#cbbba0';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.roundRect(34, 44, 188, 208, [86, 86, 12, 12]);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    if (parkId === 'tn-komodo') {
      // Komodo realistis dengan ekor panjang & lidah bercabang
      ctx.fillStyle = '#5c4d3c';
      ctx.beginPath();
      ctx.ellipse(122, 152, 58, 24, -0.06, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(68, 158);
      ctx.quadraticCurveTo(36, 182, 30, 206);
      ctx.lineTo(52, 202);
      ctx.quadraticCurveTo(64, 178, 82, 165);
      ctx.fill();
      ctx.fillStyle = '#43382b';
      ctx.beginPath();
      ctx.ellipse(180, 140, 24, 14, 0.12, 0, Math.PI * 2);
      ctx.fill();
      // Lidah merah bercabang
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(202, 142);
      ctx.lineTo(216, 144);
      ctx.lineTo(222, 138);
      ctx.moveTo(216, 144);
      ctx.lineTo(222, 150);
      ctx.stroke();
      // Kaki kokoh
      ctx.fillStyle = '#43382b';
      ctx.fillRect(88, 166, 14, 48);
      ctx.fillRect(142, 164, 14, 50);
    } else if (parkId === 'tn-tanjung-puting') {
      // Orangutan Kalimantan berbulu jingga kemerahan
      ctx.fillStyle = '#c2410c';
      ctx.beginPath();
      ctx.ellipse(128, 162, 46, 52, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#9a3412';
      ctx.beginPath();
      ctx.arc(128, 108, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#7c2d12';
      ctx.beginPath();
      ctx.ellipse(128, 114, 18, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      // Mata kecil
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(120, 106, 4, 4);
      ctx.fillRect(134, 106, 4, 4);
    } else if (parkId === 'tn-gunung-leuser') {
      // Harimau Sumatera loreng hitam
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.ellipse(118, 154, 54, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(174, 134, 24, 0, Math.PI * 2);
      ctx.fill();
      // Loreng hitam
      ctx.strokeStyle = '#1c1917';
      ctx.lineWidth = 4;
      [92, 110, 128, 146].forEach((sx) => {
        ctx.beginPath();
        ctx.moveTo(sx, 132);
        ctx.lineTo(sx - 4, 174);
        ctx.stroke();
      });
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(86, 174, 14, 50);
      ctx.fillRect(142, 174, 14, 50);
    } else if (parkId === 'tn-lorentz') {
      // Burung Cenderawasih Kuning Papua
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.ellipse(128, 142, 28, 38, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(138, 102, 18, 0, Math.PI * 2);
      ctx.fill();
      // Ekor bulu kuning emas menjuntai
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      [-14, -4, 6, 16].forEach((ox) => {
        ctx.beginPath();
        ctx.moveTo(118, 172);
        ctx.quadraticCurveTo(100 + ox, 212, 86 + ox * 1.4, 236);
        ctx.stroke();
      });
    } else if (parkId === 'tn-kerinci-seblat') {
      // Tapir Asia hitam-putih pelana khas Sumatera
      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.ellipse(118, 154, 54, 34, 0, 0, Math.PI * 2);
      ctx.fill();
      // Pelana putih khas Tapir
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(102, 122, 42, 56);
      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.arc(172, 138, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(86, 176, 14, 48);
      ctx.fillRect(142, 176, 14, 48);
    } else {
      // Badak Jawa bercula satu dengan lipatan zirah
      ctx.fillStyle = '#5c4d42';
      ctx.beginPath();
      ctx.ellipse(118, 150, 56, 36, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#4a3d34';
      ctx.beginPath();
      ctx.arc(172, 130, 24, 0, Math.PI * 2);
      ctx.fill();
      // Cula tunggal
      ctx.fillStyle = '#d4a373';
      ctx.beginPath();
      ctx.moveTo(188, 118);
      ctx.lineTo(206, 94);
      ctx.lineTo(196, 130);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#4a3d34';
      ctx.fillRect(82, 174, 14, 50);
      ctx.fillRect(110, 178, 14, 46);
      ctx.fillRect(144, 174, 14, 50);
    }
  } else if (kind === 'ranger') {
    ctx.fillStyle = theme.skyCloud;
    ctx.strokeStyle = '#cbbba0';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(74, 34, 108, 218, [46, 46, 10, 10]);
    ctx.fill();
    ctx.stroke();

    // Topi rimba / tudung jaket
    ctx.fillStyle = parkId === 'tn-lorentz' ? '#0284c7' : '#78350f';
    ctx.fillRect(102, 54, 52, 12);
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(128, 82, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = theme.accentPop;
    ctx.beginPath();
    ctx.roundRect(106, 106, 44, 68, 12);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(116, 174);
    ctx.lineTo(108, 236);
    ctx.moveTo(140, 174);
    ctx.lineTo(148, 236);
    ctx.stroke();
  } else {
    // Prop Ikonik Depan Kiri yang Berbeda Tiap Bab
    if (parkId === 'tn-kerinci-seblat') {
      // Bunga Raksasa Rafflesia arnoldii
      ctx.fillStyle = '#991b1b';
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5;
        ctx.beginPath();
        ctx.ellipse(128 + Math.cos(a) * 44, 154 + Math.sin(a) * 40, 36, 26, a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#450a0a';
      ctx.beginPath();
      ctx.arc(128, 154, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fef2f2';
      [[105, 130], [148, 132], [128, 186], [96, 165], [156, 168]].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(dx, dy, 5, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (parkId === 'tn-lorentz') {
      // Kristal Es Gletser Alpin
      ctx.fillStyle = '#bae6fd';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(76, 248);
      ctx.lineTo(104, 118);
      ctx.lineTo(128, 86);
      ctx.lineTo(156, 128);
      ctx.lineTo(182, 248);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      // Jamur / Tunas Rimba Kertas Berlapis
      ctx.fillStyle = '#c2a887';
      ctx.fillRect(114, 146, 28, 106);
      ctx.fillStyle = theme.skyCloud;
      ctx.strokeStyle = '#cbbba0';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(46, 152);
      ctx.quadraticCurveTo(128, 68, 210, 152);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  return toTexture(canvas);
}
