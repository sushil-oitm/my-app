const AsyncStorage = {
  setItem(...args) {
    return Promise.resolve(localStorage.setItem(...args));
  },
  getItem(...args) {
    return Promise.resolve(localStorage.getItem(...args));
  },
  clear() {
    /*to clear the local storage -akshay 23april*/
    return Promise.resolve(localStorage.clear());
  },
  removeItem(...args) {
    return Promise.resolve(localStorage.removeItem(...args));
  },
  multiGet(...args) {
    return Promise.resolve(localStorage.multiGet(...args));
  }
};
export default AsyncStorage;
