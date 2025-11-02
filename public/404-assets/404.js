(function () {
  function drawVisor() {
    const canvas = document.getElementById('visor');
    if (!canvas) return;
    const t = canvas.getContext('2d');
    if (!t) return;
    t.beginPath();
    t.moveTo(5, 45);
    t.bezierCurveTo(15, 64, 45, 64, 55, 45);
    t.lineTo(55, 20);
    t.bezierCurveTo(55, 15, 50, 10, 45, 10);
    t.lineTo(15, 10);
    t.bezierCurveTo(15, 10, 5, 10, 5, 20);
    t.lineTo(5, 45);
    t.fillStyle = '#2f3640';
    t.strokeStyle = '#f5f6fa';
    t.fill();
    t.stroke();
  }

  const cordCanvas = /** @type {HTMLCanvasElement|null} */ (document.getElementById('cord'));
  if (!cordCanvas) return;
  const ctx = cordCanvas.getContext('2d');
  if (!ctx) return;

  let y1 = 160, y2 = 100, y3 = 100;
  let y1Forward = true, y2Forward = false, y3Forward = true;

  function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, cordCanvas.width, cordCanvas.height);
    ctx.beginPath();
    ctx.moveTo(130, 170);
    ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.stroke();

    if (y1 === 100) y1Forward = true;
    if (y1 === 300) y1Forward = false;
    if (y2 === 100) y2Forward = true;
    if (y2 === 310) y2Forward = false;
    if (y3 === 100) y3Forward = true;
    if (y3 === 317) y3Forward = false;

    y1 = y1Forward ? y1 + 1 : y1 - 1;
    y2 = y2Forward ? y2 + 1 : y2 - 1;
    y3 = y3Forward ? y3 + 1 : y3 - 1;
  }

  drawVisor();
  animate();
})();
