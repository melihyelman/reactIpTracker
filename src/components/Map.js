import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

function Map({ location }) {
    return <MapContainer center={location} zoom={12} scrollWheelZoom={true} className="map">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location} />
    </MapContainer>;
}

export default Map;
