import { useEffect } from "react";

import {
  useCreateUserWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";   
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa"; 
import auth from "../firebase/config"; 


const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true }); 
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth); 
  const [signInWithFacebook, fbUser, fbLoading, fbError] = useSignInWithFacebook(auth);  

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };

  useEffect(() => {
    if (user || gUser || fbUser) {
      navigate(from, { replace: true });
    }
  }, [user, gUser, fbUser, from, navigate]);  

  if (loading || gLoading || fbLoading || updating) {
    // return <Loading />;  
    
    return <p>Loading...</p>
  }

  const signUpError =
    error || gError || fbError || fbError || updateError ? (
      <p className="text-red-600 text-center mb-4">
        {error?.message ||
          gError?.message ||
         fbError ?.message ||
          updateError?.message}
      </p> 
    ) : null;

  return ( 
    <div className="flex justify-center my-12 mb-60"> 
      <div className="bg-base-100 max-w-md w-full shadow-xl"> 
        <div className=" text-center p-8"> 
          <h2 className="text-3xl font-bold text-primary mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full mb-4">
              <label className="label text-start">
                <p className="label-text py-2 font-medium">Your Name</p>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full p-4 border border-gray-300 rounded"
                {...register("name", { required: "Name is Required" })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

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
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {signUpError}

            <input
              type="submit"
              value="Sign Up"
              className="bg-gray-900 text-[18px] font-semibold rounded py-2 text-white w-full"
            />
          </form>

          <p className="pt-4 text-sm">
            Already have an account?{" "}
            <Link className="text-secondary" to="/login">
              Please Login
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
  );
};

export default Signup;