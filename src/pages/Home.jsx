// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Card from "../components/Card";

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch posts from your backend API
//     fetch("http://localhost:3000/api/posts")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched posts:", data); // Debug
//         setPosts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setLoading(false);
//         console.error("Error fetching posts:", err);
//       });  
//   }, []);    

//   return (
//     <div className="min-h-screen flex lg:flex-row flex-col items-center justify-center px-2 pb-20"> 
//       <div className="mt-8 space-y-4">
//         <h1 className="text-2xl font-bold text-white text-center mb-4">
//           All Posts
//         </h1>
//         {loading && <div className="text-white text-center">Loading...</div>}
//         {!loading && posts.length === 0 && ( 
//           <div className="text-gray-400 text-center">No posts found.</div>  
//         )}
        
//         <div className="lg:mx-20 mx-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          
//         {posts.map((post) => (
//           <Link to={`/post/${post._id}`} key={post._id}>  
//           <Card post={post} />
//           </Link> 
//         ))}
//         </div> 
//       </div>      
//     </div>       
//   );
// };



// export default Home;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("all"); 
  const [userLocation, setUserLocation] = useState(null);

  const locations = [
    { value: "all", label: "🌍 All Locations" },
    { value: "my-location", label: "📍 My Location" },
    { value: "23.7805733,90.2792393", label: "Tejgaon" },
    { value: "23.7527022,90.3937055", label: "Banani" },
    { value: "23.7368966,90.3854355", label: "Dhanmondi" },
    { value: "23.7282894,90.3920655", label: "Uttara" },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data); // show all by default
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedLocation === "all") {
      setFilteredPosts(posts);
    } else if (selectedLocation === "my-location") {
      getUserLocation();
    } else {
      const [lat, lng] = selectedLocation.split(",");
      filterPostsByDistance(lat, lng);
    }
  }, [selectedLocation, posts]);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        filterPostsByDistance(latitude, longitude);
      },
      (err) => {
        alert("Location access denied.");
        console.error(err);
      }
    );
  };

  const filterPostsByDistance = (lat, lng) => {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const nearby = posts.filter((post) => {
      const [postLat, postLng] = post.location?.split(",").map(Number);
      const distance = getDistance(userLat, userLng, postLat, postLng);
      return distance < 5; // Only show posts within 5km
    });
    setFilteredPosts(nearby);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 pb-20">
      <div className="mt-8 space-y-4">
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Filter Posts by Location
        </h1>

        <select
          className="text-black px-3 py-2 rounded-md"
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {locations.map((loc) => (
            <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>
          ))}
        </select>

        {loading && <div className="text-white text-center">Loading...</div>}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-gray-400 text-center">No posts found.</div>
        )}

        <div className="lg:mx-20 mx-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {filteredPosts.map((post) => (
            <Link to={`/post/${post._id}`} key={post._id}>
              <Card post={post} />
            </Link>
          ))}
        </div>
      </div>
    </div>  
  );
};

export default Home;
