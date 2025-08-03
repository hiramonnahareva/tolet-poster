import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { IoShareSocialOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";   
import pinboard from '../assets/pinboard.png'; // Assuming you have a pinboard icon

// Share options
const shareLinks = [
  {
    name: "Copy Link",
    action: (url) => {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    },
  },
  {
    name: "Facebook",
    url: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    url: (url) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
  }, 
  {
    name: "Messenger",
    url: (url) =>
      `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(url)}`,
  },
]; 

const reportReasons = [
  "Spam",
  "Inappropriate Content",
  "False Information",
  "Other",
];

const PostView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Pin state
  const [saved, setSaved] = useState(
    !!JSON.parse(localStorage.getItem("pinnedPosts") || "[]").find((p) => p.id === id)
  );
  // Share modal
  const [showShare, setShowShare] = useState(false);
  // Report modal
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reported, setReported] = useState(false); 

  useEffect(() => {
    fetch(`https://tolet-poster-server-new.onrender.com/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched single post:", data); // Debug
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching post:", err); 
      });
  }, [id]);  

  // Pin/Unpin post
  const handleSave = () => {
    let pins = JSON.parse(localStorage.getItem("pinnedPosts") || "[]");  
    if (saved) {
      pins = pins.filter((p) => p.id !== id);
    } else {
      pins.push({ id: post._id, title: post.title, description: post.description,  contactInfo: post.contactInfo });
    }
    localStorage.setItem("pinnedPosts", JSON.stringify(pins));
    setSaved(!saved);
  };  

  // Advanced share
  const handleShare = (link) => {
    if (link.action) {
      link.action(window.location.href);
    } else if (link.url) {
      window.open(link.url(window.location.href), "_blank");
    }
    setShowShare(false);
  };

  // Report
  const handleReport = () => {
    setReported(true);
    setShowReport(false);
    alert("Thank you for your report.");
  }; 

  if (loading) {
    return <div className="text-white text-center mt-8">Loading...</div>;
  }
  if (!post) {
    return <div className="text-white text-center mt-8">Post not found.</div>;
  } 

  return (
    <div className="min-h-screen flex flex-col items-center px-2 pb-20"> 
      <div className="w-full max-w-xs mt-8">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            className="text-gray-400 text-2xl font-bold"
            onClick={() => navigate(-1)}
            aria-label="Close"
          >
            &times;
          </button>     
        </div>         
        {/* Poster Card */}
        <Card className={'mt-20'} post={post} />
        {/* Actions */} 
        <div className="flex justify-between  px-2 text-gray-700"> 
          <button
            // className={`flex gap-2 items-center ${saved ? "text-blue-600" : ""}`} 
            className={`flex gap-2 items-center ${saved ? "" : ""}`}
            onClick={handleSave}
          > 
            {/* <span className="text-xl">{saved ? <img className="w-[20px]" src={pinboard} alt="" />  : "☆"}</span>  */}
            <span className="text-xl">{saved ? <img className="w-[18px]" src={pinboard} alt="" /> : <img className="w-[18px]" src={pinboard} alt="" /> }</span>
            <span className="">{saved ? "Saved" : "Save"}</span>
          </button>  
          <button
            className="flex gap-2 items-center"
            onClick={() => setShowShare(true)}
          >   
            <span className="text-xl"><IoShareSocialOutline /></span> 
            <span className="">Share</span>
          </button>   
          <button
            className={`flex gap-2 items-center ${reported ? "text-red-600" : ""}`}
            onClick={() => setShowReport(true)}
          >
            <span className="text-xl"><GoQuestion /></span>
            <span className="">{reported ? "Reported" : "Report"}</span> 
          </button>
        </div>
      </div>   

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72">
            <div className="font-bold mb-4 text-center">Share Post</div>
            <div className="flex flex-col gap-3">
              {shareLinks.map((link) => (
                <button
                  key={link.name}
                  className="w-full py-2 rounded bg-neutral-200 hover:bg-neutral-300 font-semibold"
                  onClick={() => handleShare(link)}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <button
              className="mt-4 w-full py-2 rounded bg-neutral-900 text-white"
              onClick={() => setShowShare(false)}
            >
              Close
            </button>
          </div>
        </div> 
      )}

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72">
            <div className="font-bold mb-4 text-center">Report Post</div>
            <div className="flex flex-col gap-2 mb-4">
              {reportReasons.map((reason) => (
                <label key={reason} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="report"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={() => setReportReason(reason)}
                  />
                  {reason}
                </label>
              ))}
            </div>
            <button
              className="w-full py-2 rounded bg-red-600 text-white font-semibold disabled:opacity-50"
              disabled={!reportReason}
              onClick={handleReport}
            >
              Submit Report
            </button>
            <button
              className="mt-2 w-full py-2 rounded bg-neutral-900 text-white"
              onClick={() => setShowReport(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostView;