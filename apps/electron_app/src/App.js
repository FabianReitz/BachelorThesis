import './App.css';

import { useState } from 'react';

// Battery indicator:
// - doesn't work in frontend. Node.js backend of electron can access battery information.
// - Check /electron_app/public/main.js for implementation of console logged info.
// MacOS: ?
// Windows: ?
// Linux: ?

// Gyroscope API:
// - Should theoretically work, none of the platforms has a Sensor for that.
// MacOS: ?
// Windows: ?
// Linux: ?

// Notification:
// MacOS: ?
// Windows: ?
// Linux: ?

// Border
// Android: ✅
// iOS: ✅

const App = () => {
    // Using the orientation event to get gyroscope data.
    const [gyroscopeData, setGyroscopeData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const handleOrientation = (event) => {
        setGyroscopeData({
            x: event.beta,
            y: event.gamma,
            z: event.alpha,
        });
    };

    window.addEventListener('deviceorientation', handleOrientation, true);

    const { x, y, z } = gyroscopeData;

    // Notification

    const NOTIFICATION_TITLE = 'My custom Notification';
    const NOTIFICATION_BODY = 'Hello World!';

    // Retuned Component
    return (
        <div className='container'>
            {/* Battery indicator */}
            <p>Battery:</p>
            <p>No access</p>
            <br />
            {/* Gyroscope API */}
            <p>Gyroscope:</p>
            <p>
                x: {round(x)} y: {round(y)} z: {round(z)}
            </p>
            <button
                onClick={() => {
                    new Notification(NOTIFICATION_TITLE, {
                        body: NOTIFICATION_BODY,
                    });
                }}
            >
                Press to Send Notification
            </button>
        </div>
    );
};

// Round a given number.
const round = (n) => {
    if (!n) return 0;
    return Math.floor(n * 100) / 100;
};
export default App;
