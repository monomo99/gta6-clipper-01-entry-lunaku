// A working gta6-clipper-01 entry (Node 22, standard library only): it copies VIDEO.json from the repository root to
// /output/VIDEO.json, where the gate reads it. That is all the program has to do. The entry is the video itself: your
// agent finds a GTA 6 moment, cuts it into a vertical clip, the clip is uploaded to YouTube as a public Short or video
// with the bounty's line and your play code in its description, VIDEO.json names the video, and the house reads the
// video's views from YouTube. Nothing this program writes about the video is scored.
//
// VIDEO.json names the published Short (https://www.youtube.com/shorts/z1I1NrRWdKc, public on @lunakuclips
// since 20 Nov 2026): rebuild-1 v3, the full-bleed 0:53 cut of the Trailer 2 prison-reunion stretch
// (Jason waits at the gate, Lucia walks out, then the escalation) with the make.fun pitch end card.
// Before copying, the program validates the URL: it must be a real YouTube Shorts or
// video address, and a leftover placeholder (anything still containing "<id>") is refused loudly, so a
// placeholder can never reach the gate by accident.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'VIDEO.json');
const DEST = join(OUTPUT_DIR, 'VIDEO.json');

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

let raw: string;
try {
  raw = readFileSync(SOURCE, 'utf8');
} catch (err) {
  fail(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
}

let url: unknown;
try {
  url = (JSON.parse(raw) as { url?: unknown }).url;
} catch (err) {
  fail(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
}

if (typeof url !== 'string' || url.includes('<id>')) {
  fail('VIDEO.json still holds a placeholder URL (it contains "<id>"): replace it with the published Shorts URL before submitting.');
}

let parsed: URL;
try {
  parsed = new URL(url);
} catch {
  fail(`VIDEO.json holds an invalid URL: ${url}`);
}

const host = parsed.hostname.replace(/^www\./, '');
// Per the kit RULES, a YouTube video id is exactly 11 characters ([A-Za-z0-9_-]); a shorter or
// longer id can never be a real video, so it is refused here instead of reaching the gate.
const ID_11 = /^[A-Za-z0-9_-]{11}$/;
const isShorts = host === 'youtube.com' && /^\/shorts\/[A-Za-z0-9_-]{11}$/.test(parsed.pathname);
const isWatch = host === 'youtube.com' && parsed.pathname === '/watch' && ID_11.test(parsed.searchParams.get('v') ?? '');
const isShortLink = host === 'youtu.be' && ID_11.test(parsed.pathname.slice(1));
if (!isShorts && !isWatch && !isShortLink) {
  fail(`VIDEO.json holds a URL that is not a YouTube Shorts/video address: ${url}`);
}
const videoId = isShorts ? parsed.pathname.split('/')[2] : isWatch ? (parsed.searchParams.get('v') ?? '') : parsed.pathname.slice(1);

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(SOURCE, DEST);
} catch (err) {
  fail(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
}

let copied: string;
try {
  copied = readFileSync(DEST, 'utf8');
} catch (err) {
  fail(`VIDEO.json could not be read back from ${OUTPUT_DIR}: ${(err as Error).message}`);
}
if (copied !== raw) {
  fail('VIDEO.json copy mismatch: the output does not match the input.');
}
console.log(`VIDEO.json validated and copied: ${url} (video id ${videoId})`);
