// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReactQuill from 'react-quill-new';
// import 'react-quill/dist/quill.snow.css';

// const CreatePoster = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [contactInfo, setContactInfo] = useState('');
//   const [location, setLocation] = useState('Nakhalpara');
//   const [category, setCategory] = useState('To-Let');
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   // Simple toast
//   const showToast = (msg, color = "bg-green-600") => {
//     const toast = document.createElement("div");
//     toast.className = `fixed top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded text-white shadow-lg z-50 ${color}`;
//     toast.innerText = msg;
//     document.body.appendChild(toast);
//     setTimeout(() => toast.remove(), 2000);
//   };

//   const handlePublish = async () => {
//     // Validate fields
//     const newErrors = {};
//     if (!title.trim()) newErrors.title = "Title is required";
//     if (!description.trim() || description === '<p><br></p>') newErrors.description = "Description is required";
//     if (!contactInfo.trim()) newErrors.contactInfo = "Contact Info is required";
//     if (!location.trim()) newErrors.location = "Location is required";
//     if (!category.trim()) newErrors.category = "Category is required";  
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) return;

//     const data = { title, description, contactInfo, location, category };
//     try {
//       const response = await fetch('http://localhost:3000/api/posts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       const result = await response.json();
//       showToast("Poster published successfully!");
//       setTimeout(() => navigate("/"), 1200);
//       console.log('Post created:', result);
//     } catch (error) {
//       showToast("Failed to publish poster!", "bg-red-600");
//       console.error('Error creating post:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-2">
//       <div className="w-full max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
//         <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">Create Poster</h1>

//         {/* Action Buttons */} 
//         <div className="flex justify-end mb-4 gap-2">
//           <button className="px-4 py-1 bg-gray-200 rounded-md text-gray-700 font-semibold">Save Draft</button> 
//           <button
//             className="px-4 py-1 bg-black text-white rounded-md font-semibold" 
//             onClick={handlePublish}
//           >
//             Publish
//           </button>   
//         </div>     

//         {/* Title */}  
//         <input
//           id="title"
//           type="text"
//           placeholder="Title *"
//           className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 mb-4 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold placeholder:text-gray-500`}
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />  
//         {errors.title && <div className="text-red-500 text-xs mb-2">{errors.title}</div>}

//         {/* Description */}
//         <div className={`h-42  ${errors.description ? 'border border-red-500 rounded' : ''}`}>
//           <ReactQuill
//             id="description"
//             theme="snow"
//             value={description}
//             onChange={setDescription}
//             placeholder="Description *"
//             className="bg-white h-30 rounded placeholder:font-semibold placeholder:text-gray-500" // Increased height
//           /> 
//         </div>     
//         {errors.description && <div className="text-red-500 text-xs mb-2">{errors.description}</div>}

//         {/* Contact Info */}
//         <textarea
//           id="contactInfo"
//           placeholder="Contact Info Phone+Address *"
//           className={`w-full border ${errors.contactInfo ? 'border-red-500' : 'border-gray-300'} px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold placeholder:text-gray-500`}
//           value={contactInfo}
//           onChange={(e) => setContactInfo(e.target.value)}
//           rows={2}
//         />
//         {errors.contactInfo && <div className="text-red-500 text-xs mb-2">{errors.contactInfo}</div>}

//         {/* Dropdowns */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <select
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className={`w-full border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             >
//               <option value="">Select Location *</option>
//               <option>Nakhalpara</option>
//               <option>Dhanmondi</option>
//               <option>Banani</option>
//             </select>
//             {errors.location && <div className="text-red-500 text-xs">{errors.location}</div>}
//           </div>
//           <div>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className={`w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             >
//               <option value="">Select Category *</option>
//               <option>To-Let</option>
//               <option>Sell</option>
//               <option>Event</option>
//             </select>
//             {errors.category && <div className="text-red-500 text-xs">{errors.category}</div>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePoster;
 

 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const CreatePoster = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [location, setLocation] = useState('Nakhalpara');
  const [category, setCategory] = useState('To-Let');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // TipTap Editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate({ editor }) {
      setDescription(editor.getHTML());
    },
  });

  const showToast = (msg, color = "bg-green-600") => {
    const toast = document.createElement("div");
    toast.className = `fixed top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded text-white shadow-lg z-50 ${color}`;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handlePublish = async () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim() || description === '<p></p>') newErrors.description = "Description is required";
    if (!contactInfo.trim()) newErrors.contactInfo = "Contact Info is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!category.trim()) newErrors.category = "Category is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const data = { title, description, contactInfo, location, category };
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      showToast("Poster published successfully!");
      setTimeout(() => navigate("/"), 1200);
      console.log('Post created:', result);
    } catch (error) {
      showToast("Failed to publish poster!", "bg-red-600");
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">Create Poster</h1>

        {/* Action Buttons */}
        <div className="flex justify-end mb-4 gap-2">
          <button className="px-4 py-1 bg-gray-200 rounded-md text-gray-700 font-semibold">Save Draft</button>
          <button
            className="px-4 py-1 bg-black text-white rounded-md font-semibold"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>

        {/* Title */}
        <input
          id="title"
          type="text"
          placeholder="Title *"
          className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 mb-4 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold placeholder:text-gray-500`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <div className="text-red-500 text-xs mb-2">{errors.title}</div>}

        {/* Description */}
        <div className={`mb-4 ${errors.description ? 'border border-red-500 rounded' : ''}`}>
          <EditorContent editor={editor} className="min-h-[150px] border border-gray-300 rounded-md p-2 bg-white" />
        </div>
        {errors.description && <div className="text-red-500 text-xs mb-2">{errors.description}</div>}

        {/* Contact Info */}
        <textarea
          id="contactInfo"
          placeholder="Contact Info Phone+Address *"
          className={`w-full border ${errors.contactInfo ? 'border-red-500' : 'border-gray-300'} px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold placeholder:text-gray-500`}
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          rows={2}
        />
        {errors.contactInfo && <div className="text-red-500 text-xs mb-2">{errors.contactInfo}</div>}

        {/* Dropdowns */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Location *</option>
              <option>Nakhalpara</option>
              <option>Dhanmondi</option>
              <option>Banani</option>
            </select>
            {errors.location && <div className="text-red-500 text-xs">{errors.location}</div>}
          </div>
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Category *</option>
              <option>To-Let</option>
              <option>Sell</option>
              <option>Event</option>
            </select>
            {errors.category && <div className="text-red-500 text-xs">{errors.category}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoster; 
