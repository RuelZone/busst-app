"use client";

import { FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [emailOrPhone, setEmailOrPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    const loginValue =
      emailOrPhone.trim();

    const loginPassword =
      password;

    // Empty fields
    if (!loginValue || !loginPassword) {
      setError(
        "Please enter your Email/Phone Number and Password."
      );
      return;
    }

    // Get saved account
    const savedAccount =
      localStorage.getItem(
        "busst_registered_user"
      );

    if (!savedAccount) {
      setError(
        "No account found. Please SignUp first."
      );
      return;
    }

    try {
      const user = JSON.parse(
        savedAccount
      );

      const savedEmail =
        String(user.email || "")
          .trim()
          .toLowerCase();

      const savedPhone =
        String(user.phone || "")
          .replace(/\D/g, "");

      const enteredEmail =
        loginValue.toLowerCase();

      const enteredPhone =
        loginValue.replace(/\D/g, "");

      const emailMatches =
        enteredEmail === savedEmail;

      const phoneMatches =
        enteredPhone === savedPhone &&
        enteredPhone.length > 0;

      const passwordMatches =
        loginPassword ===
        String(user.password || "");

      console.log("BUSST LOGIN CHECK");
      console.log("Saved email:", savedEmail);
      console.log("Entered:", enteredEmail);
      console.log("Email matches:", emailMatches);
      console.log("Phone matches:", phoneMatches);
      console.log(
        "Password exists:",
        Boolean(user.password)
      );
      console.log(
        "Password matches:",
        passwordMatches
      );

      if (
        (emailMatches || phoneMatches) &&
        passwordMatches
      ) {

        // Login successful
        localStorage.setItem(
          "busst_logged_in",
          "true"
        );

        localStorage.setItem(
          "busst_user",
          JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone,
          })
        );

        if (rememberMe) {
          localStorage.setItem(
            "busst_remember",
            "true"
          );
        } else {
          localStorage.removeItem(
            "busst_remember"
          );
        }

        router.push("/home");

      } else {

        setError(
          "Invalid Email/Phone Number or Password."
        );

      }

    } catch (error) {

      console.error(
        "BUSST login error:",
        error
      );

      setError(
        "Account data is corrupted. Please SignUp again."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#4A4A4A] flex justify-center">

      <div
        className="
          relative
          w-full
          max-w-[430px]
          min-h-screen
          bg-[#D9D9D9]
          rounded-b-[65px]
          px-8
          pt-12
        "
      >

        {/* LOGO */}

        <div className="flex flex-col items-center">

          <img
            src="/busst-logo.svg"
            alt="BUSST"
            className="w-[250px] h-auto"
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


        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="mt-28"
        >

          {/* EMAIL / PHONE */}

          <div>

            <label
              htmlFor="emailOrPhone"
              className="
                block
                text-[20px]
                font-bold
                text-[#263238]
                mb-2
              "
            >
              Email/Phone Number
            </label>

            <div
              className="
                flex
                items-center
                h-[62px]
                bg-white
                rounded-lg
                px-3
              "
            >

              <div className="flex items-center justify-center w-10">

                <User
                  size={29}
                  strokeWidth={2.5}
                  className="text-[#222222]"
                />

              </div>

              <input
                id="emailOrPhone"
                type="text"
                value={emailOrPhone}
                onChange={(e) =>
                  setEmailOrPhone(
                    e.target.value
                  )
                }
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  px-3
                  text-lg
                  text-[#263238]
                "
                autoComplete="username"
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div className="mt-5">

            <label
              htmlFor="password"
              className="
                block
                text-[20px]
                font-bold
                text-[#263238]
                mb-2
              "
            >
              Password
            </label>

            <div
              className="
                flex
                items-center
                h-[62px]
                bg-white
                rounded-lg
                px-3
              "
            >

              <div className="flex items-center justify-center w-10">

                <Lock
                  size={30}
                  strokeWidth={2.5}
                  className="text-[#222222]"
                />

              </div>

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                  flex-1
                  h-full
                  bg-transparent
                  outline-none
                  px-3
                  text-lg
                  text-[#263238]
                "
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  p-2
                  text-[#263238]
                "
              >

                {showPassword ? (
                  <EyeOff size={29} />
                ) : (
                  <Eye size={29} />
                )}

              </button>

            </div>

          </div>


          {/* REMEMBER ME */}

          <div className="flex items-center mt-7">

            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(
                  e.target.checked
                )
              }
              className="
                w-5
                h-5
                accent-[#263238]
                cursor-pointer
              "
            />

            <label
              htmlFor="remember"
              className="
                ml-2
                text-[16px]
                text-[#263238]
                cursor-pointer
              "
            >
              Remember Me
            </label>

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


          {/* LOGIN BUTTON */}

          <div className="flex justify-center mt-5">

            <button
              type="submit"
              className="
                w-[235px]
                h-[62px]
                bg-[#263238]
                text-white
                rounded-full
                text-[27px]
                font-normal
                hover:bg-[#1c2529]
                active:scale-[0.98]
                transition-all
              "
            >
              LOGIN
            </button>

          </div>


          {/* FORGOT PASSWORD */}

          <div className="text-center mt-4">

            <Link
              href="/forgot-password"
              className="
                text-[17px]
                font-bold
                text-[#263238]
                hover:underline
              "
            >
              Forgot Password?
            </Link>

          </div>


          {/* SIGN UP */}

          <div className="text-center mt-1">

            <p className="text-[13px] text-[#263238]">
              dont have an account?
            </p>

            <Link
              href="/signup"
              className="
                text-[17px]
                font-bold
                text-[#263238]
                hover:underline
              "
            >
              SignUp
            </Link>

          </div>

        </form>

      </div>

    </main>
  );
}