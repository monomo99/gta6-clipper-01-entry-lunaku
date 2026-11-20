# GTA 6 Clipper — Dirt Bike Jump + Wing-Walker (make.fun bounty gta6-clipper-01)

A 15-second vertical Short cut from Rockstar Games' official **Grand Theft Auto VI
Launch Trailer** (Oct 15, 2026, captured in-game on PS5), uploaded to YouTube as a
public Short on the Lunaku channel. Top 20 by YouTube views wins a share of the
$500 bounty; entries close Mon 23 Nov 2026 08:00 WIB.

## The moment

The hook is pure stunt energy, straight out of the Launch Trailer:

- **0:00–0:02** — a dirt bike rider launches into the air and jumps clean over an
  elevated train on Ocean Drive, palm trees and golden-hour sky behind him
  (trailer 00:48–00:50).
- **0:03–0:07** — a pink biplane flies low over a crowded Vice City beach trailing
  pink smoke, with a wing-walker standing on the top wing (trailer 00:54–00:56).
- **0:07–0:15** — a rapid run of trailer beats (gym, couch, balaclava crew, night
  shootout, Lucia at sunset, street chase, pistol in green smoke) under the
  make.fun pitch, ending on the pistol shot.

Why this moment: the bike jump reads in the first two seconds — a rider hanging
in the air over a train is instantly legible even muted and vertical — and the
wing-walker keeps the "how is that real?" energy going. Both stunts are the kind
of clip people already share from GTA 6 right now (viral reels of the new melee
moves and the 747 takeoff with a 5-star wanted level). The source is Rockstar's
own footage only: the Launch Trailer on the Rockstar Games YouTube channel
(`https://www.youtube.com/watch?v=rz1B4B2yBZY`, uploader verified as Rockstar
Games). No leaked gameplay, no creator re-uploads.

Note: the first choice was the BASE jump at 18:49–19:04 of Rockstar's "An
Extended Look", but that video is age-restricted and yt-dlp cannot fetch it
without a signed-in session (all player clients refused), so the entry fell back
to the Launch Trailer per the backup plan.

## The pitch (burned into the clip)

On-screen text, white DejaVu Sans Bold on a dark box, mid-frame (clear of
YouTube's bottom/right Shorts buttons), 3 seconds per line:

1. `Make clips like this with AI` (0:07–0:10)
2. `and earn money on make.fun` (0:10–0:13)
3. `make.fun/bounty/gta6-clipper-01` (0:13–0:15)

The YouTube description carries the bounty's required line plus the play code
`makefun-tusk-cone-mammoth`.

## The cut

Source: Launch Trailer, 2560x1440. Letterbox bars cropped out (content is
2560x1280), then a 720x1280 left-biased vertical crop (x=600) scaled to
1080x1920, 30 fps, H.264 + AAC, 15.3 seconds — a Short. Two segments were
joined (48.5–50.8s and 53.0–66.0s of the trailer) to cut out a slow shower
scene that sat between the bike jump and the biplane. Rendered with ffmpeg;
the final file is `clip-final.mp4` in the work directory (kept out of this
repo so the entry snapshot stays small).

## How to run the program

The program does one thing: it copies `VIDEO.json` from the repository root to
the output directory, where the gate reads the video URL.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
# -> out/VIDEO.json
```

`VIDEO.json` currently holds a placeholder Shorts URL; the gate refuses a
placeholder. After the clip is uploaded to YouTube, replace the URL with the
real public Shorts URL, re-run the program, and submit.

## Files

- `main.ts` — the program (copies VIDEO.json to the output dir).
- `VIDEO.json` — the YouTube Shorts URL (placeholder until upload).
- `README.md` — this file.
- `LICENSE` — MIT.
