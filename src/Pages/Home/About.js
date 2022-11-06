import React from "react";
import parts from "../../assets/images/about_us/parts.jpg";
import person from "../../assets/images/about_us/person.jpg";

const About = () => {
  return (
    <div className="hero  my-5">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 relative">
          <img src={person} className="w-4/5  rounded-lg shadow-2xl " alt="" />
          <img
            src={parts}
            alt=""
            className="w-3/5 rounded-lg right-5 top-1/2 border-8 absolute"
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-2xl text-orange-600 font-bold mt-3">About Us</h1>
          <h1 className="text-5xl font-bold mt-3 ">
            We are qualified <br /> & of experience <br /> in this field
          </h1>
          <p className="py-6 w-3/4">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </p>
          <p className="pb-3  w-3/4">
            The majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </p>
          <button className="bg-rose-600 px-3 py-2 text-white rounded-md">
            Get More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
