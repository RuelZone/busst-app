"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bus,
  MapPin,
  Bell,
  User,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] =
    useState("Parent");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  useEffect(() => {
    const loggedIn =
      localStorage.getItem(
        "busst_logged_in"
      );

    if (loggedIn !== "true") {
      router.push("/login");
      return;
    }

    const saved =
      localStorage.getItem(
        "busst_registered_user"
      );

    if (saved) {
      try {
        const user = JSON.parse(saved);

        setName(user.name || "Parent");
        setEmail(user.email || "");
        setPhone(user.phone || "");
      } catch {}
    }
  }, [router]);


  const logout = () => {
    localStorage.removeItem(
      "busst_logged_in"
    );

    localStorage.removeItem(
      "busst_user"
    );

    router.push("/login");
  };


  return (
    <main className="min-h-screen bg-[#ECECEC] flex justify-center">

      <div className="w-full max-w-[430px] min-h-screen bg-white">

        {/* HEADER */}

        <div className="
          bg-[#263238]
          text-white
          px-5
          py-5
          rounded-b-[30px]
        ">

          <button
            onClick={() =>
              router.push("/home")
            }
            className="mb-4"
          >
            <ArrowLeft size={25} />
          </button>

          <p className="text-white/70 text-sm">
            BUSST
          </p>

          <h1 className="text-2xl font-bold">
            Profile
          </h1>

        </div>


        <div className="p-5">

          {/* PROFILE HEADER */}

          <div className="
            flex
            flex-col
            items-center
            py-5
          ">

            <div className="
              w-24
              h-24
              rounded-full
              bg-[#263238]
              flex
              items-center
              justify-center
            ">

              <User
                size={45}
                className="text-white"
              />

            </div>

            <h2 className="
              text-2xl
              font-bold
              text-[#263238]
              mt-3
            ">
              {name}
            </h2>

            <p className="text-[#263238]">
              Parent
            </p>

          </div>


          {/* DETAILS */}

          <div className="space-y-3">

            <div className="
              bg-[#F2F3F4]
              rounded-xl
              p-4
              flex
              items-center
              gap-3
            ">

              <Mail
                className="text-[#263238]"
              />

              <div>

                <p className="text-xs text-[#263238]">
                  Email
                </p>

                <p className="font-semibold text-[#263238]">
                  {email}
                </p>

              </div>

            </div>


            <div className="
              bg-[#F2F3F4]
              rounded-xl
              p-4
              flex
              items-center
              gap-3
            ">

              <Phone
                className="text-[#263238]"
              />

              <div>

                <p className="text-xs text-[#263238]">
                  Phone
                </p>

                <p className="font-semibold text-[#263238]">
                  {phone}
                </p>

              </div>

            </div>


            <div className="
              bg-[#F2F3F4]
              rounded-xl
              p-4
              flex
              items-center
              gap-3
            ">

              <ShieldCheck
                className="text-green-600"
              />

              <div>

                <p className="text-xs text-[#263238]">
                  Account Status
                </p>

                <p className="font-semibold text-green-600">
                  Active
                </p>

              </div>

            </div>

          </div>


          {/* STUDENT */}

          <div className="mt-6">

            <h3 className="
              font-bold
              text-xl
              text-[#263238]
              mb-3
            ">
              Linked Student
            </h3>

            <div className="
              bg-[#D9D9D9]
              rounded-xl
              p-4
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="text-xs text-[#263238]">
                  Student
                </p>

                <p className="
                  text-lg
                  font-bold
                  text-[#263238]
                ">
                  Ruel Ruchir
                </p>

              </div>

              <Bus
                className="text-[#263238]"
              />

            </div>

          </div>


          {/* LOGOUT */}

          <button
            onClick={logout}
            className="
              w-full
              mt-8
              h-12
              rounded-full
              bg-[#263238]
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-[#1B2327]
              transition
            "
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>


        {/* NAV */}

        <div
  className="
    fixed
    bottom-0
    left-1/2
    -translate-x-1/2
    w-full
    max-w-[430px]
    bg-white
    border-t
    border-gray-200
    flex
    justify-around
    py-3
    z-50
  "
>

          <button
            onClick={() =>
              router.push("/home")
            }
            className="flex flex-col items-center text-[#263238]"
          >
            <Bus size={22} />
            <span className="text-xs">
              Home
            </span>
          </button>

          <button
            onClick={() =>
              router.push("/track")
            }
            className="flex flex-col items-center text-[#263238]"
          >
            <MapPin size={22} />
            <span className="text-xs">
              Track
            </span>
          </button>

          <button
            onClick={() =>
              router.push("/alerts")
            }
            className="flex flex-col items-center text-[#263238]"
          >
            <Bell size={22} />
            <span className="text-xs">
              Alerts
            </span>
          </button>

          <button
            onClick={() =>
              router.push("/profile")
            }
            className="flex flex-col items-center text-[#1D6FDC]"
          >
            <User size={22} />
            <span className="text-xs">
              Profile
            </span>
          </button>

        </div>

      </div>

    </main>
  );
}