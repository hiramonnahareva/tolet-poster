import React from 'react' 

export default function Card({ post, className }) {
  return (
     <div className={`bg-white lg:h-[300px] md:h-[100%] p-4 shadow-md text-center mb-4 ${className}`}>
            <div className="bg-white lg:h-[270px] md:h-[100%] border-[1.73px] p-4 shadow text-center">                   
              <div className="font-bold text-2xl mt-4 underline mb-2">
                {post.title}
              </div>  
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {/* Strip HTML tags if needed */}
                {post.description ? stripHtml(post.description) : ""}
              </div>   
              <div>  
                <h2 className="underline font-semibold mb-2 mt-4">যোগাযোগঃ</h2>
                <p className="text-sm">{post.contactInfo}</p>
              </div>  
              </div>            
            </div>           
  )
  
} 

// Helper to strip HTML tags
function stripHtml(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}



