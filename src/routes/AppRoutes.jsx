import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PostEditor from '../pages/PostEditor';
import Login from '../pages/Login';  
import Signup from '../pages/Signup';
import Profile from '../pages/Profile'; 
import PostView from '../pages/PostView';
import PinBoard from '../pages/PinBoard';  
import LocationFilterSidebar from '../pages/Location'; 
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>  
      <Route path="/" element={<Home />} />
      <Route path="/pin-board" element={<PinBoard />} /> 
      <Route path="/post-editor" 
        element={
        <ProtectedRoute>  
          <PostEditor />
         </ProtectedRoute>  
      }
        />
       <Route path="/post/:id" element={<PostView />} /> 
      <Route path="/filter" element={<LocationFilterSidebar />} />  
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/profile" 
        element={
        <ProtectedRoute>
          <Profile /> 
        </ProtectedRoute>
      }
        />
    </Routes>        
  );
}

export default AppRoutes; 
