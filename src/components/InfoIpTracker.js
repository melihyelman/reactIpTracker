import React from 'react';

function InfoIpTracker({ ip, location, timeZone, isp }) {
    const address = `${location?.city}, ${location?.region}, ${location?.country} ${location?.postalCode}`;
    return <div className='info'>
        <div className='infoItem'>
            <h6>IP Address</h6>
            <p>{ip}</p>
            <div></div>
        </div>
        <div className='infoItem'>
            <h6>location</h6>
            <p>{address}</p>
            <div></div>
        </div>
        <div className='infoItem'>
            <h6>timezone</h6>
            <p>UTC {timeZone}</p>
            <div></div>
        </div>
        <div className='infoItem'>
            <h6>isp</h6>
            <p>{isp}</p>
            <div></div>
        </div>
    </div>;
}

export default InfoIpTracker;
