/**
 * Cloudflare Worker: Acro Tech Joke Engine
 * Serves dynamic, non-repeating, script-free SVG tech jokes for GitHub READMEs.
 * Bypasses GitHub Camo proxy caching using strict no-store headers and live UTC timestamps.
 */

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
  ["How do you tell an introverted engineer from an extroverted one?", "The extroverted one looks at YOUR shoes when talking."],
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

// In-memory tracker on the worker isolate to avoid immediate repeats
let lastJokeIndex = -1;

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getRandomJoke() {
  let idx;
  if (JOKES.length <= 1) {
    return JOKES[0];
  }
  // Pick random index ensuring it never repeats the previous one
  do {
    idx = Math.floor(Math.random() * JOKES.length);
  } while (idx === lastJokeIndex);
  lastJokeIndex = idx;
  return JOKES[idx];
}

export default {
  async fetch(request) {
    const [rawQ, rawA] = getRandomJoke();
    const q = escapeXml(rawQ);
    const a = escapeXml(rawA);

    const now = new Date();
    const utcTime = now.toTimeString().slice(0, 8);

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 112" width="100%" height="auto">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080c10" />
      <stop offset="100%" stop-color="#0d141d" />
    </linearGradient>
  </defs>

  <!-- Container Box -->
  <rect x="1" y="1" width="678" height="110" rx="8" fill="url(#bg)" stroke="#52f2b1" stroke-opacity="0.35" stroke-width="1.2" />

  <!-- Header line -->
  <line x1="1" y1="28" x2="679" y2="28" stroke="#52f2b1" stroke-opacity="0.18" stroke-width="1" />

  <!-- Header Title & UTC stamp -->
  <text x="16" y="19" font-family="Consolas, monospace" font-size="11.5" font-weight="bold" fill="#52f2b1">⚡ RANDOM_TECH_JOKE // DYNAMIC_FEED</text>
  <text x="664" y="19" font-family="Consolas, monospace" font-size="11" fill="#8b949e" text-anchor="end">[${utcTime} UTC]</text>

  <!-- Joke Question & Answer -->
  <text x="20" y="56" font-family="Consolas, monospace" font-size="13" font-weight="bold" fill="#f0f6fc">Q: ${q}</text>
  <text x="20" y="84" font-family="Consolas, monospace" font-size="13" font-weight="bold" fill="#52f2b1">A: ${a}</text>
</svg>`;

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
