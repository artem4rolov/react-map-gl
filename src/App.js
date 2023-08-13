import { useState } from "react";
import "./App.css";
import Map, { Marker, Popup, NavigationControl, Layer } from "react-map-gl";
// import type {FillLayer } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import maplibregl from "maplibre-gl";

import data from "./data/skateboard-parks.json";
import "maplibre-gl/dist/maplibre-gl.css";
import skateSvg from "./assets/skate.svg";

export const MapStyle = {
  SPHERE: `${process.env.REACT_APP_TILES_SERVER}/styles/sphere/style.json`,
  DEFAULT: `${process.env.REACT_APP_TILES_SERVER}/styles/default/style.json`,
  BRIGHT: `${process.env.REACT_APP_TILES_SERVER}/styles/bright/style.json`,
  STREET: `${process.env.REACT_APP_TILES_SERVER}/styles/streets/style.json`,
};

function App() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  const parkLayer = {
    id: "landuse_park",
    type: "fill",
    source: "mapbox",
    "source-layer": "landuse",
    filter: ["==", "class", "park"],
    paint: {
      "fill-color": "#4E3FC8",
    },
  };

  console.log(selectedPark);

  return (
    // <div className="App">
    <Map
      id={"MAP"}
      mapStyle={MapStyle.SPHERE}
      mapLib={maplibregl}
      style={{ width: "100vw", height: "100vh" }}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
        width: "100vw",
        height: "100vh",
      }}
    >
      {data &&
        data.features.map((park) => (
          <>
            <Marker
              key={park.properties.PARK_ID}
              latitude={park.geometry.coordinates[1]}
              longitude={park.geometry.coordinates[0]}
              onClick={() => setSelectedPark(park)}
            >
              <img
                src={skateSvg}
                alt="skate icon"
                style={{ width: "30px", height: "30px" }}
              />
            </Marker>
          </>
        ))}
      <MapboxDraw
        position="top-left"
        displayControlsDefault={false}
        controls={{
          polygon: true,
          trash: true,
        }}
      />

      {/* <Layer {...parkLayer} /> */}
      {selectedPark && (
        // <Popup
        //   key={selectedPark.PARK_ID}
        //   latitude={selectedPark.geometry.coordinates[1]}
        //   longitude={selectedPark.geometry.coordinates[0]}
        //   // style={{ height: "100px", width: "100px", background: "red" }}
        //   anchor="bottom"
        //   // onClose={() => setShowPopup(false)}
        // >
        //   hi
        // </Popup>
        <Popup
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100px",
            height: "100px",
            background: "white",
          }}
          anchor="center"
          latitude={selectedPark.geometry.coordinates[1]}
          longitude={selectedPark.geometry.coordinates[0]}
        >
          hi
        </Popup>
      )}
      <NavigationControl />

      {/* {showPopup && (
        <Popup
          latitude={45.4211}
          longitude={-75.6903}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
        >
          You are here
        </Popup>
      )} */}
    </Map>
    // </div>
  );
}

export default App;
