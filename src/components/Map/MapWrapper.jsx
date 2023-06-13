import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import MarkerIcon from "../../assets/images/icon-location.svg";
import L from "leaflet";
import tileLayer from "./tileLayer";
import { useEffect, useRef } from "react";

const pointerIcon = new L.Icon({
  iconUrl: MarkerIcon,
  iconSize: [45, 55], // size of the icon
});

const PointMarker = ({ center }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    map.flyToBounds([center]);
  }, [map, center]);

  return <Marker icon={pointerIcon} ref={markerRef} position={center}></Marker>;
};

const MyMarker = ({ lat, lng }) => {
  return <PointMarker center={{ lat, lng }} />;
};

const MapWrapper = ({ lat, lng, error }) => {
  return (
    <>
      {!error && (
        <MapContainer
          center={[lat, lng]}
          zoom={18}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer {...tileLayer} />
          <MyMarker lat={lat} lng={lng} />
        </MapContainer>
      )}
    </>
  );
};

export default MapWrapper;
