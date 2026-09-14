"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  Bus,
  MapPin,
  User,
  Clock,
  Navigation,
} from "lucide-react";
import {
  setOptions,
  importLibrary,
} from "@googlemaps/js-api-loader";

export default function TrackPage() {
  const router = useRouter();

  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // ==========================================
  // CHECK LOGIN
  // ==========================================

  useEffect(() => {
    const loggedIn = localStorage.getItem(
      "busst_logged_in"
    );

    if (loggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);


  // ==========================================
  // LOAD GOOGLE MAP
  // ==========================================

  useEffect(() => {
    if (initialized.current) {
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
      console.log(
        "Google Maps API key not configured."
      );
      return;
    }

    initialized.current = true;

    const loadMap = async () => {
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

        // ======================================
        // LOCATIONS
        // ======================================

        const busLocation = {
          lat: 9.5916,
          lng: 76.5222,
        };

        const schoolLocation = {
          lat: 9.5935,
          lng: 76.5228,
        };

        // ======================================
        // CREATE MAP
        // ======================================

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

              mapId: "BUSST_TRACK_MAP",
            }
          );

        // ======================================
        // BUS MARKER
        // ======================================

        const busElement =
          document.createElement("div");

        busElement.innerHTML = `
          <div style="
            width:46px;
            height:46px;
            border-radius:50%;
            background:#1D6FDC;
            border:3px solid white;
            display:flex;
            align-items:center;
            justify-content:center;
            box-shadow:0 3px 10px rgba(0,0,0,0.3);
            font-size:22px;
          ">
            🚌
          </div>
        `;

        new markerLibrary.AdvancedMarkerElement({
          map: map,
          position: busLocation,
          content: busElement,
          title: "BUS-104",
        });

        // ======================================
        // SCHOOL MARKER
        // ======================================

        const schoolElement =
          document.createElement("div");

        schoolElement.innerHTML = `
          <div style="
            font-size:34px;
            line-height:34px;
          ">
            📍
          </div>
        `;

        new markerLibrary.AdvancedMarkerElement({
          map: map,
          position: schoolLocation,
          content: schoolElement,
          title: "School",
        });

        // ======================================
        // ROUTE
        // ======================================

        new google.maps.Polyline({
          map: map,

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
      }
    };

    loadMap();

  }, []);


  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main
      className="
        min-h-screen
        bg-gray-200
        flex
        justify-center
      "
    >

      <div
        className="
          w-full
          max-w-[430px]
          min-h-screen
          bg-white
        "
      >

        {/* =====================================
            HEADER
        ===================================== */}

        <div
          className="
            bg-[#263238]
            text-white
            px-5
            py-5
            rounded-b-[30px]
          "
        >

          <button
            onClick={() =>
              router.push("/home")
            }
            className="
              mb-4
              hover:opacity-80
              transition
            "
          >
            <ArrowLeft size={25} />
          </button>

          <p className="text-white/70 text-sm">
            Live Tracking
          </p>

          <h1 className="text-2xl font-bold">
            BUS-104
          </h1>

        </div>


        {/* =====================================
            CONTENT
        ===================================== */}

        <div className="p-5">


          {/* BUS STATUS */}

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
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <Bus size={34} />

              <div>

                <h2 className="text-xl font-bold">
                  BUS-104
                </h2>

                <p className="text-blue-100">
                  Currently in transit
                </p>

              </div>

            </div>


            <div
              className="
                grid
                grid-cols-2
                mt-5
                gap-4
              "
            >

              <div>

                <p className="text-xs text-blue-100">
                  Speed
                </p>

                <p className="text-lg font-bold">
                  32 km/h
                </p>

              </div>


              <div>

                <p className="text-xs text-blue-100">
                  ETA
                </p>

                <p className="text-lg font-bold">
                  12 mins
                </p>

              </div>

            </div>

          </button>


          {/* =====================================
              MAP TITLE
          ===================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              mt-6
              mb-3
            "
          >

            <h2
              className="
                text-xl
                font-bold
                text-[#263238]
              "
            >
              Live Location
            </h2>

            <Navigation
              size={23}
              className="text-[#263238]"
            />

          </div>


          {/* =====================================
              MAP
          ===================================== */}

          <div
            className="
              relative
              h-[300px]
              rounded-2xl
              overflow-hidden
              border
              border-gray-200
            "
          >

            {/* GOOGLE MAP CONTAINER */}

            <div
              ref={mapRef}
              className="
                absolute
                inset-0
              "
            />


            {/* LOADING */}

            {!mapLoaded && !mapError && (
              <div
                className="
                  absolute
                  inset-0
                  flex
                  flex-col
                  items-center
                  justify-center
                  pointer-events-none
                "
                style={{
                  backgroundColor: "#DDE9D8",
                }}
              >

                <Navigation
                  size={42}
                  className="text-[#263238]"
                />

                <p
                  className="
                    font-semibold
                    text-[#263238]
                    mt-2
                  "
                >
                  Loading Map...
                </p>

              </div>
            )}


            {/* MAP ERROR */}

            {mapError && (
              <div
                className="
                  absolute
                  inset-0
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  p-5
                "
                style={{
                  backgroundColor: "#DDE9D8",
                }}
              >

                <Navigation
                  size={42}
                  className="text-[#263238]"
                />

                <p
                  className="
                    font-bold
                    text-[#263238]
                    mt-2
                  "
                >
                  Map unavailable
                </p>

                <p
                  className="
                    text-sm
                    text-[#263238]
                    mt-1
                  "
                >
                  Check your Google Maps API
                  configuration.
                </p>

              </div>
            )}

          </div>


          {/* =====================================
              MAP INFORMATION
          ===================================== */}

          <div
            className="
              flex
              justify-between
              mt-3
              px-1
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  w-3
                  h-3
                  rounded-full
                  bg-blue-600
                "
              />

              <span
                className="
                  text-sm
                  text-[#263238]
                "
              >
                BUS-104
              </span>

            </div>


            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <MapPin
                size={16}
                className="text-red-600"
              />

              <span
                className="
                  text-sm
                  text-[#263238]
                "
              >
                School
              </span>

            </div>

          </div>


          {/* =====================================
              TRIP DETAILS
          ===================================== */}

          <h2
            className="
              text-xl
              font-bold
              text-[#263238]
              mt-6
              mb-3
            "
          >
            Trip Details
          </h2>


          {/* ETA */}

          <div
            className="
              bg-gray-100
              rounded-xl
              p-4
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-white
                flex
                items-center
                justify-center
              "
            >

              <Clock
                size={21}
                className="text-[#263238]"
              />

            </div>


            <div>

              <p
                className="
                  text-sm
                  text-[#263238]
                "
              >
                Expected Arrival
              </p>

              <p
                className="
                  font-bold
                  text-[#263238]
                "
              >
                12 minutes
              </p>

            </div>

          </div>


          {/* DESTINATION */}

          <div
            className="
              bg-gray-100
              rounded-xl
              p-4
              flex
              items-center
              gap-3
              mt-3
            "
          >

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-white
                flex
                items-center
                justify-center
              "
            >

              <MapPin
                size={21}
                className="text-red-600"
              />

            </div>


            <div>

              <p
                className="
                  text-sm
                  text-[#263238]
                "
              >
                Destination
              </p>

              <p
                className="
                  font-bold
                  text-[#263238]
                "
              >
                School
              </p>

            </div>

          </div>


          {/* BUS STATUS */}

          <div
            className="
              bg-gray-100
              rounded-xl
              p-4
              flex
              items-center
              gap-3
              mt-3
            "
          >

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-white
                flex
                items-center
                justify-center
              "
            >

              <Bus
                size={21}
                className="text-[#263238]"
              />

            </div>


            <div>

              <p
                className="
                  text-sm
                  text-[#263238]
                "
              >
                Bus Status
              </p>

              <p
                className="
                  font-bold
                  text-green-600
                "
              >
                Currently in transit
              </p>

            </div>

          </div>

        </div>


        {/* =====================================
            BOTTOM NAVIGATION
        ===================================== */}

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

          {/* HOME */}

          <button
            onClick={() =>
              router.push("/home")
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

            <Bus size={22} />

            <span className="text-xs font-medium">
              Home
            </span>

          </button>


          {/* TRACK */}

          <button
            onClick={() =>
              router.push("/track")
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

            <MapPin size={22} />

            <span className="text-xs font-medium">
              Track
            </span>

          </button>


          {/* ALERTS */}

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


          {/* PROFILE */}

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