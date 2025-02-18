import React from "react";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/new-dm";

const ContactsContainer = () => {
  return (
    <div className="relative w-1/3 md:w-1/4 lg:w-[22vw] bg-[#1b1c24] border-r-2 border-gray-700">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5 px-4 md:px-6">
        <Title text="Direct Messages" />
        <NewDM />
      </div>
      <div className="my-5 px-4 md:px-6">
        <Title text="Channels" />
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" fill="#8338ec"></path>
        <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" fill="#975aed"></path>
        <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" fill="#a16ee8"></path>
      </svg>
      <span className="text-3xl font-semibold">Syncronus</span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 font-light opacity-90 text-sm">
      {text}
    </h6>
  );
};
