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
  Leaf
} from 'lucide-react';

/**
 * Data Ensiklopedia Hibrida untuk Jurnal Atlas 3D:
 * Memadukan Data Krisis Lingkungan Global di halaman kiri
 * dan Modul Edukasi Konservasi & Laboratorium Alam di halaman kanan.
 */
const PARK_JOURNAL_EXTRAS = {
  'tn-ujung-kulon': {
    globalIssue: {
      tag: 'KRISIS IKLIM & KENAIKAN LAUT',
      metric: '+4.2 mm/thn Kenaikan Laut Global',
      impact:
        'Kenaikan air laut dan abrasi mengikis dataran rendah semenanjung, mengancam rumah terakhir Badak Jawa.'
    },
    handwriting: 'Menyusuri semenanjung terluar Banten, benteng terakhir Badak Jawa...',
    fieldNote:
      'Populasi Rhinoceros sondaicus kini tersisa 76 sampai 82 individu di alam liar. Hutan pantai Ujung Kulon dijaga penuh 24 jam oleh Rhino Protection Unit.',
    ecoRole: 'Spesies Kunci & Penyebar Biji Hutan Dataran Rendah',
    eduAction:
      'Pelajari pemulihan tanaman pakan alami dari invasi palem Langkap dan hemat konsumsi kertas.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1598894000396-bc30e0996899?auto=format&fit=crop&w=600&q=80',
        caption: 'Badak Jawa (Kritis CR)'
      },
      {
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        caption: 'Pesisir Ujung Kulon'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1598894000396-bc30e0996899?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-ujung-kulon'
  },
  'tn-gunung-leuser': {
    globalIssue: {
      tag: 'DEFORESTASI & KORIDOR TERPUTUS',
      metric: '3.7 Juta Ha Hutan Tropis Hilang/Thn',
      impact:
        'Fragmentasi habitat memicu perjumpaan berbahaya satwa dengan pemukiman dan memudahkan akses jerat pemburu.'
    },
    handwriting: 'Kabut fajar di kanopi Leuser, laboratorium alam 4 megafauna...',
    fieldNote:
      'Satu-satunya rimba bumi tempat Harimau, Orangutan, Gajah, dan Badak hidup berdampingan. Menjaga Leuser berarti menjaga penyerap karbon raksasa dunia.',
    ecoRole: 'Apex Predator & Paru-Paru Karbon Utama Sumatera Utara',
    eduAction:
      'Dukung patroli sapu bersih jerat kawat dan pastikan produk kayu/kertas berlabel ramah lingkungan.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80',
        caption: 'Harimau Sumatera'
      },
      {
        img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80',
        caption: 'Gajah Sumatera'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-harimau-leuser'
  },
  'tn-tanjung-puting': {
    globalIssue: {
      tag: 'PENGERINGAN GAMBUT & EMISI KARBON',
      metric: '550 Gigaton Karbon Global di Gambut',
      impact:
        'Gambut yang kering akibat kanalisasi melepaskan emisi gas rumah kaca masif dan memicu kebakaran bawah tanah.'
    },
    handwriting: 'Menyusuri Sungai Sekonyer hitam menuju Camp Leakey Borneo...',
    fieldNote:
      'Kawasan suaka rawa gambut dan rehabilitasi primata Borneo. Lahan gambut dalam mampu menyimpan karbon hingga 10 kali lebih padat dibanding hutan tanah mineral biasa.',
    ecoRole: 'Penyimpan Cadangan Karbon Alami & Suaka Orangutan',
    eduAction:
      'Pelajari hidrologi sekat kanal gambut dan dukung adopsi bibit pohon endemik rawa.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=600&q=80',
        caption: 'Primata Borneo'
      },
      {
        img: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80',
        caption: 'Kanopi Gambut'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-orangutan-borneo'
  },
  'tn-komodo': {
    globalIssue: {
      tag: 'POLUSI PLASTIK & PEMUTIHAN KARANG',
      metric: '11 Juta Ton Plastik Masuk Laut/Thn',
      impact:
        'Kenaikan suhu perairan dan mikroplastik merusak ekosistem karang yang menjadi sumber pangan rantai laut.'
    },
    handwriting: 'Bukit savana gersang dan terumbu karang Segitiga Karang NTT...',
    fieldNote:
      'Gugusan pulau purba vulkanik tempat kadal raksasa Varanus komodoensis berkuasa. Perairannya menjadi koridor migrasi paus, lumba-lumba, dan pari manta.',
    ecoRole: 'Predator Puncak Savana & Bio-Indikator Terumbu Karang',
    eduAction:
      'Terapkan gaya hidup minim plastik sekali pakai dan lindungi perairan pesisir dari limbah.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=600&q=80',
        caption: 'Kepulauan Komodo'
      },
      {
        img: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=600&q=80',
        caption: 'Perairan NTT'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-komodo-ntt'
  },
  'tn-kerinci-seblat': {
    globalIssue: {
      tag: 'KEHILANGAN SPESIES & EROSI LERENG',
      metric: '1 Juta Spesies Terancam Punah Global',
      impact:
        'Perambahan lereng pegunungan mengancam flora puspa raksasa terlangka dunia dan menurunkan debit mata air.'
    },
    handwriting: 'Lembah basah Bukit Barisan, habitat puspa raksasa terlangka...',
    fieldNote:
      'Koridor hutan pegunungan terluas di Sumatera dengan lebih dari 4.000 jenis flora. Menjaga bunga Rafflesia arnoldii dan populasi kunci Harimau Sumatera.',
    ecoRole: 'Tangkapan Air Pulau Sumatera & Koridor Flora Langka',
    eduAction:
      'Pahami pentingnya vegetasi pegunungan dalam mencegah tanah longsor dan bencana hidrometeorologi.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
        caption: 'Flora Hutan Hujan'
      },
      {
        img: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80',
        caption: 'Puspa Sumatera'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-puspa-sumatera'
  },
  'tn-lorentz': {
    globalIssue: {
      tag: 'PENCAIRAN GLETSER TROPIKA PUNCAK JAYA',
      metric: '-80% Luas Es Abadi Sejak 2010',
      impact:
        'Pemanasan global mengikis habis kubah es abadi tropis Papua, indikator nyata kenaikan suhu planet bumi.'
    },
    handwriting: 'Dari salju abadi Puncak Jaya hingga rimba dataran rendah Papua...',
    fieldNote:
      'Kawasan konservasi terbesar di Asia Tenggara (2,4 juta hektar). Membentang utuh dari puncak bersalju hingga laut dangkal berhutan bakau.',
    ecoRole: 'Laboratorium Iklim Dunia & Habitat Burung Cenderawasih',
    eduAction:
      'Terapkan efisiensi energi sehari-hari guna menekan laju emisi gas rumah kaca global.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80',
        caption: 'Aves Endemik Papua'
      },
      {
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        caption: 'Pegunungan Papua'
      }
    ],
    filmStrip: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=75',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=75'
    ],
    campaignId: 'camp-komodo-ntt'
  }
};

function getExtras(park) {
  if (!park) return PARK_JOURNAL_EXTRAS['tn-ujung-kulon'];
  return PARK_JOURNAL_EXTRAS[park.id] || PARK_JOURNAL_EXTRAS['tn-ujung-kulon'];
}

/**
 * Halaman Kiri: Data Sains Isu Lingkungan Global & Telemetri Kawasan
 */
function LeftPageFace({ park, onClick }) {
  const extras = getExtras(park);
  return (
    <div
      className="real-page-face real-left-face"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Halaman Kiri: ${park.name}` : undefined}
    >
      <div className="half-panoramic-bg left-half-bg">
        <img src={park.image} alt={park.name} />
        <div className="half-scrim-overlay left-scrim" />
      </div>

      <div className="spread-page spread-left-page">
        {/* 35mm Real Film Strip Frame */}
        <div className="journal-film-strip">
          {extras.filmStrip.map((photoUrl, i) => (
            <div key={i} className="film-frame">
              <img src={photoUrl} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Content Body */}
        <div className="left-page-notes">
          <div className="journal-status-badges">
            <span className="journal-unesco-tag">{park.unescoStatus}</span>
          </div>

          <p className="journal-handwriting">{extras.handwriting}</p>
          <h3 className="journal-park-heading">{park.name}</h3>

          <span className="journal-province-line">
            <MapPin size={13} /> {park.province} • {park.area}
          </span>

          {/* Kotak Data Isu Krisis Global */}
          <div className="journal-global-krisis-box">
            <div className="krisis-badge-row">
              <AlertTriangle size={13} />
              <span>{extras.globalIssue.tag}</span>
            </div>
            <div className="krisis-metric-tag">{extras.globalIssue.metric}</div>
            <p className="krisis-impact-desc">{extras.globalIssue.impact}</p>
          </div>

          <div className="journal-field-note-card">
            <p>{extras.fieldNote}</p>
          </div>
        </div>
      </div>

      {/* Spine Crease Inner Shadow */}
      <div className="page-spine-gutter-left" />
    </div>
  );
}

/**
 * Halaman Kanan: Laboratorium Konservasi, Satwa Kunci, & Aksi Edukasi
 */
function RightPageFace({ park, onClick, onDonate }) {
  const extras = getExtras(park);
  return (
    <div
      className="real-page-face real-right-face"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Halaman Kanan: ${park.name}` : undefined}
    >
      <div className="half-panoramic-bg right-half-bg">
        <img src={park.image} alt={park.name} />
        <div className="half-scrim-overlay right-scrim" />
      </div>

      <div className="spread-page spread-right-page">
        {/* Polaroid Collage dengan Pin Kertas */}
        <div className="polaroid-collage">
          {extras.polaroids.map((pol, idx) => (
            <div key={pol.caption} className={`journal-polaroid polaroid-${idx + 1}`}>
              <div className="polaroid-img-box">
                <img src={pol.img} alt={pol.caption} loading="lazy" />
              </div>
              <span className="polaroid-caption">{pol.caption}</span>
            </div>
          ))}
        </div>

        {/* Kotak Modul Edukasi Ekologi & Aksi */}
        <div className="journal-edu-module-box">
          <div className="edu-role-badge">
            <Leaf size={13} />
            <span>{extras.ecoRole}</span>
          </div>

          <div className="edu-action-row">
            <Lightbulb size={14} className="edu-icon" />
            <p className="edu-action-text">{extras.eduAction}</p>
          </div>

          <div className="journal-species-chips">
            {park.keySpecies.map((sp) => (
              <span key={sp} className="journal-sp-chip">
                {sp}
              </span>
            ))}
          </div>

          <div className="right-bottom-action-bar">
            <span className="journal-eco-label">
              <Compass size={13} /> {park.ecosystem}
            </span>
            {onDonate && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDonate(extras.campaignId);
                }}
                className="journal-page-donate-btn"
                title={`Dukung Konservasi ${park.name}`}
              >
                <HeartHandshake size={14} />
                <span>Aksi Konservasi</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Spine Crease Inner Shadow */}
      <div className="page-spine-gutter-right" />
    </div>
  );
}

export default function ParkJournalBook({ parks, onDonatePark }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [turningLeaf, setTurningLeaf] = useState(null);
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

  const isMobileViewport = viewportWidth <= 720;
  const isTabletViewport = viewportWidth > 720 && viewportWidth <= 1080;

  const baseBookWidth = isMobileViewport ? 540 : 760;
  const baseBookHeight = isMobileViewport ? 400 : 456;

  // Proporsional scale agar buku tampil tajam tanpa terpotong
  const openScale = isMobileViewport
    ? Math.min(0.96, (viewportWidth - 24) / (baseBookWidth + 48))
    : isTabletViewport
    ? Math.min(0.98, (viewportWidth - 48) / (baseBookWidth + 64))
    : 1;

  const closedScale = isMobileViewport
    ? Math.min(0.94, (viewportWidth - 36) / (baseBookWidth * 0.5 + 36))
    : 0.96;

  const activeScale = isBookOpen ? openScale : closedScale;
  const closedOffsetX = -(baseBookWidth * 0.25) * closedScale;
  const scaledStageHeight = Math.round(baseBookHeight * activeScale) + 24;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            if (!hasAutoOpenedRef.current) {
              hasAutoOpenedRef.current = true;
              setTimeout(() => {
                setIsBookOpen(true);
              }, 280);
            }
          }
        });
      },
      { threshold: [0.4] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

    // Durasi putaran lembaran kertas buku yang realistis
    setTimeout(() => {
      setPageIndex(targetIdx);
      setTurningLeaf(null);
    }, 850);
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

  const staticLeftPark =
    turningLeaf && turningLeaf.dir === 'prev'
      ? parks[turningLeaf.toIdx]
      : currentPark;

  const staticRightPark =
    turningLeaf && turningLeaf.dir === 'next'
      ? parks[turningLeaf.toIdx]
      : currentPark;

  return (
    <section
      ref={sectionRef}
      id="section-taman-nasional"
      className="journal-book-section snap-section"
      aria-label="Atlas 3D Ekologi & Isu Lingkungan Global"
    >
      <div className="journal-container">
        {/* Header Atlas 3D */}
        <div className="journal-header">
          <div className="journal-pill-badge">
            <Layers size={13} />
            <span>ATLAS 3D EKOLOGI & ISU GLOBAL</span>
          </div>
          <h2 className="journal-title">Atlas 3D Krisis & Solusi Ekologi Global</h2>
          <p className="journal-subtitle">
            <BookOpen size={15} />
            <span>
              {isBookOpen
                ? `${total} Bab Krisis & Solusi Ekologi • Lembar ${pageIndex + 1} dari ${total}`
                : 'Buku Tertutup • Klik Sampul untuk Membuka Lembaran'}
            </span>
          </p>
        </div>

        {/* 3D BOOK STAGE DENGAN FISIKA KERTAS REALISTIS */}
        <div
          className="journal-3d-stage"
          style={{ minHeight: `${scaledStageHeight}px` }}
        >
          <motion.div
            animate={{
              x: isBookOpen ? 0 : closedOffsetX,
              scale: activeScale
            }}
            transition={{
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="real-book-rig"
          >
            {/* TAMPILAN KETEBALAN TUMPUKAN KERTAS BUKU REALISTIS (Book Paper Block) */}
            <div className="realistic-book-casing">
              {/* Blok Kertas Kiri */}
              <div
                className={`paper-stack-edge stack-edge-left ${
                  isBookOpen ? 'open-stack' : 'closed-stack'
                }`}
                aria-hidden="true"
              >
                <div className="paper-layers-rim" />
              </div>

              {/* Blok Kertas Kanan */}
              <div className="paper-stack-edge stack-edge-right" aria-hidden="true">
                <div className="paper-layers-rim" />
              </div>
            </div>

            {/* CORE 3D BOOK SPREAD */}
            <div className="real-book-core">
              {/* ACTIVE RIGHT BASE PAGE */}
              <div className="real-right-base">
                <RightPageFace
                  park={staticRightPark}
                  onClick={isBookOpen ? handleNextPage : () => setIsBookOpen(true)}
                  onDonate={onDonatePark}
                />

                {/* Bayangan dinamis yang jatuh saat sampul atau kertas berputar */}
                <motion.div
                  animate={{
                    opacity: isBookOpen ? (turningLeaf ? 0.38 : 0) : 0.76
                  }}
                  transition={{ duration: 0.7 }}
                  className="right-base-cast-shadow"
                />
              </div>

              {/* HINGED HARDCOVER COVER / ACTIVE LEFT PAGE */}
              <motion.div
                initial={false}
                animate={{
                  rotateY: isBookOpen ? -180 : 0
                }}
                transition={{
                  duration: 1.15,
                  ease: [0.25, 1, 0.38, 1]
                }}
                className="real-hinged-cover-leaf"
                style={{
                  zIndex: !isBookOpen ? 40 : turningLeaf ? 16 : 22
                }}
              >
                {/* MUKA SAMPUL DEPAN (Hardcover Buku Kulit Berukir Emas) */}
                <div
                  className="cover-leaf-front"
                  onClick={() => setIsBookOpen(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Buka Atlas 3D Ekologi Nusantara"
                >
                  <div className="cover-spine-groove" />
                  <div className="cover-content">
                    <span className="cover-badge">ATLAS 3D EKOLOGI NUSANTARA</span>
                    <h3>ISU GLOBAL & KONSERVASI ALAM</h3>
                    <p className="cover-subtitle">{currentPark.name}</p>
                    <div className="cover-photo-window">
                      <img src={currentPark.image} alt={currentPark.name} />
                      <div className="cover-window-overlay" />
                    </div>
                    <span className="cover-open-hint">
                      <Sparkles size={14} /> Klik untuk Membuka Lembaran
                    </span>
                  </div>
                </div>

                {/* MUKA DALAM SAMPUL = HALAMAN KIRI YANG AKTIF */}
                <div className="cover-leaf-back">
                  <LeftPageFace park={staticLeftPark} onClick={handlePrevPage} />
                </div>
              </motion.div>

              {/* REALISTIS: LEMBARAN KERTAS 3D YANG MELIPAT & MELUNCUR (Slide/Peel Sheet) */}
              {turningLeaf && (
                <motion.div
                  key={`paper-sheet-${turningLeaf.fromIdx}-${turningLeaf.toIdx}-${turningLeaf.dir}`}
                  initial={{
                    rotateY: turningLeaf.dir === 'next' ? 0 : -180,
                    scaleX: 1,
                    rotateZ: 0
                  }}
                  animate={{
                    rotateY: turningLeaf.dir === 'next' ? -180 : 0,
                    scaleX: [1, 0.965, 0.965, 1],
                    rotateZ: [0, turningLeaf.dir === 'next' ? -2.2 : 2.2, 0]
                  }}
                  transition={{
                    duration: 0.85,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="real-double-sided-sheet paper-curl-physics"
                >
                  {/* SISI DEPAN LEMBARAN KERTAS (Terlihat di sisi kanan saat 0deg ke -90deg) */}
                  <div className="sheet-face sheet-front">
                    <RightPageFace
                      park={
                        turningLeaf.dir === 'next'
                          ? parks[turningLeaf.fromIdx]
                          : parks[turningLeaf.toIdx]
                      }
                      onDonate={onDonatePark}
                    />
                    {/* Pantulan cahaya dinamis saat kertas melengkung */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.52, 0.08] }}
                      transition={{ duration: 0.85 }}
                      className="sheet-dynamic-lighting sheet-front-sheen"
                    />
                  </div>

                  {/* SISI BELAKANG LEMBARAN KERTAS (Terlihat di sisi kiri saat -90deg ke -180deg) */}
                  <div className="sheet-face sheet-back">
                    <LeftPageFace
                      park={
                        turningLeaf.dir === 'next'
                          ? parks[turningLeaf.toIdx]
                          : parks[turningLeaf.fromIdx]
                      }
                    />
                    {/* Bayangan lengkungan kertas saat mendarat di tumpukan kiri */}
                    <motion.div
                      initial={{ opacity: 0.52 }}
                      animate={{ opacity: [0.52, 0.16, 0] }}
                      transition={{ duration: 0.85 }}
                      className="sheet-dynamic-lighting sheet-back-shadow"
                    />
                  </div>
                </motion.div>
              )}

              {/* Jilid Punggung Tengah (Central Spine Crease) */}
              <div className="real-center-spine" aria-hidden="true" />
            </div>
          </motion.div>
        </div>

        {/* DOCK NAVIGASI & TOMBOL BUKA/TUTUP BUKU */}
        <div className="journal-bottom-dock">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={handlePrevPage}
            className="journal-dock-btn"
            title="Lembar Sebelumnya"
            aria-label="Lembar Sebelumnya"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsBookOpen((o) => !o)}
            className={`journal-dock-pill-btn ${!isBookOpen ? 'active-dock' : ''}`}
            title={isBookOpen ? 'Tutup Sampul Buku' : 'Buka Sampul Buku'}
          >
            {isBookOpen ? <BookMarked size={16} /> : <BookOpen size={16} />}
            <span>{isBookOpen ? 'Tutup Buku' : 'Buka Buku'}</span>
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
            title="Lembar Berikutnya"
            aria-label="Lembar Berikutnya"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
