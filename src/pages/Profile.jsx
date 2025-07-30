import { signOut } from 'firebase/auth';
import React from 'react';
import {
  FaCog,
  FaSignOutAlt,
  FaLock,
  FaRegUser,
  FaClipboardList,
  FaQuestionCircle,
  FaHome,
  FaStar,
  FaPlus,
  FaSlidersH,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase/config';

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: 'Tanvir Hasan',
    phone: '01798121012',
    avatar: '', // you can add a URL here
  };

  const handleLogout = () => {
     signOut(auth);
        localStorage.removeItem('accessToken');          
  };

  const handleClose = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className=" h-screen bg-white shadow-lg lg:mx-80 mx-20 flex flex-col justify-between">
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button onClick={handleClose}>
            <span className="text-xl">✕</span>
          </button>
        </div>  

        {/* Profile */}
        <div className="flex flex-col items-center mb-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full mb-2 object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 mb-2" />
          )}
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.phone}</p>
        </div>

        <button
          onClick={() => navigate('/edit-profile')}
          className="w-full bg-black text-white py-2 rounded mt-3"
        >
          Edit Profile
        </button>

        {/* Menu */}
        <div className="mt-6 space-y-4 text-sm">
          <div className="space-y-3">
            <MenuItem icon={<FaCog />} text="Settings" onClick={() => navigate('/settings')} />
            <MenuItem icon={<FaRegUser />} text="Dashboard" onClick={() => navigate('/dashboard')} />
            <MenuItem icon={<FaClipboardList />} text="Draft" onClick={() => navigate('/drafts')} />
            <MenuItem icon={<FaLock />} text="Change Password" onClick={() => navigate('/change-password')} />
          </div>

          <hr className="border-gray-300" />

          <div className="space-y-3">
            <MenuItem icon={<FaQuestionCircle />} text="Help & Support" onClick={() => navigate('/support')} />
            <MenuItem icon={<FaSignOutAlt />} text="Log out" onClick={handleLogout} />
          </div>
        </div>
      </div>     
    </div>   
  );
};

const MenuItem = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between hover:opacity-80 cursor-pointer"
  >
    <div className="flex items-center gap-3 text-black">
      <span className="text-base">{icon}</span>
      <span>{text}</span>
    </div>
    <span className="text-gray-400">{'>'}</span>
  </div>
);

export default Profile;
