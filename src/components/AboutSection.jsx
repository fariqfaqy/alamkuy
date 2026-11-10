import React from 'react';
import { motion } from 'motion/react';
import {
  Globe2,
  Target,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Users2,
  Leaf,
  Compass,
  CheckCircle2,
  Award
} from 'lucide-react';

const EXPO_EASE = [0.16, 1, 0.3, 1];

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Sains Terverifikasi',
    desc: 'Semua materi, telemetri, dan analisis mengacu pada konsensus ilmiah IPCC, UNEP, KLHK, dan IUCN Red List.'
  },
  {
    icon: BookOpen,
    title: 'Literasi Interaktif',
    desc: 'Mengubah laporan data iklim yang padat menjadi visual 3D, simulasi ekologi, dan modul yang mudah dipahami generasi muda.'
  },
  {
    icon: Users2,
    title: 'Aksi Nyata Terukur',
    desc: 'Menghubungkan teori ke lapangan melalui adopsi bibit pohon, patroli anti-jerat hutan, dan daur ulang sampah pesisir.'
  },
  {
    icon: Leaf,
    title: 'Inklusif & Berkelanjutan',
    desc: 'Mendorong kolaborasi lintas sekolah, komunitas kampus, masyarakat adat penjaga hutan, dan relawan muda seluruh Indonesia.'
  }
];

const METRICS = [
  { val: '100%', label: 'Data Berbasis Sains Terbuka' },
  { val: '6 Bab', label: 'Atlas Krisis & Solusi 3D' },
  { val: '10+', label: 'Modul Ekologi & Gaya Hidup' },
  { val: '4 Gerakan', label: 'Inisiatif Aksi Lapangan' }
];

export default function AboutSection() {
  return (
    <section id="section-about" className="about-section snap-section">
      <div className="section-container">
        {/* Header Bagian */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EXPO_EASE }}
          className="section-header-block"
        >
          <span className="section-eyebrow">
            <Globe2 size={16} />
            HALAMAN ABOUT • TENTANG ALAMKUY
          </span>
          <h2 className="section-heading">
            Membangun Generasi Melek Iklim,
            <br />
            Menjaga Masa Depan Bumi
          </h2>
          <p className="section-subtext">
            Alamkuy adalah portal edukasi lingkungan hidup dan platform aksi ekologi interaktif
            yang lahir dari keprihatinan atas percepatan krisis iklim global serta minimnya literasi sains di kalangan generasi muda.
          </p>
        </motion.div>

        {/* Grid Cerita & Visi Misi */}
        <div className="about-story-grid">
          {/* Kartu Visi */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EXPO_EASE }}
            className="about-card visi-card"
          >
            <div className="about-card-badge">
              <Target size={18} />
              <span>VISI KAMI</span>
            </div>
            <h3 className="about-card-title">
              Katalisator Literasi & Aksi Ekologi Terdepan di Asia Tenggara
            </h3>
            <p className="about-card-body">
              Mewujudkan peradaban masyarakat yang sadar ekologis, di mana setiap individu memiliki pemahaman sains iklim yang kokoh,
              berdaya mengambil keputusan hijau sehari-hari, dan aktif memulihkan keanekaragaman hayati planet bumi.
            </p>
          </motion.div>

          {/* Kartu Misi */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EXPO_EASE }}
            className="about-card misi-card"
          >
            <div className="about-card-badge">
              <Sparkles size={18} />
              <span>MISI KAMI</span>
            </div>
            <ul className="misi-list">
              <li>
                <CheckCircle2 size={18} className="misi-check-icon" />
                <span>
                  <strong>Demokratisasi Sains Iklim:</strong> Menyajikan data kompleks laporan IPCC dan UNEP menjadi media interaktif 3D yang memikat dan mudah dipahami.
                </span>
              </li>
              <li>
                <CheckCircle2 size={18} className="misi-check-icon" />
                <span>
                  <strong>Edukasi Sekolah & Kampus:</strong> Membangun modul kurikulum terbuka bagi guru, pelajar, dan mahasiswa untuk praktik konservasi aplikatif.
                </span>
              </li>
              <li>
                <CheckCircle2 size={18} className="misi-check-icon" />
                <span>
                  <strong>Jembatan Teori ke Tindakan:</strong> Menyalurkan kepedulian publik secara transparan ke program penanaman pohon, perlindungan satwa, dan bersih samudra.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* 4 Pilar Gerakan Alamkuy */}
        <div className="about-pillars-wrap">
          <h3 className="pillars-section-title">4 Pilar Integritas Kami</h3>
          <div className="about-pillars-grid">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: EXPO_EASE }}
                  whileHover={{ y: -6 }}
                  className="pillar-box"
                >
                  <div className="pillar-icon-box">
                    <Icon size={22} />
                  </div>
                  <h4 className="pillar-title">{p.title}</h4>
                  <p className="pillar-desc">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pita Metrik Dampak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EXPO_EASE }}
          className="about-metrics-bar"
        >
          {METRICS.map((m, i) => (
            <div key={m.label} className="metric-col">
              <span className="metric-val">{m.val}</span>
              <span className="metric-lbl">{m.label}</span>
              {i < METRICS.length - 1 && <div className="metric-sep" />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

