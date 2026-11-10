import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Newspaper,
  Image as ImageIcon,
  Clock,
  Calendar,
  User,
  ArrowRight,
  X,
  MapPin,
  Sparkles,
  Maximize2,
  RotateCcw,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Orbit
} from 'lucide-react';
import { ARTICLES_DATA, GALLERY_DATA } from '../data/conservationData';

const EXPO_EASE = [0.16, 1, 0.3, 1];

/**
 * 3D Orbit Floating Constellation Stage (Sesuai Animasi Video Referensi)
 * Menampilkan kartu-kartu dalam orbit elips 3D berputar secara dinamis,
 * dengan depth layering, tilt perspektif, drag spin, dan auto-orbiting.
 */
function Orbit3DCardStage({
  items,
  type = 'article', // 'article' | 'photo'
  onSelect,
  isPaused,
  onTogglePause
}) {
  const [rotation, setRotation] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const animFrameRef = useRef(null);
  const stageRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1080;

  // Orbit radius parameter
  const radiusX = isMobile ? 180 : isTablet ? 280 : 380;
  const radiusZ = isMobile ? 130 : isTablet ? 190 : 260;

  // Continuous auto-orbit loop (60 FPS)
  useEffect(() => {
    let lastTime = performance.now();
    const loop = (now) => {
      const dt = now - lastTime;
      lastTime = now;
      if (!isDraggingRef.current && hoveredIdx === null && !isPaused) {
        // Kecepatan putaran orbit yang tenang dan sinematik
        setRotation((prev) => (prev + 0.08 * (dt / 16.6)) % 360);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hoveredIdx, isPaused]);

  // Pointer Drag Handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startRotationRef.current = rotation;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startXRef.current;
    // Sensitivitas drag
    const sensitivity = isMobile ? 0.38 : 0.28;
    setRotation(startRotationRef.current + deltaX * sensitivity);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleStepLeft = () => {
    setRotation((prev) => prev - (360 / items.length));
  };

  const handleStepRight = () => {
    setRotation((prev) => prev + (360 / items.length));
  };

  const total = items.length;

  return (
    <div
      ref={stageRef}
      className="orbit-3d-stage"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-label="Orbit 3D Carousel"
    >
      {/* Background Orbit Depth Rings & Glow */}
      <div className="orbit-space-backdrop" aria-hidden="true">
        <div className="orbit-center-glow" />
        <div className="orbit-depth-ring ring-outer" />
        <div className="orbit-depth-ring ring-mid" />
        <div className="orbit-depth-ring ring-inner" />
      </div>

      {/* Orbit 3D Ring Container */}
      <div className="orbit-card-ring">
        {items.map((item, idx) => {
          const baseAngle = (idx / total) * 360;
          const currentAngle = (baseAngle + rotation) % 360;
          const rad = (currentAngle * Math.PI) / 180;

          // Trigonometri koordinat elips 3D
          const x = Math.sin(rad) * radiusX;
          const z = Math.cos(rad) * radiusZ;
          // Gelombang vertikal halus untuk kesan melayang organik seperti di video
          const y = Math.sin(rad * 1.5) * (isMobile ? 24 : 38);

          // Normalisasi kedalaman Z (-radiusZ ke +radiusZ)
          const normalizedZ = (z + radiusZ) / (2 * radiusZ);
          const isFront = normalizedZ > 0.65;
          const scale = isMobile
            ? 0.72 + normalizedZ * 0.3
            : 0.76 + normalizedZ * 0.34;
          const opacity = isMobile
            ? 0.45 + normalizedZ * 0.55
            : 0.42 + normalizedZ * 0.58;
          const zIndex = Math.round(normalizedZ * 100);

          // Sudut rotasi 3D agar kartu menghadap ke arah kamera
          const rotateY = -Math.sin(rad) * 24;
          const rotateX = -Math.cos(rad) * 10;

          const isHovered = hoveredIdx === idx;

          return (
            <motion.div
              key={item.id}
              className={`orbit-floating-card ${isFront ? 'is-front' : 'is-back'} ${
                isHovered ? 'is-hovered' : ''
              }`}
              style={{
                transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${
                  isHovered ? scale * 1.12 : scale
                })`,
                opacity: isHovered ? 1 : opacity,
                zIndex: isHovered ? zIndex + 200 : zIndex
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(item);
              }}
              aria-label={`Buka ${item.title}`}
            >
              {/* Card Image */}
              <div className="orbit-card-img-wrap">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="orbit-card-gradient" />
                <div className="orbit-card-sheen" />
              </div>

              {/* Card Content Overlay */}
              <div className="orbit-card-content">
                <span className="orbit-cat-pill">{item.category}</span>
                <h4 className="orbit-card-title">{item.title}</h4>

                {type === 'article' ? (
                  <div className="orbit-card-meta">
                    <span>
                      <Clock size={12} /> {item.readTime}
                    </span>
                    <span className="orbit-view-cta">
                      Baca <ArrowRight size={12} />
                    </span>
                  </div>
                ) : (
                  <div className="orbit-card-meta">
                    <span>
                      <MapPin size={12} /> {item.location}
                    </span>
                    <span className="orbit-zoom-tag">
                      <Maximize2 size={13} />
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Orbit Floating Action Controls */}
      <div className="orbit-stage-controls">
        <button
          type="button"
          onClick={handleStepLeft}
          className="orbit-nav-btn"
          title="Putar ke Kiri"
          aria-label="Putar ke Kiri"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={onTogglePause}
          className={`orbit-play-btn ${!isPaused ? 'active' : ''}`}
          title={isPaused ? 'Mulai Putar Otomatis' : 'Jeda Putaran'}
          aria-label={isPaused ? 'Mulai Putar Otomatis' : 'Jeda Putaran'}
        >
          {isPaused ? <Play size={15} /> : <Pause size={15} />}
          <span>{isPaused ? 'Putar' : 'Jeda'}</span>
        </button>

        <button
          type="button"
          onClick={handleStepRight}
          className="orbit-nav-btn"
          title="Putar ke Kanan"
          aria-label="Putar ke Kanan"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="orbit-drag-hint">
        Geser kursor atau sentuh layar untuk memutar orbit • Klik kartu untuk melihat detail
      </p>
    </div>
  );
}

export default function ArticleGallerySection() {
  const [activeTab, setActiveTab] = useState('artikel'); // 'artikel' | 'galeri'
  const [displayMode, setDisplayMode] = useState('orbit'); // 'orbit' | 'grid'
  const [articleCategory, setArticleCategory] = useState('Semua');
  const [galleryCategory, setGalleryCategory] = useState('Semua');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);

  // Filtered Articles
  const articleCategories = [
    'Semua',
    'Riset Kebijakan',
    'Teknologi Hijau',
    'Sosial Ekologi',
    'Ekonomi Sirkular',
    'Restorasi Ekologi',
    'Pendidikan Lingkungan'
  ];

  const filteredArticles = useMemo(() => {
    if (articleCategory === 'Semua') return ARTICLES_DATA;
    return ARTICLES_DATA.filter((a) => a.category === articleCategory);
  }, [articleCategory]);

  // Filtered Gallery
  const galleryCategories = [
    'Semua',
    'Riset Lapangan',
    'Aksi Restorasi',
    'Dokumentasi Konservasi',
    'Pendidikan Komunitas'
  ];

  const filteredGallery = useMemo(() => {
    if (galleryCategory === 'Semua') return GALLERY_DATA;
    return GALLERY_DATA.filter((g) => g.category === galleryCategory);
  }, [galleryCategory]);

  return (
    <section id="section-artikel-galeri" className="artikel-galeri-section snap-section">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EXPO_EASE }}
          className="section-header-block"
        >
          <span className="section-eyebrow">
            <Newspaper size={16} />
            HALAMAN KONTEN • ARTIKEL & GALERI MULTIMEDIA
          </span>
          <h2 className="section-heading">
            Pusat Pengetahuan & Dokumentasi
            <br />
            Visual Konservasi Bumi
          </h2>
          <p className="section-subtext">
            Jelajahi analisis sains mutakhir, panduan aksi ramah lingkungan harian, serta potret visual bentang alam dan aksi nyata pemulihan biosfer.
          </p>

          {/* Sub Navigation Bar: Tab Switcher & Display Mode Switcher */}
          <div className="content-toolbar-row">
            {/* Tab Switcher: Artikel vs Galeri */}
            <div className="content-main-tab-row">
              <button
                type="button"
                onClick={() => setActiveTab('artikel')}
                className={`content-tab-btn ${activeTab === 'artikel' ? 'active' : ''}`}
              >
                <Newspaper size={17} />
                <span>Jurnal & Artikel Edukasi ({ARTICLES_DATA.length})</span>
                {activeTab === 'artikel' && (
                  <motion.span
                    layoutId="contentTabHighlight"
                    className="content-tab-pill-bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('galeri')}
                className={`content-tab-btn ${activeTab === 'galeri' ? 'active' : ''}`}
              >
                <ImageIcon size={17} />
                <span>Galeri Visual Lapangan ({GALLERY_DATA.length})</span>
                {activeTab === 'galeri' && (
                  <motion.span
                    layoutId="contentTabHighlight"
                    className="content-tab-pill-bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </div>

            {/* Display Mode Toggle: 3D Orbit vs Grid */}
            <div className="display-mode-toggle-group">
              <button
                type="button"
                onClick={() => setDisplayMode('orbit')}
                className={`mode-toggle-btn ${displayMode === 'orbit' ? 'active' : ''}`}
                title="Tampilan 3D Orbit Carousel (Sesuai Video)"
                aria-label="Tampilan 3D Orbit Carousel"
              >
                <Orbit size={16} />
                <span>3D Orbit</span>
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('grid')}
                className={`mode-toggle-btn ${displayMode === 'grid' ? 'active' : ''}`}
                title="Tampilan Grid Klasik"
                aria-label="Tampilan Grid Klasik"
              >
                <LayoutGrid size={16} />
                <span>Grid Klasik</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* TAB 1: ARTIKEL & JURNAL EDUKASI */}
        {activeTab === 'artikel' && (
          <motion.div
            key="tab-artikel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="articles-view-wrapper"
          >
            {/* Filter Kategori Artikel */}
            <div className="filter-pill-scroll">
              {articleCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setArticleCategory(cat)}
                  className={`filter-pill-btn ${articleCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Render 3D Orbit vs Grid */}
            {displayMode === 'orbit' ? (
              <Orbit3DCardStage
                items={filteredArticles}
                type="article"
                onSelect={(art) => setSelectedArticle(art)}
                isPaused={isOrbitPaused}
                onTogglePause={() => setIsOrbitPaused((p) => !p)}
              />
            ) : (
              <div className="articles-grid">
                {filteredArticles.map((art, idx) => (
                  <motion.article
                    key={art.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease: EXPO_EASE }}
                    whileHover={{ y: -6 }}
                    className="article-card"
                    onClick={() => setSelectedArticle(art)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedArticle(art);
                    }}
                  >
                    <div className="article-card-cover">
                      <img src={art.image} alt={art.title} loading="lazy" />
                      <span className="article-cat-tag">{art.category}</span>
                    </div>

                    <div className="article-card-body">
                      <div className="article-meta-row">
                        <span className="article-meta-item">
                          <Clock size={13} /> {art.readTime}
                        </span>
                        <span className="article-meta-item">
                          <Calendar size={13} /> {art.date}
                        </span>
                      </div>

                      <h3 className="article-title">{art.title}</h3>
                      <p className="article-excerpt">{art.excerpt}</p>

                      <div className="article-card-footer">
                        <span className="article-author">
                          <User size={13} /> {art.author}
                        </span>
                        <span className="article-read-link">
                          Baca Artikel <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: GALERI VISUAL LAPANGAN */}
        {activeTab === 'galeri' && (
          <motion.div
            key="tab-galeri"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="gallery-view-wrapper"
          >
            {/* Filter Kategori Galeri */}
            <div className="filter-pill-scroll">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setGalleryCategory(cat)}
                  className={`filter-pill-btn ${galleryCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Render 3D Orbit vs Grid */}
            {displayMode === 'orbit' ? (
              <Orbit3DCardStage
                items={filteredGallery}
                type="photo"
                onSelect={(photo) => setSelectedPhoto(photo)}
                isPaused={isOrbitPaused}
                onTogglePause={() => setIsOrbitPaused((p) => !p)}
              />
            ) : (
              <div className="gallery-masonry-grid">
                {filteredGallery.map((photo, idx) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: EXPO_EASE }}
                    whileHover={{ scale: 1.025 }}
                    className="gallery-photo-item"
                    onClick={() => setSelectedPhoto(photo)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedPhoto(photo);
                    }}
                  >
                    <img src={photo.image} alt={photo.title} loading="lazy" />
                    <div className="gallery-photo-scrim" />

                    <div className="gallery-photo-caption">
                      <span className="photo-cat-badge">{photo.category}</span>
                      <h4 className="photo-title">{photo.title}</h4>
                      <span className="photo-loc">
                        <MapPin size={12} /> {photo.location}
                      </span>
                    </div>

                    <div className="photo-zoom-icon">
                      <Maximize2 size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* MODAL BACA ARTIKEL LENGKAP */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-backdrop"
              onClick={() => setSelectedArticle(null)}
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.35, ease: EXPO_EASE }}
                className="article-reader-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedArticle(null)}
                  aria-label="Tutup Artikel"
                >
                  <X size={19} />
                </button>

                <div className="reader-cover">
                  <img src={selectedArticle.image} alt={selectedArticle.title} />
                  <div className="reader-cover-scrim" />
                  <div className="reader-cover-content">
                    <span className="reader-badge">{selectedArticle.category}</span>
                    <h2 className="reader-title">{selectedArticle.title}</h2>
                    <div className="reader-meta">
                      <span><User size={13} /> {selectedArticle.author}</span>
                      <span><Calendar size={13} /> {selectedArticle.date}</span>
                      <span><Clock size={13} /> {selectedArticle.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="reader-body">
                  <p className="reader-lead">{selectedArticle.excerpt}</p>
                  <hr className="reader-divider" />
                  {selectedArticle.content.map((para, i) => (
                    <p key={i} className="reader-paragraph">
                      {para}
                    </p>
                  ))}

                  <div className="reader-footer-box">
                    <div className="reader-footer-left">
                      <Sparkles size={18} />
                      <div>
                        <strong>Literasi Hijau Bersama Alamkuy</strong>
                        <p>Mari sebarkan pemahaman sains ini ke teman, kelas, dan keluargamu.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(null)}
                      className="reader-done-btn"
                    >
                      Selesai Membaca
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL LIGHTBOX FOTO RESOLUSI TINGGI */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-backdrop photo-lightbox-backdrop"
              onClick={() => setSelectedPhoto(null)}
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, ease: EXPO_EASE }}
                className="lightbox-card"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="modal-close-btn lightbox-close"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Tutup Foto"
                >
                  <X size={20} />
                </button>

                <div className="lightbox-img-wrap">
                  <img src={selectedPhoto.image} alt={selectedPhoto.title} />
                </div>

                <div className="lightbox-info">
                  <div className="lightbox-top-row">
                    <span className="photo-cat-badge">{selectedPhoto.category}</span>
                    <span className="lightbox-loc">
                      <MapPin size={13} /> {selectedPhoto.location}
                    </span>
                  </div>
                  <h3 className="lightbox-title">{selectedPhoto.title}</h3>
                  <p className="lightbox-caption">{selectedPhoto.caption}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
