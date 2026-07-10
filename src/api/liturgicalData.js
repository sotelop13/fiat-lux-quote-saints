// Both Ordinary Form (Novus Ordo) and Extraordinary Form (Vetus Ordo / 1962 Missal) data
// NO ranks: Solemnity, Feast, Memorial, Optional Memorial, Feria
// VO ranks: Duplex I Classis, Duplex II Classis, Duplex Majus, Duplex, Semiduplex, Simplex, Feria
export const LITURGICAL_DAYS = [

  // ─── JANUARY ────────────────────────────────────────────────────────────────
  { id: 'ld-0120', date: '01-20',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Sebastian', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Sebastian, Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0101', date: '01-01',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Solemnity of Mary, Mother of God', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Circumcision of Our Lord', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0102', date: '01-02',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saints Basil and Gregory Nazianzen', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Octave Day of Saint Stephen', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0117', date: '01-17',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Anthony the Great', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Anthony, Abbot', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0121', date: '01-21',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Agnes', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Agnes, Virgin and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0124', date: '01-24',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Francis de Sales', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Timothy, Bishop and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0128', date: '01-28',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Thomas Aquinas', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Peter Nolasco, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0129', date: '01-29',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'green',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Francis de Sales, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0131', date: '01-31',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint John Bosco', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint John Bosco, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0113', date: '01-13',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Hilary of Poitiers', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Hilary of Poitiers, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0125', date: '01-25',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Conversion of Saint Paul', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Conversion of Saint Paul, Apostle', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0126', date: '01-26',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Timothy and Titus', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Polycarp, Bishop and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  // ─── JANUARY (additional) ───────────────────────────────────────────────────
  { id: 'ld-0103', date: '01-03',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint Genevieve', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0104', date: '01-04',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint Elizabeth Ann Seton', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0105', date: '01-05',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint John Neumann', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0106', date: '01-06',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Epiphany of the Lord', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Epiphany of the Lord', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0107', date: '01-07',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint Raymond of Peñafort', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0108', date: '01-08',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint Severinus of Noricum', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0109', date: '01-09',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint Adrian of Canterbury', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0110', date: '01-10',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint William of Bourges', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0111', date: '01-11',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Pope Saint Hyginus', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Commemoration of Pope Saint Hyginus, Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0112', date: '01-12',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint Marguerite Bourgeoys', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0114', date: '01-14',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Felix of Nola', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Felix of Nola, Priest', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'white' },

  { id: 'ld-0115', date: '01-15',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Paul the Hermit', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Paul, First Hermit', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0116', date: '01-16',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Berard and Companions', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saints Berard and Companions, Martyrs', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0118', date: '01-18',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Prisca', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Prisca, Virgin and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0119', date: '01-19',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Wulfstan of Worcester', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0122', date: '01-22',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Vincent of Saragossa', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Vincent, Deacon and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0123', date: '01-23',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Marianne Cope', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Raymond of Peñafort, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0127', date: '01-27',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Angela Merici', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0130', date: '01-30',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Bathildis', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  // ─── FEBRUARY ───────────────────────────────────────────────────────────────
  // ─── FEBRUARY (additional) ──────────────────────────────────────────────────
  { id: 'ld-0201', date: '02-01',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Brigid of Kildare', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Brigid, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0204', date: '02-04',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Rabanus Maurus', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0207', date: '02-07',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Richard the Pilgrim', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0208', date: '02-08',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Jerome Emiliani', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0209', date: '02-09',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Apollonia', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Apollonia, Virgin and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0212', date: '02-12',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Eulalia of Barcelona', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0213', date: '02-13',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Catherine de’ Ricci', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Catherine de’ Ricci, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0215', date: '02-15',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Faustinus and Jovita', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0216', date: '02-16',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Onesimus', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Onesimus, Bishop and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0217', date: '02-17',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Seven Holy Founders of the Servite Order', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Seven Holy Founders of the Servite Order', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0218', date: '02-18',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Simeon of Jerusalem', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0219', date: '02-19',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Conrad of Piacenza', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Conrad of Piacenza, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0220', date: '02-20',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Sadoth', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Commemoration of Saint Sadoth, Bishop and Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0221', date: '02-21',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Peter Damian', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Peter Damian, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0224', date: '02-24',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Ethelbert of Kent', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Matthias, Apostle', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0225', date: '02-25',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Walburga', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Saint Walburga, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0226', date: '02-26',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Porphyry of Gaza', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0227', date: '02-27',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Gabriel Possenti', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0228', date: '02-28',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Oswald of Worcester', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0202', date: '02-02',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Presentation of the Lord (Candlemas)', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Epiphany', vetus_ordo_feast: 'Purification of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0203', date: '02-03',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Blaise', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Septuagesima', vetus_ordo_feast: 'Saint Blaise, Bishop and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0205', date: '02-05',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Agatha', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Septuagesima', vetus_ordo_feast: 'Saint Agatha, Virgin and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0210', date: '02-10',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Scholastica', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Septuagesima', vetus_ordo_feast: 'Saint Scholastica, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0214', date: '02-14',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Valentine (Optional) / Saints Cyril and Methodius', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Septuagesima', vetus_ordo_feast: 'Saint Valentine, Priest and Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0222', date: '02-22',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Chair of Saint Peter', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Septuagesima', vetus_ordo_feast: 'Chair of Saint Peter at Antioch', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'white' },

  { id: 'ld-0223', date: '02-23',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Polycarp', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Septuagesima', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0206', date: '02-06',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Paul Miki and Companions', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Septuagesima', vetus_ordo_feast: 'Saints Paul Miki and Companions, Martyrs of Japan', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0211', date: '02-11',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Our Lady of Lourdes', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Septuagesima', vetus_ordo_feast: 'Our Lady of Lourdes', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'white' },

  // ─── MARCH ──────────────────────────────────────────────────────────────────
  { id: 'ld-0307', date: '03-07',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saints Perpetua and Felicity', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Thomas Aquinas, Doctor of the Church', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0317', date: '03-17',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Patrick', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Patrick, Bishop and Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  // ─── MARCH (additional) ─────────────────────────────────────────────────────
  { id: 'ld-0301', date: '03-01',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint David of Wales', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint David, Bishop', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0302', date: '03-02',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Chad of Mercia', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0303', date: '03-03',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Katharine Drexel', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0305', date: '03-05',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint John Joseph of the Cross', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint John Joseph of the Cross, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0306', date: '03-06',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Colette of Corbie', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Colette, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0308', date: '03-08',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint John of God', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint John of God, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0310', date: '03-10',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint John Ogilvie', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0311', date: '03-11',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Eulogius of Cordoba', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0313', date: '03-13',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Nicephorus of Constantinople', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0314', date: '03-14',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Matilda of Germany', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0315', date: '03-15',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Louise de Marillac', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0316', date: '03-16',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Heribert of Cologne', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0318', date: '03-18',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Cyril of Jerusalem', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Cyril of Jerusalem, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0320', date: '03-20',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Cuthbert of Lindisfarne', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0322', date: '03-22',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Nicholas Owen', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0324', date: '03-24',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Oscar Romero', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0326', date: '03-26',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Ludger of Munster', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0327', date: '03-27',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Rupert of Salzburg', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0328', date: '03-28',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Pope Saint Sixtus III', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Commemoration of Pope Saint Sixtus III', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'white' },

  { id: 'ld-0329', date: '03-29',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saints Jonas and Barachisius', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Commemoration of Saints Jonas and Barachisius, Martyrs', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0330', date: '03-30',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint John Climacus', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Commemoration of Saint John Climacus', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'white' },

  { id: 'ld-0331', date: '03-31',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Benjamin', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Commemoration of Saint Benjamin, Deacon and Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0325', date: '03-25',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Annunciation of the Lord', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Annunciation of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0319', date: '03-19',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Joseph, Spouse of the Blessed Virgin Mary', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Joseph, Spouse of the Blessed Virgin Mary, Confessor', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0312', date: '03-12',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'purple',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Gregory the Great, Pope and Doctor', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0321', date: '03-21',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'purple',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Benedict, Abbot', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0304', date: '03-04',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Casimir', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Casimir, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0309', date: '03-09',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Frances of Rome', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Frances of Rome, Widow', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0323', date: '03-23',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Toribio de Mogrovejo', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Turibius of Lima, Bishop and Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  // ─── APRIL ──────────────────────────────────────────────────────────────────
  { id: 'ld-0423', date: '04-23',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint George', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint George, Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0425', date: '04-25',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Mark the Evangelist', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Mark the Evangelist', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0429', date: '04-29',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Catherine of Siena', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Peter Martyr, Dominican', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  // ─── APRIL (additional) ─────────────────────────────────────────────────────
  { id: 'ld-0401', date: '04-01',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Hugh of Grenoble', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Hugh of Grenoble, Bishop', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0403', date: '04-03',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Richard of Chichester', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Richard of Chichester, Bishop', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0404', date: '04-04',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Isidore of Seville', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Isidore of Seville, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0405', date: '04-05',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Vincent Ferrer', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Vincent Ferrer, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0406', date: '04-06',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Notker of St. Gall', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0408', date: '04-08',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Julie Billiart', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0409', date: '04-09',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Waudru of Mons', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0410', date: '04-10',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Fulbert of Chartres', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-0412', date: '04-12',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Pope Saint Julius I', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Commemoration of Pope Saint Julius I', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'white' },

  { id: 'ld-0413', date: '04-13',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Pope Saint Martin I', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Pope Saint Martin I, Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0414', date: '04-14',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Lidwina of Schiedam', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Lidwina, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0415', date: '04-15',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Hunna', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0416', date: '04-16',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Bernadette Soubirous', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Bernadette, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0417', date: '04-17',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Stephen Harding', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0418', date: '04-18',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Apollonius the Apologist', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Commemoration of Saint Apollonius, Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0419', date: '04-19',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Pope Saint Leo IX', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Pope Saint Leo IX, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0420', date: '04-20',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Agnes of Montepulciano', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Agnes of Montepulciano, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0421', date: '04-21',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Anselm of Canterbury', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Anselm, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0422', date: '04-22',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Leonides of Alexandria', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Commemoration of Saint Leonides, Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0426', date: '04-26',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Pope Saint Cletus', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Pope Saints Cletus and Marcellinus, Martyrs', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0427', date: '04-27',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Zita of Lucca', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Zita, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0402', date: '04-02',
    novus_ordo_season: 'Lent', novus_ordo_feast: 'Saint Francis of Paola', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Saint Francis of Paola, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0407', date: '04-07',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint John Baptist de la Salle', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint John Baptist de la Salle, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0411', date: '04-11',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Stanislaus', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Stanislaus, Bishop and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0424', date: '04-24',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Fidelis of Sigmaringen', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Fidelis of Sigmaringen, Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0428', date: '04-28',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Louis de Montfort', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Louis de Montfort, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0430', date: '04-30',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Pius V', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Pius V, Pope and Confessor', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  // ─── MAY ────────────────────────────────────────────────────────────────────
  { id: 'ld-0502', date: '05-02',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Athanasius', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Athanasius, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0503', date: '05-03',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saints Philip and James, Apostles', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Finding of the Holy Cross', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0526', date: '05-26',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Philip Neri', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Philip Neri, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0530', date: '05-30',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Joan of Arc', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Felix I, Pope and Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0501', date: '05-01',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Joseph the Worker', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Joseph the Worker', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0513', date: '05-13',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Our Lady of Fátima', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Our Lady of Fatima', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'white' },

  { id: 'ld-0514', date: '05-14',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Matthias the Apostle', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0515', date: '05-15',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Isidore the Farmer', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Isidore the Farmer, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0520', date: '05-20',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Bernardine of Siena', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Bernardine of Siena, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0522', date: '05-22',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Rita of Cascia', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Rita of Cascia, Widow', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0525', date: '05-25',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Bede the Venerable', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Bede the Venerable, Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0531', date: '05-31',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Visitation of the Blessed Virgin Mary', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  // ─── MAY (additional) ───────────────────────────────────────────────────────
  { id: 'ld-0504', date: '05-04',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Florian of Lorch', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Florian, Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0505', date: '05-05',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Hilary of Arles', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Hilary of Arles, Bishop', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0506', date: '05-06',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Evodius of Antioch', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Evodius of Antioch, Bishop', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'white' },

  { id: 'ld-0507', date: '05-07',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Rose Venerini', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'white' },

  { id: 'ld-0508', date: '05-08',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Peter of Tarentaise', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Peter of Tarentaise, Bishop', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0509', date: '05-09',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Pachomius', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Pachomius, Abbot', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0510', date: '05-10',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Antoninus of Florence', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Antoninus, Bishop', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0511', date: '05-11',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Mamertus', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Mamertus, Bishop', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'white' },

  { id: 'ld-0512', date: '05-12',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saints Nereus and Achilleus', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saints Nereus and Achilleus, Martyrs', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0516', date: '05-16',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Brendan the Navigator', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Brendan, Abbot', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'white' },

  { id: 'ld-0517', date: '05-17',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Paschal Baylon', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Paschal Baylon, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0518', date: '05-18',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Pope Saint John I', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Pope Saint John I, Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0519', date: '05-19',
    novus_ordo_season: 'Easter', novus_ordo_feast: 'Saint Ivo of Kermartin', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Easter', vetus_ordo_feast: 'Saint Ivo, Confessor', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'white' },

  { id: 'ld-0521', date: '05-21',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Christopher Magallanes and Companions', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0523', date: '05-23',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint William of Perth', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint William of Perth, Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0524', date: '05-24',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Vincent of Lérins', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Vincent of Lérins, Confessor', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'white' },

  { id: 'ld-0527', date: '05-27',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Augustine of Canterbury', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Augustine of Canterbury, Bishop', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0528', date: '05-28',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Germain of Paris', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Germain of Paris, Bishop', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0529', date: '05-29',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Pope Saint Paul VI', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  // ─── JUNE ───────────────────────────────────────────────────────────────────
  { id: 'ld-0601', date: '06-01',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Justin Martyr', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Pamphilus and Companions, Martyrs', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0611', date: '06-11',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Barnabas', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Barnabas, Apostle', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0613', date: '06-13',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Anthony of Padua', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Anthony of Padua, Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0621', date: '06-21',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Aloysius Gonzaga', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Aloysius Gonzaga, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0622', date: '06-22',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints John Fisher and Thomas More', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0624', date: '06-24',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Nativity of Saint John the Baptist', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Nativity of Saint John the Baptist', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0629', date: '06-29',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Peter and Paul, Apostles', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints Peter and Paul, Apostles', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0603', date: '06-03',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Charles Lwanga and Companions', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0605', date: '06-05',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Boniface', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Boniface, Bishop and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0619', date: '06-19',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Romuald', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Romuald, Abbot', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0628', date: '06-28',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Irenaeus', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Irenaeus, Bishop and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0630', date: '06-30',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'First Martyrs of the Church of Rome', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Commemoration of Saint Paul, Apostle', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'red' },

  { id: 'ld-0602', date: '06-02',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Marcellinus and Peter', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints Marcellinus and Peter, Martyrs', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0606', date: '06-06',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Norbert', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Norbert, Bishop and Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0609', date: '06-09',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Ephrem the Syrian', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints Primus and Felicianus, Martyrs', vetus_ordo_rank: 'Semiduplex', vetus_ordo_color: 'red' },

  { id: 'ld-0614', date: '06-14',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'green',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Basil the Great, Bishop, Confessor and Doctor', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'white' },

  { id: 'ld-0626', date: '06-26',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'green',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints John and Paul, Martyrs', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0627', date: '06-27',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Cyril of Alexandria', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  // ─── JULY ───────────────────────────────────────────────────────────────────
  { id: 'ld-0702', date: '07-02',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'green',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Visitation of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0703', date: '07-03',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Thomas the Apostle', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Finding of the Body of Saint Stephen', vetus_ordo_rank: 'Semiduplex', vetus_ordo_color: 'white' },

  { id: 'ld-0706', date: '07-06',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Maria Goretti', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Octave of Saints Peter and Paul', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0701', date: '07-01',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Junípero Serra', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Most Precious Blood of Our Lord Jesus Christ', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0707', date: '07-07',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Willibald of Eichstätt', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Willibald, Bishop', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'white' },

  { id: 'ld-0708', date: '07-08',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Kilian', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Kilian and Companions, Martyrs', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0711', date: '07-11',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Benedict', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Pius I, Pope and Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0722', date: '07-22',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Mary Magdalene', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Mary Magdalene, Penitent', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0725', date: '07-25',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint James the Apostle', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint James the Apostle', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0731', date: '07-31',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Ignatius of Loyola', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Ignatius of Loyola, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  // ─── AUGUST ─────────────────────────────────────────────────────────────────
  { id: 'ld-0804', date: '08-04',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint John Vianney', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Dominic, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0806', date: '08-06',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Transfiguration of the Lord', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Transfiguration of Our Lord Jesus Christ', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0808', date: '08-08',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Dominic', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints Cyriacus, Largus, and Smaragdus, Martyrs', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0810', date: '08-10',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Lawrence', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Lawrence, Deacon and Martyr', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0811', date: '08-11',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Clare', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints Tiburtius and Susanna, Martyrs', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0814', date: '08-14',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Maximilian Kolbe', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Vigil of the Assumption', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'purple' },

  { id: 'ld-0815', date: '08-15',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Assumption of the Blessed Virgin Mary', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Assumption of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0820', date: '08-20',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Bernard of Clairvaux', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Bernard, Abbot and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0824', date: '08-24',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Bartholomew, Apostle', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Bartholomew, Apostle', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0827', date: '08-27',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Monica', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Joseph Calasanz, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0828', date: '08-28',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Augustine', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Augustine, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  // ─── SEPTEMBER ──────────────────────────────────────────────────────────────
  { id: 'ld-0903', date: '09-03',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Gregory the Great', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Pius X, Pope and Confessor', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0905', date: '09-05',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Teresa of Calcutta', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0908', date: '09-08',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Nativity of the Blessed Virgin Mary', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Nativity of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0912', date: '09-12',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'green',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Most Holy Name of Mary', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'white' },

  { id: 'ld-0913', date: '09-13',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint John Chrysostom', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint John Chrysostom, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0914', date: '09-14',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Exaltation of the Holy Cross', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Exaltation of the Holy Cross', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0915', date: '09-15',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Our Lady of Sorrows', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Seven Sorrows of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'white' },

  { id: 'ld-0923', date: '09-23',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Padre Pio of Pietrelcina', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Linus, Pope and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0927', date: '09-27',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Vincent de Paul', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints Cosmas and Damian, Martyrs', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0929', date: '09-29',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Michael, Gabriel, and Raphael, Archangels', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Dedication of Saint Michael the Archangel', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0930', date: '09-30',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Jerome', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Jerome, Priest and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  // ─── OCTOBER ────────────────────────────────────────────────────────────────
  { id: 'ld-1001', date: '10-01',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Thérèse of Lisieux', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1003', date: '10-03',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'green',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Thérèse of the Child Jesus, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1004', date: '10-04',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Francis of Assisi', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Francis of Assisi, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1007', date: '10-07',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Our Lady of the Rosary', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Most Holy Rosary of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-1011', date: '10-11',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'green',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Maternity of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-1015', date: '10-15',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Teresa of Ávila', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Teresa of Ávila, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1022', date: '10-22',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint John Paul II', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1028', date: '10-28',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Simon and Jude, Apostles', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints Simon and Jude, Apostles', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  // ─── NOVEMBER ───────────────────────────────────────────────────────────────
  { id: 'ld-1101', date: '11-01',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'All Saints', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'All Saints', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white' },

  { id: 'ld-1102', date: '11-02',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Commemoration of All the Faithful Departed (All Souls)', novus_ordo_rank: 'Feast', novus_ordo_color: 'black',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Commemoration of All the Faithful Departed', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'black' },

  { id: 'ld-1103', date: '11-03',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Martin de Porres', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1104', date: '11-04',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Charles Borromeo', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Charles Borromeo, Bishop and Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1111', date: '11-11',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Martin of Tours', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Martin of Tours, Bishop and Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1113', date: '11-13',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Frances Xavier Cabrini', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1117', date: '11-17',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Elizabeth of Hungary', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Gregory Thaumaturgus, Bishop and Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1119', date: '11-19',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'green',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Elizabeth of Hungary, Widow', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1122', date: '11-22',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Cecilia', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Cecilia, Virgin and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-1124', date: '11-24',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'green',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint John of the Cross, Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1130', date: '11-30',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint Andrew the Apostle', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Saint Andrew, Apostle', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  // ─── DECEMBER ───────────────────────────────────────────────────────────────
  { id: 'ld-1203', date: '12-03',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint Francis Xavier', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Saint Francis Xavier, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1206', date: '12-06',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint Nicholas', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Saint Nicholas, Bishop and Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1207', date: '12-07',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint Ambrose', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Saint Ambrose, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1208', date: '12-08',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Immaculate Conception of the Blessed Virgin Mary', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Immaculate Conception of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white' },

  { id: 'ld-1212', date: '12-12',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Our Lady of Guadalupe', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Our Lady of Guadalupe', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1213', date: '12-13',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint Lucy', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Saint Lucy, Virgin and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-1214', date: '12-14',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint John of the Cross', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Saint Nicasius, Bishop and Martyr, and Companions', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-1228', date: '12-28',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Holy Innocents, Martyrs', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Holy Innocents, Martyrs', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-1229', date: '12-29',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint Thomas Becket', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Saint Thomas Becket, Bishop and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-1225', date: '12-25',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Nativity of the Lord', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Nativity of Our Lord Jesus Christ', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white' },

  { id: 'ld-1226', date: '12-26',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint Stephen, First Martyr', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Saint Stephen, Protomartyr', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-1227', date: '12-27',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint John the Apostle and Evangelist', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Saint John the Apostle and Evangelist', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-1221', date: '12-21',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Feria', novus_ordo_rank: 'Feria', novus_ordo_color: 'purple',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Saint Thomas the Apostle', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0704', date: '07-04',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Elizabeth of Portugal', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Elizabeth of Portugal, Queen', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0715', date: '07-15',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Bonaventure', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Bonaventure, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0716', date: '07-16',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Our Lady of Mount Carmel', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Our Lady of Mount Carmel', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0723', date: '07-23',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Birgitta of Sweden', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Birgitta of Sweden', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0726', date: '07-26',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Joachim and Anne', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Anne, Mother of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0729', date: '07-29',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Martha, Mary, and Lazarus', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Martha, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0801', date: '08-01',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Alphonsus Liguori', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feast of the Chains of Saint Peter (Ad Vincula)', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'red' },

  { id: 'ld-0809', date: '08-09',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Teresa Benedicta of the Cross', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Vigil of Saint Lawrence', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'purple' },

  { id: 'ld-0822', date: '08-22',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Queenship of the Blessed Virgin Mary', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Immaculate Heart of Mary', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0823', date: '08-23',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Rose of Lima', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Rose of Lima, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0825', date: '08-25',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Louis IX', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Louis IX, King of France', vetus_ordo_rank: 'Semiduplex', vetus_ordo_color: 'white' },

  { id: 'ld-0829', date: '08-29',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Passion of Saint John the Baptist', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Beheading of Saint John the Baptist', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'red' },

  { id: 'ld-0909', date: '09-09',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Peter Claver', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Gorgonius, Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0916', date: '09-16',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Cornelius and Cyprian', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints Cornelius and Cyprian', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0917', date: '09-17',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Robert Bellarmine', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Impression of the Stigmata of Saint Francis of Assisi', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0920', date: '09-20',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Andrew Kim and Paul Chong Hasang', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints Eustace and Companions, Martyrs', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0921', date: '09-21',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Matthew the Apostle', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Matthew, Apostle and Evangelist', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-0926', date: '09-26',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Cosmas and Damian', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saints Cosmas and Damian, Martyrs', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-1002', date: '10-02',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Holy Guardian Angels', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Holy Guardian Angels', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'white' },

  { id: 'ld-1017', date: '10-17',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Ignatius of Antioch', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Margaret Mary Alacoque, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1018', date: '10-18',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Luke the Evangelist', novus_ordo_rank: 'Feast', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Luke the Evangelist', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'red' },

  { id: 'ld-1019', date: '10-19',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints John de Brébeuf and Isaac Jogues', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Peter of Alcantara, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1109', date: '11-09',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Dedication of the Lateran Basilica', novus_ordo_rank: 'Feast', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Dedication of the Archbasilica of the Most Holy Savior', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white' },

  { id: 'ld-1110', date: '11-10',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Leo the Great', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Andrew Avellino, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1112', date: '11-12',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Josaphat', novus_ordo_rank: 'Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Josaphat, Bishop and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-1121', date: '11-21',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Presentation of the Blessed Virgin Mary', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Presentation of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex Majus', vetus_ordo_color: 'white' },

  { id: 'ld-1123', date: '11-23',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Clement I', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Clement I, Pope and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-1125', date: '11-25',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Catherine of Alexandria', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Catherine of Alexandria, Virgin and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-1204', date: '12-04',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint John Damascene', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Saint Peter Chrysologus, Bishop and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1209', date: '12-09',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint Juan Diego', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-1231', date: '12-31',
    novus_ordo_season: 'Christmas', novus_ordo_feast: 'Saint Sylvester I', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Christmas', vetus_ordo_feast: 'Saint Sylvester I, Pope and Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0705', date: '07-05',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Anthony Mary Zaccaria', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0709', date: '07-09',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saints Augustine Zhao Rong and Companions', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0713', date: '07-13',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Henry II', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Henry II, Emperor and Confessor', vetus_ordo_rank: 'Semiduplex', vetus_ordo_color: 'white' },

  { id: 'ld-0714', date: '07-14',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Kateri Tekakwitha', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0721', date: '07-21',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Lawrence of Brindisi', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0724', date: '07-24',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Sharbel Makhluf', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0802', date: '08-02',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Eusebius of Vercelli', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0807', date: '08-07',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Cajetan', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Cajetan, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0812', date: '08-12',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Jane Frances de Chantal', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0816', date: '08-16',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Stephen of Hungary', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Joachim, Father of the Blessed Virgin Mary', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white' },

  { id: 'ld-0819', date: '08-19',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint John Eudes', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0821', date: '08-21',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Pius X', novus_ordo_rank: 'Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Jane Frances de Chantal, Widow', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0919', date: '09-19',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Januarius', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Januarius, Bishop and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-0922', date: '09-22',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Thomas of Villanova', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0925', date: '09-25',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Sergius of Radonezh', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0928', date: '09-28',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Wenceslaus', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Wenceslaus, Duke and Martyr', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'red' },

  { id: 'ld-1005', date: '10-05',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Faustina Kowalska', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1006', date: '10-06',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Bruno', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Bruno, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1016', date: '10-16',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Hedwig of Silesia', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Hedwig, Widow', vetus_ordo_rank: 'Semiduplex', vetus_ordo_color: 'white' },

  { id: 'ld-1020', date: '10-20',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Paul of the Cross', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1023', date: '10-23',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint John of Capistrano', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1024', date: '10-24',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Anthony Mary Claret', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1108', date: '11-08',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Blessed John Duns Scotus', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1115', date: '11-15',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Albert the Great', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Albert the Great, Bishop, Confessor and Doctor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1116', date: '11-16',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Gertrude the Great', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Gertrude, Virgin', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-1118', date: '11-18',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Rose Philippine Duchesne', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1126', date: '11-26',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint John Berchmans', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-1201', date: '12-01',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Blessed Charles de Foucauld', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  { id: 'ld-1205', date: '12-05',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint Sabas', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Saint Sabas, Abbot', vetus_ordo_rank: 'Semiduplex', vetus_ordo_color: 'white' },

  { id: 'ld-1211', date: '12-11',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint Damasus I', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Saint Damasus I, Pope and Confessor', vetus_ordo_rank: 'Semiduplex', vetus_ordo_color: 'white' },

  { id: 'ld-1223', date: '12-23',
    novus_ordo_season: 'Advent', novus_ordo_feast: 'Saint John of Kanty', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Advent', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple' },

  // ─── JUNE (additional) ──────────────────────────────────────────────────────
  { id: 'ld-0604', date: '06-04',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Francis Caracciolo', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Francis Caracciolo, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0607', date: '06-07',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Robert of Newminster', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0608', date: '06-08',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Medard', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0610', date: '06-10',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Landry of Paris', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Margaret of Scotland, Widow', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0612', date: '06-12',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint John of Sahagún', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint John of San Facundo, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0615', date: '06-15',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Germaine Cousin', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Commemoration of Saints Vitus, Modestus, and Crescentia, Martyrs', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0616', date: '06-16',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint John Francis Regis', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint John Francis Regis, Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0617', date: '06-17',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Emily de Vialar', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Saint Gregory Barbarigo, Bishop and Confessor', vetus_ordo_rank: 'Duplex', vetus_ordo_color: 'white' },

  { id: 'ld-0618', date: '06-18',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Elizabeth of Schönau', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0620', date: '06-20',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Pope Saint Silverius', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'red',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Commemoration of Saint Silverius, Pope and Martyr', vetus_ordo_rank: 'Simplex', vetus_ordo_color: 'red' },

  { id: 'ld-0623', date: '06-23',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Joseph Cafasso', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },

  { id: 'ld-0625', date: '06-25',
    novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Saint Prosper of Aquitaine', novus_ordo_rank: 'Optional Memorial', novus_ordo_color: 'white',
    vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Feria', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'green' },
];
