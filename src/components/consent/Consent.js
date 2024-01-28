import { ANALYTICS_CONSENT_KEY } from './../../constants/constants'

// TODO: Move storage logic to separate layer
const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value}), {})
        return cookies[key];
    },

    setItem: (key, value) => {
        document.cookie = `${key}=${value}`
    }
}

const storageType = cookieStorage;
const consentProperyName = ANALYTICS_CONSENT_KEY

const shouldShowPopup = () => !storageType.getItem(consentProperyName);
const saveToStorage = () => storageType.setItem(consentProperyName, true);

export const handleConsent = () => {
    const consentPopUp = document.getElementById('consent-popup');
    const acceptButton = document.getElementById('accept');
    const declineButton = document.getElementById('decline');

    const acceptFn = event => {
        // Consent has been accepted -> Save cookie to storage
        saveToStorage(storageType);
        consentPopUp.classList.add('hidden');
    }

    const declineFn = event => {
        consentPopUp.classList.add('hidden');
    }

    acceptButton.addEventListener('click', acceptFn);
    declineButton.addEventListener('click', declineFn);

    if (shouldShowPopup(storageType)) {
        setTimeout(() => {
            consentPopUp.classList.remove('hidden');
        }, 2000)
    }
};