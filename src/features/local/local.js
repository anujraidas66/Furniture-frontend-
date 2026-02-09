

export const setUserToLocal = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getUserFromLocal = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null
}



export const removeUserFromLocal = () => {
    localStorage.clear();
}



// for add cart set product locally  and in cart product store in array

export const setCartsToLocal = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const getCartsFromLocal = () => {
    const carts = localStorage.getItem('cart');
    return carts ? JSON.parse(carts) : []
}