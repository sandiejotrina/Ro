// Shared game feel: confetti, score pops, shake. Respects reduced motion.
const FUN = (() => {
  const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function confetti() {
    if (calm) return;
    const c = document.createElement("canvas");
    c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:50";
    document.body.append(c);
    const ctx = c.getContext("2d");
    const W = c.width = innerWidth, H = c.height = innerHeight;
    const colors = ["#2f5d50", "#8cc4b0", "#e8c46a", "#f0a084", "#5b8def"];
    const bits = Array.from({ length: 140 }, () => ({
      x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.35,
      vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4,
      s: Math.random() * 6 + 4, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
      c: colors[Math.floor(Math.random() * colors.length)]
    }));
    let t = 0;
    (function tick() {
      ctx.clearRect(0, 0, W, H);
      bits.forEach(b => {
        b.vy += 0.35; b.x += b.vx; b.y += b.vy; b.r += b.vr;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
        ctx.fillStyle = b.c; ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2); ctx.restore();
      });
      if (++t < 150) requestAnimationFrame(tick); else c.remove();
    })();
  }

  function pop(anchor, text, good) {
    if (!anchor) return;
    const r = anchor.getBoundingClientRect();
    const p = document.createElement("div");
    p.className = "pop " + (good ? "good" : "bad");
    p.textContent = text;
    p.style.left = (r.left + r.width / 2) + "px";
    p.style.top = (r.top + window.scrollY) + "px";
    document.body.append(p);
    setTimeout(() => p.remove(), 1100);
  }

  function shake(node) {
    if (calm || !node) return;
    node.classList.remove("shake"); void node.offsetWidth; node.classList.add("shake");
  }

  return { confetti, pop, shake, calm };
})();
