import React, { useState, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup
} from 'motion/react';
import {
  Bookmark,
  Compass,
  HeartHandshake
} from 'lucide-react';

const EXPO_EASE = [0.16, 1, 0.3, 1];

const textContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.08
    }
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: 'blur(4px)',
    transition: { duration: 0.26, ease: 'easeIn' }
  }
};

const textItemVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.68, ease: EXPO_EASE }
  }
};

export default function HeroSlider({
  slides,
  bookmarkedIds,
  onToggleBookmark,
  onExploreSlide,
  onDonateSlide
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const total = slides.length;
  const currentSlide = slides[activeIndex];
  const previousSlide = slides[prevIndex];

  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, [slides]);

  const upcomingSlides = [];
  for (let i = 1; i <= 4; i++) {
    const idx = (activeIndex + i) % total;
    upcomingSlides.push({ slide: slides[idx], index: idx });
  }

  const selectSlide = useCallback(
    (targetIndex) => {
      if (isLocked || targetIndex === activeIndex) return;
      setIsLocked(true);
      setPrevIndex(activeIndex);
      setActiveIndex(targetIndex);
      setTimeout(() => {
        setIsLocked(false);
      }, 820);
    },
    [activeIndex, isLocked]
  );

  const handleNext = useCallback(() => {
    selectSlide((activeIndex + 1) % total);
  }, [activeIndex, total, selectSlide]);

  useEffect(() => {
    if (isLocked) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isLocked, handleNext]);

  const progressPercent = ((activeIndex + 1) / total) * 100;
  const isBookmarked = bookmarkedIds.includes(currentSlide.id);

  return (
    <LayoutGroup id="pinterest-hero-slider">
      <section className="hero-viewport" aria-label="Sorotan Taman Nasional">
        {/* Underneath Base Layer */}
        <div className="hero-bg-underlay" aria-hidden="true">
          <img
            src={previousSlide.image}
            alt=""
            className="hero-bg-image"
            style={{ objectPosition: previousSlide.bgPosition || 'center center' }}
          />
          <div className="hero-bg-scrim" />
        </div>

        {/* Active Hero Background Layer */}
        <motion.div
          key={`hero-bg-${currentSlide.id}`}
          layoutId={`slide-card-${currentSlide.id}`}
          className="hero-bg-layer"
          transition={{
            layout: { duration: 0.82, ease: EXPO_EASE }
          }}
        >
          <motion.img
            key={`zoom-${currentSlide.id}`}
            src={currentSlide.image}
            alt={currentSlide.title}
            className="hero-bg-image"
            style={{ objectPosition: currentSlide.bgPosition || 'center center' }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.14 }}
            transition={{ duration: 7.5, ease: 'easeOut' }}
          />
          <div className="hero-bg-scrim" />
        </motion.div>

        {/* Foreground Content Split */}
        <div className="hero-content-grid">
          {/* Left Column */}
          <div className="hero-left-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                variants={textContainerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="hero-left-info"
              >
                <motion.div variants={textItemVariants} className="hero-region-tag">
                  <span
                    className="hero-region-dash"
                    style={{ backgroundColor: currentSlide.accentColor }}
                  />
                  <span className="hero-region-text">{currentSlide.region}</span>
                </motion.div>

                <motion.h1 variants={textItemVariants} className="hero-main-title">
                  {currentSlide.title}
                </motion.h1>

                <motion.p variants={textItemVariants} className="hero-subtitle-banner">
                  {currentSlide.subtitle}
                </motion.p>

                <motion.div variants={textItemVariants} className="hero-status-pills">
                  <span className="hero-pill hero-pill-danger">
                    {currentSlide.iucnBadge}
                  </span>
                  <span className="hero-pill hero-pill-stat">
                    {currentSlide.populationStat}
                  </span>
                  <span className="hero-pill hero-pill-unesco">
                    {currentSlide.unesco}
                  </span>
                </motion.div>

                <motion.p variants={textItemVariants} className="hero-description">
                  {currentSlide.description}
                </motion.p>

                <motion.div variants={textItemVariants} className="hero-cta-row">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1, rotate: -6 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onToggleBookmark(currentSlide.id)}
                    className={`hero-bookmark-btn ${isBookmarked ? 'active' : ''}`}
                    style={{
                      backgroundColor: isBookmarked ? '#10b981' : currentSlide.accentColor
                    }}
                    title="Simpan Kawasan"
                    aria-label="Simpan Kawasan"
                  >
                    <Bookmark size={18} fill={isBookmarked ? '#ffffff' : 'none'} />
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onExploreSlide(currentSlide)}
                    className="hero-discover-btn"
                  >
                    <Compass size={16} />
                    <span>PROFIL KAWASAN</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onDonateSlide(currentSlide.campaignId)}
                    className="hero-donate-cta-btn"
                  >
                    <HeartHandshake size={16} />
                    <span>DONASI SEKARANG</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Carousel Zone (tanpa nomor kartu dan tanpa bar kontrol bawah) */}
          <div className="hero-carousel-zone">
            <div className="hero-cards-track-motion">
              <AnimatePresence initial={false} mode="popLayout">
                {upcomingSlides.map(({ slide, index }, idx) => (
                  <motion.button
                    key={slide.id}
                    layoutId={`slide-card-${slide.id}`}
                    layout
                    type="button"
                    initial={{ opacity: 0, x: 64, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { duration: 0.82, ease: EXPO_EASE },
                      opacity: { duration: 0.45, ease: EXPO_EASE },
                      x: { duration: 0.65, ease: EXPO_EASE }
                    }}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.28, ease: 'easeOut' }
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => selectSlide(index)}
                    className={`hero-preview-card ${idx === 0 ? 'is-next-up' : ''}`}
                    aria-label={`Buka ${slide.title}`}
                  >
                    <img
                      src={slide.cardImage || slide.image}
                      alt={slide.title}
                      className="hero-preview-card-img"
                    />
                    <div className="hero-preview-card-gradient" />

                    <div className="hero-preview-card-caption">
                      <span className="hero-preview-card-dash" />
                      <span className="hero-preview-card-region">{slide.region}</span>
                      <h3 className="hero-preview-card-title">{slide.title}</h3>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </LayoutGroup>
  );
}
