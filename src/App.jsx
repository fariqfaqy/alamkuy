import React, { useState, useMemo, useEffect } from 'react';
import {
  motion,
  AnimatePresence
} from 'motion/react';
import {
  Globe2,
  Search,
  Bookmark,
  Menu,
  X,
  Sparkles,
  MapPin,
  HeartHandshake,
  Compass
} from 'lucide-react';
import {
  HERO_SLIDES,
  SPECIES_DATA,
  NATIONAL_PARKS,
  DONATION_CAMPAIGNS,
  INITIAL_DONORS
} from './data/conservationData';
import HeroSlider from './components/HeroSlider';
import AboutSection from './components/AboutSection';
import ArticleGallerySection from './components/ArticleGallerySection';
import SpeciesFanDeck from './components/SpeciesFanDeck';
import ParkJournalBook from './components/ParkJournalBook';
import ContactSection from './components/ContactSection';
import DonationPage from './components/DonationPage';
import OrigamiFaunaLayer from './components/OrigamiFaunaLayer';

const EXPO_EASE = [0.16, 1, 0.3, 1];

export default function App() {
  const [activeNav, setActiveNav] = useState('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(['krisis-suhu-kutub', 'koridor-rimba-tropis']);
  const [selectedParkRegion, setSelectedParkRegion] = useState('Semua');
  const [speciesCategory, setSpeciesCategory] = useState('Semua');
  const [selectedSlideModal, setSelectedSlideModal] = useState(null);

  const [campaigns, setCampaigns] = useState(DONATION_CAMPAIGNS);
  const [selectedCampaignId, setSelectedCampaignId] = useState(DONATION_CAMPAIGNS[0].id);
  const [donors, setDonors] = useState(INITIAL_DONORS);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Automatic section tracking per halaman
  useEffect(() => {
    const sections = [
      { id: 'section-beranda', key: 'beranda' },
      { id: 'section-about', key: 'about' },
      { id: 'section-artikel-galeri', key: 'konten' },
      { id: 'section-flora-fauna', key: 'spesies' },
      { id: 'section-taman-nasional', key: 'taman' },
      { id: 'section-contact', key: 'contact' },
      { id: 'section-donasi', key: 'donasi' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match) {
              setActiveNav(match.key);
            }
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId, navKey) => {
    setActiveNav(navKey);
    setMobileMenuOpen(false);
    if (sectionId === 'top' || sectionId === 'section-beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDonateForCampaign = (campaignId) => {
    if (campaignId) {
      setSelectedCampaignId(campaignId);
    }
    setSelectedSlideModal(null);
    scrollToSection('section-donasi', 'donasi');
  };

  const handleDonationSubmit = ({ campaignId, amount, donor }) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaignId
          ? {
              ...c,
              collectedAmount: c.collectedAmount + amount,
              donorsCount: c.donorsCount + 1
            }
          : c
      )
    );
    setDonors((prev) => [donor, ...prev]);
  };

  const filteredParks = useMemo(() => {
    if (selectedParkRegion === 'Semua') return NATIONAL_PARKS;
    return NATIONAL_PARKS.filter((p) => p.region === selectedParkRegion);
  }, [selectedParkRegion]);

  const navItems = [
    { key: 'beranda', label: 'HOME', target: 'section-beranda' },
    { key: 'about', label: 'ABOUT', target: 'section-about' },
    { key: 'konten', label: 'KONTEN & GALERI', target: 'section-artikel-galeri' },
    { key: 'spesies', label: 'MODUL EDUKASI', target: 'section-flora-fauna' },
    { key: 'taman', label: 'ATLAS 3D', target: 'section-taman-nasional' },
    { key: 'contact', label: 'CONTACT', target: 'section-contact' }
  ];

  const isLightNavbar = activeNav !== 'beranda';

  return (
    <div className="app-shell">
      {/* Top Navbar */}
      <header className={`top-navbar ${isLightNavbar ? 'navbar-light-mode' : ''}`}>
        <div className="navbar-inner">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="brand-logo"
            onClick={() => scrollToSection('section-beranda', 'beranda')}
          >
            <span className="brand-icon-circle">
              <Globe2 size={18} />
            </span>
            <span className="brand-text">ALAMKUY</span>
          </motion.button>

          <nav className="desktop-nav-links" aria-label="Navigasi Utama">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToSection(item.target, item.key)}
                className={`nav-link-btn ${activeNav === item.key ? 'active' : ''}`}
              >
                {item.label}
                {activeNav === item.key && (
                  <motion.span
                    layoutId="navUnderline"
                    className="nav-motion-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            <motion.button
              type="button"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('section-donasi', 'donasi')}
              className={`nav-link-btn nav-link-highlight ${
                activeNav === 'donasi' ? 'active' : ''
              }`}
            >
              AKSI NYATA
            </motion.button>
          </nav>

          <div className="navbar-actions">
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="navbar-icon-btn"
              onClick={() => scrollToSection('section-flora-fauna', 'spesies')}
              title="Jelajahi Modul Edukasi Ekologi"
              aria-label="Jelajahi Modul Edukasi Ekologi"
            >
              <Search size={17} />
            </motion.button>

            <motion.button
              type="button"
              key={bookmarkedIds.length}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              className="navbar-bookmark-pill"
              onClick={() => scrollToSection('section-taman-nasional', 'taman')}
              title="Kawasan & Isu Tersimpan"
            >
              <Bookmark size={14} />
              <span>{bookmarkedIds.length}</span>
            </motion.button>

            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-nav-drawer"
            >
              <button
                type="button"
                onClick={() => scrollToSection('section-beranda', 'beranda')}
                className="mobile-nav-item"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-about', 'about')}
                className="mobile-nav-item"
              >
                About (Tentang Kami)
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-artikel-galeri', 'konten')}
                className="mobile-nav-item"
              >
                Konten & Galeri
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-flora-fauna', 'spesies')}
                className="mobile-nav-item"
              >
                Modul Edukasi
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-taman-nasional', 'taman')}
                className="mobile-nav-item"
              >
                Atlas 3D Bumi
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-contact', 'contact')}
                className="mobile-nav-item"
              >
                Contact (Hubungi Kami)
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('section-donasi', 'donasi')}
                className="mobile-nav-item mobile-nav-cta"
              >
                Aksi Nyata & Relawan
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Layer Origami Fauna Bergerak di Berbagai Titik Halaman */}
      <OrigamiFaunaLayer />

      {/* Sesi 1: Halaman Home (Hero Slider Interaktif Isu Global) */}
      <div id="section-beranda" className="snap-section">
        <HeroSlider
          slides={HERO_SLIDES}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={toggleBookmark}
          onExploreSlide={(slide) => setSelectedSlideModal(slide)}
          onDonateSlide={(campId) => handleDonateForCampaign(campId)}
        />
      </div>

      {/* Sesi 2: Halaman About (Tentang Kami, Visi, Misi & 4 Pilar Gerakan) */}
      <AboutSection />

      {/* Sesi 3: Halaman Konten / Artikel / Galeri Multimedia */}
      <ArticleGallerySection />

      {/* Sesi 4: Modul Edukasi & Literasi Ekologi Interaktif (Dipertahankan) */}
      <SpeciesFanDeck
        speciesList={SPECIES_DATA}
        selectedCategory={speciesCategory}
        onSelectCategory={setSpeciesCategory}
        onDonateSpecies={(campId) => handleDonateForCampaign(campId)}
      />

      {/* Sesi 5: Atlas 3D Ekologi & Isu Global Model Jurnal Buku (Dipertahankan) */}
      <ParkJournalBook
        parks={NATIONAL_PARKS}
        onDonatePark={(campId) => handleDonateForCampaign(campId)}
      />

      {/* Sesi 6: Halaman Contact (Form Kontak, Pengaduan, Info Saluran & FAQ) */}
      <ContactSection />

      {/* Indikator Stop-Motion Batas Halaman di Sisi Kanan */}
      <nav className="page-stop-dots" aria-label="Navigasi Cepat Batas Halaman">
        {[
          ...navItems,
          { key: 'donasi', label: 'AKSI NYATA', target: 'section-donasi' }
        ].map((page, idx) => (
          <button
            key={page.key}
            type="button"
            onClick={() => scrollToSection(page.target, page.key)}
            className={`page-dot-item ${activeNav === page.key ? 'active' : ''}`}
            title={`Halaman ${idx + 1}: ${page.label}`}
            aria-label={`Ke ${page.label}`}
          >
            <span className="page-dot-label">{page.label}</span>
            <span className="page-dot-bullet" />
          </button>
        ))}
      </nav>

      {/* Sesi 7: Halaman Aksi Nyata (Donasi Terverifikasi & Relawan - Dipertahankan) */}
      <div className="snap-section last-snap-section">
        <DonationPage
          campaigns={campaigns}
          selectedCampaignId={selectedCampaignId}
          onSelectCampaign={setSelectedCampaignId}
          donors={donors}
          onSubmitDonation={handleDonationSubmit}
        />

        {/* Footer Singkat */}
        <footer className="site-footer">
          <div className="section-container footer-row">
            <div className="brand-logo footer-brand">
              <span className="brand-icon-circle">
                <Globe2 size={16} />
              </span>
              <span className="brand-text">ALAMKUY</span>
            </div>
            <p className="footer-note">
              Portal Edukasi Lingkungan & Isu Global. Data bersumber dari IPCC, UNEP, IUCN, dan KLHK.
            </p>
          </div>
        </footer>
      </div>

      {/* Modal Ringkas */}
      <AnimatePresence>
        {selectedSlideModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedSlideModal(null)}
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
                onClick={() => setSelectedSlideModal(null)}
                aria-label="Tutup"
              >
                <X size={18} />
              </button>

              <div className="modal-hero-img">
                <img src={selectedSlideModal.image} alt={selectedSlideModal.title} />
                <div className="modal-hero-caption">
                  <span className="modal-badge">{selectedSlideModal.unesco}</span>
                  <h2>{selectedSlideModal.title}</h2>
                  <p>{selectedSlideModal.subtitle}</p>
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-stats-row">
                  <div className="modal-stat-box">
                    <span>Status</span>
                    <strong>{selectedSlideModal.iucnBadge}</strong>
                  </div>
                  <div className="modal-stat-box">
                    <span>Populasi</span>
                    <strong>{selectedSlideModal.populationStat}</strong>
                  </div>
                  <div className="modal-stat-box">
                    <span>Luas</span>
                    <strong>{selectedSlideModal.areaStat}</strong>
                  </div>
                </div>

                <ul className="modal-highlights-list">
                  {selectedSlideModal.highlights.map((h) => (
                    <li key={h}>
                      <Sparkles size={15} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="modal-actions">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleDonateForCampaign(selectedSlideModal.campaignId)}
                  >
                    <HeartHandshake size={17} />
                    <span>Donasi Kawasan Ini</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
