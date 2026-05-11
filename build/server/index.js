import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, redirect } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useRef, useEffect, useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const appStyles = "/assets/app-BOiGwM3F.css";
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
}, {
  rel: "stylesheet",
  href: appStyles
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "Page not found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      background: "#f4f3ef",
      color: "#0a0a0a",
      padding: 40
    },
    children: [/* @__PURE__ */ jsx("h1", {
      style: {
        fontFamily: '"Instrument Serif", serif',
        fontSize: 120,
        lineHeight: 1,
        margin: 0
      },
      children: message
    }), /* @__PURE__ */ jsx("p", {
      style: {
        marginTop: 16,
        fontSize: 16,
        color: "#5a5a58"
      },
      children: details
    }), /* @__PURE__ */ jsx("a", {
      href: "/",
      style: {
        marginTop: 32,
        fontSize: 12,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        borderBottom: "1px solid currentColor"
      },
      children: "← Back home"
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef2 = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const target = e.target;
      if (target.closest("a, button, [data-hover]")) {
        ring.classList.add("is-hovering");
      } else {
        ring.classList.remove("is-hovering");
      }
    };
    const tick = () => {
      const { x, y } = mouseRef.current;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      ringRef2.current.x += (x - ringRef2.current.x) * 0.1;
      ringRef2.current.y += (y - ringRef2.current.y) * 0.1;
      ring.style.left = `${ringRef2.current.x}px`;
      ring.style.top = `${ringRef2.current.y}px`;
      rafRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { ref: dotRef, className: "cursor-dot", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { ref: ringRef, className: "cursor-ring", "aria-hidden": "true" })
  ] });
}
function SmoothScroll() {
  useEffect(() => {
    let cleanup;
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2
      });
      let rafId;
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      cleanup = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    });
    return () => cleanup == null ? void 0 : cleanup();
  }, []);
  return null;
}
function ScrollProgress() {
  const barRef = useRef(null);
  const thumbRef = useRef(null);
  useEffect(() => {
    const bar = barRef.current;
    const thumb = thumbRef.current;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      if (bar) bar.style.width = `${pct * 100}%`;
      if (thumb) {
        const trackH = 80;
        const thumbH = Math.max(12, trackH * (window.innerHeight / document.documentElement.scrollHeight));
        const maxTop = trackH - thumbH;
        thumb.style.height = `${thumbH}px`;
        thumb.style.top = `${pct * maxTop}px`;
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { ref: barRef, className: "scroll-progress", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "custom-scrollbar", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { ref: thumbRef, className: "custom-scrollbar-thumb" }) })
  ] });
}
const portfolio = {
  role: "Senior Frontend Engineer",
  location: "Lagos, Nigeria",
  email: "ajaoabdulsamad2000@gmail.com",
  available: "Available · Q3 2026",
  metrics: [
    { v: "40%", k: "avg perf uplift" },
    { v: "99.8%", k: "payment success" },
    { v: "90+", k: "Lighthouse score" },
    { v: "80%", k: "test coverage" }
  ],
  stack: [
    "React",
    "TypeScript",
    "Next.js",
    "React Native",
    "TailwindCSS",
    "Socket.IO",
    "Ethers.js",
    "GraphQL",
    "Node.js",
    "Jest"
  ],
  projects: [
    {
      id: "foodcourt",
      n: "01",
      cat: "Food-Tech",
      name: "Foodcourt",
      year: "2024",
      role: "Senior Frontend Engineer · Lead",
      stack: ["React", "TypeScript", "Socket.IO", "Paystack", "TailwindCSS"],
      desc: "A comprehensive food-tech platform optimizing kitchen operations and customer experience. Real-time order management, payment integration, and analytics dashboard.",
      tagline: "Real-time orders for 200K monthly diners.",
      problem: "Kitchens were drowning in tablet alerts, paper tickets and three different POS apps. Order accuracy hovered at 91%; refund volume was eating margin.",
      approach: "I rebuilt the operator surface as a single Socket.IO-driven console — one screen, keyboard-first, with optimistic UI and a deterministic state machine for every order. Payments moved to Paystack with idempotent retries.",
      outcomes: [
        { v: "99.8%", k: "payment success rate" },
        { v: "40%", k: "faster perceived load" },
        { v: "200K", k: "monthly orders served" },
        { v: "91 → 99%", k: "order accuracy" }
      ],
      highlights: [
        "Architected a real-time order pipeline using Socket.IO with reconnection-safe event log.",
        "Migrated 14 legacy class components to typed function components; cut bundle 28%.",
        "Designed a kitchen display system used across 60+ locations."
      ],
      url: "foodcourt.ng"
    },
    {
      id: "soundturf",
      n: "02",
      cat: "Music / Entertainment",
      name: "Soundturf",
      year: "2023",
      role: "Frontend Engineer",
      stack: ["React", "Ethers.js", "Web3", "Wagmi", "Blockchain"],
      desc: "Music streaming platform with playlist management, seamless playback, and on-chain royalty distribution.",
      tagline: "On-chain royalties without the wallet anxiety.",
      problem: "Independent artists were waiting 90+ days for streaming royalty payouts. Existing Web3 players asked listeners to think about gas before pressing play.",
      approach: "I designed a hybrid wallet flow — listen first, sign later. Royalty splits resolve on-chain via Ethers.js, but the player UX is indistinguishable from Spotify until value actually moves.",
      outcomes: [
        { v: "< 200ms", k: "time to first audio" },
        { v: "12K", k: "wallets onboarded" },
        { v: "0", k: "failed payout txns" },
        { v: "4.7★", k: "app store rating" }
      ],
      highlights: [
        "Built a gasless playlist system using meta-transactions.",
        "Implemented gapless playback with Web Audio API + service worker prefetch.",
        "Shipped a creator dashboard for real-time royalty tracking."
      ],
      url: "soundturf.xyz"
    },
    {
      id: "figma-plugin",
      n: "03",
      cat: "Design Tools",
      name: "Figma Plugin",
      year: "2023",
      role: "Maker · Open source",
      stack: ["TypeScript", "Figma Plugin API", "React", "Vite"],
      desc: "Open-source plugin serving the design community — automates design system management and token hand-off.",
      tagline: "Bridging the design–dev token gap.",
      problem: "Teams were maintaining tokens twice — in Figma styles and in code. Hand-off was a copy-paste ritual nobody trusted.",
      approach: "A bidirectional sync between Figma variables and a typed token JSON. Designers edit in Figma, engineers consume via the codegen CLI; conflicts surface as PRs.",
      outcomes: [
        { v: "8.4K", k: "installs" },
        { v: "320", k: "GitHub stars" },
        { v: "< 60s", k: "sync to repo" },
        { v: "23", k: "contributors" }
      ],
      highlights: [
        "Authored a typed token spec compatible with Style Dictionary.",
        "Shipped a CLI that opens PRs with semantic diffs.",
        "Maintained 92% test coverage on the core diff engine."
      ],
      url: "figma.com/community/plugin/ajao"
    },
    {
      id: "tizzil",
      n: "04",
      cat: "E-Commerce",
      name: "Tizzil",
      year: "2022",
      role: "Co-founder · Frontend Lead",
      stack: ["React", "React Native", "Node.js", "GraphQL", "Apollo"],
      desc: "Full-stack commerce platform connecting local vendors with customers. Cross-platform deployment for web and mobile.",
      tagline: "One codebase, two storefronts, 1,200 vendors.",
      problem: "Local vendors needed a storefront on web and mobile but couldn't pay for two builds. Existing platforms felt foreign and charged in dollars.",
      approach: "A shared GraphQL schema with React on web and React Native on mobile, sharing 70% of business logic. Vendor onboarding designed for low-bandwidth and intermittent power.",
      outcomes: [
        { v: "1,200+", k: "active vendors" },
        { v: "70%", k: "shared logic" },
        { v: "< 90s", k: "vendor onboarding" },
        { v: "4.6★", k: "play store rating" }
      ],
      highlights: [
        "Shipped offline-first cart with background sync via service workers.",
        "Designed a single design language that scales web → mobile.",
        "Co-led a team of 4 engineers from MVP to Series A."
      ],
      url: "tizzil.com"
    }
  ],
  experience: [
    {
      role: "Senior Frontend Engineer",
      co: "Foodcourt",
      loc: "Lagos, Nigeria",
      dates: "Apr 2022 — Present",
      bullets: [
        "Improved app performance by 40% through modern React patterns and TypeScript.",
        "Architected real-time order management system using Socket.IO.",
        "Achieved 99.8% payment success rate with Paystack integration."
      ]
    },
    {
      role: "Frontend Engineer",
      co: "Zerotech Agency",
      loc: "Remote",
      dates: "Jan 2024 — Apr 2025",
      bullets: [
        "Maintained Lighthouse scores of 90+ across all projects.",
        "Implemented blockchain payment solutions using Ethers.js.",
        "Reduced bundle sizes by 30% through optimization strategies."
      ]
    },
    {
      role: "Co-Founder",
      co: "Streetfair",
      loc: "Lagos, Nigeria",
      dates: "Apr 2021 — Apr 2025",
      bullets: [
        "Architected full-stack apps using React.js and React Native.",
        "Managed complete project lifecycle from requirements to deployment.",
        "Built cross-platform solutions for web and mobile."
      ]
    }
  ],
  writing: [
    { d: "Mar 2026", t: "On the cost of premature abstraction in React", read: "6 min" },
    { d: "Jan 2026", t: "Building a 99.8% reliable payment flow", read: "11 min" },
    { d: "Nov 2025", t: "Why TypeScript saved my Socket.IO architecture", read: "8 min" }
  ]
};
const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" }
];
function scrollTo(id) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
function Nav() {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        style: {
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(244, 243, 239, 0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--faint-rule)"
        },
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              maxWidth: "var(--max-w)",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "18px var(--pad-x)"
            },
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => scrollTo("top"),
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)"
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { style: { width: 9, height: 9, background: "var(--ink)", flexShrink: 0 } }),
                    "A · Abdulsamad",
                    /* @__PURE__ */ jsx("sup", { style: { fontWeight: 400, color: "var(--dim)", marginLeft: 2, fontSize: 10 }, children: "®" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("nav", { className: "nav-desktop-links", style: { color: "var(--dim)" }, children: NAV_ITEMS.map(({ id, label }) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => scrollTo(id),
                  style: {
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--dim)",
                    transition: "color 0.18s"
                  },
                  onMouseEnter: (e) => e.currentTarget.style.color = "var(--ink)",
                  onMouseLeave: (e) => e.currentTarget.style.color = "var(--dim)",
                  children: label
                },
                id
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "nav-availability", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "pulse-dot",
                    style: {
                      display: "inline-block",
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--ink)"
                    }
                  }
                ),
                portfolio.available
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "nav-hamburger",
                  onClick: () => setOpen(true),
                  "aria-label": "Open menu",
                  children: [
                    /* @__PURE__ */ jsx("span", {}),
                    /* @__PURE__ */ jsx("span", {})
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `mobile-nav-overlay ${open ? "is-open" : ""}`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "mobile-nav-close kicker",
          onClick: () => setOpen(false),
          "aria-label": "Close menu",
          children: "Close ✕"
        }
      ),
      NAV_ITEMS.map(({ id, label }, i) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            scrollTo(id);
            setOpen(false);
          },
          style: {
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(40px, 10vw, 64px)",
            fontWeight: 400,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            textAlign: "left",
            lineHeight: 1.2,
            padding: "6px 0",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.4s ${i * 0.06}s, transform 0.4s ${i * 0.06}s`
          },
          children: label
        },
        id
      )),
      /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            marginTop: "auto",
            paddingTop: 32,
            fontSize: 12,
            color: "var(--dim)",
            letterSpacing: "0.06em",
            textTransform: "uppercase"
          },
          children: portfolio.available
        }
      )
    ] })
  ] });
}
function Reveal({ children, delay = 0, className = "", style, as: Tag = "div" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry2]) => {
        if (entry2.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const delayClass = delay > 0 ? `delay-${delay}` : "";
  const props = { ref, className: `reveal ${delayClass} ${className}`.trim(), style };
  return /* @__PURE__ */ jsx(Tag, { ...props, children });
}
function Arrow$3({ size = 12, color = "currentColor", dir = "ne" }) {
  const paths = {
    ne: "M3 13L13 3M13 3H6M13 3v7",
    e: "M3 8h10M9 4l4 4-4 4"
  };
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 16 16",
      style: { display: "inline-block", verticalAlign: "-2px", flexShrink: 0 },
      children: /* @__PURE__ */ jsx("path", { d: paths[dir], stroke: color, strokeWidth: "1.4", fill: "none", strokeLinecap: "square" })
    }
  );
}
function Hero() {
  const featured = portfolio.projects[0];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      style: {
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "64px var(--pad-x) 80px"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid-12", children: [
          /* @__PURE__ */ jsx(
            Reveal,
            {
              style: {
                gridColumn: "span 4",
                borderTop: "1px solid var(--ink)",
                paddingTop: 14
              },
              children: /* @__PURE__ */ jsx("span", { className: "kicker", children: "№ 01 — Introducing" })
            }
          ),
          /* @__PURE__ */ jsxs(
            Reveal,
            {
              delay: 1,
              style: {
                gridColumn: "span 8",
                borderTop: "1px solid var(--ink)",
                paddingTop: 14,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8
              },
              children: [
                /* @__PURE__ */ jsx("span", { className: "kicker", children: portfolio.role }),
                /* @__PURE__ */ jsxs("span", { className: "kicker", children: [
                  portfolio.location,
                  " · UTC+1"
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Reveal,
          {
            as: "h1",
            className: "serif-h",
            style: {
              gridColumn: "span 12",
              fontSize: "clamp(56px, 11vw, 168px)",
              lineHeight: 0.92,
              marginTop: 32
            },
            children: [
              "I build ",
              /* @__PURE__ */ jsx("em", { children: "quietly" }),
              /* @__PURE__ */ jsx("br", {}),
              "fast interfaces."
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid-12", style: { marginTop: 64 }, children: [
          /* @__PURE__ */ jsxs(
            Reveal,
            {
              style: {
                gridColumn: "1 / span 5",
                paddingTop: 18,
                borderTop: "1px solid var(--faint-rule)"
              },
              children: [
                /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: 17, lineHeight: 1.55, color: "#222" }, children: [
                  "Five years shipping production React across two continents. I currently lead frontend at",
                  " ",
                  /* @__PURE__ */ jsx("strong", { children: "Foodcourt" }),
                  ", a Lagos food-tech moving 200K orders a month. Previously at Zerotech and Streetfair."
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      var _a;
                      return (_a = document.getElementById("about")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 18,
                      fontSize: 13,
                      color: "var(--dim)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase"
                    },
                    children: [
                      /* @__PURE__ */ jsx(Arrow$3, { size: 11 }),
                      " Read about my approach"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Reveal,
            {
              delay: 2,
              style: {
                gridColumn: "6 / span 3",
                paddingTop: 18,
                borderTop: "1px solid var(--faint-rule)"
              },
              children: portfolio.metrics.map((m, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "9px 0",
                    borderBottom: i < portfolio.metrics.length - 1 ? "1px dashed var(--faint-rule)" : "none"
                  },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "kicker", children: m.k }),
                    /* @__PURE__ */ jsx("span", { className: "serif-h", style: { fontSize: 24 }, children: m.v })
                  ]
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxs(
            Reveal,
            {
              delay: 3,
              style: {
                gridColumn: "9 / span 4",
                background: "var(--invert-bg)",
                color: "var(--invert-ink)",
                padding: "22px 24px",
                borderTop: "1px solid var(--ink)"
              },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "kicker", style: { color: "var(--dark-dim)" }, children: [
                  "Featured · ",
                  featured.cat
                ] }),
                /* @__PURE__ */ jsx("div", { className: "serif-h", style: { fontSize: 38, marginTop: 10, lineHeight: 1 }, children: featured.name }),
                /* @__PURE__ */ jsxs("p", { style: { fontSize: 13, lineHeight: 1.5, color: "#c4c3be", marginTop: 12 }, children: [
                  "Real-time order management, payment integration, analytics dashboard.",
                  " ",
                  /* @__PURE__ */ jsx("strong", { style: { color: "#fff" }, children: "99.8% payment success" }),
                  "."
                ] }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: `/work/${featured.id}`,
                    style: { display: "flex", alignItems: "center", gap: 6, marginTop: 18 },
                    children: /* @__PURE__ */ jsxs("span", { className: "kicker", style: { color: "#fff" }, children: [
                      "View case study ",
                      /* @__PURE__ */ jsx(Arrow$3, { size: 11, color: "#fff" })
                    ] })
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Arrow$2({ size = 12, color = "currentColor" }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 16 16", style: { display: "inline-block", verticalAlign: "-2px" }, children: /* @__PURE__ */ jsx("path", { d: "M3 13L13 3M13 3H6M13 3v7", stroke: color, strokeWidth: "1.4", fill: "none", strokeLinecap: "square" }) });
}
const LAYOUTS = [
  { col: "1 / span 7", big: true },
  { col: "8 / span 5", big: false },
  { col: "1 / span 5", big: false },
  { col: "6 / span 7", big: true }
];
function ProjectCard({ p, big, col }) {
  const [hovered, setHovered] = useState(false);
  return /* @__PURE__ */ jsx(
    Reveal,
    {
      as: "article",
      className: "project-card",
      style: {
        gridColumn: col,
        borderTop: "1px solid var(--ink)",
        paddingTop: 18
      },
      children: /* @__PURE__ */ jsxs(Link, { to: `/work/${p.id}`, style: { display: "block" }, children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 18
            },
            className: "kicker",
            children: [
              /* @__PURE__ */ jsxs("span", { children: [
                p.n,
                " · ",
                p.cat
              ] }),
              /* @__PURE__ */ jsx("span", { children: p.year })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "project-image",
            style: {
              height: big ? 360 : 280,
              background: "var(--invert-bg)",
              color: "var(--invert-ink)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              padding: 28
            },
            onMouseEnter: () => setHovered(true),
            onMouseLeave: () => setHovered(false),
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "serif-h",
                  style: {
                    position: "absolute",
                    top: -28,
                    right: -16,
                    fontSize: big ? 360 : 280,
                    lineHeight: 0.8,
                    color: "#1a1a1a",
                    userSelect: "none",
                    pointerEvents: "none"
                  },
                  children: p.n
                }
              ),
              /* @__PURE__ */ jsxs("div", { style: { position: "relative", zIndex: 2 }, children: [
                /* @__PURE__ */ jsx("div", { className: "serif-h", style: { fontSize: big ? 64 : 48, lineHeight: 1 }, children: p.name }),
                /* @__PURE__ */ jsx("div", { className: "kicker", style: { color: "var(--dark-dim)", marginTop: 12 }, children: p.tagline })
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: 24,
                    right: 24,
                    transition: "transform 0.25s",
                    transform: hovered ? "translate(3px, -3px)" : "none"
                  },
                  children: /* @__PURE__ */ jsx(Arrow$2, { size: 22, color: "#fff" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginTop: 16,
              gap: 16
            },
            children: [
              /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: 14, lineHeight: 1.55, color: "#222", maxWidth: 460 }, children: p.desc }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    flexShrink: 0
                  },
                  children: p.stack.slice(0, 4).map((s) => /* @__PURE__ */ jsx("span", { className: "kicker", children: s }, s))
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
function Work() {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "work",
      style: {
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "40px var(--pad-x) 80px"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid-12", style: { alignItems: "baseline" }, children: [
          /* @__PURE__ */ jsx(Reveal, { style: { gridColumn: "span 6", borderTop: "1px solid var(--ink)", paddingTop: 14 }, children: /* @__PURE__ */ jsx("span", { className: "kicker", children: "№ 02 — Selected Work" }) }),
          /* @__PURE__ */ jsx(
            Reveal,
            {
              delay: 1,
              style: {
                gridColumn: "span 6",
                borderTop: "1px solid var(--ink)",
                paddingTop: 14,
                textAlign: "right"
              },
              children: /* @__PURE__ */ jsx("span", { className: "kicker", children: "04 of 17 · 2022—2024" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Reveal,
          {
            as: "h2",
            className: "serif-h",
            style: {
              fontSize: "clamp(48px, 8vw, 112px)",
              lineHeight: 1,
              margin: "24px 0 40px"
            },
            children: [
              "Things I've ",
              /* @__PURE__ */ jsx("em", { children: "shipped" }),
              "."
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 24
            },
            children: portfolio.projects.map((p, i) => /* @__PURE__ */ jsx(ProjectCard, { p, big: LAYOUTS[i].big, col: LAYOUTS[i].col }, p.id))
          }
        )
      ]
    }
  );
}
const BELIEFS = [
  {
    title: "Performance is empathy",
    body: "Slow apps tax the people with the slowest devices. I'd rather ship 30 KB than 300."
  },
  {
    title: "Types are documentation",
    body: "TypeScript isn't a tax — it's the cheapest spec you'll ever write."
  },
  {
    title: "Boring tech wins",
    body: "I reach for React, Postgres, and good defaults before anything novel."
  }
];
function About() {
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "about",
      style: {
        background: "var(--invert-bg)",
        color: "var(--invert-ink)",
        padding: "80px 0"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid-12", style: { alignItems: "baseline" }, children: [
          /* @__PURE__ */ jsx(
            Reveal,
            {
              style: {
                gridColumn: "span 6",
                borderTop: "1px solid rgba(250,250,248,0.15)",
                paddingTop: 14
              },
              children: /* @__PURE__ */ jsx("span", { className: "kicker", style: { color: "var(--dark-dim)" }, children: "№ 03 — About" })
            }
          ),
          /* @__PURE__ */ jsx(
            Reveal,
            {
              delay: 1,
              style: {
                gridColumn: "span 6",
                borderTop: "1px solid rgba(250,250,248,0.15)",
                paddingTop: 14,
                textAlign: "right"
              },
              children: /* @__PURE__ */ jsx("span", { className: "kicker", style: { color: "var(--dark-dim)" }, children: "Lagos / Remote · Open to senior + staff roles" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid-12", style: { marginTop: 32, gap: 32, alignItems: "start" }, children: [
          /* @__PURE__ */ jsx(Reveal, { style: { gridColumn: "span 4" }, children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "about-portrait",
              style: {
                width: "100%",
                aspectRatio: "4/5",
                background: "linear-gradient(135deg, #2a2a2a 0%, #141414 100%)",
                position: "relative",
                overflow: "hidden"
              },
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/images/profile.jpg",
                    alt: "Abdulsamad Ajao",
                    style: {
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top"
                    },
                    onError: (e) => {
                      e.target.style.display = "none";
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "serif-h",
                    style: {
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 280,
                      color: "#0e0e0e",
                      userSelect: "none",
                      lineHeight: 1
                    },
                    children: "A"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "kicker",
                    style: {
                      position: "absolute",
                      bottom: 18,
                      left: 18,
                      right: 18,
                      color: "var(--dark-dim)"
                    },
                    children: "Abdulsamad Ajao — Lagos"
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 8" }, children: [
            /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs(
              "h2",
              {
                className: "serif-h",
                style: {
                  fontSize: "clamp(40px, 6vw, 88px)",
                  lineHeight: 1.15,
                  paddingBottom: 16
                },
                children: [
                  "I make the web feel",
                  " ",
                  /* @__PURE__ */ jsx("em", { style: { color: "var(--dark-dim)" }, children: "lighter" }),
                  "."
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs(
              Reveal,
              {
                delay: 1,
                className: "story-grid",
                style: {
                  marginTop: 48,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 36
                },
                children: [
                  /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--dark-text)" }, children: "I started writing JavaScript in a generator-powered office in Yaba in 2019. Six years later, I'm still chasing the same thing — interfaces that load before you notice they did." }),
                  /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--dark-text)" }, children: "Most of my work lives at the seams: the millisecond between tap and feedback, the retry that decides whether a meal arrives, the type system that keeps a small team honest. I care about Core Web Vitals because users in Lagos pay for every byte." })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Reveal,
              {
                delay: 2,
                style: {
                  marginTop: 48,
                  paddingTop: 18,
                  borderTop: "1px dashed #2a2a2a"
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "kicker", style: { color: "var(--dark-dim)", marginBottom: 14 }, children: "Daily drivers" }),
                  /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 10 }, children: portfolio.stack.map((s) => /* @__PURE__ */ jsx(
                    "span",
                    {
                      style: {
                        fontSize: 13,
                        padding: "8px 14px",
                        border: "1px solid #2a2a2a",
                        color: "var(--dark-text)",
                        letterSpacing: "0.02em"
                      },
                      children: s
                    },
                    s
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Reveal,
              {
                delay: 3,
                className: "beliefs-grid",
                style: {
                  marginTop: 48,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 24
                },
                children: BELIEFS.map(({ title, body }, i) => /* @__PURE__ */ jsxs("div", { style: { borderTop: "1px solid #2a2a2a", paddingTop: 14 }, children: [
                  /* @__PURE__ */ jsx("div", { className: "serif-h", style: { fontSize: 22, color: "#fafaf8", lineHeight: 1.3 }, children: title }),
                  /* @__PURE__ */ jsx("p", { style: { marginTop: 8, fontSize: 13, lineHeight: 1.55, color: "var(--dark-dim)" }, children: body })
                ] }, i))
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function Experience() {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "experience",
      style: {
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "80px var(--pad-x)"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid-12", style: { alignItems: "baseline" }, children: [
          /* @__PURE__ */ jsx(Reveal, { style: { gridColumn: "span 6", borderTop: "1px solid var(--ink)", paddingTop: 14 }, children: /* @__PURE__ */ jsx("span", { className: "kicker", children: "№ 04 — Experience" }) }),
          /* @__PURE__ */ jsx(
            Reveal,
            {
              delay: 1,
              style: {
                gridColumn: "span 6",
                borderTop: "1px solid var(--ink)",
                paddingTop: 14,
                textAlign: "right"
              },
              children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/cv.pdf",
                  className: "kicker",
                  style: { color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: 3 },
                  children: "Download CV ↓"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Reveal,
          {
            as: "h2",
            className: "serif-h",
            style: { fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 1, margin: "24px 0 40px" },
            children: [
              "Where I've ",
              /* @__PURE__ */ jsx("em", { children: "worked" }),
              "."
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { children: portfolio.experience.map((e, i) => /* @__PURE__ */ jsxs(
          Reveal,
          {
            delay: i % 3,
            className: "exp-row",
            style: {
              display: "grid",
              gridTemplateColumns: "180px 1fr 1fr",
              gap: 32,
              padding: "32px 0",
              borderTop: "1px solid var(--faint-rule)",
              borderBottom: i === portfolio.experience.length - 1 ? "1px solid var(--ink)" : "none"
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "kicker", style: { paddingTop: 6 }, children: e.dates }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "serif-h", style: { fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em" }, children: e.role }),
                /* @__PURE__ */ jsxs("div", { style: { marginTop: 8, fontSize: 13, color: "var(--dim)" }, children: [
                  e.co,
                  " · ",
                  e.loc
                ] })
              ] }),
              /* @__PURE__ */ jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0 }, children: e.bullets.map((b, j) => /* @__PURE__ */ jsxs(
                "li",
                {
                  style: {
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "#222",
                    paddingLeft: 18,
                    position: "relative",
                    marginBottom: 10
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        style: {
                          position: "absolute",
                          left: 0,
                          top: 10,
                          width: 8,
                          height: 1,
                          background: "var(--ink)"
                        }
                      }
                    ),
                    b
                  ]
                },
                j
              )) })
            ]
          },
          i
        )) })
      ]
    }
  );
}
function Arrow$1({ size = 14 }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 16 16", style: { display: "inline-block", verticalAlign: "-2px" }, children: /* @__PURE__ */ jsx("path", { d: "M3 13L13 3M13 3H6M13 3v7", stroke: "currentColor", strokeWidth: "1.4", fill: "none", strokeLinecap: "square" }) });
}
function Writing() {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "writing",
      style: {
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "0 var(--pad-x) 80px"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid-12", style: { alignItems: "baseline" }, children: [
          /* @__PURE__ */ jsx(Reveal, { style: { gridColumn: "span 6", borderTop: "1px solid var(--ink)", paddingTop: 14 }, children: /* @__PURE__ */ jsx("span", { className: "kicker", children: "№ 05 — Writing" }) }),
          /* @__PURE__ */ jsx(
            Reveal,
            {
              delay: 1,
              style: {
                gridColumn: "span 6",
                borderTop: "1px solid var(--ink)",
                paddingTop: 14,
                textAlign: "right"
              },
              children: /* @__PURE__ */ jsx("span", { className: "kicker", children: "Occasional · RSS available" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Reveal,
          {
            as: "h2",
            className: "serif-h",
            style: { fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 1, margin: "24px 0 40px" },
            children: [
              "Notes on ",
              /* @__PURE__ */ jsx("em", { children: "craft" }),
              "."
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          portfolio.writing.map((w, i) => /* @__PURE__ */ jsx(Reveal, { delay: i % 3, children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "#",
              className: "writing-row",
              style: {
                display: "grid",
                gridTemplateColumns: "120px 1fr 100px 60px",
                gap: 24,
                alignItems: "baseline",
                padding: "22px 0",
                borderTop: "1px solid var(--faint-rule)",
                color: "var(--ink)"
              },
              children: [
                /* @__PURE__ */ jsx("div", { className: "kicker", children: w.d }),
                /* @__PURE__ */ jsx("div", { className: "serif-h", style: { fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1.2 }, children: w.t }),
                /* @__PURE__ */ jsx("div", { className: "kicker writing-readtime", style: { textAlign: "right" }, children: w.read }),
                /* @__PURE__ */ jsx("div", { className: "writing-arrow", style: { textAlign: "right" }, children: /* @__PURE__ */ jsx(Arrow$1, { size: 14 }) })
              ]
            }
          ) }, i)),
          /* @__PURE__ */ jsx("div", { style: { borderTop: "1px solid var(--ink)" } })
        ] })
      ]
    }
  );
}
const SOCIAL_LINKS = [
  { label: "GitHub", handle: "@ajao" },
  { label: "LinkedIn", handle: "/in/ajao" },
  { label: "X / Twitter", handle: "@ajao_dev" },
  { label: "Read.cv", handle: "/ajao" }
];
const LOOKING_FOR = [
  {
    title: "Senior or staff role",
    body: "Product-led teams shipping React or React Native at real scale."
  },
  {
    title: "Consulting · 4-week min.",
    body: "Performance audits, design-system bring-up, hiring loops."
  }
];
function Contact() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    var _a;
    (_a = navigator.clipboard) == null ? void 0 : _a.writeText(portfolio.email).catch(() => {
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "contact",
      style: {
        background: "var(--invert-bg)",
        color: "var(--invert-ink)",
        padding: "80px 0 0"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid-12", style: { alignItems: "baseline" }, children: [
          /* @__PURE__ */ jsx(
            Reveal,
            {
              style: {
                gridColumn: "span 6",
                borderTop: "1px solid rgba(250,250,248,0.15)",
                paddingTop: 14
              },
              children: /* @__PURE__ */ jsx("span", { className: "kicker", style: { color: "var(--dark-dim)" }, children: "№ 06 — Contact" })
            }
          ),
          /* @__PURE__ */ jsxs(
            Reveal,
            {
              delay: 1,
              style: {
                gridColumn: "span 6",
                borderTop: "1px solid rgba(250,250,248,0.15)",
                paddingTop: 14,
                textAlign: "right",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 8
              },
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "pulse-dot",
                    style: {
                      display: "inline-block",
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#0eea6c"
                    }
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "kicker", style: { color: "var(--dark-dim)" }, children: portfolio.available })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Reveal,
          {
            as: "h2",
            className: "serif-h",
            style: {
              fontSize: "clamp(64px, 13vw, 220px)",
              lineHeight: 0.92,
              marginTop: 40
            },
            children: [
              "Let's",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("em", { style: { color: "var(--dark-dim)" }, children: "build" }),
              " something."
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "contact-cards",
            style: {
              display: "grid",
              gridTemplateColumns: "5fr 4fr 3fr",
              gap: 24,
              marginTop: 64
            },
            children: [
              /* @__PURE__ */ jsxs(Reveal, { style: { borderTop: "1px solid rgba(250,250,248,0.15)", paddingTop: 18 }, children: [
                /* @__PURE__ */ jsx("div", { className: "kicker", style: { color: "var(--dark-dim)" }, children: "Email — fastest" }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "serif-h",
                    style: {
                      fontSize: "clamp(18px, 2.5vw, 36px)",
                      marginTop: 8,
                      color: "#fafaf8",
                      wordBreak: "break-all"
                    },
                    children: portfolio.email
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleCopy,
                    style: {
                      marginTop: 20,
                      padding: "14px 22px",
                      border: "1px solid #fafaf8",
                      color: "#fafaf8",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      transition: "background 0.2s, color 0.2s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "#fafaf8";
                      e.currentTarget.style.color = "#0a0a0a";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#fafaf8";
                    },
                    children: copied ? "Copied ✓" : "Copy address"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                Reveal,
                {
                  delay: 1,
                  style: { borderTop: "1px solid rgba(250,250,248,0.15)", paddingTop: 18 },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "kicker", style: { color: "var(--dark-dim)" }, children: "30-min intro call" }),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "serif-h",
                        style: { fontSize: 28, marginTop: 8, color: "#fafaf8", lineHeight: 1.2 },
                        children: "Tell me about the work — I'll come prepared."
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "mailto:ajaoabdulsamad2000@gmail.com?subject=Let's talk",
                        style: {
                          display: "inline-block",
                          marginTop: 20,
                          padding: "14px 22px",
                          background: "#fafaf8",
                          color: "#0a0a0a",
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase"
                        },
                        children: "Book a slot →"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Reveal,
                {
                  delay: 2,
                  style: { borderTop: "1px solid rgba(250,250,248,0.15)", paddingTop: 18 },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "kicker", style: { color: "var(--dark-dim)", marginBottom: 12 }, children: "Elsewhere" }),
                    /* @__PURE__ */ jsx("ul", { style: { listStyle: "none" }, children: SOCIAL_LINKS.map(({ label, handle }) => /* @__PURE__ */ jsxs(
                      "li",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px 0",
                          borderBottom: "1px dashed #2a2a2a",
                          fontSize: 13,
                          color: "var(--dark-text)"
                        },
                        children: [
                          /* @__PURE__ */ jsx("span", { children: label }),
                          /* @__PURE__ */ jsxs("span", { style: { color: "#fafaf8" }, children: [
                            handle,
                            " ↗"
                          ] })
                        ]
                      },
                      label
                    )) })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Reveal,
          {
            style: {
              marginTop: 64,
              paddingTop: 18,
              borderTop: "1px dashed #2a2a2a"
            },
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: 24,
                  alignItems: "start"
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "kicker", style: { color: "var(--dark-dim)" }, children: "What I'm looking for" }),
                  /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }, children: LOOKING_FOR.map(({ title, body }, i) => /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "serif-h", style: { fontSize: 24, color: "#fafaf8" }, children: title }),
                    /* @__PURE__ */ jsx("p", { style: { marginTop: 6, fontSize: 13, color: "var(--dark-dim)", lineHeight: 1.55 }, children: body })
                  ] }, i)) })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              padding: "40px 0 32px",
              marginTop: 56,
              borderTop: "1px solid #2a2a2a"
            },
            className: "kicker",
            children: [
              /* @__PURE__ */ jsx("span", { style: { color: "var(--dark-dim)" }, children: "© Abdulsamad Ajao MMXXVI · All rights reserved" }),
              /* @__PURE__ */ jsx("span", { style: { color: "var(--dark-dim)" }, children: "Crafted in Lagos · Set in Inter & Instrument Serif" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
                  style: { color: "var(--dark-dim)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" },
                  children: "↑ Back to top"
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
const meta$1 = () => [{
  title: "Abdulsamad Ajao — Senior Frontend Engineer"
}, {
  name: "description",
  content: "Frontend engineer building performant, accessible interfaces for fintech, food-tech, and Web3 platforms. Five years shipping production React across two continents."
}, {
  property: "og:title",
  content: "Abdulsamad Ajao — Senior Frontend Engineer"
}, {
  property: "og:type",
  content: "website"
}];
const _index = UNSAFE_withComponentProps(function Index() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(CustomCursor, {}), /* @__PURE__ */ jsx(SmoothScroll, {}), /* @__PURE__ */ jsx(ScrollProgress, {}), /* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(Work, {}), /* @__PURE__ */ jsx(About, {}), /* @__PURE__ */ jsx(Experience, {}), /* @__PURE__ */ jsx(Writing, {}), /* @__PURE__ */ jsx(Contact, {})]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader({
  params
}) {
  const project = portfolio.projects.find((p) => p.id === params.id);
  if (!project) throw redirect("/");
  return {
    project
  };
}
const meta = ({
  data
}) => {
  if (!data) return [{
    title: "Work — Abdulsamad Ajao"
  }];
  const {
    project: p
  } = data;
  return [{
    title: `${p.name} — Abdulsamad Ajao`
  }, {
    name: "description",
    content: p.tagline
  }];
};
function Arrow({
  size = 12,
  color = "currentColor"
}) {
  return /* @__PURE__ */ jsx("svg", {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    style: {
      display: "inline-block",
      verticalAlign: "-2px"
    },
    children: /* @__PURE__ */ jsx("path", {
      d: "M3 13L13 3M13 3H6M13 3v7",
      stroke: color,
      strokeWidth: "1.4",
      fill: "none",
      strokeLinecap: "square"
    })
  });
}
const work_$id = UNSAFE_withComponentProps(function CaseStudy({
  loaderData
}) {
  const {
    project: p
  } = loaderData;
  const idx = portfolio.projects.findIndex((proj) => proj.id === p.id);
  const next = portfolio.projects[(idx + 1) % portfolio.projects.length];
  return /* @__PURE__ */ jsxs("div", {
    style: {
      background: "var(--bg)",
      color: "var(--ink)",
      fontFamily: "var(--font-sans)",
      minHeight: "100vh"
    },
    children: [/* @__PURE__ */ jsx(CustomCursor, {}), /* @__PURE__ */ jsx(SmoothScroll, {}), /* @__PURE__ */ jsx(ScrollProgress, {}), /* @__PURE__ */ jsx("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(244, 243, 239, 0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--faint-rule)"
      },
      children: /* @__PURE__ */ jsxs("div", {
        style: {
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px var(--pad-x)"
        },
        children: [/* @__PURE__ */ jsx(Link, {
          to: "/",
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink)"
          },
          children: "← Back to index"
        }), /* @__PURE__ */ jsxs("span", {
          className: "kicker",
          children: ["Case Study · ", p.n, " of 04"]
        }), /* @__PURE__ */ jsxs("a", {
          href: `https://${p.url}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "kicker",
          style: {
            color: "var(--ink)"
          },
          children: ["Visit ", p.url, " ↗"]
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      style: {
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "64px var(--pad-x) 0"
      },
      children: [/* @__PURE__ */ jsx("div", {
        className: "grid-12",
        children: /* @__PURE__ */ jsxs("div", {
          style: {
            gridColumn: "span 12",
            borderTop: "1px solid var(--ink)",
            paddingTop: 14,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8
          },
          children: [/* @__PURE__ */ jsxs("span", {
            className: "kicker",
            children: [p.n, " · ", p.cat]
          }), /* @__PURE__ */ jsxs("span", {
            className: "kicker",
            children: [p.year, " — ", p.role]
          })]
        })
      }), /* @__PURE__ */ jsxs(Reveal, {
        as: "h1",
        className: "serif-h",
        style: {
          fontSize: "clamp(64px, 13vw, 200px)",
          lineHeight: 0.92,
          marginTop: 32
        },
        children: [p.name, "."]
      }), /* @__PURE__ */ jsx(Reveal, {
        delay: 1,
        className: "serif-h",
        style: {
          gridColumn: "1 / span 8",
          marginTop: 24,
          fontSize: "clamp(24px, 3.4vw, 52px)",
          fontStyle: "italic",
          lineHeight: 1.15,
          color: "#3a3a38",
          maxWidth: 900
        },
        children: p.tagline
      }), /* @__PURE__ */ jsx(Reveal, {
        delay: 2,
        style: {
          marginTop: 56,
          paddingTop: 18,
          borderTop: "1px solid var(--ink)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24
        },
        children: p.outcomes.map((o, i) => /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("div", {
            className: "serif-h",
            style: {
              fontSize: 64,
              lineHeight: 1,
              letterSpacing: "-0.03em"
            },
            children: o.v
          }), /* @__PURE__ */ jsx("div", {
            className: "kicker",
            style: {
              marginTop: 10
            },
            children: o.k
          })]
        }, i))
      })]
    }), /* @__PURE__ */ jsx("section", {
      style: {
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "64px var(--pad-x) 0"
      },
      children: /* @__PURE__ */ jsxs("div", {
        style: {
          height: 560,
          background: "var(--invert-bg)",
          color: "var(--invert-ink)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: [/* @__PURE__ */ jsx("div", {
          className: "serif-h",
          style: {
            position: "absolute",
            top: -60,
            right: -40,
            fontSize: 720,
            lineHeight: 0.8,
            color: "#161616",
            userSelect: "none",
            pointerEvents: "none"
          },
          children: p.n
        }), /* @__PURE__ */ jsxs("div", {
          style: {
            position: "relative",
            zIndex: 2,
            textAlign: "center"
          },
          children: [/* @__PURE__ */ jsx("div", {
            className: "kicker",
            style: {
              color: "var(--dark-dim)",
              marginBottom: 16
            },
            children: "Hero capture — placeholder"
          }), /* @__PURE__ */ jsx("div", {
            className: "serif-h",
            style: {
              fontSize: 96,
              color: "#fafaf8"
            },
            children: p.name
          }), /* @__PURE__ */ jsx("div", {
            className: "kicker",
            style: {
              color: "var(--dark-dim)",
              marginTop: 16
            },
            children: "Drop a product screen here"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      style: {
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "80px var(--pad-x) 0",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24
      },
      children: [[{
        label: "The problem",
        content: p.problem
      }, {
        label: "My approach",
        content: p.approach
      }].map(({
        label,
        content
      }, i) => /* @__PURE__ */ jsxs(Reveal, {
        delay: i,
        children: [/* @__PURE__ */ jsx("div", {
          className: "kicker",
          style: {
            borderTop: "1px solid var(--ink)",
            paddingTop: 14
          },
          children: label
        }), /* @__PURE__ */ jsx("p", {
          style: {
            marginTop: 18,
            fontSize: 17,
            lineHeight: 1.6,
            color: "#222"
          },
          children: content
        })]
      }, label)), /* @__PURE__ */ jsxs(Reveal, {
        delay: 2,
        children: [/* @__PURE__ */ jsx("div", {
          className: "kicker",
          style: {
            borderTop: "1px solid var(--ink)",
            paddingTop: 14
          },
          children: "Stack"
        }), /* @__PURE__ */ jsx("ul", {
          style: {
            marginTop: 18,
            padding: 0,
            listStyle: "none"
          },
          children: p.stack.map((s) => /* @__PURE__ */ jsxs("li", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px dashed var(--faint-rule)",
              fontSize: 13,
              color: "#222"
            },
            children: [/* @__PURE__ */ jsx("span", {
              children: s
            }), /* @__PURE__ */ jsx("span", {
              style: {
                color: "var(--dim)"
              },
              children: "·"
            })]
          }, s))
        })]
      })]
    }), /* @__PURE__ */ jsxs("section", {
      style: {
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "80px var(--pad-x) 0"
      },
      children: [/* @__PURE__ */ jsx("div", {
        className: "kicker",
        style: {
          borderTop: "1px solid var(--ink)",
          paddingTop: 14
        },
        children: "What I shipped"
      }), /* @__PURE__ */ jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 32,
          marginTop: 32
        },
        children: p.highlights.map((h, i) => /* @__PURE__ */ jsx(Reveal, {
          delay: i % 3,
          children: /* @__PURE__ */ jsxs("div", {
            style: {
              borderTop: "1px solid var(--faint-rule)",
              paddingTop: 18
            },
            children: [/* @__PURE__ */ jsx("div", {
              className: "serif-h",
              style: {
                fontSize: 56,
                color: "var(--dim)"
              },
              children: String(i + 1).padStart(2, "0")
            }), /* @__PURE__ */ jsx("p", {
              style: {
                marginTop: 14,
                fontSize: 16,
                lineHeight: 1.55,
                color: "#222"
              },
              children: h
            })]
          })
        }, i))
      })]
    }), /* @__PURE__ */ jsx("section", {
      style: {
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "80px var(--pad-x) 0"
      },
      children: /* @__PURE__ */ jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16
        },
        children: [false, true].map((light, i) => /* @__PURE__ */ jsx("div", {
          style: {
            height: 360,
            background: light ? "#e8e6e0" : "var(--invert-bg)",
            color: light ? "var(--ink)" : "var(--invert-ink)",
            display: "flex",
            alignItems: "flex-end",
            padding: 28
          },
          children: /* @__PURE__ */ jsxs("span", {
            className: "kicker",
            style: {
              color: light ? "var(--dim)" : "var(--dark-dim)"
            },
            children: ["Detail ", i + 1, " — placeholder"]
          })
        }, i))
      })
    }), /* @__PURE__ */ jsx("section", {
      style: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: "120px var(--pad-x)"
      },
      children: /* @__PURE__ */ jsxs(Reveal, {
        className: "serif-h",
        style: {
          fontSize: "clamp(32px, 4.6vw, 72px)",
          lineHeight: 1.15,
          fontStyle: "italic"
        },
        children: ['"', p.tagline, '"', " ", /* @__PURE__ */ jsx("span", {
          style: {
            color: "var(--dim)",
            fontStyle: "normal",
            fontSize: "0.5em"
          },
          children: "— the brief, in one line."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      style: {
        borderTop: "1px solid var(--ink)"
      },
      children: /* @__PURE__ */ jsx(Link, {
        to: `/work/${next.id}`,
        style: {
          display: "block",
          padding: "64px var(--pad-x)",
          transition: "background 0.3s"
        },
        onMouseEnter: (e) => e.currentTarget.style.background = "var(--invert-bg)",
        onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
        children: /* @__PURE__ */ jsxs("div", {
          style: {
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 16,
            alignItems: "baseline"
          },
          children: [/* @__PURE__ */ jsx("div", {
            style: {
              gridColumn: "span 6"
            },
            children: /* @__PURE__ */ jsxs("span", {
              className: "kicker",
              style: {
                mixBlendMode: "difference",
                color: "white"
              },
              children: ["Next case → ", next.cat]
            })
          }), /* @__PURE__ */ jsx("div", {
            style: {
              gridColumn: "span 6",
              textAlign: "right"
            },
            children: /* @__PURE__ */ jsxs("span", {
              className: "kicker",
              style: {
                mixBlendMode: "difference",
                color: "white"
              },
              children: [next.n, " of 04"]
            })
          }), /* @__PURE__ */ jsxs("h2", {
            className: "serif-h",
            style: {
              gridColumn: "span 12",
              margin: "24px 0 0",
              fontSize: "clamp(64px, 13vw, 200px)",
              lineHeight: 0.9,
              mixBlendMode: "difference",
              color: "white"
            },
            children: [next.name, " ", /* @__PURE__ */ jsx(Arrow, {
              size: 64,
              color: "currentColor"
            })]
          })]
        })
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: work_$id,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BTIMp5NP.js", "imports": ["/assets/chunk-5KNZJZUH-Bx-f-fMl.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": true, "module": "/assets/root-CLLUaLie.js", "imports": ["/assets/chunk-5KNZJZUH-Bx-f-fMl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_index-D-4lWCVC.js", "imports": ["/assets/chunk-5KNZJZUH-Bx-f-fMl.js", "/assets/Reveal-DLa2nrIz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/work.$id": { "id": "routes/work.$id", "parentId": "root", "path": "work/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/work._id-C8jv7wVd.js", "imports": ["/assets/chunk-5KNZJZUH-Bx-f-fMl.js", "/assets/Reveal-DLa2nrIz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-9ef71708.js", "version": "9ef71708", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "v8_passThroughRequests": false, "unstable_trailingSlashAwareDataRequests": false, "unstable_previewServerPrerendering": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/work.$id": {
    id: "routes/work.$id",
    parentId: "root",
    path: "work/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
