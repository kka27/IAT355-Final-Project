/* ─────────────────────────────────────────────────────────
   js/data.js
   Static dataset and derived series used by the charts.
───────────────────────────────────────────────────────── */

const HERO_TOTALS = {
  totalEarnings: 1131747170,
  totalTournaments: 47503,
  totalWinners: 91631
};

const YEAR_DATA = [
  { year: 1998, earnings: 25000, players: 8, tournaments: 1 },
  { year: 1999, earnings: 110000, players: 48, tournaments: 4 },
  { year: 2000, earnings: 155000, players: 184, tournaments: 10 },
  { year: 2001, earnings: 358000, players: 344, tournaments: 14 },
  { year: 2002, earnings: 414000, players: 552, tournaments: 19 },
  { year: 2003, earnings: 649000, players: 856, tournaments: 23 },
  { year: 2004, earnings: 764000, players: 1200, tournaments: 28 },
  { year: 2005, earnings: 959000, players: 1560, tournaments: 32 },
  { year: 2006, earnings: 1513000, players: 2640, tournaments: 50 },
  { year: 2007, earnings: 1838000, players: 3280, tournaments: 58 },
  { year: 2008, earnings: 2180000, players: 3920, tournaments: 66 },
  { year: 2009, earnings: 2067000, players: 3500, tournaments: 59 },
  { year: 2010, earnings: 2442000, players: 3020, tournaments: 58 },
  { year: 2011, earnings: 3060000, players: 2300, tournaments: 52 },
  { year: 2012, earnings: 5240000, players: 1840, tournaments: 55 },
  { year: 2013, earnings: 17190000, players: 2780, tournaments: 76 },
  { year: 2014, earnings: 26680000, players: 3040, tournaments: 88 },
  { year: 2015, earnings: 41920000, players: 5160, tournaments: 114 },
  { year: 2016, earnings: 58000000, players: 5240, tournaments: 120 },
  { year: 2017, earnings: 53100000, players: 6520, tournaments: 140 },
  { year: 2018, earnings: 123200000, players: 19120, tournaments: 240 },
  { year: 2019, earnings: 95700000, players: 15560, tournaments: 238 },
  { year: 2020, earnings: 51300000, players: 17800, tournaments: 228 },
  { year: 2021, earnings: 78900000, players: 9700, tournaments: 204 },
  { year: 2022, earnings: 67200000, players: 11900, tournaments: 242 },
  { year: 2023, earnings: 70000000, players: 13600, tournaments: 258 }
];

const TOP_TOURNAMENTS = [
  { name: 'The International 2021', game: 'Dota 2', prize: 40018195, year: 2021, location: 'Online/Bucharest' },
  { name: 'The International 2019', game: 'Dota 2', prize: 34330068, year: 2019, location: 'Shanghai' },
  { name: 'The International 2018', game: 'Dota 2', prize: 25532177, year: 2018, location: 'Vancouver' },
  { name: 'The International 2017', game: 'Dota 2', prize: 24787916, year: 2017, location: 'Seattle' },
  { name: 'The International 2016', game: 'Dota 2', prize: 20770460, year: 2016, location: 'Seattle' },
  { name: 'The International 2022', game: 'Dota 2', prize: 18936100, year: 2022, location: 'Singapore' },
  { name: 'The International 2015', game: 'Dota 2', prize: 18571683, year: 2015, location: 'Seattle' },
  { name: 'Fortnite World Cup Finals 2019 - Solos', game: 'Fortnite', prize: 15287000, year: 2019, location: 'New York' },
  { name: 'Fortnite World Cup Finals 2019 - Duos', game: 'Fortnite', prize: 15287000, year: 2019, location: 'New York' },
  { name: 'The International 2014', game: 'Dota 2', prize: 10931103, year: 2014, location: 'Seattle' },
  { name: 'The International 2020', game: 'Dota 2', prize: 7400000, year: 2020, location: 'Online' },
  { name: '2018 League of Legends World Championship', game: 'League of Legends', prize: 6450000, year: 2018, location: 'Incheon' },
  { name: '2016 League of Legends World Championship', game: 'League of Legends', prize: 4951173, year: 2016, location: 'Los Angeles' },
  { name: '2017 League of Legends World Championship', game: 'League of Legends', prize: 4946970, year: 2017, location: 'Beijing' },
  { name: 'The International 2023', game: 'Dota 2', prize: 3800000, year: 2023, location: 'Seattle' }
];

const ALL_GAMES = [
  { game: 'Dota 2', genre: 'MOBA', totalEarnings: 315474024, onlineEarnings: 38291450, totalPlayers: 5802, totalTournaments: 1261 },
  { game: 'Counter-Strike: Global Offensive', genre: 'First-Person Shooter', totalEarnings: 130498690, onlineEarnings: 41223100, totalPlayers: 11342, totalTournaments: 8127 },
  { game: 'Fortnite', genre: 'Battle Royale', totalEarnings: 121455034, onlineEarnings: 88234900, totalPlayers: 10982, totalTournaments: 2187 },
  { game: 'League of Legends', genre: 'MOBA', totalEarnings: 90484922, onlineEarnings: 14092300, totalPlayers: 5621, totalTournaments: 2743 },
  { game: 'PUBG', genre: 'Battle Royale', totalEarnings: 62841200, onlineEarnings: 29183500, totalPlayers: 4312, totalTournaments: 1087 },
  { game: 'Valorant', genre: 'First-Person Shooter', totalEarnings: 51294800, onlineEarnings: 26183200, totalPlayers: 3241, totalTournaments: 1792 },
  { game: 'StarCraft II', genre: 'Strategy', totalEarnings: 47192300, onlineEarnings: 13293100, totalPlayers: 1823, totalTournaments: 2134 },
  { game: 'Overwatch', genre: 'First-Person Shooter', totalEarnings: 41823100, onlineEarnings: 11239200, totalPlayers: 2394, totalTournaments: 887 },
  { game: 'Apex Legends', genre: 'Battle Royale', totalEarnings: 38293100, onlineEarnings: 22193200, totalPlayers: 5821, totalTournaments: 1394 },
  { game: 'Rainbow Six Siege', genre: 'First-Person Shooter', totalEarnings: 28192300, onlineEarnings: 8293100, totalPlayers: 2213, totalTournaments: 1189 },
  { game: 'Hearthstone', genre: 'Collectible Card Game', totalEarnings: 27193400, onlineEarnings: 18293200, totalPlayers: 2912, totalTournaments: 3201 },
  { game: 'Arena of Valor', genre: 'MOBA', totalEarnings: 22193400, onlineEarnings: 14293200, totalPlayers: 2193, totalTournaments: 892 },
  { game: 'Call of Duty: Warzone', genre: 'First-Person Shooter', totalEarnings: 21293100, onlineEarnings: 10293200, totalPlayers: 4123, totalTournaments: 1693 },
  { game: 'Rocket League', genre: 'Sports', totalEarnings: 23193200, onlineEarnings: 11293100, totalPlayers: 3601, totalTournaments: 3124 },
  { game: 'PUBG Mobile', genre: 'Battle Royale', totalEarnings: 18293100, onlineEarnings: 16293100, totalPlayers: 6821, totalTournaments: 1892 },
  { game: 'StarCraft: Brood War', genre: 'Strategy', totalEarnings: 17193200, onlineEarnings: 1293100, totalPlayers: 823, totalTournaments: 1893 },
  { game: 'Smite', genre: 'MOBA', totalEarnings: 14193200, onlineEarnings: 4293100, totalPlayers: 1823, totalTournaments: 892 },
  { game: 'Heroes of the Storm', genre: 'MOBA', totalEarnings: 13193100, onlineEarnings: 3193100, totalPlayers: 1623, totalTournaments: 729 },
  { game: 'Street Fighter V', genre: 'Fighting', totalEarnings: 12193200, onlineEarnings: 3193100, totalPlayers: 2823, totalTournaments: 2934 },
  { game: 'King of Fighters XV', genre: 'Fighting', totalEarnings: 3193200, onlineEarnings: 1193100, totalPlayers: 823, totalTournaments: 492 },
  { game: 'FIFA 23', genre: 'Sports', totalEarnings: 9193100, onlineEarnings: 6293100, totalPlayers: 4823, totalTournaments: 2392 },
  { game: 'Teamfight Tactics', genre: 'Collectible Card Game', totalEarnings: 7193200, onlineEarnings: 5193100, totalPlayers: 2123, totalTournaments: 1292 },
  { game: 'Magic: The Gathering Arena', genre: 'Collectible Card Game', totalEarnings: 6193100, onlineEarnings: 5193100, totalPlayers: 1823, totalTournaments: 892 },
  { game: 'Age of Empires IV', genre: 'Strategy', totalEarnings: 5293100, onlineEarnings: 2193100, totalPlayers: 923, totalTournaments: 492 },
  { game: 'Call of Duty 4: Modern Warfare', genre: 'First-Person Shooter', totalEarnings: 4193100, onlineEarnings: 193100, totalPlayers: 823, totalTournaments: 1892 }
];

const GENRE_SUMMARY = [
  { genre: 'MOBA', totalEarnings: 455538646, totalPlayers: 17062, totalTournaments: 6517, count: 5 },
  { genre: 'First-Person Shooter', totalEarnings: 277295090, totalPlayers: 24136, totalTournaments: 15580, count: 6 },
  { genre: 'Battle Royale', totalEarnings: 240882434, totalPlayers: 27936, totalTournaments: 6560, count: 4 },
  { genre: 'Strategy', totalEarnings: 69678600, totalPlayers: 3569, totalTournaments: 4519, count: 3 },
  { genre: 'Collectible Card Game', totalEarnings: 40579700, totalPlayers: 6858, totalTournaments: 5385, count: 3 },
  { genre: 'Sports', totalEarnings: 32386300, totalPlayers: 8424, totalTournaments: 5516, count: 2 },
  { genre: 'Fighting', totalEarnings: 15386400, totalPlayers: 3646, totalTournaments: 3426, count: 2 }
];

const OVERALL_ONLINE_SHARE = {
  online: 394923850,
  offline: 736823320
};

const GENRE_COLORS = {
  'MOBA': '#c9a84c',
  'First-Person Shooter': '#d63a2f',
  'Battle Royale': '#1fa898',
  'Strategy': '#7a6130',
  'Collectible Card Game': '#86b0c2',
  'Sports': '#5cc7d9',
  'Fighting': '#f2b542'
};
