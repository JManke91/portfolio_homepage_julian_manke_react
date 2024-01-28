// imports
import './ConsentPopUp.css';

function ConsentPopUp() {

    // Render
    return (
        <div id='consent-popup' className='hidden'>
            <p>
                We use Google Analytics to understand how visitors interact with our website and to improve your experience. Google Analytics uses cookies to collect data such as your IP address, which is used to get a general demographics of our user base.
                By clicking "Accept", you consent to the use of Google Analytics cookies and help us improve the experience of this website.
                
                For more details, please review <a id="" href='https://policies.google.com/privacy?hl=en-US'> Google's Privacy & Terms</a>
            </p>
            <div className="button-container">
                <button id="decline" className="decline-button">Decline</button>
                <button id="accept" className="accept-button">Accept</button>
            </div>
        </div>
    );
}

export default ConsentPopUp;
