import React, { useState } from 'react';

/**
 * 1. ORIGAMI BADAK JAWA (Teal / Sage Green Low-Poly Rhinoceros - Matches Row 2 Left)
 */
export function OrigamiBadakSVG() {
  return (
    <svg viewBox="0 0 220 150" className="origami-svg" aria-hidden="true">
      <ellipse cx="112" cy="138" rx="68" ry="6" fill="rgba(19, 42, 31, 0.16)" className="origami-ground-shadow" />
      <g className="origami-walk-body">
        <g className="origami-leg-back">
          <polygon points="75,92 92,92 82,132 70,132" fill="#2c5e58" />
          <polygon points="152,90 168,90 162,132 150,132" fill="#2c5e58" />
        </g>
        <polygon points="68,42 122,45 96,95 62,88" fill="#84c5b8" />
        <polygon points="122,45 166,52 142,95 96,95" fill="#5da397" />
        <polygon points="96,95 142,95 122,68" fill="#3f7d73" />
        <polygon points="122,45 142,95 166,52" fill="#72b6a9" />
        <polygon points="166,52 192,62 176,96 142,95" fill="#89c9bc" />
        <polygon points="192,62 202,92 195,98 190,82" fill="#3b6e66" />
        <polygon points="56,48 68,42 82,92 52,86" fill="#9ad5c9" />
        <polygon points="68,42 96,44 82,92" fill="#74b8ab" />
        <g className="origami-leg-front">
          <polygon points="64,88 86,90 76,126 62,132" fill="#4d8c82" />
          <polygon points="62,132 76,126 72,133 56,133" fill="#22443f" />
          <polygon points="156,88 182,88 172,126 160,132" fill="#5b9c91" />
          <polygon points="160,132 172,126 168,133 154,133" fill="#22443f" />
        </g>
        <g className="origami-head-group">
          <polygon points="36,56 56,48 56,88 26,86" fill="#4f8e84" />
          <polygon points="26,86 56,88 42,96 18,88" fill="#356961" />
          <polygon points="18,88 36,56 26,86" fill="#63a499" />
          <polygon points="18,88 12,64 26,78" fill="#1e3f3a" />
          <polygon points="28,74 23,58 34,70" fill="#2c5851" />
          <polygon points="52,48 58,36 62,48" fill="#356961" />
          <circle cx="42" cy="68" r="4.2" fill="#ffffff" />
          <circle cx="41.5" cy="68" r="2.5" fill="#111827" />
        </g>
      </g>
    </svg>
  );
}

/**
 * 2. ORIGAMI BANTENG JAWA / ANOA (Slate-Teal Low-Poly Bull with Horns - Matches Row 1 Right)
 */
export function OrigamiBantengSVG() {
  return (
    <svg viewBox="0 0 230 160" className="origami-svg" aria-hidden="true">
      <ellipse cx="122" cy="148" rx="66" ry="6" fill="rgba(19, 42, 31, 0.16)" className="origami-ground-shadow" />
      <g className="origami-walk-body">
        <g className="origami-leg-back">
          <polygon points="102,94 122,94 108,140 98,142" fill="#283c42" />
          <polygon points="168,82 186,82 174,132 166,132" fill="#283c42" />
        </g>
        <polygon points="58,36 94,16 144,32 104,68" fill="#88c4c8" />
        <polygon points="104,68 144,32 152,88 106,104" fill="#5e878e" />
        <polygon points="144,32 182,36 168,86 152,88" fill="#466870" />
        <polygon points="182,36 198,42 192,82 168,86" fill="#52767e" />
        <polygon points="198,42 214,68 206,72" fill="#2c444a" />
        <polygon points="214,68 218,86 212,92 208,84" fill="#1e2f34" />
        <g className="origami-leg-front">
          <polygon points="106,104 134,88 144,144 136,146" fill="#466870" />
          <polygon points="182,78 198,78 196,136 188,136" fill="#375359" />
        </g>
        <g className="origami-head-group">
          <polygon points="58,36 104,68 92,102 68,88" fill="#77b5b9" />
          <polygon points="46,48 58,36 74,78 48,74" fill="#4c737a" />
          <polygon points="48,74 74,78 68,94 52,92" fill="#63969c" />
          <polygon points="48,54 12,66 36,72 52,64" fill="#26292e" />
          <polygon points="56,64 20,82 44,84 64,72" fill="#383c42" />
          <circle cx="62" cy="64" r="3.4" fill="#ffffff" />
          <circle cx="61.5" cy="64" r="2.2" fill="#111827" />
        </g>
      </g>
    </svg>
  );
}

/**
 * 3. ORIGAMI ORANGUTAN (Warm Russet / Taupe Low-Poly Primate - Row 1 Left)
 */
export function OrigamiOrangutanSVG() {
  return (
    <svg viewBox="0 0 180 175" className="origami-svg" aria-hidden="true">
      <ellipse cx="92" cy="162" rx="58" ry="6" fill="rgba(19, 42, 31, 0.16)" className="origami-ground-shadow" />
      <g className="origami-walk-body">
        <g className="origami-leg-back">
          <polygon points="82,96 104,94 94,138 78,144" fill="#685446" />
          <polygon points="78,144 94,138 106,148 84,150" fill="#3e3027" />
        </g>
        <polygon points="62,24 98,64 74,98 48,74" fill="#c8b09b" />
        <polygon points="98,64 134,74 114,116 74,98" fill="#a88c75" />
        <polygon points="134,74 148,96 138,128 114,116" fill="#8d725d" />
        <polygon points="114,116 138,128 134,152 112,142" fill="#685241" />
        <polygon points="112,142 134,152 116,154 102,148" fill="#46362b" />
        <g className="origami-arm-front">
          <polygon points="48,74 78,52 74,104 38,118" fill="#d9c3b0" />
          <polygon points="38,118 74,104 62,138 32,136" fill="#967b66" />
          <polygon points="32,136 62,138 72,148 46,158" fill="#5e493b" />
        </g>
        <g className="origami-head-group">
          <polygon points="46,18 62,10 68,36 44,44" fill="#7c6352" />
          <polygon points="32,28 46,18 44,44 36,48" fill="#523f31" />
          <polygon points="46,18 68,36 78,52 48,74" fill="#b79d87" />
          <circle cx="48" cy="30" r="3.2" fill="#ffffff" />
          <circle cx="47.5" cy="30" r="2" fill="#111827" />
        </g>
      </g>
    </svg>
  );
}

/**
 * 4. ORIGAMI HARIMAU SUMATERA (Vibrant Orange / Amber Low-Poly Predator - Row 3 Left)
 */
export function OrigamiHarimauSVG() {
  return (
    <svg viewBox="0 0 230 165" className="origami-svg" aria-hidden="true">
      <ellipse cx="110" cy="152" rx="66" ry="6" fill="rgba(19, 42, 31, 0.16)" className="origami-ground-shadow" />
      <g className="origami-walk-body">
        <g className="origami-leg-front">
          <polygon points="56,96 76,94 68,146 62,148" fill="#9c2b1b" />
          <polygon points="52,96 68,108 64,148 58,148" fill="#6b190e" />
        </g>
        <g className="origami-leg-back">
          <polygon points="134,88 156,94 144,146 136,148" fill="#c2410c" />
          <polygon points="144,104 156,94 148,148 140,148" fill="#7c2d12" />
        </g>
        <polygon points="46,56 72,72 88,68 62,44" fill="#fb923c" />
        <polygon points="72,72 118,66 94,96 52,96" fill="#f97316" />
        <polygon points="94,96 118,66 148,78 122,94" fill="#ea580c" />
        <polygon points="52,96 94,96 76,108" fill="#fed7aa" />
        <polygon points="118,66 156,68 148,96 122,94" fill="#f97316" />
        <polygon points="84,68 92,67 86,86" fill="#431407" />
        <polygon points="108,67 116,66 110,88" fill="#431407" />
        <polygon points="132,68 140,70 134,90" fill="#431407" />
        <g className="origami-tail-group">
          <polygon points="156,68 178,96 156,98 148,78" fill="#fb923c" />
          <polygon points="178,96 196,126 168,132 156,98" fill="#ea580c" />
          <polygon points="196,126 216,138 192,148 168,132" fill="#9a3412" />
        </g>
        <g className="origami-head-group">
          <polygon points="24,34 52,24 46,56 16,52" fill="#ea580c" />
          <polygon points="16,52 46,56 38,72 12,64" fill="#c2410c" />
          <polygon points="12,64 38,72 26,82 6,68" fill="#9a3412" />
          <polygon points="38,72 62,64 54,84 26,82" fill="#fed7aa" />
          <polygon points="34,24 44,12 48,22" fill="#7c2d12" />
          <circle cx="28" cy="54" r="3.2" fill="#ffffff" />
          <circle cx="28" cy="54" r="2" fill="#111827" />
        </g>
      </g>
    </svg>
  );
}

/**
 * 5. ORIGAMI PESUT MAHAKAM (Cyan / Aquatic Blue Faceted Dolphin - Row 4 Right)
 */
export function OrigamiPesutSVG() {
  return (
    <svg viewBox="0 0 230 160" className="origami-svg" aria-hidden="true">
      <ellipse cx="114" cy="148" rx="62" ry="5.5" fill="rgba(19, 42, 31, 0.15)" className="origami-ground-shadow" />
      <g className="origami-swim-body">
        <polygon points="98,28 132,10 124,38" fill="#06b6d4" />
        <polygon points="78,74 92,76 86,98" fill="#22d3ee" />
        <polygon points="24,62 66,34 98,28 74,64" fill="#38bdf8" />
        <polygon points="66,34 98,28 124,38 74,64" fill="#0ea5e9" />
        <polygon points="74,64 124,38 158,58 118,74" fill="#0284c7" />
        <polygon points="24,62 74,64 118,74 56,76" fill="#67e8f9" />
        <polygon points="124,38 168,56 184,82 148,72" fill="#0369a1" />
        <polygon points="148,72 184,82 196,112 174,106" fill="#0284c7" />
        <polygon points="104,64 134,68 138,104 112,82" fill="#0e7490" />
        <g className="origami-tail-group">
          <polygon points="184,106 196,112 216,136 192,124" fill="#06b6d4" />
          <polygon points="174,106 192,124 166,120" fill="#22d3ee" />
        </g>
        <polygon points="12,64 24,62 36,72 18,70" fill="#7dd3fc" />
        <circle cx="42" cy="60" r="4" fill="#ffffff" />
        <circle cx="42" cy="60" r="2.4" fill="#0f172a" />
      </g>
    </svg>
  );
}

/**
 * 6. ORIGAMI GAJAH SUMATERA (Soft Rose / Lavender Low-Poly Elephant - Row 2 Right)
 */
export function OrigamiGajahSVG() {
  return (
    <svg viewBox="0 0 210 160" className="origami-svg" aria-hidden="true">
      <ellipse cx="116" cy="146" rx="64" ry="6" fill="rgba(19, 42, 31, 0.16)" className="origami-ground-shadow" />
      <g className="origami-walk-body">
        <g className="origami-leg-back">
          <polygon points="116,96 138,96 136,134 116,134" fill="#b88ca8" />
          <polygon points="154,88 176,88 178,136 156,136" fill="#c79ab7" />
        </g>
        <polygon points="78,24 134,26 148,88 86,88" fill="#e8c5dc" />
        <polygon points="134,26 178,56 148,88" fill="#d5a9c6" />
        <polygon points="148,88 178,56 184,96 154,96" fill="#c291b2" />
        <polygon points="178,56 192,72 188,76" fill="#e8c5dc" />
        <g className="origami-leg-front">
          <polygon points="82,86 116,86 114,138 84,138" fill="#edd0e3" />
          <polygon points="74,86 86,86 84,134 74,134" fill="#d5a9c6" />
        </g>
        <g className="origami-head-group">
          <polygon points="52,44 68,56 54,88 38,84" fill="#dfbad2" />
          <polygon points="38,84 54,88 38,100 24,92" fill="#cfa0be" />
          <polygon points="24,92 38,100 22,68 14,68" fill="#e8c5dc" />
          <polygon points="14,68 26,68 18,60 8,62" fill="#f5e1ee" />
          <polygon points="62,24 98,22 96,74 56,68" fill="#f3dceb" />
          <polygon points="56,68 96,74 78,88 54,82" fill="#e2bcd5" />
          <polygon points="98,22 132,36 126,74 96,74" fill="#f8eaf3" />
          <polygon points="96,34 108,52 96,74" fill="#c79ab7" />
          <circle cx="74" cy="48" r="4" fill="#ffffff" />
          <circle cx="74" cy="48" r="2.4" fill="#111827" />
          <circle cx="80" cy="58" r="3.5" fill="#f472b6" opacity="0.65" />
        </g>
      </g>
    </svg>
  );
}

/**
 * 7. ORIGAMI BURUNG ENDEMIK (Geometric Owl/Bird - Row 3 Right)
 */
export function OrigamiBurungSVG() {
  return (
    <svg viewBox="0 0 170 170" className="origami-svg" aria-hidden="true">
      <ellipse cx="85" cy="156" rx="52" ry="5.5" fill="rgba(19, 42, 31, 0.16)" className="origami-ground-shadow" />
      <g className="origami-head-group">
        <polygon points="22,30 85,32 52,46" fill="#84a96b" />
        <polygon points="85,32 148,30 118,46" fill="#6b8f54" />
        <polygon points="42,38 85,32 85,78 38,76" fill="#7ca362" />
        <polygon points="85,32 128,38 132,76 85,78" fill="#5e8248" />
        <g className="origami-wing-flap">
          <polygon points="38,76 54,92 46,136 26,104" fill="#6d9156" />
          <polygon points="132,76 116,92 124,136 144,104" fill="#53733e" />
        </g>
        <polygon points="54,78 85,78 85,134 46,118" fill="#d9f99d" />
        <polygon points="85,78 116,78 124,118 85,134" fill="#bef264" />
        <polygon points="46,118 85,134 124,118 85,146" fill="#ecfccb" />
        <polygon points="46,118 85,146 58,144" fill="#365314" />
        <polygon points="124,118 85,146 112,144" fill="#1a2e05" />
        <circle cx="62" cy="58" r="9.5" fill="#ffffff" />
        <circle cx="62" cy="58" r="6" fill="#111827" />
        <circle cx="108" cy="58" r="9.5" fill="#ffffff" />
        <circle cx="108" cy="58" r="6" fill="#111827" />
        <polygon points="75,62 85,56 85,86" fill="#fde047" />
        <polygon points="95,62 85,56 85,86" fill="#eab308" />
      </g>
    </svg>
  );
}

/**
 * 8. ORIGAMI BURUNG TERBANG (Jalak Bali & Cenderawasih Soaring with Flapping Origami Wings)
 */
export function OrigamiBurungTerbangSVG() {
  return (
    <svg viewBox="0 0 220 155" className="origami-svg" aria-hidden="true">
      <ellipse cx="110" cy="144" rx="48" ry="4.5" fill="rgba(19, 42, 31, 0.12)" className="origami-ground-shadow" />
      <g className="origami-swim-body">
        <g className="origami-wing-flap">
          <polygon points="86,62 128,12 152,48 118,68" fill="#38bdf8" />
          <polygon points="128,12 166,22 152,48" fill="#0284c7" />
        </g>
        <polygon points="42,68 86,56 124,68 78,86" fill="#f8fafc" />
        <polygon points="78,86 124,68 162,74 118,92" fill="#e2e8f0" />
        <polygon points="124,68 192,58 176,84 152,78" fill="#f59e0b" />
        <polygon points="152,78 206,76 184,96 146,86" fill="#d97706" />
        <polygon points="26,64 48,48 64,62 42,74" fill="#ffffff" />
        <polygon points="48,48 74,36 64,62" fill="#bae6fd" />
        <polygon points="10,68 26,60 28,72" fill="#facc15" />
        <polygon points="32,58 46,56 44,66 30,66" fill="#0ea5e9" />
        <circle cx="36" cy="61" r="2.5" fill="#0f172a" />
        <g className="origami-wing-flap">
          <polygon points="74,68 114,16 144,56 106,82" fill="#ffffff" />
          <polygon points="114,16 154,28 144,56" fill="#7dd3fc" />
          <polygon points="144,56 154,28 172,44" fill="#0369a1" />
        </g>
      </g>
    </svg>
  );
}

/**
 * 9. ORIGAMI BIAWAK KOMODO (Low-Poly Olive-Gold & Bronze Komodo Dragon Walking)
 */
export function OrigamiKomodoSVG() {
  return (
    <svg viewBox="0 0 245 135" className="origami-svg" aria-hidden="true">
      <ellipse cx="122" cy="122" rx="78" ry="5.5" fill="rgba(19, 42, 31, 0.16)" className="origami-ground-shadow" />
      <g className="origami-walk-body">
        <g className="origami-leg-back">
          <polygon points="68,84 82,84 74,116 62,116" fill="#4d5936" />
          <polygon points="134,82 148,82 144,116 132,116" fill="#4d5936" />
        </g>
        <polygon points="56,56 106,50 96,86 52,82" fill="#84965b" />
        <polygon points="106,50 156,56 142,88 96,86" fill="#6b7c45" />
        <polygon points="52,82 96,86 142,88 76,94" fill="#a3b577" />
        <g className="origami-tail-group">
          <polygon points="156,56 196,72 178,92 142,88" fill="#596838" />
          <polygon points="196,72 238,88 216,96 178,92" fill="#434f29" />
        </g>
        <g className="origami-leg-front">
          <polygon points="62,80 82,82 72,118 56,118" fill="#6b7c45" />
          <polygon points="138,80 158,82 152,118 136,118" fill="#596838" />
        </g>
        <g className="origami-head-group">
          <polygon points="18,64 56,52 54,82 22,78" fill="#95a868" />
          <polygon points="22,78 54,82 44,88 18,82" fill="#596838" />
          <polygon points="18,74 4,70 10,75 4,80 18,77" fill="#ef4444" />
          <circle cx="36" cy="64" r="3.2" fill="#fef08a" />
          <circle cx="36" cy="64" r="2" fill="#111827" />
        </g>
      </g>
    </svg>
  );
}

/**
 * 10. ORIGAMI PAUS NUSANTARA (Sky Blue & Pleated White Belly Low-Poly Whale - Matches Row 5 Left)
 */
export function OrigamiPausSVG() {
  return (
    <svg viewBox="0 0 235 150" className="origami-svg" aria-hidden="true">
      <ellipse cx="114" cy="138" rx="68" ry="5.5" fill="rgba(19, 42, 31, 0.14)" className="origami-ground-shadow" />
      <g className="origami-swim-body">
        <polygon points="32,42 106,68 86,88 18,76" fill="#38bdf8" />
        <polygon points="18,76 32,42 26,76" fill="#0284c7" />
        <polygon points="106,68 168,72 142,98 86,88" fill="#0ea5e9" />
        <polygon points="142,98 168,72 194,68 168,112" fill="#0369a1" />
        <polygon points="26,76 86,88 142,98 114,118 64,116" fill="#e0f2fe" />
        <polyline points="34,82 68,112 112,112" fill="none" stroke="#0284c7" strokeWidth="1.6" opacity="0.55" />
        <polyline points="46,84 82,114 126,108" fill="none" stroke="#0284c7" strokeWidth="1.6" opacity="0.55" />
        <g className="origami-tail-group">
          <polygon points="186,68 202,42 214,48 194,68" fill="#38bdf8" />
          <polygon points="202,42 224,50 210,54" fill="#7dd3fc" />
        </g>
        <polygon points="94,82 118,86 146,124 114,104" fill="#0284c7" />
        <circle cx="52" cy="64" r="4.2" fill="#ffffff" />
        <circle cx="52" cy="64" r="2.6" fill="#0f172a" />
      </g>
    </svg>
  );
}

/**
 * 11. ORIGAMI PENYU NUSANTARA (Geometric Terracotta/Olive Shell - Row 5 Right)
 */
export function OrigamiPenyuSVG() {
  return (
    <svg viewBox="0 0 210 165" className="origami-svg" aria-hidden="true">
      <ellipse cx="106" cy="150" rx="64" ry="5.5" fill="rgba(19, 42, 31, 0.16)" className="origami-ground-shadow" />
      <g className="origami-swim-body">
        <polygon points="34,54 58,64 42,88 26,76" fill="#e7d8b5" />
        <polygon points="42,96 72,96 68,122 38,118" fill="#d6c39a" />
        <polygon points="56,114 82,118 76,128 52,126" fill="#78716c" />
        <circle cx="52" cy="118" r="3" fill="#111827" />
        <polygon points="98,118 148,122 184,136 122,144" fill="#e7d8b5" />
        <circle cx="132" cy="132" r="3.5" fill="#92400e" opacity="0.6" />
        <circle cx="148" cy="134" r="2.8" fill="#92400e" opacity="0.6" />
        <circle cx="118" cy="128" r="3" fill="#92400e" opacity="0.6" />
        <polygon points="56,64 108,52 104,78 46,92" fill="#d97757" />
        <polygon points="108,52 152,66 138,88 104,78" fill="#b85638" />
        <polygon points="46,92 104,78 138,88 86,118" fill="#9a3c22" />
        <polygon points="138,88 152,66 164,98 134,118" fill="#7c2d12" />
        <polygon points="86,118 138,88 134,118" fill="#853119" />
      </g>
    </svg>
  );
}

/**
 * 12. ORIGAMI HIU KARANG NUSANTARA (Lavender-Grey Faceted Reef Shark - Row 4 Left)
 */
export function OrigamiHiuSVG() {
  return (
    <svg viewBox="0 0 240 140" className="origami-svg" aria-hidden="true">
      <ellipse cx="120" cy="128" rx="64" ry="5.5" fill="rgba(19, 42, 31, 0.15)" className="origami-ground-shadow" />
      <g className="origami-swim-body">
        <polygon points="98,60 128,16 142,62" fill="#787a96" />
        <polygon points="128,16 142,62 134,62" fill="#585a74" />
        <polygon points="76,86 102,88 92,118 70,102" fill="#545670" />
        <polygon points="16,84 68,54 112,56 76,86" fill="#a4a6c2" />
        <polygon points="68,54 112,56 156,66 122,86" fill="#8e90ac" />
        <polygon points="112,56 156,66 182,78 148,88" fill="#747692" />
        <polygon points="16,84 76,86 122,86 64,104" fill="#bec0dc" />
        <polygon points="76,86 122,86 158,94 116,104" fill="#9a9cb8" />
        <polygon points="122,86 156,66 182,78 158,94" fill="#686a86" />
        <polygon points="16,84 64,104 48,106 24,96" fill="#888aa6" />
        <path
          d="M 28,88 L 32,84 L 36,88 L 40,84 L 44,88 L 48,84 L 52,88 L 56,84 L 60,88"
          stroke="#ffffff"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g className="origami-tail-group">
          <polygon points="182,78 202,84 194,102 168,96" fill="#5e607a" />
          <polygon points="202,84 232,54 214,92 230,126 198,102" fill="#464860" />
          <polygon points="214,92 232,54 220,86" fill="#6e708c" />
        </g>
        <circle cx="48" cy="74" r="3.8" fill="#ffffff" />
        <circle cx="47.5" cy="74" r="2.2" fill="#0f172a" />
        <circle cx="56" cy="84" r="4.2" fill="#f472b6" opacity="0.65" />
      </g>
    </svg>
  );
}

// 19 Roaming Origami Fauna instances traversing continuously across the entire site (Wrap-around loop)
const ROAMING_ORIGAMI_FAUNA = [
  // SESI 1: HERO SECTION & BERANDA (Langit, Savana, Perairan)
  {
    id: 'roam-hero-jalak',
    name: 'Origami Jalak Bali Terbang',
    Component: OrigamiBurungTerbangSVG,
    mode: 'fly',
    pathClass: 'path-cross-right-swoop',
    topPct: 4.8,
    duration: 25,
    delay: -4,
    size: 116
  },
  {
    id: 'roam-hero-cenderawasih',
    name: 'Origami Cenderawasih Emas',
    Component: OrigamiBurungTerbangSVG,
    mode: 'fly',
    pathClass: 'path-cross-left-wave',
    topPct: 9.8,
    duration: 29,
    delay: -14,
    size: 122
  },
  {
    id: 'roam-hero-badak',
    name: 'Origami Badak Jawa',
    Component: OrigamiBadakSVG,
    mode: 'walk',
    pathClass: 'path-cross-right-up',
    topPct: 15.5,
    duration: 36,
    delay: -9,
    size: 142
  },
  {
    id: 'roam-hero-gajah',
    name: 'Origami Gajah Sumatera',
    Component: OrigamiGajahSVG,
    mode: 'walk',
    pathClass: 'path-cross-left-down',
    topPct: 20.8,
    duration: 38,
    delay: -20,
    size: 136
  },
  {
    id: 'roam-hero-harimau',
    name: 'Origami Harimau Sumatera',
    Component: OrigamiHarimauSVG,
    mode: 'walk',
    pathClass: 'path-cross-right-straight',
    topPct: 25.4,
    duration: 33,
    delay: -16,
    size: 138
  },
  {
    id: 'roam-hero-pesut',
    name: 'Origami Pesut Mahakam',
    Component: OrigamiPesutSVG,
    mode: 'swim',
    pathClass: 'path-cross-left-wave',
    topPct: 29.2,
    duration: 31,
    delay: -7,
    size: 134
  },

  // SESI 2: FLORA & FAUNA FAN DECK (Hutan Tropis & Fauna Endemik)
  {
    id: 'roam-deck-orangutan',
    name: 'Origami Orangutan Kalimantan',
    Component: OrigamiOrangutanSVG,
    mode: 'walk',
    pathClass: 'path-cross-right-down',
    topPct: 34.8,
    duration: 37,
    delay: -12,
    size: 132
  },
  {
    id: 'roam-deck-celepuk',
    name: 'Origami Burung Celepuk',
    Component: OrigamiBurungSVG,
    mode: 'fly',
    pathClass: 'path-cross-left-up',
    topPct: 39.5,
    duration: 27,
    delay: -5,
    size: 112
  },
  {
    id: 'roam-deck-banteng',
    name: 'Origami Banteng Jawa',
    Component: OrigamiBantengSVG,
    mode: 'walk',
    pathClass: 'path-cross-right-up',
    topPct: 44.5,
    duration: 35,
    delay: -22,
    size: 140
  },
  {
    id: 'roam-deck-hiu',
    name: 'Origami Hiu Karang Nusantara',
    Component: OrigamiHiuSVG,
    mode: 'swim',
    pathClass: 'path-cross-left-wave',
    topPct: 49.8,
    duration: 30,
    delay: -15,
    size: 138
  },
  {
    id: 'roam-deck-penyu',
    name: 'Origami Penyu Sisik Nusantara',
    Component: OrigamiPenyuSVG,
    mode: 'swim',
    pathClass: 'path-cross-right-down',
    topPct: 54.0,
    duration: 42,
    delay: -8,
    size: 126
  },

  // SESI 3: JURNAL TAMAN NASIONAL 3D BOOK (Kawasan Savana & Laut)
  {
    id: 'roam-book-cenderawasih',
    name: 'Origami Cenderawasih Dirgantara',
    Component: OrigamiBurungTerbangSVG,
    mode: 'fly',
    pathClass: 'path-cross-right-swoop',
    topPct: 59.8,
    duration: 24,
    delay: -11,
    size: 120
  },
  {
    id: 'roam-book-komodo',
    name: 'Origami Biawak Komodo',
    Component: OrigamiKomodoSVG,
    mode: 'walk',
    pathClass: 'path-cross-left-straight',
    topPct: 65.8,
    duration: 39,
    delay: -18,
    size: 146
  },
  {
    id: 'roam-book-paus',
    name: 'Origami Paus Biru Nusantara',
    Component: OrigamiPausSVG,
    mode: 'swim',
    pathClass: 'path-cross-right-wave',
    topPct: 71.5,
    duration: 44,
    delay: -25,
    size: 154
  },
  {
    id: 'roam-book-badak',
    name: 'Origami Badak Ujung Kulon',
    Component: OrigamiBadakSVG,
    mode: 'walk',
    pathClass: 'path-cross-left-up',
    topPct: 76.5,
    duration: 36,
    delay: -6,
    size: 136
  },

  // SESI 4: DONASI AKSI & FOOTER (Aksi Konservasi Seluruh Nusantara)
  {
    id: 'roam-donate-gajah',
    name: 'Origami Gajah Sahabat Rimba',
    Component: OrigamiGajahSVG,
    mode: 'walk',
    pathClass: 'path-cross-right-up',
    topPct: 83.2,
    duration: 37,
    delay: -14,
    size: 138
  },
  {
    id: 'roam-donate-jalak',
    name: 'Origami Jalak Bali Lestari',
    Component: OrigamiBurungTerbangSVG,
    mode: 'fly',
    pathClass: 'path-cross-left-swoop',
    topPct: 88.5,
    duration: 25,
    delay: -3,
    size: 116
  },
  {
    id: 'roam-donate-harimau',
    name: 'Origami Harimau Penjaga Nusantara',
    Component: OrigamiHarimauSVG,
    mode: 'walk',
    pathClass: 'path-cross-right-down',
    topPct: 93.4,
    duration: 34,
    delay: -17,
    size: 136
  },
  {
    id: 'roam-donate-penyu',
    name: 'Origami Penyu Samudra',
    Component: OrigamiPenyuSVG,
    mode: 'swim',
    pathClass: 'path-cross-left-wave',
    topPct: 97.2,
    duration: 41,
    delay: -23,
    size: 128
  }
];

function RoamingOrigamiCreature({ item }) {
  const [isJumping, setIsJumping] = useState(false);
  const { Component } = item;

  const handleClick = (e) => {
    e.stopPropagation();
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 650);
  };

  return (
    <div
      className={`origami-roamer-container ${item.pathClass} ${
        isJumping ? 'origami-jumping' : ''
      }`}
      style={{
        top: `${item.topPct}%`,
        '--roam-duration': `${item.duration}s`,
        '--roam-delay': `${item.delay}s`,
        width: `${item.size}px`
      }}
      onClick={handleClick}
      title={`${item.name} (Klik untuk melompat)`}
    >
      <div className={`origami-motion-gait gait-${item.mode}`}>
        <Component />
      </div>
      <span className="origami-tooltip-tag">{item.name}</span>
    </div>
  );
}

export default function OrigamiFaunaLayer() {
  return (
    <div className="origami-fauna-layer" aria-hidden="true">
      {ROAMING_ORIGAMI_FAUNA.map((item) => (
        <RoamingOrigamiCreature key={item.id} item={item} />
      ))}
    </div>
  );
}
