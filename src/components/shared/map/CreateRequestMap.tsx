import { GoogleMap, Marker } from '@react-google-maps/api'
import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import mapStyles from 'shared/input/mapStyles'
import { VerticalGroup } from 'styles/styledComponents/containers'
const mapContainerStyle = {
  height: '500px',
  width: '600px',
}
const options = {
  styles: mapStyles,
  disableDefaultUI: false,
  zoomControl: true,
}
const center = {
  lat: 40.7,
  lng: -111.8,
}
interface IMarker {
  lat: number
  lng: number
  time: Date
}

const CreateRequesMap = () => {
  const formik = useFormikContext()
  const [marker, setMarker] = React.useState<IMarker | null>(null)
  const [mapCenter, setMapCenter] = React.useState(center)

  const setLat = formik.getFieldHelpers('lat').setValue
  const setLng = formik.getFieldHelpers('lng').setValue

  const lat = formik.getFieldProps('lat').value
  const lng = formik.getFieldProps('lng').value

  useEffect(() => {
    if (marker) {
      setLat(String(marker.lat))
      setLng(String(marker.lng))
    }
  }, [marker])
  const mapRef: any = React.useRef()
  const onMapLoad = React.useCallback((map: any) => {
    mapRef.current = map
  }, [])

  const panTo = React.useCallback(({ lat, lng }: any) => {
    mapRef?.current?.panTo({ lat, lng })
  }, [])

  React.useEffect(() => {
    //eslint-disable-next-line
    //@ts-ignore
    if (formik.values?.address1) {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode(
        //eslint-disable-next-line
        //@ts-ignore
        { address: formik.values?.address1 },
        (results, status) => {
          if (status === 'OK' && results && results[0]) {
            panTo({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            })
            mapRef.current.setZoom(16)
            setMarker({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              time: new Date(),
            })
          }
        },
      )
    }
    //eslint-disable-next-line
    //@ts-ignore
  }, [formik?.values?.address1])

  //this will remove the marker when clear is selected.
  React.useEffect(() => {
    if (marker) {
      if (formik.values === formik.initialValues) {
        setMarker(null)
      }
    }
  }, [formik.values])
  return (
    <div
      style={{
        paddingTop: '10px',
        display: !marker ? 'none' : 'block',
      }}
    >
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={mapCenter}
        options={options}
        onLoad={onMapLoad}
      >
        {marker && (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        )}
      </GoogleMap>
    </div>
  )
}

export default CreateRequesMap
