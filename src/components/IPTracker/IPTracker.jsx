import { useEffect, useRef, useState } from "react";
import MapWrapper from "../Map/MapWrapper";
import IPInput from "./IPInput";
import IPInfo from "./IPInfo";
import { apiUrl, getUTCTime } from "../../lib/utils";

const IPTracker = () => {
  const inputEl = useRef();
  const [state, setState] = useState({
    loading: false,
    error: {
      hasError: false,
      message: "",
    },
    ip: "",
    location: "",
    timezone: "",
    isp: "",
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    loadIPInfo("current", "");
  }, []);

  const loadIPInfo = (type, value) => {
    setState((prevState) => {
      return {
        ...prevState,
        loading: true,
        error: {
          hasError: false,
          message: "",
        },
      };
    });
    fetch(apiUrl(type, value))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Not Found");
        } else {
          throw new Error("Free Api has Expired");
        }
      })
      .then((responseJson) => {
        const location =
          responseJson.location.region && responseJson.location.city
            ? `${responseJson.location.region}, ${responseJson.location.city}`
            : "";
        const error = {
          hasError: !(
            responseJson.location.region && responseJson.location.city
          ),
          message:
            responseJson.location.region && responseJson.location.city
              ? ""
              : "Not Found",
        };
        setState({
          loading: false,
          error,
          ip: responseJson.ip,
          isp: responseJson.isp,
          location,
          lat: responseJson.location.lat,
          lng: responseJson.location.lng,
          timezone: `UTC - ${getUTCTime(responseJson.location.timezone)}`,
        });
      })
      .catch((error) => {
        setState((prevState) => {
          return {
            ...prevState,
            loading: false,
            error: {
              hasError: true,
              message: error.message,
            },
          };
        });
      });
  };

  return (
    <main>
      <div className="relative">
        <div className="bg-pattern-mobile md:bg-pattern-desktop bg-no-repeat bg-cover h-[18.75rem] md:h-[17.5rem]" />
        <div className="flex flex-col absolute top-0 w-full z-10">
          <h1 className="self-center text-white text-2xl font-rubik font-bold md:font-medium pt-6 md:text-[2rem] md:pt-8">
            IP Address Tracker
          </h1>
          <div className="flex justify-center pt-7 pb-6 md:pt-7">
            <IPInput
              ref={inputEl}
              isLoading={state.loading}
              loadIPInfo={loadIPInfo}
            />
          </div>
          <div className="md:pt-6">
            <IPInfo {...state} isLoading={state.loading} error={state.error} />
          </div>
        </div>
        <MapWrapper
          lat={state.lat}
          lng={state.lng}
          error={state.error.hasError}
        />
      </div>
    </main>
  );
};

export default IPTracker;
