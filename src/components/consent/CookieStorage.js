const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        return cookies[key];
    },

    setItem: (key, value) => {
        document.cookie = `${key}=${value}`;
    }
};

export default cookieStorage;
