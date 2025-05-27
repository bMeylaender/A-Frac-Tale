const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const state = {
  scale: 1,
  offsetX: 0,
  offsetY: -150,
  isPanning: false,
  startPan: { x: 0, y: 0 },
};

const controls = {
  angle: document.getElementById("angle"),
  depth: document.getElementById("depth"),
  length: document.getElementById("length"),
  branchWidth: document.getElementById("branchWidth"),
  colorDraw: document.getElementById("colorDraw"),
  bgColor: document.getElementById("bgColor"),
};

function drawTree(
  startX,
  startY,
  length,
  angle,
  depth,
  branchWidth,
  color,
  angleOffset
) {
  if (depth === 0) return;

  ctx.lineWidth = branchWidth;
  ctx.strokeStyle = controls.colorDraw.value;
  ctx.beginPath();
  ctx.save();

  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.stroke();

  const newX = 0;
  const newY = -length;
  const newLength = length * 0.7;
  const newWidth = branchWidth * 0.7;

  drawTree(
    newX,
    newY,
    newLength,
    angle - angleOffset,
    depth - 1,
    newWidth,
    color,
    angleOffset
  );
  drawTree(
    newX,
    newY,
    newLength,
    angle + angleOffset,
    depth - 1,
    newWidth,
    color,
    angleOffset
  );

  ctx.restore();
}

function render() {
  const angle = parseInt(controls.angle.value);
  const depth = parseInt(controls.depth.value);
  const length = parseInt(controls.length.value);
  const branchWidth = parseInt(controls.branchWidth.value);
  const color = controls.colorDraw.value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = controls.bgColor.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(state.offsetX, state.offsetY);
  ctx.scale(state.scale, state.scale);
  ctx.translate(canvas.width / 2, canvas.height);
  drawTree(0, 0, length, 0, depth, branchWidth, color, angle);
  ctx.restore();
}
const resetViewBtn = document.getElementById("resetViewBtn");
render();

import { setupCanvasEvents } from "./utils.js";

setupCanvasEvents(canvas, controls, render, resetViewBtn, state);
