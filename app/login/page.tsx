"use client"

import { useState } from "react"
import Link from "next/link"

const roles = [
  { value: "ministry", label: "Ministry" },
  { value: "pacc", label: "PACC" },
  { value: "state", label: "State" },
  { value: "sna", label: "SNA" },
  { value: "ia", label: "IA" },
  { value: "beneficiary", label: "Beneficiary" },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "ministry",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API call to /api/auth/login
    console.log("Login data:", formData)
    // After successful login, redirect to role-based dashboard
  }

  return (
    <div className="flex min-h-screen" style={{ width: "100%", background: "#FFFFFF" }}>
      {/* Left Panel - Orange Section */}
      <div
        className="relative hidden lg:flex lg:w-[588px] flex-col"
        style={{ background: "#EA9000", height: "100vh" }}
      >
        {/* Content Container */}
        <div
          className="flex flex-col gap-[58px] absolute"
          style={{ width: "493px", left: "32px", top: "46px" }}
        >
          {/* Logo */}
          <h1
            style={{
              fontFamily: "Onest, sans-serif",
              fontWeight: 900,
              fontSize: "48px",
              lineHeight: "61px",
              color: "#FFFFFF",
            }}
          >
            सहाय
          </h1>

          {/* Text Content */}
          <div className="flex flex-col gap-7">
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "48px",
                lineHeight: "62px",
                color: "#FFFFFF",
              }}
            >
              Access Government Welfare Schemes Effortlessly
            </h2>
            <p
              style={{
                fontFamily: "Libre Franklin, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "140%",
                letterSpacing: "0.01em",
                color: "#FFFFFF",
              }}
            >
              The AI co-pilot that sharpens your clinical insights.
            </p>
          </div>
        </div>

        {/* Bottom Image with सहाय text overlay */}
        <div
          className="absolute"
          style={{
            width: "588px",
            height: "380px",
            left: "0px",
            bottom: "0px",
            overflow: "hidden",
          }}
        >
          <img
            src="/sign-up-image.png"
            alt="Construction Illustration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom center",
            }}
          />
        </div>

        {/* Gradient Overlay - extends higher for smooth fade */}
        <div
          className="absolute"
          style={{
            width: "588px",
            height: "250px",
            left: "0px",
            bottom: "0px",
            background: "linear-gradient(180deg, rgba(234, 144, 0, 0) 0%, rgba(234, 144, 0, 0.6) 50%, #EA9000 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Right Panel - Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12">
        <div
          className="w-full flex flex-col gap-[30px]"
          style={{ maxWidth: "623px" }}
        >
          {/* Header */}
          <div className="flex flex-col gap-3.5">
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "28px",
                lineHeight: "34px",
                color: "#333333",
              }}
            >
              Welcome To सहाय
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "22px",
                letterSpacing: "-0.01em",
                color: "#565E6C",
              }}
            >
              Don't Have An Account?{" "}
              <Link href="/signup" style={{ color: "#EA9000", fontWeight: 500 }}>
                Signup
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#535567",
                }}
              >
                Your Email ID<span style={{ color: "#EA9000" }}>*</span>
              </label>
              <input
                type="email"
                placeholder="Ex: 1213@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  padding: "9px 12px",
                  background: "#FFFFFF",
                  border: "1px solid #E9E9F0",
                  borderRadius: "6px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#737373",
                }}
                required
              />
            </div>

            {/* Role Selector */}
            <div className="flex flex-col gap-2">
              <label
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#535567",
                }}
              >
                Select Your Role<span style={{ color: "#EA9000" }}>*</span>
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                style={{
                  padding: "9px 12px",
                  background: "#FFFFFF",
                  border: "1px solid #E9E9F0",
                  borderRadius: "6px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#737373",
                }}
                required
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#535567",
                }}
              >
                Add Password<span style={{ color: "#EA9000" }}>*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a Strong Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  minLength={8}
                  style={{
                    width: "100%",
                    padding: "9px 40px 9px 12px",
                    background: "#FFFFFF",
                    border: "1px solid #E9E9F0",
                    borderRadius: "6px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "15px",
                    color: "#737373",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ width: "18px", height: "18px" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 3.75C5.25 3.75 2.0475 6.0375 0.75 9.375C2.0475 12.7125 5.25 15 9 15C12.75 15 15.9525 12.7125 17.25 9.375C15.9525 6.0375 12.75 3.75 9 3.75ZM9 13.125C6.93 13.125 5.25 11.445 5.25 9.375C5.25 7.305 6.93 5.625 9 5.625C11.07 5.625 12.75 7.305 12.75 9.375C12.75 11.445 11.07 13.125 9 13.125ZM9 7.125C7.7575 7.125 6.75 8.1325 6.75 9.375C6.75 10.6175 7.7575 11.625 9 11.625C10.2425 11.625 11.25 10.6175 11.25 9.375C11.25 8.1325 10.2425 7.125 9 7.125Z"
                      fill="#8D90AA"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "12px 24px",
                gap: "6px",
                width: "100%",
                height: "50px",
                background: "#EA9000",
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "150%",
                textAlign: "center",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d68000"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#EA9000"
              }}
            >
              Login
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#565E6C",
                }}
              >
                Forgot password?{" "}
                <Link href="/forgot-password" style={{ color: "#EA9000", fontWeight: 500 }}>
                  click here
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div style={{ flex: 1, height: "1px", background: "#E9E9F0" }} />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#EA9000",
                }}
              >
                OR
              </span>
              <div style={{ flex: 1, height: "1px", background: "#E9E9F0" }} />
            </div>

            {/* Google SSO */}
            <button
              type="button"
              onClick={() => {
                // TODO: Implement Google SSO
                console.log("Google SSO clicked")
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "12px 24px",
                gap: "12px",
                width: "100%",
                height: "50px",
                background: "#FFFFFF",
                border: "1px solid #E9E9F0",
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                color: "#565E6C",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F9F9F9"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FFFFFF"
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Log In with Google
            </button>

            {/* Terms */}
            <p
              className="text-center"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#737373",
              }}
            >
              By signing in to your account you agree to our{" "}
              <Link href="/terms" style={{ color: "#EA9000", fontWeight: 500 }}>
                Terms & Conditions
              </Link>{" "}
              |{" "}
              <Link href="/privacy" style={{ color: "#EA9000", fontWeight: 500 }}>
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
