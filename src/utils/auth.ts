export const getUserInfoFromLocalStorage = () => {
    try {
        const user = localStorage.getItem("userInfo");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
        return null;
    }
};
