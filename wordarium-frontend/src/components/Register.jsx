import React, { useContext, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import instance from "../utils/userAxios";
import { AuthContext } from "../context/authContext";
import NavBar from "./NavBar";

const defaultProfileImage = "./boy.png";

const Register = () => {
  const { authFunc } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const imageRef = useRef(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setProfileImage(defaultProfileImage);
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    imageRef.current.value = "";
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef?.current?.value;
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (!name || !email || !password) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("userName", name);
    formData.append("email", email);
    formData.append("password", password);
    if (imageRef.current.files[0]) {
      formData.append("profileImage", imageRef.current.files[0]);
    }

    setLoading(true);
    try {
      const response = await instance.post("user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("User Registered Successfully!");
        resetForm();
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to Register. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while registering."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    const loginData = { email, password };

    setLoading(true);
    try {
      const response = await instance.post("user/login", loginData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Login Successful!");
        const userData = {
          userName: response.data.user.userName,
          profileImage: response.data.user.profileImage,
          token: response.data.token,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        authFunc(userData);
        emailRef.current.value = "";
        passwordRef.current.value = "";
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to Login. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response?.data?.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[150vh] bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1635135473157-9c5f7af2f27f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="fixed top-0 w-full">
        <NavBar isTransparent={true} />
      </div>

      <div className="w-11/12 max-w-6xl bg-gray-800 bg-opacity-90 rounded-lg shadow-lg p-6 md:p-10 mt-36">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-full md:w-1/2 p-6 text-white">
            {login ? (
              <>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  New here?
                </h2>
                <p className="text-sm md:text-base mb-6">
                  Create an account to get started and explore amazing features!
                </p>
                <button
                  className="w-full md:w-auto border border-gray-400 text-white px-4 py-2 rounded hover:bg-gray-400 hover:text-gray-800 transition"
                  onClick={() => setLogin(false)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Already have an account?
                </h2>
                <p className="text-sm md:text-base mb-6">
                  Login to access your account and continue your journey with
                  us!
                </p>
                <button
                  className="w-full md:w-auto border border-gray-400 text-white px-4 py-2 rounded hover:bg-gray-400 hover:text-gray-800 transition"
                  onClick={() => setLogin(true)}
                >
                  Login
                </button>
              </>
            )}
          </div>

          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl md:text-2xl font-bold text-orange-600 mb-6">
              {login ? "Login" : "Sign Up"}
            </h2>
            <form
              onSubmit={login ? handleLogin : handleFormSubmit}
              className="space-y-4"
            >
              {!login && (
                <div className="text-center">
                  <label className="block">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-4 border-gray-300"
                      />
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        ref={imageRef}
                        onChange={handleImageChange}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => imageRef.current?.click()}
                      className="text-sm md:text-base text-[#2b2a45]"
                    >
                      Upload Profile Picture
                    </button>
                  </label>
                </div>
              )}

              {!login && (
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-[#2b2a45]" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-10 py-2 border border-[#2b2a45] rounded-md"
                    ref={nameRef}
                  />
                </div>
              )}
              <div className="relative">
                <MdEmail className="absolute left-3 top-3 text-[#2b2a45]" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 py-2 border border-[#2b2a45] rounded-md"
                  ref={emailRef}
                  required
                />
              </div>
              <div className="relative">
                <RiLockPasswordFill className="absolute left-3 top-3 text-[#2b2a45]" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 py-2 border border-[#2b2a45] rounded-md"
                  ref={passwordRef}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                {login && (
                  <button
                    type="button"
                    className="text-sm md:text-base text-[#2b2a45] underline"
                  >
                    Forgot password?
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
                  disabled={loading}
                >
                  {loading ? "Processing..." : login ? "Login" : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
