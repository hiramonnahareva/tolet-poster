import { Link } from "react-router-dom";
import Card from "../components/Card";

const PinBoard = () => {
  const pins = JSON.parse(localStorage.getItem("pinnedPosts") || "[]"); 

  return (
    <div className="min-h-screen flex flex-col items-center px-2 pb-20"> 
      <div className="w-full max-w-xs mt-8">
        <h2 className="text-white text-xl font-bold mb-4 text-center">Pinned Posts</h2>
        {pins.length === 0 && (
          <div className="text-gray-400 text-center">No pinned posts yet.</div>  
        )}
        {pins?.map((post) => (
         
            <Link to={`/post/${post?.id}`} key={post.id}>

              <Card post={post}/>       

              </Link>

        ))}  
      </div> 
    </div>       
  );
};

export default PinBoard;