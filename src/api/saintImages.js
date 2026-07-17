// Public-domain image URLs from Wikimedia Commons, keyed by saint ID.
// Static saint IDs match saintsData.js (e.g. 's-0101').
// Movable feast IDs omit the year suffix (e.g. 's-sacredheart').
// Applied as an overlay in entities.js so saintsData.js stays clean.

export const SAINT_IMAGES = {
  // January
  's-0101':    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Madonna_Advocata.png/500px-Madonna_Advocata.png',
  's-0121':    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/2872-saint-agnes-domenichino.jpg/500px-2872-saint-agnes-domenichino.jpg',
  's-0128':    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/St-thomas-aquinasFXD.jpg/500px-St-thomas-aquinasFXD.jpg',
  's-0131':    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Don_Bosco_%40_Torino%2C_1880_%28original%29.jpg/500px-Don_Bosco_%40_Torino%2C_1880_%28original%29.jpg',

  // February
  's-0210':    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kleinmariazell_-_Altar_Scholastica_2.jpg/500px-Kleinmariazell_-_Altar_Scholastica_2.jpg',
  's-0223':    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Polycarp_of_Smyrna2.jpg/500px-Polycarp_of_Smyrna2.jpg',

  // March — Thomas Aquinas (VO feast) shares image with Jan 28 entry
  's-0307-vo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/St-thomas-aquinasFXD.jpg/500px-St-thomas-aquinasFXD.jpg',
  's-0317':    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Our_Lady%27s_Island_Church_of_the_Assumption_East_Aisle_Window_Saint_Patrick_2010_09_26.jpg/500px-Our_Lady%27s_Island_Church_of_the_Assumption_East_Aisle_Window_Saint_Patrick_2010_09_26.jpg',
  's-0319':    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Guido_Reni_-_St_Joseph_with_the_Infant_Jesus_-_WGA19304.jpg/500px-Guido_Reni_-_St_Joseph_with_the_Infant_Jesus_-_WGA19304.jpg',
  's-0321':    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Memling%2C_Trittico_di_Benedetto_Portinari%2C_San_Benedetto.jpg/500px-Memling%2C_Trittico_di_Benedetto_Portinari%2C_San_Benedetto.jpg',

  // April
  's-0425':    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Codexaureus_21.jpg/500px-Codexaureus_21.jpg',
  's-0429':    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Giovanni_Battista_Tiepolo_096.jpg/500px-Giovanni_Battista_Tiepolo_096.jpg',

  // May
  's-0530':    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Joan_of_Arc_miniature_graded.jpg/500px-Joan_of_Arc_miniature_graded.jpg',

  // June
  's-0613':    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Francisco_de_Zurbar%C3%A1n_-_Sto_Antonio_de_Padua.jpg/500px-Francisco_de_Zurbar%C3%A1n_-_Sto_Antonio_de_Padua.jpg',
  's-0621':    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/The_Vocation_of_Saint_Aloysius_Gonzaga.PNG/500px-The_Vocation_of_Saint_Aloysius_Gonzaga.PNG',
  's-0624':    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Accademia_-_St_John_the_Baptist_by_Titian_Cat314.jpg/500px-Accademia_-_St_John_the_Baptist_by_Titian_Cat314.jpg',

  // July
  's-0703':    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Thomas_the_Apostle._Detail_of_the_mosaic_in_the_Basilica_of_San_Vitale._Ravena%2C_Italy.jpg/500px-Thomas_the_Apostle._Detail_of_the_mosaic_in_the_Basilica_of_San_Vitale._Ravena%2C_Italy.jpg',
  's-0706':    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Maria_Goretti.jpg/500px-Maria_Goretti.jpg',
  's-0711':    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Memling%2C_Trittico_di_Benedetto_Portinari%2C_San_Benedetto.jpg/500px-Memling%2C_Trittico_di_Benedetto_Portinari%2C_San_Benedetto.jpg',
  's-0715':    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Rebecca_Dulcibella_Orpen_%281830-1923%29_-_Saint_Bonaventure_Inspired_to_Write_-_343200_-_National_Trust.jpg/500px-Rebecca_Dulcibella_Orpen_%281830-1923%29_-_Saint_Bonaventure_Inspired_to_Write_-_343200_-_National_Trust.jpg',
  's-0716':    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Veronese_-_Possibly_after_-_1922.641_-_Virgin_Mary_Handing_Scapular_to_Saint_Simon_Stock.jpg/500px-Veronese_-_Possibly_after_-_1922.641_-_Virgin_Mary_Handing_Scapular_to_Saint_Simon_Stock.jpg',
  's-0722':    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bernardino_Campi_-_Mary_Magdalene_-_Google_Art_Project.jpg/500px-Bernardino_Campi_-_Mary_Magdalene_-_Google_Art_Project.jpg',
  's-0731':    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ignatius_Loyola.jpg/500px-Ignatius_Loyola.jpg',

  // August
  's-0804':    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/St._John_Vianney_%28896456693%29.jpg/500px-St._John_Vianney_%28896456693%29.jpg',
  's-0804-vo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SaintDominic.jpg/500px-SaintDominic.jpg',
  's-0808':    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SaintDominic.jpg/500px-SaintDominic.jpg',
  's-0811':    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Simone_Martini_047.jpg/500px-Simone_Martini_047.jpg',
  's-0814':    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Fr.Maximilian_Kolbe_in_1936.jpg/500px-Fr.Maximilian_Kolbe_in_1936.jpg',
  's-0815':    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tizian_041.jpg/500px-Tizian_041.jpg',
  's-0820':    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Bernardo%2C_de_Juan_Correa_de_Vivar_%28Museo_del_Prado%29.jpg/500px-San_Bernardo%2C_de_Juan_Correa_de_Vivar_%28Museo_del_Prado%29.jpg',
  's-0828':    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Saint_Augustine_by_Philippe_de_Champaigne.jpg/500px-Saint_Augustine_by_Philippe_de_Champaigne.jpg',

  // September
  's-0905':    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mother_Teresa_1.jpg/500px-Mother_Teresa_1.jpg',
  's-0923':    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Padre_Pio_portraitFXD.jpg/500px-Padre_Pio_portraitFXD.jpg',
  's-0930':    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/MatthiasStom-SaintJerome-Nantes.jpg/500px-MatthiasStom-SaintJerome-Nantes.jpg',

  // October — s-1003 is the VO feast of the same saint as s-1001
  's-1001':    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Teresa-de-Lisieux.jpg/500px-Teresa-de-Lisieux.jpg',
  's-1003':    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Teresa-de-Lisieux.jpg/500px-Teresa-de-Lisieux.jpg',
  's-1004':    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Philip_Fruytiers_-_St._Francis_of_Assisi.jpg/500px-Philip_Fruytiers_-_St._Francis_of_Assisi.jpg',
  's-1015':    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Santa_Teresa_de_Jes%C3%BAs_%28Museo_del_Prado%29.jpg/500px-Santa_Teresa_de_Jes%C3%BAs_%28Museo_del_Prado%29.jpg',
  // s-1017-vo (Margaret Mary Alacoque, VO feast) intentionally has no entry —
  // it previously pointed at the John Paul II photo above by mistake.
  's-1022':    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/ADAMELLO_-_PAPA_-_Giovanni_Paolo_II_-_panoramio_%28cropped%29.jpg/500px-ADAMELLO_-_PAPA_-_Giovanni_Paolo_II_-_panoramio_%28cropped%29.jpg',

  // December
  's-1212':    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Virgen_de_guadalupe1.jpg/500px-Virgen_de_guadalupe1.jpg',
  's-1214':    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Zurbar%C3%A1n_%28atribuido%29-John_of_the_Cross-1656.jpg/500px-Zurbar%C3%A1n_%28atribuido%29-John_of_the_Cross-1656.jpg',
  's-1124':    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Zurbar%C3%A1n_%28atribuido%29-John_of_the_Cross-1656.jpg/500px-Zurbar%C3%A1n_%28atribuido%29-John_of_the_Cross-1656.jpg',

  // Movable feasts (ID without year suffix)
  's-sacredheart':       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/SacredHeartBatoni.jpg/500px-SacredHeartBatoni.jpg',
  's-divinemercysunday': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/ADAMELLO_-_PAPA_-_Giovanni_Paolo_II_-_panoramio_%28cropped%29.jpg/500px-ADAMELLO_-_PAPA_-_Giovanni_Paolo_II_-_panoramio_%28cropped%29.jpg',
};

// Vertical crop anchor for the Today card / detail modal hero banner (both
// use object-cover at a short, wide aspect ratio: 224px tall on the Today
// card, 256px in the detail modal, at full card width). Most source
// paintings here are full or half-length portraits with the face in the
// upper portion, so saints not listed here default to a top-anchored crop
// (CSS 'center top'). Override here — with 'center' or a vertical
// percentage — when the default top crop cuts off the face; each value was
// found empirically by test-cropping the source image, since face position
// varies a lot by composition (headshot vs. full-body scene). The taller
// box added in this pass means most saints no longer need an override at
// all — re-check this map (and re-tune remaining entries) if the container
// height changes again.
export const SAINT_IMAGE_POSITION = {
  's-0731':    'center', // Ignatius Loyola — tight headshot, face fills the frame
  's-0715':    '14%',    // Bonaventure — full-body writing scene, face in upper third
  's-0815':    '20%',    // Assumption of Mary — tall altarpiece, her face sits below God the Father
  's-0820':    '5%',     // Bernard of Clairvaux — very tall full-length portrait, face near the top
  's-0425':    '25%',    // Mark the Evangelist — tall illuminated-manuscript page, his face sits well below the winged-lion emblem at top
  's-0621':    '44%',    // Aloysius Gonzaga — tall multi-figure altarpiece, he's the young man in the lower half, not the angels above
  's-0905':    '40%',    // Mother Teresa — very tall closeup photo, default top-anchor cropped out her nose/mouth on the shorter Today card
  's-1001':    '50%',    // Thérèse of Lisieux — tall closeup photo, default top-anchor cropped her face off entirely on the Today card
  's-1003':    '50%',    // same photo as s-1001 (VO feast)
};
