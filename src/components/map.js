import React from 'react'
import { GoogleMap, useJsApiLoader, Marker,  } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -17.783448337566117, 
  lng: -63.18267368172742
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCkpPrflFMUIy8YuDWN5L9MNVjYNLWMdRY"
  })

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { <Marker position={{lat: -17.783448337566117, lng: -63.18267368172742}}/>}
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)