"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Slim top progress bar shown during client navigations. Starts on an internal
 * link click and completes when the route (pathname/search) actually changes.
 */
export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(false);
  const ramp = useRef<ReturnType<typeof setInterval> | null>(null);
  const hide = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimers() {
    if (ramp.current) clearInterval(ramp.current);
    if (hide.current) clearTimeout(hide.current);
    ramp.current = null;
    hide.current = null;
  }

  function start() {
    clearTimers();
    setActive(true);
    setWidth(10);
    ramp.current = setInterval(() => {
      setWidth((w) => {
        if (w >= 90) return w;
        const inc = w < 50 ? 8 : w < 75 ? 4 : 1.5;
        return Math.min(90, w + inc);
      });
    }, 200);
  }

  function done() {
    clearTimers();
    setWidth(100);
    hide.current = setTimeout(() => {
      setActive(false);
      setWidth(0);
    }, 250);
  }

  // Start on internal link clicks (Next <Link> renders <a>).
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      start();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Complete when the route has changed.
  useEffect(() => {
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => () => clearTimers(), []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-0.5"
      style={{ opacity: active ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      <div
        className="h-full bg-heritage-gold"
        style={{ width: `${width}%`, transition: "width 200ms ease", boxShadow: "0 0 8px rgba(201,162,39,0.6)" }}
      />
    </div>
  );
}
