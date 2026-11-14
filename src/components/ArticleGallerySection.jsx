import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Globe,
  LayoutGrid
} from 'lucide-react';
import { ARTICLES_DATA, GALLERY_DATA } from '../data/conservationData';

const EXPO_EASE = [0.16, 1, 0.3, 1];

/**
 * 3D Globe Card Stage (Bola Globe Interaktif 3D)
 * Menampilkan kartu-kartu dalam formasi bola dunia (globe) 3D dengan rotasi bebas 2 sumbu (X & Y)
 * yang dikendalikan murni oleh kursor (drag, swipe, dan hover tilt), tanpa perputaran otomatis konstan,
 * dengan visual kartu yang tajam, kontras tinggi, dan tanpa efek burem.
 */
function Globe3DCardStage({
  items,
  type = 'article', // 'article' | 'photo'
  onSelect
}) {
  const [rotY, setRotY] = useState(0); // Longitude / Yaw
  const [rotX, setRotX] = useState(0); // Latitude / Pitch
  const [hoverTilt, setHoverTilt] = useState({ x: 0, y: 0 });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const stageRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);
  const hasDraggedRef = useRef(false);

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

  // Jari-jari bola 3D proporsional agar kartu tidak menimpa judul di atas
  const radiusX = isMobile ? 135 : isTablet ? 225 : 310;
  const radiusY = isMobile ? 70 : isTablet ? 95 : 112;
  const radiusZ = isMobile ? 120 : isTablet ? 190 : 230;

  // Pointer drag & hover interaction handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    startPosRef.current = { x: clientX, y: clientY };
    startRotRef.current = { x: rotX, y: rotY };
    velRef.current = { x: 0, y: 0 };

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  const handlePointerMove = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    if (isDraggingRef.current) {
      const dx = clientX - startPosRef.current.x;
      const dy = clientY - startPosRef.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasDraggedRef.current = true;
      }
      const sensitivityX = isMobile ? 0.42 : 0.32;
      const sensitivityY = isMobile ? 0.36 : 0.26;

      const nextRotY = startRotRef.current.y + dx * sensitivityX;
      // Batasi sudut elevasi pitch antara -65 derajat sampai +65 derajat agar kartu tidak terbalik
      const nextRotX = Math.max(-65, Math.min(65, startRotRef.current.x - dy * sensitivityY));

      velRef.current = {
        x: (nextRotX - rotX) * 0.42,
        y: (nextRotY - rotY) * 0.42
      };

      setRotY(nextRotY);
      setRotX(nextRotX);
    } else {
      // Dinamika sudut miring halus saat kursor melayang di atas panggung globe
      if (stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        const nx = (clientX - rect.left) / rect.width - 0.5;
        const ny = (clientY - rect.top) / rect.height - 0.5;
        setHoverTilt({ x: -ny * 10, y: nx * 14 });
      }
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Pelepasan inersia halus yang melambat dan berhenti sempurna (tidak berputar terus)
    let vx = velRef.current.x;
    let vy = velRef.current.y;

    if (Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05) {
      return;
    }

    const momentumStep = () => {
      vx *= 0.91;
      vy *= 0.91;

      setRotY((prev) => prev + vy);
      setRotX((prev) => Math.max(-65, Math.min(65, prev + vx)));

      if (Math.abs(vx) > 0.02 || Math.abs(vy) > 0.02) {
        animFrameRef.current = requestAnimationFrame(momentumStep);
      } else {
        animFrameRef.current = null;
      }
    };
    animFrameRef.current = requestAnimationFrame(momentumStep);
  };

  const handleMouseLeave = () => {
    handlePointerUp();
    setHoverTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Formasi distribusi koordinat bola dunia 3D (Spherical Coordinates)
  const total = items.length;
  const cardsGlobeLayout = useMemo(() => {
    return items.map((item, idx) => {
      // Rentang garis lintang (latitude) dari -48 derajat sampai +48 derajat
      const latDeg = total > 1 ? -48 + (idx / (total - 1)) * 96 : 0;
      const latRad = (latDeg * Math.PI) / 180;

      // Distribusi bujur (longitude) rasio emas agar kartu merata mengelilingi globe
      const lonDeg = (idx * (360 / total) * 1.6180339887) % 360;
      const lonRad = (lonDeg * Math.PI) / 180;

      // Titik dasar pada permukaan bola 3D
      const x0 = radiusX * Math.cos(latRad) * Math.sin(lonRad);
      const y0 = radiusY * Math.sin(latRad);
      const z0 = radiusZ * Math.cos(latRad) * Math.cos(lonRad);

      return {
        item,
        idx,
        x0,
        y0,
        z0
      };
    });
  }, [items, total, radiusX, radiusY, radiusZ]);

  // Sudut rotasi total yang digabungkan
  const currentRotX = rotX + hoverTilt.x;
  const currentRotY = rotY + hoverTilt.y;

  const radX = (currentRotX * Math.PI) / 180;
  const radY = (currentRotY * Math.PI) / 180;
  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);
  const cosY = Math.cos(radY);
  const sinY = Math.sin(radY);

  return (
    <div
      ref={stageRef}
      className="orbit-3d-stage globe-3d-stage"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseLeave={handleMouseLeave}
      aria-label="Bola Globe 3D Konten Interaktif"
    >
      {/* Visualisasi Grid Garis Bujur & Lintang Globe serta Aura Atmosfer */}
      <div className="orbit-space-backdrop globe-backdrop" aria-hidden="true">
        <div className="orbit-center-glow globe-aura-glow" />
        <div
          className="globe-wire-grid"
          style={{
            transform: `rotateX(${currentRotX * 0.45}deg) rotateY(${currentRotY * 0.45}deg)`
          }}
        >
          <div className="globe-lat-ring ring-equator" />
          <div className="globe-lat-ring ring-tropic-north" />
          <div className="globe-lat-ring ring-tropic-south" />
          <div className="globe-meridian-ring ring-meridian-1" />
          <div className="globe-meridian-ring ring-meridian-2" />
        </div>
      </div>

      {/* Lapisan Kartu 3D Permukaan Globe */}
      <div className="orbit-card-ring">
        {cardsGlobeLayout.map(({ item, idx, x0, y0, z0 }) => {
          // 1. Rotasi Horizontal terhadap Sumbu Y (Bujur / Longitude)
          const x1 = x0 * cosY + z0 * sinY;
          const z1 = -x0 * sinY + z0 * cosY;
          const y1 = y0;

          // 2. Rotasi Vertikal terhadap Sumbu X (Lintang / Latitude)
          const y2 = y1 * cosX - z1 * sinX;
          const z2 = y1 * sinX + z1 * cosX;
          const x2 = x1;

          // Normalisasi kedalaman Z (-radiusZ sampai +radiusZ)
          const normZ = (z2 + radiusZ) / (2 * radiusZ);
          const isFront = normZ > 0.52;
          const scale = isMobile
            ? 0.68 + normZ * 0.24
            : 0.72 + normZ * 0.28;

          // Kartu dibuat jernih dan tajam (tanpa efek blur, kontras tinggi)
          const opacity = 0.90 + normZ * 0.10;
          const zIndex = Math.round(normZ * 260);

          // Kemiringan kurvatur bola 3D
          const tiltY = (x2 / radiusX) * 20;
          const tiltX = -(y2 / radiusY) * 16;

          const isHovered = hoveredIdx === idx;

          return (
            <motion.div
              key={item.id}
              className={`orbit-floating-card globe-card ${isFront ? 'is-front' : 'is-back'} ${
                isHovered ? 'is-hovered' : ''
              }`}
              style={{
                transform: `translate3d(calc(-50% + ${x2}px), calc(-50% + ${y2}px), ${z2}px) rotateY(${tiltY}deg) rotateX(${tiltX}deg) scale(${
                  isHovered ? scale * 1.12 : scale
                })`,
                opacity: isHovered ? 1 : opacity,
                zIndex: isHovered ? zIndex + 300 : zIndex
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={(e) => {
                e.stopPropagation();
                if (!hasDraggedRef.current) {
                  onSelect(item);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(item);
              }}
              aria-label={`Buka ${item.title}`}
            >
              {/* Gambar Kartu */}
              <div className="orbit-card-img-wrap">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="orbit-card-gradient" />
                <div className="orbit-card-sheen" />
              </div>

              {/* Konten Teks Kartu */}
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
    </div>
  );
}

/**
 * Menghitung posisi awal tumpukan kartu bandar poker di tengah atas grid
 * agar setiap kartu tampak dibagikan satu per satu ke slot grid masing-masing.
 */
function getPokerDealInitial(idx, cols = 3) {
  const col = idx % cols;
  const row = Math.floor(idx / cols);
  const centerCol = (cols - 1) / 2;
  return {
    opacity: 0,
    x: (centerCol - col) * (cols === 3 ? 280 : 210),
    y: -170 - row * 145,
    scale: 0.48,
    rotate: (col - centerCol) * 10 + (idx % 2 === 0 ? -12 : 12),
    rotateY: 70
  };
}

export default function ArticleGallerySection() {
  const [activeTab, setActiveTab] = useState('artikel'); // 'artikel' | 'galeri'
  const [displayMode, setDisplayMode] = useState('globe'); // 'globe' | 'grid'
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

            {/* Display Mode Toggle: 3D Globe vs Grid */}
            <div className="display-mode-toggle-group">
              <button
                type="button"
                onClick={() => setDisplayMode('globe')}
                className={`mode-toggle-btn ${displayMode === 'globe' ? 'active' : ''}`}
                title="Tampilan Bola Globe 3D"
                aria-label="Tampilan Bola Globe 3D"
              >
                <Globe size={16} />
                <span>3D Globe</span>
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
            {/* Render 3D Globe vs Grid Klasik (Animasi Bandar Poker Membagikan Kartu) */}
            <AnimatePresence mode="wait">
              {displayMode === 'globe' ? (
                <motion.div
                  key="artikel-globe"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.32 }}
                >
                  <Globe3DCardStage
                    items={ARTICLES_DATA}
                    type="article"
                    onSelect={(art) => setSelectedArticle(art)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="artikel-grid"
                  className="articles-grid poker-deal-grid"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {ARTICLES_DATA.map((art, idx) => (
                    <motion.article
                      key={art.id}
                      initial={getPokerDealInitial(idx, 3)}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotate: 0,
                        rotateY: 0
                      }}
                      transition={{
                        duration: 0.56,
                        delay: idx * 0.11,
                        ease: EXPO_EASE
                      }}
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
                </motion.div>
              )}
            </AnimatePresence>
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
            {/* Render 3D Globe vs Grid Klasik (Animasi Bandar Poker Membagikan Kartu) */}
            <AnimatePresence mode="wait">
              {displayMode === 'globe' ? (
                <motion.div
                  key="galeri-globe"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.32 }}
                >
                  <Globe3DCardStage
                    items={GALLERY_DATA}
                    type="photo"
                    onSelect={(photo) => setSelectedPhoto(photo)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="galeri-grid"
                  className="gallery-masonry-grid poker-deal-grid"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {GALLERY_DATA.map((photo, idx) => (
                    <motion.div
                      key={photo.id}
                      initial={getPokerDealInitial(idx, 4)}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotate: 0,
                        rotateY: 0
                      }}
                      transition={{
                        duration: 0.56,
                        delay: idx * 0.11,
                        ease: EXPO_EASE
                      }}
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
                </motion.div>
              )}
            </AnimatePresence>
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
