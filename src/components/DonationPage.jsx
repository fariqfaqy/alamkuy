import React, { useState, useMemo } from 'react';
import {
  motion,
  AnimatePresence
} from 'motion/react';
import {
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Users,
  Trees,
  QrCode,
  Wallet,
  Building2,
  Award,
  ArrowRight
} from 'lucide-react';

const PRESET_AMOUNTS = [50000, 100000, 250000, 500000];

const PAYMENT_METHODS = [
  { id: 'qris', label: 'QRIS', icon: QrCode },
  { id: 'ewallet', label: 'GoPay / OVO / DANA', icon: Wallet },
  { id: 'va', label: 'Virtual Account Bank', icon: Building2 }
];

const EXPO_EASE = [0.16, 1, 0.3, 1];

export default function DonationPage({
  campaigns,
  selectedCampaignId,
  onSelectCampaign,
  donors,
  onSubmitDonation
}) {
  const [frequency, setFrequency] = useState('once');
  const [amount, setAmount] = useState(100000);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [donorName, setDonorName] = useState('');
  const [donorCity, setDonorCity] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [certificate, setCertificate] = useState(null);

  const activeCampaign = useMemo(() => {
    return campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];
  }, [campaigns, selectedCampaignId]);

  const effectiveAmount = customAmount ? Math.max(10000, Number(customAmount) || 0) : amount;
  const impactCount = Math.max(1, Math.round(effectiveAmount / activeCampaign.unitCost));

  const formatIDR = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = donorName.trim() || 'Sahabat Alam';
    const finalCity = donorCity.trim() || 'Indonesia';
    const finalMsg =
      donorMessage.trim() || `Mendukung penuh program ${activeCampaign.title}.`;

    const certCode = `NW.${new Date().getFullYear()}.${Math.floor(1000 + Math.random() * 9000)}`;

    onSubmitDonation({
      campaignId: activeCampaign.id,
      amount: effectiveAmount,
      donor: {
        id: `d-${Date.now()}`,
        name: finalName,
        city: finalCity,
        amount: effectiveAmount,
        campaignTitle: activeCampaign.title,
        message: finalMsg,
        timeAgo: 'Baru saja',
        badge: effectiveAmount >= 250000 ? 'Penjaga Rimba' : 'Sahabat Alam'
      }
    });

    setCertificate({
      code: certCode,
      name: finalName,
      city: finalCity,
      amount: effectiveAmount,
      campaignTitle: activeCampaign.title,
      impactText: `${impactCount} ${activeCampaign.impactUnit}`,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    });

    setDonorName('');
    setDonorCity('');
    setDonorMessage('');
  };

  return (
    <section id="section-donasi" className="donation-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EXPO_EASE }}
          className="section-header-block"
        >
          <span className="section-eyebrow">
            <HeartHandshake size={16} />
            HUB AKSI NYATA & RELAWAN
          </span>
          <h2 className="section-heading">Dukungan Aksi Nyata Pemulihan Lingkungan</h2>
        </motion.div>

        {/* Pilihan Kampanye Isu dengan Shared Layout Indicator */}
        <div className="campaign-selector-grid">
          {campaigns.map((camp, idx) => {
            const pct = Math.min(100, Math.round((camp.collectedAmount / camp.targetAmount) * 100));
            const isSelected = camp.id === activeCampaign.id;

            return (
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: idx * 0.05, ease: EXPO_EASE }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => onSelectCampaign(camp.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectCampaign(camp.id);
                }}
                className={`campaign-card ${isSelected ? 'selected' : ''}`}
              >
                <div className="campaign-card-media">
                  <img src={camp.image} alt={camp.title} loading="lazy" />
                  <span className="campaign-urgent-pill">{camp.urgentTag}</span>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="campaign-selected-check"
                      >
                        <CheckCircle2 size={15} /> Aktif
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="campaign-card-body">
                  <span className="campaign-location">
                    <MapPin size={13} /> {camp.location}
                  </span>
                  <h3 className="campaign-title">{camp.title}</h3>
                  <p className="campaign-desc">{camp.description}</p>

                  <div className="campaign-progress-wrap">
                    <div className="campaign-progress-labels">
                      <strong>{formatIDR(camp.collectedAmount)}</strong>
                      <span>{pct}%</span>
                    </div>
                    <div className="campaign-progress-bar">
                      <motion.div
                        className="campaign-progress-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: EXPO_EASE }}
                      />
                    </div>
                    <div className="campaign-meta-row">
                      <span>
                        <Users size={13} /> {camp.donorsCount.toLocaleString('id-ID')} Donatur
                      </span>
                      <span>{camp.partnerOrg}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Form Donasi + Dinding Donatur */}
        <div className="donation-workspace-grid">
          <motion.form
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EXPO_EASE }}
            className="donation-form-card"
            onSubmit={handleSubmit}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCampaign.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="donation-active-banner"
              >
                <span className="active-banner-label">PROGRAM DIPILIH</span>
                <h4>{activeCampaign.title}</h4>
                <p>{activeCampaign.location}</p>
              </motion.div>
            </AnimatePresence>

            <div className="frequency-tabs">
              {[
                { id: 'once', label: 'Donasi Sekali' },
                { id: 'monthly', label: 'Rutin Bulanan' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`freq-tab ${frequency === tab.id ? 'active' : ''}`}
                  onClick={() => setFrequency(tab.id)}
                >
                  {frequency === tab.id && (
                    <motion.span
                      layoutId="freqActiveBg"
                      className="motion-pill-bg dark"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="motion-pill-label">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="amount-presets-grid">
              {PRESET_AMOUNTS.map((preset) => {
                const isActive = !customAmount && amount === preset;
                return (
                  <motion.button
                    key={preset}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setAmount(preset);
                      setCustomAmount('');
                    }}
                    className={`amount-preset-btn ${isActive ? 'active' : ''}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="amountActiveBg"
                        className="motion-pill-bg green"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="motion-pill-label">{formatIDR(preset)}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="custom-amount-input-wrap">
              <span className="currency-prefix">Rp</span>
              <input
                type="number"
                min="10000"
                step="5000"
                placeholder="Nominal lain (min. 10.000)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="custom-amount-input"
              />
            </div>

            {/* Box Dampak dengan Animasi Angka Spring */}
            <motion.div layout className="impact-simulator-box">
              <motion.div
                key={impactCount}
                initial={{ rotate: -15, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 16 }}
              >
                <Trees size={24} className="impact-icon" />
              </motion.div>
              <div>
                <span className="impact-eyebrow">ESTIMASI DAMPAK NYATA</span>
                <h5>
                  Setara dengan{' '}
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={`${activeCampaign.id}-${impactCount}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28 }}
                      className="highlight-impact"
                    >
                      {impactCount} {activeCampaign.impactUnit}
                    </motion.span>
                  </AnimatePresence>
                </h5>
              </div>
            </motion.div>

            {/* Metode Pembayaran */}
            <div className="payment-methods-row">
              {PAYMENT_METHODS.map((pm) => {
                const IconComponent = pm.icon;
                return (
                  <motion.button
                    key={pm.id}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`payment-chip ${paymentMethod === pm.id ? 'active' : ''}`}
                  >
                    <IconComponent size={17} />
                    <span>{pm.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="donor-inputs-grid">
              <input
                type="text"
                placeholder="Nama Anda (opsional)"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="text-input"
              />
              <input
                type="text"
                placeholder="Kota"
                value={donorCity}
                onChange={(e) => setDonorCity(e.target.value)}
                className="text-input"
              />
            </div>

            <input
              type="text"
              placeholder="Pesan singkat dukungan..."
              value={donorMessage}
              onChange={(e) => setDonorMessage(e.target.value)}
              className="text-input"
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="submit-donation-btn"
            >
              <HeartHandshake size={18} />
              <span>Donasi {formatIDR(effectiveAmount)}</span>
              <ArrowRight size={17} />
            </motion.button>
          </motion.form>

          {/* Kanan: Sertifikat & Dinding Donatur */}
          <div className="donation-sidebar">
            <AnimatePresence>
              {certificate && (
                <motion.div
                  key={certificate.code}
                  initial={{ opacity: 0, scale: 0.88, y: -16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="certificate-card"
                  role="status"
                >
                  <div className="certificate-top-badge">
                    <Award size={20} />
                    <span>SERTIFIKAT KONSERVASI</span>
                  </div>
                  <p className="cert-code">ID: {certificate.code}</p>
                  <h4 className="cert-recipient">{certificate.name}</h4>
                  <p className="cert-body">
                    Donasi <strong>{formatIDR(certificate.amount)}</strong> untuk{' '}
                    <strong>{certificate.campaignTitle}</strong>
                  </p>
                  <div className="cert-impact-badge">Dampak: {certificate.impactText}</div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EXPO_EASE }}
              className="donor-wall-card"
            >
              <div className="donor-wall-header">
                <h3>Dukungan Terbaru</h3>
                <span className="live-indicator">
                  <span className="live-dot" /> Aktif
                </span>
              </div>

              <div className="donor-feed-list">
                <AnimatePresence initial={false}>
                  {donors.map((d) => (
                    <motion.div
                      key={d.id}
                      layout
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.45, ease: EXPO_EASE }}
                      className="donor-feed-item"
                    >
                      <div className="donor-avatar">{d.name.charAt(0).toUpperCase()}</div>
                      <div className="donor-feed-content">
                        <div className="donor-feed-top">
                          <strong>{d.name}</strong>
                          <span className="donor-badge">{formatIDR(d.amount)}</span>
                        </div>
                        <span className="donor-meta">
                          {d.city} • {d.timeAgo}
                        </span>
                        <p className="donor-quote">“{d.message}”</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
