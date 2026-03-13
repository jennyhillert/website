"use client";
import { useState, useEffect, useRef } from "react";

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isDesktop;
}

const NAV_LINKS = ["Home", "About", "Videos", "Contact"];

const STRIP_IMAGES = ["/images/hero2.jpeg", "/images/comp22.jpeg", "/images/jump12.JPG", "/images/jump23.jpeg", "/images/training2.jpeg"];

function PhotoStrip() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let animationId;
    let scrollPos = 0;
    const speed = 0.5;
    const tick = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth / 2) scrollPos = 0;
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div ref={containerRef} style={{ display: "flex", overflowX: "auto", width: "100%", scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
      {[...STRIP_IMAGES, ...STRIP_IMAGES].map((src, i) => (
        <img key={i} src={src} alt="" style={{ width: "280px", height: "380px", objectFit: "cover", objectPosition: "center", flexShrink: 0, display: "block" }} />
      ))}
    </div>
  );
}

const IMG_HERO = "/images/hero.jpg";
const IMG_JUMP1 = "/images/jump1.jpg";
const IMG_JUMP2 = "/images/jump2.jpg";
const IMG_COMP = "/images/comp.jpg";
const IMG_TRAINING = "/images/training.png";
const IMG_SHOW = "/images/show.jpg";

// SWAP these VIDEO IDs with real ones from https://www.youtube.com/@jennyhillert5655
const VIDEOS = [
  { id: "c4oKDuG8Wts", title: "Reserve Champion ETS Medal — 35th Annual Tournament", tag: "Competition" },
  { id: "Dfj894f0zYc", title: "Equestrian Skills Compilation", tag: "Training" },
  { id: "ldL7F_Shclo", title: "Winning 2'3\" Hunter Round on Spoken For", tag: "Competition" },
  { id: "vXDkOcricB8", title: "Winning IEA Cross-rails Equitation O/F", tag: "IEA" },
  { id: "lrDpzIl9bFM", title: "Winning IEA Cross-rails Equitation O/F Round", tag: "IEA" },
  { id: "GQiU7MzdU_M", title: "Winning Beginner Equitation Round — CTHJA Circuit", tag: "Competition" },
];

function VideoModal({ videoId, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 999, padding: "24px"
    }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: "720px" }}>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
        <button onClick={onClose} style={{
          marginTop: "16px", background: "transparent",
          border: "1px solid rgba(255,255,255,0.3)", color: "#fff",
          padding: "8px 20px", cursor: "pointer", fontSize: "13px",
          display: "block", marginLeft: "auto"
        }}>Close ✕</button>
      </div>
    </div>
  );
}

function VideoCard({ video, onPlay }) {
  const thumb = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
  const isPlaceholder = video.id.startsWith("VIDEO_ID");
  return (
    <div onClick={() => !isPlaceholder && onPlay(video.id)} style={{ cursor: isPlaceholder ? "default" : "pointer" }}>
      <div style={{
        position: "relative", height: "170px", borderRadius: "4px",
        overflow: "hidden", marginBottom: "10px", background: "#c8d8c8"
      }}>
        {!isPlaceholder ? (
          <img src={thumb} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #c8d8c8, #8aa89a)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ fontSize: "11px", color: "rgba(26,58,42,0.5)", letterSpacing: "0.1em" }}>ADD VIDEO ID</span>
          </div>
        )}
        {!isPlaceholder && (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.15)"
          }}>
            <div style={{
              width: "44px", height: "44px", background: "rgba(26,58,42,0.85)",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <div style={{ width: 0, height: 0, borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent", borderLeft: "14px solid #fff", marginLeft: "3px" }} />
            </div>
          </div>
        )}
      </div>
      <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5a7a5e", fontWeight: 600 }}>{video.tag}</span>
      <h3 style={{ fontSize: "15px", color: "#1a2e1e", fontWeight: 600, marginTop: "4px", lineHeight: 1.3 }}>{video.title}</h3>
    </div>
  );
}

const pages = {
  Home: ({ setPage, isDesktop }) => (
    <div>
      {/* ── HERO ── */}
      <div style={{
        minHeight: "92vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: isDesktop ? "80px 64px" : "40px 24px",
        position: "relative", overflow: "hidden"
      }}>
        <img src={IMG_HERO} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 30%", zIndex: 0
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(8,20,12,0.92) 0%, rgba(8,20,12,0.4) 55%, rgba(8,20,12,0.05) 100%)"
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <p style={{
            fontSize: isDesktop ? "13px" : "11px", letterSpacing: "0.28em", color: "#fff",
            textTransform: "uppercase", marginBottom: "14px", fontWeight: 700,
            textShadow: "0 1px 8px rgba(0,0,0,0.7)"
          }}>Hunter · Equitation · IEA</p>
          <h1 style={{
            fontSize: isDesktop ? "clamp(64px, 8vw, 96px)" : "clamp(48px, 13vw, 76px)", lineHeight: 1.0,
            color: "#fff", fontWeight: 700, marginBottom: "14px", letterSpacing: "-0.02em"
          }}>Jenny<br />Hillert</h1>
          <div style={{ width: "40px", height: "2px", background: "rgba(255,255,255,0.4)", marginBottom: "18px" }} />
          <p style={{ fontSize: isDesktop ? "17px" : "15px", lineHeight: 1.65, color: "rgba(255,255,255,0.72)", maxWidth: isDesktop ? "480px" : "320px", marginBottom: "32px" }}>
            11th grade equestrian in Austin, TX — competing in CTHJA and IEA, riding with heart every day.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={() => setPage("Videos")} style={{
              background: "#fff", color: "#1a2e1e", border: "none",
              padding: isDesktop ? "15px 32px" : "13px 26px", fontSize: isDesktop ? "15px" : "14px", fontWeight: 700,
              letterSpacing: "0.03em", cursor: "pointer", borderRadius: "2px"
            }}>Watch Videos</button>
            <button onClick={() => setPage("About")} style={{
              background: "transparent", color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.55)", padding: isDesktop ? "15px 32px" : "13px 26px",
              fontSize: isDesktop ? "15px" : "14px", fontWeight: 600, cursor: "pointer", borderRadius: "2px"
            }}>Meet Jenny</button>
          </div>
        </div>
      </div>

      {/* ── PHOTO STRIP ── */}
      <PhotoStrip />

      {/* ── STATS ── */}
      <div style={{ background: "#1a3a2a" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: "#2a5a3a",
          maxWidth: "1200px", margin: "0 auto"
        }}>
          {[
            { num: "2021", label: "First Show" },
            { num: "2'9\"", label: "Hunter & Eq" },
            { num: "IEA", label: "Nationals '24" },
            { num: "3–4x", label: "Per Week" }
          ].map(stat => (
            <div key={stat.label} style={{
              background: "#1a3a2a", padding: isDesktop ? "28px 12px" : "20px 8px", textAlign: "center", color: "#fff"
            }}>
              <div style={{ fontSize: isDesktop ? "26px" : "20px", fontWeight: 700 }}>{stat.num}</div>
              <div style={{ fontSize: isDesktop ? "11px" : "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8aaa8e", marginTop: "3px" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PHOTO FEATURE ── */}
      <div style={{ position: "relative", height: isDesktop ? "420px" : "260px", overflow: "hidden" }}>
        <img src={IMG_JUMP1} alt="Jenny jumping" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,20,12,0.6) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: "20px", left: "24px" }}>
          <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>Williamson County — 2024</span>
        </div>
      </div>

      {/* ── HIGHLIGHTS ── */}
      <div style={{ background: "#f5f2ed" }}>
      <div style={{ padding: isDesktop ? "64px 48px" : "48px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#5a7a5e", textTransform: "uppercase", marginBottom: "10px", fontWeight: 600 }}>Highlights</p>
        <h2 style={{ fontSize: isDesktop ? "32px" : "26px", color: "#1a2e1e", fontWeight: 700, marginBottom: "24px" }}>Competitions & Milestones</h2>
        <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(2, 1fr)" : "1fr", gap: isDesktop ? "20px" : "12px" }}>
          {[
            { title: "IEA Nationals 2024", desc: "Represented Austin on the national stage with her team.", tag: "IEA", img: IMG_JUMP2 },
            { title: "IEA Regionals 2025", desc: "Individually qualified — aiming for zones and nationals.", tag: "IEA", img: IMG_TRAINING },
            { title: "Reserve Champion — ETS Medal", desc: "Reserve Champion in the ETS Medal at the 35th Annual Tournament of Champions.", tag: "CTHJA", img: IMG_COMP },
            { title: "CTHJA Shows", desc: "Regular competitor at 2'9\" hunters and equitation.", tag: "CTHJA", img: IMG_SHOW }
          ].map(card => (
            <div key={card.title} style={{
              background: "#fff", borderRadius: "4px", overflow: "hidden",
              display: "flex", flexDirection: isDesktop ? "column" : "row",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
            }}>
              <img src={card.img} alt={card.title} style={{
                width: isDesktop ? "100%" : "100px",
                height: isDesktop ? "180px" : "auto",
                minHeight: isDesktop ? undefined : "90px", flexShrink: 0,
                objectFit: "cover", objectPosition: "center"
              }} />
              <div style={{ padding: isDesktop ? "18px 20px" : "14px 16px" }}>
                <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#5a7a5e", fontWeight: 600 }}>{card.tag}</span>
                <h3 style={{ fontSize: "15px", color: "#1a2e1e", fontWeight: 600, margin: "4px 0" }}>{card.title}</h3>
                <p style={{ fontSize: "13px", color: "#777", margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* ── EXPLORE ── */}
      <div style={{ background: "#1a2e1e", padding: isDesktop ? "64px 48px 72px" : "48px 24px 56px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: isDesktop ? "28px" : "22px", color: "#f5f2ed", fontWeight: 700, marginBottom: "20px" }}>More from Jenny</h2>
          <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr", gap: isDesktop ? "16px" : "10px" }}>
            {[
              { page: "About", label: "Jenny's Story", desc: "Meet Jenny — from her first cross rails to IEA Nationals." },
              { page: "Videos", label: "Watch Jenny Ride", desc: "Competition rounds, training sessions, and barn footage from Idylwood Stables." },
              { page: "Contact", label: "Get in Touch", desc: "Jenny would love to hear from you." }
            ].map(item => (
              <div key={item.page} onClick={() => setPage(item.page)} style={{
                background: "#fff", padding: isDesktop ? "24px" : "18px 20px", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: isDesktop ? "flex-start" : "center",
                flexDirection: isDesktop ? "column" : "row",
                gap: "12px", borderRadius: "2px"
              }}>
                <div>
                  <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#5a7a5e", textTransform: "uppercase", fontWeight: 700, margin: "0 0 4px" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a2e1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, alignSelf: isDesktop ? "flex-end" : "center" }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),

  About: ({ isDesktop }) => (
    <div style={{ background: "#f5f2ed", minHeight: "100vh" }}>
      {/* Full-bleed header image */}
      <div style={{ position: "relative", height: isDesktop ? "450px" : "300px", overflow: "hidden" }}>
        <img src={IMG_JUMP1} alt="Jenny competing" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,20,12,0.7) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: isDesktop ? "48px" : "24px", left: isDesktop ? "48px" : "24px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", fontWeight: 600, margin: "0 0 6px" }}>About</p>
          <h2 style={{ fontSize: isDesktop ? "42px" : "32px", color: "#fff", fontWeight: 700, margin: 0, lineHeight: 1.1 }}>The Rider<br />Behind the Reins</h2>
        </div>
      </div>

      <div style={{ padding: isDesktop ? "48px 48px" : "36px 24px", maxWidth: "760px", margin: "0 auto" }}>
        <blockquote style={{
          borderLeft: "3px solid #5a7a5e", paddingLeft: "20px",
          margin: "0 0 28px", fontSize: isDesktop ? "19px" : "17px", lineHeight: 1.6,
          color: "#2a3e2a", fontStyle: "italic"
        }}>
          "Jenny has always had a love for horses — and every ride is a chance to grow."
        </blockquote>
        <p style={{ fontSize: isDesktop ? "16px" : "15px", lineHeight: 1.8, color: "#555", marginBottom: "20px" }}>
          Jenny is a 11th grader at <strong style={{ color: "#1a2e1e" }}>St. Michael's Catholic Preparatory School</strong> in Austin, Texas. She started riding at age 8 and began training consistently in 2021. Her first competition was September 2022 — cross rails — and she's been progressing ever since, now competing at 2'9" hunters and equitation.
        </p>
        <p style={{ fontSize: isDesktop ? "16px" : "15px", lineHeight: 1.8, color: "#555", marginBottom: "20px" }}>
          Jenny trains 3–4 times a week at <strong style={{ color: "#1a2e1e" }}>Idylwood Stables</strong>, where she rides her horse Siddie and practices with their other horse, Merk. She also often arrives early to ride unknown horses — a habit she believes sharpens her skills for competition.
        </p>

        {/* Inline photo - IEA training shot */}
        <div style={{ borderRadius: "4px", overflow: "hidden", marginBottom: "20px" }}>
          <img src={IMG_TRAINING} alt="Jenny on unknown horse - IEA" style={{ width: "100%", height: isDesktop ? "340px" : "220px", objectFit: "cover", objectPosition: "center" }} />
          <div style={{ background: "#1a3a2a", padding: "10px 16px" }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8aaa8e", fontWeight: 600 }}>IEA — Riding the Unknown Horse</span>
          </div>
        </div>

        <p style={{ fontSize: isDesktop ? "16px" : "15px", lineHeight: 1.8, color: "#555", marginBottom: "32px" }}>
          She competes with <strong style={{ color: "#1a2e1e" }}>CTHJA</strong> locally at 2'9" and is a member of <strong style={{ color: "#1a2e1e" }}>IEA</strong>, where she rides in the 2'6" open division on unknown horses. Jenny represented her team at IEA Nationals in 2024 and is individually heading to regionals in 2025, with her sights set on zones and nationals.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["2'9\" Hunters", "Equitation", "CTHJA", "IEA", "Idylwood Stables"].map(tag => (
            <span key={tag} style={{
              border: "1px solid #5a7a5e", color: "#1a3a2a",
              fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "6px 12px", borderRadius: "2px", fontWeight: 600
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  ),

  Videos: ({ isDesktop }) => {
    const [activeVideo, setActiveVideo] = useState(null);
    const [filter, setFilter] = useState("All");
    const filters = ["All", "IEA", "Competition", "Training"];
    const filtered = filter === "All" ? VIDEOS : VIDEOS.filter(v => v.tag === filter);
    return (
      <div style={{ background: "#f5f2ed", minHeight: "100vh" }}>
      <div style={{ padding: isDesktop ? "64px 48px" : "48px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        {activeVideo && <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />}
        <p style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#5a7a5e", textTransform: "uppercase", marginBottom: "10px", fontWeight: 600 }}>Archive</p>
        <h2 style={{ fontSize: isDesktop ? "36px" : "32px", color: "#1a2e1e", fontWeight: 700, marginBottom: "6px" }}>Videos</h2>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>
          More on <a href="https://www.youtube.com/@jennyhillert5655" target="_blank" rel="noreferrer" style={{ color: "#1a3a2a", fontWeight: 600, textDecoration: "underline" }}>YouTube →</a>
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "#1a3a2a" : "#fff",
              color: filter === f ? "#fff" : "#1a3a2a",
              border: "1px solid #1a3a2a", padding: "8px 16px",
              cursor: "pointer", fontSize: "12px", fontWeight: 600,
              letterSpacing: "0.06em", borderRadius: "2px"
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
          {filtered.map(v => <VideoCard key={v.id} video={v} onPlay={setActiveVideo} />)}
        </div>
      </div>
      </div>
    );
  },

  Contact: ({ isDesktop }) => (
    <div style={{ background: "#f5f2ed", minHeight: "100vh" }}>
    <div style={{ padding: isDesktop ? "64px 48px" : "48px 24px", maxWidth: "760px", margin: "0 auto" }}>
      {/* Contact header photo */}
      <div style={{ position: "relative", height: isDesktop ? "280px" : "180px", overflow: "hidden", borderRadius: "4px", marginBottom: "32px" }}>
        <img src={IMG_COMP} alt="Jenny competing" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,20,12,0.45)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isDesktop ? "32px" : "20px 20px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", fontWeight: 600, margin: "0 0 4px" }}>Get in Touch</p>
          <h2 style={{ fontSize: isDesktop ? "36px" : "28px", color: "#fff", fontWeight: 700, margin: 0 }}>Say Hello</h2>
        </div>
      </div>
      <p style={{ fontSize: isDesktop ? "16px" : "15px", color: "#666", marginBottom: "36px", lineHeight: 1.6 }}>
        For inquiries, sponsorship, or just to connect — reach out below.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "480px" }}>
        {[
          { label: "Your Name", placeholder: "Full name" },
          { label: "Email", placeholder: "email@example.com" },
          { label: "Subject", placeholder: "What's this about?" }
        ].map(field => (
          <div key={field.label}>
            <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5a7a5e", fontWeight: 600, marginBottom: "8px" }}>{field.label}</label>
            <input placeholder={field.placeholder} style={{
              width: "100%", padding: "12px 0", border: "none",
              borderBottom: "1.5px solid #ccc", background: "transparent",
              fontSize: "15px", color: "#1a2e1e", outline: "none", boxSizing: "border-box"
            }} />
          </div>
        ))}
        <div>
          <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5a7a5e", fontWeight: 600, marginBottom: "8px" }}>Message</label>
          <textarea placeholder="Your message..." rows={5} style={{
            width: "100%", padding: "12px 0", border: "none",
            borderBottom: "1.5px solid #ccc", background: "transparent",
            fontSize: "15px", color: "#1a2e1e", outline: "none",
            resize: "none", boxSizing: "border-box"
          }} />
        </div>
        <button style={{
          background: "#1a3a2a", color: "#fff", border: "none",
          padding: "15px 36px", fontSize: "14px", fontWeight: 600,
          letterSpacing: "0.06em", cursor: "pointer", borderRadius: "2px", alignSelf: "flex-start"
        }}>Send Message</button>
      </div>
      <div style={{ marginTop: "48px", paddingTop: "28px", borderTop: "1px solid #ddd" }}>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "10px" }}>Email: <a href="mailto:Jennyahillert@gmail.com" style={{ color: "#1a3a2a", fontWeight: 600, textDecoration: "none" }}>Jennyahillert@gmail.com</a></p>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "10px" }}>Instagram: <a href="https://instagram.com/jennyhillert_eq_" target="_blank" rel="noreferrer" style={{ color: "#1a3a2a", fontWeight: 600, textDecoration: "none" }}>@jennyhillert_eq_</a></p>
        <p style={{ fontSize: "14px", color: "#888" }}>YouTube: <a href="https://www.youtube.com/@jennyhillert5655" target="_blank" rel="noreferrer" style={{ color: "#1a3a2a", fontWeight: 600, textDecoration: "none" }}>@jennyhillert5655</a></p>
      </div>
    </div>
    </div>
  )
};

export default function JennyHillertSite() {
  const [activePage, setActivePage] = useState("Home");
  const isDesktop = useIsDesktop();
  const PageContent = pages[activePage];
  return (
    <div style={{
      background: "#f5f2ed", minHeight: "100vh",
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <nav style={{
        background: "#f5f2ed",
        borderBottom: "1px solid #e0d8cc", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: isDesktop ? "18px 48px" : "16px 24px",
          maxWidth: "1200px", margin: "0 auto"
        }}>
          <div onClick={() => setActivePage("Home")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <img src="/favicon.svg" alt="JH" style={{ width: isDesktop ? "32px" : "28px", height: isDesktop ? "32px" : "28px" }} />
            <span style={{ fontSize: isDesktop ? "20px" : "17px", color: "#1a2e1e", fontWeight: 700 }}>Jenny Hillert</span>
          </div>
          <div style={{ display: "flex", gap: isDesktop ? "28px" : "16px" }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => setActivePage(link)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: isDesktop ? "14px" : "13px", fontWeight: activePage === link ? 600 : 400,
                color: activePage === link ? "#1a3a2a" : "#888",
                borderBottom: activePage === link ? "2px solid #1a3a2a" : "2px solid transparent",
                padding: "0 0 2px 0"
              }}>{link}</button>
            ))}
          </div>
        </div>
      </nav>
      <PageContent setPage={setActivePage} isDesktop={isDesktop} />
      <footer style={{ background: "#1a3a2a" }}>
        <div style={{
          padding: isDesktop ? "32px 48px" : "28px 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
          maxWidth: "1200px", margin: "0 auto"
        }}>
          <span style={{ fontSize: "15px", color: "#fff", fontWeight: 600 }}>Jenny Hillert</span>
          <div style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
            <a href="https://instagram.com/jennyhillert_eq_" target="_blank" rel="noreferrer" style={{ color: "#8aaa8e", textDecoration: "none" }}>Instagram</a>
            <a href="https://www.youtube.com/@jennyhillert5655" target="_blank" rel="noreferrer" style={{ color: "#8aaa8e", textDecoration: "none" }}>YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}