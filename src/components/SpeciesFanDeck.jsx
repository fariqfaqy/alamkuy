import React, { useState, useMemo, useEffect } from 'react';
import {
  motion,
  AnimatePresence
} from 'motion/react';
import {
  Sparkles,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  X
} from 'lucide-react';

const CARD_THEMES = [
  'linear-gradient(165deg, #38bdf8 0%, #0284c7 100%)', // Sky Cyan (Kirby style)
  'linear-gradient(165deg, #fb7185 0%, #e11d48 100%)', // Coral Pink (Mario style)
  'linear-gradient(165deg, #34d399 0%, #059669 100%)', // Mint Emerald (Pokemon style)
  'linear-gradient(165deg, #818cf8 0%, #4f46e5 100%)', // Royal Indigo (Splatoon style)
  'linear-gradient(165deg, #a78bfa 0%, #7c3aed 100%)', // Vivid Purple (Fortnite style)
  'linear-gradient(165deg, #fbbf24 0%, #d97706 100%)', // Sun Amber
  'linear-gradient(165deg, #2dd4bf 0%, #0d9488 100%)', // Tropical Teal
  'linear-gradient(165deg, #f43f5e 0%, #be123c 100%)', // Rose Crimson
  'linear-gradient(165deg, #4ade80 0%, #16a34a 100%)', // Leaf Green
  'linear-gradient(165deg, #fb923c 0%, #ea580c 100%)'  // Tangerine
];

function getCircularOffset(index, activeIndex, total) {
  if (total === 0) return 0;
  let diff = index - activeIndex;
  const half = Math.floor(total / 2);
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  return diff;
}

export default function SpeciesFanDeck({
  speciesList,
  selectedCategory,
  onSelectCategory,
  onDonateSpecies
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [detailSpecies, setDetailSpecies] = useState(null);

  const filtered = useMemo(() => {
    if (selectedCategory === 'Semua') return speciesList;
    return speciesList.filter((sp) => sp.category === selectedCategory);
  }, [speciesList, selectedCategory]);

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  const total = filtered.length;
  const safeIndex = total > 0 ? activeIndex % total : 0;

  const handlePrev = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  if (total === 0) return null;

  return (
    <section id="section-flora-fauna" className="fan-deck-section snap-section">
      <div className="fan-deck-grid-bg" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ amount: 0.35, once: false }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="section-container fan-deck-container"
      >
        {/* Top Centered Header */}
        <div className="fan-deck-header">
          <div className="fan-top-pill">
            <Sparkles size={14} className="fan-top-pill-icon" />
            <span>Portal Literasi & Riset Sains Hayati</span>
          </div>

          <h2 className="fan-main-heading">
            Modul Spesies Bio-Indikator
            <br />
            Ekologi Hayati Nusantara
          </h2>

          <p className="fan-sub-caption">
            Eksplorasi satwa dan puspa kunci penjaga keseimbangan ekosistem nusantara serta peran bio-indikator alami mereka.
          </p>

          {/* Category Filter Switch */}
          <div className="fan-category-tabs">
            {['Semua', 'Mamalia Darat', 'Biota Air & Pesisir', 'Aves & Serangga', 'Puspa Langka'].map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`fan-cat-btn ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="fanCategoryPill"
                      className="fan-cat-pill-bg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="fan-cat-label">
                    {cat === 'Semua' ? 'Semua Spesies' : cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fanned Arc Deck Stage (Clean bottom-anchored fan like Nintendo Switch reference) */}
        <div className="fan-stage-wrapper">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="fan-side-nav left"
            aria-label="Kartu Sebelumnya"
          >
            <ChevronLeft size={22} />
          </motion.button>

          <div className="fan-cards-stage">
            {filtered.map((sp, idx) => {
              const offset = getCircularOffset(idx, safeIndex, total);
              const absOffset = Math.abs(offset);
              const isVisible = absOffset <= 2;
              const isCenter = offset === 0;
              const isHovered = hoveredIndex === idx;

              const xOffset = offset * 186;
              const yArc =
                absOffset === 0
                  ? 0
                  : absOffset === 1
                  ? 38
                  : absOffset === 2
                  ? 88
                  : 150;
              const hoverLift = isHovered ? (isCenter ? -10 : -24) : 0;
              const rotateDeg = offset * 9;
              const scaleVal =
                absOffset === 0
                  ? 1.08
                  : absOffset === 1
                  ? 0.93
                  : absOffset === 2
                  ? 0.84
                  : 0.7;
              const zIndexVal = 30 - absOffset * 8;
              const themeGradient = CARD_THEMES[idx % CARD_THEMES.length];

              return (
                <motion.div
                  key={sp.id}
                  role="button"
                  tabIndex={isVisible ? 0 : -1}
                  aria-label={`Kartu ${sp.name}`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    if (isCenter) {
                      setDetailSpecies(sp);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      if (isCenter) setDetailSpecies(sp);
                      else setActiveIndex(idx);
                    }
                  }}
                  drag={isCenter ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.22}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) handleNext();
                    else if (info.offset.x > 50) handlePrev();
                  }}
                  initial={false}
                  animate={{
                    x: xOffset,
                    y: yArc + hoverLift,
                    rotate: rotateDeg,
                    scale: isHovered && !isCenter ? scaleVal + 0.04 : scaleVal,
                    opacity: isVisible ? 1 : 0,
                    zIndex: zIndexVal
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 270,
                    damping: 25,
                    mass: 0.9
                  }}
                  style={{
                    background: themeGradient,
                    pointerEvents: isVisible ? 'auto' : 'none'
                  }}
                  className={`fan-playing-card ${isCenter ? 'is-selected-card' : ''}`}
                >
                  <div className="fan-card-top">
                    <div className="fan-card-titles">
                      <h3 className="fan-card-name">{sp.name}</h3>
                      <span className="fan-card-sub">{sp.habitat}</span>
                    </div>

                    <div className="fan-card-score-pill" title={sp.iucnLabel}>
                      <span className="score-icon-circle">
                        <ShieldAlert size={12} />
                      </span>
                      <span>{sp.iucnStatus}</span>
                    </div>
                  </div>

                  <div className="fan-card-artwork-wrap">
                    <motion.img
                      src={sp.image}
                      alt={sp.name}
                      className="fan-card-artwork"
                      animate={{
                        scale: isCenter ? 1.07 : 1,
                        y: isCenter ? -4 : 4
                      }}
                      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                      draggable={false}
                    />
                    <div className="fan-card-pop-tag">
                      {isCenter ? `${sp.population} • Klik Detail` : sp.population}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="fan-side-nav right"
            aria-label="Kartu Berikutnya"
          >
            <ChevronRight size={22} />
          </motion.button>
        </div>
      </motion.div>

      {/* Clean Modal Popup when clicking the active center card */}
      <AnimatePresence>
        {detailSpecies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setDetailSpecies(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setDetailSpecies(null)}
                aria-label="Tutup"
              >
                <X size={18} />
              </button>

              <div className="modal-hero-img">
                <img src={detailSpecies.image} alt={detailSpecies.name} />
                <div className="modal-hero-caption">
                  <span className="modal-badge">{detailSpecies.iucnLabel}</span>
                  <h2>{detailSpecies.name}</h2>
                  <p>{detailSpecies.scientificName}</p>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-stats-row">
                  <div className="modal-stat-box">
                    <span>Populasi Alam</span>
                    <strong>{detailSpecies.population}</strong>
                  </div>
                  <div className="modal-stat-box">
                    <span>Habitat Utama</span>
                    <strong>{detailSpecies.habitat}</strong>
                  </div>
                  <div className="modal-stat-box">
                    <span>Kategori</span>
                    <strong>{detailSpecies.category}</strong>
                  </div>
                </div>

                <div className="species-compact-box threat-box">
                  <div className="compact-box-head">
                    <span className="danger-title">
                      <AlertTriangle size={14} /> Ancaman Habitat
                    </span>
                    <span className="danger-pct">{detailSpecies.threatLevel}%</span>
                  </div>
                  <div className="threat-bar-track">
                    <motion.div
                      className="threat-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${detailSpecies.threatLevel}%` }}
                      transition={{ duration: 0.7 }}
                    />
                  </div>
                  <p>{detailSpecies.threatMain}</p>
                </div>

                <div className="species-compact-box solution-box">
                  <span className="solution-title">
                    <CheckCircle2 size={14} /> Solusi & Aksi Nyata
                  </span>
                  <p>{detailSpecies.solutionMain}</p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const campId = detailSpecies.campaignId;
                    setDetailSpecies(null);
                    onDonateSpecies(campId);
                  }}
                  className="modal-primary-btn"
                >
                  <HeartHandshake size={18} />
                  <span>Dukung Aksi Terkait Modul Ini</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
