const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});