import React, { useState, useRef, useEffect } from 'react';
import {
  motion
} from 'motion/react';
import {
  BookOpen,
  BookMarked,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  MapPin,
  Sparkles,
  Compass
} from 'lucide-react';

// Curated nature & wildlife photos for the film strip and tilted polaroids on each spread
const PARK_JOURNAL_EXTRAS = {
  'tn-ujung-kulon': {
    handwriting: 'Menyusuri jejak Badak Jawa di Semenanjung Ujung Kulon...',
    fieldNote:
      'Benteng terakhir Rhinoceros sondaicus. Hutan pantai dan rawa dataran rendah dijaga penuh 24 jam oleh tim Rhino Protection Unit.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1598894000396-bc30e0996899?auto=format&fit=crop&w=600&q=80',
        caption: 'Badak Jawa (CR)'
      },
      {
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        caption: 'Pesisir Banten'
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
    handwriting: 'Kabut pagi di kanopi Ekosistem Leuser, Aceh dan Sumut...',
    fieldNote:
      'Satu-satunya rimba di bumi tempat Harimau, Orangutan, Gajah, dan Badak Sumatera berbagi ruang hidup di satu ekosistem.',
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
    handwriting: 'Menelusuri sungai air hitam Sekonyer menuju Camp Leakey...',
    fieldNote:
      'Suaka rawa gambut Kalimantan Tengah yang menjadi rumah rehabilitasi Orangutan Kalimantan dan kawanan Bekantan.',
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
    handwriting: 'Bukit savana keemasan dan perairan biru Kepulauan Komodo...',
    fieldNote:
      'Gugusan pulau vulkanik Nusa Tenggara Timur tempat kadal purba Varanus komodoensis berkuasa di puncak rantai makanan.',
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
    handwriting: 'Lembah basah Bukit Barisan tempat puspa raksasa mekar...',
    fieldNote:
      'Koridor hutan pegunungan terluas di Sumatera yang melindungi Rafflesia arnoldii, Bunga Bangkai Raksasa, dan Harimau Sumatera.',
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
    handwriting: 'Dari salju abadi Puncak Jaya hingga rimba Cenderawasih Papua...',
    fieldNote:
      'Kawasan konservasi terbesar di Asia Tenggara (2,4 juta hektare) dengan ekosistem utuh dari gletser tropis ke laut.',
    polaroids: [
      {
        img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80',
        caption: 'Aves Endemik'
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
 * Renders the Left Page content of any National Park spread
 * (Panoramic left half + 35mm film strip + handwritten field notes)
 */
function LeftPageFace({ park, onClick }) {
  const extras = getExtras(park);
  return (
    <div
      className="real-page-face real-left-face"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Buka ${park.name}` : undefined}
    >
      <div className="half-panoramic-bg left-half-bg">
        <img src={park.image} alt={park.name} />
        <div className="half-scrim-overlay left-scrim" />
      </div>

      <div className="spread-page spread-left-page">
        <div className="journal-film-strip">
          {extras.filmStrip.map((photoUrl, i) => (
            <div key={i} className="film-frame">
              <img src={photoUrl} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        <div className="left-page-notes">
          <span className="journal-unesco-tag">{park.unescoStatus}</span>
          <p className="journal-handwriting">{extras.handwriting}</p>

          <h3 className="journal-park-heading">{park.name}</h3>
          <span className="journal-province-line">
            <MapPin size={13} /> {park.province} • {park.area}
          </span>

          <div className="journal-torn-note">
            <span className="torn-note-title">CATATAN EKOSISTEM</span>
            <p>{extras.fieldNote}</p>
          </div>
        </div>
      </div>

      {/* Inner spine crease shadow on the right edge of the left page */}
      <div className="page-spine-gutter-left" />
    </div>
  );
}

/**
 * Renders the Right Page content of any National Park spread
 * (Panoramic right half + 2 tilted polaroids + species chips)
 */
function RightPageFace({ park, onClick }) {
  const extras = getExtras(park);
  return (
    <div
      className="real-page-face real-right-face"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Buka ${park.name}` : undefined}
    >
      <div className="half-panoramic-bg right-half-bg">
        <img src={park.image} alt={park.name} />
        <div className="half-scrim-overlay right-scrim" />
      </div>

      <div className="spread-page spread-right-page">
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

        <div className="right-page-footer">
          <div className="journal-species-chips">
            {park.keySpecies.map((sp) => (
              <span key={sp} className="journal-sp-chip">
                {sp}
              </span>
            ))}
          </div>
          <span className="journal-eco-label">
            <Compass size={13} /> {park.ecosystem}
          </span>
        </div>
      </div>

      {/* Inner spine crease shadow on the left edge of the right page */}
      <div className="page-spine-gutter-right" />
    </div>
  );
}

export default function ParkJournalBook({ parks, onDonatePark }) {
  const [pageIndex, setPageIndex] = useState(0);
  // Start closed and automatically swing the cover open when scrolled into view!
  const [isBookOpen, setIsBookOpen] = useState(false);
  // 3D double-sided page turn state: { dir: 'next' | 'prev', fromIdx, toIdx }
  const [turningLeaf, setTurningLeaf] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const sectionRef = useRef(null);
  const hasAutoOpenedRef = useRef(false);

  const total = parks.length;
  const currentPark = parks[pageIndex] || parks[0];
  const extras = getExtras(currentPark);

  // Track viewport width so the 3D book scales proportionally without ever squishing
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileViewport = viewportWidth <= 720;
  const isTabletViewport = viewportWidth > 720 && viewportWidth <= 1080;

  // Base intrinsic book spread width & height (matches CSS .real-book-core)
  const baseBookWidth = isMobileViewport ? 540 : 760;
  const baseBookHeight = isMobileViewport ? 400 : 456;
  // How far each underlying page slide peeks out behind the main spread
  const fanStepX = isMobileViewport ? 22 : 34;
  const totalOpenSpreadWidth = baseBookWidth + fanStepX * 8 + 20;

  // Compute exact proportional scale so the book + its fanned underlying slides fit any screen cleanly
  const openScale = isMobileViewport
    ? Math.min(1, (viewportWidth - 12) / totalOpenSpreadWidth)
    : isTabletViewport
    ? Math.min(1, (viewportWidth - 28) / totalOpenSpreadWidth)
    : Math.min(1, (viewportWidth - 48) / totalOpenSpreadWidth);

  const closedScale = isMobileViewport
    ? Math.min(0.95, (viewportWidth - 40) / (baseBookWidth * 0.5 + 36))
    : isTabletViewport
    ? Math.min(0.96, (viewportWidth - 64) / (baseBookWidth * 0.5 + 48))
    : 0.96;

  const activeScale = isBookOpen ? openScale : closedScale;
  // When closed, shift left by 25% of baseBookWidth * closedScale so the closed right-half cover sits dead-center
  const closedOffsetX = -(baseBookWidth * 0.25) * closedScale;
  const scaledStageHeight = Math.round(baseBookHeight * activeScale) + 28;

  // Automatically open the 3D hardcover book when user scrolls to this section for the first time
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            if (!hasAutoOpenedRef.current) {
              hasAutoOpenedRef.current = true;
              setTimeout(() => {
                setIsBookOpen(true);
              }, 260);
            }
          }
        });
      },
      { threshold: [0.45] }
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

    setTimeout(() => {
      setPageIndex(targetIdx);
      setTurningLeaf(null);
    }, 880);
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

  // Determine which park is rendered on the static Left base and static Right base during a flip
  const staticLeftPark =
    turningLeaf && turningLeaf.dir === 'prev'
      ? parks[turningLeaf.toIdx]
      : currentPark;

  const staticRightPark =
    turningLeaf && turningLeaf.dir === 'next'
      ? parks[turningLeaf.toIdx]
      : currentPark;

  // Underlying book slides behind the left page and right page (part of the SAME book!)
  const underlyingLeftSlides = [1, 2, 3, 4].map((step) => {
    const idx = (pageIndex - step + total) % total;
    return { park: parks[idx], idx, step };
  });

  const underlyingRightSlides = [1, 2, 3, 4].map((step) => {
    const idx = (pageIndex + step) % total;
    return { park: parks[idx], idx, step };
  });

  return (
    <section
      ref={sectionRef}
      id="section-taman-nasional"
      className="journal-book-section snap-section"
      aria-label="Jurnal Taman Nasional"
    >
      <div className="journal-container">
        {/* Top Centered Header */}
        <div className="journal-header">
          <h2 className="journal-title">Jurnal Taman Nasional</h2>
          <p className="journal-subtitle">
            <BookOpen size={15} />
            <span>
              {isBookOpen
                ? `${total} Kawasan Utama • Lembar ${pageIndex + 1} dari ${total}`
                : 'Sampul Tertutup • Klik Buku untuk Membuka Lembaran'}
            </span>
          </p>
        </div>

        {/* REAL 3D MULTI-PAGE BOOK STAGE */}
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
            {/* LAYER 1 (STRICTLY BEHIND): UNDERLYING BOOK SLIDES FANNED OUT ON LEFT & RIGHT */}
            <div className="underlying-book-slides-layer">
              {/* Underlying Left Book Slides (Previous pages in the book) */}
              {underlyingLeftSlides.map(({ park, idx, step }) => (
                <motion.div
                  key={`under-left-${step}-${park.id}`}
                  initial={false}
                  animate={{
                    opacity: isBookOpen ? 1 : 0,
                    x: isBookOpen ? -step * fanStepX : 40,
                    scaleY: isBookOpen ? 1 - step * 0.042 : 0.94
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  style={{ zIndex: 10 - step }}
                  className="underlying-book-leaf underlying-left-leaf"
                >
                  <LeftPageFace
                    park={park}
                    onClick={() => triggerPageFlip(idx, 'prev')}
                  />
                  <div
                    className="underlying-leaf-dimmer"
                    style={{ opacity: step * 0.14 }}
                  />
                </motion.div>
              ))}

              {/* Underlying Right Book Slides (Upcoming pages in the book) */}
              {underlyingRightSlides.map(({ park, idx, step }) => (
                <motion.div
                  key={`under-right-${step}-${park.id}`}
                  initial={false}
                  animate={{
                    opacity: 1,
                    x: isBookOpen ? step * fanStepX : step * 4,
                    scaleY: isBookOpen ? 1 - step * 0.042 : 1 - step * 0.014
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  style={{ zIndex: 10 - step }}
                  className="underlying-book-leaf underlying-right-leaf"
                >
                  <RightPageFace
                    park={park}
                    onClick={() => triggerPageFlip(idx, 'next')}
                  />
                  <div
                    className="underlying-leaf-dimmer"
                    style={{ opacity: step * 0.14 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* LAYER 2 (STRICTLY IN FRONT): ACTIVE 3D BOOK SPREAD & HINGED COVER */}
            <div className="real-book-core">
              {/* ACTIVE RIGHT PAGE (Anchored on the right of the center spine) */}
              <div className="real-right-base">
                <RightPageFace
                  park={staticRightPark}
                  onClick={isBookOpen ? handleNextPage : () => setIsBookOpen(true)}
                />

                {/* Dynamic Shadow cast by Front Cover or Turning Page onto the Right Page */}
                <motion.div
                  animate={{
                    opacity: isBookOpen ? (turningLeaf ? 0.42 : 0) : 0.72
                  }}
                  transition={{ duration: 0.75 }}
                  className="right-base-cast-shadow"
                />
              </div>

              {/* HINGED FRONT COVER / ACTIVE LEFT PAGE
                  - Hinged at the Center Spine (left: 50%, transform-origin: left center)
                  - At rotateY(0deg): Book is CLOSED -> Front Hardcover faces the viewer!
                  - At rotateY(-180deg): Book is OPEN -> Inner back face lands on the left as the Active Left Page! */}
              <motion.div
                initial={false}
                animate={{
                  rotateY: isBookOpen ? -180 : 0
                }}
                transition={{
                  duration: 1.12,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="real-hinged-cover-leaf"
                style={{
                  zIndex: !isBookOpen ? 40 : turningLeaf ? 16 : 22
                }}
              >
                {/* OUTER FRONT FACE: Hardcover Book Cover (Visible when rotateY is 0deg to -90deg) */}
                <div
                  className="cover-leaf-front"
                  onClick={() => setIsBookOpen(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Buka Buku Jurnal Taman Nasional"
                >
                  <div className="cover-spine-groove" />
                  <div className="cover-content">
                    <span className="cover-badge">ARSIP EKSPEDISI NUSANTARA</span>
                    <h3>TAMAN NASIONAL INDONESIA</h3>
                    <p>{currentPark.name}</p>
                    <div className="cover-photo-window">
                      <img src={currentPark.image} alt={currentPark.name} />
                    </div>
                    <span className="cover-open-hint">
                      <Sparkles size={14} /> Klik untuk Membuka Buku
                    </span>
                  </div>
                </div>

                {/* INNER BACK FACE: The Active Left Page of the Spread! (Visible when rotateY is -90deg to -180deg) */}
                <div className="cover-leaf-back">
                  <LeftPageFace park={staticLeftPark} onClick={handlePrevPage} />
                </div>
              </motion.div>

              {/* REAL DOUBLE-SIDED 3D TURNING PAGE SHEET (When flipping Next or Prev between Parks) */}
              {turningLeaf && (
                <motion.div
                  key={`sheet-${turningLeaf.fromIdx}-${turningLeaf.toIdx}-${turningLeaf.dir}`}
                  initial={{
                    rotateY: turningLeaf.dir === 'next' ? 0 : -180,
                    rotateZ: 0
                  }}
                  animate={{
                    rotateY: turningLeaf.dir === 'next' ? -180 : 0,
                    rotateZ: [0, turningLeaf.dir === 'next' ? -1.8 : 1.8, 0]
                  }}
                  transition={{
                    duration: 0.88,
                    ease: [0.32, 0.08, 0.24, 1]
                  }}
                  className="real-double-sided-sheet"
                >
                  {/* FRONT OF TURNING SHEET (Faces viewer when sheet is on the right side: 0deg to -90deg) */}
                  <div className="sheet-face sheet-front">
                    <RightPageFace
                      park={
                        turningLeaf.dir === 'next'
                          ? parks[turningLeaf.fromIdx]
                          : parks[turningLeaf.toIdx]
                      }
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.45, 0.1] }}
                      transition={{ duration: 0.88 }}
                      className="sheet-dynamic-lighting"
                    />
                  </div>

                  {/* BACK OF TURNING SHEET (Faces viewer when sheet crosses over to the left side: -90deg to -180deg) */}
                  <div className="sheet-face sheet-back">
                    <LeftPageFace
                      park={
                        turningLeaf.dir === 'next'
                          ? parks[turningLeaf.toIdx]
                          : parks[turningLeaf.fromIdx]
                      }
                    />
                    <motion.div
                      initial={{ opacity: 0.45 }}
                      animate={{ opacity: [0.45, 0.15, 0] }}
                      transition={{ duration: 0.88 }}
                      className="sheet-dynamic-lighting"
                    />
                  </div>
                </motion.div>
              )}

              {/* Center Spine Binding Shadow */}
              <div className="real-center-spine" aria-hidden="true" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Circular Control Dock + Open/Close Book Button */}
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
            title={`Donasi untuk ${currentPark.name}`}
            aria-label={`Donasi untuk ${currentPark.name}`}
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
