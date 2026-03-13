(() => {
  const canvas = document.createElement('canvas');
  canvas.id = 'nebulaBg';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let w = 0, h = 0, t = 0;
  const stars = Array.from({ length: 140 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.2 + 0.2,
    a: Math.random() * 0.55 + 0.15,
    p: Math.random() * Math.PI * 2
  }));

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function drawNebula() {
    t += 0.0035;
    ctx.clearRect(0, 0, w, h);

    // Base dark wash (very subtle)
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, 'rgba(7, 10, 18, 0.92)');
    bg.addColorStop(1, 'rgba(9, 12, 22, 0.95)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Eastern Veil-style filament clouds (cyan/teal)
    for (let i = 0; i < 4; i++) {
      const cx = w * (0.22 + i * 0.19) + Math.sin(t + i) * 26;
      const cy = h * (0.45 + Math.cos(t * 1.2 + i) * 0.09);
      const rx = w * (0.28 - i * 0.025);
      const ry = h * (0.16 + i * 0.01);
      const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(rx, ry));
      g.addColorStop(0, 'rgba(84, 216, 255, 0.090)');
      g.addColorStop(0.45, 'rgba(30, 170, 220, 0.055)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, Math.sin(t + i) * 0.25, 0, Math.PI * 2);
      ctx.fill();
    }

    // Soft magenta edge hint (very low alpha)
    const mg = ctx.createRadialGradient(w * 0.78, h * 0.35, 30, w * 0.78, h * 0.35, w * 0.42);
    mg.addColorStop(0, 'rgba(230, 80, 170, 0.045)');
    mg.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = mg;
    ctx.fillRect(0, 0, w, h);

    // Fine stars (low intensity)
    stars.forEach(s => {
      const twinkle = s.a + Math.sin(t * 8 + s.p) * 0.08;
      ctx.fillStyle = `rgba(205, 235, 255, ${Math.max(0.05, Math.min(0.45, twinkle))})`;
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawNebula);
  }

  window.addEventListener('resize', resize);
  resize();
  drawNebula();
})();