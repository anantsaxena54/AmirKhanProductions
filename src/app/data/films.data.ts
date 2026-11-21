import { Film, JournalArticle, StudioMilestone } from '../models/film.model';

export const AKP_FILMS: Film[] = [
  {
    id: 'lagaan',
    slug: 'lagaan',
    title: 'Lagaan',
    subtitle: 'Once Upon a Time in India',
    tagline: 'An unspoken bet, an impossible game, an indomitable spirit.',
    year: 2001,
    releaseDate: '15 June 2001',
    genres: ['Period Drama', 'Sports', 'Musical'],
    tag: 'PERIOD DRAMA / SPORTS',
    language: 'Hindi / Awadhi / English',
    runtimeMinutes: 224,
    runtimeDisplay: '3 hr 44 min',
    synopsis: 'In 1893 Victorian India, the people of a drought-stricken village in Champaner stake their future on a high-stakes cricket match against British officers to repeal their oppressive land taxes (lagaan).',
    synopsisLong: [
      'Set in 1893 during the late Victorian period of the British Raj, Lagaan follows Bhuvan, a spirited farmer in the village of Champaner. When an arrogant British captain challenges the villagers to a game of cricket to settle an unjust doubling of their land tax, Bhuvan accepts the challenge despite having never played the sport.',
      'Against impossible odds, Bhuvan rallies a fractured, diverse community across caste and religious divides, forging an unlikely team united by dignity and resistance. Directed by Ashutosh Gowariker and produced by Aamir Khan in AKP\'s maiden voyage, Lagaan became a landmark in modern world cinema.',
      'Nominated for the Academy Award for Best Foreign Language Film at the 74th Oscars, Lagaan rewrote the possibilities of Indian storytelling on the global stage.'
    ],
    director: ['Ashutosh Gowariker'],
    writer: ['Ashutosh Gowariker', 'Kumar Dave', 'Sanjay Dayma'],
    producers: ['Aamir Khan', 'Reena Dutta'],
    cast: ['Aamir Khan (Bhuvan)', 'Gracy Singh (Gauri)', 'Rachel Shelley (Elizabeth Russell)', 'Paul Blackthorne (Captain Russell)', 'Kulbhushan Kharbanda (Raja Puran Singh)', 'Raghubir Yadav (Bhura)'],
    poster: 'assets/posters/lagaan.png',
    heroStill: 'assets/media/vintage-projector.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=oSIGQ0245yI',
    youtubeId: 'oSIGQ0245yI',
    kind: 'archive',
    featured: true,
    oscarSelection: true,
    accolades: [
      'Academy Award Nominee — Best Foreign Language Film (74th Oscars)',
      '8 National Film Awards including Best Popular Film Providing Wholesome Entertainment',
      'Locarno International Film Festival Audience Award'
    ],
    gallery: [
      { src: 'assets/posters/lagaan.png', alt: 'Lagaan cinematic poster artwork', caption: 'Official theatrical key visual (2001)' },
      { src: 'assets/media/vintage-projector.jpg', alt: 'Cinema projector lighting the narrative', caption: 'The 35mm film print projection era' }
    ],
    behindScenes: [
      { src: 'assets/media/vintage-projector.jpg', alt: 'Filming on location in Bhuj, Gujarat', caption: 'Shot on location in the arid wilderness of Kutch, Gujarat, facing extreme desert conditions.' },
      { src: 'assets/brand/Aamir_khan_productions.png', alt: 'AKP founding mark', caption: 'Marking the inaugural production under the Aamir Khan Productions banner.' }
    ],
    credits: [
      { role: 'Directed by', names: ['Ashutosh Gowariker'] },
      { role: 'Produced by', names: ['Aamir Khan Productions Pvt. Ltd.', 'Aamir Khan'] },
      { role: 'Screenplay & Dialogue', names: ['Ashutosh Gowariker', 'K.P. Saxena (Hindi/Awadhi Dialogues)'] },
      { role: 'Music & Background Score', names: ['A.R. Rahman'] },
      { role: 'Lyrics', names: ['Javed Akhtar'] },
      { role: 'Cinematography', names: ['Anil Mehta (ISC)'] },
      { role: 'Production Design', names: ['Nitin Chandrakant Desai'] },
      { role: 'Costume Design', names: ['Bhanu Athaiya'] },
      { role: 'Editing', names: ['Ballu Saluja'] }
    ],
    quote: 'Hum jeetenge, hum zaroor jeetenge. (We will win, we must win.)'
  },
  {
    id: 'laapataa-ladies',
    slug: 'laapataa-ladies',
    title: 'Laapataa Ladies',
    subtitle: 'Lost Ladies',
    tagline: 'Sometimes you have to lose yourself to find who you are.',
    year: 2024,
    releaseDate: '1 March 2024',
    genres: ['Drama', 'Satire', 'Comedy'],
    tag: 'DRAMA / SATIRE / COMEDY',
    language: 'Hindi / Bhojpuri',
    runtimeMinutes: 122,
    runtimeDisplay: '2 hr 02 min',
    synopsis: 'In 2001 rural India, two young brides are accidentally swapped during an overcrowded train journey, setting off a poignant tale of mistaken identity, independence, and quiet liberation.',
    synopsisLong: [
      'Set in the fictional state of Nirmal Pradesh in 2001, Phool and Jaya are two young veiled brides travelling on the same train with their newlywed husbands. In the confusion of disembarking in the dead of night, one husband accidentally takes home the wrong veiled bride.',
      'As a frantic search ensues, both women find themselves navigating unexpected communities, female solidarity, and personal empowerment in worlds they never knew existed.',
      'Directed with radiant nuance by Kiran Rao, the film premiered at the Toronto International Film Festival (TIFF) and was selected as India\'s official submission for the 97th Academy Awards.'
    ],
    director: ['Kiran Rao'],
    writer: ['Biplab Goswami (Story)', 'Sneha Desai (Screenplay & Dialogues)', 'Divyanidhi Sharma (Additional Dialogues)'],
    producers: ['Aamir Khan', 'Kiran Rao', 'Jyoti Deshpande'],
    cast: ['Nitanshi Goel (Phool)', 'Pratibha Ranta (Jaya / Pushpa)', 'Sparsh Shrivastava (Deepak)', 'Ravi Kishan (Inspector Shyam Manohar)', 'Chhaya Kadam (Manju Maai)'],
    poster: 'assets/posters/laapataa_ladies.jpg',
    heroStill: 'assets/posters/laapataa_ladies.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=0s36oAosBGs',
    youtubeId: '0s36oAosBGs',
    kind: 'recent',
    featured: true,
    oscarSelection: true,
    accolades: [
      'Official Selection — 97th Academy Awards (India\'s Oscar Entry)',
      'World Premiere — Toronto International Film Festival (TIFF 2023)',
      'Critics Choice & Audience Acclaim for Screenplay & Ensemble'
    ],
    gallery: [
      { src: 'assets/posters/laapataa_ladies.jpg', alt: 'Laapataa Ladies theatrical poster', caption: 'Official portrait poster artwork (2024)' }
    ],
    behindScenes: [
      { src: 'assets/posters/laapataa_ladies.jpg', alt: 'Production still of Laapataa Ladies', caption: 'Filmed in rural Madhya Pradesh capturing the authentic warmth of Central India.' }
    ],
    credits: [
      { role: 'Directed by', names: ['Kiran Rao'] },
      { role: 'Produced by', names: ['Aamir Khan', 'Kiran Rao', 'Jyoti Deshpande'] },
      { role: 'Production Banners', names: ['Aamir Khan Productions', 'Kindling Pictures', 'Jio Studios'] },
      { role: 'Music & Score', names: ['Ram Sampath'] },
      { role: 'Lyrics', names: ['Swanand Kirkire', 'Prashant Ingole'] },
      { role: 'Cinematography', names: ['Vikash Nowlakha'] }
    ],
    quote: 'Bhalai ka zamana nahi raha, par bhalai karna band mat karna.'
  },
  {
    id: 'dangal',
    slug: 'dangal',
    title: 'Dangal',
    subtitle: 'The Wrestling Mat',
    tagline: 'Mhaari chhoriyan chhoron se kam hain ke? (Are our girls any less than boys?)',
    year: 2016,
    releaseDate: '23 December 2016',
    genres: ['Biographical Sports', 'Drama'],
    tag: 'BIOGRAPHICAL SPORTS / DRAMA',
    language: 'Hindi / Haryanvi',
    runtimeMinutes: 161,
    runtimeDisplay: '2 hr 41 min',
    synopsis: 'Former wrestler Mahavir Singh Phogat defies societal conservatism in Haryana to train his daughters Geeta and Babita into world-class commonwealth wrestling champions.',
    synopsisLong: [
      'Based on the true story of the Phogat family from Balali, Haryana. Mahavir Singh Phogat, an amateur wrestler who was forced to give up his Olympic dreams due to financial hardship, resolves that his unborn son will win gold for India.',
      'When he has four daughters instead, he realizes that athletic talent and national pride know no gender. He begins training Geeta and Babita with relentless discipline against the deep prejudice of rural orthodoxy.',
      'Dangal achieved unprecedented global critical and commercial acclaim, becoming the highest-grossing Indian film in history and resonating deeply across Asia and the world.'
    ],
    director: ['Nitesh Tiwari'],
    writer: ['Nitesh Tiwari', 'Piyush Gupta', 'Shreyas Jain', 'Nikhil Mehrotra'],
    producers: ['Aamir Khan', 'Kiran Rao', 'Siddharth Roy Kapur'],
    cast: ['Aamir Khan (Mahavir Singh Phogat)', 'Fatima Sana Shaikh (Geeta Phogat)', 'Sanya Malhotra (Babita Kumari)', 'Sakshi Tanwar (Daya Shobha Kaur)', 'Zaira Wasim (Young Geeta)', 'Suhani Bhatnagar (Young Babita)'],
    poster: 'assets/posters/dangal.jpg',
    heroStill: 'assets/posters/dangal.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=x_7YlGv9u1g',
    youtubeId: 'x_7YlGv9u1g',
    kind: 'archive',
    featured: true,
    oscarSelection: false,
    accolades: [
      'Highest-grossing Indian film worldwide ($311M+)',
      'National Film Award — Best Supporting Actress (Zaira Wasim)',
      'Filmfare Awards — Best Film, Best Director, Best Actor'
    ],
    gallery: [
      { src: 'assets/posters/dangal.jpg', alt: 'Dangal theatrical poster', caption: 'The Phogat family on the akhada mat — key theatrical artwork' }
    ],
    behindScenes: [
      { src: 'assets/posters/dangal.jpg', alt: 'Aamir Khan transformative preparation', caption: 'Documented physical transformation from 98kg to athletic wrestling condition.' }
    ],
    credits: [
      { role: 'Directed by', names: ['Nitesh Tiwari'] },
      { role: 'Produced by', names: ['Aamir Khan', 'Kiran Rao', 'Siddharth Roy Kapur'] },
      { role: 'Music', names: ['Pritam'] },
      { role: 'Lyrics', names: ['Amitabh Bhattacharya'] },
      { role: 'Cinematography', names: ['Satyajit Pande (Setu)'] },
      { role: 'Wrestling Coach / Choreography', names: ['Kripa Shankar Patel Bishnoi'] }
    ],
    quote: 'Mhaari chhoriyan chhoron se kam hain ke?'
  },
  {
    id: 'taare-zameen-par',
    slug: 'taare-zameen-par',
    title: 'Taare Zameen Par',
    subtitle: 'Like Stars on Earth',
    tagline: 'Every child is special.',
    year: 2007,
    releaseDate: '21 December 2007',
    genres: ['Family Drama', 'Educational Drama'],
    tag: 'FAMILY DRAMA / EDUCATIONAL',
    language: 'Hindi / English',
    runtimeMinutes: 165,
    runtimeDisplay: '2 hr 45 min',
    synopsis: 'An eight-year-old boy considered a lazy troublemaker discovers his dyslexia and true artistic brilliance when an unconventional art teacher arrives at his boarding school.',
    synopsisLong: [
      'Eight-year-old Ishaan Awasthi finds the world of books and numbers baffling. His letters dance, words invert, and his school regards him as indifferent and delinquent. Desperate, his parents send him away to a strict boarding school, where Ishaan sinks into deep silent despair.',
      'Everything changes when Ram Shankar Nikumbh, a temp art teacher who works at the Tulips School for developmental disabilities, breaks the rigid classroom norms and recognizes Ishaan\'s struggle with dyslexia.',
      'The film catalyzed nationwide educational reforms in India regarding learning disabilities and remains one of the most beloved cinematic works on empathy and childhood.'
    ],
    director: ['Aamir Khan'],
    writer: ['Amole Gupte'],
    producers: ['Aamir Khan'],
    cast: ['Darsheel Safary (Ishaan Awasthi)', 'Aamir Khan (Ram Shankar Nikumbh)', 'Tisca Chopra (Maya Awasthi)', 'Vipin Sharma (Nandkishore Awasthi)', 'Sachet Engineer (Yohan Awasthi)'],
    poster: 'assets/posters/taare_zameen_par.jpg',
    heroStill: 'assets/posters/taare_zameen_par.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=tn_2Ie_jtNY',
    youtubeId: 'tn_2Ie_jtNY',
    kind: 'archive',
    featured: true,
    oscarSelection: true,
    accolades: [
      'India\'s Official Submission for 81st Academy Awards',
      'National Film Award for Best Film on Family Welfare',
      'Filmfare Award for Best Film & Best Director'
    ],
    gallery: [
      { src: 'assets/posters/taare_zameen_par.jpg', alt: 'Taare Zameen Par poster', caption: 'Ishaan lost in the wonder of water and light — official poster' }
    ],
    behindScenes: [
      { src: 'assets/posters/taare_zameen_par.jpg', alt: 'Direction on set', caption: 'Aamir Khan\'s directorial debut, focusing on naturalistic childhood performances.' }
    ],
    credits: [
      { role: 'Directed by', names: ['Aamir Khan'] },
      { role: 'Creative Director & Writer', names: ['Amole Gupte'] },
      { role: 'Produced by', names: ['Aamir Khan Productions'] },
      { role: 'Music', names: ['Shankar–Ehsaan–Loy'] },
      { role: 'Lyrics', names: ['Prasoon Joshi'] },
      { role: 'Cinematography', names: ['Satyajit Pande', 'Sunita Radia'] }
    ],
    quote: 'Kyun bheed mein yun kho gaya main... bura hoon main maa?'
  },
  {
    id: 'sitaare-zameen-par',
    slug: 'sitaare-zameen-par',
    title: 'Sitaare Zameen Par',
    subtitle: 'Champions on Earth',
    tagline: 'Moving from empathy to empowerment.',
    year: 2025,
    releaseDate: '2025 (In Production / Release Schedule)',
    genres: ['Sports Drama', 'Comedy', 'Inspirational'],
    tag: 'SPORTS / COMEDY / INSPIRATIONAL',
    language: 'Hindi',
    runtimeMinutes: 140,
    runtimeDisplay: 'Approx. 2 hr 20 min',
    synopsis: 'A spirited sports coach and a team of neurodivergent athletes discover unexpected strength, laughter, and human connection through community basketball.',
    synopsisLong: [
      'Following the spiritual ethos of Taare Zameen Par, Sitaare Zameen Par transitions from emotional struggle to boundless joy and empowerment.',
      'Directed by R. S. Prasanna, the film portrays a self-absorbed coach tasked with coaching an extraordinary group of neurodivergent individuals, transforming both his world and theirs.',
      'Conceived as an uplifting exploration of dignity, neurodiversity, and sportsmanship.'
    ],
    director: ['R. S. Prasanna'],
    writer: ['R. S. Prasanna', 'Aamir Khan Productions Creative Team'],
    producers: ['Aamir Khan', 'Aparna Purohit'],
    cast: ['Aamir Khan', 'Genelia Deshmukh', 'Ensemble Special Athletes Cast'],
    poster: 'assets/posters/sitaare_zameen_par.webp',
    heroStill: 'assets/posters/sitaare_zameen_par.webp',
    trailerUrl: 'https://www.youtube.com/results?search_query=Sitaare+Zameen+Par+Aamir+Khan',
    kind: 'recent',
    featured: true,
    oscarSelection: false,
    accolades: [
      'Official AKP 2025 Flagship Production',
      'Focus on Inclusive Cinema & Neurodiverse Athletes'
    ],
    gallery: [
      { src: 'assets/posters/sitaare_zameen_par.webp', alt: 'Sitaare Zameen Par key visual', caption: 'Official announcement art' }
    ],
    behindScenes: [
      { src: 'assets/posters/sitaare_zameen_par.webp', alt: 'On court prep', caption: 'Intensive sports training and inclusive filmmaking workshop sessions.' }
    ],
    credits: [
      { role: 'Directed by', names: ['R. S. Prasanna'] },
      { role: 'Produced by', names: ['Aamir Khan Productions'] },
      { role: 'Banner', names: ['AKP Pvt. Ltd.'] }
    ],
    quote: 'Where the mind leads without fear, the game begins.'
  },
  {
    id: 'secret-superstar',
    slug: 'secret-superstar',
    title: 'Secret Superstar',
    subtitle: 'A Voice Beyond the Veil',
    tagline: 'Dreams see no boundaries.',
    year: 2017,
    releaseDate: '19 October 2017',
    genres: ['Musical Drama', 'Coming-of-Age'],
    tag: 'MUSICAL DRAMA / COMING-OF-AGE',
    language: 'Hindi',
    runtimeMinutes: 150,
    runtimeDisplay: '2 hr 30 min',
    synopsis: 'A 15-year-old girl in Vadodara aspires to become a singer, anonymously sharing her music on the internet while wearing a niqab to shield her dreams from her oppressive father.',
    synopsisLong: [
      'Insia Malik is a talented teenage songwriter living under the fear of her patriarchal, abusive father. Supported only by her devoted mother Najma, Insia takes to YouTube wearing a niqab under the moniker "Secret Superstar".',
      'Her raw songs become a viral sensation across the world, catching the eye of flamboyant music director Shakti Kumaar, who provides a stepping stone toward her family\'s freedom.',
      'A global hit, Secret Superstar touched millions worldwide with its celebration of maternal devotion and creative courage.'
    ],
    director: ['Advait Chandan'],
    writer: ['Advait Chandan'],
    producers: ['Aamir Khan', 'Kiran Rao'],
    cast: ['Zaira Wasim (Insia Malik)', 'Meher Vij (Najma Malik)', 'Aamir Khan (Shakti Kumaar)', 'Raj Arjun (Farookh Malik)', 'Kabir Sajid (Guddu)'],
    poster: 'assets/posters/secret_superstar.jpg',
    heroStill: 'assets/posters/secret_superstar.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=J_yb8Horges',
    youtubeId: 'J_yb8Horges',
    kind: 'archive',
    featured: false,
    oscarSelection: false,
    accolades: [
      'National Film Award for Best Child Artist (Zaira Wasim)',
      'Filmfare Award for Best Actress (Critics) — Zaira Wasim',
      'Over $150M worldwide gross, record-setting reception in international territories'
    ],
    gallery: [
      { src: 'assets/posters/secret_superstar.jpg', alt: 'Secret Superstar poster', caption: 'Insia with her school bag and acoustic guitar' }
    ],
    behindScenes: [
      { src: 'assets/posters/secret_superstar.jpg', alt: 'Recording studio scenes', caption: 'Advait Chandan directing vocal sessions in Mumbai.' }
    ],
    credits: [
      { role: 'Directed by', names: ['Advait Chandan'] },
      { role: 'Produced by', names: ['Aamir Khan', 'Kiran Rao'] },
      { role: 'Music', names: ['Amit Trivedi'] },
      { role: 'Lyrics', names: ['Kausar Munir'] },
      { role: 'Cinematography', names: ['Anil Mehta (ISC)'] }
    ],
    quote: 'Main kaun hoon, main kya hoon... bas ek aawaz hoon.'
  },
  {
    id: 'laal-singh-chaddha',
    slug: 'laal-singh-chaddha',
    title: 'Laal Singh Chaddha',
    subtitle: 'The Journey of an Innocent Soul',
    tagline: 'Life is like a box of golgappas...',
    year: 2022,
    releaseDate: '11 August 2022',
    genres: ['Drama', 'Romance', 'Historical Panorama'],
    tag: 'DRAMA / HISTORICAL PANORAMA',
    language: 'Hindi / Punjabi',
    runtimeMinutes: 159,
    runtimeDisplay: '2 hr 39 min',
    synopsis: 'An innocent, pure-hearted man witnesses the unfolding decades of contemporary Indian history while remaining steadfast in his lifelong love for his childhood friend Rupa.',
    synopsisLong: [
      'Adapted from Winston Groom\'s novel and the 1994 classic Forrest Gump by veteran actor Atul Kulkarni, Laal Singh Chaddha chronicles India\'s socioeconomic and cultural metamorphosis through the gentle eyes of Laal.',
      'From childhood braces in Punjab to winning a cross-country marathon, bravery in the Kargil mountains, and founding a garment company with his friend Bala, Laal\'s journey is defined by simplicity and unconditional love.'
    ],
    director: ['Advait Chandan'],
    writer: ['Atul Kulkarni (Screenplay Adaptation)', 'Winston Groom (Original Novel)'],
    producers: ['Aamir Khan', 'Kiran Rao', 'Jyoti Deshpande', 'Ajit Andhare'],
    cast: ['Aamir Khan (Laal Singh Chaddha)', 'Kareena Kapoor Khan (Rupa D\'Souza)', 'Mona Singh (Gurpreet Kaur Chaddha)', 'Naga Chaitanya (Balaraju Bodi)', 'Manav Vij (Mohammad Paaji)'],
    poster: 'assets/posters/laal_singh_chaddha.webp',
    heroStill: 'assets/posters/laal_singh_chaddha.webp',
    trailerUrl: 'https://www.youtube.com/watch?v=1b3qD6N6Y-E',
    youtubeId: '1b3qD6N6Y-E',
    kind: 'archive',
    featured: false,
    oscarSelection: false,
    accolades: [
      'Filmed across over 100 locations across India from Kanyakumari to Ladakh',
      'Filmfare Award Nominee for Best Music & Cinematography'
    ],
    gallery: [
      { src: 'assets/posters/laal_singh_chaddha.webp', alt: 'Laal Singh Chaddha poster', caption: 'Laal with his feather and calm smile — official artwork' }
    ],
    behindScenes: [
      { src: 'assets/posters/laal_singh_chaddha.webp', alt: 'Train journey filming', caption: 'Extensive on-location railway journeys capturing the shifting Indian countryside.' }
    ],
    credits: [
      { role: 'Directed by', names: ['Advait Chandan'] },
      { role: 'Adapted by', names: ['Atul Kulkarni'] },
      { role: 'Produced by', names: ['Aamir Khan Productions', 'Viacom18 Studios', 'Paramount Pictures'] },
      { role: 'Music', names: ['Pritam'] },
      { role: 'Lyrics', names: ['Amitabh Bhattacharya'] },
      { role: 'Cinematography', names: ['Satyajit Pande (Setu)'] }
    ],
    quote: 'Zindagi golgappe jaisi hondi hai... pet bhare par man na bhare.'
  },
  {
    id: 'jaane-tu-ya-jaane-na',
    slug: 'jaane-tu-ya-jaane-na',
    title: 'Jaane Tu... Ya Jaane Na',
    subtitle: 'Friendship & Young Love',
    tagline: 'Sometimes, the person you are looking for is right next to you.',
    year: 2008,
    releaseDate: '4 July 2008',
    genres: ['Romance', 'Comedy', 'Coming-of-Age'],
    tag: 'ROMANTIC COMEDY / YOUTH CINEMA',
    language: 'Hindi',
    runtimeMinutes: 155,
    runtimeDisplay: '2 hr 35 min',
    synopsis: 'Two best friends, Jai and Aditi, believe they are completely incompatible as romantic partners and resolve to find love for each other, only to realize what was in front of them all along.',
    synopsisLong: [
      'Jai Singh Rathore, a pacifist Rajput who refuses violence, and Aditi Mahant, a feisty, fiercely loyal young woman, share an unbreakable bond that their friends and families assume is love.',
      'Adamant that they are merely platonic confidants, the two make a pact to search for each other\'s ideal romantic match across Mumbai.',
      'Produced by Aamir Khan Productions with a revolutionary soundtrack by A.R. Rahman, Jaane Tu... Ya Jaane Na redefined modern Indian romantic comedy for a new millennium generation.'
    ],
    director: ['Abbas Tyrewala'],
    writer: ['Abbas Tyrewala'],
    producers: ['Aamir Khan', 'Mansoor Khan'],
    cast: ["Imran Khan (Jai 'Rats' Singh Rathore)", "Genelia D'Souza (Aditi 'Meow' Mahant)", 'Ratna Pathak Shah', 'Naseeruddin Shah', 'Prateik Babbar', 'Nirav Mehta', 'Alishka Varde', 'Karan Makhija'],
    poster: 'assets/posters/dangal.jpg',
    heroStill: 'assets/posters/dangal.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=iIUCuQ3V96U',
    youtubeId: 'iIUCuQ3V96U',
    kind: 'archive',
    featured: false,
    oscarSelection: false,
    accolades: [
      'Filmfare Awards — Best Debut Male (Imran Khan)',
      'Filmfare Awards — Best Music Director (A.R. Rahman)',
      'Four Filmfare Awards and widespread critical adoration'
    ],
    gallery: [
      { src: 'assets/posters/dangal.jpg', alt: 'Jaane Tu... Ya Jaane Na visual', caption: 'The gang at St. Xavier\'s College — young Mumbai cinema.' }
    ],
    behindScenes: [
      { src: 'assets/posters/dangal.jpg', alt: 'Abbas Tyrewala on set', caption: 'Directing Imran Khan and Genelia D\'Souza during Mumbai rehearsals.' }
    ],
    credits: [
      { role: 'Direction & Screenplay', names: ['Abbas Tyrewala'] },
      { role: 'Producers', names: ['Aamir Khan', 'Mansoor Khan'] },
      { role: 'Original Music', names: ['A.R. Rahman'] },
      { role: 'Cinematography', names: ['Manoj Lobo'] }
    ],
    quote: 'Kabhi kabhi aditi zindagi mein yunhi koi apna lagta hai...'
  },
  {
    id: 'peepli-live',
    slug: 'peepli-live',
    title: 'Peepli Live',
    subtitle: 'Satire on Agriculture & Media',
    tagline: 'Life is live. Death is prime time.',
    year: 2010,
    releaseDate: '13 August 2010',
    genres: ['Satire', 'Black Comedy', 'Social Drama'],
    tag: 'POLITICAL SATIRE / SOCIAL REALISM',
    language: 'Hindi',
    runtimeMinutes: 106,
    runtimeDisplay: '1 hr 46 min',
    synopsis: "An impoverished farmer's threat to commit suicide to secure government compensation for his debt-ridden family sparks an unhinged media circus and election frenzy.",
    synopsisLong: [
      'Set in the rural heartland of Peepli village, farmers Natha and Budhia face the auction of their ancestral land over an unpaid bank loan.',
      'Hearing of a government compensation scheme for families of deceased farmers, Budhia convinces Natha to make the ultimate sacrifice. When an ambitious reporter overhears the conversation, the village is overrun by television vans, sensationalist anchors, and opportunistic politicians.',
      'Peepli Live was chosen as India\'s official submission to the 83rd Academy Awards and became the first Indian film selected in competition at the Sundance Film Festival.'
    ],
    director: ['Anusha Rizvi', 'Mahmood Farooqui'],
    writer: ['Anusha Rizvi'],
    producers: ['Aamir Khan', 'Kiran Rao'],
    cast: ['Omkar Das Manikpuri (Natha)', 'Raghubir Yadav (Budhia)', 'Shalini Vatsa (Dhaniya)', 'Farrukh Jaffer', 'Nawazuddin Siddiqui (Rakesh)'],
    poster: 'assets/posters/taare-zameen-par.jpg',
    heroStill: 'assets/posters/taare-zameen-par.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=iIUCuQ3V96U',
    youtubeId: 'iIUCuQ3V96U',
    kind: 'archive',
    featured: false,
    oscarSelection: true,
    accolades: [
      'India\'s Official Submission — 83rd Academy Awards (Best Foreign Language Film)',
      'Sundance Film Festival — World Cinema Dramatic Competition Selection',
      'Durban International Film Festival — Best First Feature Film'
    ],
    gallery: [
      { src: 'assets/posters/taare-zameen-par.jpg', alt: 'Peepli Live stills', caption: 'Natha sitting quietly amid the media frenzy.' }
    ],
    behindScenes: [
      { src: 'assets/posters/taare-zameen-par.jpg', alt: 'Village location shoot', caption: 'Filmed on authentic locations in Madhya Pradesh with non-professional theatre actors.' }
    ],
    credits: [
      { role: 'Direction & Screenplay', names: ['Anusha Rizvi', 'Mahmood Farooqui'] },
      { role: 'Producers', names: ['Aamir Khan', 'Kiran Rao'] },
      { role: 'Cinematography', names: ['Shanker Raman'] },
      { role: 'Editing', names: ['Hemanti Sarkar'] }
    ],
    quote: 'Mehangai dayain khaye jaat hai...'
  },
  {
    id: 'dhobi-ghat',
    slug: 'dhobi-ghat',
    title: 'Dhobi Ghat',
    subtitle: 'Mumbai Diaries',
    tagline: 'In a city of twelve million, four lives collide.',
    year: 2010,
    releaseDate: '21 January 2011',
    genres: ['Drama', 'Art House', 'Urban Chronicle'],
    tag: 'ART HOUSE / URBAN MEMOIR',
    language: 'Hindi / English',
    runtimeMinutes: 100,
    runtimeDisplay: '1 hr 40 min',
    synopsis: 'Four individuals from contrasting strata of Mumbai navigate loneliness, artistic isolation, and serendipitous human intimacy across the monsoons.',
    synopsisLong: [
      'Arun, a reclusive painter moving into a new apartment, discovers video tapes left behind by a young newlywed named Yasmin, whose recorded memories become his artistic muse.',
      'Shai, an American-Indian investment banker on sabbatical pursuing street photography, forms an unlikely friendship with Munna, an ambitious dhobi (washerman) who dreams of becoming an actor.',
      'Kiran Rao\'s directorial debut is a lyrical, atmospheric homage to Mumbai, shot on 16mm and digital cameras with profound sensitivity to space and sound.'
    ],
    director: ['Kiran Rao'],
    writer: ['Kiran Rao'],
    producers: ['Aamir Khan', 'Kiran Rao'],
    cast: ['Aamir Khan (Arun)', 'Prateik Babbar (Munna)', 'Monica Dogra (Shai)', 'Kriti Malhotra (Yasmin)'],
    poster: 'assets/posters/lagaan.jpg',
    heroStill: 'assets/posters/lagaan.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=iIUCuQ3V96U',
    youtubeId: 'iIUCuQ3V96U',
    kind: 'archive',
    featured: false,
    oscarSelection: false,
    accolades: [
      'Toronto International Film Festival — World Premiere',
      'London Film Festival — Official Selection',
      'BAFTA longlist considerations for foreign cinema'
    ],
    gallery: [
      { src: 'assets/posters/lagaan.jpg', alt: 'Dhobi Ghat city stills', caption: 'The washer ghats of Mahalaxmi at daybreak.' }
    ],
    behindScenes: [
      { src: 'assets/posters/lagaan.jpg', alt: 'Kiran Rao directing', caption: 'Guerrilla shooting across crowded Mumbai train platforms.' }
    ],
    credits: [
      { role: 'Director & Writer', names: ['Kiran Rao'] },
      { role: 'Producers', names: ['Aamir Khan', 'Kiran Rao'] },
      { role: 'Music', names: ['Gustavo Santaolalla'] },
      { role: 'Cinematography', names: ['Tushar Kanti Ray'] }
    ],
    quote: 'This city tells stories if you pause to listen.'
  },
  {
    id: 'delhi-belly',
    slug: 'delhi-belly',
    title: 'Delhi Belly',
    subtitle: 'The Heist That Went Wrong',
    tagline: 'Shit happens.',
    year: 2011,
    releaseDate: '1 July 2011',
    genres: ['Black Comedy', 'Crime', 'Cult Thriller'],
    tag: 'CRIME COMEDY / CULT CLASSIC',
    language: 'English / Hindi',
    runtimeMinutes: 103,
    runtimeDisplay: '1 hr 43 min',
    synopsis: 'Three disheveled roommates in Old Delhi unwittingly intercept illicit contraband belonging to a dangerous gang lord, unleashing a frenetic chase through the metropolis.',
    synopsisLong: [
      'Tashi, a journalist on the brink of an unwanted wedding, shares a dilapidated apartment with cartoonist Arup and eccentric photographer Nitin.',
      'A miscommunicated courier parcel replaces a stool sample with uncut smuggled diamonds, making the hapless trio the primary targets of ruthless gangster Somayajulu.',
      'Unapologetic, razor-sharp, and internationally celebrated, Delhi Belly broke every established Bollywood convention of pacing, dialogue, and comedic staging.'
    ],
    director: ['Abhinay Deo'],
    writer: ['Akshat Verma'],
    producers: ['Aamir Khan', 'Kiran Rao', 'Ronnie Screwvala'],
    cast: ['Imran Khan (Tashi)', 'Vir Das (Arup)', 'Kunaal Roy Kapur (Nitin)', 'Poorna Jagannathan (Menaka)', 'Shenaz Treasurywala (Sonia)', 'Vijay Raaz (Somayajulu)'],
    poster: 'assets/posters/dangal.jpg',
    heroStill: 'assets/posters/dangal.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=iIUCuQ3V96U',
    youtubeId: 'iIUCuQ3V96U',
    kind: 'archive',
    featured: false,
    oscarSelection: false,
    accolades: [
      'Filmfare Awards — Best Screenplay (Akshat Verma)',
      'Filmfare Awards — Best Art Direction & Best Editing',
      'Cult commercial and international festival phenomenon'
    ],
    gallery: [
      { src: 'assets/posters/dangal.jpg', alt: 'Delhi Belly visual', caption: 'The three flatmates trapped in Old Delhi chaos.' }
    ],
    behindScenes: [
      { src: 'assets/posters/dangal.jpg', alt: 'On set in Daryaganj', caption: 'Abhinay Deo filming the high-speed rickshaw chase.' }
    ],
    credits: [
      { role: 'Director', names: ['Abhinay Deo'] },
      { role: 'Writer', names: ['Akshat Verma'] },
      { role: 'Producers', names: ['Aamir Khan', 'Kiran Rao', 'Ronnie Screwvala'] },
      { role: 'Music', names: ['Ram Sampath'] },
      { role: 'Cinematography', names: ['Jason West'] }
    ],
    quote: 'Bhaag DK Bose, andha race!'
  }
];

export const AKP_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    slug: 'the-craft-behind-every-frame',
    title: 'The Craft Behind Every Frame',
    subtitle: 'Why negative space and restraint define our cinematic grammar.',
    category: 'STUDIO NOTES',
    date: '18 November 2026',
    readTime: '5 min read',
    excerpt: 'Cinema is as much about what remains unsaid as what is shouted. At AKP, our creative workshops focus on removing the decorative to arrive at the truth of a scene.',
    content: [
      'When cinema seeks to overwhelm the senses without engaging the intellect, it quickly evaporates into memory. At Aamir Khan Productions, every project starts not with spectacle, but with an inquiry into human nature.',
      'From the drought-scorched earth of Champaner in Lagaan to the crowded train compartments of Nirmal Pradesh in Laapataa Ladies, our production design and script architecture demand authenticity over visual noise.',
      'Restraint is not a lack of ambition; it is the discipline of trusting the audience. When a frame has room to breathe, the emotion inside it expands.'
    ],
    image: 'assets/media/vintage-projector.jpg',
    imageAlt: 'Vintage filmmaking projector lens and beam',
    author: 'AKP Editorial Bureau',
    featured: true
  },
  {
    id: 'art-2',
    slug: 'revisiting-stories-that-endure',
    title: 'Revisiting Stories That Endure',
    subtitle: 'From 35mm celluloid to 4K restoration: preserving our cinematic heritage.',
    category: 'ARCHIVE',
    date: '04 October 2026',
    readTime: '6 min read',
    excerpt: 'As our early catalog crosses into its third decade, a dedicated archive team works to restore original camera negatives for future generations of film scholars.',
    content: [
      'The tactile reality of 35mm film holds a warmth and textural grain that digital sensors still strive to replicate. Looking through the original camera negatives of Lagaan and Taare Zameen Par is like touching living history.',
      'Our ongoing preservation initiative is not just about resolution upscaling; it is about color-grading integrity, audio track preservation from multi-track magnetic tapes, and archiving behind-the-scenes production diaries.',
      'Great stories belong to the culture that shaped them. Safeguarding them is the fundamental obligation of an independent production house.'
    ],
    image: 'assets/posters/lagaan.png',
    imageAlt: 'Restoration stills from Lagaan',
    author: 'Archive & Preservation Desk'
  },
  {
    id: 'art-3',
    slug: 'voices-from-the-script-room',
    title: 'Voices From the Script Room',
    subtitle: 'The quiet alchemy of collaborative screenplay development.',
    category: 'CINEMA ESSAY',
    date: '12 September 2026',
    readTime: '4 min read',
    excerpt: 'How hundreds of draft revisions across years pave the path for stories that touch collective consciousness across cultures and continents.',
    content: [
      'Every AKP script undergoes years of rigorous readings, character stress-tests, and dialect coaches before a camera is ever loaded. This was true for Dangal, where Haryanvi akhada idioms had to feel organically rooted, and equally for the gentle folk wit of Laapataa Ladies.',
      'We believe the director\'s vision and the writer\'s voice must exist in profound dialogue. When the foundation of paper is impregnable, the camera simply has to observe.'
    ],
    image: 'assets/posters/laapataa_ladies.jpg',
    imageAlt: 'Script development study for contemporary cinema',
    author: 'Creative Development Group'
  }
];

export const AKP_MILESTONES: StudioMilestone[] = [
  {
    year: '1999',
    title: 'Foundation of AKP',
    subtitle: 'Aamir Khan Productions Founded',
    description: 'Established in Mumbai by Aamir Khan with the founding ethos of creating independent cinema that bridges artistic integrity with wide public engagement.'
  },
  {
    year: '2001',
    title: 'Lagaan & Academy Award Nomination',
    subtitle: 'Maiden Production Milestone',
    description: 'Inaugural production Lagaan achieves historic critical acclaim, receives an Academy Award nomination for Best Foreign Language Film, and wins 8 National Film Awards.'
  },
  {
    year: '2007',
    title: 'Taare Zameen Par & Social Impact',
    subtitle: 'National Cultural Discourse',
    description: 'Directorial debut of Aamir Khan catalyzes nationwide education reform and awareness regarding dyslexia and childhood learning differences.'
  },
  {
    year: '2016',
    title: 'Dangal & Global Resonance',
    subtitle: 'Global Milestone for Indian Cinema',
    description: 'Dangal sets the benchmark as the highest-grossing Indian film worldwide ($311M+), shattering box-office and critical records across India, China, and international markets.'
  },
  {
    year: '2024',
    title: 'Laapataa Ladies & 97th Oscars',
    subtitle: 'India\'s Official Academy Submission',
    description: 'Directed by Kiran Rao, Laapataa Ladies premieres at TIFF and is selected by the Film Federation of India as India\'s official submission for the 97th Academy Awards.'
  },
  {
    year: '2025',
    title: 'Sitaare Zameen Par & Next Horizon',
    subtitle: 'Ongoing Cinematic Journey',
    description: 'AKP enters its next quarter-century exploring inclusive storytelling, human sportsmanship, and cutting-edge digital archive preservation.'
  }
];
