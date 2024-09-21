import { Link } from "react-router-dom";
import LandingSvg from "../components/allsvgs/LandingSvg";

type Props = {};

export default function LandingPage({}: Props) {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full px-2 pb-3">
      <div className="flex flex-col lg:flex-row h-full pt-9 w-full items-center lg:justify-between gap-3 lg:pt-[7rem] md:gap-10 lg:px-[7rem] px-3">
        <div className="flex flex-col w-full gap-2 md:gap-5 lg:items-start lg:w-[30rem]">
          <h1 className="text-[1.7rem] md:text-[2.7rem] font-bold text-red-500 text-center lg:text-start">
            Welcome to WHTA
          </h1>
          <p className="text-lg text-gray-500 text-center lg:text-start md:px-10 lg:px-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="w-full h-[3.3rem] flex gap-2 items-center justify-center lg:justify-start lg:mt-10">
            <Link
              to="/about"
              className="border-2 border-red-500 px-5 w-[9rem] h-full rounded-md text-red-500 font-bold text-xl text-center flex items-center justify-center"
            >
              About Us
            </Link>
            <Link
              to="tel:+2349039062234"
              className="bg-red-500 px-5 w-[9rem] h-full rounded-md text-white font-bold text-xl text-center flex items-center justify-center"
            >
              Call Us
            </Link>
          </div>
        </div>
        <div className="w-full max-w-[40rem]  h-[22rem] md:h-[28rem] rounded-xl md:rounded-none overflow-hidden">
          <LandingSvg />
        </div>
      </div>
    </section>
  );
}
