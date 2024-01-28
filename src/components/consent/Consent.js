import { ANALYTICS_CONSENT_KEY } from './../../constants/constants'
import cookieStorage from './CookieStorage';

const storageType = cookieStorage;
const consentProperyName = ANALYTICS_CONSENT_KEY

const shouldShowPopup = () => !storageType.getItem(consentProperyName);
const saveToStorage = () => storageType.setItem(consentProperyName, true);

const setCallBack = (callback, value) => {
    if (typeof callback === 'function') {
        callback(value);
    }
}

// Callback determines the consent status of the user with a Bool.
export const handleConsent = (callback) => {
    const consentPopUp = document.getElementById('consent-popup');
    const acceptButton = document.getElementById('accept');
    const declineButton = document.getElementById('decline');


    const acceptFn = event => {
        // Consent has been accepted -> Save cookie to storage
        saveToStorage(storageType);
        consentPopUp.classList.add('hidden');
        setCallBack(callback, true);
    }

    const declineFn = event => {
        consentPopUp.classList.add('hidden');
        setCallBack(callback, false);
    }

    acceptButton.addEventListener('click', acceptFn);
    declineButton.addEventListener('click', declineFn);

    if (shouldShowPopup(storageType)) {
        setTimeout(() => {
            consentPopUp.classList.remove('hidden');
        }, 2000)
    } else {
        // Popup should not be shown because Cookie has already been set -> Callback
        setCallBack(callback, true);
    }
};