"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Bus,
  MapPin,
  User,
  LogOut,
  Clock,
  Navigation,
  ChevronRight,
} from "lucide-react";
import {
  setOptions,
  importLibrary,
} from "@googlemaps/js-api-loader";

export default function HomePage() {
  const router = useRouter();

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);

  const [userName, setUserName] = useState("Parent");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // ==========================================
  // LOAD USER
  // ==========================================

  useEffect(() => {
    const loggedIn = localStorage.getItem(
      "busst_logged_in"
    );

    if (loggedIn !== "true") {
      router.push("/login");
      return;
    }

    const registeredUser =
      localStorage.getItem(
        "busst_registered_user"
      );

    if (registeredUser) {
      try {
        const user = JSON.parse(
          registeredUser
        );

        setUserName(user.name || "Parent");
        setUserEmail(user.email || "");
        setUserPhone(user.phone || "");
      } catch {
        console.log(
          "Could not read user."
        );
      }
    }
  }, [router]);


  // ==========================================
  // GOOGLE MAP
  // ==========================================

  useEffect(() => {
    if (mapInitialized.current) {
      return;
    }

    if (!mapRef.current) {
      return;
    }

    const apiKey =
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (
      !apiKey ||
      apiKey === "YOUR_GOOGLE_MAPS_API_KEY"
    ) {
      return;
    }

    mapInitialized.current = true;

    const initializeMap = async () => {
      try {
        setOptions({
          key: apiKey,
          v: "weekly",
        });

        const mapsLibrary =
          (await importLibrary(
            "maps"
          )) as google.maps.MapsLibrary;

        const markerLibrary =
          (await importLibrary(
            "marker"
          )) as google.maps.MarkerLibrary;

        const busLocation = {
          lat: 9.5916,
          lng: 76.5222,
        };

        const schoolLocation = {
          lat: 9.5935,
          lng: 76.5228,
        };

        const map =
          new mapsLibrary.Map(
            mapRef.current!,
            {
              center: busLocation,
              zoom: 15,

              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              zoomControl: true,

              mapId: "BUSST_MAP",
            }
          );

        // BUS MARKER

        const busElement =
          document.createElement("div");

        busElement.innerHTML = `
          <div style="
            width:44px;
            height:44px;
            border-radius:50%;
            background:#1D6FDC;
            border:3px solid white;
            display:flex;
            align-items:center;
            justify-content:center;
            box-shadow:0 3px 10px rgba(0,0,0,0.3);
            font-size:21px;
          ">
            🚌
          </div>
        `;

        new markerLibrary.AdvancedMarkerElement({
          map,
          position: busLocation,
          content: busElement,
          title: "BUS-104",
        });

        // SCHOOL MARKER

        const schoolElement =
          document.createElement("div");

        schoolElement.innerHTML = `
          <div style="
            font-size:32px;
            line-height:32px;
          ">
            📍
          </div>
        `;

        new markerLibrary.AdvancedMarkerElement({
          map,
          position: schoolLocation,
          content: schoolElement,
          title: "School",
        });

        // ROUTE

        new google.maps.Polyline({
          map,

          path: [
            busLocation,

            {
              lat: 9.5921,
              lng: 76.5224,
            },

            {
              lat: 9.5928,
              lng: 76.5226,
            },

            schoolLocation,
          ],

          geodesic: true,

          strokeColor: "#1D6FDC",
          strokeOpacity: 0.8,
          strokeWeight: 5,
        });

        setMapLoaded(true);

      } catch (error) {
        console.error(
          "Google Maps failed:",
          error
        );

        setMapError(true);
        mapInitialized.current = false;
      }
    };

    initializeMap();
  }, []);


  // ==========================================
  // LOGOUT
  // ==========================================

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


        {/* ========================================
            HEADER
        ======================================== */}

        <div className="bg-[#263238] text-white rounded-b-[32px] px-6 py-5">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm text-white/80">
                Good Morning
              </p>

              <h1 className="text-2xl font-bold">
                {userName}
              </h1>

              <p className="text-sm text-white/80">
                Parent Dashboard
              </p>

            </div>

            <button
              onClick={logout}
              className="
                p-2
                rounded-full
                hover:bg-white/10
                transition
              "
              aria-label="Logout"
            >
              <LogOut size={24} />
            </button>

          </div>

        </div>


        {/* ========================================
            CONTENT
        ======================================== */}

        <div className="p-5 space-y-5">


          {/* ========================================
              STUDENT
          ======================================== */}

          <button
            onClick={() =>
              router.push("/track")
            }
            className="
              w-full
              text-left
              bg-[#D9D9D9]
              rounded-2xl
              p-5
              hover:bg-[#CECECE]
              transition
            "
          >

            <div className="flex justify-between">

              <div>

                <p className="text-[#263238] text-sm">
                  Student
                </p>

                <h2 className="text-2xl font-bold text-[#263238]">
                  Ruel Ruchir
                </h2>

              </div>

              <div className="
                bg-green-600
                text-white
                px-3
                py-1
                rounded-full
                h-fit
                text-xs
                font-semibold
              ">
                ON BUS
              </div>

            </div>


            <div className="grid grid-cols-2 gap-3 mt-5">

              <div className="bg-white rounded-xl p-3">

                <p className="text-xs text-[#263238]">
                  Route
                </p>

                <p className="font-bold text-[#263238]">
                  Route A
                </p>

              </div>


              <div className="bg-white rounded-xl p-3">

                <p className="text-xs text-[#263238]">
                  Pickup
                </p>

                <p className="font-bold text-[#263238]">
                  7:35 AM
                </p>

              </div>

            </div>

          </button>


          {/* ========================================
              BUS STATUS
          ======================================== */}

          <button
            onClick={() =>
              router.push("/track")
            }
            className="
              w-full
              text-left
              bg-[#1D6FDC]
              rounded-2xl
              p-5
              text-white
              hover:bg-[#155DBB]
              transition
            "
          >

            <div className="flex items-center gap-3">

              <Bus size={32} />

              <div>

                <h3 className="text-xl font-bold">
                  BUS-104
                </h3>

                <p className="text-blue-100">
                  Currently in transit
                </p>

              </div>

              <ChevronRight
                className="ml-auto"
                size={24}
              />

            </div>


            <div className="grid grid-cols-2 mt-5 gap-4">

              <div>

                <p className="text-xs text-blue-100">
                  Speed
                </p>

                <p className="font-bold text-lg">
                  32 km/h
                </p>

              </div>


              <div>

                <p className="text-xs text-blue-100">
                  ETA
                </p>

                <p className="font-bold text-lg">
                  12 mins
                </p>

              </div>

            </div>

          </button>


          {/* ========================================
              LIVE TRACKING
          ======================================== */}

          <div>

            <div className="flex justify-between items-center mb-3">

              <h3 className="text-xl font-bold text-[#263238]">
                Live Tracking
              </h3>

              <button
                onClick={() =>
                  router.push("/track")
                }
                className="
                  p-2
                  rounded-full
                  hover:bg-blue-50
                  transition
                "
                aria-label="Open tracking"
              >
                <Navigation
                  className="text-blue-600"
                  size={24}
                />
              </button>

            </div>


            {/* MAP WRAPPER */}

            <div className="
              relative
              h-52
              rounded-2xl
              overflow-hidden
              border
            ">

              <div
                ref={mapRef}
                className="absolute inset-0"
              />

              {!mapLoaded && !mapError && (
                <div className="
                  absolute
                  inset-0
                  bg-[#DDE9D8]
                  flex
                  flex-col
                  items-center
                  justify-center
                  pointer-events-none
                ">

                  <div className="text-4xl mb-2">
                    🗺️
                  </div>

                  <p className="font-semibold text-[#263238]">
                    Loading Live Map...
                  </p>

                </div>
              )}

              {mapError && (
                <div className="
                  absolute
                  inset-0
                  bg-[#DDE9D8]
                  flex
                  flex-col
                  items-center
                  justify-center
                  px-5
                  text-center
                ">

                  <div className="text-4xl mb-2">
                    🗺️
                  </div>

                  <p className="font-semibold text-[#263238]">
                    Map unavailable
                  </p>

                  <p className="text-xs text-[#263238] mt-1">
                    Check your Google Maps API
                    configuration.
                  </p>

                </div>
              )}

            </div>


            {/* LEGEND */}

            <div className="flex justify-between items-center mt-2">

              <div className="flex items-center gap-2">

                <span className="w-3 h-3 rounded-full bg-blue-600" />

                <span className="text-xs text-[#263238]">
                  BUS-104
                </span>

              </div>


              <div className="flex items-center gap-2">

                <MapPin
                  size={15}
                  className="text-red-600"
                />

                <span className="text-xs text-[#263238]">
                  School
                </span>

              </div>

            </div>

          </div>


          {/* ========================================
              NOTIFICATIONS
          ======================================== */}

          <div>

            <div className="flex justify-between items-center mb-3">

              <h3 className="text-xl font-bold text-[#263238]">
                Notifications
              </h3>

              <button
                onClick={() =>
                  router.push("/alerts")
                }
                className="
                  text-sm
                  font-semibold
                  text-blue-600
                  hover:underline
                "
              >
                View all
              </button>

            </div>


            <div className="space-y-3">

              <button
                onClick={() =>
                  router.push("/alerts")
                }
                className="
                  w-full
                  text-left
                  bg-gray-100
                  rounded-xl
                  p-3
                  flex
                  gap-3
                  hover:bg-gray-200
                  transition
                "
              >

                <Bell
                  className="text-blue-600 mt-1"
                  size={20}
                />

                <div>

                  <p className="font-semibold text-[#263238]">
                    Student Boarded
                  </p>

                  <p className="text-sm text-[#263238]">
                    Ruel boarded BUS-104.
                  </p>

                  <div className="flex items-center gap-1 text-xs text-[#263238] mt-1">

                    <Clock size={12} />

                    7:35 AM

                  </div>

                </div>

              </button>


              <button
                onClick={() =>
                  router.push("/alerts")
                }
                className="
                  w-full
                  text-left
                  bg-gray-100
                  rounded-xl
                  p-3
                  flex
                  gap-3
                  hover:bg-gray-200
                  transition
                "
              >

                <Bell
                  className="text-green-600 mt-1"
                  size={20}
                />

                <div>

                  <p className="font-semibold text-[#263238]">
                    Bus Running On Time
                  </p>

                  <p className="text-sm text-[#263238]">
                    Expected arrival in 12 minutes.
                  </p>

                  <div className="flex items-center gap-1 text-xs text-[#263238] mt-1">

                    <Clock size={12} />

                    7:42 AM

                  </div>

                </div>

              </button>

            </div>

          </div>

        </div>


        {/* ========================================
            BOTTOM NAV
        ======================================== */}

        <div className="
          sticky
          bottom-0
          bg-white
          border-t
          border-gray-200
          flex
          justify-around
          py-3
        ">

          <button
            onClick={() =>
              router.push("/home")
            }
            className="
              flex
              flex-col
              items-center
              text-[#1D6FDC]
              w-1/4
              py-1
            "
          >

            <Bus size={22} />

            <span className="text-xs font-medium">
              Home
            </span>

          </button>


          <button
            onClick={() =>
              router.push("/track")
            }
            className="
              flex
              flex-col
              items-center
              text-[#263238]
              w-1/4
              py-1
              hover:text-[#1D6FDC]
              transition
            "
          >

            <MapPin size={22} />

            <span className="text-xs font-medium">
              Track
            </span>

          </button>


          <button
            onClick={() =>
              router.push("/alerts")
            }
            className="
              flex
              flex-col
              items-center
              text-[#263238]
              w-1/4
              py-1
              hover:text-[#1D6FDC]
              transition
            "
          >

            <Bell size={22} />

            <span className="text-xs font-medium">
              Alerts
            </span>

          </button>


          <button
            onClick={() =>
              router.push("/profile")
            }
            className="
              flex
              flex-col
              items-center
              text-[#263238]
              w-1/4
              py-1
              hover:text-[#1D6FDC]
              transition
            "
          >

            <User size={22} />

            <span className="text-xs font-medium">
              Profile
            </span>

          </button>

        </div>

      </div>

    </main>
  );
}