const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

const state = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  isPanning: false,
  startPan: { x: 0, y: 0 },
};

const controls = {
  colorDraw: document.getElementById("colorDraw"),
  bgColor: document.getElementById("bgColor"),
  nbPoints: document.getElementById("nbPoints"),
  vRendu: document.getElementById("vRendu"),
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

function updateVertices() {
  const marginY = canvas.height * 0.15;
  const marginX = canvas.width * 0.25;

  A = { x: canvas.width / 2, y: marginY };
  B = { x: marginX, y: canvas.height - marginY };
  C = { x: canvas.width - marginX, y: canvas.height - marginY };
  vertices = [A, B, C];
}

let animationId = null;
let pointsPerFrame = 50;
let totalPoints = 75000;
let drawnPoints = 0;

function animate() {
  if (drawnPoints === 0) {
    updateVertices();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = controls.bgColor.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(state.offsetX, state.offsetY);
    ctx.scale(state.scale, state.scale);
  }

  const color = controls.colorDraw.value;
  chaosGame(pointsPerFrame, color);
  drawnPoints += pointsPerFrame;

  if (drawnPoints < totalPoints) {
    animationId = requestAnimationFrame(animate);
  } else {
    ctx.restore();
    animationId = null;
  }
}

function render() {
  totalPoints =
    controls.nbPoints && controls.nbPoints.value
      ? parseInt(controls.nbPoints.value)
      : 10000;
  pointsPerFrame =
    controls.vRendu && controls.vRendu.value
      ? parseInt(controls.vRendu.value)
      : 50;
  if (animationId) {
    cancelAnimationFrame(animationId);
    ctx.restore();
  }
  drawnPoints = 0;
  animate();
}

const resetViewBtn = document.getElementById("resetViewBtn");
render();

import { setupCanvasEvents } from "./utils.js";

setupCanvasEvents(canvas, controls, render, resetViewBtn, state);
