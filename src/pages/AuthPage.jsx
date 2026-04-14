import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// @ts-ignore
import isecurify_logo from "../assets/isecurify_logo.png";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Separate states (important)
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [signupShowConfirmPassword, setSignupShowConfirmPassword] = useState(false);

  return (
    <div className="max-h-full flex flex-col bg-background-light font-body">

      <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">

        <div className="w-full max-w-lg z-10">

          {/* Brand */}
          <div className="text-center mb-10">
            <div className="mb-6 flex justify-center">
              <div className="bg-white p-4 rounded-xl shadow">
                <img 
                  src={isecurify_logo} 
                  alt="Company Logo"
                  className="rounded-xl h-12 w-auto object-contain"
                />
              </div>
            </div>

            <h1 className="text-4xl font-extrabold font-headline text-on-surface">
            Domain Security Scanner
            </h1>

            <p className="text-xs uppercase tracking-widest mt-2 text-on-surface-variant">
              Secure Identity Access
            </p>
          </div>

          {/* Card */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow border border-slate-200">

            {/* TITLE */}
            <h2 className="text-2xl font-bold mb-2 text-on-surface">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            <p className="text-on-surface-variant mb-6 text-sm">
              {isLogin
                ? "Authenticate to access your dashboard"
                : "Join the ecosystem of digital trust"}
            </p>

            {/* ================= LOGIN ================= */}
            {isLogin && (
              <form className="space-y-6">

                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full p-3 rounded-lg bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/40"
                />

                {/* Password with toggle */}
                <div className="relative">
                  <input
                    type={loginShowPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full p-3 pr-10 rounded-lg bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/40"
                  />

                  <button
                    type="button"
                    onClick={() => setLoginShowPassword(!loginShowPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {loginShowPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dim transition">
                  Sign In
                </button>
              </form>
            )}

            {/* ================= SIGNUP ================= */}
            {!isLogin && (
              <form className="space-y-6">

                {/* Full Name */}
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full mt-1 p-3 rounded-lg bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full mt-1 p-3 rounded-lg bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Passwords */}
                <div className="grid md:grid-cols-2 gap-4">

                  {/* Password */}
                  <div className="relative">
                    <input
                      type={signupShowPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full p-3 pr-10 rounded-lg bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/40"
                    />

                    <button
                      type="button"
                      onClick={() => setSignupShowPassword(!signupShowPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {signupShowPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <input
                      type={signupShowConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full p-3 pr-10 rounded-lg bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/40"
                    />

                    <button
                      type="button"
                      onClick={() => setSignupShowConfirmPassword(!signupShowConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {signupShowConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                </div>

                {/* Button */}
                <button className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dim transition">
                  Create Account
                </button>
              </form>
            )}

            {/* Toggle */}
            <div className="mt-6 text-center text-sm text-on-surface-variant">
              {isLogin ? "New user?" : "Already have an account?"}

              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary font-semibold"
              >
                {isLogin ? "Create Account" : "Login"}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-on-surface-variant">
            End-to-End Cryptographic Assurance
          </div>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;