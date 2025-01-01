const token = localStorage.getItem('token');

function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert base64Url to base64
        const decodedData = JSON.parse(atob(base64)); // Decode and parse JSON
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