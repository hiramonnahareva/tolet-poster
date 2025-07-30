import { FaHome, FaPlus, FaRegUser, FaSlidersH } from 'react-icons/fa';
import pinned from '../assets/pinboard.png'; // Assuming you have a pinboard icon
import { NavLink } from 'react-router-dom';        



// Import your icons here 

       
       
        

const navItems = [
  { to: '/', label: 'Home', icon:  <FaHome className='text-2xl' /> },
  { to: '/pin-board', label: 'Pin Board', icon: <img width={'20px'} src={pinned} alt="" /> },
  { to: '/post-editor', label: 'Create', icon:  <FaPlus className="text-2xl bg-black text-white rounded-full p-1" /> },
  { to: '/filter', label: 'Filter', icon:  <FaSlidersH /> },
  { to: '/profile', label: 'Profile', icon: <FaRegUser />   },   
];

export default function BottomNav() {
  return (
    <nav className="fixed lg:left-60 lg:bottom-10 lg:right-60 lg:rounded bottom-0 left-0 bg-white right-0 shadow flex justify-around p-6"> 
      {navItems.map(item => (
        <NavLink
          key={item.to} 
          to={item.to}
          className="nav-item  lg:flex flex-col items-center justify-center" 
          activeclassname="active"
        >   
          <span className="icon">{item.icon}</span> 
          <span className="label lg:flex hidden items-center justify-center">{item.label}</span>  
        </NavLink>  
      ))}
    </nav>              
  );
}