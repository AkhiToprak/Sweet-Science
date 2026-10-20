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

A GIF (or MP4/WebM) that plays while the fighter's home panel is hovered: `hover.gif`, landscape,
ideally 960 px wide or more. Set `hoverClipUrl: "/fighters/<slug>/hover.gif"`. It only loads on hover
and does not play for visitors who prefer reduced motion.
