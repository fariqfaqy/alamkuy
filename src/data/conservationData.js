// Data Terverifikasi Isu Lingkungan Global & Portal Edukasi Ekologi (IPCC, UNEP, IUCN Red List, UNESCO)
// Struktur konten terdistribusi tanpa duplikasi tema, data, maupun visual antar halaman.
// Bebas tanda baca em-dash atau en-dash.

export const HERO_SLIDES = [
  {
    id: 'krisis-suhu-kutub',
    number: '01',
    region: 'Atmosfer Bumi & Zona Gletser Kutub',
    title: 'DARURAT SUHU GLOBAL',
    subtitle: 'Pemanasan Ekstrem & Pencairan Es Kutub',
    iucnBadge: 'Darurat Iklim PBB',
    populationStat: '424.8 ppm CO2',
    areaStat: '+1.28°C Anomali Suhu',
    unesco: 'Laporan IPCC WGI 2024',
    description:
      'Akumulasi gas rumah kaca dari pembakaran bahan bakar fosil memicu rekor suhu terpanas, percepatan pencairan es benua, dan gelombang panas ekstrem.',
    image:
      'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1920&h=1080&q=85',
    cardImage:
      'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=900&h=1200&q=80',
    bgPosition: 'center 42%',
    accentColor: '#ef4444',
    campaignId: 'camp-iklim-pohon',
    highlights: [
      'Konsentrasi CO2 di atmosfer mencapai level tertinggi dalam 2 juta tahun sejarah bumi',
      'Penyusutan massa es benua Antartika dan Greenland memicu percepatan kenaikan laut',
      'Peringatan ilmuwan dunia untuk menahan pemanasan tidak melampaui ambang batas 1.5°C'
    ]
  },
  {
    id: 'koridor-rimba-tropis',
    number: '02',
    region: 'Sabuk Hutan Hujan Khatulistiwa Dunia',
    title: 'KORIDOR RIMBA TROPIS',
    subtitle: 'Menjaga Penyerap Karbon Alami Dunia',
    iucnBadge: 'Penyerap Karbon Kritis',
    populationStat: '-3.7 Juta Ha / Tahun',
    areaStat: '10 Miliar Ton Karbon Terlepas',
    unesco: 'Paru-Paru Karbon Utama',
    description:
      'Laju konversi rimba tropis di Amazon, Cekungan Kongo, dan Nusantara melepaskan cadangan karbon raksasa sekaligus memutus koridor migrasi satwa.',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&h=1080&q=85',
    cardImage:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&h=1200&q=80',
    bgPosition: 'center 38%',
    accentColor: '#10b981',
    campaignId: 'camp-iklim-pohon',
    highlights: [
      'Rimba tropis bertindak sebagai mesin pendingin iklim yang menyerap sepertiga emisi fosil',
      'Pembalakan liar dan pembukaan lahan mengikis keanekaragaman flora kanopi berkayu keras',
      'Restorasi lanskap terpadu berbasis perlindungan hak ulayat masyarakat adat pedalaman'
    ]
  },
  {
    id: 'pencemaran-samudra-lepas',
    number: '03',
    region: 'Lautan Bebas, Arus Gyre & Palung Laut',
    title: 'KRISIS LAUTAN BEBAS',
    subtitle: 'Timbulan Partikel & Keseimbangan Samudra',
    iucnBadge: 'Pencemaran Lintas Samudra',
    populationStat: '11 Juta Ton Masuk Laut/Thn',
    areaStat: '5.25 Triliun Partikel Mikro',
    unesco: 'UN Ocean Decade Monitoring',
    description:
      'Limbah anorganik yang hanyut dari daratan terakumulasi di pusaran arus samudra, mencemari palung terdalam, dan mengancam biota pemijahan laut.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&h=1080&q=85',
    cardImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&h=1200&q=80',
    bgPosition: 'center center',
    accentColor: '#0ea5e9',
    campaignId: 'camp-plastik-laut',
    highlights: [
      'Pecahan partikel mikroplastik kini ditemukan pada rantai makanan dari zooplankton hingga paus',
      'Penetapan 30 persen kawasan konservasi perairan lindung global pada tahun 2030 (Target 30x30)',
      'Penghentian limbah industri kimia muara dan pemasangan jaring pencegat sampah sungai'
    ]
  },
  {
    id: 'deplesi-air-tawar',
    number: '04',
    region: 'Cekungan Air Dunia & Akuifer Bawah Tanah',
    title: 'DEPLESI AIR TAWAR',
    subtitle: 'Penyusutan Akuifer & Kekeringan Ekstrem',
    iucnBadge: 'Ketahanan Pangan Dunia',
    populationStat: '2.2 Miliar Jiwa Krisis Air',
    areaStat: '70% Air untuk Irigasi Pangan',
    unesco: 'UN World Water Assessment',
    description:
      'Pemompaan air tanah tanpa kendali, intrusi air laut ke sumur pesisir, dan perubahan pola hujan memicu kelangkaan air bersih bagi peradaban.',
    image:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&h=1080&q=85',
    cardImage:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&h=1200&q=80',
    bgPosition: 'center center',
    accentColor: '#f59e0b',
    campaignId: 'camp-edukasi-sekolah',
    highlights: [
      'Penurunan muka air tanah di wilayah perkotaan memicu penurunan permukaan tanah (land subsidence)',
      'Teknologi sumur imbuhan buatan dan pemanenan air hujan atap bangunan sebagai solusi praktis',
      'Efisiensi tata kelola irigasi cerdas hemat air untuk ketahanan pangan masa depan'
    ]
  },
  {
    id: 'erosi-biodiversitas',
    number: '05',
    region: 'Lanskap Biodiversitas Kritis Planet Bumi',
    title: 'EROSI BIODIVERSITAS',
    subtitle: 'Krisis Kepunahan Massal Ke-6 Planet Bumi',
    iucnBadge: '1 Juta Spesies Terancam',
    populationStat: '-69% Populasi Satwa Liar',
    areaStat: 'Indeks Living Planet (WWF)',
    unesco: 'IUCN Red List Global Assessment',
    description:
      'Laju kepunahan spesies saat ini berlangsung seribu kali lebih cepat dibanding laju alami bumi, mengancam kestabilan jaring-jaring makanan global.',
    image:
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1920&h=1080&q=85',
    cardImage:
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=900&h=1200&q=80',
    bgPosition: 'center center',
    accentColor: '#e11d48',
    campaignId: 'camp-koridor-hayati',
    highlights: [
      'Kehilangan satu spesies kunci memicu efek domino runtuhnya ekosistem pendukung manusia',
      'Penurunan drastis populasi serangga penyerbuk mengancam produksi buah dan biji-bijian dunia',
      'Penguatan koridor satwa liar bebas jerat dan penegakan sanksi pasar gelap satwa langka'
    ]
  },
  {
    id: 'transisi-energi-terbarukan',
    number: '06',
    region: 'Jaringan Dekarbonisasi Energi Global',
    title: 'TRANSISI NOL KARBON',
    subtitle: 'Revolusi Energi Bersih Terbarukan',
    iucnBadge: 'Solusi Solutif Global',
    populationStat: 'Target 85% Bauran Hijau 2050',
    areaStat: 'Komitmen Perjanjian Paris',
    unesco: 'Transisi Energi Adil Berkelanjutan',
    description:
      'Penghentian bertahap pembangkit listrik berbahan bakar fosil dan percepatan pemanfaatan energi surya, angin, serta panas bumi di seluruh penjuru dunia.',
    image:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1920&h=1080&q=85',
    cardImage:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&h=1200&q=80',
    bgPosition: 'center center',
    accentColor: '#10b981',
    campaignId: 'camp-edukasi-sekolah',
    highlights: [
      'Teknologi baterai penyimpan energi dan panel fotovoltaik kini semakin terjangkau dan efisien',
      'Modernisasi jaringan transmisi listrik pintar untuk menyerap fluktuasi daya energi terbarukan',
      'Pemberian insentif pembiayaan bagi komunitas sekolah dan pedesaan yang memproduksi energi mandiri'
    ]
  }
];

export const SPECIES_DATA = [
  {
    id: 'fauna-harimau-sumatera',
    name: 'Harimau Sumatera',
    scientificName: 'Panthera tigris sondaica',
    category: 'Mamalia Darat',
    iucnStatus: 'KRITIS',
    iucnLabel: 'Indikator Hutan Primer',
    population: '400 sampai 600 Individu',
    region: 'Sumatera',
    habitat: 'Rimba Pegunungan Bukit Barisan & Dataran Rendah',
    image:
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=80',
    summary: 'Apex predator yang keberadaannya menandakan rantai makanan dan populasi herbivora hutan masih sehat seimbang.',
    threatMain: 'Pemasangan jerat kawat baja pemburu liar dan fragmentasi hutan yang memutus koridor berburu.',
    threatLevel: 94,
    solutionMain: 'Operasi SMART Patrol sapu bersih jerat kawat dan restorasi koridor jelajah hutan alami.',
    campaignId: 'camp-koridor-hayati'
  },
  {
    id: 'fauna-badak-jawa',
    name: 'Badak Jawa',
    scientificName: 'Rhinoceros sondaicus',
    category: 'Mamalia Darat',
    iucnStatus: 'KRITIS',
    iucnLabel: 'Indikator Hutan Pantai',
    population: '76 sampai 82 Individu',
    region: 'Jawa & Banten',
    habitat: 'Hutan Pantai & Dataran Rendah Ujung Kulon',
    image:
      'https://images.unsplash.com/photo-1598894000396-bc30e0996899?auto=format&fit=crop&w=900&q=80',
    summary: 'Herbivora besar terlangka di bumi yang membantu membuka jalan jelajah rimba dan menyuburkan tanah hutan.',
    threatMain: 'Invasi tanaman palem Langkap yang menutupi pakan alami serta risiko kerentanan populasi tunggal.',
    threatLevel: 96,
    solutionMain: 'Pengendalian petak gulma Langkap, monitoring 120+ kamera jebak, dan penjagaan patroli Rhino Protection Unit.',
    campaignId: 'camp-koridor-hayati'
  },
  {
    id: 'fauna-orangutan-borneo',
    name: 'Orangutan Kalimantan',
    scientificName: 'Pongo pygmaeus',
    category: 'Mamalia Darat',
    iucnStatus: 'KRITIS',
    iucnLabel: 'Petani Tajuk Kanopi',
    population: '57.350 Individu',
    region: 'Kalimantan',
    habitat: 'Hutan Rawa Gambut & Dipterokarpa Dataran Rendah',
    image:
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=80',
    summary: 'Kera besar penjelajah tajuk pohon yang meregenerasi hutan rimba dengan menyebarkan biji pohon buah berkayu keras.',
    threatMain: 'Pengeringan rawa gambut akibat kanalisasi dan kebakaran lahan bawah tanah di musim kemarau.',
    threatLevel: 92,
    solutionMain: 'Sekat kanal pembasah gambut hidrologis dan pelepasliaran orangutan hasil rehabilitasi sekolah hutan.',
    campaignId: 'camp-iklim-pohon'
  },
  {
    id: 'fauna-gajah-sumatera',
    name: 'Gajah Sumatera',
    scientificName: 'Elephas maximus sumatranus',
    category: 'Mamalia Darat',
    iucnStatus: 'KRITIS',
    iucnLabel: 'Insinyur Ekosistem Rimba',
    population: '< 2.400 Individu',
    region: 'Sumatera',
    habitat: 'Lembah Basah & Dataran Banjir Hutan Tropis',
    image:
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=900&q=80',
    summary: 'Megafauna herbivora yang merobohkan ranting tua sehingga sinar matahari dapat menembus lantai hutan.',
    threatMain: 'Penyempitan jalur lintasan jelajah tradisional gajah yang berbenturan dengan permukiman dan perkebunan.',
    threatLevel: 93,
    solutionMain: 'Pembuatan zona penyangga koridor damai satwa dan tim mitigasi konflik gajah berbasis masyarakat.',
    campaignId: 'camp-koridor-hayati'
  },
  {
    id: 'fauna-rangkong-badak',
    name: 'Burung Rangkong Badak',
    scientificName: 'Buceros rhinoceros',
    category: 'Aves & Serangga',
    iucnStatus: 'RENTAN',
    iucnLabel: 'Petani Rimba Sejati',
    population: 'Menurun di Alam Bebas',
    region: 'Sumatera & Kalimantan',
    habitat: 'Pohon Berongga Tinggi Hutan Primer',
    image:
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80',
    summary: 'Burung pemakan buah beringin yang mampu terbang puluhan kilometer menyebarkan benih pohon besar hutan hujan.',
    threatMain: 'Penebangan pohon tua berlubang yang menjadi sarang bertelur tunggal burung rangkong betina.',
    threatLevel: 86,
    solutionMain: 'Perlindungan pohon inang sarang alami dan pemasangan kotak sarang buatan di kanopi tinggi.',
    campaignId: 'camp-iklim-pohon'
  },
  {
    id: 'fauna-pesut-mahakam',
    name: 'Pesut Mahakam',
    scientificName: 'Orcaella brevirostris',
    category: 'Biota Air & Pesisir',
    iucnStatus: 'KRITIS',
    iucnLabel: 'Indikator Sungai Bersih',
    population: '62 sampai 70 Individu',
    region: 'Kalimantan Timur',
    habitat: 'Daerah Aliran Sungai Mahakam & Danau Semayang',
    image:
      'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=900&q=80',
    summary: 'Mamalia air tawar langka yang mengandalkan sonar gelombang suara untuk berburu ikan di air sungai berarus tenang.',
    threatMain: 'Kematian akibat terjerat jaring insang nelayan dan polusi kebisingan ponton lalu lintas batu bara.',
    threatLevel: 95,
    solutionMain: 'Pemasangan pinger sonar akustik pengusir pada jaring insang dan penetapan zona lindung inti habitat pesut.',
    campaignId: 'camp-plastik-laut'
  },
  {
    id: 'fauna-penyu-hijau',
    name: 'Penyu Hijau',
    scientificName: 'Chelonia mydas',
    category: 'Biota Air & Pesisir',
    iucnStatus: 'TERANCAM',
    iucnLabel: 'Penjaga Padang Lamun',
    population: 'Terancam di Kawasan Pesisir',
    region: 'Kepulauan Nusantara',
    habitat: 'Pantai Pasir Peneluran & Padang Lamun',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
    summary: 'Reptil laut pengembara samudra yang memakan lamun tua sehingga padang lamun tetap produktif menyerap karbon laut.',
    threatMain: 'Pencurian telur penyu di pantai peneluran dan penyu tersedak kantong plastik yang dikira ubur-ubur.',
    threatLevel: 89,
    solutionMain: 'Patroli malam penjagaan pantai peneluran dan edukasi pengurangan plastik sekali pakai pesisir.',
    campaignId: 'camp-plastik-laut'
  },
  {
    id: 'fauna-lebah-hutan',
    name: 'Lebah Madu Hutan Raksasa',
    scientificName: 'Apis dorsata',
    category: 'Aves & Serangga',
    iucnStatus: 'DILINDUNGI',
    iucnLabel: 'Bio-Penyerbuk Bunga Rimba',
    population: 'Menurun Akibat Polusi Kimia',
    region: 'Hutan Tropis Nusantara',
    habitat: 'Cabang Pohon Sialang & Kanopi Hutan',
    image:
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=900&q=80',
    summary: 'Serangga penyerbuk utama ribuan jenis pohon buah dan tanaman hutan yang tidak dapat diserbuki oleh lebah ternak biasa.',
    threatMain: 'Penebangan pohon sarang Sialang dan penggunaan insektisida kimia beracun di sempadan perkebunan.',
    threatLevel: 84,
    solutionMain: 'Pengembangan madu hutan lestari tanpa asap pembakar dan perlindungan pohon keramat Sialang.',
    campaignId: 'camp-edukasi-sekolah'
  },
  {
    id: 'flora-rafflesia-arnoldii',
    name: 'Padma Raksasa Rafflesia',
    scientificName: 'Rafflesia arnoldii',
    category: 'Puspa Langka',
    iucnStatus: 'DILINDUNGI',
    iucnLabel: 'Indikator Kelembapan Hutan',
    population: 'Sangat Terbatas di Alam',
    region: 'Bengkulu & Sumatera',
    habitat: 'Hutan Hujan Primer Dataran Rendah',
    image:
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80',
    summary: 'Bunga tunggal terbesar di dunia tanpa daun dan akar yang hidup bergantung penuh pada jaringan inang merambat Tetrastigma.',
    threatMain: 'Kerusakan liana inang akibat terinjak wisatawan liar dan pembukaan lahan hutan primer.',
    threatLevel: 92,
    solutionMain: 'Pemasangan jembatan kayu papan titian di sekitar knop bunga dan pemberdayaan komunitas penjaga puspa.',
    campaignId: 'camp-iklim-pohon'
  },
  {
    id: 'flora-kantong-semar',
    name: 'Kantong Semar Endemik',
    scientificName: 'Nepenthes clipeata',
    category: 'Puspa Langka',
    iucnStatus: 'KRITIS',
    iucnLabel: 'Indikator Hara Tanah Gambut',
    population: '< 300 Tanaman di Tebing Liar',
    region: 'Gunung Kelam, Kalimantan Barat',
    habitat: 'Dinding Tebing Granit & Hutan Kerangas',
    image:
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=80',
    summary: 'Tumbuhan karnivora penangkap serangga di tanah minim hara yang menjaga keseimbangan populasi fauna kecil tebing.',
    threatMain: 'Perburuan tanaman hias liar oleh kolektor ilegal dan kekeringan tebing akibat karhutla.',
    threatLevel: 95,
    solutionMain: 'Perbanyakan bibit kultur jaringan in-vitro laboratorium dan penjagaan tebing habitat asli oleh ranger lokal.',
    campaignId: 'camp-iklim-pohon'
  }
];

export const NATIONAL_PARKS = [
  {
    id: 'tn-ujung-kulon',
    name: 'Bab 1: Stasiun Riset Pesisir Terluar Ujung Kulon',
    province: 'Semenanjung Barat Banten',
    region: 'Jawa & Bali',
    area: '122.956 Ha Kawasan Konservasi',
    unescoStatus: 'Laboratorium Kerentanan Pesisir',
    ecosystem: 'Hutan Pantai & Mangrove Estuari',
    keySpecies: ['Badak Jawa', 'Cemara Pesisir', 'Banteng Jawa'],
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&h=950&q=85',
    description:
      'Pusat studi observasi mitigasi abrasi gelombang laut, pemantauan patroli proteksi badak 24 jam, dan pemulihan sabuk bakau pesisir terluar.'
  },
  {
    id: 'tn-gunung-leuser',
    name: 'Bab 2: Laboratorium Rimba Kanopi Leuser',
    province: 'Bentang Alam Leuser, Aceh & Sumut',
    region: 'Sumatera',
    area: '830.268 Ha Hutan Hujan',
    unescoStatus: 'Paru-Paru Karbon Utama',
    ecosystem: 'Hutan Dipterokarpa & Pegunungan Tinggi',
    keySpecies: ['Harimau Sumatera', 'Gajah Sumatera', 'Orangutan'],
    image:
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&h=950&q=85',
    description:
      'Stasiun penelitian keutuhan hutan hujan pegunungan yang menjaga pasokan air minum bagi jutaan warga serta benteng 4 megafauna kunci Sumatera.'
  },
  {
    id: 'tn-tanjung-puting',
    name: 'Bab 3: Pusat Hidrologi Rawa Gambut Tanjung Puting',
    province: 'Sungai Sekonyer, Kalimantan Tengah',
    region: 'Kalimantan',
    area: '415.040 Ha Rawa Gambut',
    unescoStatus: 'Brankas Karbon Terpadat',
    ecosystem: 'Hutan Rawa Air Hitam & Gambut Dalam',
    keySpecies: ['Orangutan Borneo', 'Bekantan', 'Pohon Rasau'],
    image:
      'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1600&h=950&q=85',
    description:
      'Kawasan riset hidrologi lahan basah untuk memantau ketinggian muka air gambut dan efektivitas sekat kanal dalam meredam pelepasan gas metana.'
  },
  {
    id: 'tn-komodo',
    name: 'Bab 4: Observatorium Kelautan & Savana Komodo',
    province: 'Gugusan Kepulauan Komodo, NTT',
    region: 'Sulawesi & NTT',
    area: '173.300 Ha Laut & Savana',
    unescoStatus: 'Laboratorium Biota Segitiga Karang',
    ecosystem: 'Terumbu Karang Dangkal & Bukit Savana Kering',
    keySpecies: ['Biawak Komodo', 'Pari Manta Karang', 'Penyu Sisik'],
    image:
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1600&h=950&q=85',
    description:
      'Pusat pemantauan suhu perairan tropis dan ketahanan koloni karang dari pemutihan (bleaching), serta adaptasi satwa purba di pulau vulkanik.'
  },
  {
    id: 'tn-kerinci-seblat',
    name: 'Bab 5: Menara Tangkapan Air Hulu Kerinci Seblat',
    province: 'Koridor 4 Provinsi Sumatera',
    region: 'Sumatera',
    area: '1.389.509 Ha Hulu DAS',
    unescoStatus: 'Menara Air Alami Sumatera',
    ecosystem: 'Lembah Basah & Hutan Pegunungan Berawan',
    keySpecies: ['Rafflesia arnoldii', 'Bunga Bangkai', 'Liana Inang'],
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&h=950&q=85',
    description:
      'Studi kasus pentingnya vegetasi lereng buatan alam dalam menahan erosi tanah dan menstabilkan debit sungai besar seperti Batanghari dan Musi.'
  },
  {
    id: 'tn-lorentz',
    name: 'Bab 6: Stasiun Iklim Gradien Alpin Lorentz',
    province: 'Pegunungan Jayawijaya, Papua',
    region: 'Papua',
    area: '2.411.500 Ha Gradien Ekologis',
    unescoStatus: 'Rekaman Pencairan Es Tropis',
    ecosystem: 'Gletser Salju Abadi hingga Rawa Mangrove',
    keySpecies: ['Gletser Tropis', 'Kanguru Pohon Dingiso', 'Kasuari'],
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&h=950&q=85',
    description:
      'Dokumentasi ilmiah perubahan ketebalan gletser salju abadi tropis sebagai indikator nyata tercepat kenaikan suhu atmosfer bumi.'
  }
];

export const DONATION_CAMPAIGNS = [
  {
    id: 'camp-iklim-pohon',
    title: 'Program Adopsi Pohon Hutan Koridor Rimba',
    location: 'Koridor Hutan Tropis Sumatera & Kalimantan',
    targetAmount: 300000000,
    collectedAmount: 218500000,
    donorsCount: 1680,
    urgentTag: 'Penyerap Karbon Alami',
    image:
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    description:
      'Penanaman pohon hutan berkayu keras penyerap karbon dan pemeliharaan intensif bibit selama 3 tahun bersama kelompok tani hutan lokal.',
    impactUnit: 'bibit pohon rimba dirawat',
    unitCost: 20000,
    partnerOrg: 'Koalisi Rimba Lestari'
  },
  {
    id: 'camp-plastik-laut',
    title: 'Aksi Bersih Pesisir & Pengolahan Plastik Laut',
    location: 'Kawasan Pesisir & Muara Sungai Kritis',
    targetAmount: 200000000,
    collectedAmount: 154200000,
    donorsCount: 1240,
    urgentTag: 'Pencegahan Mikroplastik',
    image:
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    description:
      'Pemasangan jaring perangkap sampah di muara sungai dan daur ulang limbah plastik sekali pakai menjadi sarana bangku taman publik.',
    impactUnit: 'kg sampah plastik didaur ulang',
    unitCost: 15000,
    partnerOrg: 'Clean Coastal Oceans'
  },
  {
    id: 'camp-edukasi-sekolah',
    title: 'Laboratorium Sains Hijau & Biopori di Sekolah',
    location: 'Sekolah Menengah & Kampus Komunitas',
    targetAmount: 150000000,
    collectedAmount: 112800000,
    donorsCount: 890,
    urgentTag: 'Edukasi Aplikatif Siswa',
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    description:
      'Penyediaan paket alat uji kualitas air, pembuatan lubang resapan biopori sekolah, dan modul kurikulum sains lingkungan untuk pelajar.',
    impactUnit: 'pelajar teredukasi praktik hijau',
    unitCost: 25000,
    partnerOrg: 'Yayasan Generasi Melek Lingkungan'
  },
  {
    id: 'camp-koridor-hayati',
    title: 'Peralatan Ranger Rimba Pembersih Jerat Kawat',
    location: 'Kawasan Suaka Koridor Satwa Terancam',
    targetAmount: 250000000,
    collectedAmount: 196400000,
    donorsCount: 1450,
    urgentTag: 'Keselamatan Satwa Kunci',
    image:
      'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80',
    description:
      'Dukungan GPS pelacak, sepatu boot rimba, dan logistik lapangan bagi regu ranger patroli anti-jerat pemburu di pelosok hutan lindung.',
    impactUnit: 'km jalur rimba dibebaskan jerat',
    unitCost: 30000,
    partnerOrg: 'Satuan Ranger Rimba Mandiri'
  }
];

export const INITIAL_DONORS = [
  {
    id: 'd1',
    name: 'Raka Pradipta',
    city: 'Bandung',
    amount: 250000,
    campaignTitle: 'Program Adopsi Pohon Hutan Koridor Rimba',
    message: 'Semoga bibit pohon ini tumbuh menjulang menjaga iklim masa depan.',
    timeAgo: '4 menit lalu',
    badge: 'Penjaga Rimba'
  },
  {
    id: 'd2',
    name: 'Nadia Kusuma',
    city: 'Jakarta',
    amount: 500000,
    campaignTitle: 'Aksi Bersih Pesisir & Pengolahan Plastik Laut',
    message: 'Demi samudra yang bersih dan bebas dari ancaman mikroplastik.',
    timeAgo: '12 menit lalu',
    badge: 'Sahabat Samudra'
  },
  {
    id: 'd3',
    name: 'Komunitas Mahasiswa Sains Ekologi',
    city: 'Surabaya',
    amount: 200000,
    campaignTitle: 'Laboratorium Sains Hijau & Biopori di Sekolah',
    message: 'Semangat menyebarkan sains ekologi ke sekolah-sekolah di pelosok negeri.',
    timeAgo: '27 menit lalu',
    badge: 'Pendidik Hijau'
  }
];

export const ARTICLES_DATA = [
  {
    id: 'art-1',
    title: 'Laporan IPCC Terbaru: Membedah Skenario Emisi RCP dan Dampaknya Terhadap Pola Cuaca Tropis',
    category: 'Riset Kebijakan',
    readTime: '5 Menit Baca',
    date: '10 November 2026',
    author: 'Dr. Hendra Wijaya (Analis Iklim)',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Memahami bagaimana model proyeksi iklim memprediksi pergeseran musim hujan dan intensitas badai di kawasan Asia Tenggara.',
    content: [
      'Panel Antarpemerintah tentang Perubahan Iklim (IPCC) merilis pembaruan komprehensif mengenai lintasan konsentrasi gas rumah kaca representatif (Representative Concentration Pathways). Model ini menyimulasikan berbagai skenario masa depan bergantung pada kecepatan transisi energi masyarakat global.',
      'Bagi kawasan kepulauan tropis, kenaikan suhu laut sebesar 0.5 derajat di atas rata-rata historis terbukti melipatgandakan energi laten badai tropis dan memicu anomali siklon di garis lintang rendah yang sebelumnya jarang terjadi.',
      'Kunci mitigasi jangka panjang bukan hanya dekarbonisasi industri berat, melainkan juga kesiapan infrastruktur adaptasi hidrologis perkotaan menghadapi curah hujan ekstrem dalam durasi singkat.'
    ]
  },
  {
    id: 'art-2',
    title: 'Inovasi Biosfer: Bagaimana Satelit LiDAR Memetakan Biomassa Hutan Tanpa Menebang Satu Pohon Pun',
    category: 'Teknologi Hijau',
    readTime: '4 Menit Baca',
    date: '8 November 2026',
    author: 'Tim Geospasial Alamkuy',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Teknologi sensor laser dari orbit bumi membuka era baru transparansi penghitungan cadangan karbon hutan primer secara presisi.',
    content: [
      'Penghitungan serapan karbon hutan hujan selama puluhan tahun mengandalkan survei lapangan manual dengan mengukur lingkar batang pohon per petak sampel. Metode ini memakan waktu berbulan-bulan dan terbatas pada wilayah yang dapat dijangkau jalan setapak.',
      'Kini, sensor Light Detection and Ranging (LiDAR) yang dipasang pada satelit orbit rendah mampu menembakkan jutaan denyut laser per detik menembus celah dedaunan kanopi hingga ke lantai hutan, menghasilkan model tiga dimensi struktur vegetasi.',
      'Data 3D ini memungkinkan ilmuwan menghitung massa kayu dan simpanan karbon hutan tropis dengan akurasi di atas 95 persen, menjadi dasar verifikasi kredit karbon yang adil dan transparan bagi masyarakat adat.'
    ]
  },
  {
    id: 'art-3',
    title: 'Kearifan Lokal Masyarakat Adat Penjaga Rimba: Belajar Konservasi dari Tradisi Turun-Temurun',
    category: 'Sosial Ekologi',
    readTime: '6 Menit Baca',
    date: '5 November 2026',
    author: 'Siti Nurhaliza (Antropolog Lingkungan)',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Mengapa kawasan hutan yang dikelola masyarakat adat terbukti memiliki laju deforestasi paling rendah di dunia dibanding taman nasional konvensional.',
    content: [
      'Data Badan Registrasi Wilayah Adat menunjukkan korelasi kuat: hutan yang berada di bawah naungan hukum adat dan kearifan lokal memiliki tutupan vegetasi yang jauh lebih lestari dibanding kawasan tanpa kepemilikan komunal.',
      'Mulai dari zonasi Hutan Larangan di ranah Minangkabau, tradisi Awig-Awig di pesisir Lombok, hingga sistem Simpukng di pedalaman Dayak, leluhur kita telah lama menerapkan prinsip rotasi panen dan larangan menebang pohon di sekitar mata air.',
      'Mengakui hak wilayah adat secara legal bukan hanya persoalan keadilan sosial, melainkan strategi sains paling berbiaya rendah untuk mengamankan keanekaragaman hayati nusantara.'
    ]
  },
  {
    id: 'art-4',
    title: 'Dari Limbah Menjadi Nilai: Menghitung Potensi Ekonomi Sirkular Berbasis Daur Ulang Mandiri',
    category: 'Ekonomi Sirkular',
    readTime: '3 Menit Baca',
    date: '2 November 2026',
    author: 'Divisi Inovasi Sirkular',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Mengubah paradigma limbah dari masalah lingkungan menjadi bahan baku bernilai tambah tinggi di tingkat komunitas lokal.',
    content: [
      'Konsep ekonomi linier tradisional (ambil, buat, buang) telah terbukti gagal mengatasi timbulan 68 juta ton sampah per tahun di tanah air. TPA di kota-kota besar kini telah melampaui kapasitas tampung maksimalnya.',
      'Pendekatan ekonomi sirkular berfokus pada perancangan produk yang dapat dibongkar pasang dan digunakan kembali tanpa kehilangan kualitas material. Plastik polietilena kerapatan tinggi (HDPE) bekas tutup botol, misalnya, dapat dilebur menjadi ubin lantai dan papan meja berkualitas tinggi.',
      'Ketika sekolah dan rukun warga membentuk bank sampah terpilah sejak dari dapur, hingga 80 persen volume sampah organik dapat dikomposkan di tempat dan sisanya memiliki nilai ekonomi daur ulang nyata.'
    ]
  },
  {
    id: 'art-5',
    title: 'Membangun Kembali Sabuk Pesisir: Sains di Balik Penanaman Mangrove untuk Meredam Gelombang Tsunami',
    category: 'Restorasi Ekologi',
    readTime: '5 Menit Baca',
    date: '28 Oktober 2026',
    author: 'Bambang Irawan (Peneliti Kelautan)',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Bagaimana anyaman akar napas pohon bakau mampu menyerap hingga 66 persen energi hantaman gelombang pasang ekstrem.',
    content: [
      'Hutan bakau mangrove sering kali hanya dipandang sebagai rawa lumpur yang becek. Namun dari sudut pandang dinamika fluida mekanika hidrolik, susunan akar tunjang Rhizophora merupakan peredam gelombang alami tercanggih yang pernah diciptakan alam.',
      'Studi pemodelan hidrologi pascatsunami membuktikan bahwa jalur sabuk hijau mangrove selebar 100 meter di sepanjang garis pantai mampu memotong tinggi gelombang pasang lebih dari setengahnya dan menjebak endapan lumpur agar tidak menutupi terumbu karang di lepas pantai.',
      'Selain sebagai benteng pertahanan bencana, hutan bakau tropis menyimpan karbon biru (blue carbon) hingga 4 kali lebih padat per hektar dibanding hutan daratan biasa.'
    ]
  },
  {
    id: 'art-6',
    title: 'Gerakan Sekolah Bebas Emisi: Panduan Audit Jejak Karbon Mandiri untuk Pelajar dan Mahasiswa',
    category: 'Pendidikan Lingkungan',
    readTime: '4 Menit Baca',
    date: '24 Oktober 2026',
    author: 'Tim Kampanye Sekolah Hijau',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Langkah taktis bagi generasi muda untuk menghitung konsumsi listrik, volume sampah kantin, dan merancang aksi dekarbonisasi nyata di kampus.',
    content: [
      'Pendidikan lingkungan hidup tidak boleh berhenti pada hafalan teori di ruang kelas. Generasi Z membutuhkan alat ukur nyata untuk melihat dampak dari perilaku konsumsi harian mereka.',
      'Modul audit jejak karbon mandiri mengajak siswa mencatat kilowatt-jam pemakaian AC kelas, menghitung rasio transportasi kendaraan pribadi dibanding angkutan umum siswa, dan mengukur bobot sisa makanan kantin sekolah per hari.',
      'Dengan data angka riil tersebut, siswa dapat merancang kompetisi antarkelas: siapa yang berhasil memangkas listrik paling banyak dan menyumbang sisa organik terbanyak ke instalasi biopori sekolah.'
    ]
  }
];

export const GALLERY_DATA = [
  {
    id: 'gal-1',
    title: 'Uji Kualitas Air Hulu Pegunungan',
    category: 'Riset Lapangan',
    location: 'Hulu Sungai Bukit Barisan',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85',
    caption: 'Peneliti muda mengukur kadar oksigen terlarut dan pH air jernih pegunungan sebelum mengalir ke daerah permukiman hilir.'
  },
  {
    id: 'gal-2',
    title: 'Restorasi Sabuk Cemara Laut Pesisir',
    category: 'Aksi Restorasi',
    location: 'Pesisir Pantai Selatan Jawa',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
    caption: 'Penanaman bibit pohon cemara udang untuk menahan hempasan angin kencang berpasir dan abrasi gelombang laut lepas.'
  },
  {
    id: 'gal-3',
    title: 'Pemasangan Kamera Pemantau Inframerah',
    category: 'Dokumentasi Konservasi',
    location: 'Jalur Lintasan Rimba Leuser',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85',
    caption: 'Tim ranger memasang kamera pemantau gerak di pohon kanopi untuk mendata populasi satwa kunci tanpa mengganggu aktivitas alaminya.'
  },
  {
    id: 'gal-4',
    title: 'Uji Laboratorium Mikroplastik Muara',
    category: 'Riset Lapangan',
    location: 'Laboratorium Sains Pesisir',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85',
    caption: 'Pengujian sampel sedimen dasar muara sungai di bawah mikroskop ultraviolet untuk menghitung kerapatan partikel serat sintetis.'
  },
  {
    id: 'gal-5',
    title: 'Aksi Pembuatan Lubang Biopori Pelajar',
    category: 'Pendidikan Komunitas',
    location: 'Halaman Sekolah Menengah Bandung',
    image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1200&q=85',
    caption: 'Siswa mempraktikkan pengeboran biopori tanah untuk meningkatkan resapan air hujan dan mengolah sampah daun menjadi pupuk kompos alami.'
  },
  {
    id: 'gal-6',
    title: 'Nursery Pembibitan Pohon Endemik Rimba',
    category: 'Aksi Restorasi',
    location: 'Pusat Kebun Bibit Hutan Rimba',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=85',
    caption: 'Perawatan ribuan anakan pohon meranti dan ulin yang dipersiapkan untuk reboisasi zona penyangga hutan yang terdegradasi.'
  },
  {
    id: 'gal-7',
    title: 'Instalasi Panel Surya Atap Sekolah Mandiri',
    category: 'Pendidikan Komunitas',
    location: 'Gedung Laboratorium Komunitas Hijau',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=85',
    caption: 'Pemasangan panel surya fotovoltaik atap sebagai media pembelajaran sains energi terbarukan bagi siswa dan mahasiswa.'
  },
  {
    id: 'gal-8',
    title: 'Sensus Burung Pantai Migran Khatulistiwa',
    category: 'Dokumentasi Konservasi',
    location: 'Kawasan Lahan Basah Delta Muara',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=85',
    caption: 'Pengamatan teropong jarak jauh mencatat kawanan burung pantai yang bermigrasi melintasi jalur terbang Asia Timur dan Australasia.'
  }
];
