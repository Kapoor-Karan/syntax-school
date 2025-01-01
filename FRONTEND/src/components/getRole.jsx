const token = localStorage.getItem('token');

function decodeJWT(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedData = JSON.parse(atob(base64));
        return decodedData;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}


const getRole = () => {
    const decodedToken = decodeJWT(token);
    return decodedToken?.role || "unknown";
};

export default getRole;