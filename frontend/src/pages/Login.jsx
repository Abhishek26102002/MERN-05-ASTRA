import React, { useState, useEffect } from "react";
import { UserStore } from "../ApiStore/UserStore";
import { Eye, EyeClosed, Loader2, Mail, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const { isLogin, loginUser, googleAuth } = UserStore();


  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success) await loginUser(formData);
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        await googleAuth(authResult.code);
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (error) {
      console.log("Error while Google Login...", error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <>
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* left side */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* LOGO */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
            group-hover:bg-primary/20 transition-colors"
                >
                  <img src="/logo02.png" alt="" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                <p className="text-base-content/60">
                  Stay connected, start chatting, and let your echoes be heard..{" "}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="your@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockKeyhole className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full pl-10`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeClosed className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLogin}
              >
                {isLogin ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </form>
            <div className="flex flex-col items-center justify-center gap-3">
              <p>Or</p>

              <button onClick={handleGoogleLogin} className="btn btn-outline">
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="Google logo"
                />
                <span>Login with Google</span>
              </button>
            </div>

            <div className="text-center">
              <p className="text-base-content/60">
                New Here Signup for free.{" "}
                <Link to="/signup" className="link link-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* right side */}
      </div>
    </>
  );
};

export default LoginPage;
