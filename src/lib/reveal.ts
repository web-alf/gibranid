export function initReveal(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll('section, .program-card, .news-card, .timeline-item, .dip-card')
    .forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
}
