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
import PopUpBook3DCanvas from './PopUpBook3DCanvas';

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

export default function ParkJournalBook({ parks, onDonatePark }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [flipState, setFlipState] = useState({ id: 0, dir: 'next' });
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const sectionRef = useRef(null);
  const hasAutoOpenedRef = useRef(false);

  const total = parks.length;
  const currentPark = parks[pageIndex] || parks[0];
  const extras = getExtras(currentPark);

  // Otomatis membuka buku pop-up 3D saat pengguna menggulir ke seksi Atlas 3D
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
              }, 240);
            }
          }
        });
      },
      { threshold: [0.35] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const triggerPageFlip = (targetIdx, dir) => {
    if (targetIdx === pageIndex) return;
    setPageIndex(targetIdx);
    if (!isBookOpen) {
      setIsBookOpen(true);
      return;
    }
    setFlipState((prev) => ({ id: prev.id + 1, dir }));
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
          <h2 className="journal-title">Buku Pop-Up 3D Konservasi Nusantara</h2>
          <p className="journal-subtitle">
            <BookOpen size={15} />
            <span>
              {isBookOpen
                ? `Bab ${pageIndex + 1} dari ${total}: ${currentPark.name} (${currentPark.province})`
                : 'Buku Pop-Up Tertutup • Klik Buku atau Tombol Buka untuk Memekarkan Diorama 3D'}
            </span>
          </p>
        </div>

        {/* PANGGUNG WEBGL THREE.JS 3D POP-UP BOOK NYATA */}
        <div className="popup-webgl-stage-box">
          <PopUpBook3DCanvas
            park={currentPark}
            extras={extras}
            isBookOpen={isBookOpen}
            flipDirection={flipState.dir}
            flipTriggerId={flipState.id}
            onToggleBook={() => setIsBookOpen((o) => !o)}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        </div>

        {/* PANEL INFORMASI BAB AKTIF DI BAWAH BUKU 3D */}
        <div className="popup-info-deck">
          <div className="popup-info-card">
            <div className="printed-header-row">
              <span className="printed-chap-tag">
                BAB 0{pageIndex + 1} • {currentPark.unescoStatus}
              </span>
              <span className="printed-metric-pill">
                <AlertTriangle size={11} /> {extras.globalIssue.metric}
              </span>
            </div>
            <h3 className="popup-info-title">{currentPark.name}</h3>
            <p className="printed-park-loc">
              <MapPin size={12} /> {currentPark.province} • Luas {currentPark.area}
            </p>
            <p className="popup-info-desc">
              <strong>{extras.globalIssue.tag}:</strong> {extras.globalIssue.impact}{' '}
              {extras.fieldNote}
            </p>
          </div>

          <div className="popup-info-card">
            <div className="printed-header-row">
              <span className="printed-eco-badge">
                <Leaf size={12} /> {extras.ecoRole}
              </span>
              <span className="printed-ecosystem-tag">
                <Compass size={12} /> {currentPark.ecosystem}
              </span>
            </div>
            <p className="printed-handwriting-quote">"{extras.handwriting}"</p>
            <p className="popup-info-desc">
              <Lightbulb size={13} className="inline-icon-tip" />{' '}
              <strong>Panduan Edukasi:</strong> {extras.eduAction}
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
                  onClick={() => onDonatePark(extras.campaignId)}
                  className="printed-donate-cta"
                >
                  <HeartHandshake size={13} />
                  <span>Aksi Konservasi</span>
                </button>
              )}
            </div>
          </div>
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
