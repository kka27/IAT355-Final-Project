/* ─────────────────────────────────────────────────────────
   js/data.js
   Single source of truth for all dataset values.
   Replace these arrays with real CSV-parsed data when ready.
   All other JS modules import from window.DATA (set below).
───────────────────────────────────────────────────────── */

const GAMES = [
  { game: 'Dota 2',           release: 2013, genre: 'MOBA',          earnings: 358000000, onlineEarnings: 42000000,  winners: 6200,  tournaments: 1600 },
  { game: 'Counter-Strike 2', release: 2012, genre: 'FPS',           earnings: 145000000, onlineEarnings: 38000000,  winners: 8900,  tournaments: 8400 },
  { game: 'Fortnite',         release: 2017, genre: 'Battle Royale',  earnings: 136000000, onlineEarnings: 92000000,  winners: 11200, tournaments: 2200 },
  { game: 'League of Legends',release: 2009, genre: 'MOBA',          earnings: 95000000,  onlineEarnings: 18000000,  winners: 5100,  tournaments: 2700 },
  { game: 'PUBG',             release: 2017, genre: 'Battle Royale',  earnings: 64000000,  onlineEarnings: 31000000,  winners: 4300,  tournaments: 1100 },
  { game: 'Valorant',         release: 2020, genre: 'FPS',           earnings: 53000000,  onlineEarnings: 28000000,  winners: 3200,  tournaments: 1800 },
  { game: 'StarCraft II',     release: 2010, genre: 'RTS',           earnings: 48000000,  onlineEarnings: 14000000,  winners: 1800,  tournaments: 2100 },
  { game: 'Overwatch',        release: 2016, genre: 'FPS',           earnings: 42000000,  onlineEarnings: 12000000,  winners: 2400,  tournaments: 890  },
  { game: 'Apex Legends',     release: 2019, genre: 'Battle Royale',  earnings: 39000000,  onlineEarnings: 24000000,  winners: 5800,  tournaments: 1400 },
  { game: 'Hearthstone',      release: 2014, genre: 'Card Game',     earnings: 28000000,  onlineEarnings: 19000000,  winners: 2900,  tournaments: 3200 },
  { game: 'Call of Duty',     release: 2003, genre: 'FPS',           earnings: 26000000,  onlineEarnings: 8000000,   winners: 4100,  tournaments: 1700 },
  { game: 'Rocket League',    release: 2015, genre: 'Sports',        earnings: 24000000,  onlineEarnings: 11000000,  winners: 3600,  tournaments: 3100 },
  { game: 'Rainbow Six Siege',release: 2015, genre: 'FPS',           earnings: 20000000,  onlineEarnings: 7000000,   winners: 2200,  tournaments: 1200 },
  { game: 'StarCraft: BW',    release: 1998, genre: 'RTS',           earnings: 18000000,  onlineEarnings: 2000000,   winners: 820,   tournaments: 1900 },
  { game: 'FIFA / EA FC',     release: 2001, genre: 'Sports',        earnings: 16000000,  onlineEarnings: 9000000,   winners: 4800,  tournaments: 2400 },
];

const YEARS = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023];

// Total prize money per year (all titles combined, USD)
const ANNUAL_EARNINGS = [1.2,2.8,3.4,4.1,5.6,7.2,9.8,12.1,14.3,16.8,21.4,28.7,35.2,48.6,65.3,82.4,104.7,138.2,174.5,202.3,185.4,218.6,248.1,267.4].map(v => v * 1e6);

// Tournaments held per year
const ANNUAL_TOURNAMENTS = [420,580,710,890,1100,1340,1680,2100,2450,2900,3600,4400,5200,6100,7200,8400,9800,11200,13400,15200,14100,16300,18700,21200];

// Unique prize-winning players per year
const ANNUAL_WINNERS = [1200,1800,2200,2700,3300,4100,5000,6200,7400,8900,10400,12200,14100,16800,19400,22100,25600,30200,36800,43100,39400,47200,54600,61800];

// Online-only prize money per year
const ANNUAL_ONLINE = [0.05,0.08,0.1,0.15,0.25,0.4,0.7,1.0,1.4,2.1,3.2,4.8,6.1,8.4,12.1,16.8,22.4,32.6,48.2,62.4,118.2,148.3,164.2,178.1].map(v => v * 1e6);

// Genre-level rollup data
const GENRE_DATA = {
  'MOBA':          { earnings: 453000000, tournaments: 4300,  games: ['Dota 2', 'League of Legends', 'Heroes of the Storm'] },
  'FPS':           { earnings: 286000000, tournaments: 14000, games: ['CS2', 'Valorant', 'Overwatch', 'CoD', 'R6S'] },
  'Battle Royale': { earnings: 239000000, tournaments: 4700,  games: ['Fortnite', 'PUBG', 'Apex Legends', 'Warzone'] },
  'RTS':           { earnings: 66000000,  tournaments: 4000,  games: ['StarCraft II', 'StarCraft BW', 'Age of Empires'] },
  'Sports':        { earnings: 40000000,  tournaments: 5500,  games: ['Rocket League', 'FIFA / EA FC', 'NBA 2K'] },
  'Card Game':     { earnings: 28000000,  tournaments: 3200,  games: ['Hearthstone', 'Gwent', 'Magic: The Gathering'] },
};

// Key narrative moments for the scrollytelling section
const SCROLLY_HIGHLIGHTS = [
  { year: 2001, pool: 2800000 },
  { year: 2006, pool: 9800000 },
  { year: 2011, pool: 28700000 },
  { year: 2013, pool: 48600000 },
  { year: 2018, pool: 174500000 },
  { year: 2020, pool: 185400000 },
];
