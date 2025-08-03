// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import PhoneAuth from '../components/PhoneAuth';
// import auth from '../firebase/config';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('/profile');
//     } catch (err) {
//       setError('Login failed: ' + err.message);
//     }
//   };

//   return (
//    <PhoneAuth/>
//   );
// };

// export default Login;

import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import UseToken from '../../Hooks/UseToken';
import auth from "../firebase/config";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithFacebook, fbUser, fbLoading, fbError] =
    useSignInWithFacebook(auth);
  // const [token] = UseToken(user || gUser)
  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password); 
  };
      useEffect(() => {
        if (user || gUser || fbUser) {
          navigate(from, { replace: true });
        }
      }, [user, gUser, fbUser, from, navigate]);  
    
      if (loading || gLoading || fbLoading ) {
        // return <Loading />;  
        
        return <p>Loading...</p>
      }

  return (
    <div className="flex justify-center my-5"> 
      <div className="bg-base-100 max-w-md w-full shadow-xl"> 
        <div className="card-body items-center text-center p-8">
          <div className="w-full justify-center">
            <div>
              <h2 className="text-3xl text-primary">Login</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div className="form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text">Your Email</span>
    </label>
    <input 
    type="email"
     placeholder="Your Email"
      className="input input-bordered w-full max-w-xs"
      {...register("email", { 
          required: {
              value: true,
              message: 'Email is Required'
          },
          pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Provide a Valid Email'
        }
       })} 
       />
    <label className="label">
    {errors.email?.type === 'required' &&  <span className="label-text-alt text-red-500">{errors.email.message}</span>}
    {errors.email?.type === 'pattern' &&  <span className="label-text-alt text-red-500">{errors.email.message}</span>}
    </label>
  </div>
    <div className="form-control w-full max-w-xs">
    <label className="label">
    <span className="label-text">Your Password</span>
    </label>
    <input 
    type="password" 
    placeholder="password" 
    className="input input-bordered w-full max-w-xs" 
    {...register("password", { 
        required: {
            value: true,
            message: 'Password is Required'
        },
        minLength: {
        value: 6,
        message: 'Must be 6 characters'
      } })} 
    />
    <label className="label">
    {errors.password?.type === 'required' &&  <span className="label-text-alt text-red-500">{errors.password.message}</span>}
    {errors.password?.type === 'minLength' &&  <span className="label-text-alt text-red-500">{errors.password.message}</span>}
     
    </label>
  </div>
          <input type="submit" value="login" className="btn btn-primary max-w-xs text-white w-full" /> */}

                <div className="form-control w-full mb-4">
                  <label className="label text-start">
                    <p className="label-text py-2 font-medium">Your Email</p>
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full p-4 border border-gray-300 rounded"
                    {...register("email", {
                      required: "Email is Required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Provide a Valid Email",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="form-control w-full mb-6">
                  <label className="label text-start">
                    <p className="label-text py-2 text-start font-medium">
                      Your Password
                    </p>
                  </label>
                  <input
                    type="password"
                    placeholder="Your Password"
                    className="input input-bordered w-full p-4 border border-gray-300 rounded"
                    {...register("password", {
                      required: "Password is Required",
                      minLength: { value: 6, message: "Must be 6 characters" },
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1 text-start">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <input
                  type="submit" 
                   value="Login"
                  className="bg-gray-900 text-[18px] font-semibold rounded py-2 text-white w-full"
                />
              </form>  
            </div>
            <p className="pt-2 text-sm">
              New To Here{" "}
              <Link className="text-secondary " to="/signup">
                Please Sign Up
              </Link>
            </p>

            <div className="divider my-4">OR</div>
            <button
              className="btn btn-outline btn-primary w-full flex justify-center items-center mb-2"
              onClick={() => signInWithGoogle()}
            >
              <FaGoogle className="mr-2" /> Continue with Google
            </button>
            <button
              className="btn btn-outline btn-primary w-full flex justify-center items-center"
              onClick={() => signInWithFacebook()}
            >
              <FaFacebook className="mr-2" /> Continue with Facebook
            </button>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Login;
