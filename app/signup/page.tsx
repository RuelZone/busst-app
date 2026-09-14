"use client";

import { FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/\D/g, "");

    // Validate fields
    if (
      !cleanName ||
      !cleanEmail ||
      !cleanPhone ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Validate email
    if (!cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate phone
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validate password
    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Create account
    const user = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: password,
    };

    // Save account
    localStorage.setItem(
      "busst_registered_user",
      JSON.stringify(user)
    );

    // Clear previous login
    localStorage.removeItem("busst_logged_in");
    localStorage.removeItem("busst_user");

    // Go to login
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#4A4A4A] flex justify-center">

      <div
        className="
          w-full
          max-w-[430px]
          min-h-screen
          bg-[#D9D9D9]
          rounded-b-[65px]
          px-8
          pt-8
          pb-10
        "
      >

        {/* LOGO */}
        <div className="flex flex-col items-center">

          <img
            src="/busst-logo.svg"
            alt="BUSST"
            className="w-[220px] h-auto"
          />

          <p
            className="
              mt-1
              text-[14px]
              font-semibold
              text-[#263238]
              text-center
            "
          >
            Track your Bus.Stay Informed.Stay Safe
          </p>

        </div>


        {/* TITLE */}
        <h1
          className="
            text-center
            text-[27px]
            font-bold
            text-[#263238]
            mt-8
          "
        >
          Create Account
        </h1>


        <form
          onSubmit={handleSignup}
          className="mt-6"
        >

          {/* FULL NAME */}
          <div>

            <label
              htmlFor="name"
              className="
                block
                text-[16px]
                font-bold
                text-[#263238]
                mb-2
              "
            >
              Full Name
            </label>

            <div className="flex items-center h-[55px] bg-white rounded-lg px-3">

              <User
                size={24}
                className="text-[#263238]"
              />

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your full name"
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  px-3
                  text-base
                  text-[#263238]
                "
              />

            </div>

          </div>


          {/* EMAIL */}
          <div className="mt-4">

            <label
              htmlFor="email"
              className="
                block
                text-[16px]
                font-bold
                text-[#263238]
                mb-2
              "
            >
              Email
            </label>

            <div className="flex items-center h-[55px] bg-white rounded-lg px-3">

              <Mail
                size={24}
                className="text-[#263238]"
              />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  px-3
                  text-base
                  text-[#263238]
                "
              />

            </div>

          </div>


          {/* PHONE */}
          <div className="mt-4">

            <label
              htmlFor="phone"
              className="
                block
                text-[16px]
                font-bold
                text-[#263238]
                mb-2
              "
            >
              Phone Number
            </label>

            <div className="flex items-center h-[55px] bg-white rounded-lg px-3">

              <Phone
                size={24}
                className="text-[#263238]"
              />

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Enter your phone number"
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  px-3
                  text-base
                  text-[#263238]
                "
              />

            </div>

          </div>


          {/* PASSWORD */}
          <div className="mt-4">

            <label
              htmlFor="password"
              className="
                block
                text-[16px]
                font-bold
                text-[#263238]
                mb-2
              "
            >
              Password
            </label>

            <div className="flex items-center h-[55px] bg-white rounded-lg px-3">

              <Lock
                size={24}
                className="text-[#263238]"
              />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create a password"
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  px-3
                  text-base
                  text-[#263238]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="p-2"
              >
                {showPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>

            </div>

          </div>


          {/* CONFIRM PASSWORD */}
          <div className="mt-4">

            <label
              htmlFor="confirmPassword"
              className="
                block
                text-[16px]
                font-bold
                text-[#263238]
                mb-2
              "
            >
              Confirm Password
            </label>

            <div className="flex items-center h-[55px] bg-white rounded-lg px-3">

              <Lock
                size={24}
                className="text-[#263238]"
              />

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm your password"
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  px-3
                  text-base
                  text-[#263238]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="p-2"
              >
                {showConfirmPassword ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>

            </div>

          </div>


          {/* ERROR */}
          {error && (
            <div
              className="
                mt-4
                bg-red-100
                border
                border-red-300
                text-red-700
                rounded-lg
                px-3
                py-2
                text-sm
                text-center
              "
            >
              {error}
            </div>
          )}


          {/* SIGN UP */}
          <div className="flex justify-center mt-6">

            <button
              type="submit"
              className="
                w-[210px]
                h-[55px]
                bg-[#263238]
                text-white
                rounded-full
                text-[22px]
                hover:bg-[#1c2529]
                active:scale-[0.98]
                transition-all
              "
            >
              SIGN UP
            </button>

          </div>


          {/* LOGIN */}
          <div className="text-center mt-5">

            <p className="text-[14px] text-[#263238]">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="
                text-[17px]
                font-bold
                text-[#263238]
                hover:underline
              "
            >
              Login
            </Link>

          </div>

        </form>

      </div>

    </main>
  );
}