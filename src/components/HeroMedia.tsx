"use client";

import { useReducedMotion } from "framer-motion";

type Props = {
  videoId: string | null;
  start?: number;
  end?: number;
  imageUrl: string | null;
  alt: string;
  playing?: boolean; // false keeps the still (e.g. a home panel that isn't hovered)
  playSize?: number;
  className?: string; // background shown when there is no media yet
};

function embedUrl(id: string, start?: number, end?: number) {
  const p = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
  });
  if (start) p.set("start", String(start));
  if (end) p.set("end", String(end));
  return `https://www.youtube-nocookie.com/embed/${id}?${p}`;
}

// Fills its parent. Order of preference: muted YouTube loop over the still,
// the still alone, then the themed placeholder. The still stays underneath the
// video so a blocked or removed clip still shows something.
export function HeroMedia({ videoId, start, end, imageUrl, alt, playing = true, playSize = 88, className = "media-placeholder" }: Props) {
  const reduce = useReducedMotion();
  const showVideo = Boolean(videoId) && playing && !reduce;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ containerType: "size" }}>
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      )}
      {showVideo && videoId && (
        <iframe
          src={embedUrl(videoId, start, end)}
          title={alt}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
          style={{ width: "max(100cqw, 177.78cqh)", height: "max(100cqh, 56.25cqw)" }}
        />
      )}
      {!imageUrl && !videoId && (
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-current"
          style={{ width: playSize, height: playSize }}
        >
          <svg width={playSize * 0.36} height={playSize * 0.36} viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
}
