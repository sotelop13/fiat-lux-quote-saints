// Computes Easter and all moveable feasts for a given year.
// Returns empty arrays on any error so the app always loads cleanly.

function toMMDD(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${mm}-${dd}`;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

// Anonymous Gregorian algorithm — accurate for all years 1583–4099
function computeEaster(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// First Sunday of Advent: the Sunday between Nov 27 and Dec 3
function firstSundayOfAdvent(year) {
  const nov27 = new Date(year, 10, 27);
  const dow = nov27.getDay();
  return new Date(year, 10, 27 + (dow === 0 ? 0 : 7 - dow));
}

// Last Sunday of October — VO Christ the King
function lastSundayOfOctober(year) {
  const oct31 = new Date(year, 9, 31);
  const dow = oct31.getDay();
  return new Date(year, 9, 31 - dow);
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Generates a liturgical entry for every Sunday in the year that isn't already
// covered by a dedicated named movable feast (Palm Sunday, Easter, etc.).
function getSundayEntries(year) {
  const easter      = computeEaster(year);
  const advent1     = firstSundayOfAdvent(year);
  const christKingNO = addDays(advent1, -7);
  const christKingVO = lastSundayOfOctober(year);
  const ashWed      = addDays(easter, -46);
  const trinitySun  = addDays(easter, 56);
  const septuagesima = addDays(easter, -63);

  // Baptism of the Lord (NO): first Sunday after Jan 6
  const jan6 = new Date(year, 0, 6);
  const jan6Dow = jan6.getDay();
  const baptism = jan6Dow === 0
    ? new Date(year, 0, 13)
    : addDays(jan6, 7 - jan6Dow);

  // Sundays that already have a specific named movable feast entry — skip these
  const dedicated = new Set([
    toMMDD(addDays(easter, -21)),  // Laetare Sunday
    toMMDD(addDays(easter, -7)),   // Palm Sunday
    toMMDD(easter),                // Easter Sunday
    toMMDD(addDays(easter, 7)),    // Divine Mercy Sunday
    toMMDD(addDays(easter, 49)),   // Pentecost
    toMMDD(trinitySun),            // Trinity Sunday
    toMMDD(christKingNO),          // Christ the King (NO date)
    toMMDD(christKingVO),          // Christ the King (VO date)
  ]);

  // Map each post-Trinity Sunday to its Ordinary Time number by counting
  // backwards: Christ the King = 34th Sunday of Ordinary Time.
  const postTrinityOTMap = {};
  let otN = 34;
  let s = christKingNO;
  while (s > trinitySun) {
    postTrinityOTMap[toMMDD(s)] = otN;
    otN--;
    s = addDays(s, -7);
  }

  // Counters — walk Sundays chronologically so numbering is always correct
  let noPreLentOT  = 2;   // 2nd OT = first Sunday after Baptism of the Lord
  let noLent       = 1;
  let noEaster     = 3;   // 3rd Sunday of Easter (2nd = Divine Mercy, dedicated)
  let noAdvent     = 1;
  let voEpiphany   = 1;   // 1st Sunday after Epiphany
  let voSepIdx     = 0;   // [Septuagesima, Sexagesima, Quinquagesima]
  let voLent       = 1;
  let voEastertide = 2;   // 2nd Sunday after Easter (1st = Low Sunday = Divine Mercy)
  let voAfterPent  = 2;   // 2nd Sunday after Pentecost (1st = Trinity, dedicated)
  let voAdvent     = 1;

  const result = [];

  // Advance to the first Sunday of the year
  let cur = new Date(year, 0, 1);
  const startDow = cur.getDay();
  if (startDow !== 0) cur = addDays(cur, 7 - startDow);

  while (cur.getFullYear() === year) {
    const mmdd = toMMDD(cur);

    if (!dedicated.has(mmdd)) {
      const noSeason = computeSeason(mmdd, year, 'NO');
      const voSeason = computeSeason(mmdd, year, 'VO');

      // ── Novus Ordo ────────────────────────────────────────────────────
      let noFeast, noColor, noRank = 'Feast';

      if (noSeason === 'Christmas' || cur <= baptism) {
        noFeast = 'Sunday within the Christmas Season';
        noColor = 'white';
      } else if (noSeason === 'Ordinary Time' && cur < ashWed) {
        noFeast = `${ordinal(noPreLentOT)} Sunday in Ordinary Time`;
        noPreLentOT++;
        noColor = 'green';
      } else if (noSeason === 'Lent') {
        noFeast = `${ordinal(noLent)} Sunday of Lent`;
        if (noLent === 3) noLent = 5;  // skip 4th (Laetare — dedicated)
        else noLent++;
        noColor = 'purple';
      } else if (noSeason === 'Easter') {
        noFeast = `${ordinal(noEaster)} Sunday of Easter`;
        noEaster++;
        noColor = 'white';
        noRank = 'Solemnity';
      } else if (noSeason === 'Advent') {
        if (noAdvent === 3) {
          noFeast = 'Gaudete Sunday (3rd Sunday of Advent)';
          noColor = 'rose';
        } else {
          noFeast = `${ordinal(noAdvent)} Sunday of Advent`;
          noColor = 'purple';
        }
        noAdvent++;
      } else {
        // Ordinary Time after Pentecost/Trinity
        const num = postTrinityOTMap[mmdd];
        noFeast = num ? `${ordinal(num)} Sunday in Ordinary Time` : 'Sunday in Ordinary Time';
        noColor = 'green';
      }

      // ── Vetus Ordo ───────────────────────────────────────────────────
      let voFeast, voColor, voRank = 'Semiduplex';

      if (voSeason === 'Christmas') {
        voFeast = 'Sunday within the Christmas Season';
        voColor = 'white';
      } else if (voSeason === 'Time after Epiphany') {
        voFeast = `${ordinal(voEpiphany)} Sunday after Epiphany`;
        voEpiphany++;
        voColor = 'green';
      } else if (voSeason === 'Septuagesima') {
        const sepNames = ['Septuagesima Sunday', 'Sexagesima Sunday', 'Quinquagesima Sunday'];
        voFeast = sepNames[voSepIdx] ?? 'Sunday in Septuagesima';
        voSepIdx++;
        voColor = 'purple';
      } else if (voSeason === 'Lent') {
        voFeast = voLent === 5 ? 'Passion Sunday' : `${ordinal(voLent)} Sunday of Lent`;
        if (voLent === 3) voLent = 5;  // skip 4th (Laetare — dedicated)
        else voLent++;
        voColor = 'purple';
      } else if (voSeason === 'Easter' || voSeason === 'Eastertide') {
        voFeast = `${ordinal(voEastertide)} Sunday after Easter`;
        voEastertide++;
        voColor = 'white';
      } else if (voSeason === 'Time after Pentecost') {
        voFeast = `${ordinal(voAfterPent)} Sunday after Pentecost`;
        voAfterPent++;
        voColor = 'green';
      } else if (voSeason === 'Advent') {
        if (voAdvent === 3) {
          voFeast = 'Gaudete Sunday (III Dominica Adventus)';
          voColor = 'rose';
        } else {
          voFeast = `${ordinal(voAdvent)} Sunday of Advent`;
          voColor = 'purple';
        }
        voAdvent++;
      } else {
        voFeast = 'Sunday';
        voColor = 'green';
      }

      result.push({
        id: `ld-sunday-${mmdd}-${year}`,
        date: mmdd,
        novus_ordo_season: noSeason,
        novus_ordo_feast: noFeast,
        novus_ordo_rank: noRank,
        novus_ordo_color: noColor,
        vetus_ordo_season: voSeason,
        vetus_ordo_feast: voFeast,
        vetus_ordo_rank: voRank,
        vetus_ordo_color: voColor,
      });
    }

    cur = addDays(cur, 7);
  }

  return result;
}

export function getMovableLiturgicalDays(year) {
  try {
    const easter = computeEaster(year);
    const advent1 = firstSundayOfAdvent(year);
    const christKingNO = addDays(advent1, -7);
    const christKingVO = lastSundayOfOctober(year);

    return [
      {
        id: `ld-ashwed-${year}`,
        date: toMMDD(addDays(easter, -46)),
        novus_ordo_season: 'Lent', novus_ordo_feast: 'Ash Wednesday', novus_ordo_rank: 'Feria', novus_ordo_color: 'purple',
        vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Ash Wednesday (Feria IV Cinerum)', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple',
      },
      {
        id: `ld-laetare-${year}`,
        date: toMMDD(addDays(easter, -21)),
        novus_ordo_season: 'Lent', novus_ordo_feast: 'Laetare Sunday (4th Sunday of Lent)', novus_ordo_rank: 'Feria', novus_ordo_color: 'rose',
        vetus_ordo_season: 'Lent', vetus_ordo_feast: 'Dominica Laetare (4th Sunday of Lent)', vetus_ordo_rank: 'Semiduplex', vetus_ordo_color: 'rose',
      },
      {
        id: `ld-palmsunday-${year}`,
        date: toMMDD(addDays(easter, -7)),
        novus_ordo_season: 'Holy Week', novus_ordo_feast: "Palm Sunday of the Lord's Passion", novus_ordo_rank: 'Feria', novus_ordo_color: 'red',
        vetus_ordo_season: 'Holy Week', vetus_ordo_feast: 'Palm Sunday (Dominica in Palmis)', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'red',
      },
      {
        id: `ld-holythursday-${year}`,
        date: toMMDD(addDays(easter, -3)),
        novus_ordo_season: 'Holy Week', novus_ordo_feast: "Holy Thursday — Mass of the Lord's Supper", novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
        vetus_ordo_season: 'Holy Week', vetus_ordo_feast: 'Holy Thursday (Feria V in Coena Domini)', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white',
      },
      {
        id: `ld-goodfriday-${year}`,
        date: toMMDD(addDays(easter, -2)),
        novus_ordo_season: 'Holy Week', novus_ordo_feast: 'Good Friday — Passion of the Lord', novus_ordo_rank: 'Feria', novus_ordo_color: 'red',
        vetus_ordo_season: 'Holy Week', vetus_ordo_feast: 'Good Friday (Feria VI in Passione et Morte Domini)', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'red',
      },
      {
        id: `ld-holysaturday-${year}`,
        date: toMMDD(addDays(easter, -1)),
        novus_ordo_season: 'Holy Week', novus_ordo_feast: 'Holy Saturday — Easter Vigil', novus_ordo_rank: 'Feria', novus_ordo_color: 'white',
        vetus_ordo_season: 'Holy Week', vetus_ordo_feast: 'Holy Saturday (Sabbato Sancto)', vetus_ordo_rank: 'Feria', vetus_ordo_color: 'purple',
      },
      {
        id: `ld-easter-${year}`,
        date: toMMDD(easter),
        novus_ordo_season: 'Easter', novus_ordo_feast: 'Easter Sunday — Resurrection of the Lord', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
        vetus_ordo_season: 'Eastertide', vetus_ordo_feast: 'Easter Sunday (Dominica Resurrectionis)', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white',
      },
      {
        id: `ld-eastermonday-${year}`,
        date: toMMDD(addDays(easter, 1)),
        novus_ordo_season: 'Easter', novus_ordo_feast: 'Monday in the Octave of Easter', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
        vetus_ordo_season: 'Eastertide', vetus_ordo_feast: 'Monday in the Octave of Easter', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white',
      },
      {
        id: `ld-divinemercysunday-${year}`,
        date: toMMDD(addDays(easter, 7)),
        novus_ordo_season: 'Easter', novus_ordo_feast: 'Divine Mercy Sunday (2nd Sunday of Easter)', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
        vetus_ordo_season: 'Eastertide', vetus_ordo_feast: 'Low Sunday (Quasimodo)', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white',
      },
      {
        id: `ld-ascension-${year}`,
        date: toMMDD(addDays(easter, 39)),
        novus_ordo_season: 'Easter', novus_ordo_feast: 'Ascension of the Lord', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
        vetus_ordo_season: 'Eastertide', vetus_ordo_feast: 'Ascension of Our Lord Jesus Christ', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white',
      },
      {
        id: `ld-pentecost-${year}`,
        date: toMMDD(addDays(easter, 49)),
        novus_ordo_season: 'Easter', novus_ordo_feast: 'Pentecost Sunday', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'red',
        vetus_ordo_season: 'Eastertide', vetus_ordo_feast: 'Pentecost Sunday (Dominica Pentecostes)', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'red',
      },
      {
        id: `ld-trinitysunday-${year}`,
        date: toMMDD(addDays(easter, 56)),
        novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'The Most Holy Trinity', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
        vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Most Holy Trinity (Dominica Trinitatis)', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white',
      },
      {
        id: `ld-corpuschristi-${year}`,
        date: toMMDD(addDays(easter, 60)),
        novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'The Most Holy Body and Blood of Christ', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
        vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Corpus Christi (Corpus Domini)', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white',
      },
      {
        id: `ld-sacredheart-${year}`,
        date: toMMDD(addDays(easter, 68)),
        novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'The Most Sacred Heart of Jesus', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
        vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Sacred Heart of Jesus', vetus_ordo_rank: 'Duplex II Classis', vetus_ordo_color: 'white',
      },
      {
        id: `ld-christking-no-${year}`,
        date: toMMDD(christKingNO),
        novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Our Lord Jesus Christ, King of the Universe', novus_ordo_rank: 'Solemnity', novus_ordo_color: 'white',
        vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Sunday in Ordinary Time', vetus_ordo_rank: 'Semiduplex', vetus_ordo_color: 'green',
      },
      {
        id: `ld-christking-vo-${year}`,
        date: toMMDD(christKingVO),
        novus_ordo_season: 'Ordinary Time', novus_ordo_feast: 'Sunday in Ordinary Time', novus_ordo_rank: 'Feria', novus_ordo_color: 'green',
        vetus_ordo_season: 'Time after Pentecost', vetus_ordo_feast: 'Our Lord Jesus Christ the King', vetus_ordo_rank: 'Duplex I Classis', vetus_ordo_color: 'white',
      },
      ...getSundayEntries(year),
    ];
  } catch (err) {
    console.error('[movableFeasts] Failed to compute liturgical days:', err);
    return [];
  }
}

export function getMovableSaints(year) {
  try {
    const easter = computeEaster(year);
    const advent1 = firstSundayOfAdvent(year);
    const christKingNO = addDays(advent1, -7);

    return [
      {
        id: `s-ashwed-${year}`,
        name: 'Ash Wednesday',
        feast_date: toMMDD(addDays(easter, -46)),
        birth_year: '', death_year: '',
        biography: `Ash Wednesday marks the beginning of Lent — the forty days of fasting, prayer, and almsgiving that prepare the Church for Easter. The name comes from the practice of marking foreheads with ashes in the sign of the cross, formed by burning the palms from the previous year's Palm Sunday.\n\nThe words at the imposition of ashes come from Scripture: "Remember that you are dust, and to dust you shall return" (Genesis 3:19) — or: "Repent, and believe in the Gospel." Both carry the same message: we are mortal, and we are called to conversion.\n\nLent recalls the forty years Israel wandered in the desert and the forty days Jesus fasted before his public ministry. The Church enters this season not with gloom but with hope — for the dust that returns to earth will also be raised up. The ashes are a beginning, not an ending.`,
        quote: `Yet even now, says the Lord, return to me with all your heart, with fasting, with weeping, and with mourning. (Joel 2:12)`,
        prayer: `Grant, O Lord, that we may begin with holy fasting this campaign of Christian service, so that, as we take up battle against spiritual evils, we may be armed with weapons of self-restraint. Through Christ our Lord. Amen.`,
        reflection: `The ashes say two things at once: you are a sinner, and you are beloved. God does not mark us with ashes to condemn us but to invite us home. What does Lent mean to you — a burden or an opportunity?`,
        patron_of: 'The beginning of Lent', canonization_year: '', virtue: 'Repentance', image_url: '',
        quote_es: `Con todo, incluso ahora, dice el Señor, volveos a mí con todo vuestro corazón, con ayuno, llanto y luto. (Joel 2:12)`,
        prayer_es: `Concede, Señor, que iniciemos con el santo ayuno esta campaña de servicio cristiano, para que, tomando las armas contra los espíritus del mal, nos armemos con el poder de la moderación. Por Cristo nuestro Señor. Amén.`,
        reflection_es: `Las cenizas dicen dos cosas a la vez: eres pecador, y eres amado. Dios no nos marca con cenizas para condenarnos, sino para invitarnos a volver a Él. ¿Qué significa para ti la Cuaresma — una carga o una oportunidad?`,
        biography_es: `El Miércoles de Ceniza marca el inicio de la Cuaresma — los cuarenta días de ayuno, oración y limosna que preparan a la Iglesia para la Pascua. El nombre proviene de la práctica de marcar las frentes con cenizas en forma de cruz, formadas quemando los ramos del Domingo de Ramos del año anterior.\n\nLas palabras de la imposición de cenizas vienen de la Escritura: "Recuerda que eres polvo y al polvo volverás" (Génesis 3:19) — o: "Arrepiéntete y cree en el Evangelio." Ambas llevan el mismo mensaje: somos mortales y estamos llamados a la conversión.\n\nLa Cuaresma recuerda los cuarenta años que Israel caminó por el desierto y los cuarenta días que Jesús ayunó antes de su ministerio público. La Iglesia entra en esta estación no con tristeza sino con esperanza — porque el polvo que vuelve a la tierra también resucitará.`,
      },
      {
        id: `s-palmsunday-${year}`,
        name: 'Palm Sunday',
        feast_date: toMMDD(addDays(easter, -7)),
        birth_year: '', death_year: '',
        biography: `Palm Sunday opens Holy Week with a striking contradiction. Crowds wave palm branches and shout "Hosanna to the Son of David!" — a royal acclamation. Jesus enters not on a warhorse but on a donkey, fulfilling Zechariah's prophecy: "See, your king comes to you, humble, and riding on a donkey."\n\nWithin a week, many of these same voices would cry "Crucify him!" The liturgy holds both in tension: the Mass of Palm Sunday begins with a joyful procession and ends with the full reading of the Passion narrative. We are invited to sit with that discomfort — to ask which crowd we belong to.\n\nThe palms blessed today are kept through the year; in many communities they are burned the following Ash Wednesday to make the ashes that begin the next Lent — a beautiful sign of the cycle of grace.`,
        quote: `Hosanna to the Son of David! Blessed is he who comes in the name of the Lord! (Matthew 21:9)`,
        prayer: `Almighty ever-living God, who as Christ entered Jerusalem in triumph filled the Church with the spirit of praise, grant that through him we may come at last to the heavenly Jerusalem. Through Christ our Lord. Amen.`,
        reflection: `The crowd praised Jesus when it suited them and abandoned him when it cost them. Is your faith more like the palms — bright at the start of the week — or more like the cross — faithful to the end?`,
        patron_of: 'The beginning of Holy Week', canonization_year: '', virtue: 'Faithfulness', image_url: '',
        quote_es: `¡Hosanna al Hijo de David! ¡Bendito el que viene en nombre del Señor! (Mateo 21:9)`,
        prayer_es: `Dios todopoderoso y eterno, que al entrar Cristo en Jerusalén en triunfo llenaste a la Iglesia del espíritu de alabanza, concede que por él lleguemos al fin a la Jerusalén celestial. Por Cristo nuestro Señor. Amén.`,
        reflection_es: `La multitud alabó a Jesús cuando les convenía y le abandonó cuando les costó algo. ¿Tu fe se parece más a los ramos — brillante al comienzo de la semana — o más a la Cruz — fiel hasta el final?`,
        biography_es: `El Domingo de Ramos abre la Semana Santa con una llamativa contradicción. Las multitudes agitan ramos de palma y gritan "¡Hosanna al Hijo de David!" — una aclamación real. Jesús entra no en un caballo de guerra sino en un burro, cumpliendo la profecía de Zacarías: "Mira, tu rey viene a ti, humilde, montado en un burro".\n\nEn menos de una semana, muchas de esas mismas voces gritarían "¡Crucifícalo!" La liturgia sostiene ambas realidades en tensión: la Misa del Domingo de Ramos comienza con una procesión jubilosa y termina con la lectura completa del relato de la Pasión. Se nos invita a permanecer en ese malestar.\n\nLos ramos bendecidos hoy se conservan durante el año; en muchas comunidades se queman el Miércoles de Ceniza siguiente para hacer las cenizas que comienzan la próxima Cuaresma — un hermoso signo del ciclo de la gracia.`,
      },
      {
        id: `s-holythursday-${year}`,
        name: 'Holy Thursday',
        feast_date: toMMDD(addDays(easter, -3)),
        birth_year: '', death_year: '',
        biography: `On Holy Thursday evening the Church commemorates three of the most significant acts of Jesus' earthly ministry, all of which took place at the Last Supper in the upper room.\n\nFirst, Jesus washed his disciples' feet — a task reserved for the lowest servant — and commanded them: "If I, your Lord and Teacher, have washed your feet, you also ought to wash one another's feet." He showed that greatness in the Kingdom is measured by service.\n\nSecond, he took bread, blessed it, broke it, and said: "This is my body, which is given for you. Do this in memory of me." And over the cup: "This is the new covenant in my blood." The Eucharist was instituted. Third, he charged the Apostles with the continuation of his sacrificial offering — the institution of the priesthood. The Mass ends in silence, the altar stripped bare, as the Church begins her vigil.`,
        quote: `Do this in memory of me. (Luke 22:19)`,
        prayer: `O God, who have called us to participate in this most sacred Supper, grant that we may draw from so great a mystery the fullness of charity and of life. Through Christ our Lord. Amen.`,
        reflection: `At the Last Supper, Jesus gave us the Eucharist and washed feet — body and service inseparable. Which is easier for you: receiving him in worship, or imitating him in service?`,
        patron_of: 'The Institution of the Eucharist and the Priesthood', canonization_year: '', virtue: 'Love', image_url: '',
        quote_es: `Haced esto en memoria mía. (Lucas 22:19)`,
        prayer_es: `Oh Dios, que nos has llamado a participar en esta santísima Cena, concede que saquemos de tan grande misterio la plenitud de la caridad y de la vida. Por Cristo nuestro Señor. Amén.`,
        reflection_es: `En la Última Cena, Jesús nos dio la Eucaristía y lavó los pies — cuerpo y servicio inseparables. ¿Cuál te resulta más fácil: recibirle en la adoración o imitarle en el servicio?`,
        biography_es: `El Jueves Santo celebra tres de los actos más significativos del ministerio terreno de Jesús, ocurridos todos en el Cenáculo durante la Última Cena.\n\nPrimero, lavó los pies de sus discípulos — tarea reservada al más humilde de los siervos — y les mandó: "Si yo, el Señor y el Maestro, os he lavado los pies, también vosotros debéis lavaros los pies unos a otros." Demostró que la grandeza en el Reino se mide por el servicio.\n\nSegundo, tomó el pan, lo bendijo, lo partió y dijo: "Esto es mi cuerpo, que se entrega por vosotros. Haced esto en memoria mía." Y sobre el cáliz: "Esta es la nueva alianza en mi sangre." Fue instituida la Eucaristía. La Misa termina en silencio, el altar desnudo, mientras la Iglesia comienza su vigilia.`,
      },
      {
        id: `s-goodfriday-${year}`,
        name: 'Good Friday',
        feast_date: toMMDD(addDays(easter, -2)),
        birth_year: '', death_year: '',
        biography: `Good Friday commemorates the Passion and Death of Jesus Christ on the Cross at Golgotha, outside Jerusalem. It is called "Good" with the deep Christian conviction that what looked like utter defeat was in fact the decisive victory of love over sin and death.\n\nThe liturgy of Good Friday is unlike any other. There is no Mass. Instead, the Church reads the Passion according to John in full, prays the ancient Solemn Intercessions for the whole world, venerates the Cross, and receives communion from the reserved Sacrament consecrated the night before.\n\nAmong Jesus' last words: "Father, forgive them, for they know not what they do." "I thirst." "It is finished." "Father, into your hands I commend my spirit." The Greek word tetelestai — "it is finished" — was also stamped on a paid debt. Jesus declared the debt paid in full. The tabernacle is empty. The altar is bare. We wait.`,
        quote: `Father, into your hands I commend my spirit. (Luke 23:46)`,
        prayer: `Lord Jesus Christ, who for our sake endured the torment of the cross, grant us the grace to unite our own sufferings to yours, so that through your death we may come to the glory of your resurrection. Amen.`,
        reflection: `Is there something in your life — guilt, shame, a wound — that you have not yet brought to the foot of the Cross? "It is finished" means the debt is already paid. What would it mean to believe that today?`,
        patron_of: 'The Passion and Death of the Lord', canonization_year: '', virtue: 'Sacrifice', image_url: '',
        quote_es: `Padre, en tus manos encomiendo mi espíritu. (Lucas 23:46)`,
        prayer_es: `Señor Jesucristo, que por nosotros sufriste el tormento de la Cruz, concédenos la gracia de unir nuestros propios sufrimientos a los tuyos, para que por tu muerte lleguemos a la gloria de tu Resurrección. Amén.`,
        reflection_es: `¿Hay algo en tu vida — culpa, vergüenza, una herida — que todavía no has traído al pie de la Cruz? "Todo está cumplido" significa que la deuda ya está pagada. ¿Qué significaría creer eso hoy?`,
        biography_es: `El Viernes Santo conmemora la Pasión y Muerte de Jesucristo en la Cruz en el Gólgota, a las afueras de Jerusalén. Se llama "Bueno" (en la tradición anglosajona) con la profunda convicción cristiana de que lo que parecía una derrota total fue en realidad la victoria decisiva del amor sobre el pecado y la muerte.\n\nLa liturgia del Viernes Santo no tiene igual. No hay Misa. En cambio, la Iglesia lee íntegramente la Pasión según Juan, reza las antiguas Intercesiones Solemnes por todo el mundo, venera la Cruz y distribuye la comunión del Sacramento reservado la noche anterior.\n\nEntre las últimas palabras de Jesús: "Padre, perdónalos, porque no saben lo que hacen." "Tengo sed." "Todo está cumplido." "Padre, en tus manos encomiendo mi espíritu." El tabernáculo está vacío. El altar está desnudo. Esperamos.`,
      },
      {
        id: `s-holysaturday-${year}`,
        name: 'Holy Saturday',
        feast_date: toMMDD(addDays(easter, -1)),
        birth_year: '', death_year: '',
        biography: `Holy Saturday is the day of the Great Silence. Jesus lies in the tomb. The disciples are scattered. The stone is sealed. There is no daytime liturgy — the Church simply waits.\n\nIn the ancient tradition, Holy Saturday is associated with the Harrowing of Hell — Christ's descent among the dead to bring the souls of the righteous to paradise. The Byzantine liturgy sings: "The King of kings sleeps, but shall rise again." The icon of the Anastasis shows Christ bursting the doors of Hades and raising Adam and Eve by the wrists.\n\nAt nightfall, the Easter Vigil begins — the "mother of all vigils," as Augustine called it. A new fire is lit in the darkness. The Exsultet is sung: "This is the night when Christ broke the prison bars of death and rose victorious from the underworld." The long night of readings traces salvation history from creation to resurrection. Then the first Alleluia of Easter rings out.`,
        quote: `Where, O death, is your victory? Where, O death, is your sting? (1 Corinthians 15:55)`,
        prayer: `O God, who illumine this most sacred night with the glory of the Lord's Resurrection, stir up in your Church a spirit of adoption so that, renewed in body and mind, we may render you undivided service. Through Christ our Lord. Amen.`,
        reflection: `Holy Saturday is the day of waiting — neither the Cross nor the Resurrection, but the in-between. Have you been in a Holy Saturday moment in your own life, where faith feels silent and you simply have to wait? What sustained you?`,
        patron_of: 'The day of holy waiting', canonization_year: '', virtue: 'Hope', image_url: '',
        quote_es: `¿Dónde está, oh muerte, tu victoria? ¿Dónde está, oh muerte, tu aguijón? (1 Corintios 15:55)`,
        prayer_es: `Oh Dios, que iluminas esta noche santísima con la gloria de la Resurrección del Señor, aviva en tu Iglesia el espíritu de adopción para que, renovados en cuerpo y alma, te prestemos un servicio sin divisiones. Por Cristo nuestro Señor. Amén.`,
        reflection_es: `El Sábado Santo es el día de la espera — ni la Cruz ni la Resurrección, sino el tiempo intermedio. ¿Has vivido algún momento de "Sábado Santo" en tu propia vida, cuando la fe parece en silencio y solo puedes esperar? ¿Qué te sostuvo?`,
        biography_es: `El Sábado Santo es el día del Gran Silencio. Jesús yace en el sepulcro. Los discípulos están dispersos. La piedra está sellada. No hay liturgia diurna — la Iglesia simplemente espera.\n\nEn la tradición antigua, el Sábado Santo se asocia con el Descenso a los Infiernos — Cristo bajando entre los muertos para llevar las almas de los justos al paraíso. La liturgia bizantina canta: "El Rey de reyes duerme, pero resucitará."\n\nAl anochecer comienza la Vigilia Pascual — la "madre de todas las vigilias", como la llamó Agustín. Se enciende un fuego nuevo en la oscuridad. Se canta el Pregón Pascual (Exsultet): "Esta es la noche en que Cristo rompió los grilletes de la muerte y resucitó victorioso del inframundo." La larga noche de lecturas recorre la historia de la salvación. Entonces resuena el primer Aleluya de la Pascua.`,
      },
      {
        id: `s-easter-${year}`,
        name: 'Easter Sunday — Resurrection of the Lord',
        feast_date: toMMDD(easter),
        birth_year: '', death_year: '',
        biography: `Easter Sunday is the feast of feasts, the solemnity of solemnities — the day the Church celebrates the Resurrection of Jesus Christ from the dead. All other feasts derive their meaning from this one. As Paul wrote: "If Christ has not been raised, your faith is futile." But Christ has been raised.\n\nThe Resurrection is not a resuscitation — Jesus did not merely return to ordinary life. He passed through death into a new and glorified existence: the same body that was crucified, now bearing the wounds as trophies and no longer subject to death. He appeared to Mary Magdalene, to the Apostles, to over five hundred people at once (1 Corinthians 15:6).\n\nFor fifty days following Easter, the Church sings Alleluia — a Hebrew acclamation meaning "Praise the Lord." The word had been largely silent during Lent, and its return is itself a proclamation. Heaven and earth are reconciled. Death is defeated. The tomb is empty. Alleluia.`,
        quote: `He is not here; he has risen, just as he said. (Matthew 28:6)`,
        prayer: `O God, who on this day, through your Only Begotten Son, have conquered death and unlocked for us the path to eternity, grant that we who celebrate the Resurrection of the Lord may, through the renewal brought by your Spirit, rise up in the light of life. Amen.`,
        reflection: `The first witnesses of the Resurrection were afraid. The disciples on the road to Emmaus did not recognize him. Peter had to run to the empty tomb to believe. Faith in the Resurrection is not self-evident — it is a gift. Have you asked for that gift today?`,
        patron_of: 'All of redeemed humanity', canonization_year: '', virtue: 'Hope', image_url: '',
        quote_es: `No está aquí; ha resucitado, tal como dijo. (Mateo 28:6)`,
        prayer_es: `Oh Dios, que en este día, por tu Hijo Unigénito, has vencido a la muerte y nos has abierto el camino a la eternidad, concede que quienes celebramos la Resurrección del Señor resucitemos a la luz de la vida. Amén.`,
        reflection_es: `Los primeros testigos de la Resurrección tenían miedo. Los discípulos de Emaús no lo reconocieron. Pedro tuvo que correr al sepulcro vacío para creer. La fe en la Resurrección no es evidente por sí misma — es un don. ¿Has pedido ese don hoy?`,
        biography_es: `El Domingo de Pascua es la fiesta de las fiestas — el día en que la Iglesia celebra la Resurrección de Jesucristo de entre los muertos. Como escribió Pablo: "Si Cristo no ha resucitado, vuestra fe es vana." Pero Cristo ha resucitado.\n\nLa Resurrección no es una resucitación. Jesús pasó a través de la muerte hacia una existencia nueva y glorificada: el mismo cuerpo crucificado, llevando ahora las heridas como trofeos. Se apareció a María Magdalena, a los Apóstoles, y a más de quinientas personas a la vez.\n\nDurante cincuenta días después de Pascua, la Iglesia canta Aleluya — que significa "Alabad al Señor." El mundo está reconciliado. La muerte está vencida. El sepulcro está vacío. Aleluya.`,
      },
      {
        id: `s-divinemercysunday-${year}`,
        name: 'Divine Mercy Sunday',
        feast_date: toMMDD(addDays(easter, 7)),
        birth_year: '', death_year: '',
        biography: `Divine Mercy Sunday, the Second Sunday of Easter, has its origins in the visions of Saint Faustina Kowalska (1905–1938), a Polish nun who recorded her mystical encounters with Jesus in her Diary. Jesus told her: "I desire that the Feast of Mercy be a refuge and shelter for all souls, and especially for poor sinners."\n\nHe asked for an image depicting him with two rays of light — one red (blood) and one white (water) — streaming from his pierced Heart, with the inscription "Jesus, I trust in You." He also revealed the Chaplet of Divine Mercy.\n\nPope John Paul II established Divine Mercy Sunday for the universal Church in 2000, the year he canonized Saint Faustina. It falls within the octave of Easter as a proclamation that the mercy won on the Cross is offered without limit to every soul.`,
        quote: `Jesus, I trust in you. (Saint Faustina Kowalska)`,
        prayer: `Eternal Father, I offer you the Body and Blood, Soul and Divinity of your dearly beloved Son, our Lord Jesus Christ, in atonement for our sins and those of the whole world. For the sake of his sorrowful Passion, have mercy on us and on the whole world. Amen.`,
        reflection: `Jesus told Faustina that the soul who approaches Mercy finds the greatest mercy. Are there areas of your life where you find it hard to believe God can forgive you? The feast says: bring those areas precisely here.`,
        patron_of: 'All sinners; the whole world', canonization_year: '', virtue: 'Mercy', image_url: '',
        quote_es: `Jesús, en Ti confío. (Santa Faustina Kowalska)`,
        prayer_es: `Padre Eterno, te ofrezco el Cuerpo y la Sangre, el Alma y la Divinidad de tu amadísimo Hijo, nuestro Señor Jesucristo, en expiación de nuestros pecados y los del mundo entero. Por su dolorosa Pasión, ten misericordia de nosotros y del mundo entero. Amén.`,
        reflection_es: `Jesús le dijo a Faustina que el alma que se acerca a la Misericordia encuentra la mayor misericordia. ¿Hay áreas de tu vida en las que te cuesta creer que Dios puede perdonarte? Esta fiesta dice: trae precisamente esas áreas aquí.`,
        biography_es: `El Domingo de la Divina Misericordia, el Segundo Domingo de Pascua, tiene sus orígenes en las visiones de Santa Faustina Kowalska (1905-1938), una monja polaca que recogió sus encuentros místicos con Jesús en su Diario. Jesús le dijo: "Deseo que la Fiesta de la Misericordia sea un refugio y amparo para todas las almas, y en especial para los pobres pecadores".\n\nLe pidió una imagen que le representara con dos rayos de luz — uno rojo (sangre) y uno blanco (agua) — emanando de su Corazón traspasado, con la inscripción "Jesús, en Ti confío." También reveló la Coronilla de la Divina Misericordia.\n\nEl Papa Juan Pablo II estableció el Domingo de la Divina Misericordia para la Iglesia universal en el año 2000, el mismo año en que canonizó a Santa Faustina. Cae dentro del octavario de Pascua como proclamación de que la misericordia ganada en la Cruz se ofrece sin límites a toda alma.`,
      },
      {
        id: `s-ascension-${year}`,
        name: 'Ascension of the Lord',
        feast_date: toMMDD(addDays(easter, 39)),
        birth_year: '', death_year: '',
        biography: `Forty days after Easter, Jesus led his disciples to the Mount of Olives, gave them the Great Commission — "Go and make disciples of all nations" — promised the coming of the Holy Spirit, and was lifted up into heaven. A cloud received him out of their sight.\n\nTwo angels appeared and said: "Men of Galilee, why do you stand looking into heaven? This Jesus, who was taken up from you, will come in the same way as you saw him go." The Ascension is not an abandonment — it is the beginning of a new kind of presence. Jesus is now present in glory at the right hand of the Father, from where he sends the Spirit and intercedes for us.\n\nThe Ascension is also the exaltation of human nature. When Jesus ascended, he took our humanity with him into the life of the Trinity. As the Preface says: "He ascended not to distance himself from our lowly state, but that we, his members, might be confident of following where he, our Head, has gone before."`,
        quote: `I am with you always, to the end of the age. (Matthew 28:20)`,
        prayer: `Grant, almighty God, that we may rejoice in the Ascension of your Son and, as faithful members whose Head has gone before, may in hope already dwell in the heavenly realms. Through Christ our Lord. Amen.`,
        reflection: `The disciples were told not to stand staring into heaven — there was a mission to fulfill. The Ascension gives hope but also a task: "go into all the world." How are you living out that mission in your ordinary life?`,
        patron_of: 'All humanity in its hope of heaven', canonization_year: '', virtue: 'Hope', image_url: '',
        quote_es: `Yo estoy con vosotros todos los días, hasta el fin del mundo. (Mateo 28:20)`,
        prayer_es: `Concede, Dios todopoderoso, que nos alegremos en la Ascensión de tu Hijo y que, como miembros fieles cuya Cabeza se ha adelantado, habitemos ya en esperanza en las regiones celestiales. Por Cristo nuestro Señor. Amén.`,
        reflection_es: `A los discípulos se les dijo que no se quedaran mirando al cielo — había una misión que cumplir. La Ascensión da esperanza pero también una tarea: "Id por todo el mundo." ¿Cómo estás viviendo esa misión en tu vida ordinaria?`,
        biography_es: `Cuarenta días después de Pascua, Jesús llevó a sus discípulos al Monte de los Olivos, les dio la Gran Comisión — "Id y haced discípulos a todas las naciones" — prometió la venida del Espíritu Santo y fue elevado al cielo. Una nube le recibió y lo ocultó a sus ojos.\n\nDos ángeles aparecieron y dijeron: "Hombres de Galilea, ¿por qué estáis mirando al cielo? Este Jesús que ha sido llevado de entre vosotros al cielo, vendrá de la misma manera." La Ascensión no es un abandono — es el comienzo de una nueva clase de presencia. Jesús está ahora presente en gloria a la derecha del Padre, desde donde envía el Espíritu e intercede por nosotros.\n\nLa Ascensión es también la exaltación de la naturaleza humana. Cuando Jesús ascendió, llevó nuestra humanidad consigo a la vida de la Trinidad. Como dice el Prefacio: "Ascendió no para alejarse de nuestra condición humilde, sino para que nosotros, sus miembros, confiáramos en seguirle donde Él, nuestra Cabeza, ha ido antes."`,
      },
      {
        id: `s-pentecost-${year}`,
        name: 'Pentecost Sunday',
        feast_date: toMMDD(addDays(easter, 49)),
        birth_year: '', death_year: '',
        biography: `Fifty days after Easter, the disciples were gathered in the upper room when suddenly a sound like a mighty wind filled the house and tongues of fire rested on each one of them. They were all filled with the Holy Spirit and began to speak in other languages — Jews from every nation heard them in their own tongue proclaiming the mighty works of God.\n\nPeter stood up and preached — Peter, who had denied Jesus three times — and that day three thousand people were baptized. Pentecost is often called the birthday of the Church: the moment when frightened disciples became the bold witnesses Jesus had promised.\n\nIn the sequence Veni Sancte Spiritus ("Come, Holy Spirit"), sung at Pentecost Mass, the Spirit is called: "Father of the poor, Giver of gifts, Light of hearts. Best of consolers, sweet Guest of the soul, sweet Refreshment." Pentecost is not the end of the Easter story — it is what Easter makes possible.`,
        quote: `Come, Holy Spirit, fill the hearts of your faithful, and kindle in them the fire of your love.`,
        prayer: `O God, who by the mystery of today's great feast sanctify your whole Church in every people and nation, pour out, we pray, the gifts of the Holy Spirit across the face of the earth. Through Christ our Lord. Amen.`,
        reflection: `The Spirit came as wind and fire, then as courage in Peter's sermon. The gifts of Pentecost are not just for dramatic moments — they are for ordinary faithfulness. Which gift of the Spirit do you most need today?`,
        patron_of: 'The universal Church', canonization_year: '', virtue: 'Wisdom', image_url: '',
        quote_es: `Ven, Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor.`,
        prayer_es: `Oh Dios, que por el misterio de esta gran fiesta santificas a toda tu Iglesia en todos los pueblos, derrama, te rogamos, los dones del Espíritu Santo sobre la faz de la tierra. Por Jesucristo, nuestro Señor. Amén.`,
        reflection_es: `El Espíritu vino como viento y fuego, luego como valentía en el sermón de Pedro. Los dones de Pentecostés son para la fidelidad ordinaria, no solo para los momentos dramáticos. ¿Qué don del Espíritu necesitas más hoy?`,
        biography_es: `Cincuenta días después de Pascua, los discípulos estaban reunidos cuando un sonido como de viento recio llenó la casa y lenguas de fuego reposaron sobre cada uno. Todos fueron llenos del Espíritu Santo y comenzaron a hablar en otras lenguas.\n\nPedro se puso de pie y predicó — Pedro, quien había negado a Jesús — y ese día fueron bautizadas tres mil personas. Pentecostés es el cumpleaños de la Iglesia: el momento en que los discípulos atemorizados se convirtieron en valientes testigos.\n\nEl Espíritu es llamado en la liturgia: "Padre de los pobres, dador de dones, luz de los corazones, dulce huésped del alma." Pentecostés no es el fin de la historia de Pascua — es lo que Pascua hace posible.`,
      },
      {
        id: `s-trinitysunday-${year}`,
        name: 'The Most Holy Trinity',
        feast_date: toMMDD(addDays(easter, 56)),
        birth_year: '', death_year: '',
        biography: `Trinity Sunday, celebrated the Sunday after Pentecost, honors the triune God — Father, Son, and Holy Spirit. It is the only major feast that celebrates not an event in salvation history but the inner mystery of who God is.\n\nThe doctrine of the Trinity was defined at the Council of Nicaea (325) and Constantinople (381) against the Arian heresy, which denied the full divinity of the Son. But the Trinity is not merely a doctrine to be defended — it is the inner life of God that Christians are invited to share. Jesus prays that his followers "may be one as we are one" (John 17:22).\n\nBaptism is "in the name of the Father and of the Son and of the Holy Spirit." Every prayer ends with a Trinitarian doxology. The Trinity is not a puzzle to be solved but a love to be entered — three Persons in perfect, eternal self-gift, into which human beings are drawn.`,
        quote: `Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit. (Matthew 28:19)`,
        prayer: `God our Father, who by sending into the world the Word of Truth and the Spirit of Sanctification made known to the human race your wondrous mystery, grant that in professing the true faith, we may adore your Unity, powerful in majesty. Through Christ our Lord. Amen.`,
        reflection: `The Trinity is three Persons in perfect, eternal love — and we are made in that image. What does it mean for human relationships — marriage, family, friendship — that love-in-communion is the very image of God?`,
        patron_of: 'The mystery of the Triune God', canonization_year: '', virtue: 'Faith', image_url: '',
        quote_es: `Id y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre y del Hijo y del Espíritu Santo. (Mateo 28:19)`,
        prayer_es: `Dios Padre nuestro, que enviando al mundo el Verbo de la Verdad y el Espíritu de Santificación diste a conocer al género humano tu admirable misterio, concede que en la profesión de la verdadera fe reconozcamos la gloria de la Trinidad eterna. Por Cristo nuestro Señor. Amén.`,
        reflection_es: `La Trinidad son tres Personas en eterno amor perfecto — y somos creados a esa imagen. ¿Qué significa para las relaciones humanas — el matrimonio, la familia, la amistad — que el amor en comunión es la misma imagen de Dios?`,
        biography_es: `El Domingo de la Santísima Trinidad, celebrado el domingo después de Pentecostés, honra al Dios trino — Padre, Hijo y Espíritu Santo. Es la única fiesta mayor que celebra no un evento de la historia de la salvación sino el misterio íntimo de quién es Dios.\n\nLa doctrina de la Trinidad fue definida en el Concilio de Nicea (325) y Constantinopla (381) contra la herejía arriana, que negaba la plena divinidad del Hijo. Pero la Trinidad no es solo una doctrina que defender — es la vida interior de Dios a la que los cristianos están invitados a participar. Jesús ora para que sus seguidores "sean uno, como nosotros somos uno" (Juan 17:22).\n\nEl bautismo es "en el nombre del Padre y del Hijo y del Espíritu Santo." Toda oración termina con una doxología trinitaria. La Trinidad no es un enigma que resolver sino un amor al que entrar — tres Personas en eterna y perfecta entrega mutua, a la que los seres humanos son atraídos.`,
      },
      {
        id: `s-corpuschristi-${year}`,
        name: 'Corpus Christi — Most Holy Body and Blood of Christ',
        feast_date: toMMDD(addDays(easter, 60)),
        birth_year: '', death_year: '',
        biography: `Corpus Christi — Latin for "Body of Christ" — celebrates the Real Presence of Jesus Christ in the Eucharist: his Body, Blood, Soul, and Divinity under the appearances of bread and wine. Instituted in 1264 by Pope Urban IV, it was established at the urging of Saint Juliana of Liège, who had a vision of the moon with a dark spot representing the missing feast.\n\nSaint Thomas Aquinas composed the Office and Mass for the feast, including hymns that remain among the greatest in Christian liturgy: Pange Lingua, Tantum Ergo, O Salutaris Hostia, and Panis Angelicus. The feast falls sixty days after Easter — always a Thursday in the traditional calendar, in honor of the Thursday the Eucharist was instituted.\n\nThe traditional observance includes a solemn procession through the streets with the Blessed Sacrament in a monstrance, the faithful following with candles and flowers. It is a public act of adoration — love made visible.`,
        quote: `I am the living bread that came down from heaven. Whoever eats this bread will live forever. (John 6:51)`,
        prayer: `O God, who in this wonderful Sacrament have left us a memorial of your Passion, grant us so to revere the sacred mysteries of your Body and Blood that we may always experience in ourselves the fruits of your redemption. Through Christ our Lord. Amen.`,
        reflection: `"He who eats my flesh and drinks my blood abides in me, and I in him." The Eucharist is not a symbol of union with Christ — it is the union. How do you prepare for, receive, and give thanks after Holy Communion?`,
        patron_of: 'The Eucharist; all who receive Holy Communion', canonization_year: '', virtue: 'Adoration', image_url: '',
        quote_es: `Yo soy el pan vivo que ha bajado del cielo. El que coma de este pan vivirá para siempre. (Juan 6:51)`,
        prayer_es: `Oh Dios, que en este maravilloso Sacramento nos dejaste el memorial de tu Pasión, concédenos venerar de tal modo los sagrados misterios de tu Cuerpo y de tu Sangre que experimentemos siempre en nosotros el fruto de tu redención. Por Cristo nuestro Señor. Amén.`,
        reflection_es: `"El que come mi carne y bebe mi sangre permanece en mí y yo en él." La Eucaristía no es un símbolo de unión con Cristo — es la unión. ¿Cómo te preparas, recibes y das gracias después de la Sagrada Comunión?`,
        biography_es: `Corpus Christi — en latín "Cuerpo de Cristo" — celebra la Presencia Real de Jesucristo en la Eucaristía: su Cuerpo, Sangre, Alma y Divinidad bajo las apariencias del pan y el vino. Instituida en 1264 por el Papa Urbano IV, fue establecida a instancias de Santa Juliana de Lieja, quien tuvo una visión de la luna con una mancha oscura que representaba la fiesta que faltaba.\n\nSanto Tomás de Aquino compuso el Oficio y la Misa de la fiesta, incluidos himnos que siguen siendo de los más grandes de la liturgia cristiana: Pange Lingua, Tantum Ergo, O Salutaris Hostia y Panis Angelicus. La fiesta cae sesenta días después de Pascua — siempre un jueves en el calendario tradicional, en honor al Jueves en que fue instituida la Eucaristía.\n\nLa celebración tradicional incluye una solemne procesión por las calles con el Santísimo Sacramento en la custodia, y los fieles siguiendo con velas y flores. Es un acto público de adoración — el amor hecho visible.`,
      },
      {
        id: `s-sacredheart-${year}`,
        name: 'Most Sacred Heart of Jesus',
        feast_date: toMMDD(addDays(easter, 68)),
        birth_year: '', death_year: '',
        biography: `The feast of the Sacred Heart, celebrated on the Friday after Corpus Christi, honors the physical Heart of Jesus as the symbol and source of his infinite love for humanity. The devotion was formalized through the visions of Saint Margaret Mary Alacoque (1647–1690), a French Visitandine nun in Paray-le-Monial.\n\nJesus appeared to her showing his Heart — surrounded by thorns representing sin, crowned with a cross, radiating light — and said: "Behold this Heart which has so loved men that it has spared nothing, even to exhausting and consuming itself, in order to testify to its love." He asked for reparation for ingratitude and indifference.\n\nPope Leo XIII consecrated all of humanity to the Sacred Heart in 1899. The feast, originally granted to France and Poland, was extended to the universal Church by Pope Clement XIII in 1765. It is one of the most beloved devotions in the history of the Church.`,
        quote: `Behold this Heart which has so loved men and has been so little loved in return.`,
        prayer: `Most Sacred Heart of Jesus, I place my trust in you. May I live in your love, die in your love, and be united with you forever in your eternal kingdom. Amen.`,
        reflection: `The Sacred Heart devotion meditates on God's love being rejected and wounded — and yet persisting. Where in your own life do you find it hardest to believe that God's love persists despite your failures?`,
        patron_of: 'All of humanity; the Church; priests', canonization_year: '', virtue: 'Love', image_url: '',
        quote_es: `He aquí este Corazón que tanto ha amado a los hombres y que tan poco ha sido amado en correspondencia.`,
        prayer_es: `Sagrado Corazón de Jesús, en Vos confío. Que viva en vuestro amor, muera en vuestro amor y sea unido a Vos para siempre en vuestro reino eterno. Amén.`,
        reflection_es: `La devoción al Sagrado Corazón medita en el amor de Dios rechazado y herido — y que sin embargo persiste. ¿En qué parte de tu propia vida te resulta más difícil creer que el amor de Dios persiste a pesar de tus fallos?`,
        biography_es: `La fiesta del Sagrado Corazón, celebrada el viernes después de Corpus Christi, honra el Corazón físico de Jesús como símbolo y fuente de su amor infinito por la humanidad. La devoción se formalizó a través de las visiones de Santa Margarita María Alacoque (1647–1690), una monja visitandina francesa en Paray-le-Monial.\n\nJesús se le apareció mostrando su Corazón — rodeado de espinas que representan el pecado, coronado con una cruz, irradiando luz — y le dijo: "He aquí este Corazón que tanto ha amado a los hombres, que nada se ha reservado, hasta consumirse y agotarse, para testimoniarles su amor." Le pidió reparación por la ingratitud y la indiferencia.\n\nEl Papa León XIII consagró toda la humanidad al Sagrado Corazón en 1899. La fiesta, originalmente concedida a Francia y Polonia, fue extendida a la Iglesia universal por el Papa Clemente XIII en 1765. Es una de las devociones más amadas de la historia de la Iglesia.`,
      },
      {
        id: `s-christking-${year}`,
        name: 'Our Lord Jesus Christ, King of the Universe',
        feast_date: toMMDD(christKingNO),
        birth_year: '', death_year: '',
        biography: `The feast of Christ the King was instituted by Pope Pius XI in 1925 with his encyclical Quas Primas, written in response to the rise of secularism, nationalism, and totalitarianism sweeping Europe. Against the claim of states and ideologies to absolute loyalty, Pius XI proclaimed: Jesus Christ is King — not of an earthly territory, but of all creation, all history, all human hearts.\n\nThe kingship of Christ is unlike any earthly kingship. When Pilate asked "Are you the King of the Jews?" Jesus replied: "My kingdom is not of this world." He reigns not by force but by truth and love. His throne was a cross; his crown was thorns; his scepter was the reed placed in his hand in mockery — and yet: "Every knee shall bow, in heaven and on earth and under the earth, and every tongue confess that Jesus Christ is Lord." (Philippians 2:10–11)\n\nIn the 1969 calendar, Pope Paul VI placed this feast on the final Sunday of the liturgical year — immediately before Advent — making it the climax of the entire year: all of salvation history culminates in the recognition that Christ reigns. The year ends here, and begins again with the hope of his coming.`,
        quote: `My kingdom is not of this world. (John 18:36)`,
        prayer: `Almighty ever-living God, whose will is to restore all things in your beloved Son, the King of the universe, grant that the whole creation, set free from slavery, may render your majesty service and ceaselessly praise you. Through Christ our Lord. Amen.`,
        reflection: `Christ the King rules not through power but through truth, love, and sacrifice. What would it mean to let that kind of kingship shape how you exercise authority or influence in your own life?`,
        patron_of: 'All of creation; rulers and governments', canonization_year: '', virtue: 'Justice', image_url: '',
        quote_es: `Mi reino no es de este mundo. (Juan 18:36)`,
        prayer_es: `Dios todopoderoso y eterno, cuya voluntad es restaurar todas las cosas en tu amado Hijo, el Rey del universo, concede que toda la creación, liberada de la esclavitud, preste servicio a tu majestad y te alabe sin cesar. Por Cristo nuestro Señor. Amén.`,
        reflection_es: `Cristo Rey reina no por el poder sino por la verdad, el amor y el sacrificio. ¿Qué significaría dejar que esa clase de realeza moldee la manera en que ejerces la autoridad o la influencia en tu propia vida?`,
        biography_es: `La fiesta de Cristo Rey fue instituida por el Papa Pío XI en 1925 con su encíclica Quas Primas, escrita en respuesta al auge del secularismo, el nacionalismo y el totalitarismo que arrasaban Europa. Frente a la pretensión de los estados e ideologías de exigir una lealtad absoluta, Pío XI proclamó: Jesucristo es Rey — no de un territorio terrenal, sino de toda la creación, toda la historia, todos los corazones humanos.\n\nLa realeza de Cristo no se parece a ninguna realeza terrenal. Cuando Pilato le preguntó "¿Eres tú el Rey de los judíos?", Jesús respondió: "Mi reino no es de este mundo." Reina no por la fuerza sino por la verdad y el amor. Su trono fue una Cruz; su corona, de espinas; su cetro, la caña que pusieron en su mano burlándose — y sin embargo: "Ante el nombre de Jesús se doble toda rodilla en el cielo, en la tierra y bajo la tierra." (Filipenses 2:10)\n\nEn el calendario de 1969, el Papa Pablo VI situó esta fiesta en el último domingo del año litúrgico — inmediatamente antes del Adviento — convirtiéndola en el clímax de todo el año: toda la historia de la salvación culmina en el reconocimiento de que Cristo reina.`,
      },
    ];
  } catch (err) {
    console.error('[movableFeasts] Failed to compute saints:', err);
    return [];
  }
}

/**
 * Given a fixed feast date (MM-DD) and a calendar year, return the correct
 * liturgical season for that year's Easter cycle. Returns null on error so
 * callers can fall back to the static value.
 */
export function computeSeason(mmdd, year, rite) {
  try {
    const [mm, dd] = mmdd.split('-').map(Number);
    const date = new Date(year, mm - 1, dd);
    const easter = computeEaster(year);
    const ashWed     = addDays(easter, -46);
    const palmSunday = addDays(easter, -7);
    const pentecost  = addDays(easter, 49);
    const advent1    = firstSundayOfAdvent(year);

    // Dec 25–31: Christmas takes priority over Advent
    if (mm === 12 && dd >= 25) return 'Christmas';

    // Advent (starts late Nov, ends Dec 24)
    if (date >= advent1) return 'Advent';

    // Day after Pentecost onward: Ordinary Time / Time after Pentecost
    if (date >= addDays(pentecost, 1)) {
      return rite === 'NO' ? 'Ordinary Time' : 'Time after Pentecost';
    }

    // Easter Sunday through Pentecost Sunday inclusive
    if (date >= easter) return 'Easter';

    // Palm Sunday through Holy Saturday
    if (date >= palmSunday) return 'Holy Week';

    // Ash Wednesday through Spy Wednesday
    if (date >= ashWed) return 'Lent';

    // VO only: Septuagesima pre-Lent season (63 days before Easter)
    if (rite === 'VO') {
      const septuagesima = addDays(easter, -63);
      if (date >= septuagesima) return 'Septuagesima';
      // Jan 14+ = Time after Epiphany; Jan 1–13 = Christmas octave
      if (mm > 1 || (mm === 1 && dd > 13)) return 'Time after Epiphany';
      return 'Christmas';
    }

    // NO: find Baptism of the Lord (first Sunday after Jan 6)
    const epiphanyDow = new Date(year, 0, 6).getDay();
    const baptism = epiphanyDow === 0
      ? new Date(year, 0, 13)   // Jan 6 is Sunday → Baptism is Jan 13
      : new Date(year, 0, 6 + (7 - epiphanyDow));
    if (date > baptism) return 'Ordinary Time';

    // NO: Jan 1 through Baptism of the Lord = Christmas season
    return 'Christmas';
  } catch {
    return null;
  }
}
