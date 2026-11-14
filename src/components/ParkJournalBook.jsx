import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  BookMarked,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  MapPin,
  Sparkles,
  Compass,
  AlertTriangle,
  Lightbulb,
  Layers,
  Leaf,
  Camera,
  X
} from 'lucide-react';

/**
 * Data Ensiklopedia Hibrida & Konfigurasi Diorama Pop-Up Kertas 3D:
 * Memadukan arsitektur Buku Pop-Up 3D berlapis (seperti referensi buku pop-up kerajinan kertas),
 * Data Krisis Lingkungan Global di lembar kiri bawah, dan Modul Edukasi Konservasi di lembar kanan bawah.
 */
const PARK_JOURNAL_EXTRAS = {
  'tn-ujung-kulon': {
    biomeSubtitle: 'Benteng Terakhir Badak Jawa & Hutan Pesisir Selat Sunda',
    dioramaTheme: {
      skyCloud: '#f4ebd9',
      canopyDark: '#2d5a44',
      canopyMid: '#52796f',
      canopyLight: '#95b89c',
      hillUpper: '#d8c3a5',
      hillArch: '#b08968',
      hillArchShadow: '#5c4033',
      waterTop: '#219ebc',
      waterDeep: '#126782',
      accentPop: '#e85d04',
      accentSoft: '#f48c06',
      faunaLabel: 'Badak Jawa (Rhinoceros sondaicus)'
    },
    globalIssue: {
      tag: 'STASIUN KERENTANAN PESISIR',
      metric: '+4.2 mm/thn Kenaikan Laut Global',
      impact:
        'Kenaikan air laut dan abrasi mengikis dataran rendah semenanjung, menuntut restorasi sabuk cemara laut dan mangrove alami.'
    },
    handwriting: 'Menyusuri semenanjung terluar Banten, benteng pesisir terakhir Badak Jawa...',
    fieldNote:
      'Stasiun riset pesisir barat Jawa. Hutan pantai Ujung Kulon dijaga penuh 24 jam oleh Rhino Protection Unit dan tim monitoring kamera jebak.',
    ecoRole: 'Spesies Kunci & Bio-Penjaga Ekosistem Hutan Pantai',
    eduAction:
      'Pelajari pemulihan petak pakan alami dari gulma palem Langkap dan hemat konsumsi kertas.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=600&q=80',
        caption: 'Jejak Satwa Pantai'
      },
      {
        img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
        caption: 'Pesisir Ujung Kulon'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-koridor-hayati'
  },
  'tn-gunung-leuser': {
    biomeSubtitle: 'Kanopi Hutan Hujan Tropis & Koridor Empat Megafauna Sumatera',
    dioramaTheme: {
      skyCloud: '#f5ebe0',
      canopyDark: '#1b4332',
      canopyMid: '#40916c',
      canopyLight: '#95d5b2',
      hillUpper: '#ddbea9',
      hillArch: '#a57551',
      hillArchShadow: '#4a3222',
      waterTop: '#38a3a5',
      waterDeep: '#22577a',
      accentPop: '#ea580c',
      accentSoft: '#fb923c',
      faunaLabel: 'Harimau & Orangutan Sumatera'
    },
    globalIssue: {
      tag: 'LABORATORIUM KORIDOR RIMBA',
      metric: '3.7 Juta Ha Deforestasi Tropis Global',
      impact:
        'Fragmentasi habitat memicu perjumpaan berbahaya satwa dengan pemukiman dan memudahkan akses jerat pemburu ilegal.'
    },
    handwriting: 'Kabut fajar di kanopi Leuser, stasiun riset empat satwa kunci...',
    fieldNote:
      'Satu-satunya rimba bumi tempat Harimau, Orangutan, Gajah, dan Badak hidup berdampingan. Menjaga Leuser berarti mengunci miliaran ton cadangan karbon dunia.',
    ecoRole: 'Apex Predator & Paru-Paru Karbon Utama Sumatera Utara',
    eduAction:
      'Dukung patroli sapu bersih jerat kawat dan pastikan produk kayu serta kertas berlabel ramah lingkungan.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80',
        caption: 'Pemantauan Rimba'
      },
      {
        img: 'https://images.unsplash.com/photo-1551085254-e96b210df58a?auto=format&fit=crop&w=600&q=80',
        caption: 'Koridor Jelajah Megafauna'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1551085254-e96b210df58a?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-iklim-pohon'
  },
  'tn-tanjung-puting': {
    biomeSubtitle: 'Suaka Rawa Gambut Air Hitam & Rehabilitasi Orangutan Borneo',
    dioramaTheme: {
      skyCloud: '#f6efe4',
      canopyDark: '#264653',
      canopyMid: '#2a9d8f',
      canopyLight: '#a8dadc',
      hillUpper: '#e9c46a',
      hillArch: '#b5835a',
      hillArchShadow: '#4d3627',
      waterTop: '#0096c7',
      waterDeep: '#023e8a',
      accentPop: '#e76f51',
      accentSoft: '#f4a261',
      faunaLabel: 'Orangutan Kalimantan (Pongo pygmaeus)'
    },
    globalIssue: {
      tag: 'PUSAT HIDROLOGI LAHAN BASAH',
      metric: '550 Gigaton Karbon Global di Gambut',
      impact:
        'Gambut yang kering akibat kanalisasi melepaskan emisi gas rumah kaca masif dan memicu kebakaran bawah tanah.'
    },
    handwriting: 'Menyusuri Sungai Sekonyer hitam menuju Camp Leakey Borneo...',
    fieldNote:
      'Kawasan suaka rawa gambut dan rehabilitasi primata Borneo. Lahan gambut dalam mampu menyimpan karbon hingga 10 kali lebih padat dibanding hutan tanah mineral biasa.',
    ecoRole: 'Penyimpan Cadangan Karbon Alami & Suaka Orangutan',
    eduAction:
      'Pelajari hidrologi sekat kanal gambut dan dukung adopsi bibit pohon endemik rawa air hitam.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?auto=format&fit=crop&w=600&q=80',
        caption: 'Rehabilitasi Primata'
      },
      {
        img: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80',
        caption: 'Rawa Air Hitam Gambut'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-iklim-pohon'
  },
  'tn-komodo': {
    biomeSubtitle: 'Kepulauan Savana Vulkanik & Segitiga Terumbu Karang Tropis',
    dioramaTheme: {
      skyCloud: '#f8f0e3',
      canopyDark: '#3d5a45',
      canopyMid: '#6b8e63',
      canopyLight: '#b7c99b',
      hillUpper: '#e6ccb2',
      hillArch: '#c68b59',
      hillArchShadow: '#5e3c23',
      waterTop: '#00b4d8',
      waterDeep: '#0077b6',
      accentPop: '#d9480f',
      accentSoft: '#f76707',
      faunaLabel: 'Komodo (Varanus komodoensis)'
    },
    globalIssue: {
      tag: 'OBSERVATORIUM KELAUTAN TROPIS',
      metric: '11 Juta Ton Plastik Masuk Laut/Thn',
      impact:
        'Kenaikan suhu perairan dan mikroplastik merusak ekosistem karang yang menjadi sumber pangan rantai laut.'
    },
    handwriting: 'Bukit savana gersang dan terumbu karang Segitiga Karang NTT...',
    fieldNote:
      'Gugusan pulau purba vulkanik tempat kadal raksasa berkuasa. Perairannya menjadi koridor migrasi paus, lumba-lumba, dan pari manta.',
    ecoRole: 'Predator Puncak Savana & Bio-Indikator Terumbu Karang',
    eduAction:
      'Terapkan gaya hidup minim plastik sekali pakai dan lindungi perairan pesisir dari limbah.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=80',
        caption: 'Teluk Vulkanik Komodo'
      },
      {
        img: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&w=600&q=80',
        caption: 'Biota Terumbu Karang'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-plastik-laut'
  },
  'tn-kerinci-seblat': {
    biomeSubtitle: 'Atap Vulkanik Bukit Barisan & Suaka Puspa Raksasa Rafflesia',
    dioramaTheme: {
      skyCloud: '#f4ece1',
      canopyDark: '#234d36',
      canopyMid: '#4f772d',
      canopyLight: '#90a955',
      hillUpper: '#d6bfa3',
      hillArch: '#9c6644',
      hillArchShadow: '#492c1d',
      waterTop: '#4895ef',
      waterDeep: '#3f37c9',
      accentPop: '#dc2626',
      accentSoft: '#f97316',
      faunaLabel: 'Rafflesia arnoldii & Harimau Sumatera'
    },
    globalIssue: {
      tag: 'MENARA TANGKAPAN AIR SUMATERA',
      metric: '1 Juta Spesies Terancam Punah Global',
      impact:
        'Perambahan lereng pegunungan mengancam flora puspa raksasa terlangka dunia dan menurunkan debit mata air hulu.'
    },
    handwriting: 'Lembah basah Bukit Barisan, habitat puspa raksasa terlangka...',
    fieldNote:
      'Koridor hutan pegunungan terluas di Sumatera dengan lebih dari 4.000 jenis flora. Menjaga bunga Rafflesia arnoldii dan hulu sungai-sungai besar.',
    ecoRole: 'Tangkapan Air Pulau Sumatera & Koridor Flora Langka',
    eduAction:
      'Pahami pentingnya vegetasi pegunungan dalam mencegah tanah longsor dan bencana hidrometeorologi.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
        caption: 'Lembah Kabut Kerinci'
      },
      {
        img: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80',
        caption: 'Flora Pegunungan Basah'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-iklim-pohon'
  },
  'tn-lorentz': {
    biomeSubtitle: 'Gletser Tropis Puncak Jaya hingga Rimba Hujan Dataran Rendah Papua',
    dioramaTheme: {
      skyCloud: '#f0f4f8',
      canopyDark: '#1e3a3a',
      canopyMid: '#3b6e5c',
      canopyLight: '#8ab89d',
      hillUpper: '#d8cfc2',
      hillArch: '#9e7b66',
      hillArchShadow: '#42332b',
      waterTop: '#38bdf8',
      waterDeep: '#0284c7',
      accentPop: '#f59e0b',
      accentSoft: '#fbbf24',
      faunaLabel: 'Cendrawasih & Gletser Puncak Jaya'
    },
    globalIssue: {
      tag: 'STASIUN IKLIM GLETSER ALPIN',
      metric: '-80% Luas Es Abadi Sejak 2010',
      impact:
        'Pemanasan global mengikis habis kubah es abadi tropis Papua, indikator nyata kenaikan suhu planet bumi.'
    },
    handwriting: 'Dari salju abadi Puncak Jaya hingga rimba dataran rendah Papua...',
    fieldNote:
      'Kawasan konservasi terbesar di Asia Tenggara (2,4 juta hektar). Membentang utuh dari puncak bersalju hingga laut dangkal berhutan bakau.',
    ecoRole: 'Laboratorium Iklim Dunia & Habitat Flora Alpin Unik',
    eduAction:
      'Terapkan efisiensi energi sehari-hari guna menekan laju emisi gas rumah kaca global.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=600&q=80',
        caption: 'Puncak Es Alpin Tropis'
      },
      {
        img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
        caption: 'Lembah Dataran Tinggi'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-edukasi-sekolah'
  }
};

function getExtras(park) {
  if (!park) return PARK_JOURNAL_EXTRAS['tn-ujung-kulon'];
  return PARK_JOURNAL_EXTRAS[park.id] || PARK_JOURNAL_EXTRAS['tn-ujung-kulon'];
}

/**
 * Komponen Diorama Kertas Pop-Up 3D Berlapis (Multi-Tier 3D Paper-Cut Pop-Up Sculpture)
 * Menampilkan 6 lapis potongan kertas die-cut 3D yang berdiri tegak dari lipatan buku terbuka,
 * persis seperti referensi gambar buku pop-up 3D (awan kertas, pohon berlapis, bukit terowongan lengkung,
 * tangga batu, menara pos pengamatan, kolam/sungai biru, jamur/puspa oranye, dan jembatan gantung kertas).
 */
function PopUpPaperDiorama({ park, extras, isUnfolded, onOpenGallery }) {
  const theme = extras.dioramaTheme;

  // Transisi pegas saat lembaran pop-up berdiri dari halaman buku
  const getLayerAnimation = (delayOrder) => ({
    rotateX: isUnfolded ? 0 : -88,
    scaleY: isUnfolded ? 1 : 0.08,
    opacity: isUnfolded ? 1 : 0,
    transition: {
      duration: 0.82,
      delay: isUnfolded ? 0.14 + delayOrder * 0.07 : 0,
      ease: [0.22, 1, 0.36, 1]
    }
  });

  return (
    <div className="popup-diorama-rig" aria-hidden="false">
      {/* ============================================================
          LAPIS 1 (PALING BELAKANG): Siluet Awan Die-Cut Kertas & Puncak Kanopi
          ============================================================ */}
      <motion.div
        initial={false}
        animate={getLayerAnimation(0)}
        className="popup-paper-layer layer-z-1"
      >
        <svg
          viewBox="0 0 900 420"
          className="popup-layer-svg"
          preserveAspectRatio="xMidYBottom meet"
        >
          <defs>
            <filter id="paperDrop1" x="-8%" y="-8%" width="116%" height="116%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#1a1814" floodOpacity="0.28" />
            </filter>
          </defs>

          <g filter="url(#paperDrop1)">
            {/* Siluet Awan Die-Cut Kiri (Berlubang Artistik seperti gambar referensi) */}
            <path
              d="M70,390 L70,230 C52,215 56,178 85,168 C82,135 118,108 156,118 C178,82 238,80 264,115 C295,112 318,142 308,172 C332,188 328,225 302,240 L302,390 Z"
              fill={theme.skyCloud}
              stroke="#e5dac3"
              strokeWidth="3"
            />
            {/* Lubang Ukiran Kertas pada Awan Kiri */}
            <ellipse cx="145" cy="158" rx="28" ry="14" fill="#cbd5d0" opacity="0.7" />
            <ellipse cx="215" cy="138" rx="34" ry="15" fill="#cbd5d0" opacity="0.7" />
            <ellipse cx="180" cy="195" rx="24" ry="11" fill="#cbd5d0" opacity="0.65" />

            {/* Pohon Kanopi Besar Tengah-Atas dengan Tepi Kertas Krem */}
            <path
              d="M410,390 L410,165 C382,148 390,98 428,88 C435,38 505,24 548,62 C592,52 628,96 608,142 C636,162 626,214 590,228 L590,390 Z"
              fill="#e2e8b8"
              stroke={theme.skyCloud}
              strokeWidth="8"
            />
            <path
              d="M426,390 L426,175 C402,158 410,112 444,102 C450,56 508,44 542,78 C578,70 608,108 592,148 C614,166 606,208 574,222 L574,390 Z"
              fill="#b5c977"
            />

            {/* Siluet Awan & Pohon Kanan Die-Cut */}
            <path
              d="M610,390 L610,185 C592,162 608,120 644,116 C658,78 722,76 742,114 C778,112 802,148 784,180 C826,182 858,216 842,252 C868,272 854,312 820,322 L820,390 Z"
              fill={theme.skyCloud}
              stroke="#dfd3bc"
              strokeWidth="3"
            />
            <path
              d="M675,270 C650,248 665,205 705,202 C725,172 782,175 798,208 C832,212 842,252 812,272 C785,288 708,288 675,270 Z"
              fill="#d4c39a"
              stroke={theme.skyCloud}
              strokeWidth="5"
            />
          </g>
        </svg>
      </motion.div>

      {/* ============================================================
          LAPIS 2 (TENGAH-BELAKANG): Rumah Stasiun Bukit, Menara Pengamat, & Pohon Rimba Utama
          ============================================================ */}
      <motion.div
        initial={false}
        animate={getLayerAnimation(1)}
        className="popup-paper-layer layer-z-2"
      >
        <svg
          viewBox="0 0 900 420"
          className="popup-layer-svg"
          preserveAspectRatio="xMidYBottom meet"
        >
          <defs>
            <filter id="paperDrop2" x="-8%" y="-8%" width="116%" height="116%">
              <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#141915" floodOpacity="0.32" />
            </filter>
          </defs>

          <g filter="url(#paperDrop2)">
            {/* Pohon Kiri Tinggi Berlapis Kertas */}
            <path
              d="M175,390 L175,190 C145,175 152,126 188,116 C198,82 256,82 268,116 C298,125 304,172 275,190 L275,390 Z"
              fill={theme.skyCloud}
            />
            <path
              d="M218,390 L218,175 L234,175 L234,390 Z"
              fill="#5c4033"
            />
            <circle cx="202" cy="145" r="34" fill={theme.canopyLight} />
            <circle cx="246" cy="138" r="38" fill={theme.canopyMid} />
            <circle cx="225" cy="112" r="30" fill={theme.canopyLight} />

            {/* Pondok Konservasi Atap Segitiga di Puncak Bukit */}
            <g transform="translate(335, 108)">
              <polygon
                points="0,68 58,8 116,68"
                fill="#a67c52"
                stroke={theme.skyCloud}
                strokeWidth="5"
              />
              <rect
                x="14"
                y="68"
                width="88"
                height="62"
                fill="#e6d5b8"
                stroke="#c7b299"
                strokeWidth="2"
              />
              <rect x="34" y="82" width="20" height="26" rx="3" fill="#4a3525" />
              <rect x="66" y="82" width="18" height="18" rx="2" fill="#6b4f3a" />
              {/* Payung Oranye Stasiun Riset */}
              <path d="M98,64 Q124,42 150,64 Z" fill={theme.accentSoft} stroke={theme.skyCloud} strokeWidth="3" />
              <line x1="124" y1="64" x2="124" y2="108" stroke="#5c4033" strokeWidth="3" />
            </g>

            {/* Pohon Rimba Besar Utama (Tengah-Kanan) seperti Gambar Referensi */}
            <g transform="translate(445, 72)">
              {/* Tepian Die-Cut Kertas Krem */}
              <path
                d="M65,318 L65,165 C22,155 12,102 48,78 C45,32 105,12 142,42 C182,25 225,68 202,112 C232,135 215,182 172,186 L172,318 Z"
                fill={theme.skyCloud}
              />
              {/* Batang & Cabang Pohon */}
              <path
                d="M106,318 L108,162 L78,122 L90,115 L116,148 L118,108 L132,110 L130,152 L162,120 L170,130 L134,168 L138,318 Z"
                fill="#4a3222"
              />
              {/* Rumpun Daun Berlapis */}
              <circle cx="72" cy="118" r="44" fill={theme.canopyMid} />
              <circle cx="164" cy="122" r="46" fill={theme.canopyLight} />
              <circle cx="118" cy="78" r="52" fill={theme.canopyDark} />
              <circle cx="96" cy="95" r="36" fill={theme.canopyMid} />
              <circle cx="146" cy="96" r="38" fill={theme.canopyMid} />
            </g>

            {/* Menara Observasi Batu/Kayu di Sebelah Kanan Pohon */}
            <g transform="translate(592, 134)">
              <polygon
                points="2,58 38,6 74,58"
                fill="#8d6346"
                stroke={theme.skyCloud}
                strokeWidth="4"
              />
              <rect
                x="8"
                y="58"
                width="60"
                height="96"
                fill="#dfd3c3"
                stroke="#b8a692"
                strokeWidth="2"
              />
              <path d="M26,142 L26,92 A12,12 0 0,1 50,92 L50,142 Z" fill="#6b5344" />
              <circle cx="38" cy="74" r="6" fill="#4a3728" />
            </g>

            {/* Pohon Cemara/Hutan Gelap Kanan */}
            <g transform="translate(690, 118)">
              <path
                d="M42,272 L42,148 C14,138 14,96 38,82 C34,44 82,28 104,58 C132,54 148,92 128,118 C148,136 136,174 102,178 L102,272 Z"
                fill={theme.skyCloud}
              />
              <rect x="66" y="138" width="16" height="134" fill="#3d281a" />
              <circle cx="56" cy="112" r="34" fill="#284b37" />
              <circle cx="92" cy="116" r="36" fill="#1e3829" />
              <circle cx="74" cy="78" r="38" fill="#345e46" />
              <circle cx="44" cy="146" r="28" fill="#52b788" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* ============================================================
          LAPIS 3 (TENGAH UTAMA): Bukit Tebing Terowongan Lengkung, Tangga Batu, & Pagar Kayu
          ============================================================ */}
      <motion.div
        initial={false}
        animate={getLayerAnimation(2)}
        className="popup-paper-layer layer-z-3"
      >
        <svg
          viewBox="0 0 900 420"
          className="popup-layer-svg"
          preserveAspectRatio="xMidYBottom meet"
        >
          <defs>
            <filter id="paperDrop3" x="-8%" y="-8%" width="116%" height="116%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#141412" floodOpacity="0.38" />
            </filter>
          </defs>

          <g filter="url(#paperDrop3)">
            {/* Pagar Kayu Melengkung di Punggung Bukit Atas */}
            <path
              d="M235,212 Q380,152 535,205"
              fill="none"
              stroke="#7f5539"
              strokeWidth="5"
            />
            <path
              d="M235,222 Q380,162 535,215"
              fill="none"
              stroke="#9c6644"
              strokeWidth="3"
            />
            {[250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 520].map((px, i) => {
              const py = 212 - Math.sin(((px - 235) / 300) * Math.PI) * 32;
              return (
                <line
                  key={i}
                  x1={px}
                  y1={py - 10}
                  x2={px}
                  y2={py + 16}
                  stroke="#6c462f"
                  strokeWidth="4"
                />
              );
            })}

            {/* Struktur Bukit Terowongan Berlapis Kertas (Ikonik sesuai Gambar Referensi) */}
            {/* Rongga Gelap Dalam Terowongan */}
            <path
              d="M225,385 L225,225 Q380,160 545,225 L545,385 Z"
              fill={theme.hillArchShadow}
            />

            {/* Muka Tebing Kertas Berlubang Lengkung (Arched Cutouts) */}
            <path
              d="M210,385 L210,232 Q380,162 555,232 L555,385 L495,385 L495,265 A28,36 0 0,0 440,265 L440,385 L415,385 L415,248 A36,48 0 0,0 342,248 L342,385 L312,385 L312,268 A28,36 0 0,0 256,268 L256,385 Z"
              fill={theme.hillArch}
              stroke={theme.skyCloud}
              strokeWidth="4"
            />

            {/* Topi Rumput Krem-Hijau Melengkung di Atas Tebing (Scalloped Paper Overhang) */}
            <path
              d="M206,232 Q295,188 382,188 Q470,188 558,232 C540,248 522,226 504,242 C486,256 468,228 450,242 C430,256 412,224 384,238 C356,224 338,254 318,240 C298,226 280,252 260,238 C240,224 222,246 206,232 Z"
              fill="#e9e2ce"
              stroke="#d5c9ad"
              strokeWidth="2"
            />

            {/* Tangga Kertas Lipat Tengah Bukit */}
            <g transform="translate(352, 260)">
              <rect x="0" y="0" width="52" height="92" fill="#e6ccb2" stroke="#b08968" strokeWidth="2" />
              {[12, 24, 36, 48, 60, 72, 84].map((sy) => (
                <line key={sy} x1="2" y1={sy} x2="50" y2={sy} stroke="#8d6346" strokeWidth="3" />
              ))}
              {/* Pilar Batu Kiri & Kanan Tangga */}
              <rect x="-12" y="-8" width="14" height="100" rx="2" fill="#c9ada7" stroke={theme.skyCloud} strokeWidth="2" />
              <rect x="50" y="-8" width="14" height="100" rx="2" fill="#c9ada7" stroke={theme.skyCloud} strokeWidth="2" />
            </g>

            {/* Bukit Terasering Kanan Menuju Lembah Kolam */}
            <path
              d="M535,385 L535,252 Q645,235 745,275 L745,385 Z"
              fill={theme.hillUpper}
              stroke={theme.skyCloud}
              strokeWidth="4"
            />
          </g>
        </svg>
      </motion.div>

      {/* ============================================================
          LAPIS 4 (TENGAH-DEPAN): Lembah Danau/Sungai Biru & Rumpun Jamur/Kanopi Oranye
          ============================================================ */}
      <motion.div
        initial={false}
        animate={getLayerAnimation(3)}
        className="popup-paper-layer layer-z-4"
      >
        <svg
          viewBox="0 0 900 420"
          className="popup-layer-svg"
          preserveAspectRatio="xMidYBottom meet"
        >
          <defs>
            <filter id="paperDrop4" x="-8%" y="-8%" width="116%" height="116%">
              <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#141412" floodOpacity="0.34" />
            </filter>
          </defs>

          <g filter="url(#paperDrop4)">
            {/* Lembah Sungai / Kolam Air Biru Berlapis Kertas (Di Tengah-Kanan seperti Gambar) */}
            <path
              d="M475,390 C465,320 508,262 568,262 C628,262 668,318 656,390 Z"
              fill={theme.skyCloud}
            />
            <path
              d="M486,390 C478,328 515,274 568,274 C621,274 656,328 646,390 Z"
              fill={theme.waterDeep}
            />
            <path
              d="M498,390 C492,338 522,290 568,290 C612,290 642,338 634,390 Z"
              fill={theme.waterTop}
            />
            {/* Riak Air & Teratai Kertas Putih di Kolam */}
            <ellipse cx="552" cy="316" rx="22" ry="7" fill="#e0fbfc" opacity="0.85" />
            <ellipse cx="588" cy="336" rx="16" ry="5" fill="#e0fbfc" opacity="0.8" />
            <ellipse cx="545" cy="352" rx="26" ry="8" fill="#98c1d9" opacity="0.75" />

            {/* Rumpun Kanopi Jamur / Payung Flora Oranye di Sisi Kanan & Kiri */}
            {/* Jamur / Flora Oranye Kiri */}
            <g transform="translate(262, 265)">
              <rect x="20" y="34" width="12" height="58" rx="3" fill="#e6ccb2" stroke="#b08968" strokeWidth="2" />
              <path
                d="M0,38 Q26,2 52,38 Z"
                fill={theme.accentPop}
                stroke={theme.skyCloud}
                strokeWidth="3"
              />
            </g>

            {/* Rumpun Kanopi Jamur / Pohon Oranye Bertingkat di Kanan (Persis Gambar Referensi) */}
            <g transform="translate(585, 250)">
              {/* Jamur Oranye 1 */}
              <rect x="26" y="38" width="12" height="72" fill="#ddb892" />
              <path d="M2,42 Q32,4 62,42 Z" fill={theme.accentSoft} stroke={theme.skyCloud} strokeWidth="3" />

              {/* Jamur Oranye 2 */}
              <rect x="78" y="28" width="14" height="84" fill="#ddb892" />
              <path d="M48,34 Q85,-6 122,34 Z" fill={theme.accentPop} stroke={theme.skyCloud} strokeWidth="3" />

              {/* Jamur Oranye 3 (Bawah) */}
              <rect x="52" y="72" width="14" height="62" fill="#e6ccb2" />
              <path d="M22,76 Q59,38 96,76 Z" fill={theme.accentSoft} stroke={theme.skyCloud} strokeWidth="3" />

              {/* Jamur Oranye 4 (Kanan) */}
              <rect x="118" y="64" width="14" height="70" fill="#e6ccb2" />
              <path d="M88,68 Q125,30 162,68 Z" fill={theme.accentPop} stroke={theme.skyCloud} strokeWidth="3" />

              {/* Pohon Daun Merah-Oranye Kanan */}
              <path d="M168,136 L174,78 L184,78 L190,136 Z" fill="#5c3a21" />
              <circle cx="165" cy="64" r="24" fill="#dc2f02" stroke={theme.skyCloud} strokeWidth="3" />
              <circle cx="192" cy="68" r="22" fill="#e85d04" stroke={theme.skyCloud} strokeWidth="3" />
              <circle cx="178" cy="46" r="20" fill="#f48c06" stroke={theme.skyCloud} strokeWidth="3" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* ============================================================
          LAPIS 5 (DEPAN): Jembatan Gantung Kertas Kiri-Kanan, Lipatan V Tengah, & Satwa Kunci
          ============================================================ */}
      <motion.div
        initial={false}
        animate={getLayerAnimation(4)}
        className="popup-paper-layer layer-z-5"
      >
        <svg
          viewBox="0 0 900 420"
          className="popup-layer-svg"
          preserveAspectRatio="xMidYBottom meet"
        >
          <defs>
            <filter id="paperDrop5" x="-8%" y="-8%" width="116%" height="116%">
              <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#121310" floodOpacity="0.4" />
            </filter>
          </defs>

          <g filter="url(#paperDrop5)">
            {/* Rumpun Pohon Hijau Berlapis di Sisi Kiri Depan */}
            <g transform="translate(52, 170)">
              <path
                d="M35,220 L35,112 C8,98 12,56 42,46 C48,12 98,10 112,42 C142,48 144,92 118,110 L118,220 Z"
                fill={theme.skyCloud}
              />
              <rect x="70" y="105" width="16" height="115" fill="#4a3222" />
              <circle cx="56" cy="82" r="32" fill={theme.canopyMid} />
              <circle cx="96" cy="84" r="34" fill={theme.canopyDark} />
              <circle cx="76" cy="52" r="32" fill={theme.canopyLight} />
            </g>

            {/* Jembatan Kertas Menurun dari Kiri ke Lipatan Tengah Buku */}
            <g>
              <polygon
                points="195,295 398,362 398,382 195,315"
                fill="#dfd3bc"
                stroke="#8d6346"
                strokeWidth="3"
              />
              <line x1="195" y1="280" x2="398" y2="347" stroke="#6c462f" strokeWidth="4" />
              {[210, 235, 260, 285, 310, 335, 360, 385].map((bx, idx) => {
                const by = 295 + ((bx - 195) / 203) * 67;
                return (
                  <line
                    key={idx}
                    x1={bx}
                    y1={by - 16}
                    x2={bx}
                    y2={by + 12}
                    stroke="#6c462f"
                    strokeWidth="3.5"
                  />
                );
              })}
            </g>

            {/* Jembatan Kertas Menurun dari Kanan ke Lipatan Tengah Buku */}
            <g>
              <polygon
                points="655,308 492,366 492,384 655,326"
                fill="#dfd3bc"
                stroke="#8d6346"
                strokeWidth="3"
              />
              <line x1="655" y1="294" x2="492" y2="352" stroke="#6c462f" strokeWidth="4" />
              {[508, 532, 556, 580, 604, 628, 646].map((bx, idx) => {
                const by = 366 - ((bx - 492) / 163) * 58;
                return (
                  <line
                    key={idx}
                    x1={bx}
                    y1={by - 15}
                    x2={bx}
                    y2={by + 10}
                    stroke="#6c462f"
                    strokeWidth="3.5"
                  />
                );
              })}
            </g>

            {/* Standee Pop-Up Satwa Kunci & Penjaga Hutan di Atas Halaman Kertas */}
            {/* Patung Kertas Satwa Kunci di Tengah-Kiri */}
            <g transform="translate(415, 305)">
              <path
                d="M-8,68 L-8,18 C-8,4 8,-6 28,-6 C48,-6 64,4 64,18 L64,68 Z"
                fill={theme.skyCloud}
                stroke="#cbb89d"
                strokeWidth="2"
              />
              {/* Siluet Satwa Berdiri */}
              <ellipse cx="28" cy="34" rx="22" ry="15" fill="#5c4033" />
              <circle cx="48" cy="24" r="10" fill="#4a3222" />
              <polygon points="55,18 62,10 58,24" fill="#d4a373" />
              <rect x="12" y="44" width="6" height="18" rx="2" fill="#4a3222" />
              <rect x="24" y="46" width="6" height="16" rx="2" fill="#5c4033" />
              <rect x="38" y="44" width="6" height="18" rx="2" fill="#4a3222" />
            </g>

            {/* Figur Penjaga Hutan / Peneliti Kertas di Kanan Depan */}
            <g transform="translate(692, 318)">
              <rect x="-6" y="-8" width="32" height="72" rx="10" fill={theme.skyCloud} />
              <circle cx="10" cy="8" r="8" fill="#d97706" />
              <rect x="3" y="18" width="14" height="24" rx="4" fill="#e85d04" />
              <line x1="6" y1="42" x2="2" y2="60" stroke="#78350f" strokeWidth="4" />
              <line x1="14" y1="42" x2="18" y2="60" stroke="#78350f" strokeWidth="4" />
            </g>

            {/* Pohon/Jamur Kecil Kertas Putih di Halaman Kiri Depan (Persis Referensi) */}
            <g transform="translate(215, 332)">
              <rect x="16" y="22" width="10" height="38" fill="#c2a887" />
              <path
                d="M-6,26 Q21,-2 48,26 L36,32 L8,32 Z"
                fill={theme.skyCloud}
                stroke="#d6c7b2"
                strokeWidth="2.5"
              />
            </g>
          </g>
        </svg>

        {/* Lencana Interaktif Pop-Up 3D Mengambang di Atas Diorama */}
        <div className="popup-floating-badges">
          <div className="popup-tag-chip popup-species-banner">
            <Sparkles size={12} />
            <span>Pop-Up Satwa & Flora: {theme.faunaLabel}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenGallery();
            }}
            className="popup-photo-trigger-btn"
            title="Lihat Dokumentasi Foto Lapangan"
          >
            <Camera size={13} />
            <span>Foto Lapangan ({extras.filmStrip.length})</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ParkJournalBook({ parks, onDonatePark }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [turningLeaf, setTurningLeaf] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [cameraTilt, setCameraTilt] = useState({ x: 0, y: 0 });
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const sectionRef = useRef(null);
  const hasAutoOpenedRef = useRef(false);

  const total = parks.length;
  const currentPark = parks[pageIndex] || parks[0];
  const extras = getExtras(currentPark);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileViewport = viewportWidth <= 768;
  const isTabletViewport = viewportWidth > 768 && viewportWidth <= 1100;

  // Otomatis membuka buku pop-up 3D ketika pengguna menggulir ke seksi Atlas 3D
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            if (!hasAutoOpenedRef.current) {
              hasAutoOpenedRef.current = true;
              setTimeout(() => {
                setIsBookOpen(true);
              }, 260);
            }
          }
        });
      },
      { threshold: [0.35] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Efek paralaks sudut pandang 3D saat menggerakkan kursor di atas buku
  const handleStageMouseMove = (e) => {
    if (isMobileViewport) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setCameraTilt({
      x: -ny * 7,
      y: nx * 12
    });
  };

  const handleStageMouseLeave = () => {
    setCameraTilt({ x: 0, y: 0 });
  };

  const triggerPageFlip = (targetIdx, dir) => {
    if (turningLeaf || targetIdx === pageIndex) return;

    if (!isBookOpen) {
      setPageIndex(targetIdx);
      setIsBookOpen(true);
      return;
    }

    setTurningLeaf({
      dir,
      fromIdx: pageIndex,
      toIdx: targetIdx
    });

    setTimeout(() => {
      setPageIndex(targetIdx);
      setTurningLeaf(null);
    }, 780);
  };

  const handleNextPage = () => {
    if (!isBookOpen) {
      setIsBookOpen(true);
      return;
    }
    const nextIdx = (pageIndex + 1) % total;
    triggerPageFlip(nextIdx, 'next');
  };

  const handlePrevPage = () => {
    if (!isBookOpen) {
      setIsBookOpen(true);
      return;
    }
    const prevIdx = (pageIndex - 1 + total) % total;
    triggerPageFlip(prevIdx, 'prev');
  };

  const isDioramaUnfolded = isBookOpen && !turningLeaf;

  return (
    <section
      ref={sectionRef}
      id="section-taman-nasional"
      className="journal-book-section popup-book-section snap-section"
      aria-label="Atlas 3D Pop-Up Ekologi & Isu Lingkungan Global"
    >
      <div className="journal-container popup-atlas-container">
        {/* Header Atlas Pop-Up 3D */}
        <div className="journal-header">
          <div className="journal-pill-badge">
            <Layers size={13} />
            <span>ATLAS POP-UP 3D EKOLOGI & ISU GLOBAL</span>
          </div>
          <h2 className="journal-title">Diorama Buku Pop-Up 3D Nusantara</h2>
          <p className="journal-subtitle">
            <BookOpen size={15} />
            <span>
              {isBookOpen
                ? `Bab ${pageIndex + 1} dari ${total}: ${currentPark.name} (${currentPark.province})`
                : 'Buku Pop-Up Tertutup • Klik Sampul untuk Membuka Diorama 3D'}
            </span>
          </p>

          {/* Navigasi Cepat Bab Taman Nasional */}
          <div className="popup-chapter-tabs" role="tablist" aria-label="Pilih Bab Taman Nasional">
            {parks.map((parkItem, idx) => (
              <button
                key={parkItem.id}
                type="button"
                role="tab"
                aria-selected={pageIndex === idx}
                onClick={() => triggerPageFlip(idx, idx > pageIndex ? 'next' : 'prev')}
                className={`popup-chapter-tab ${pageIndex === idx ? 'active' : ''}`}
              >
                <span className="chapter-num">0{idx + 1}</span>
                <span className="chapter-name">
                  {parkItem.name.replace('Taman Nasional ', 'TN ')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================
            PANGGUNG UTAMA BUKU POP-UP 3D (SESUAI GAMBAR REFERENSI)
            ============================================================ */}
        <div
          className="popup-book-3d-stage"
          onMouseMove={handleStageMouseMove}
          onMouseLeave={handleStageMouseLeave}
        >
          <AnimatePresence mode="wait">
            {!isBookOpen ? (
              /* TAMPILAN BUKU TERTUTUP (SAMPUL HARDCOVER KULIT MERAH- BATA 3D) */
              <motion.div
                key="closed-popup-tome"
                initial={{ opacity: 0, rotateX: 18, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  rotateX: 14 + cameraTilt.x,
                  rotateY: -12 + cameraTilt.y,
                  scale: 1
                }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="popup-closed-tome"
                onClick={() => setIsBookOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setIsBookOpen(true);
                }}
                aria-label="Klik untuk membuka Buku Pop-Up 3D"
              >
                <div className="tome-spine-left" />
                <div className="tome-paper-block-right" />
                <div className="tome-front-cover">
                  <div className="tome-gold-frame">
                    <span className="tome-eyebrow">EDISI POP-UP DIORAMA 3D</span>
                    <h3>ATLAS EKOLOGI NUSANTARA</h3>
                    <p>{currentPark.name}</p>
                    <div className="tome-cover-emblem">
                      <img src={currentPark.image} alt={currentPark.name} />
                    </div>
                    <span className="tome-open-cta">
                      <Sparkles size={15} /> Klik untuk Membuka Buku Pop-Up 3D
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* TAMPILAN BUKU POP-UP 3D TERBUKA DI ATAS MEJA (PERSIS GAMBAR REFERENSI) */
              <motion.div
                key="open-popup-book"
                initial={{ opacity: 0, scale: 0.88, rotateX: 35 }}
                animate={{
                  opacity: 1,
                  scale: isMobileViewport ? 0.88 : isTabletViewport ? 0.94 : 1,
                  rotateX: cameraTilt.x,
                  rotateY: cameraTilt.y
                }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="popup-open-book-assembly"
              >
                {/* 1. LAPISAN DIORAMA KERTAS POP-UP 3D YANG BERDIRI TEGAK DI ATAS BUKU */}
                <PopUpPaperDiorama
                  park={currentPark}
                  extras={extras}
                  isUnfolded={isDioramaUnfolded}
                  onOpenGallery={() => setShowPhotoModal(true)}
                />

                {/* 2. LEMBARAN KERTAS TERBUKA & TUMPUKAN KERTAS TEBAL (OPEN BOOK BASE) */}
                <div className="popup-book-table-base">
                  {/* Sampul Hardcover Merah-Terakota di Bagian Paling Bawah */}
                  <div className="popup-hardcover-board">
                    <div className="hardcover-wing-left" />
                    <div className="hardcover-spine-hinge" />
                    <div className="hardcover-wing-right" />
                  </div>

                  {/* Tumpukan Ketebalan Kertas Berlapis Kiri & Kanan */}
                  <div className="popup-paper-wedge wedge-left" />
                  <div className="popup-paper-wedge wedge-right" />

                  {/* Permukaan Lembaran Buku Terbuka Kiri & Kanan */}
                  <div className="popup-open-pages-spread">
                    {/* LEMBAR HALAMAN KIRI (Teks Buku Cetak & Data Krisis Global) */}
                    <div
                      className="popup-open-page page-wing-left"
                      onClick={handlePrevPage}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handlePrevPage();
                      }}
                      title="Klik halaman kiri untuk ke bab sebelumnya"
                    >
                      {/* Rumput Kertas Dasar Diorama Kiri */}
                      <div className="page-diorama-lawn lawn-left" />

                      {/* Area Tipografi Buku di Bagian Depan Halaman Kiri */}
                      <div className="page-printed-columns">
                        <div className="printed-header-row">
                          <span className="printed-chap-tag">
                            BAB 0{pageIndex + 1} • {currentPark.unescoStatus}
                          </span>
                          <span className="printed-Metric-pill">
                            <AlertTriangle size={11} /> {extras.globalIssue.metric}
                          </span>
                        </div>

                        <h3 className="printed-park-title">{currentPark.name}</h3>
                        <p className="printed-park-loc">
                          <MapPin size={12} /> {currentPark.province} • Luas {currentPark.area}
                        </p>

                        <p className="printed-book-paragraph">
                          <strong>{extras.globalIssue.tag}:</strong> {extras.globalIssue.impact}{' '}
                          {extras.fieldNote}
                        </p>

                        <span className="printed-page-folio">Halaman {pageIndex * 2 + 1}</span>
                      </div>
                    </div>

                    {/* Lipatan Tengah Buku (Central Spine Gutter) */}
                    <div className="popup-center-gutter" />

                    {/* LEMBAR HALAMAN KANAN (Teks Buku Cetak, Peran Ekologi & Tombol Aksi) */}
                    <div
                      className="popup-open-page page-wing-right"
                      onClick={handleNextPage}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleNextPage();
                      }}
                      title="Klik halaman kanan untuk ke bab berikutnya"
                    >
                      {/* Rumput Kertas Dasar Diorama Kanan */}
                      <div className="page-diorama-lawn lawn-right" />

                      {/* Area Tipografi Buku di Bagian Depan Halaman Kanan */}
                      <div className="page-printed-columns">
                        <div className="printed-header-row">
                          <span className="printed-eco-badge">
                            <Leaf size={11} /> {extras.ecoRole}
                          </span>
                          <span className="printed-ecosystem-tag">
                            <Compass size={11} /> {currentPark.ecosystem}
                          </span>
                        </div>

                        <p className="printed-handwriting-quote">"{extras.handwriting}"</p>

                        <p className="printed-book-paragraph">
                          <strong>Panduan Edukasi & Konservasi:</strong> {extras.eduAction}
                        </p>

                        <div className="printed-footer-bar">
                          <div className="printed-species-list">
                            {currentPark.keySpecies.map((sp) => (
                              <span key={sp} className="printed-sp-tag">
                                {sp}
                              </span>
                            ))}
                          </div>

                          {onDonatePark && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDonatePark(extras.campaignId);
                              }}
                              className="printed-donate-cta"
                            >
                              <HeartHandshake size={13} />
                              <span>Aksi Konservasi</span>
                            </button>
                          )}
                        </div>

                        <span className="printed-page-folio folio-right">
                          Halaman {pageIndex * 2 + 2}
                        </span>
                      </div>
                    </div>

                    {/* ANIMASI LEMBARAN KERTAS MEMBALIK SAAT PINDAH BAB */}
                    <AnimatePresence>
                      {turningLeaf && (
                        <motion.div
                          key={`flip-sheet-${turningLeaf.fromIdx}-${turningLeaf.toIdx}`}
                          initial={{
                            rotateY: turningLeaf.dir === 'next' ? 0 : -180
                          }}
                          animate={{
                            rotateY: turningLeaf.dir === 'next' ? -180 : 0
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.76,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                          className="popup-turning-sheet"
                        >
                          <div className="turning-sheet-lines" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DOCK KONTROL NAVIGASI BUKU POP-UP 3D */}
        <div className="journal-bottom-dock">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={handlePrevPage}
            className="journal-dock-btn"
            title="Bab Sebelumnya"
            aria-label="Bab Sebelumnya"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsBookOpen((o) => !o)}
            className={`journal-dock-pill-btn ${!isBookOpen ? 'active-dock' : ''}`}
            title={isBookOpen ? 'Lipat & Tutup Buku Pop-Up' : 'Buka Buku Pop-Up 3D'}
          >
            {isBookOpen ? <BookMarked size={16} /> : <BookOpen size={16} />}
            <span>{isBookOpen ? 'Tutup Buku 3D' : 'Buka Buku 3D'}</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowPhotoModal(true)}
            className="journal-dock-btn"
            title={`Lihat Foto Lapangan ${currentPark.name}`}
            aria-label={`Lihat Foto Lapangan ${currentPark.name}`}
          >
            <Camera size={18} />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onDonatePark(extras.campaignId)}
            className="journal-dock-btn donate-dock"
            title={`Dukung Konservasi ${currentPark.name}`}
            aria-label={`Dukung Konservasi ${currentPark.name}`}
          >
            <HeartHandshake size={18} />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleNextPage}
            className="journal-dock-btn"
            title="Bab Berikutnya"
            aria-label="Bab Berikutnya"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* MODAL GALERI DOKUMENTASI LAPANGAN TAMAN NASIONAL */}
      <AnimatePresence>
        {showPhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setShowPhotoModal(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Dokumentasi Visual ${currentPark.name}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="popup-gallery-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-modal-header">
                <div>
                  <span className="popup-modal-eyebrow">ARSIP FOTOGRAFI LAPANGAN</span>
                  <h4>{currentPark.name}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(false)}
                  className="popup-modal-close"
                  aria-label="Tutup"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="popup-modal-grid">
                {extras.polaroids.map((pol) => (
                  <div key={pol.caption} className="popup-modal-photo-card">
                    <img src={pol.img} alt={pol.caption} />
                    <span>{pol.caption}</span>
                  </div>
                ))}
                {extras.filmStrip.slice(2).map((url, idx) => (
                  <div key={url} className="popup-modal-photo-card">
                    <img src={url} alt={`Dokumentasi ${idx + 3}`} />
                    <span>Ekspedisi Kawasan #{idx + 3}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
