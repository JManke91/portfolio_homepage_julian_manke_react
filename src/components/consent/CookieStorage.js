const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        return cookies[key];
    },

    setItem: (key, value, daysToExpire) => {
        let expires = '';
        if (daysToExpire) {
            const date = new Date();
            date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toUTCString()}`;
            console.log('cookie expiry date:', expires);
        }
        document.cookie = `${key}=${value}${expires}`;
    }
};

export default cookieStorage;
