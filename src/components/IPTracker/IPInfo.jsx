import IPSpec from "./IPSpec";

const IPInfo = ({ ip, location, timezone, isp, isLoading, error }) => {
  return (
    <div className="bg-white mx-6 rounded-xl pt-6 pb-6 flex flex-col gap-y-6 justify-center md:grid md:grid-cols-2 lg:grid-cols-4 lg:mr-auto lg:ml-auto lg:max-w-[69.5rem]">
      {!error.hasError && (
        <>
          <IPSpec label="ip address" value={ip} isLoading={isLoading} />
          <IPSpec label="location" value={location} isLoading={isLoading} />
          <IPSpec label="timezone" value={timezone} isLoading={isLoading} />
          <IPSpec label="isp" value={isp} isLoading={isLoading} />
        </>
      )}
      {error.hasError && (
        <p className="p-8 text-red-800 font-rubik font-bold text-lg text-center md:col-span-2 lg:col-span-4">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default IPInfo;
