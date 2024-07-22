/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const videoUrl =
      "https://stream-vod.castr.net/videos/vd9fc0625033b411efade8/nxIeDGrc9QR2vkBf.mp4/index.m3u8";

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}
