"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  Bus,
  Clock,
  AlertTriangle,
  MapPin,
} from "lucide-react";

export default function AlertsPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn =
      localStorage.getItem(
        "busst_logged_in"
      );

    if (loggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);


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
            Notifications
          </h1>

        </div>


        <div className="p-5 space-y-4">

          {/* BOARDING */}

          <div className="
            bg-[#F2F3F4]
            rounded-2xl
            p-4
            flex
            gap-4
          ">

            <div className="
              w-11
              h-11
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
            ">

              <Bus
                className="text-blue-600"
                size={22}
              />

            </div>

            <div className="flex-1">

              <p className="
                font-bold
                text-[#263238]
              ">
                Student Boarded
              </p>

              <p className="
                text-sm
                text-[#263238]
                mt-1
              ">
                Ruel boarded BUS-104.
              </p>

              <div className="
                flex
                items-center
                gap-1
                text-xs
                text-[#263238]
                mt-2
              ">

                <Clock size={13} />

                7:35 AM

              </div>

            </div>

          </div>


          {/* ON TIME */}

          <div className="
            bg-[#F2F3F4]
            rounded-2xl
            p-4
            flex
            gap-4
          ">

            <div className="
              w-11
              h-11
              rounded-full
              bg-green-100
              flex
              items-center
              justify-center
            ">

              <Bell
                className="text-green-600"
                size={22}
              />

            </div>

            <div className="flex-1">

              <p className="font-bold text-[#263238]">
                Bus Running On Time
              </p>

              <p className="text-sm text-[#263238] mt-1">
                Expected arrival in 12 minutes.
              </p>

              <div className="flex items-center gap-1 text-xs text-[#263238] mt-2">

                <Clock size={13} />

                7:42 AM

              </div>

            </div>

          </div>


          {/* LOCATION */}

          <button
            onClick={() =>
              router.push("/track")
            }
            className="
              w-full
              text-left
              bg-[#F2F3F4]
              rounded-2xl
              p-4
              flex
              gap-4
              hover:bg-gray-200
              transition
            "
          >

            <div className="
              w-11
              h-11
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
            ">

              <MapPin
                className="text-blue-600"
                size={22}
              />

            </div>

            <div>

              <p className="font-bold text-[#263238]">
                Live Location Updated
              </p>

              <p className="text-sm text-[#263238] mt-1">
                BUS-104 location has been updated.
              </p>

              <p className="text-xs text-[#263238] mt-2">
                Tap to view bus location.
              </p>

            </div>

          </button>


          {/* ALERT */}

          <div className="
            bg-red-50
            border
            border-red-200
            rounded-2xl
            p-4
            flex
            gap-4
          ">

            <AlertTriangle
              className="text-red-600"
              size={24}
            />

            <div>

              <p className="font-bold text-[#263238]">
                Safety Alerts
              </p>

              <p className="text-sm text-[#263238] mt-1">
                No active safety alerts.
              </p>

            </div>

          </div>

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
            className="flex flex-col items-center text-[#1D6FDC]"
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
            className="flex flex-col items-center text-[#263238]"
          >
            <span>👤</span>
            <span className="text-xs">
              Profile
            </span>
          </button>

        </div>

      </div>

    </main>
  );
}