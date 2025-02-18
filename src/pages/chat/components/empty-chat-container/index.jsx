import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 hidden md:flex flex-col justify-center items-center bg-[#1c1d25] transition-opacity duration-700">
      <figure aria-label="Empty chat animation">
        <Lottie
          isClickToPauseDisabled
          height={200}
          width={200}
          options={animationDefaultOptions}
        />
      </figure>
      <div className="opacity-80 text-white flex flex-col gap-4 items-center text-center text-3xl lg:text-4xl">
        <h3 className="font-medium">
          Hi<span className="text-purple-500">!</span> Welcome to
          <span className="text-purple-500"> Syncronus </span>Chat App
          <span className="text-purple-500">.</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
