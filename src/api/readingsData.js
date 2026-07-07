import { format, addDays } from 'date-fns';

// Sunday (and major feast) Mass readings, keyed by full ISO date — unlike
// saints/liturgical data, readings can't be keyed MM-DD because the Novus Ordo
// lectionary cycle (A/B/C) and the movable calendar change them year to year.
//
// Each entry carries parallel `no` (Novus Ordo) and `vo` (Vetus Ordo, 1962
// Missal) blocks. Reading section labels live in the data (label/label_es)
// rather than translations.js because the two rites have different sections.
// `text_es` may be '' — the UI falls back to English (no Spanish source exists
// yet for the Vetus Ordo propers).
//
// Sources: NO — bible.usccb.org (NAB / Leccionario CEM, © USCCB/CEM, personal
// devotional use); VO — divinumofficium.com (1962 Missale Romanum).

export const SUNDAY_READINGS = [
  {
    id: 'r-2026-06-14',
    date: '2026-06-14',
    no: {
      title: 'Eleventh Sunday in Ordinary Time',
      title_es: 'XI Domingo Ordinario',
      lectionary: '91',
      cycle: 'A',
      source_url: 'https://bible.usccb.org/bible/readings/061426.cfm',
      source_url_es: 'https://bible.usccb.org/es/bible/lecturas/061426.cfm',
      source_name: 'USCCB',
      verse: 'The harvest is abundant but the laborers are few; so ask the master of the harvest to send out laborers for his harvest.',
      verse_es: 'La cosecha es mucha y los trabajadores, pocos. Rueguen, por lo tanto, al dueño de la mies que envíe trabajadores a sus campos.',
      verse_citation: 'Matthew 9:37-38',
      verse_citation_es: 'Mateo 9, 37-38',
      readings: [
        {
          label: 'Reading 1',
          label_es: 'Primera lectura',
          citation: 'Exodus 19:2-6a',
          citation_es: 'Éxodo 19, 2-6a',
          text: `In those days, the Israelites came to the desert of Sinai and pitched camp. While Israel was encamped here in front of the mountain, Moses went up the mountain to God. Then the LORD called to him and said, "Thus shall you say to the house of Jacob; tell the Israelites: You have seen for yourselves how I treated the Egyptians and how I bore you up on eagle wings and brought you here to myself. Therefore, if you hearken to my voice and keep my covenant, you shall be my special possession, dearer to me than all other people, though all the earth is mine. You shall be to me a kingdom of priests, a holy nation."`,
          text_es: `En aquellos días, el pueblo de Israel salió de Refidim, llegó al desierto del Sinaí y acampó frente al monte. Moisés subió al monte para hablar con Dios. El Señor lo llamó desde el monte y le dijo: "Esto dirás a la casa de Jacob, esto anunciarás a los hijos de Israel: 'Ustedes han visto cómo castigué a los egipcios y de qué manera los he levantado a ustedes sobre alas de águila y los he traído a mí. Ahora bien, si escuchan mi voz y guardan mi alianza, serán mi especial tesoro entre todos los pueblos, aunque toda la tierra es mía. Ustedes serán para mí un reino de sacerdotes y una nación consagrada'".`,
        },
        {
          label: 'Responsorial Psalm',
          label_es: 'Salmo responsorial',
          citation: 'Psalm 100:1-2, 3, 5',
          citation_es: 'Salmo 99, 2. 3. 5',
          text: `R. We are his people: the sheep of his flock.\n\nSing joyfully to the LORD, all you lands;\nserve the LORD with gladness;\ncome before him with joyful song.\nR. We are his people: the sheep of his flock.\n\nKnow that the LORD is God;\nhe made us, his we are;\nhis people, the flock he tends.\nR. We are his people: the sheep of his flock.\n\nThe LORD is good:\nhis kindness endures forever,\nand his faithfulness to all generations.\nR. We are his people: the sheep of his flock.`,
          text_es: `R. El Señor es nuestro Dios y nosotros su pueblo.\n\nAlabemos a Dios todos los hombres,\nsirvamos al Señor con alegría\ny con júbilo entremos en su templo.\nR. El Señor es nuestro Dios y nosotros su pueblo.\n\nReconozcamos que el Señor es Dios,\nque él fue quien nos hizo y somos suyos,\nque somos su pueblo y su rebaño.\nR. El Señor es nuestro Dios y nosotros su pueblo.\n\nPorque el Señor es bueno, bendigámoslo,\nporque es eterna su misericordia\ny su fidelidad nunca se acaba.\nR. El Señor es nuestro Dios y nosotros su pueblo.`,
        },
        {
          label: 'Reading 2',
          label_es: 'Segunda lectura',
          citation: 'Romans 5:6-11',
          citation_es: 'Romanos 5, 6-11',
          text: `Brothers and sisters: Christ, while we were still helpless, yet died at the appointed time for the ungodly. Indeed, only with difficulty does one die for a just person, though perhaps for a good person one might even find courage to die. But God proves his love for us in that while we were still sinners Christ died for us. How much more then, since we are now justified by his blood, will we be saved through him from the wrath. Indeed, if, while we were enemies, we were reconciled to God through the death of his Son, how much more, once reconciled, will we be saved by his life. Not only that, but we also boast of God through our Lord Jesus Christ, through whom we have now received reconciliation.`,
          text_es: `Hermanos: Cuando todavía no teníamos fuerzas para salir del pecado, Cristo murió por los pecadores en el tiempo señalado. Difícilmente habrá alguien que quiera morir por un justo, aunque puede haber alguno que esté dispuesto a morir por una persona sumamente buena. Y la prueba de que Dios nos ama está en que Cristo murió por nosotros, cuando aún éramos pecadores.\n\nCon mayor razón, ahora que ya hemos sido justificados por su sangre, seremos salvados por él del castigo final. Porque, si cuando éramos enemigos de Dios, fuimos reconciliados con él por la muerte de su Hijo, con mucho más razón, estando ya reconciliados, recibiremos la salvación participando de la vida de su Hijo. Y no sólo esto, sino que también nos gloriamos en Dios, por medio de nuestro Señor Jesucristo, por quien hemos obtenido ahora la reconciliación.`,
        },
        {
          label: 'Alleluia',
          label_es: 'Aclamación antes del Evangelio',
          citation: 'Mark 1:15',
          citation_es: 'Marcos 1, 15',
          text: `R. Alleluia, alleluia.\nThe kingdom of God is at hand.\nRepent and believe in the Gospel.\nR. Alleluia, alleluia.`,
          text_es: `R. Aleluya, aleluya.\nEl Reino de Dios está cerca, dice el Señor;\narrepiéntanse y crean en el Evangelio.\nR. Aleluya.`,
        },
        {
          label: 'Gospel',
          label_es: 'Evangelio',
          citation: 'Matthew 9:36—10:8',
          citation_es: 'Mateo 9, 36—10, 8',
          text: `At the sight of the crowds, Jesus' heart was moved with pity for them because they were troubled and abandoned, like sheep without a shepherd. Then he said to his disciples, "The harvest is abundant but the laborers are few; so ask the master of the harvest to send out laborers for his harvest."\n\nThen he summoned his twelve disciples and gave them authority over unclean spirits to drive them out and to cure every disease and every illness. The names of the twelve apostles are these: first, Simon called Peter, and his brother Andrew; James, the son of Zebedee, and his brother John; Philip and Bartholomew, Thomas and Matthew the tax collector; James, the son of Alphaeus, and Thaddeus; Simon from Cana, and Judas Iscariot who betrayed him.\n\nJesus sent out these twelve after instructing them thus, "Do not go into pagan territory or enter a Samaritan town. Go rather to the lost sheep of the house of Israel. As you go, make this proclamation: 'The kingdom of heaven is at hand.' Cure the sick, raise the dead, cleanse lepers, drive out demons. Without cost you have received; without cost you are to give."`,
          text_es: `En aquel tiempo, al ver Jesús a las multitudes, se compadecía de ellas, porque estaban extenuadas y desamparadas, como ovejas sin pastor. Entonces dijo a sus discípulos: "La cosecha es mucha y los trabajadores, pocos. Rueguen, por lo tanto, al dueño de la mies que envíe trabajadores a sus campos".\n\nDespués, llamando a sus doce discípulos, les dio poder para expulsar a los espíritus impuros y curar toda clase de enfermedades y dolencias. Éstos son los nombres de los doce apóstoles: el primero de todos, Simón, llamado Pedro, y su hermano Andrés; Santiago y su hermano Juan, hijos de Zebedeo; Felipe y Bartolomé; Tomás y Mateo, el publicano; Santiago, hijo de Alfeo, y Tadeo; Simón, el cananeo, y Judas Iscariote, que fue el traidor.\n\nA estos doce los envió Jesús con estas instrucciones: "No vayan a tierra de paganos ni entren en ciudades de samaritanos. Vayan más bien en busca de las ovejas perdidas de la casa de Israel. Vayan y proclamen por el camino que ya se acerca el Reino de los cielos. Curen a los leprosos y demás enfermos; resuciten a los muertos y echen fuera a los demonios. Gratuitamente han recibido este poder; ejérzanlo, pues, gratuitamente".`,
        },
      ],
    },
    vo: {
      title: 'Third Sunday after Pentecost',
      title_es: 'III Domingo después de Pentecostés',
      rank: 'II classis',
      color: 'green',
      source_url: 'https://www.divinumofficium.com/cgi-bin/missa/missa.pl?date1=06-14-2026&command=prayLow&lang2=English',
      source_url_es: 'https://rinconliturgico.blogspot.com/2011/07/iii-domingo-despues-de-pentecostes.html',
      source_name: 'Divinum Officium',
      source_name_es: 'El Rincón Litúrgico',
      verse: 'There will be joy in heaven over one sinner who repents, more than over ninety-nine just who have no need of repentance.',
      verse_es: 'Habrá más alegría en el cielo por un solo pecador que se convierta que por noventa y nueve justos que no necesitan convertirse.',
      verse_citation: 'Luke 15:7',
      verse_citation_es: 'Lucas 15, 7',
      readings: [
        {
          label: 'Introit',
          label_es: 'Introito',
          citation: 'Psalm 24:16, 18; 24:1-2',
          citation_es: 'Salmo 24, 16. 18; 24, 1-2',
          text: `Look toward me, and have pity on me, O Lord, for I am alone and afflicted. Put an end to my affliction and my suffering, and take away all my sins, O my God.\n\n℣. To You, I lift up my soul, O Lord. In You, O my God, I trust; let me not be put to shame.\n℣. Glory be to the Father, and to the Son, and to the Holy Ghost.`,
          text_es: `Mírame, Señor, y ten compasión de mí, porque estoy solo y soy pobre. Mira mi bajeza y mis trabajos, y perdona todos mis pecados, Dios mío.\n\n℣. A ti, Señor, levanto mi alma. Dios mío, en ti confío; no quede yo confuso.\n℣. Gloria al Padre, y al Hijo y al Espíritu Santo.`,
        },
        {
          label: 'Collect',
          label_es: 'Colecta',
          citation: '',
          citation_es: '',
          text: `O God, protector of all who hope in You, without Whom nothing is strong, nothing is holy, increase Your mercy toward us, that, with Your guidance and direction we may so pass through the things of this temporal life as not to lose those of life eternal. Through Jesus Christ, thy Son our Lord, Who liveth and reigneth with thee, in the unity of the Holy Ghost, God, world without end. Amen.`,
          text_es: `Oh Dios, protector de los que en ti esperan, y sin el cual nada tiene valor, nada es santo; multiplica sobre nosotros tu misericordia, para que, siendo tú nuestro pastor y nuestro guía, pasemos por los bienes temporales de modo que no perdamos los eternos. Por nuestro Señor Jesucristo, tu Hijo, que contigo vive y reina en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.`,
        },
        {
          label: 'Epistle',
          label_es: 'Epístola',
          citation: '1 Peter 5:6-11',
          citation_es: '1 Pedro 5, 6-11',
          text: `Beloved: Humble yourselves under the mighty hand of God, that He may exalt you in the time of visitation; cast all your anxiety upon Him, because He cares for you. Be sober, be watchful! For your adversary the devil, as a roaring lion, goes about seeking someone to devour. Resist him, steadfast in the faith, knowing that the same suffering befalls your brethren all over the world. But the God of all grace, Who has called us unto His eternal glory in Christ Jesus, will Himself, after we have suffered a little while, perfect, strengthen and establish us. To Him is the glory and the dominion forever and ever. Amen.`,
          text_es: `Hermanos: Sed humildes bajo la poderosa mano de Dios, para que él os ensalce en su momento. Descargad en él todo vuestro agobio, porque él cuida de vosotros. Sed sobrios, velad. Vuestro adversario, el diablo, como león rugiente, ronda buscando a quien devorar. Resistidle, firmes en la fe, sabiendo que vuestra comunidad fraternal en el mundo entero está pasando por los mismos sufrimientos. Y el Dios de toda gracia, que os ha llamado a su gloria eterna en Cristo Jesús, después de sufrir un poco, él mismo os restablecerá, os afianzará, os robustecerá y os consolidará. Suyo es el poder por los siglos. Amén.`,
        },
        {
          label: 'Gradual & Alleluia',
          label_es: 'Gradual y Aleluya',
          citation: 'Psalm 54:23, 17, 19; 7:12',
          citation_es: 'Salmo 54, 23. 17. 19; 7, 12',
          text: `Cast your care upon the Lord, and He will support you.\n℣. When I called upon the Lord, He heard my voice from those who war against me.\n\nAlleluia, alleluia.\n℣. A just judge is God, strong and patient; is He angry every day? Alleluia.`,
          text_es: `Pon tu suerte en manos del Señor, y él te sustentará.\n℣. Cuando clamé al Señor, él oyó mi voz y me libró de los que marchan contra mí.\n\nAleluya, aleluya.\n℣. Dios es juez íntegro y lento para la cólera. ¿Por ventura andará siempre airado? Aleluya.`,
        },
        {
          label: 'Gospel',
          label_es: 'Evangelio',
          citation: 'Luke 15:1-10',
          citation_es: 'Lucas 15, 1-10',
          text: `At that time, the publicans and sinners were drawing near to Him to listen to Him. And the Pharisees and the Scribes murmured, saying, "This man welcomes sinners and eats with them." But He spoke to them this parable, saying, "What man of you having a hundred sheep, and losing one of them, does not leave the ninety-nine in the desert, and go after that which is lost, until he finds it? And when he has found it, he lays it upon his shoulders rejoicing. And on coming home he calls together his friends and neighbors, saying to them, 'Rejoice with me, because I have found my sheep that was lost.' I say to you that, even so, there will be joy in heaven over one sinner who repents, more than over ninety-nine just who have no need of repentance.\n\nOr what woman, having ten drachmas, if she loses one drachma, does not light a lamp and sweep the house and search carefully until she finds it? And when she has found it, she calls together her friends and neighbors, saying, 'Rejoice with me, for I have found the drachma that I had lost.' Even so, I say to you, there will be joy among the angels of God over one sinner who repents."`,
          text_es: `En aquel tiempo: Solían acercarse a Jesús todos los publicanos y los pecadores a escucharlo. Y los fariseos y los escribas murmuraban diciendo: "Ese acoge a los pecadores y come con ellos". Jesús les dijo esta parábola: "¿Quién de vosotros que tiene cien ovejas y pierde una de ellas, no deja las noventa y nueve en el desierto y va tras la descarriada, hasta que la encuentra? Y, cuando la encuentra, se la carga sobre los hombros, muy contento; y, al llegar a casa, reúne a los amigos y a los vecinos, y les dice: '¡Alegraos conmigo!, he encontrado la oveja que se me había perdido'. Os digo que así también habrá más alegría en el cielo por un solo pecador que se convierta que por noventa y nueve justos que no necesitan convertirse.\n\nO ¿qué mujer que tiene diez monedas, si se le pierde una, no enciende una lámpara y barre la casa y busca con cuidado, hasta que la encuentra? Y, cuando la encuentra, reúne a las amigas y a las vecinas y les dice: '¡Alegraos conmigo!, he encontrado la moneda que se me había perdido'. Os digo que la misma alegría tendrán los ángeles de Dios por un solo pecador que se convierta".`,
        },
        {
          label: 'Offertory',
          label_es: 'Ofertorio',
          citation: 'Psalm 9:11-13',
          citation_es: 'Salmo 9, 11-13',
          text: `They trust in You who cherish Your name, O Lord, for You forsake not those who seek You. Sing praise to the Lord enthroned in Sion, for He has not forgotten the cry of the afflicted.`,
          text_es: `Esperen en ti cuantos conocen tu nombre, Señor, porque no abandonas a los que te buscan. Cantad al Señor, que mora en Sión, porque no olvida la oración de los pobres.`,
        },
        {
          label: 'Communion',
          label_es: 'Comunión',
          citation: 'Luke 15:10',
          citation_es: 'Lucas 15, 10',
          text: `I say to you: there is joy among the angels of God over one sinner who repents.`,
          text_es: `Yo os digo que habrá gran alborozo entre los ángeles de Dios por un pecador que haga penitencia.`,
        },
        {
          label: 'Postcommunion',
          label_es: 'Poscomunión',
          citation: '',
          citation_es: '',
          text: `May the holy things of which we have partaken bring us to life and prepare for Your everlasting mercy those whom You have cleansed from sin. Through Jesus Christ, thy Son our Lord, Who liveth and reigneth with thee, in the unity of the Holy Ghost, God, world without end. Amen.`,
          text_es: `Señor, que tus santos misterios nos den vida, laven nuestras culpas, y nos vayan disponiendo a recibir las eternas misericordias. Por nuestro Señor Jesucristo, tu Hijo, que contigo vive y reina en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.`,
        },
      ],
    },
  },
  {
    id: 'r-2026-06-21',
    date: '2026-06-21',
    no: {
      title: 'Twelfth Sunday in Ordinary Time',
      title_es: 'XII Domingo Ordinario',
      lectionary: '94',
      cycle: 'A',
      source_url: 'https://bible.usccb.org/bible/readings/062126.cfm',
      source_url_es: 'https://bible.usccb.org/es/bible/lecturas/062126.cfm',
      source_name: 'USCCB',
      verse: 'Do not be afraid; you are worth more than many sparrows.',
      verse_es: 'No tengan miedo, porque ustedes valen mucho más que todos los pájaros del mundo.',
      verse_citation: 'Matthew 10:31',
      verse_citation_es: 'Mateo 10, 31',
      readings: [
        {
          label: 'Reading 1',
          label_es: 'Primera lectura',
          citation: 'Jeremiah 20:10-13',
          citation_es: 'Jeremías 20, 10-13',
          text: `Jeremiah said:
"I hear the whisperings of many:
'Terror on every side!
Denounce! let us denounce him!'
All those who were my friends
are on the watch for any misstep of mine.
'Perhaps he will be trapped; then we can prevail,
and take our vengeance on him.'
But the LORD is with me, like a mighty champion:
my persecutors will stumble, they will not triumph.
In their failure they will be put to utter shame,
to lasting, unforgettable confusion.
O LORD of hosts, you who test the just,
who probe mind and heart,
let me witness the vengeance you take on them,
for to you I have entrusted my cause.
Sing to the LORD,
praise the LORD,
for he has rescued the life of the poor
from the power of the wicked!"`,
          text_es: `En aquel tiempo, dijo Jeremías: "Yo oía el cuchicheo de la gente que decía: 'Denunciemos a Jeremías, denunciemos al profeta del terror'. Todos los que eran mis amigos espiaban mis pasos, esperaban que tropezara y me cayera, diciendo: 'Si se tropieza y se cae, lo venceremos y podremos vengarnos de él'. Pero el Señor, guerrero poderoso, está a mi lado; por eso mis perseguidores caerán por tierra y no podrán conmigo; quedarán avergonzados de su fracaso y su ignominia será eterna e inolvidable. Señor de los ejércitos, que pones a prueba al justo y conoces lo más profundo de los corazones, haz que yo vea tu venganza contra ellos, porque a ti he encomendado mi causa. Canten y alaben al Señor, porque él ha salvado la vida de su pobre de la mano de los malvados".`,
        },
        {
          label: 'Responsorial Psalm',
          label_es: 'Salmo responsorial',
          citation: 'Psalm 69:8-10, 14, 17, 33-35',
          citation_es: 'Salmo 68, 8-10. 14 y 17. 33-35',
          text: `R. (14c) Lord, in your great love, answer me.\n\nFor your sake I bear insult,\nand shame covers my face.\nI have become an outcast to my brothers,\na stranger to my mother's children,\nBecause zeal for your house consumes me,\nand the insults of those who blaspheme you fall upon me.\nR. Lord, in your great love, answer me.\n\nI pray to you, O LORD,\nfor the time of your favor, O God!\nIn your great kindness answer me\nwith your constant help.\nAnswer me, O LORD, for bounteous is your kindness;\nin your great mercy turn toward me.\nR. Lord, in your great love, answer me.\n\n"See, you lowly ones, and be glad;\nyou who seek God, may your hearts revive!\nFor the LORD hears the poor,\nand his own who are in bonds he spurns not.\nLet the heavens and the earth praise him,\nthe seas and whatever moves in them!"\nR. Lord, in your great love, answer me.`,
          text_es: `R. Escúchame, Señor, porque eres bueno.\n\nPor ti he sufrido oprobios\ny la vergüenza cubre mi semblante.\nExtraño soy y advenedizo,\naun para aquellos de mi propia sangre;\npues me devora el celo de tu casa,\nel odio del que te odia, en mí recae.\nR. Escúchame, Señor, porque eres bueno.\n\nA ti, Señor, elevo mi plegaria,\nven en mi ayuda pronto;\nescúchame conforme a tu clemencia,\nDios fiel en el socorro.\nEscúchame, Señor, pues eres bueno\ny en tu ternura vuelve a mí tus ojos.\nR. Escúchame, Señor, porque eres bueno.\n\nSe alegrarán, al verlo, los que sufren;\nquienes buscan a Dios tendrán más ánimo,\nporque el Señor jamás desoye al pobre\nni olvida al que se encuentra encadenado.\nQue lo alaben por esto cielo y tierra,\nel mar y cuanto en él habita.\nR. Escúchame, Señor, porque eres bueno.`,
        },
        {
          label: 'Reading 2',
          label_es: 'Segunda lectura',
          citation: 'Romans 5:12-15',
          citation_es: 'Romanos 5, 12-15',
          text: `Brothers and sisters:
Through one man sin entered the world,
and through sin, death,
and thus death came to all men, inasmuch as all sinned—
for up to the time of the law, sin was in the world,
though sin is not accounted when there is no law.
But death reigned from Adam to Moses,
even over those who did not sin
after the pattern of the trespass of Adam,
who is the type of the one who was to come.

But the gift is not like the transgression.
For if by the transgression of the one the many died,
how much more did the grace of God
and the gracious gift of the one man Jesus Christ
overflow for the many.`,
          text_es: `Hermanos: Por un solo hombre entró el pecado en el mundo y por el pecado entró la muerte, así la muerte pasó a todos los hombres, porque todos pecaron. Antes de la ley de Moisés ya existía el pecado en el mundo y, si bien es cierto que el pecado no se castiga cuando no hay ley, sin embargo, la muerte reinó desde Adán hasta Moisés aun sobre aquéllos que no pecaron como pecó Adán, cuando desobedeció un mandato directo de Dios. Por lo demás, Adán era figura de Cristo, el que había de venir. Ahora bien, el don de Dios supera con mucho al delito. Pues si por el pecado de un solo hombre todos fueron castigados con la muerte, por el don de un solo hombre, Jesucristo, se ha desbordado sobre todos la abundancia de la vida y la gracia de Dios.`,
        },
        {
          label: 'Alleluia',
          label_es: 'Aclamación antes del Evangelio',
          citation: 'John 15:26b, 27a',
          citation_es: 'Juan 15, 26b. 27a',
          text: `R. Alleluia, alleluia.\nThe Spirit of truth will testify to me, says the Lord;\nand you also will testify.\nR. Alleluia, alleluia.`,
          text_es: `R. Aleluya, aleluya.\nEl Espíritu de verdad dará testimonio de mí, dice el Señor,\ny también ustedes serán mis testigos.\nR. Aleluya.`,
        },
        {
          label: 'Gospel',
          label_es: 'Evangelio',
          citation: 'Matthew 10:26-33',
          citation_es: 'Mateo 10, 26-33',
          text: `Jesus said to the Twelve:
"Fear no one.
Nothing is concealed that will not be revealed,
nor secret that will not be known.
What I say to you in the darkness, speak in the light;
what you hear whispered, proclaim on the housetops.
And do not be afraid of those who kill the body but cannot kill the soul;
rather, be afraid of the one who can destroy
both soul and body in Gehenna.
Are not two sparrows sold for a small coin?
Yet not one of them falls to the ground without your Father's knowledge.
Even all the hairs of your head are counted.
So do not be afraid; you are worth more than many sparrows.
Everyone who acknowledges me before others
I will acknowledge before my heavenly Father.
But whoever denies me before others,
I will deny before my heavenly Father."`,
          text_es: `En aquel tiempo, Jesús dijo a sus apóstoles: "No teman a los hombres. No hay nada oculto que no llegue a descubrirse; no hay nada secreto que no llegue a saberse. Lo que les digo de noche, repítanlo en pleno día, y lo que les digo al oído, pregónenlo desde las azoteas. No tengan miedo a los que matan el cuerpo, pero no pueden matar el alma. Teman, más bien, a quien puede arrojar al lugar de castigo el alma y el cuerpo. ¿No es verdad que se venden dos pajarillos por una moneda? Sin embargo, ni uno solo de ellos cae por tierra si no lo permite el Padre. En cuanto a ustedes, hasta los cabellos de su cabeza están contados. Por lo tanto, no tengan miedo, porque ustedes valen mucho más que todos los pájaros del mundo. A quien me reconozca delante de los hombres, yo también lo reconoceré ante mi Padre, que está en los cielos; pero al que me niegue delante de los hombres, yo también lo negaré ante mi Padre, que está en los cielos".`,
        },
      ],
    },
    vo: {
      title: 'Fourth Sunday after Pentecost',
      title_es: 'IV Domingo después de Pentecostés',
      rank: 'II classis',
      color: 'green',
      source_url: 'https://www.divinumofficium.com/cgi-bin/missa/missa.pl?date1=06-21-2026&command=prayLow&lang2=English',
      source_url_es: '',
      source_name: 'Divinum Officium',
      source_name_es: '',
      verse: 'Do not be afraid; henceforth you shall catch men.',
      verse_es: '',
      verse_citation: 'Luke 5:10',
      verse_citation_es: '',
      readings: [
        {
          label: 'Introit',
          label_es: 'Introito',
          citation: 'Psalm 26:1-2',
          citation_es: 'Salmo 26, 1-2',
          text: `The Lord is my light and my salvation; whom should I fear? The Lord is my life's refuge; of whom should I be afraid? My enemies that trouble me, themselves stumble and fall.\n\n℣. Though an army encamp against me, my heart will not fear.\n℣. Glory be to the Father, and to the Son, and to the Holy Ghost.`,
          text_es: '',
        },
        {
          label: 'Collect',
          label_es: 'Colecta',
          citation: '',
          citation_es: '',
          text: `Grant us, we beseech You, O Lord, that the course of the world may be directed according to Your rule in peace and that Your Church may have the joy of serving You undisturbed. Through Jesus Christ, thy Son our Lord, Who liveth and reigneth with thee, in the unity of the Holy Ghost, God, world without end. Amen.`,
          text_es: '',
        },
        {
          label: 'Epistle',
          label_es: 'Epístola',
          citation: 'Romans 8:18-23',
          citation_es: 'Romanos 8, 18-23',
          text: `Brethren: I reckon that the sufferings of the present time are not worthy to be compared with the glory to come that will be revealed in us. For the eager longing of creation awaits the revelation of the sons of God. For creation was made subject to vanity - not by its own will but by reason of Him Who made it subject - in hope, because creation itself also will be delivered from its slavery to corruption into the freedom of the glory of the sons of God. For we know that all creation groans and travails in pain until now. And not only it, but we ourselves also who have the first-fruits of the Spirit - we ourselves groan within ourselves, waiting for the adoption as sons of God, the redemption of our body, in Christ Jesus our Lord.`,
          text_es: '',
        },
        {
          label: 'Gradual & Alleluia',
          label_es: 'Gradual y Aleluya',
          citation: 'Psalm 78:9-10; 9:5, 10',
          citation_es: 'Salmo 78, 9-10; 9, 5. 10',
          text: `Pardon our sins, O Lord; why should the nations say, Where is their God?\n℣. Help us, O God our Saviour; because of the glory of Your name, O Lord, deliver us. Alleluia, alleluia.\nO God, seated on Your throne, judging justly: be a stronghold for the oppressed in times of distress. Alleluia.`,
          text_es: '',
        },
        {
          label: 'Gospel',
          label_es: 'Evangelio',
          citation: 'Luke 5:1-11',
          citation_es: 'Lucas 5, 1-11',
          text: `At that time, while the crowds were pressing upon Jesus to hear the word of God, He was standing by Lake Genesareth. And He saw two boats moored by the lake, but the fishermen had left them and were washing their nets. And getting into one of the boats, the one that was Simon's, He asked him to put out a little from the land. And sitting down, He began to teach the crowds from the boat. But when He had ceased speaking, He said to Simon, Put out into the deep, and lower your nets for a catch. And Simon answered and said to Him, Master, the whole night through we have toiled and have taken nothing; but at Your word I will lower the net. And when they had done so, they enclosed a great number of fishes, but their net was breaking. And they beckoned to their comrades in the other boat to come and help them. And they came and filled both the boats, so that they began to sink. But when Simon Peter saw this, he fell down at Jesus' knees, saying, Depart from me, for I am a sinful man, O Lord. For he and all who were with him were amazed at the catch of fish they had made; and so were also James and John, the sons of Zebedee, who were partners with Simon. And Jesus said to Simon, Do not be afraid; henceforth you shall catch men. And when they had brought their boats to land, they left all and followed Him.`,
          text_es: '',
        },
        {
          label: 'Offertory',
          label_es: 'Ofertorio',
          citation: 'Psalm 12:4-5',
          citation_es: 'Salmo 12, 4-5',
          text: `Give light to my eyes that I may never sleep in death, lest my enemy say, I have overcome him.`,
          text_es: '',
        },
        {
          label: 'Communion',
          label_es: 'Comunión',
          citation: 'Psalm 17:3',
          citation_es: 'Salmo 17, 3',
          text: `O Lord, my rock, my fortress, my deliverer: my God, my rock of refuge!`,
          text_es: '',
        },
        {
          label: 'Postcommunion',
          label_es: 'Poscomunión',
          citation: '',
          citation_es: '',
          text: `May the sacrament we have received cleanse us, we beseech You, O Lord, and by its grace protect us. Through Jesus Christ, thy Son our Lord, Who liveth and reigneth with thee, in the unity of the Holy Ghost, God, world without end. Amen.`,
          text_es: '',
        },
      ],
    },
  },
  {
    id: 'r-2026-06-28',
    date: '2026-06-28',
    no: {
      title: 'Thirteenth Sunday in Ordinary Time',
      title_es: 'XIII Domingo Ordinario',
      lectionary: '97',
      cycle: 'C',
      source_url: 'https://bible.usccb.org/bible/readings/062826.cfm',
      source_url_es: 'https://bible.usccb.org/es/bible/lecturas/062826.cfm',
      source_name: 'USCCB',
      verse: 'Whoever finds his life will lose it, and whoever loses his life for my sake will find it.',
      verse_es: 'El que salve su vida la perderá y el que la pierda por mí, la salvará.',
      verse_citation: 'Matthew 10:39',
      verse_citation_es: 'Mateo 10, 39',
      readings: [
        {
          label: 'Reading 1',
          label_es: 'Primera lectura',
          citation: '2 Kings 4:8-11, 14-16a',
          citation_es: '2 Reyes 4, 8-11. 14-16a',
          text: `One day Elisha came to Shunem, where there was a woman of influence, who urged him to dine with her. Afterward, whenever he passed by, he used to stop there to dine. So she said to her husband, "I know that Elisha is a holy man of God. Since he visits us often, let us arrange a little room on the roof and furnish it for him with a bed, table, chair, and lamp, so that when he comes to us he can stay there." Sometime later Elisha arrived and stayed in the room overnight.\n\nLater Elisha asked, "Can something be done for her?" His servant Gehazi answered, "Yes! She has no son, and her husband is getting on in years." Elisha said, "Call her." When the woman had been called and stood at the door, Elisha promised, "This time next year you will be fondling a baby son."`,
          text_es: `Un día pasaba Eliseo por la ciudad de Sunem y una mujer distinguida lo invitó con insistencia a comer en su casa. Desde entonces, siempre que Eliseo pasaba por ahí, iba a comer a su casa. En una ocasión, ella le dijo a su marido: "Yo sé que este hombre, que con tanta frecuencia nos visita, es un hombre de Dios. Vamos a construirle en los altos una pequeña habitación. Le pondremos allí una cama, una mesa, una silla y una lámpara, para que se quede allí, cuando venga a visitarnos".\n\nAsí se hizo y cuando Eliseo regresó a Sunem, subió a la habitación y se recostó en la cama. Entonces le dijo a su criado: "¿Qué podemos hacer por esta mujer?" El criado le dijo: "Mira, no tiene hijos y su marido ya es un anciano". Entonces dijo Eliseo: "Llámala". El criado la llamó y ella, al llegar, se detuvo en la puerta. Eliseo le dijo: "El año que viene, por estas mismas fechas, tendrás un hijo en tus brazos".`,
        },
        {
          label: 'Responsorial Psalm',
          label_es: 'Salmo responsorial',
          citation: 'Psalm 89:2-3, 16-17, 18-19',
          citation_es: 'Salmo 88, 2-3. 16-17. 18-19',
          text: `R. (2a) Forever I will sing the goodness of the Lord.\n\nThe promises of the LORD I will sing forever,\nthrough all generations my mouth shall proclaim your faithfulness.\nFor you have said, "My kindness is established forever;"\nin heaven you have confirmed your faithfulness.\nR. Forever I will sing the goodness of the Lord.\n\nBlessed the people who know the joyful shout;\nin the light of your countenance, O LORD, they walk.\nAt your name they rejoice all the day,\nand through your justice they are exalted.\nR. Forever I will sing the goodness of the Lord.\n\nYou are the splendor of their strength,\nand by your favor our horn is exalted.\nFor to the LORD belongs our shield,\nand the Holy One of Israel, our king.\nR. Forever I will sing the goodness of the Lord.`,
          text_es: `R. Proclamaré sin cesar la misericordia del Señor.\n\nProclamaré sin cesar la misericordia del Señor,\ny daré a conocer que su fidelidad es eterna,\npues el Señor ha dicho: "Mi amor es para siempre,\ny mi lealtad, más firme que los cielos".\nR. Proclamaré sin cesar la misericordia del Señor.\n\nSeñor, feliz el pueblo que te alaba\ny que a tu luz camina,\nque en tu nombre se alegra a todas horas\ny al que llena de orgullo tu justicia.\nR. Proclamaré sin cesar la misericordia del Señor.\n\nFeliz, porque eres tú su honor y fuerza\ny exalta tu favor nuestro poder.\nFeliz, porque el Señor es nuestro escudo\ny el santo de Israel es nuestro rey.\nR. Proclamaré sin cesar la misericordia del Señor.`,
        },
        {
          label: 'Reading 2',
          label_es: 'Segunda lectura',
          citation: 'Romans 6:3-4, 8-11',
          citation_es: 'Romanos 6, 3-4. 8-11',
          text: `Brothers and sisters: Are you unaware that we who were baptized into Christ Jesus were baptized into his death? We were indeed buried with him through baptism into death, so that, just as Christ was raised from the dead by the glory of the Father, we too might live in newness of life.\n\nIf, then, we have died with Christ, we believe that we shall also live with him. We know that Christ, raised from the dead, dies no more; death no longer has power over him. As to his death, he died to sin once and for all; as to his life, he lives for God. Consequently, you too must think of yourselves as dead to sin and living for God in Christ Jesus.`,
          text_es: `Hermanos: Todos los que hemos sido incorporados a Cristo Jesús por medio del bautismo, hemos sido incorporados a su muerte. En efecto, por el bautismo fuimos sepultados con él en su muerte, para que, así como Cristo resucitó de entre los muertos por la gloria del Padre, así también nosotros llevemos una vida nueva.\n\nPor lo tanto, si hemos muerto con Cristo, estamos seguros de que también viviremos con él; pues sabemos que Cristo, una vez resucitado de entre los muertos, ya nunca morirá. La muerte ya no tiene dominio sobre él, porque al morir, murió al pecado de una vez para siempre; y al resucitar, vive ahora para Dios. Lo mismo ustedes, considérense muertos al pecado y vivos para Dios en Cristo Jesús, Señor nuestro.`,
        },
        {
          label: 'Alleluia',
          label_es: 'Aclamación antes del Evangelio',
          citation: '1 Peter 2:9',
          citation_es: '1 Pedro 2, 9',
          text: `R. Alleluia, alleluia.\nYou are a chosen race, a royal priesthood, a holy nation;\nannounce the praises of him who called you out of darkness into his wonderful light.\nR. Alleluia, alleluia.`,
          text_es: `R. Aleluya, aleluya.\nUstedes son linaje escogido, sacerdocio real,\nnación consagrada a Dios,\npara que proclamen las obras maravillosas\nde aquel que los llamó de las tinieblas a su luz admirable.\nR. Aleluya.`,
        },
        {
          label: 'Gospel',
          label_es: 'Evangelio',
          citation: 'Matthew 10:37-42',
          citation_es: 'Mateo 10, 37-42',
          text: `Jesus said to his apostles: "Whoever loves father or mother more than me is not worthy of me, and whoever loves son or daughter more than me is not worthy of me; and whoever does not take up his cross and follow after me is not worthy of me. Whoever finds his life will lose it, and whoever loses his life for my sake will find it.\n\nWhoever receives you receives me, and whoever receives me receives the one who sent me. Whoever receives a prophet because he is a prophet will receive a prophet's reward, and whoever receives a righteous man because he is a righteous man will receive a righteous man's reward. And whoever gives only a cup of cold water to one of these little ones to drink because the little one is a disciple— amen, I say to you, he will surely not lose his reward."`,
          text_es: `En aquel tiempo, Jesús dijo a sus apóstoles: "El que ama a su padre o a su madre más que a mí, no es digno de mí; el que ama a su hijo o a su hija más que a mí, no es digno de mí; y el que no toma su cruz y me sigue, no es digno de mí.\n\nEl que salve su vida la perderá y el que la pierda por mí, la salvará.\n\nQuien los recibe a ustedes me recibe a mí; y quien me recibe a mí, recibe al que me ha enviado.\n\nEl que recibe a un profeta por ser profeta, recibirá recompensa de profeta; el que recibe a un justo por ser justo, recibirá recompensa de justo.\n\nQuien diere, aunque no sea más que un vaso de agua fría a uno de estos pequeños, por ser discípulo mío, yo les aseguro que no perderá su recompensa."`,
        },
      ],
    },
    vo: {
      title: 'Fifth Sunday after Pentecost',
      title_es: 'V Domingo después de Pentecostés',
      rank: 'II classis',
      color: 'green',
      source_url: 'https://www.divinumofficium.com/cgi-bin/missa/missa.pl?date1=06-28-2026&command=prayLow&lang2=English',
      source_url_es: '',
      source_name: 'Divinum Officium',
      source_name_es: '',
      verse: 'Unless your justice exceeds that of the Scribes and Pharisees, you shall not enter the kingdom of heaven.',
      verse_es: '',
      verse_citation: 'Matthew 5:20',
      verse_citation_es: '',
      readings: [
        {
          label: 'Introit',
          label_es: 'Introito',
          citation: 'Psalm 26:7, 9',
          citation_es: 'Salmo 26, 7. 9',
          text: `Hear, O Lord, the sound of my call; be my helper: forsake me not: despise me not, O God my Saviour.\n℣. The Lord is my light and my salvation; whom should I fear?`,
          text_es: '',
        },
        {
          label: 'Collect',
          label_es: 'Colecta',
          citation: '',
          citation_es: '',
          text: `O God, You Who have prepared good things as yet unseen for those who love You, pour a burning love into our hearts, so that we, loving You in and above all things, may obtain Your promises which surpass all desire. Through Jesus Christ, thy Son our Lord, Who liveth and reigneth with thee, in the unity of the Holy Ghost, God, world without end. Amen.`,
          text_es: '',
        },
        {
          label: 'Epistle',
          label_es: 'Epístola',
          citation: '1 Peter 3:8-15',
          citation_es: '1 Pedro 3, 8-15',
          text: `Beloved: Be all like-minded in prayer, compassionate, lovers of the brethren, merciful, reserved, humble; not rendering evil for evil, or abuse for abuse, but contrariwise, blessing; for unto this were you called that you might inherit a blessing. For, "He who would love life, and see good days, let him refrain his tongue from evil, and his lips that they speak no deceit. Let him turn away from evil and do good, let him seek after peace and pursue it. For the eyes of the Lord are upon the just, and His ears unto their prayers; but the face of the Lord is against those who do evil." And who is there to harm you, if you are zealous for what is good? But even if you suffer anything for justice' sake, blessed are you. So have no fear of their fear and do not be troubled. But hallow the Lord Christ in your hearts.`,
          text_es: '',
        },
        {
          label: 'Gradual & Alleluia',
          label_es: 'Gradual y Aleluya',
          citation: 'Psalm 83:10, 9; Psalm 20:1',
          citation_es: 'Salmo 83, 10. 9; Salmo 20, 1',
          text: `Behold, O God, our protector, and look on Your servants.\n℣. O Lord God of Hosts, hear the prayers of Your servants.\nAlleluia, alleluia.\n℣. O Lord, in Your strength the king is glad; in Your victory how greatly he rejoices! Alleluia.`,
          text_es: '',
        },
        {
          label: 'Gospel',
          label_es: 'Evangelio',
          citation: 'Matthew 5:20-24',
          citation_es: 'Mateo 5, 20-24',
          text: `At that time, Jesus said to His disciples: Unless your justice exceeds that of the Scribes and Pharisees, you shall not enter the kingdom of heaven. You have heard that it was said to the ancients, "You shall not kill"; and that whoever shall kill shall be liable to judgment. But I say to you that everyone who is angry with his brother shall be liable to judgment; and whoever says to his brother, "Raca," shall be liable to the Sanhedrin; and whoever says, "You fool!", shall be liable to the fire of Gehenna. Therefore, if you are offering your gift at the altar, and there remember that your brother has anything against you, leave your gift before the altar and go first to be reconciled to your brother; and then come and offer your gift.`,
          text_es: '',
        },
        {
          label: 'Offertory',
          label_es: 'Ofertorio',
          citation: 'Psalm 15:7-8',
          citation_es: 'Salmo 15, 7-8',
          text: `I bless the Lord Who counsels me; I set God ever before me; with Him at my right hand I shall not be disturbed.`,
          text_es: '',
        },
        {
          label: 'Communion',
          label_es: 'Comunión',
          citation: 'Psalm 26:4',
          citation_es: 'Salmo 26, 4',
          text: `One thing I ask of the Lord; this I seek: to dwell in the house of the Lord all the days of my life.`,
          text_es: '',
        },
        {
          label: 'Postcommunion',
          label_es: 'Poscomunión',
          citation: '',
          citation_es: '',
          text: `Grant us, we beseech You, O Lord, that we whom You have filled with the heavenly gift may be cleansed of our hidden sins and delivered from the snares of our enemies. Through Jesus Christ, thy Son our Lord, Who liveth and reigneth with thee, in the unity of the Holy Ghost, God, world without end. Amen.`,
          text_es: '',
        },
      ],
    },
  },
  {
    id: 'r-2026-07-12',
    date: '2026-07-12',
    no: {
      title: 'Fifteenth Sunday in Ordinary Time',
      title_es: 'XV Domingo Ordinario',
      lectionary: '103',
      cycle: 'A',
      source_url: 'https://bible.usccb.org/bible/readings/071226.cfm',
      source_url_es: 'https://bible.usccb.org/es/bible/lecturas/071226.cfm',
      source_name: 'USCCB',
      verse: 'The seed sown on rich soil is the one who hears the word and understands it, who indeed bears fruit and yields a hundred or sixty or thirtyfold.',
      verse_es: 'El que recibió la semilla en tierra buena es el que escucha la Palabra, la entiende y da fruto: uno cien, otro sesenta, otro treinta.',
      verse_citation: 'Matthew 13:23',
      verse_citation_es: 'Mateo 13, 23',
      readings: [
        {
          label: 'Reading 1',
          label_es: 'Primera lectura',
          citation: 'Isaiah 55:10-11',
          citation_es: 'Isaías 55, 10-11',
          text: `Thus says the LORD:\nJust as from the heavens\nthe rain and snow come down\nand do not return there\ntill they have watered the earth,\nmaking it fertile and fruitful,\ngiving seed to the one who sows\nand bread to the one who eats,\nso shall my word be\nthat goes forth from my mouth;\nmy word shall not return to me void,\nbut shall do my will,\nachieving the end for which I sent it.`,
          text_es: `Esto dice el Señor:\n"Como bajan del cielo la lluvia y la nieve\ny no vuelven allá, sino después de empapar la tierra,\nde fecundarla y hacerla germinar,\na fin de que dé semilla para sembrar y pan para comer,\nasí será la palabra que sale de mi boca:\nno volverá a mí sin resultado,\nsino que hará mi voluntad\ny cumplirá su misión".`,
        },
        {
          label: 'Responsorial Psalm',
          label_es: 'Salmo responsorial',
          citation: 'Psalm 65:10, 11, 12-13, 14',
          citation_es: 'Salmo 64, 10. 11. 12-13. 14',
          text: `R. (Lk 8:8) The seed that falls on good ground will yield a fruitful harvest.\n\nYou have visited the land and watered it;\ngreatly have you enriched it.\nGod's watercourses are filled;\nyou have prepared the grain.\nR. The seed that falls on good ground will yield a fruitful harvest.\n\nThus have you prepared the land: drenching its furrows,\nbreaking up its clods,\nSoftening it with showers,\nblessing its yield.\nR. The seed that falls on good ground will yield a fruitful harvest.\n\nYou have crowned the year with your bounty,\nand your paths overflow with a rich harvest;\nThe untilled meadows overflow with it,\nand rejoicing clothes the hills.\nR. The seed that falls on good ground will yield a fruitful harvest.\n\nThe fields are garmented with flocks\nand the valleys blanketed with grain.\nThey shout and sing for joy.\nR. The seed that falls on good ground will yield a fruitful harvest.`,
          text_es: `R. Señor, danos siempre de tu agua.\n\nSeñor, tú cuidas de la tierra,\nla riegas y la colmas de riqueza.\nLas nubes del Señor van por los campos,\nrebosantes de agua, como acequias.\nR. Señor, danos siempre de tu agua.\n\nTú preparas las tierras para el trigo:\nriegas los surcos, aplanas los terrones,\nreblandeces el suelo con la lluvia,\nbendices los renuevos.\nR. Señor, danos siempre de tu agua.\n\nTú coronas el año con tus bienes,\ntus senderos derraman abundancia,\nestán verdes los pastos del desierto,\nlas colinas con flores adornadas.\nR. Señor, danos siempre de tu agua.\n\nLos prados se visten de rebaños,\nde trigales los valles se engalanan.\nTodo aclama al Señor.\nTodo le canta.\nR. Señor, danos siempre de tu agua.`,
        },
        {
          label: 'Reading 2',
          label_es: 'Segunda lectura',
          citation: 'Romans 8:18-23',
          citation_es: 'Romanos 8, 18-23',
          text: `Brothers and sisters:\nI consider that the sufferings of this present time are as nothing\ncompared with the glory to be revealed for us.\nFor creation awaits with eager expectation\nthe revelation of the children of God;\nfor creation was made subject to futility,\nnot of its own accord but because of the one who subjected it,\nin hope that creation itself\nwould be set free from slavery to corruption\nand share in the glorious freedom of the children of God.\nWe know that all creation is groaning in labor pains even until now;\nand not only that, but we ourselves,\nwho have the firstfruits of the Spirit,\nwe also groan within ourselves\nas we wait for adoption, the redemption of our bodies.`,
          text_es: `Hermanos: Considero que los sufrimientos de esta vida no se pueden comparar con la gloria que un día se manifestará en nosotros; porque toda la creación espera, con seguridad e impaciencia, la revelación de esa gloria de los hijos de Dios.\n\nLa creación está ahora sometida al desorden, no por su querer, sino por voluntad de aquel que la sometió. Pero dándole al mismo tiempo esta esperanza: que también ella misma, va a ser liberada de la esclavitud de la corrupción, para compartir la gloriosa libertad de los hijos de Dios.\n\nSabemos, en efecto, que la creación entera gime hasta el presente y sufre dolores de parto; y no sólo ella, sino también nosotros, los que poseemos las primicias del Espíritu, gemimos interiormente, anhelando que se realice plenamente nuestra condición de hijos de Dios, la redención de nuestro cuerpo.`,
        },
        {
          label: 'Alleluia',
          label_es: 'Aclamación antes del Evangelio',
          citation: '',
          citation_es: '',
          text: `R. Alleluia, alleluia.\nThe seed is the word of God, Christ is the sower.\nAll who come to him will have life forever.\nR. Alleluia, alleluia.`,
          text_es: `R. Aleluya, aleluya.\nLa semilla es la palabra de Dios y el sembrador es Cristo;\ntodo aquel que lo encuentra vivirá para siempre.\nR. Aleluya.`,
        },
        {
          label: 'Gospel',
          label_es: 'Evangelio',
          citation: 'Matthew 13:1-23',
          citation_es: 'Mateo 13, 1-23',
          text: `On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables, saying: "A sower went out to sow. And as he sowed, some seed fell on the path, and birds came and ate it up. Some fell on rocky ground, where it had little soil. It sprang up at once because the soil was not deep, and when the sun rose it was scorched, and it withered for lack of roots. Some seed fell among thorns, and the thorns grew up and choked it. But some seed fell on rich soil, and produced fruit, a hundred or sixty or thirtyfold. Whoever has ears ought to hear."\n\nThe disciples approached him and said, "Why do you speak to them in parables?" He said to them in reply, "Because knowledge of the mysteries of the kingdom of heaven has been granted to you, but to them it has not been granted. To anyone who has, more will be given and he will grow rich; from anyone who has not, even what he has will be taken away. This is why I speak to them in parables, because they look but do not see and hear but do not listen or understand. Isaiah's prophecy is fulfilled in them, which says: You shall indeed hear but not understand, you shall indeed look but never see. Gross is the heart of this people, they will hardly hear with their ears, they have closed their eyes, lest they see with their eyes and hear with their ears and understand with their hearts and be converted, and I heal them.\n\n"But blessed are your eyes, because they see, and your ears, because they hear. Amen, I say to you, many prophets and righteous people longed to see what you see but did not see it, and to hear what you hear but did not hear it.\n\n"Hear then the parable of the sower. The seed sown on the path is the one who hears the word of the kingdom without understanding it, and the evil one comes and steals away what was sown in his heart. The seed sown on rocky ground is the one who hears the word and receives it at once with joy. But he has no root and lasts only for a time. When some tribulation or persecution comes because of the word, he immediately falls away. The seed sown among thorns is the one who hears the word, but then worldly anxiety and the lure of riches choke the word and it bears no fruit. But the seed sown on rich soil is the one who hears the word and understands it, who indeed bears fruit and yields a hundred or sixty or thirtyfold."`,
          text_es: `Un día salió Jesús de la casa donde se hospedaba y se sentó a la orilla del mar. Se reunió en torno suyo tanta gente, que él se vio obligado a subir a una barca, donde se sentó, mientras la gente permanecía en la orilla. Entonces Jesús les habló de muchas cosas en parábolas y les dijo:\n\n"Una vez salió un sembrador a sembrar, y al ir arrojando la semilla, unos granos cayeron a lo largo del camino; vinieron los pájaros y se los comieron. Otros granos cayeron en terreno pedregoso, que tenía poca tierra; ahí germinaron pronto, porque la tierra no era gruesa; pero cuando subió el sol, los brotes se marchitaron, y como no tenían raíces, se secaron. Otros cayeron entre espinos, y cuando los espinos crecieron, sofocaron las plantitas. Otros granos cayeron en tierra buena y dieron fruto: unos, ciento por uno; otros, sesenta; y otros, treinta. El que tenga oídos, que oiga."\n\nDespués se le acercaron sus discípulos y le preguntaron: "¿Por qué les hablas en parábolas?" Él les respondió: "A ustedes se les ha concedido conocer los misterios del Reino de los cielos; pero a ellos no. Al que tiene, se le dará más y nadará en la abundancia; pero al que tiene poco, aun eso poco se le quitará. Por eso les hablo en parábolas, porque viendo no ven y oyendo no oyen ni entienden.\n\nEn ellos se cumple aquella profecía de Isaías que dice: Oirán una y otra vez y no entenderán; mirarán y volverán a mirar, pero no verán; porque este pueblo ha endurecido su corazón, ha cerrado sus ojos y tapado sus oídos, con el fin de no ver con los ojos, ni oír con los oídos, ni comprender con el corazón. Porque no quieren convertirse ni que yo los salve.\n\nPero, dichosos ustedes, porque sus ojos ven y sus oídos oyen. Yo les aseguro que muchos profetas y muchos justos desearon ver lo que ustedes ven y no lo vieron y oír lo que ustedes oyen y no lo oyeron.\n\nEscuchen, pues, ustedes lo que significa la parábola del sembrador.\n\nA todo hombre que oye la palabra del Reino y no la entiende, le llega el diablo y le arrebata lo sembrado en su corazón. Esto es lo que significan los granos que cayeron a lo largo del camino.\n\nLo sembrado sobre terreno pedregoso significa al que oye la palabra y la acepta inmediatamente con alegría; pero, como es inconstante, no la deja echar raíces, y apenas le viene una tribulación o una persecución por causa de la palabra, sucumbe.\n\nLo sembrado entre los espinos representa a aquel que oye la palabra, pero las preocupaciones de la vida y la seducción de las riquezas la sofocan y queda sin fruto.\n\nEn cambio, lo sembrado en tierra buena, representa a quienes oyen la palabra, la entienden y dan fruto: unos, el ciento por uno; otros, el sesenta; y otros, el treinta."`,
        },
      ],
    },
    vo: {
      title: 'Seventh Sunday after Pentecost',
      title_es: 'VII Domingo después de Pentecostés',
      rank: 'II classis',
      color: 'green',
      source_url: 'https://www.divinumofficium.com/cgi-bin/missa/missa.pl?date1=07-12-2026&command=prayLow&lang2=English',
      source_url_es: '',
      source_name: 'Divinum Officium',
      source_name_es: '',
      verse: 'By their fruits you will know them.',
      verse_es: 'Por sus frutos los conoceréis.',
      verse_citation: 'Matthew 7:20',
      verse_citation_es: 'Mateo 7, 20',
      readings: [
        {
          label: 'Introit',
          label_es: 'Introito',
          citation: 'Psalm 46:2-3',
          citation_es: 'Salmo 46, 2-3',
          text: `All you peoples clap your hands, shout to God with cries of gladness.\n\n℣. For the Lord, the Most High, the awesome, is the great King over all the earth.\n℣. Glory be to the Father, and to the Son, and to the Holy Ghost. As it was in the beginning, is now, and ever shall be, world without end. Amen.\n\nAll you peoples clap your hands, shout to God with cries of gladness.`,
          text_es: '',
        },
        {
          label: 'Collect',
          label_es: 'Colecta',
          citation: '',
          citation_es: '',
          text: `O God, Whose providence never fails to set things in order, we humbly beseech You to remove from us whatever is harmful and grant whatever is for our benefit. Through Jesus Christ, thy Son our Lord, Who liveth and reigneth with thee, in the unity of the Holy Ghost, God, world without end. Amen.`,
          text_es: '',
        },
        {
          label: 'Epistle',
          label_es: 'Epístola',
          citation: 'Romans 6:19-23',
          citation_es: 'Romanos 6, 19-23',
          text: `Brethren: I speak in a human way because of the weakness of your flesh; for as you yielded your members as slaves of uncleanness and iniquity unto iniquity, so now yield your members as slaves of justice unto sanctification. For when you were slaves of sin, you were free as regards justice. But what fruit had you then from those things of which you are now ashamed? For the end of these things is death. But now set free from sin and become slaves to God, you have your fruit unto sanctification, and as your end, life everlasting. For the wages of sin is death, but the gift of God is life everlasting in Christ Jesus our Lord.`,
          text_es: '',
        },
        {
          label: 'Gradual & Alleluia',
          label_es: 'Gradual y Aleluya',
          citation: 'Psalm 33:12, 6; Psalm 46:2',
          citation_es: 'Salmo 33, 12. 6; Salmo 46, 2',
          text: `Come, children, hear me; I will teach you the fear of the Lord.\n℣. Look to Him that you may be radiant with joy, and your faces may not blush with shame.\n\nAlleluia, alleluia.\n℣. All you peoples, clap your hands, shout to God with cries of gladness. Alleluia.`,
          text_es: '',
        },
        {
          label: 'Gospel',
          label_es: 'Evangelio',
          citation: 'Matthew 7:15-21',
          citation_es: 'Mateo 7, 15-21',
          text: `At that time, Jesus said to His disciples: Beware of false prophets, who come to you in sheep's clothing, but inwardly are ravenous wolves. By their fruits you will know them. Do men gather grapes from thorns, or figs from thistles? Even so, every good tree bears good fruit, but the bad tree bears bad fruit. A good tree cannot bear bad fruit, nor can a bad tree bear good fruit. Every tree that does not bear good fruit is cut down and thrown into the fire. Therefore, by their fruits you will know them. Not everyone who says to Me, 'Lord, Lord,' shall enter the kingdom of heaven; but he who does the will of My Father in heaven shall enter the kingdom of heaven.`,
          text_es: '',
        },
        {
          label: 'Offertory',
          label_es: 'Ofertorio',
          citation: 'Daniel 3:40',
          citation_es: 'Daniel 3, 40',
          text: `As in burnt offerings of rams and bullocks, and as in thousands of fat lambs: so let our sacrifice be made in Your sight this day, that it may please You: for there is no confusion to those who trust in You, O Lord.`,
          text_es: '',
        },
        {
          label: 'Communion',
          label_es: 'Comunión',
          citation: 'Psalm 30:3',
          citation_es: 'Salmo 30, 3',
          text: `Incline Your ear to me, make haste to deliver me.`,
          text_es: '',
        },
        {
          label: 'Postcommunion',
          label_es: 'Poscomunión',
          citation: '',
          citation_es: '',
          text: `May Your healing action, O Lord, mercifully rid us of our evil inclinations and lead us to do good. Through Jesus Christ, thy Son our Lord, Who liveth and reigneth with thee, in the unity of the Holy Ghost, God, world without end. Amen.`,
          text_es: '',
        },
      ],
    },
  },
];

export function getReadingsForDate(isoDate) {
  return SUNDAY_READINGS.find(r => r.date === isoDate) ?? null;
}

// Today's readings if available, otherwise the nearest entry within the next
// 7 days (the upcoming Sunday, or a holy day once those are added).
export function getUpcomingReadings(now = new Date()) {
  for (let i = 0; i <= 7; i++) {
    const entry = getReadingsForDate(format(addDays(now, i), 'yyyy-MM-dd'));
    if (entry) return { entry, daysAway: i };
  }
  return null;
}
