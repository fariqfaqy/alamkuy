import * as THREE from 'three';

/**
 * Menghasilkan tekstur kertas bertekstur serat (paper grain) dan palet cat air
 * untuk setiap lapisan diorama buku pop-up 3D agar terlihat seperti kerajinan kertas nyata.
 */

function addPaperGrain(ctx, width, height, alpha = 0.045) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 20) continue;
    const noise = ((Math.sin(i * 12.9898) * 43758.5453) % 1) * 28 - 14;
    data[i] = Math.max(0, Math.min(255, data[i] + noise * alpha * 12));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * alpha * 12));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * alpha * 12));
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

/**
 * Tekstur halaman buku cetak (kertas krem, ilustrasi dasar rumput cat air, dan kolom teks buku)
 */
export function createOpenPageTexture(side, park, extras) {
  const { canvas, ctx } = createCanvas(1024, 1024);
  const theme = extras.dioramaTheme;

  // Dasar kertas krem hangat
  const paperGrad = ctx.createLinearGradient(
    side === 'left' ? 1024 : 0,
    0,
    side === 'left' ? 0 : 1024,
    0
  );
  paperGrad.addColorStop(0, '#cfc2aa');
  paperGrad.addColorStop(0.08, '#efe6d5');
  paperGrad.addColorStop(0.28, '#fbf7ee');
  paperGrad.addColorStop(0.92, '#f9f4e8');
  paperGrad.addColorStop(1, '#ebe0cc');
  ctx.fillStyle = paperGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Latar cat air hijau/pasir lembut di bagian atas halaman (tempat diorama berdiri)
  const lawnGrad = ctx.createRadialGradient(
    side === 'left' ? 760 : 260,
    380,
    40,
    side === 'left' ? 620 : 400,
    420,
    560
  );
  lawnGrad.addColorStop(0, theme.canopyLight);
  lawnGrad.addColorStop(0.55, '#c9d9a7');
  lawnGrad.addColorStop(1, 'rgba(251, 247, 238, 0)');
  ctx.fillStyle = lawnGrad;
  ctx.fillRect(0, 40, 1024, 650);

  // Jalur setapak / sungai cat air di halaman
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = side === 'right' ? theme.waterTop : theme.hillUpper;
  ctx.beginPath();
  if (side === 'right') {
    ctx.ellipse(420, 440, 190, 110, -0.15, 0, Math.PI * 2);
  } else {
    ctx.ellipse(620, 460, 210, 95, 0.12, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.restore();

  // Garis tepi halaman buku halus
  ctx.strokeStyle = 'rgba(130, 114, 90, 0.18)';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, 952, 952);

  // Kolom teks cetak di bagian depan/bawah halaman (persis buku cerita pop-up)
  ctx.fillStyle = '#5a5043';
  ctx.font = 'bold 26px Georgia, serif';
  const headerText =
    side === 'left'
      ? `${park.name.toUpperCase()}  |  ${park.province}`
      : `${extras.ecoRole.toUpperCase()}`;
  ctx.fillText(headerText.slice(0, 48), 92, 748);

  // Garis-garis teks cetak tipografi buku
  ctx.fillStyle = 'rgba(74, 64, 52, 0.65)';
  const lineWidths = [820, 800, 835, 760, 815, 640];
  lineWidths.forEach((lw, idx) => {
    const y = 785 + idx * 26;
    ctx.fillRect(92, y, lw, 6);
  });

  // Nomor halaman
  ctx.fillStyle = 'rgba(90, 80, 67, 0.7)';
  ctx.font = 'italic 22px Georgia, serif';
  ctx.fillText(side === 'left' ? 'Atlas Ekologi Nusantara' : 'Konservasi Biosfer', side === 'left' ? 92 : 730, 968);

  addPaperGrain(ctx, 1024, 1024, 0.035);
  return toTexture(canvas);
}

/**
 * Tekstur tepi tumpukan kertas buku berlapis-lapis
 */
export function createPaperEdgeTexture() {
  const { canvas, ctx } = createCanvas(256, 256);
  ctx.fillStyle = '#f2eadb';
  ctx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 5) {
    ctx.fillStyle = y % 10 === 0 ? '#d8ccb6' : '#e6dcc9';
    ctx.fillRect(0, y, 256, 2);
  }
  return toTexture(canvas);
}

/**
 * LAPIS 1 (BELAKANG): Awan kertas berlubang die-cut & pohon kanopi tinggi
 */
export function createBackCloudsLayerTexture(extras) {
  const { canvas, ctx } = createCanvas(1280, 640);
  const theme = extras.dioramaTheme;

  const drawCloudCutout = (cx, cy, scale, color) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    ctx.fillStyle = color;
    ctx.strokeStyle = '#dfd4be';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-150, 180);
    ctx.lineTo(-150, 20);
    ctx.bezierCurveTo(-185, 0, -170, -55, -125, -62);
    ctx.bezierCurveTo(-125, -118, -55, -148, -10, -118);
    ctx.bezierCurveTo(30, -165, 118, -152, 138, -92);
    ctx.bezierCurveTo(185, -88, 205, -28, 168, 15);
    ctx.bezierCurveTo(190, 52, 165, 95, 130, 102);
    ctx.lineTo(130, 180);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lubang ukiran kertas (die-cut holes)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.ellipse(-45, -35, 38, 16, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(55, -52, 44, 18, 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(15, 18, 34, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawCloudCutout(230, 390, 1.1, theme.skyCloud);
  drawCloudCutout(1040, 380, 1.15, theme.skyCloud);

  // Pohon kanopi raksasa di tengah-atas dengan efek cat air & tepi krem
  ctx.save();
  ctx.fillStyle = theme.skyCloud;
  ctx.beginPath();
  ctx.moveTo(540, 630);
  ctx.lineTo(540, 250);
  ctx.bezierCurveTo(465, 225, 475, 135, 540, 115);
  ctx.bezierCurveTo(555, 30, 685, 15, 755, 80);
  ctx.bezierCurveTo(830, 65, 885, 145, 845, 220);
  ctx.bezierCurveTo(890, 265, 860, 345, 795, 355);
  ctx.lineTo(795, 630);
  ctx.closePath();
  ctx.fill();

  // Gradasi cat air kanopi di dalam potongan kertas
  const canopyGrad = ctx.createRadialGradient(690, 175, 30, 680, 200, 220);
  canopyGrad.addColorStop(0, theme.canopyMid);
  canopyGrad.addColorStop(0.55, theme.canopyLight);
  canopyGrad.addColorStop(1, '#dce2b6');
  ctx.fillStyle = canopyGrad;
  ctx.beginPath();
  ctx.arc(680, 190, 145, 0, Math.PI * 2);
  ctx.arc(595, 225, 92, 0, Math.PI * 2);
  ctx.arc(770, 220, 95, 0, Math.PI * 2);
  ctx.fill();

  // Batang pohon cat air
  ctx.fillStyle = '#4e3629';
  ctx.beginPath();
  ctx.moveTo(655, 630);
  ctx.lineTo(664, 290);
  ctx.lineTo(622, 235);
  ctx.lineTo(640, 224);
  ctx.lineTo(676, 268);
  ctx.lineTo(686, 205);
  ctx.lineTo(704, 208);
  ctx.lineTo(696, 272);
  ctx.lineTo(736, 225);
  ctx.lineTo(750, 238);
  ctx.lineTo(705, 295);
  ctx.lineTo(712, 630);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  addPaperGrain(ctx, 1280, 640, 0.04);
  return toTexture(canvas);
}

/**
 * LAPIS 2 (TENGAH-BELAKANG): Pondok bukit, menara observasi, & pohon rimba berlapis
 */
export function createMidBackVillageTexture(extras) {
  const { canvas, ctx } = createCanvas(1280, 640);
  const theme = extras.dioramaTheme;

  // Pohon Kiri
  ctx.fillStyle = theme.skyCloud;
  ctx.beginPath();
  ctx.roundRect(145, 200, 175, 430, 75);
  ctx.fill();

  ctx.fillStyle = '#5c4033';
  ctx.fillRect(222, 310, 20, 320);

  const drawFoliageBlob = (x, y, r, c1, c2) => {
    const g = ctx.createRadialGradient(x - r * 0.25, y - r * 0.25, r * 0.1, x, y, r);
    g.addColorStop(0, c1);
    g.addColorStop(1, c2);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };

  drawFoliageBlob(195, 275, 58, theme.canopyLight, theme.canopyMid);
  drawFoliageBlob(268, 268, 62, theme.canopyMid, theme.canopyDark);
  drawFoliageBlob(232, 215, 52, '#c8d99a', theme.canopyLight);

  // Pondok Konservasi di Puncak Bukit (tengah-kiri)
  ctx.save();
  ctx.translate(455, 165);
  ctx.fillStyle = theme.skyCloud;
  ctx.beginPath();
  ctx.moveTo(-12, 110);
  ctx.lineTo(86, -12);
  ctx.lineTo(186, 110);
  ctx.lineTo(172, 230);
  ctx.lineTo(2, 230);
  ctx.closePath();
  ctx.fill();

  // Atap genteng tekstur kertas
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

  // Dinding rumah krem
  ctx.fillStyle = '#efe5d1';
  ctx.fillRect(20, 105, 132, 115);
  ctx.fillStyle = '#5c4033';
  ctx.fillRect(46, 128, 30, 42);
  ctx.fillRect(98, 128, 28, 28);

  // Payung oranye stasiun pengamatan
  ctx.fillStyle = theme.accentSoft;
  ctx.beginPath();
  ctx.moveTo(145, 112);
  ctx.quadraticCurveTo(186, 74, 228, 112);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#5c4033';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(186, 112);
  ctx.lineTo(186, 185);
  ctx.stroke();
  ctx.restore();

  // Menara Observasi Batu/Kayu di Kanan
  ctx.save();
  ctx.translate(780, 195);
  ctx.fillStyle = theme.skyCloud;
  ctx.beginPath();
  ctx.moveTo(-10, 96);
  ctx.lineTo(58, -10);
  ctx.lineTo(126, 96);
  ctx.lineTo(118, 290);
  ctx.lineTo(-2, 290);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#8d6346';
  ctx.beginPath();
  ctx.moveTo(2, 92);
  ctx.lineTo(58, 6);
  ctx.lineTo(114, 92);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e7dcc8';
  ctx.fillRect(14, 92, 88, 190);
  ctx.fillStyle = '#6e5645';
  ctx.beginPath();
  ctx.roundRect(40, 145, 36, 86, [18, 18, 0, 0]);
  ctx.fill();
  ctx.restore();

  // Rumpun Pohon Gelap di Kanan Jauh
  ctx.fillStyle = theme.skyCloud;
  ctx.beginPath();
  ctx.roundRect(965, 190, 185, 440, 82);
  ctx.fill();
  ctx.fillStyle = '#3d281a';
  ctx.fillRect(1048, 300, 22, 330);
  drawFoliageBlob(1025, 275, 58, theme.canopyMid, theme.canopyDark);
  drawFoliageBlob(1090, 295, 62, theme.canopyDark, '#14281d');
  drawFoliageBlob(1058, 220, 56, theme.canopyLight, theme.canopyMid);

  addPaperGrain(ctx, 1280, 640, 0.04);
  return toTexture(canvas);
}

/**
 * LAPIS 3 (TENGAH UTAMA): Bukit Tebing Terowongan Lengkung, Tangga Batu, & Pagar Kayu
 */
export function createArchedHillTexture(extras) {
  const { canvas, ctx } = createCanvas(1280, 560);
  const theme = extras.dioramaTheme;

  // Pagar kayu melengkung di punggung bukit atas
  ctx.strokeStyle = '#7f5539';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(295, 175);
  ctx.quadraticCurveTo(580, 68, 865, 168);
  ctx.stroke();

  ctx.strokeStyle = '#9c6644';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(295, 194);
  ctx.quadraticCurveTo(580, 87, 865, 187);
  ctx.stroke();

  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const px = 295 + t * 570;
    const py = 175 - Math.sin(t * Math.PI) * 58;
    ctx.strokeStyle = '#6c462f';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(px, py - 14);
    ctx.lineTo(px, py + 30);
    ctx.stroke();
  }

  // Rongga Gelap Dalam Terowongan (memberikan efek kedalaman lorong)
  ctx.fillStyle = theme.hillArchShadow;
  ctx.beginPath();
  ctx.moveTo(270, 550);
  ctx.lineTo(270, 210);
  ctx.quadraticCurveTo(580, 90, 895, 210);
  ctx.lineTo(895, 550);
  ctx.closePath();
  ctx.fill();

  // Dinding Tebing Kertas dengan Lengkungan Terowongan (Arched Cutouts)
  const cliffGrad = ctx.createLinearGradient(250, 140, 910, 540);
  cliffGrad.addColorStop(0, '#c9a682');
  cliffGrad.addColorStop(0.5, theme.hillArch);
  cliffGrad.addColorStop(1, '#8c6244');
  ctx.fillStyle = cliffGrad;
  ctx.strokeStyle = theme.skyCloud;
  ctx.lineWidth = 7;

  ctx.beginPath();
  ctx.moveTo(245, 550);
  ctx.lineTo(245, 222);
  ctx.quadraticCurveTo(580, 95, 915, 222);
  ctx.lineTo(915, 550);
  // Lubang terowongan kanan
  ctx.lineTo(820, 550);
  ctx.lineTo(820, 330);
  ctx.arc(765, 330, 55, 0, Math.PI, true);
  ctx.lineTo(710, 550);
  // Lubang terowongan tengah
  ctx.lineTo(650, 550);
  ctx.lineTo(650, 290);
  ctx.arc(580, 290, 70, 0, Math.PI, true);
  ctx.lineTo(510, 550);
  // Lubang terowongan kiri
  ctx.lineTo(450, 550);
  ctx.lineTo(450, 335);
  ctx.arc(395, 335, 55, 0, Math.PI, true);
  ctx.lineTo(340, 550);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Overhang Rumput Kertas Krem-Hijau Melengkung di Bibir Bukit
  ctx.fillStyle = '#ece5d0';
  ctx.strokeStyle = '#d3c6ab';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(235, 222);
  ctx.quadraticCurveTo(580, 90, 925, 222);
  for (let x = 925; x >= 235; x -= 46) {
    ctx.quadraticCurveTo(x - 23, 255 - Math.sin(((x - 235) / 690) * Math.PI) * 95, x - 46, 222 - Math.sin(((x - 281) / 690) * Math.PI) * 92);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Tangga Kertas Lipat di Tengah Terowongan Bukit
  ctx.save();
  ctx.translate(534, 320);
  ctx.fillStyle = '#ebd8bf';
  ctx.strokeStyle = '#9c7858';
  ctx.lineWidth = 3;
  ctx.fillRect(0, 0, 92, 225);
  ctx.strokeRect(0, 0, 92, 225);
  for (let sy = 20; sy < 220; sy += 24) {
    ctx.fillStyle = '#c9a682';
    ctx.fillRect(4, sy, 84, 8);
  }
  // Pilar batu tangga
  ctx.fillStyle = '#d5c3b3';
  ctx.fillRect(-18, -14, 22, 238);
  ctx.fillRect(88, -14, 22, 238);
  ctx.restore();

  addPaperGrain(ctx, 1280, 560, 0.045);
  return toTexture(canvas);
}

/**
 * Tekstur Lapisan Kolam / Danau Biru & Rumpun Jamur / Flora Oranye Kertas
 */
export function createPondFloraLayerTexture(extras) {
  const { canvas, ctx } = createCanvas(1280, 480);
  const theme = extras.dioramaTheme;

  // Rumpun Flora / Jamur Oranye Kiri
  const drawOrangeCanopy = (x, y, w, h, topColor) => {
    ctx.fillStyle = theme.skyCloud;
    ctx.beginPath();
    ctx.roundRect(x - w * 0.62, y - h * 0.25, w * 1.24, h * 1.4, 24);
    ctx.fill();

    // Batang krem
    ctx.fillStyle = '#e0c7a8';
    ctx.fillRect(x - 10, y + 20, 20, h);

    // Payung kanopi oranye bersegi-segi (paper-fold facets)
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

  drawOrangeCanopy(355, 230, 105, 190, theme.accentSoft);
  drawOrangeCanopy(835, 185, 125, 220, theme.accentSoft);
  drawOrangeCanopy(935, 155, 138, 250, theme.accentPop);
  drawOrangeCanopy(885, 245, 118, 175, theme.accentSoft);
  drawOrangeCanopy(1025, 225, 126, 195, theme.accentPop);

  // Pohon Daun Merah-Oranye di Kanan Ujung
  ctx.fillStyle = '#5c3a21';
  ctx.fillRect(1122, 230, 18, 240);
  [
    [1105, 185, 42, '#dc2f02'],
    [1155, 195, 38, '#e85d04'],
    [1132, 148, 36, '#f48c06']
  ].forEach(([cx, cy, r, col]) => {
    ctx.fillStyle = col;
    ctx.strokeStyle = theme.skyCloud;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  // Pohon Hijau Depan Kiri
  ctx.fillStyle = theme.skyCloud;
  ctx.beginPath();
  ctx.roundRect(75, 110, 185, 365, 80);
  ctx.fill();
  ctx.fillStyle = '#4a3222';
  ctx.fillRect(158, 220, 20, 255);
  [
    [135, 195, 56, theme.canopyMid],
    [195, 200, 58, theme.canopyDark],
    [165, 142, 54, theme.canopyLight]
  ].forEach(([cx, cy, r, col]) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  });

  addPaperGrain(ctx, 1280, 480, 0.04);
  return toTexture(canvas);
}

/**
 * Tekstur Jembatan Kertas 3D Miring (dirotasi diagonal menuju lipatan tengah buku)
 */
export function createBridgeStripTexture() {
  const { canvas, ctx } = createCanvas(512, 160);
  // Papan jembatan kertas krem
  ctx.fillStyle = '#efe5d1';
  ctx.strokeStyle = '#8d6346';
  ctx.lineWidth = 6;
  ctx.fillRect(10, 92, 492, 34);
  ctx.strokeRect(10, 92, 492, 34);

  // Pegangan pagar jembatan
  ctx.strokeStyle = '#6c462f';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(12, 40);
  ctx.lineTo(500, 40);
  ctx.stroke();

  // Tiang pagar vertikal
  for (let x = 24; x <= 488; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 34);
    ctx.lineTo(x, 126);
    ctx.stroke();
  }

  addPaperGrain(ctx, 512, 160, 0.03);
  return toTexture(canvas);
}

/**
 * Tekstur Standee Satwa Kunci & Peneliti Hutan di Atas Halaman Depan
 */
export function createStandeeTexture(kind, extras) {
  const { canvas, ctx } = createCanvas(256, 256);
  const theme = extras.dioramaTheme;

  if (kind === 'fauna') {
    // Bingkai kertas krem die-cut
    ctx.fillStyle = theme.skyCloud;
    ctx.strokeStyle = '#d3c4aa';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.roundRect(38, 48, 180, 204, [82, 82, 10, 10]);
    ctx.fill();
    ctx.stroke();

    // Siluet Satwa Kunci (Badak / Harimau / Komodo / Orangutan bergaya paper-craft)
    ctx.fillStyle = '#5c4033';
    ctx.beginPath();
    ctx.ellipse(118, 148, 56, 36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4a3222';
    ctx.beginPath();
    ctx.arc(172, 126, 24, 0, Math.PI * 2);
    ctx.fill();
    // Cula / Telinga
    ctx.fillStyle = '#d4a373';
    ctx.beginPath();
    ctx.moveTo(188, 114);
    ctx.lineTo(205, 92);
    ctx.lineTo(195, 128);
    ctx.closePath();
    ctx.fill();
    // Kaki
    ctx.fillRect(82, 174, 14, 52);
    ctx.fillRect(108, 178, 14, 48);
    ctx.fillRect(142, 174, 14, 52);
  } else if (kind === 'ranger') {
    ctx.fillStyle = theme.skyCloud;
    ctx.beginPath();
    ctx.roundRect(78, 36, 100, 216, [44, 44, 10, 10]);
    ctx.fill();

    // Figur peneliti / penjaga hutan
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(128, 78, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = theme.accentPop;
    ctx.beginPath();
    ctx.roundRect(106, 104, 44, 68, 12);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(116, 172);
    ctx.lineTo(108, 236);
    ctx.moveTo(140, 172);
    ctx.lineTo(148, 236);
    ctx.stroke();
  } else {
    // Jamur/Pohon putih kecil di halaman kiri depan
    ctx.fillStyle = '#c2a887';
    ctx.fillRect(114, 146, 28, 106);
    ctx.fillStyle = theme.skyCloud;
    ctx.strokeStyle = '#d3c4aa';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(46, 152);
    ctx.quadraticCurveTo(128, 68, 210, 152);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  return toTexture(canvas);
}

