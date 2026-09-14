"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

type Step =
  | "email"
  | "verification"
  | "password"
  | "success";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] =
    useState<Step>("email");

  const [email, setEmail] =
    useState("");

  const [code, setCode] =
    useState("");

  const [generatedCode, setGeneratedCode] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // SEND VERIFICATION
  // ==========================================

  const sendVerification = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    const enteredEmail =
      email.trim().toLowerCase();

    if (!enteredEmail) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    const savedUser =
      localStorage.getItem(
        "busst_registered_user"
      );

    if (!savedUser) {
      setError(
        "No account found. Please SignUp first."
      );
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      if (
        String(user.email || "")
          .toLowerCase() !== enteredEmail
      ) {
        setError(
          "No account is registered with this email."
        );
        return;
      }

      // Generate 6 digit verification code
      const newCode =
        Math.floor(
          100000 +
          Math.random() * 900000
        ).toString();

      setGeneratedCode(newCode);

      localStorage.setItem(
        "busst_reset_code",
        newCode
      );

      localStorage.setItem(
        "busst_reset_email",
        enteredEmail
      );

      setStep("verification");

    } catch {
      setError(
        "Unable to process your account."
      );
    }
  };


  // ==========================================
  // VERIFY CODE
  // ==========================================

  const verifyCode = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    const savedCode =
      localStorage.getItem(
        "busst_reset_code"
      );

    if (
      !savedCode ||
      code.trim() !== savedCode
    ) {
      setError(
        "Incorrect verification code."
      );
      return;
    }

    setStep("password");
  };


  // ==========================================
  // RESET PASSWORD
  // ==========================================

  const resetPassword = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    const savedUser =
      localStorage.getItem(
        "busst_registered_user"
      );

    if (!savedUser) {
      setError(
        "Account could not be found."
      );
      return;
    }

    try {
      const user =
        JSON.parse(savedUser);

      user.password = password;

      localStorage.setItem(
        "busst_registered_user",
        JSON.stringify(user)
      );

      localStorage.removeItem(
        "busst_reset_code"
      );

      localStorage.removeItem(
        "busst_reset_email"
      );

      setStep("success");

    } catch {
      setError(
        "Unable to update password."
      );
    }
  };


  return (
    <main className="
      min-h-screen
      bg-[#4A4A4A]
      flex
      justify-center
    ">

      <div className="
        w-full
        max-w-[430px]
        min-h-screen
        bg-[#D9D9D9]
        rounded-b-[65px]
        px-8
        pt-10
      ">


        {/* BACK */}

        <button
          onClick={() =>
            router.push("/login")
          }
          className="
            text-[#263238]
            mb-5
          "
        >
          <ArrowLeft size={25} />
        </button>


        {/* LOGO */}

        <div className="
          flex
          flex-col
          items-center
        ">

          <img
            src="/busst-logo.svg"
            alt="BUSST"
            className="w-[210px]"
          />

          <p className="
            text-[14px]
            font-semibold
            text-[#263238]
            mt-1
          ">
            Track your Bus.Stay Informed.Stay Safe
          </p>

        </div>


        {/* ======================================
            STEP 1
        ====================================== */}

        {step === "email" && (

          <form
            onSubmit={sendVerification}
            className="mt-14"
          >

            <h1 className="
              text-2xl
              font-bold
              text-[#263238]
            ">
              Forgot Password?
            </h1>

            <p className="
              text-sm
              text-[#263238]
              mt-2
            ">
              Enter your registered email address
              and we will send you a verification
              code.
            </p>


            <label className="
              block
              text-lg
              font-bold
              text-[#263238]
              mt-7
              mb-2
            ">
              Email
            </label>


            <div className="
              flex
              items-center
              h-[58px]
              bg-white
              rounded-lg
              px-3
            ">

              <Mail
                size={25}
                className="text-[#263238]"
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="
                  flex-1
                  h-full
                  outline-none
                  bg-transparent
                  px-3
                  text-[#263238]
                "
              />

            </div>


            {error && (
              <div className="
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
              ">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="
                w-full
                h-[55px]
                bg-[#263238]
                text-white
                rounded-full
                mt-6
                font-semibold
                text-lg
                hover:bg-[#1B2327]
              "
            >
              SEND VERIFICATION CODE
            </button>

          </form>

        )}


        {/* ======================================
            STEP 2
        ====================================== */}

        {step === "verification" && (

          <form
            onSubmit={verifyCode}
            className="mt-14"
          >

            <h1 className="
              text-2xl
              font-bold
              text-[#263238]
            ">
              Verify Your Email
            </h1>

            <p className="
              text-sm
              text-[#263238]
              mt-2
            ">
              A verification code has been sent
              to:
            </p>

            <p className="
              font-bold
              text-[#263238]
              mt-1
            ">
              {email}
            </p>


            {/* DEMO CODE */}

            <div className="
              mt-5
              bg-blue-50
              border
              border-blue-200
              rounded-xl
              p-4
              text-center
            ">

              <p className="
                text-xs
                text-[#263238]
              ">
                LOCALHOST DEMO
              </p>

              <p className="
                text-3xl
                font-bold
                tracking-[8px]
                text-[#1D6FDC]
                mt-1
              ">
                {generatedCode}
              </p>

              <p className="
                text-xs
                text-[#263238]
                mt-1
              ">
                This represents the code sent
                to your email.
              </p>

            </div>


            <label className="
              block
              text-lg
              font-bold
              text-[#263238]
              mt-6
              mb-2
            ">
              Verification Code
            </label>


            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) =>
                setCode(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="Enter 6-digit code"
              className="
                w-full
                h-[58px]
                bg-white
                rounded-lg
                px-4
                outline-none
                text-center
                text-xl
                tracking-[6px]
                text-[#263238]
              "
            />


            {error && (
              <div className="
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
              ">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="
                w-full
                h-[55px]
                bg-[#263238]
                text-white
                rounded-full
                mt-6
                font-semibold
                text-lg
              "
            >
              VERIFY CODE
            </button>


            <button
              type="button"
              onClick={() =>
                setStep("email")
              }
              className="
                w-full
                mt-4
                text-[#263238]
                font-semibold
                text-sm
              "
            >
              Change Email
            </button>

          </form>

        )}


        {/* ======================================
            STEP 3
        ====================================== */}

        {step === "password" && (

          <form
            onSubmit={resetPassword}
            className="mt-14"
          >

            <h1 className="
              text-2xl
              font-bold
              text-[#263238]
            ">
              Create New Password
            </h1>

            <p className="
              text-sm
              text-[#263238]
              mt-2
            ">
              Your email has been verified.
              Create a new password below.
            </p>


            {/* PASSWORD */}

            <label className="
              block
              text-lg
              font-bold
              text-[#263238]
              mt-7
              mb-2
            ">
              New Password
            </label>


            <div className="
              flex
              items-center
              h-[58px]
              bg-white
              rounded-lg
              px-3
            ">

              <Lock
                size={25}
                className="text-[#263238]"
              />

              <input
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
                  outline-none
                  bg-transparent
                  px-3
                  text-[#263238]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={23} />
                ) : (
                  <Eye size={23} />
                )}
              </button>

            </div>


            {/* CONFIRM */}

            <label className="
              block
              text-lg
              font-bold
              text-[#263238]
              mt-5
              mb-2
            ">
              Confirm Password
            </label>


            <div className="
              flex
              items-center
              h-[58px]
              bg-white
              rounded-lg
              px-3
            ">

              <Lock
                size={25}
                className="text-[#263238]"
              />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="
                  flex-1
                  h-full
                  outline-none
                  bg-transparent
                  px-3
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
              >
                {showConfirmPassword ? (
                  <EyeOff size={23} />
                ) : (
                  <Eye size={23} />
                )}
              </button>

            </div>


            {error && (
              <div className="
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
              ">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="
                w-full
                h-[55px]
                bg-[#263238]
                text-white
                rounded-full
                mt-6
                font-semibold
                text-lg
              "
            >
              RESET PASSWORD
            </button>

          </form>

        )}


        {/* ======================================
            SUCCESS
        ====================================== */}

        {step === "success" && (

          <div className="
            mt-20
            text-center
          ">

            <div className="
              flex
              justify-center
            ">

              <CheckCircle
                size={70}
                className="text-green-600"
              />

            </div>


            <h1 className="
              text-2xl
              font-bold
              text-[#263238]
              mt-5
            ">
              Password Reset Successful
            </h1>


            <p className="
              text-[#263238]
              text-sm
              mt-2
            ">
              Your password has been updated.
              You can now login with your new
              password.
            </p>


            <button
              onClick={() =>
                router.push("/login")
              }
              className="
                w-full
                h-[55px]
                bg-[#263238]
                text-white
                rounded-full
                mt-7
                font-semibold
                text-lg
              "
            >
              GO TO LOGIN
            </button>

          </div>

        )}

      </div>

    </main>
  );
}