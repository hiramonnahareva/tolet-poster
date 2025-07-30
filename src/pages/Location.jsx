// // LocationFilter.jsx
// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
// import L from "leaflet";

// import "leaflet/dist/leaflet.css";

// const LocationFilter = () => {
//   const [position, setPosition] = useState([23.7805733, 90.2792393]); // Default: Tejgaon
//   const [locationDetected, setLocationDetected] = useState(false);
// const [category, setCategory] = useState("To-Let");

// const markerIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

//   const [selectedLocation, setSelectedLocation] = useState("");

//   const handleLocationChange = async (e) => {
//     const value = e.target.value;

//     if (value === "my-location") {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             const locationString = `${latitude},${longitude},My Location`;
//             setSelectedLocation(locationString);
//           },
//           (error) => {
//             alert("Location access denied or unavailable.");
//             console.error(error);
//           }
//         );
//       } else {
//         alert("Geolocation is not supported by this browser.");
//       }
//     } else {
//       setSelectedLocation(value);
//     }
//   };

//   const detectLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setPosition([latitude, longitude]);
//         setLocationDetected(true);
//       },
//       () => {
//         alert("Location access denied. Using default location.");
//       }
//     );
//   };

//   useEffect(() => {
//     if (selectedLocation) {
//       const [lat, lng] = selectedLocation.split(",");
//       // Fetch or filter posts using lat, lng
//     }
//   }, [selectedLocation]);

//   useEffect(() => {
//     detectLocation(); // Auto detect on mount
//   }, []);

//   return (
//     <div className="flex justify-center items-center mt-20">
//       <div className="bg-white rounded-lg overflow-hidden shadow-lg">
//         <div className="h-60 w-full">
//           <MapContainer
//             center={position}
//             zoom={15}
//             scrollWheelZoom={false}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution="&copy; OpenStreetMap contributors"
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Circle center={position} radius={300} fillOpacity={0.2} />
//             <Marker position={position} icon={markerIcon} />
//           </MapContainer>
//         </div>

// <div className="p-4 bg-black text-white">
//   <div className="flex justify-between items-center mb-4">
//     <h2 className="text-lg font-semibold">Filter</h2>
//     <button className="text-xl">✕</button>
//   </div>

//           <div className="mb-4">
//             <select onChange={handleLocationChange} value={selectedLocation}>
//               <option value="my-location">📍 My Location</option>
//               <option value="23.7805733,90.2792393,Tejgaon, Dhaka">
//                 Tejgaon, Dhaka
//               </option>
//               <option value="23.7527022,90.3937055,Banani, Dhaka">
//                 Banani, Dhaka
//               </option>
//               <option value="23.7368966,90.3854355,Dhanmondi, Dhaka">
//                 Dhanmondi, Dhaka
//               </option>
//               <option value="23.7282894,90.3920655,Uttara, Dhaka">
//                 Uttara, Dhaka
//               </option>
//             </select>

//             <button
//               onClick={detectLocation}
//               className="mt-1 text-sm text-blue-400 hover:underline"
//             >
//               📍 Find Location Automatic
//             </button>
//           </div>

// <div className="mb-2">
//   <label className="block mb-1 text-sm">Category</label>
//   <select
//     className="w-full px-3 py-2 bg-white text-black rounded"
//     value={category}
//     onChange={(e) => setCategory(e.target.value)}
//   >
//     <option>To-Let</option>
//     <option>Rent</option>
//     <option>Buy</option>
//   </select>
// </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationFilter;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const locationOptions = [
  { value: "my-location", label: "📍 My Location" },
  { value: "23.7805733,90.2792393", label: "Tejgaon, Dhaka" },
  { value: "23.7527022,90.3937055", label: "Banani, Dhaka" },
  { value: "23.7368966,90.3854355", label: "Dhanmondi, Dhaka" },
  { value: "23.7282894,90.3920655", label: "Uttara, Dhaka" },
  { value: "23.7456536,90.3755679", label: "Mohammadpur, Dhaka" },
  { value: "23.7915995,90.4041873", label: "Gulshan, Dhaka" },
  { value: "23.777176,90.399452", label: "Mirpur, Dhaka" },
  { value: "23.709921,90.407143", label: "Jatrabari, Dhaka" },
  { value: "23.7727162,90.3606185", label: "Shyamoli, Dhaka" },
  { value: "23.7543834,90.3739437", label: "Lalmatia, Dhaka" },
  { value: "23.7467993,90.3768232", label: "Kalabagan, Dhaka" },
  { value: "23.7415,90.3783", label: "Green Road, Dhaka" },
  { value: "23.7651,90.3661", label: "Agargaon, Dhaka" },
  { value: "23.7700,90.3600", label: "Kallyanpur, Dhaka" },
];

const MapWithLocationSelector = () => {
  const [currentPosition, setCurrentPosition] = useState([23.8103, 90.4125]); // Default Dhaka
  const [selected, setSelected] = useState("my-location");
  const [currentCoords, setCurrentCoords] = useState([23.7805733, 90.2792393]);

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const [category, setCategory] = useState("To-Let");

  // Get device location
  useEffect(() => {
    if (selected === "my-location") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
          console.log("Current Position:", latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      const [lat, lng] = selected.split(",").map(Number);
      setCurrentPosition([lat, lng]);
    }
  }, [selected]);

  const ChangeView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 13);
    return null;
  };

  useEffect(() => {
    // Get device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCurrentCoords([latitude, longitude]);
          console.log("Current Coordinates:", currentCoords);
          // setLoading(false);
        },
        (err) => {
          console.error("Location error:", err.message);
          // setLoading(false);
        }
      );
    } else {
      console.warn("Geolocation is not supported.");
      // setLoading(false);
    }
  }, []); 

  console.log("Current Position:", currentPosition); 

  return (
    <div className="w-full max-w-3xl lg:mt-20 lg:mb-40 mt-0 mx-auto">   
      <MapContainer
        center={currentPosition}
        zoom={14}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> 
        <Marker position={currentPosition} icon={markerIcon}>
          <Popup>
            {selected === "my-location"
              ? "Your Current Location"
              : "Selected Location"}
          </Popup>
        </Marker>   
      </MapContainer> 
      <div className="p-4 bg-black text-white">
        <div className="flex justify-between items-center mb-4"> 
          <h2 className="text-lg font-semibold">Filter</h2>
          <button className="text-xl">✕</button>
        </div>
        <select
          className="w-full px-3 py-2 bg-white text-black rounded"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {locationOptions.map((loc) => (
            <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>
          ))}
        </select> 
        <div className="mb-2">
          <label className="block mb-1 text-sm">Category</label> 
          <select
            className="w-full px-3 py-2 bg-white text-black rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>To-Let</option>
            <option>Rent</option>
            <option>Buy</option>
          </select>
        </div>
      </div>                                                                    
    </div>   
  );
};

export default MapWithLocationSelector;
