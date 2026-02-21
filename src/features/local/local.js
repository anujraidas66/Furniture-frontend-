

export const setUserToLocal = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getUserFromLocal = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null
}


// for add cart set product locally  and in cart product store in array

export const setCartsToLocal = (carts) => {
    localStorage.setItem('carts',JSON.stringify(carts));
}

export const getCartsFromLocal = () => {
    const carts = localStorage.getItem('carts');
    return carts ? JSON.parse(carts) : [];
}



export const removeUserFromLocal = () => {
    localStorage.clear();
}



/* ================= WISHLIST ================= */

export const getWishlistFromLocal = () => {
  const wishlist = localStorage.getItem("wishlist");
  return wishlist ? JSON.parse(wishlist) : [];
};

export const setWishlistToLocal = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};




