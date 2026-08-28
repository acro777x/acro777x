/**
 * Cloudflare Worker: Acro Cyber Suite
 * - /              : Dynamic Non-Repeating Tech Joke SVG
 * - /music         : Dynamic Audio Feed with 28 Liked Songs & Reactive Waveform SVG
 * - /music/redirect: Redirects to Spotify for currently playing track
 * - /radar         : Holographic 3D Cyber Attack Earth Radar SVG
 */

// ================= 28 TRACKS FROM SPOTIFY LIKED PLAYLIST =================
const TRACKS = [
  { title: "Tension", artist: "Dhanda Nyoliwala", album: "KOHRAM", duration: "2:23", bpm: 135, url: "https://open.spotify.com/track/70YFXFbrvl5J3nUfqxTFue" },
  { title: "Do Numbari", artist: "Dhanda Nyoliwala", album: "Mirzapur The Movie", duration: "2:43", bpm: 132, url: "https://open.spotify.com/search/Do%20Numbari%20Dhanda%20Nyoliwala" },
  { title: "Old Money", artist: "AP Dhillon", album: "The Brownprint", duration: "2:08", bpm: 128, url: "https://open.spotify.com/search/Old%20Money%20AP%20Dhillon" },
  { title: "Winning Speech", artist: "Karan Aujla, Mxrci", album: "Winning Speech", duration: "3:47", bpm: 125, url: "https://open.spotify.com/search/Winning%20Speech%20Karan%20Aujla" },
  { title: "Boom Shaka", artist: "KR$NA, Dhanda Nyoliwala", album: "Boom Shaka", duration: "3:38", bpm: 140, url: "https://open.spotify.com/search/Boom%20Shaka%20KRSNA" },
  { title: "Taqdeer", artist: "Dhanda Nyoliwala", album: "DNW Vol. 1", duration: "2:57", bpm: 130, url: "https://open.spotify.com/search/Taqdeer%20Dhanda%20Nyoliwala" },
  { title: "The Beast", artist: "Cheema Y, Gur Sidhu", album: "Dripster", duration: "2:20", bpm: 134, url: "https://open.spotify.com/search/The%20Beast%20Cheema%20Y" },
  { title: "Ha Ha Ha", artist: "Dhanda Nyoliwala, Deep Kalsi", album: "Ha Ha Ha", duration: "3:09", bpm: 128, url: "https://open.spotify.com/search/Ha%20Ha%20Ha%20Dhanda%20Nyoliwala" },
  { title: "Big Plans", artist: "Dhanda Nyoliwala, Romeoz", album: "Big Plans", duration: "2:26", bpm: 136, url: "https://open.spotify.com/search/Big%20Plans%20Dhanda%20Nyoliwala" },
  { title: "Mockingbird", artist: "Eminem", album: "Encore (Deluxe Version)", duration: "4:10", bpm: 84, url: "https://open.spotify.com/search/Mockingbird%20Eminem" },
  { title: "HEAVENLY JUMPSTYLE", artist: "TWXNY, SxiIwiX, INNXCENCE", album: "HEAVENLY JUMPSTYLE", duration: "1:54", bpm: 150, url: "https://open.spotify.com/search/HEAVENLY%20JUMPSTYLE%20TWXNY" },
  { title: "World War - 18 Lakh Ki Gadi", artist: "Saaaj Tomar, Chaahat, VJ Paul", album: "World War", duration: "2:56", bpm: 130, url: "https://open.spotify.com/search/World%20War%2018%20Lakh%20Ki%20Gadi" },
  { title: "Tough", artist: "Krish Rao", album: "Tough", duration: "2:38", bpm: 126, url: "https://open.spotify.com/search/Tough%20Krish%20Rao" },
  { title: "Taare", artist: "Deewar Ke Uss Paar", album: "Deewar Ke Uss Paar", duration: "2:34", bpm: 110, url: "https://open.spotify.com/search/Taare%20Deewar%20Ke%20Uss%20Paar" },
  { title: "Legacy", artist: "Vikram Sarkar, Billa Sonipat Ala", album: "Legacy", duration: "2:48", bpm: 132, url: "https://open.spotify.com/search/Legacy%20Vikram%20Sarkar" },
  { title: "Maafi", artist: "Shreya Ghoshal, Shantanu Moitra", album: "Pritam And Pedro", duration: "3:00", bpm: 115, url: "https://open.spotify.com/search/Maafi%20Pritam%20And%20Pedro" },
  { title: "Tu Wafa", artist: "Tu Wafa", album: "Tu Wafa", duration: "2:22", bpm: 118, url: "https://open.spotify.com/search/Tu%20Wafa" },
  { title: "Why Parda?", artist: "Sumit Parda", album: "Why Parda?", duration: "3:05", bpm: 130, url: "https://open.spotify.com/search/Why%20Parda%20Sumit%20Parda" },
  { title: "His Grace", artist: "Ndee Kundu, Bintu Pabra, Shine", album: "His Grace", duration: "3:37", bpm: 124, url: "https://open.spotify.com/search/His%20Grace%20Ndee%20Kundu" },
  { title: "Bairan", artist: "Banjaare", album: "Bairan", duration: "2:30", bpm: 120, url: "https://open.spotify.com/search/Bairan%20Banjaare" },
  { title: "Jaat Bagdo", artist: "Khasa Aala Chahar, Dj Sky", album: "ROAR", duration: "3:09", bpm: 135, url: "https://open.spotify.com/search/Jaat%20Bagdo%20Khasa%20Aala%20Chahar" },
  { title: "Ishqa Ve", artist: "Zeeshan Ali, Yuvraj Tung", album: "Ishqa Ve", duration: "3:27", bpm: 112, url: "https://open.spotify.com/search/Ishqa%20Ve%20Zeeshan%20Ali" },
  { title: "Wakhra Swag", artist: "Navv Inder, Badshah", album: "Wakhra Swag", duration: "3:10", bpm: 128, url: "https://open.spotify.com/search/Wakhra%20Swag%20Navv%20Inder" },
  { title: "Freedom", artist: "Pharrell Williams", album: "Freedom", duration: "2:43", bpm: 130, url: "https://open.spotify.com/search/Freedom%20Pharrell%20Williams" },
  { title: "Dil Tu Jaan Tu", artist: "Gurnazar, Chet Singh", album: "Dil Tu Jaan Tu", duration: "3:57", bpm: 116, url: "https://open.spotify.com/search/Dil%20Tu%20Jaan%20Tu%20Gurnazar" },
  { title: "Thodi Si Daaru", artist: "AP Dhillon, Shreya Ghoshal", album: "Thodi Si Daaru", duration: "3:00", bpm: 122, url: "https://open.spotify.com/search/Thodi%20Si%20Daaru%20AP%20Dhillon" },
  { title: "Jogi", artist: "thiaraJxt, Bir", album: "Jogi", duration: "2:54", bpm: 124, url: "https://open.spotify.com/search/Jogi%20thiaraJxt" },
  { title: "Sheesha", artist: "Mitta Por, Swara Verma", album: "Sheesha", duration: "3:16", bpm: 130, url: "https://open.spotify.com/search/Sheesha%20Mitta%20Por" }
];

// ================= JOKES DATABASE =================
const JOKES = [
  ["Why do programmers prefer dark mode?", "Because light attracts bugs."],
  ["How many developers does it take to change a lightbulb?", "None. It's a hardware problem."],
  ["Why do Java developers wear glasses?", "Because they don't C#."],
  ["There are 10 types of people in the world:", "Those who understand binary, and those who don't."],
  ["A SQL query walks into a bar, walks up to two tables and asks...", "'Can I join you?'"],
  ["Why was the JavaScript developer sad?", "Because they didn't know how to 'null' their feelings."],
  ["Why did the developer go broke?", "Because they used up all their cache."],
  ["0 is false and 1 is true, right?", "1!"],
  ["What is a programmer's favorite hangout place?", "Foo Bar."],
  ["Why do Python programmers have low vision?", "Because they don't C."],
  ["What's the best thing about UDP jokes?", "I don't care if you get them or not."],
  ["How do you comfort a JavaScript bug?", "You console it."],
  ["Why do Linux users make terrible secret agents?", "Because they can never 'sudo' stay undercover."],
  ["A programmer's wife tells him: 'Go buy a loaf of bread. If they have eggs, buy 12.'", "He comes home with 12 loaves of bread."],
  ["What do you call a programmer from Finland?", "Helsinki-overflow."],
  ["Why was the database admin left out of the party?", "Because of their bad table manners."],
  ["What did the router say to the doctor?", "'It hurts when IP.'"],
  ["There's no place like 127.0.0.1.", "Except 0.0.0.0 when everything goes wrong."],
  ["Why do hackers love nature?", "Because it has root access and no firewalls."],
  ["Why did the Git commit get rejected?", "It had unresolved conflict issues with its author."],
  ["What is the programmer's anthem?", "Hello, World!"],
  ["Why did the front-end dev storm out of the restaurant?", "Because the tables had no styles."],
  ["Why did the loop never finish dinner?", "Because it couldn't find an exit condition."],
  ["Why was the function afraid of recursion?", "Because it kept calling itself in the middle of the night."],
  ["What's an algorithm?", "A word used by programmers when they don't want to explain what they did."],
  ["Why did the computer keep freezing?", "It left its Windows open."],
  ["Why do cyber professionals sleep with a nightlight?", "Because threats operate in the dark."],
  ["What's a hacker's favorite season?", "Phishing season."],
  ["Why did the regex refuse to match?", "It was being overly possessive."],
  ["Why do programmers hate the outdoors?", "The graphics are great, but the storyline is terrible."],
  ["What do you call a group of 8 hobbits?", "A hobbyte."],
  ["Why do backend devs hate elevators?", "Because race conditions happen between floors."],
  ["What is a pirate's favorite programming language?", "You'd think it's R, but their first love is the C."],
  ["How does a developer solve insomnia?", "They count memory leaks instead of sheep."],
  ["Why did the CSS developer fall into the pool?", "They didn't set float: none."],
  ["What do you call a computer that sings?", "A-Dell."],
  ["Why was the web server overheating?", "Too many hot reload sessions."],
  ["Why did the developer get locked out of their house?", "They forgot their SSH keys inside."],
  ["How do you know an engineer is truly passionate?", "They debug their coffee machine before drinking."]
];

let lastJokeIndex = -1;
let lastTrackIndex = -1;

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getRandomJoke() {
  let idx;
  do {
    idx = Math.floor(Math.random() * JOKES.length);
  } while (idx === lastJokeIndex);
  lastJokeIndex = idx;
  return JOKES[idx];
}

function getRandomTrack() {
  let idx;
  do {
    idx = Math.floor(Math.random() * TRACKS.length);
  } while (idx === lastTrackIndex);
  lastTrackIndex = idx;
  return TRACKS[idx];
}

const COMMON_HEADERS = {
  "Content-Type": "image/svg+xml; charset=utf-8",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
  "Pragma": "no-cache",
  "Expires": "0",
  "Surrogate-Control": "no-store",
  "Access-Control-Allow-Origin": "*"
};

// ================= RENDER MUSIC SVG =================
function renderMusicSvg(track) {
  const title = escapeXml(track.title);
  const artist = escapeXml(track.artist);
  const album = escapeXml(track.album);

  let bars = "";
  for (let i = 0; i < 14; i++) {
    const h = 10 + (i * 7) % 28;
    bars += `<rect class="bar b${i}" x="${480 + i * 11}" y="${95 - h}" width="6" height="${h}" rx="2" fill="#52f2b1" />\n`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 120" width="100%" height="auto">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080c10" />
      <stop offset="100%" stop-color="#0d141d" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <style>
    @keyframes pulseBar {
      0%, 100% { transform: scaleY(0.25); transform-origin: bottom; opacity: 0.45; }
      50%      { transform: scaleY(1.0); transform-origin: bottom; opacity: 1; filter: drop-shadow(0 0 3px #52f2b1); }
    }
    @keyframes spinDisc {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .bar { animation: pulseBar 1.2s ease-in-out infinite alternate; }
    .b0 { animation-delay: 0.1s; animation-duration: 0.9s; }
    .b1 { animation-delay: 0.3s; animation-duration: 1.1s; }
    .b2 { animation-delay: 0.05s; animation-duration: 0.8s; }
    .b3 { animation-delay: 0.4s; animation-duration: 1.3s; }
    .b4 { animation-delay: 0.2s; animation-duration: 1.0s; }
    .b5 { animation-delay: 0.35s; animation-duration: 0.85s; }
    .b6 { animation-delay: 0.15s; animation-duration: 1.15s; }
    .b7 { animation-delay: 0.25s; animation-duration: 0.95s; }
    .b8 { animation-delay: 0.45s; animation-duration: 1.2s; }
    .b9 { animation-delay: 0.08s; animation-duration: 0.75s; }
    .b10 { animation-delay: 0.3s; animation-duration: 1.05s; }
    .b11 { animation-delay: 0.18s; animation-duration: 0.88s; }
    .b12 { animation-delay: 0.4s; animation-duration: 1.25s; }
    .b13 { animation-delay: 0.22s; animation-duration: 0.92s; }
    .disc-spin {
      transform-origin: 55px 60px;
      animation: spinDisc 6s linear infinite;
    }
    text {
      font-family: 'Consolas', 'Fira Code', 'Monaco', monospace;
    }
  </style>

  <!-- Container -->
  <rect x="1" y="1" width="678" height="118" rx="8" fill="url(#bg)" stroke="#52f2b1" stroke-opacity="0.3" stroke-width="1.2" />

  <!-- Animated Vinyl / CD Disc -->
  <g class="disc-spin">
    <circle cx="55" cy="60" r="36" fill="#111822" stroke="#52f2b1" stroke-width="1.5" stroke-opacity="0.6" />
    <circle cx="55" cy="60" r="28" fill="none" stroke="#52f2b1" stroke-opacity="0.15" stroke-dasharray="3 3" />
    <circle cx="55" cy="60" r="20" fill="none" stroke="#52f2b1" stroke-opacity="0.2" />
    <circle cx="55" cy="60" r="10" fill="#52f2b1" fill-opacity="0.8" filter="url(#glow)" />
    <circle cx="55" cy="60" r="4" fill="#070b0e" />
  </g>

  <!-- Header line -->
  <text x="110" y="28" font-size="11" font-weight="bold" fill="#52f2b1" letter-spacing="1">▸ AUDIO FEED // CURRENTLY VIBING TO</text>
  <text x="664" y="28" font-size="10.5" fill="#8b949e" text-anchor="end">[${track.bpm} BPM · ${track.duration}]</text>

  <!-- Track Title -->
  <text x="110" y="58" font-size="15.5" font-weight="bold" fill="#f0f6fc">${title}</text>

  <!-- Artist & Album -->
  <text x="110" y="80" font-size="12" font-weight="bold" fill="#7ee787">${artist}</text>
  <text x="110" y="98" font-size="10.5" fill="#8b949e">Album: ${album}</text>

  <!-- Dynamic Waveform Visualizer Bars -->
  ${bars}
</svg>`;
}

// ================= RENDER JOKE SVG =================
function renderJokeSvg(rawQ, rawA) {
  const q = escapeXml(rawQ);
  const a = escapeXml(rawA);
  const utc = new Date().toTimeString().slice(0, 8);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 112" width="100%" height="auto">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080c10" />
      <stop offset="100%" stop-color="#0d141d" />
    </linearGradient>
  </defs>

  <rect x="1" y="1" width="678" height="110" rx="8" fill="url(#bg)" stroke="#52f2b1" stroke-opacity="0.35" stroke-width="1.2" />
  <line x1="1" y1="28" x2="679" y2="28" stroke="#52f2b1" stroke-opacity="0.18" stroke-width="1" />

  <text x="16" y="19" font-family="Consolas, monospace" font-size="11.5" font-weight="bold" fill="#52f2b1">⚡ RANDOM_TECH_JOKE // DYNAMIC_FEED</text>
  <text x="664" y="19" font-family="Consolas, monospace" font-size="11" fill="#8b949e" text-anchor="end">[${utc} UTC]</text>

  <text x="20" y="56" font-family="Consolas, monospace" font-size="13" font-weight="bold" fill="#f0f6fc">Q: ${q}</text>
  <text x="20" y="84" font-family="Consolas, monospace" font-size="13" font-weight="bold" fill="#52f2b1">A: ${a}</text>
</svg>`;
}

// ================= RENDER 3D CYBER RADAR SVG =================
function renderRadarSvg() {
  const utc = new Date().toTimeString().slice(0, 8);
  const count = (1492000 + Math.floor(Math.random() * 8500)).toLocaleString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 420" width="100%" height="auto">
  <defs>
    <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <radialGradient id="spaceGrad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0a131c" />
      <stop offset="60%" stop-color="#070b0f" />
      <stop offset="100%" stop-color="#030508" />
    </radialGradient>
    <radialGradient id="globeAtmosphere" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="#52f2b1" stop-opacity="0" />
      <stop offset="95%" stop-color="#52f2b1" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#52f2b1" stop-opacity="0.4" />
    </radialGradient>
    <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#52f2b1" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#52f2b1" stop-opacity="0.9" />
    </linearGradient>
    <pattern id="radarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#52f2b1" stroke-width="0.5" stroke-opacity="0.07" />
    </pattern>
  </defs>

  <style>
    @keyframes radarRotate {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pulseRing {
      0%   { r: 3px; opacity: 1; stroke-width: 2px; }
      100% { r: 24px; opacity: 0; stroke-width: 0.5px; }
    }
    @keyframes attackDash1 {
      0%   { stroke-dashoffset: 400; opacity: 0.2; }
      30%  { opacity: 1; }
      100% { stroke-dashoffset: 0; opacity: 0.1; }
    }
    @keyframes attackDash2 {
      0%   { stroke-dashoffset: 500; opacity: 0.1; }
      40%  { opacity: 1; }
      100% { stroke-dashoffset: 0; opacity: 0.2; }
    }
    @keyframes blinkAlert {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0.4; }
    }

    .globe-center { transform-origin: 410px 210px; }
    .radar-sweep { transform-origin: 410px 210px; animation: radarRotate 8s linear infinite; }
    .pulse-ring-1 { animation: pulseRing 2.2s infinite cubic-bezier(0.2, 0.8, 0.4, 1); }
    .pulse-ring-2 { animation: pulseRing 2.2s infinite cubic-bezier(0.2, 0.8, 0.4, 1) 0.7s; }
    .pulse-ring-3 { animation: pulseRing 2.2s infinite cubic-bezier(0.2, 0.8, 0.4, 1) 1.4s; }
    .attack-arc-1 { stroke-dasharray: 200 200; animation: attackDash1 3s linear infinite; }
    .attack-arc-2 { stroke-dasharray: 260 260; animation: attackDash2 3.6s linear infinite 0.8s; }
    .attack-arc-3 { stroke-dasharray: 220 220; animation: attackDash1 2.8s linear infinite 1.5s; }
    .alert-tag { animation: blinkAlert 1.5s infinite ease-in-out; }
    text { font-family: 'Consolas', 'Fira Code', 'Monaco', monospace; }
  </style>

  <rect x="1" y="1" width="818" height="418" rx="10" fill="url(#spaceGrad)" stroke="#52f2b1" stroke-opacity="0.3" stroke-width="1.2" />
  <rect x="2" y="2" width="816" height="416" fill="url(#radarGrid)" rx="9" />

  <circle cx="410" cy="210" r="160" fill="none" stroke="#52f2b1" stroke-opacity="0.08" stroke-dasharray="4 6" />
  <circle cx="410" cy="210" r="125" fill="none" stroke="#52f2b1" stroke-opacity="0.12" />
  <circle cx="410" cy="210" r="90" fill="none" stroke="#52f2b1" stroke-opacity="0.15" stroke-dasharray="8 8" />

  <g class="globe-center">
    <circle cx="410" cy="210" r="125" fill="#04080c" stroke="#52f2b1" stroke-width="1.5" stroke-opacity="0.6" filter="url(#neon-glow)" />
    <circle cx="410" cy="210" r="125" fill="url(#globeAtmosphere)" />

    <ellipse cx="410" cy="210" rx="125" ry="32" fill="none" stroke="#52f2b1" stroke-opacity="0.25" stroke-width="0.9" />
    <ellipse cx="410" cy="210" rx="125" ry="72" fill="none" stroke="#52f2b1" stroke-opacity="0.22" stroke-width="0.9" />
    <ellipse cx="410" cy="210" rx="125" ry="105" fill="none" stroke="#52f2b1" stroke-opacity="0.18" stroke-width="0.9" />
    <line x1="285" y1="210" x2="535" y2="210" stroke="#52f2b1" stroke-opacity="0.3" stroke-width="1" />

    <ellipse cx="410" cy="210" rx="35" ry="125" fill="none" stroke="#52f2b1" stroke-opacity="0.25" stroke-width="0.9" />
    <ellipse cx="410" cy="210" rx="75" ry="125" fill="none" stroke="#52f2b1" stroke-opacity="0.22" stroke-width="0.9" />
    <ellipse cx="410" cy="210" rx="110" ry="125" fill="none" stroke="#52f2b1" stroke-opacity="0.18" stroke-width="0.9" />
    <line x1="410" y1="85" x2="410" y2="335" stroke="#52f2b1" stroke-opacity="0.3" stroke-width="1" />

    <circle cx="340" cy="170" r="3" fill="#58a6ff" opacity="0.9" />
    <circle cx="355" cy="180" r="2.5" fill="#58a6ff" opacity="0.7" />
    <circle cx="415" cy="165" r="3.5" fill="#52f2b1" opacity="0.9" />
    <circle cx="465" cy="198" r="4" fill="#52f2b1" filter="url(#neon-glow)" />
    <circle cx="495" cy="185" r="3" fill="#58a6ff" opacity="0.9" />

    <g class="radar-sweep">
      <path d="M 410 210 L 410 85 A 125 125 0 0 1 520 150 Z" fill="url(#beamGrad)" opacity="0.25" />
      <line x1="410" y1="210" x2="520" y2="150" stroke="#52f2b1" stroke-width="1.8" filter="url(#neon-glow)" />
    </g>
  </g>

  <path d="M 415 165 Q 435 130 465 198" fill="none" stroke="#ff5f56" stroke-width="2" class="attack-arc-1" filter="url(#neon-glow)" />
  <circle cx="465" cy="198" class="pulse-ring-1" fill="none" stroke="#ff5f56" />

  <path d="M 340 170 Q 420 110 495 185" fill="none" stroke="#ffbd2e" stroke-width="1.8" class="attack-arc-2" />
  <circle cx="495" cy="185" class="pulse-ring-2" fill="none" stroke="#ffbd2e" />

  <path d="M 482 225 Q 480 205 465 198" fill="none" stroke="#52f2b1" stroke-width="1.8" class="attack-arc-3" />
  <circle cx="465" cy="198" class="pulse-ring-3" fill="none" stroke="#52f2b1" />

  <line x1="1" y1="36" x2="819" y2="36" stroke="#52f2b1" stroke-opacity="0.18" stroke-width="1" />
  <circle cx="20" cy="18" r="4" fill="#ff5f56" class="alert-tag" />
  <text x="32" y="22" font-size="12" font-weight="bold" fill="#52f2b1">GLOBAL_CYBER_ATTACK_RADAR // 3D_EARTH_TELEMETRY</text>
  <text x="796" y="22" font-size="11" fill="#8b949e" text-anchor="end">[${utc} UTC]</text>

  <rect x="20" y="52" width="200" height="96" rx="6" fill="#070d14" fill-opacity="0.85" stroke="#52f2b1" stroke-opacity="0.25" stroke-width="1" />
  <text x="32" y="70" font-size="10.5" font-weight="bold" fill="#52f2b1">▸ ACTIVE_THREAT_VECTORS</text>
  <text x="32" y="88" font-size="10" fill="#e6edf3">DDoS FLOOD  : <tspan fill="#ff5f56">CRITICAL</tspan></text>
  <text x="32" y="104" font-size="10" fill="#e6edf3">SQLi PROBES : <tspan fill="#ffbd2e">ELEVATED</tspan></text>
  <text x="32" y="120" font-size="10" fill="#e6edf3">ZERO-DAY C2 : <tspan fill="#52f2b1">BLOCKED</tspan></text>
  <text x="32" y="136" font-size="10" fill="#8b949e">DEFCON LEVEL: <tspan fill="#ff5f56" font-weight="bold" class="alert-tag">DEFCON 1</tspan></text>

  <rect x="600" y="52" width="200" height="96" rx="6" fill="#070d14" fill-opacity="0.85" stroke="#52f2b1" stroke-opacity="0.25" stroke-width="1" />
  <text x="612" y="70" font-size="10.5" font-weight="bold" fill="#52f2b1">▸ INTERCEPT_METRICS</text>
  <text x="612" y="90" font-size="10" fill="#8b949e">TOTAL ATTACKS BLOCKED:</text>
  <text x="612" y="112" font-size="15" font-weight="bold" fill="#52f2b1">${count}</text>
  <text x="612" y="134" font-size="9.5" fill="#7ee787">● GLOBAL HONEYPOTS: ARMED</text>

  <rect x="20" y="348" width="780" height="52" rx="6" fill="#070d14" fill-opacity="0.85" stroke="#52f2b1" stroke-opacity="0.2" stroke-width="1" />
  <text x="32" y="368" font-size="10" fill="#8b949e"><tspan fill="#52f2b1" font-weight="bold">[INTERCEPT_LOG]</tspan> 0x89F4: TCP SYN Flood targeted at edge ingress // Filter applied in 1.2ms</text>
  <text x="32" y="386" font-size="10" fill="#8b949e"><tspan fill="#52f2b1" font-weight="bold">[STEALTH_SHIELD]</tspan> AES-256-GCM encrypted tunnel active // Zero unauthorized probes permitted</text>
</svg>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Route /music: Dynamic track rotation from Liked Songs playlist
    if (url.pathname === "/music") {
      const track = getRandomTrack();
      return new Response(renderMusicSvg(track), {
        status: 200,
        headers: COMMON_HEADERS
      });
    }

    // Route /music/redirect: Redirects to Spotify
    if (url.pathname === "/music/redirect") {
      const track = lastTrackIndex >= 0 ? TRACKS[lastTrackIndex] : TRACKS[0];
      return Response.redirect(track.url, 302);
    }

    // Route /radar: 3D Cyber Attack Earth Radar HUD
    if (url.pathname === "/radar") {
      return new Response(renderRadarSvg(), {
        status: 200,
        headers: COMMON_HEADERS
      });
    }

    // Default Route / and /joke: Dynamic Non-Repeating Tech Joke
    const [rawQ, rawA] = getRandomJoke();
    return new Response(renderJokeSvg(rawQ, rawA), {
      status: 200,
      headers: COMMON_HEADERS
    });
  }
};
