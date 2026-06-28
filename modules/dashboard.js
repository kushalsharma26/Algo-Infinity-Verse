// modules/dashboard.js
// This module renders the main dashboard with DSA topics, quiz launch buttons, and progress badges.

export function renderDashboard(container) {
  // Clear container
  container.innerHTML = '';

  const title = document.createElement('h1');
  title.textContent = 'Algo Infinity Verse';
  title.className = 'glow-title';
  container.appendChild(title);

  const topics = [
    { name: 'Arrays', id: 'arrays' },
    { name: 'Strings', id: 'strings' },
    { name: 'Linked Lists', id: 'linked-lists' },
    { name: 'Trees', id: 'trees' },
    { name: 'Graphs', id: 'graphs' },
    { name: 'Dynamic Programming', id: 'dp' },
  ];

  const grid = document.createElement('div');
  grid.className = 'topic-grid glass';

  topics.forEach(topic => {
    const card = document.createElement('div');
    card.className = 'topic-card glass';
    const heading = document.createElement('h2');
    heading.textContent = topic.name;
    const btn = document.createElement('button');
    btn.textContent = 'Start Quiz';
    btn.className = 'quiz-btn';
    btn.dataset.topic = topic.id;
    btn.addEventListener('click', () => {
      const ev = new CustomEvent('start-quiz', { detail: { topic: topic.id } });
      window.dispatchEvent(ev);
    });
    card.appendChild(heading);
    card.appendChild(btn);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}
