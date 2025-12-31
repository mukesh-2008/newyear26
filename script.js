const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

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
    this.color = `hsl(${Math.random()*360},100%,60%)`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.02; // gravity smoothness
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

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

setInterval(() => {
  burst(
    Math.random() * canvas.width,
    Math.random() * canvas.height * 0.6
  );
}, 650);

animate();
