import React, { useState, FormEvent } from "react";
import {
  MdEmail,
  MdLock,
  MdRemoveRedEye,
  MdVisibilityOff,
} from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const LoginPage: React.FC = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-purple-700 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm p-6 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="inline-block p-3 bg-gray-200 rounded-xl">
            <span className="text-3xl font-bold text-purple-700">R</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Rootly</h1>
          <p className="text-gray-600 text-sm">
            Smart Learning Platform for Multi-Grade Classrooms
          </p>
        </div>

        <div className="flex justify-around p-1 bg-gray-200 rounded-full">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-full py-2 text-sm rounded-full ${
              isLogin ? "text-purple-700 bg-white shadow" : "text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-full py-2 text-sm rounded-full ${
              !isLogin ? "text-purple-700 bg-white shadow" : "text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleAuth}>
          <div>
            <label className="text-xs font-bold text-gray-600">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MdEmail className="text-gray-400" />
              </span>
              <input
                type="email"
                className="w-full py-2 pl-10 pr-3 text-sm border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MdLock className="text-gray-400" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full py-2 pl-10 pr-10 text-sm border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-gray-400" />
                ) : (
                  <MdRemoveRedEye className="text-gray-400" />
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-3 h-3 text-purple-600 border-gray-300 rounded"
              />
              <label className="ml-2 text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 font-bold text-white bg-purple-700 rounded-lg hover:bg-purple-800 text-sm"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <hr className="w-full border-gray-300" />
          <span className="text-gray-500 text-xs">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center justify-center"
        >
          <FcGoogle className="mr-2" />
          Sign in with Google
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2 text-xs">
        <button className="px-4 py-2 text-white bg-purple-600 rounded-full">
          Multi-Grade Support
        </button>
        <button className="px-4 py-2 text-white bg-purple-600 rounded-full">
          AI-Powered Planning
        </button>
        <button className="px-4 py-2 text-white bg-purple-600 rounded-full">
          Progress Tracking
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
