import emitter from '@/methods/emitter';

export default {
    methods: {
        saveLocalStorage (itemId) {
            const favoriteId = JSON.stringify(itemId);
            localStorage.setItem('favoriteItems', favoriteId);
        },
        addFavorite (itemId) {
            if (this.favoriteItems.includes(itemId)) { // 移除喜愛
              this.favoriteItems.splice(this.favoriteItems.indexOf(itemId), 1);
              emitter.emit('push-message', {  // toast
                style: 'success',
                title: '已從收藏清單中移除',
              });
            } else { // 新增喜愛
              this.favoriteItems.push(itemId);
              emitter.emit('push-message', {  // toast
                style: 'success',
                title: '已新增至收藏清單',
              });
            }
            localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteItems));
            emitter.emit('updateFavorite');
        },
        getLocalStorage () {
            return JSON.parse(localStorage.getItem('favoriteItems'));
        }
    },
}