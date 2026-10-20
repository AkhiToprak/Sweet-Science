# Fighter images

One folder per fighter. Drop the hero still in as `hero.jpg` (about 1600 px wide, landscape),
then point the fighter at it in `src/data/fighters.ts`:

```ts
heroImageUrl: "/fighters/tyson/hero.jpg",
heroImageCredit: "Author Name, CC BY-SA 4.0, via Wikimedia Commons",
```

Only Wikimedia Commons images (with licence and author) or your own illustrations; no press photos.
The still is used on the fighter hero, the home panel, and as the fallback behind the hero video.

## Hover clips

`hover.mp4` plays while the fighter's home panel is hovered or focused (`hoverClipUrl` in
`src/data/fighters.ts`). It only loads on hover and does not play for visitors who prefer reduced motion.
GIF also works, but MP4 is about 7x smaller. To convert a GIF:

```bash
ffmpeg -i in.gif -an -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p" -c:v libx264 -crf 22 -movflags +faststart hover.mp4
```
