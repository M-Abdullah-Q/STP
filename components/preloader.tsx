"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Heart } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const MAX_WAIT = 15000;

function extractBackgroundUrls(): string[] {
  const urls = new Set<string>();
  const all = Array.from(document.querySelectorAll<HTMLElement>("*"));

  all.forEach((el) => {
    try {
      const style = getComputedStyle(el);
      const bg = style.backgroundImage;
      if (bg && bg !== "none") {
        const re = /url\(["']?(.*?)["']?\)/g;
        let m: RegExpExecArray | null;
        while ((m = re.exec(bg)) !== null) {
          if (m[1]) urls.add(m[1]);
        }
      }
    } catch (e) {}
  });

  return Array.from(urls);
}

function waitForImage(url: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

function waitForMediaElement(el: HTMLMediaElement) {
  return new Promise<void>((resolve) => {
    if (el.readyState >= 3) {
      resolve();
      return;
    }

    const onReady = () => {
      cleanup();
      resolve();
    };

    const onErr = () => {
      cleanup();
      resolve();
    };

    const cleanup = () => {
      el.removeEventListener("canplaythrough", onReady);
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("error", onErr);
    };

    el.addEventListener("canplaythrough", onReady, { once: true });
    el.addEventListener("loadeddata", onReady, { once: true });
    el.addEventListener("error", onErr, { once: true });
  });
}

export default function Preloader({ children }: Props) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
    let timedOut = false;
    const timer = window.setTimeout(() => {
      timedOut = true;
    }, MAX_WAIT);

    async function run() {
      const imgs = Array.from(document.images) as HTMLImageElement[];
      const medias = Array.from(
        document.querySelectorAll<HTMLMediaElement>("video, audio")
      );
      const bgUrls = extractBackgroundUrls();

      const tasks: Promise<void>[] = [];
      const total = imgs.length + medias.length + bgUrls.length;

      setProgress({ done: 0, total: Math.max(1, total) });

      imgs.forEach((img) => {
        if (img.complete) {
          setProgress((p) => ({ ...p, done: p.done + 1 }));
        } else {
          const p = new Promise<void>((resolve) => {
            img.addEventListener(
              "load",
              () => {
                setProgress((pr) => ({ ...pr, done: pr.done + 1 }));
                resolve();
              },
              { once: true }
            );
            img.addEventListener(
              "error",
              () => {
                setProgress((pr) => ({ ...pr, done: pr.done + 1 }));
                resolve();
              },
              { once: true }
            );
          });
          tasks.push(p);
        }
      });

      medias.forEach((m) => {
        if (m.readyState >= 3) {
          setProgress((p) => ({ ...p, done: p.done + 1 }));
        } else {
          const p = waitForMediaElement(m).then(() =>
            setProgress((pr) => ({ ...pr, done: pr.done + 1 }))
          );
          tasks.push(p);
        }
      });

      bgUrls.forEach((url) => {
        const p = waitForImage(url).then(() =>
          setProgress((pr) => ({ ...pr, done: pr.done + 1 }))
        );
        tasks.push(p);
      });

      if (tasks.length === 0 || timedOut) {
        clearTimeout(timer);
        setTimeout(() => setLoading(false), 250);
        return;
      }

      try {
        await Promise.race([
          Promise.all(tasks),
          new Promise<void>((res) => setTimeout(res, MAX_WAIT)),
        ]);
      } catch (e) {}

      clearTimeout(timer);
      setTimeout(() => setLoading(false), 300);
    }

    const id = window.setTimeout(run, 50);

    return () => {
      clearTimeout(id);
      clearTimeout(timer);
    };
  }, []);

  const pct = Math.round((progress.done / Math.max(1, progress.total)) * 100);

  const size = 88;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = Math.round(circumference * (1 - pct / 100));

  return (
    <>
      {loading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
          role="status"
          aria-label="Loading assets"
        >
          <div className="relative" style={{ width: size, height: size }}>
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="absolute inset-0"
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={stroke}
                stroke="var(--border)"
                fill="none"
                className="opacity-40"
              />

              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={stroke}
                className="stroke-sage-500"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                style={{ transition: "stroke-dashoffset 300ms ease" }}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <Logo theme={theme} />
            </div>
          </div>
        </div>
      )}

      <div style={{ display: loading ? "none" : undefined }}>{children}</div>
    </>
  );
}

function Logo({ theme }: { theme: string }) {
  const colorClass = theme === "dark" ? "text-sage-300" : "text-sage-600";

  return (
    <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center">
      <Heart className="w-5 h-5 text-white" />
    </div>
  );
}

if (typeof window !== "undefined") {
  const id = "__preloader_leaf_keyframes";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.innerHTML = `@keyframes float { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(8deg); } 100% { transform: translateY(0) rotate(0deg); } }`;
    document.head.appendChild(s);
  }
}
