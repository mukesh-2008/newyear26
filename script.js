/* =========================
   CANVAS SETUP
========================= */
const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* =========================
   STAR FIELD (UNIVERSE)
========================= */
let stars = [];

function initStars() {
  stars = [];
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      s: Math.random() * 0.3 + 0.1
    });
  }
}
initStars();

/* =========================
   FIREWORK PARTICLES
========================= */
class Particle {
  constructor(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1.5;

    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 120;
    this.size = Math.random() * 2 + 1;
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.02; // gravity
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles = [];

function burst(x, y) {
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle(x, y));
  }
}

/* =========================
   MAIN ANIMATION LOOP
========================= */
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* Stars */
  stars.forEach(star => {
    star.y += star.s;
    if (star.y > canvas.height) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fill();
  });

  /* Fireworks */
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

/* =========================
   AUTO FIREWORK BURST
========================= */
setInterval(() => {
  burst(
    Math.random() * canvas.width,
    Math.random() * canvas.height * 0.6
  );
}, 650);

/* =========================
   WISH CARD LOOP
========================= */
const cards = document.querySelectorAll(".card");
let index = 0;

if (cards.length > 0) {
  cards[0].classList.add("active");

  setInterval(() => {
    cards.forEach(c => c.classList.remove("active"));
    index = (index + 1) % cards.length;
    cards[index].classList.add("active");
  }, 2600);
}
