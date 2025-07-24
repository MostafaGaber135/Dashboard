"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../utils/firebase";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        localStorage.setItem("userName", user.displayName || user.email || "Admin");
        toast.success("Logged in successfully!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (err) {
      toast.error("Email or password is incorrect");
    }
  };
  

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="light" />

      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="text-center">
            <div className="flex items-center justify-center bg-blue-500 w-16 h-16 rounded-full mx-auto mb-4">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h5 className="text-xl font-medium text-gray-900">Welcome Back</h5>
            <p className="text-sm text-gray-500">Sign in to your dashboard account</p>
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 "
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}