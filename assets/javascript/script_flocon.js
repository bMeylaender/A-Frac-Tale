const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const state = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  isPanning: false,
  startPan: { x: 0, y: 0 },
};

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
  ctx.lineWidth = width;

  drawKoch(x1, y1, x2, y2, depth);
  drawKoch(x2, y2, x3, y3, depth);
  drawKoch(x3, y3, x1, y1, depth);

  ctx.fill();
  ctx.stroke();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = controls.bgColor.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(state.offsetX, state.offsetY);
  ctx.scale(state.scale, state.scale);
  drawSnowflake();
  ctx.restore();
}

render();

import { setupCanvasEvents } from "./utils.js";

setupCanvasEvents(canvas, controls, render, resetViewBtn, state);
