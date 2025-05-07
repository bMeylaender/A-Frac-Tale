const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isPanning = false;
let startPan = { x: 0, y: 0 };

const controls = {
  depth: document.getElementById("depth"),
  width: document.getElementById("width"),
  colorDraw: document.getElementById("colorDraw"),
  bgColor: document.getElementById("bgColor"),
};

const resetViewBtn = document.getElementById("resetViewBtn");

function drawKoch(x1, y1, x2, y2, depth) {
  if (depth === 0) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  } else {
    const dx = (x2 - x1) / 3;
    const dy = (y2 - y1) / 3;

    const xA = x1 + dx;
    const yA = y1 + dy;

    const xB = x1 + 2 * dx;
    const yB = y1 + 2 * dy;

    const angle = Math.PI / 3;
    const xC = xA + (dx * Math.cos(angle) - dy * Math.sin(angle));
    const yC = yA + (dx * Math.sin(angle) + dy * Math.cos(angle));

    drawKoch(x1, y1, xA, yA, depth - 1);
    drawKoch(xA, yA, xC, yC, depth - 1);
    drawKoch(xC, yC, xB, yB, depth - 1);
    drawKoch(xB, yB, x2, y2, depth - 1);
  }
}

function drawSnowflake() {
  const depth = parseInt(controls.depth.value, 10);
  const width = parseFloat(controls.width.value, 10);
  const strokeColor = controls.colorDraw.value;
  // const fillColor = controls.colorDraw.value;

  ctx.beginPath();

  const size = 300;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const x1 = centerX - size / 2;
  const y1 = centerY;

  const x2 = centerX + size / 2;
  const y2 = centerY;

  const x3 = centerX;
  const y3 = centerY - size * Math.sin(Math.PI / 3);
  console.log("x1:", x1, "y1:", y1, "x2:", x2, "y2:", y2);
  ctx.lineWidth = width;
  ctx.strokeStyle = strokeColor;

  drawKoch(x1, y1, x2, y2, depth);
  drawKoch(x2, y2, x3, y3, depth);
  drawKoch(x3, y3, x1, y1, depth);
  // ctx.lineTo(x1, y1);
  // ctx.closePath();
  // ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.stroke();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = controls.bgColor.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);
  drawSnowflake();
  ctx.restore();
}

Object.values(controls).forEach((input) => {
  input.addEventListener("input", render);
});

render();

function resizeCanvas() {
  const controlsHeight = document.querySelector(".controls")?.offsetHeight || 0;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - controlsHeight - 60;
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

canvas.addEventListener("mouseup", () => (isPanning = false));
canvas.addEventListener("mouseleave", () => (isPanning = false));

function resetView() {
  scale = 1;
  offsetX = 0;
  offsetY = -150;
  render();
}

resetViewBtn.addEventListener("click", resetView);

document.getElementById("save").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "mon_flocon.png";
  link.href = canvas.toDataURL();
  link.click();
});

document.addEventListener("DOMContentLoaded", function () {
  const burgerBtn = document.getElementById("burger-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const dropdownToggle = document.querySelector(".mobile-dropdown-toggle");
  const mobileDropdown = document.querySelector(".mobile-dropdown");

  burgerBtn.addEventListener("click", function () {
    mobileNav.classList.toggle("active");
  });

  dropdownToggle.addEventListener("click", function () {
    mobileDropdown.classList.toggle("active");
  });
});
