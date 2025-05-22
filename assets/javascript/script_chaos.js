const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

let scale = 1;
let offsetX = -750;
let offsetY = -600;
let isPanning = false;
let startPan = { x: 0, y: 0 };

const controls = {
  colorDraw: document.getElementById("colorDraw"),
  bgColor: document.getElementById("bgColor"),
};

let A = { x: width / 2, y: 20 };
let B = { x: 200, y: height - 200 };
let C = { x: width - 200, y: height - 200 };

let vertices = [A, B, C];

let current = {
  x: Math.random() * width,
  y: Math.random() * height,
};

function drawPoint(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

function chaosGame(iterations, color) {
  for (let i = 0; i < iterations; i++) {
    const target = vertices[Math.floor(Math.random() * 3)];
    current.x = (current.x + target.x) / 2;
    current.y = (current.y + target.y) / 2;
    drawPoint(current.x, current.y, color);
  }
}

function render() {
  const color = controls.colorDraw.value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = controls.bgColor.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);
  ctx.translate(canvas.width / 2, canvas.height);
  chaosGame(30000, color);
  ctx.restore();
}

render();

Object.values(controls).forEach((input) => {
  input.addEventListener("input", render);
});

render();

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 150;
  render();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomFactor = 1.1;
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  const zoom = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;

  offsetX = mouseX - (mouseX - offsetX) * zoom;
  offsetY = mouseY - (mouseY - offsetY) * zoom;

  scale *= zoom;
  render();
});

canvas.addEventListener("mousedown", (e) => {
  isPanning = true;
  startPan = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener("mousemove", (e) => {
  if (!isPanning) return;
  const dx = e.clientX - startPan.x;
  const dy = e.clientY - startPan.y;
  offsetX += dx;
  offsetY += dy;
  startPan = { x: e.clientX, y: e.clientY };
  render();
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  isPanning = true;
  const touch = e.touches[0];
  startPan = { x: touch.clientX, y: touch.clientY };
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!isPanning) return;
  const touch = e.touches[0];
  const dx = touch.clientX - startPan.x;
  const dy = touch.clientY - startPan.y;
  offsetX += dx;
  offsetY += dy;
  startPan = { x: touch.clientX, y: touch.clientY };
  render();
});

canvas.addEventListener("mouseup", () => (isPanning = false));
canvas.addEventListener("mouseleave", () => (isPanning = false));
canvas.addEventListener("touchend", () => (isPanning = false));

function resetView() {
  scale = 1;
  offsetX = 0;
  offsetY = -150;
  render();
}

resetViewBtn.addEventListener("click", resetView);

document.getElementById("save").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "mon_triangle_sierpinski.png";
  link.href = canvas.toDataURL();
  link.click();
});

let lastTouchDistance = null;

canvas.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();

    const touch1 = e.touches[0];
    const touch2 = e.touches[1];

    const currentDistance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );

    if (lastTouchDistance) {
      const zoomFactor = 1.03;
      const zoom =
        currentDistance > lastTouchDistance ? zoomFactor : 1 / zoomFactor;

      const centerX = (touch1.clientX + touch2.clientX) / 2;
      const centerY = (touch1.clientY + touch2.clientY) / 2;

      offsetX = centerX - (centerX - offsetX) * zoom;
      offsetY = centerY - (centerY - offsetY) * zoom;

      scale *= zoom;
      render();
    }

    lastTouchDistance = currentDistance;
  }
});

canvas.addEventListener("touchend", (e) => {
  if (e.touches.length < 2) {
    lastTouchDistance = null;
  }
});
