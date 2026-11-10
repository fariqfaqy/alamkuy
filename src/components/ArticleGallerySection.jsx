import React, { useState, useMemo } from 'react';
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
  ChevronRight,
  Maximize2,
  BookOpen
} from 'lucide-react';
import { ARTICLES_DATA, GALLERY_DATA } from '../data/conservationData';

const EXPO_EASE = [0.16, 1, 0.3, 1];

export default function ArticleGallerySection() {
  const [activeTab, setActiveTab] = useState('artikel'); // 'artikel' | 'galeri'
  const [articleCategory, setArticleCategory] = useState('Semua');
  const [galleryCategory, setGalleryCategory] = useState('Semua');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Filtered Articles
  const articleCategories = [
    'Semua',
    'Sains Iklim',
    'Ekosistem',
    'Polusi Laut',
    'Gaya Hidup Hijau',
    'Konservasi Hayati',
    'Energi Bersih'
  ];

  const filteredArticles = useMemo(() => {
    if (articleCategory === 'Semua') return ARTICLES_DATA;
    return ARTICLES_DATA.filter((a) => a.category === articleCategory);
  }, [articleCategory]);

  // Filtered Gallery
  const galleryCategories = [
    'Semua',
    'Lanskap Kritis',
    'Aksi Lapangan',
    'Flora & Fauna',
    'Edukasi Komunitas'
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

            {/* Grid Artikel */}
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

            {/* Grid Foto Galeri */}
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
