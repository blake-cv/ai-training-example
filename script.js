const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  io.observe(el);
});

// Typing effect
const words = ["delightful", "fast", "human", "alive"];
const typed = document.getElementById("typed");
let w = 0, c = 0, deleting = false;
function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1600); }
  if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 45 : 95);
}
reduceMotion ? (typed.textContent = words[0]) : type();

// Count-up stats
const countIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1400, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = end + "+";
    };
    requestAnimationFrame(tick);
    countIO.unobserve(el);
  });
});
document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

// Cursor glow
const glow = document.querySelector(".cursor-glow");
addEventListener("pointermove", (e) => {
  glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

// 3D tilt on project cards
if (!reduceMotion) {
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

// Starfield with mouse parallax
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [], mx = 0, my = 0;
function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  stars = Array.from({ length: Math.round(innerWidth / 9) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.3 + 0.2,
    d: Math.random() * 0.5 + 0.1,
    t: Math.random() * Math.PI * 2,
  }));
}
addEventListener("resize", resize);
addEventListener("pointermove", (e) => {
  mx = e.clientX / innerWidth - 0.5;
  my = e.clientY / innerHeight - 0.5;
});
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    s.t += 0.02;
    const x = (s.x - mx * 40 * s.d + canvas.width) % canvas.width;
    const y = (s.y - my * 40 * s.d + canvas.height) % canvas.height;
    ctx.globalAlpha = 0.35 + Math.sin(s.t) * 0.3;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
resize();
if (!reduceMotion) draw();
