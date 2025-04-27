const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
    
canvas.width = window.innerWidth 
canvas.height = window.innerHeight;

let scale = 1;
let offsetX = 0;
let offsetY = -150;
let isPanning = false;
let startPan = { x: 0, y: 0 };

const controls = {
  angle: document.getElementById('angle'),
  depth: document.getElementById('depth'),
  length: document.getElementById('length'),
  branchWidth: document.getElementById('branchWidth'),
  colorDraw: document.getElementById('colorDraw'),
  bgColor: document.getElementById('bgColor')
};

    
function drawTree(startX, startY, length, angle, depth, branchWidth, color, angleOffset) {
  if (depth === 0) return;

  ctx.lineWidth = branchWidth;
  ctx.strokeStyle = controls.colorDraw.value;
  ctx.beginPath();
  ctx.save();

  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.stroke();

  const newX = 0;
  const newY = -length;
  const newLength = length * 0.7;
  const newWidth = branchWidth * 0.7;

  drawTree(newX, newY, newLength, angle - angleOffset, depth - 1, newWidth, color, angleOffset);
  drawTree(newX, newY, newLength, angle + angleOffset, depth - 1, newWidth, color, angleOffset);

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
  ctx.translate(offsetX, offsetY); 
  ctx.scale(scale, scale);         
  ctx.translate(canvas.width / 2, canvas.height);
  drawTree(0, 0, length, 0, depth, branchWidth, color, angle);
  ctx.restore();
}


Object.values(controls).forEach(input => {
  input.addEventListener('input', render);
});

render();
    


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - document.querySelector('.controls').offsetHeight - 60; 
  render();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
  

canvas.addEventListener('wheel', (e) => {
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

canvas.addEventListener('mousedown', (e) => {
  isPanning = true;
  startPan = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener('mousemove', (e) => {
  if (!isPanning) return;
  const dx = e.clientX - startPan.x;
  const dy = e.clientY - startPan.y;
  offsetX += dx;
  offsetY += dy;
  startPan = { x: e.clientX, y: e.clientY };
  render();
});

canvas.addEventListener('mouseup', () => isPanning = false);
canvas.addEventListener('mouseleave', () => isPanning = false);

function resetView() {
  scale = 1;
  offsetX = 0;
  offsetY = -150;
  render();
}

resetViewBtn.addEventListener('click', resetView)

document.getElementById('save').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'mon_arbre_fractal.png';
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