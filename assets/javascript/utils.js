function setupCanvasEvents(canvas, controls, render, resetViewBtn, state) {
  // Attach input listeners
  Object.values(controls).forEach((input) => {
    input.addEventListener("input", render);
  });

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 150;
    render();
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  canvas.addEventListener("wheel", function (e) {
    e.preventDefault();
    const zoomFactor = 1.1;
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    const zoom = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
    state.offsetX = mouseX - (mouseX - state.offsetX) * zoom;
    state.offsetY = mouseY - (mouseY - state.offsetY) * zoom;
    state.scale *= zoom;
    render();
  });

  canvas.addEventListener("mousedown", function (e) {
    state.isPanning = true;
    state.startPan = { x: e.clientX, y: e.clientY };
  });

  canvas.addEventListener("mousemove", function (e) {
    if (!state.isPanning) return;
    const dx = e.clientX - state.startPan.x;
    const dy = e.clientY - state.startPan.y;
    state.offsetX += dx;
    state.offsetY += dy;
    state.startPan = { x: e.clientX, y: e.clientY };
    render();
  });

  canvas.addEventListener("mouseup", () => (state.isPanning = false));
  canvas.addEventListener("mouseleave", () => (state.isPanning = false));

  canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    state.isPanning = true;
    const touch = e.touches[0];
    state.startPan = { x: touch.clientX, y: touch.clientY };
  });

  canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      if (state.lastTouchDistance) {
        const zoomFactor = 1.03;
        const zoom =
          currentDistance > state.lastTouchDistance
            ? zoomFactor
            : 1 / zoomFactor;
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        state.offsetX = centerX - (centerX - state.offsetX) * zoom;
        state.offsetY = centerY - (centerY - state.offsetY) * zoom;
        state.scale *= zoom;
        render();
      }
      state.lastTouchDistance = currentDistance;
    } else if (state.isPanning) {
      const touch = e.touches[0];
      const dx = touch.clientX - state.startPan.x;
      const dy = touch.clientY - state.startPan.y;
      state.offsetX += dx;
      state.offsetY += dy;
      state.startPan = { x: touch.clientX, y: touch.clientY };
      render();
    }
  });

  canvas.addEventListener("touchend", function (e) {
    if (e.touches.length < 2) {
      state.lastTouchDistance = null;
    }
    state.isPanning = false;
  });

  function resetView() {
    state.scale = 1;
    state.offsetX = 0;
    state.offsetY = -150;
    render();
  }

  resetViewBtn.addEventListener("click", resetView);

  document.getElementById("save").addEventListener("click", function () {
    const link = document.createElement("a");
    link.download = "mon_flocon.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

export { setupCanvasEvents };
