"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-between">

      {/* Top section */}
      <div className="w-full max-w-md bg-[#d9d9d9] rounded-b-[70px] px-8 pt-16 pb-10 text-center">

        {/* Temporary logo */}
        <div className="flex justify-center mb-5">
          <img
            src="/busst-logo.svg"
            alt="BUSST"
            className="w-72 mx-auto"
          />
        </div>

        <h1 className="text-6xl font-extrabold tracking-wide text-[#263238]">
          BUSST
        </h1>

        <p className="mt-8 text-lg text-black">
          BUS UTILITY FOR STUDENT SAFETY AND TRACKING
        </p>

        <div className="mt-8 bg-[#4a4a4a] -mx-8 py-3 text-white">
          v1.0.0.0
        </div>

      </div>

      {/* Loading section */}
      <div className="flex flex-col items-center justify-center pb-20">

        <div className="w-28 h-28 rounded-full border-[16px] border-[#d9d9d9] border-r-[#263238] animate-spin" />

        <p className="mt-5 text-xl text-black">
          LOADING
        </p>

      </div>

    </main>
  );
}