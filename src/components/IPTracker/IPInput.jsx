import { forwardRef, useState } from "react";
import { ReactComponent as Arrow } from "../../assets/images/icon-arrow.svg";
import { motion } from "framer-motion";
import { BiLoaderAlt } from "react-icons/bi";
import { IconContext } from "react-icons";
import { validateUserInput } from "../../lib/utils";

const IPInput = forwardRef((props, ref) => {
  const [error, setError] = useState();

  const handleInput = (e) => {
    e.preventDefault();
    const userValue = ref.current.value;
    const validateResult = validateUserInput(userValue);

    if (validateResult === "error") {
      setError(true);
    } else {
      setError(false);
      props.loadIPInfo(validateResult, userValue);
    }
  };

  return (
    <form
      className="flex flex-col w-full mx-6 max-w-[34.75rem]"
      onSubmit={handleInput}
    >
      <div className="flex">
        <input
          type="text"
          ref={ref}
          placeholder="Search for any IP address of domain"
          className="px-6 h-[3.75rem] rounded-l-xl md:rounded-l-2xl outline-none flex-grow font-rubik font-medium text-[1.08rem] placeholder:text-dark-gray placeholder:text-xs placeholder:font-normal md:placeholder:text-lg md:text-lg"
        />
        {props.isLoading && (
          <div className="w-14 bg-black hover:bg-very-dark-gray transition-all duration-700 flex justify-center items-center rounded-r-xl md:rounded-r-2xl">
            <IconContext.Provider
              value={{ className: "text-white animate-spin" }}
            >
              <BiLoaderAlt />
            </IconContext.Provider>
          </div>
        )}
        {!props.isLoading && (
          <button
            type="submit"
            aria-label="search for ip"
            className="w-14 bg-black hover:bg-very-dark-gray transition-all duration-700 flex justify-center items-center rounded-r-xl md:rounded-r-2xl"
          >
            <Arrow aria-hidden={true} focusable={false} />
          </button>
        )}
      </div>
      {error && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
        >
          <p className="text-red-800 text-sm font-rubik pt-3">
            Please enter a valid IP or Domain
          </p>
          <p className="text-green-300 text-sm font-rubik pt-3">
            Domain: geo.ipify.org (without http[s]://)
          </p>
          <p className="text-green-300 text-sm font-rubik pt-3">
            IP: 64.140.160.2
          </p>
        </motion.div>
      )}
    </form>
  );
});

export default IPInput;
