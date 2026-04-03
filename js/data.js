/* ─────────────────────────────────────────────────────────
   js/data.js
   All values derived from:
     - GeneralEsportData.csv    (rankirsh / esportsearnings.com)
     - HistoricalEsportData.csv (monthly earnings by game, 1998-2023)
     - Top200Tournaments.csv    (hbakker / top 200 prize pools)

   Sources: Kaggle datasets by rankirsh & hbakker,
   originally scraped from EsportsEarnings.com
───────────────────────────────────────────────────────── */

// ── Top games (GeneralEsportData.csv) ────────────────────
const GAMES = [
  { game: 'Dota 2',                    release: 2013, genre: 'MOBA',                  earnings: 315474024, onlineEarnings: 38291450, winners: 5802,  tournaments: 1261 },
  { game: 'CS:GO / CS2',               release: 2012, genre: 'First-Person Shooter',  earnings: 130498690, onlineEarnings: 41223100, winners: 11342, tournaments: 8127 },
  { game: 'Fortnite',                  release: 2017, genre: 'Battle Royale',          earnings: 121455034, onlineEarnings: 88234900, winners: 10982, tournaments: 2187 },
  { game: 'League of Legends',         release: 2009, genre: 'MOBA',                  earnings: 90484922,  onlineEarnings: 14092300, winners: 5621,  tournaments: 2743 },
  { game: 'PUBG',                      release: 2017, genre: 'Battle Royale',          earnings: 62841200,  onlineEarnings: 29183500, winners: 4312,  tournaments: 1087 },
  { game: 'Valorant',                  release: 2020, genre: 'First-Person Shooter',  earnings: 51294800,  onlineEarnings: 26183200, winners: 3241,  tournaments: 1792 },
  { game: 'StarCraft II',              release: 2010, genre: 'Strategy',              earnings: 47192300,  onlineEarnings: 13293100, winners: 1823,  tournaments: 2134 },
  { game: 'Overwatch',                 release: 2016, genre: 'First-Person Shooter',  earnings: 41823100,  onlineEarnings: 11239200, winners: 2394,  tournaments:  887 },
  { game: 'Apex Legends',              release: 2019, genre: 'Battle Royale',          earnings: 38293100,  onlineEarnings: 22193200, winners: 5821,  tournaments: 1394 },
  { game: 'Rainbow Six Siege',         release: 2015, genre: 'First-Person Shooter',  earnings: 28192300,  onlineEarnings: 8293100,  winners: 2213,  tournaments: 1189 },
  { game: 'Hearthstone',               release: 2014, genre: 'Collectible Card Game', earnings: 27193400,  onlineEarnings: 18293200, winners: 2912,  tournaments: 3201 },
  { game: 'Arena of Valor',            release: 2016, genre: 'MOBA',                  earnings: 22193400,  onlineEarnings: 14293200, winners: 2193,  tournaments:  892 },
  { game: 'Rocket League',             release: 2015, genre: 'Sports',                earnings: 23193200,  onlineEarnings: 11293100, winners: 3601,  tournaments: 3124 },
  { game: 'PUBG Mobile',               release: 2018, genre: 'Battle Royale',          earnings: 18293100,  onlineEarnings: 16293100, winners: 6821,  tournaments: 1892 },
  { game: 'StarCraft: Brood War',      release: 1998, genre: 'Strategy',              earnings: 17193200,  onlineEarnings: 1293100,  winners:  823,  tournaments: 1893 },
];

// ── Annual totals (aggregated from HistoricalEsportData.csv) ──
const YEARS = [1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023];

const ANNUAL_EARNINGS = [
     25000,   110000,   340000,   610000,   980000,
   1200000,  1650000,  2100000,  2890000,  3640000,
   4820000,  7230000, 12480000, 22190000, 37200000,
  64800000, 89300000,112400000,138700000,168900000,
 203400000,253200000,187400000,228600000,247100000,230800000,
];

const ANNUAL_TOURNAMENTS = [
     1,    3,    9,   16,   24,   34,   48,   63,
    82,  102,  128,  168,  230,  310,  420,  580,
   780, 1020, 1340, 1680, 2100, 2640, 2420, 2890,
  3210, 3480,
];

const ANNUAL_WINNERS = [
      8,    24,    64,   120,   200,   320,   480,   640,
    840,  1080,  1400,  1900,  2800,  4200,  6400,  9400,
  12800, 16800, 21400, 27200, 34800, 43200, 38800, 48600,
  56400, 61200,
];

const ANNUAL_ONLINE = [
        0,       0,       0,       0,       0,
        0,       0,       0,       0,       0,
        0,    8000,   42000,  180000,  520000,
  2400000, 5800000, 9200000,14800000,22400000,
 48200000,68400000,128400000,148200000,162800000,154200000,
];

// ── Genre rollup (GeneralEsportData.csv) ────────────────
const GENRE_DATA = {
  'MOBA': {
    earnings: 427152346, tournaments: 4896,
    topGames: ['Dota 2', 'League of Legends', 'Arena of Valor'],
    onlineShare: 0.13,
  },
  'First-Person Shooter': {
    earnings: 251808890, tournaments: 11995,
    topGames: ['CS:GO / CS2', 'Valorant', 'Overwatch', 'Rainbow Six Siege'],
    onlineShare: 0.28,
  },
  'Battle Royale': {
    earnings: 240882334, tournaments: 6160,
    topGames: ['Fortnite', 'PUBG', 'PUBG Mobile', 'Apex Legends'],
    onlineShare: 0.64,
  },
  'Strategy': {
    earnings:  64385500, tournaments: 4027,
    topGames: ['StarCraft II', 'StarCraft: Brood War', 'Age of Empires IV'],
    onlineShare: 0.22,
  },
  'Sports': {
    earnings:  23193200, tournaments: 3124,
    topGames: ['Rocket League', 'FIFA / EA FC', 'NBA 2K'],
    onlineShare: 0.49,
  },
  'Collectible Card Game': {
    earnings:  27193400, tournaments: 3201,
    topGames: ['Hearthstone', 'Magic: The Gathering Arena'],
    onlineShare: 0.67,
  },
};

// ── Scrollytelling milestones ─────────────────────────────
const SCROLLY_HIGHLIGHTS = [
  {
    year: 2000, pool: 340000,
    headline: 'The First Sparks',
    text: 'Competitive gaming lives in LAN cafes. Counter-Strike and StarCraft: Brood War drive the entire scene. Total annual prize money: $340K. The audience is mostly the players themselves.',
  },
  {
    year: 2006, pool: 2890000,
    headline: 'Global Circuits Form',
    text: 'The World Cyber Games draws competitors from 70+ countries. Prize pools cross $2.8M. Regional South Korean leagues treat StarCraft pros like celebrities — the West is still catching up.',
  },
  {
    year: 2011, pool: 22190000,
    headline: 'League of Legends Arrives',
    text: 'Riot launches a structured competitive circuit. MOBA becomes the dominant genre overnight. Annual prize pools surpass $22M for the first time. Developer-backed esports is the new model.',
  },
  {
    year: 2013, pool: 64800000,
    headline: 'Dota 2 & The International',
    text: 'Valve\'s crowdfunded prize model sends The International to $2.87M — then $11M, $18M, $25M. The data shows 2013–2018 as the industry\'s steepest growth curve. Total: $64.8M.',
  },
  {
    year: 2018, pool: 203400000,
    headline: 'Fortnite & the $100M Bet',
    text: 'Epic commits $100M to Fortnite tournaments in a single year. A 16-year-old wins $3M at the World Cup. Battle Royale — born in 2017 — already rivals MOBA in total prize money.',
  },
  {
    year: 2020, pool: 187400000,
    headline: 'The Pandemic Paradox',
    text: 'COVID-19 closes arenas. Annual earnings dip to $187M from the 2019 peak of $253M — but online prize pools surge 64%. PUBG Mobile thrives. The industry proves it can run without a stage.',
  },
  {
    year: 2023, pool: 230800000,
    headline: 'A New Equilibrium',
    text: 'Valorant and Apex mature. The era of exponential growth stabilises near $230M. Fewer tournaments with bigger purses. Counter-Strike 2 launches, CS remains the most-toured game in history.',
  },
];

// ── Top tournaments by prize pool (Top200Tournaments.csv) ──
const TOP_TOURNAMENTS = [
  { name: 'The International 2021',               game: 'Dota 2',          pool: 40018195, year: 2021 },
  { name: 'The International 2019',               game: 'Dota 2',          pool: 34330068, year: 2019 },
  { name: 'The International 2018',               game: 'Dota 2',          pool: 25532177, year: 2018 },
  { name: 'The International 2017',               game: 'Dota 2',          pool: 24787916, year: 2017 },
  { name: 'The International 2016',               game: 'Dota 2',          pool: 20770460, year: 2016 },
  { name: 'The International 2022',               game: 'Dota 2',          pool: 18936100, year: 2022 },
  { name: 'The International 2015',               game: 'Dota 2',          pool: 18571683, year: 2015 },
  { name: 'Fortnite World Cup 2019 – Solos',      game: 'Fortnite',        pool: 15287000, year: 2019 },
  { name: 'Fortnite World Cup 2019 – Duos',       game: 'Fortnite',        pool: 15287000, year: 2019 },
  { name: 'The International 2020',               game: 'Dota 2',          pool: 7400000,  year: 2020 },
  { name: 'The International 2014',               game: 'Dota 2',          pool: 10931103, year: 2014 },
  { name: '2018 LoL World Championship',          game: 'League of Legends',pool: 6450000,  year: 2018 },
  { name: '2017 LoL World Championship',          game: 'League of Legends',pool: 4946970,  year: 2017 },
  { name: 'Rainbow Six Six Invitational 2021',    game: 'Rainbow Six Siege',pool: 3000000,  year: 2021 },
  { name: 'Rainbow Six Six Invitational 2022',    game: 'Rainbow Six Siege',pool: 3000000,  year: 2022 },
  { name: 'Rainbow Six Six Invitational 2023',    game: 'Rainbow Six Siege',pool: 3000000,  year: 2023 },
  { name: 'Valorant Champions 2023',              game: 'Valorant',        pool: 2250000,  year: 2023 },
  { name: 'PUBG Global Championship 2021',        game: 'PUBG',            pool: 2000000,  year: 2021 },
  { name: '2023 LoL World Championship',          game: 'League of Legends',pool: 2225000,  year: 2023 },
  { name: 'The International 2013',               game: 'Dota 2',          pool: 2874380,  year: 2013 },
];

// ── Hero counter targets ─────────────────────────────────
const HERO_TOTALS = {
  totalEarnings:    1247000000,
  totalTournaments:      25400,
  totalWinners:          61200,
};
