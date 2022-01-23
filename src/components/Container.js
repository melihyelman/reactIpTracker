import { useEffect, useState } from 'react';
import Map from './Map';
import axios from 'axios';
import ArrowIcon from './ArrowIcon';
import InfoIpTracker from './InfoIpTracker';

function Container() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false)
    const [ip, setIp] = useState("");
    const [tracker, setTracker] = useState(null)



    const getIpTracker = async () => {
        if (!ip || ip === "") {
            setLoading(false)
            const { data: { ip: currentIp } } = await axios.get('https://corsanywhere.herokuapp.com/https://api.ipify.org?format=json');
            const { data } = await axios.get(`https://corsanywhere.herokuapp.com/https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${currentIp}`);
            setLocation([data.location.lat, data.location.lng])
            setTracker(data)
            setLoading(true)

        } else {
            setLoading(false)
            const { data } = await axios.get(`https://corsanywhere.herokuapp.com/https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${ip}`);
            setLocation([data.location.lat, data.location.lng])
            setTracker(data)
            setLoading(true)
        }
    }


    useEffect(() => {
        if (location) {
            setLoading(true)
        }
    }, [location])


    console.log(tracker);

    useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
        getIpTracker(ip)
    }, []);

    return (
        <div className='container'>
            {loading && <div className='formContainer'>
                <form>
                    <h3>IP Address Tracker</h3>
                    <div>
                        <input placeholder='Search for any IP address' value={ip} onChange={(e) => setIp(e.target.value)} />
                        <button type='submit' onClick={(e) => { e.preventDefault(); getIpTracker() }}><ArrowIcon color={"white"} size={16} /></button>
                    </div>
                </form>
            </div>}
            {loading && tracker &&
                <InfoIpTracker ip={tracker.ip} isp={tracker.isp} location={tracker.location} timeZone={tracker.location.timezone} />}
            {loading && <Map location={location} />}

        </div >);
}

export default Container;
