import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Building,
  HeartHandshake
} from 'lucide-react';

const EXPO_EASE = [0.16, 1, 0.3, 1];

const FAQS = [
  {
    q: 'Bagaimana cara sekolah atau kampus kami mengundang workshop edukasi Alamkuy?',
    a: 'Anda cukup mengisi formulir di samping dengan memilih kategori "Kolaborasi Sekolah / Kampus". Tim edukasi kami akan menghubungi Anda dalam waktu 1x24 jam untuk menyesuaikan materi dan jadwal sesi.'
  },
  {
    q: 'Apakah donasi dan program pohon memiliki laporan transparansi berkala?',
    a: 'Ya, seluruh dana yang tersalurkan melalui kampanye Alamkuy diaudit secara terbuka dan dilaporkan bersama mitra lapangan resmi (BOS Foundation, Rhino Protection Unit, YABI, dll) secara berkala di portal ini.'
  },
  {
    q: 'Bisakah saya mengirimkan artikel opini sains atau foto dokumentasi lapangan?',
    a: 'Tentu! Kami sangat terbuka menerima kontribusi karya tulis dan foto dari peneliti muda, fotografer alam, dan relawan. Pilih kategori "Pengiriman Konten / Foto" pada formulir kontak.'
  }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Kolaborasi Sekolah / Kampus',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: 'Kolaborasi Sekolah / Kampus',
      message: ''
    });
  };

  return (
    <section id="section-contact" className="contact-section snap-section">
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
            <Mail size={16} />
            HALAMAN CONTACT • HUBUNGI KAMI & BERKOLABORASI
          </span>
          <h2 className="section-heading">
            Mari Bergerak Bersama
            <br />
            Untuk Kelestarian Bumi
          </h2>
          <p className="section-subtext">
            Punya gagasan aksi lingkungan, ingin mengundang sesi edukasi di institusimu, atau ingin bertanya seputar sains iklim?
            Pintu komunikasi kami selalu terbuka.
          </p>
        </motion.div>

        {/* Contact Layout Grid */}
        <div className="contact-main-grid">
          {/* Kolom Kiri: Form Interaktif */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EXPO_EASE }}
            className="contact-form-card"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="contact-success-state"
              >
                <div className="success-icon-wrap">
                  <CheckCircle2 size={48} className="success-check-icon" />
                </div>
                <h3 className="success-title">Pesan Berhasil Terkirim!</h3>
                <p className="success-desc">
                  Terima kasih, <strong>{formData.name}</strong>. Tim relawan dan edukasi Alamkuy telah menerima pesanmu untuk kategori{' '}
                  <strong>{formData.category}</strong>. Kami akan segera membalas ke email <strong>{formData.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="contact-new-msg-btn"
                >
                  Kirim Pesan Lainnya
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-actual-form">
                <h3 className="form-card-title">Kirim Pesan atau Usulan</h3>
                <p className="form-card-subtitle">
                  Isi data di bawah ini, kami akan merespons dalam 1x24 jam kerja.
                </p>

                <div className="form-fields-grid">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Nama Lengkap *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Alamat Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-fields-grid">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Nomor WhatsApp / Telepon
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="081234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      Kategori Keperluan *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-input form-select"
                    >
                      <option value="Kolaborasi Sekolah / Kampus">Kolaborasi Sekolah / Kampus</option>
                      <option value="Gabung Relawan Aksi Lapangan">Gabung Relawan Aksi Lapangan</option>
                      <option value="Tanya Pakar Sains Iklim">Tanya Pakar Sains Iklim</option>
                      <option value="Liputan Media & Publikasi">Liputan Media & Publikasi</option>
                      <option value="Kemitraan Konservasi & Donasi">Kemitraan Konservasi & Donasi</option>
                      <option value="Pengiriman Konten / Foto">Pengiriman Konten / Foto</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Pesan atau Gagasan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tuliskan pesan, pertanyaan, atau ide kolaborasi yang ingin kamu diskusikan bersama Alamkuy..."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="contact-submit-btn"
                >
                  <Send size={16} />
                  <span>Kirim Pesan Sekarang</span>
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Kolom Kanan: Info Saluran & FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EXPO_EASE }}
            className="contact-info-col"
          >
            {/* Saluran Komunikasi Langsung */}
            <div className="contact-channels-box">
              <h3 className="channels-heading">Saluran Resmi Alamkuy</h3>
              <div className="channels-list">
                <a
                  href="mailto:halo@alamkuy.org"
                  className="channel-item"
                  title="Kirim Email ke halo@alamkuy.org"
                >
                  <div className="channel-icon-circle">
                    <Mail size={18} />
                  </div>
                  <div className="channel-texts">
                    <span className="channel-lbl">Surel Elektronik</span>
                    <strong className="channel-val">halo@alamkuy.org</strong>
                  </div>
                </a>

                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item"
                  title="Kirim Pesan WhatsApp"
                >
                  <div className="channel-icon-circle">
                    <Phone size={18} />
                  </div>
                  <div className="channel-texts">
                    <span className="channel-lbl">WhatsApp Hotline Relawan</span>
                    <strong className="channel-val">+62 812-3456-7890</strong>
                  </div>
                </a>

                <div className="channel-item non-link">
                  <div className="channel-icon-circle">
                    <MapPin size={18} />
                  </div>
                  <div className="channel-texts">
                    <span className="channel-lbl">Markas Gerakan Relawan</span>
                    <strong className="channel-val">Jl. Konservasi Hijau No. 42, Bandung, Jawa Barat</strong>
                  </div>
                </div>

                <div className="channel-item non-link">
                  <div className="channel-icon-circle">
                    <Clock size={18} />
                  </div>
                  <div className="channel-texts">
                    <span className="channel-lbl">Jam Operasional Tim Riset</span>
                    <strong className="channel-val">Senin - Jumat: 09.00 - 17.00 WIB</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion FAQ Interaktif */}
            <div className="contact-faq-box">
              <div className="faq-box-head">
                <HelpCircle size={17} />
                <h4>Pertanyaan Sering Diajukan (FAQ)</h4>
              </div>

              <div className="faq-accordion-list">
                {FAQS.map((faq, i) => {
                  const isOpen = activeFaq === i;
                  return (
                    <div key={i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? -1 : i)}
                        className="faq-question-btn"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown size={16} className={`faq-arrow ${isOpen ? 'rotated' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="faq-answer-wrap"
                          >
                            <p className="faq-answer-text">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

