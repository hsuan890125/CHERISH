export default {
  saveLocal(itemId) {
    const favoriteId = JSON.stringify(itemId);
    localStorage.setItem('favoriteItems', favoriteId);
  },
  getLocal() {
    return JSON.parse(localStorage.getItem('favoriteItems'));
  },
};
