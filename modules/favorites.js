// modules/favorites.js
// Handles favorite problems using localStorage and UI interactions.

export const FAVORITES_KEY = 'algo_favorites';

/**
 * Retrieve the array of favorite problem IDs from localStorage.
 * @returns {string[]} Array of problem IDs.
 */
export function getFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save the array of favorite IDs to localStorage.
 * @param {string[]} favorites
 */
export function setFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/**
 * Toggle a problem ID in the favorites list.
 * @param {string} problemId
 */
export function toggleFavorite(problemId) {
  const favs = getFavorites();
  const index = favs.indexOf(problemId);
  if (index === -1) {
    favs.push(problemId);
  } else {
    favs.splice(index, 1);
  }
  setFavorites(favs);
  // Emit custom event for UI updates
  const ev = new CustomEvent('favorites-updated', { detail: { favorites: favs } });
  window.dispatchEvent(ev);
}

/**
 * Check if a problem ID is in favorites.
 * @param {string} problemId
 * @returns {boolean}
 */
export function isFavorite(problemId) {
  return getFavorites().includes(problemId);
}

/**
 * Initialize heart icon listeners on problem cards.
 * Call after problem list is rendered.
 */
export function initFavoriteButtons() {
  document.querySelectorAll('.problem-card .favorite-btn').forEach(btn => {
    const problemId = btn.dataset.problemId;
    // Set initial state
    btn.innerHTML = isFavorite(problemId) ? '❤️' : '🤍';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(problemId);
      btn.innerHTML = isFavorite(problemId) ? '❤️' : '🤍';
    });
  });
}

/**
 * Filter problem list to show only favorites.
 * @param {HTMLElement} container Element containing problem cards.
 */
export function showFavoritesOnly(container) {
  const favs = new Set(getFavorites());
  container.querySelectorAll('.problem-card').forEach(card => {
    const id = card.dataset.problemId;
    if (favs.has(id)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}
