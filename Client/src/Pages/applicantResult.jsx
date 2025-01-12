import { useState, useRef, useEffect, useCallback } from "react";
import Liyla from "../assets/Type=Layila.svg";
import Company from "../assets/company logo.png";
import Location from "../assets/location.svg";
import Briefcase from "../assets/briefcase.svg";

import hamburgerBar from "../assets/hamburgerBar.png";
import Star from "../assets/star.svg";
import Send from "../assets/whiteSend.svg";
import Card from "../Components/card";
import Navbar from "../Components/Navbar";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ReactPaginate from "react-paginate";
import { useConversation } from "@11labs/react";
import axios from "axios";

import img1 from "../../public/images/0147e290cc17ffa543232af3edabc415.jpeg";
import img2 from "../../public/images/015481d454b839929d875b8cf1eb9ec3.jpeg";
import img3 from "../../public/images/05172b8fac0c462167f3e83dd9f7c40a.jpeg";
import img4 from "../../public/images/0ab0515d62a0fe3920db471cc3d13116.jpeg";
import img5 from "../../public/images/0b77dbf49f877f94f4474f753a32c57b.jpeg";
import img6 from "../../public/images/0b8ecce9bb773ad090ac442a96415e12.jpeg";
import img7 from "../../public/images/0d0bc64b941550b91bb8931dd64f8446.jpeg";
import img8 from "../../public/images/0f8d45f16836efe6638ab4c735f49d71.jpeg";

const ApplicantResult = () => {
  const candidates = [
    {
      name: "Sanjay Prasath",
      title: "MERN Stack",
      location: "India",
      experience: 12,
      appliedDaysAgo: 15,
      src: img1,
      rounds: [
        { progress: 85, name: "Round 1", description: "Technical" },
        { progress: 95, name: "Round 2", description: "HR Interview" },
      ],
      skillStack: 97,
      rank: 1,
    },
    {
      name: "Mukesh",
      title: "React developer",
      location: "America",
      experience: 6,
      appliedDaysAgo: 13,
      src: img2,
      rounds: [
        { progress: 20, name: "Round 1", description: "Design Task" },
        { progress: 35, name: "Round 2", description: "Team Interview" },
      ],
      skillStack: 80,
      rank: 10,
    },
    {
      name: "Debaleena",
      title: "UI/UX designer",
      location: "Austin",
      experience: 8,
      appliedDaysAgo: 10,
      src: img3,
      rounds: [
        { progress: 60, name: "Round 1", description: "Portfolio Review" },
        { progress: 90, name: "Round 2", description: "Technical Round" },
      ],
      skillStack: 90,
      rank: 5,
    },
    {
      name: "Manjeet",
      title: "MERN Stack",
      location: "Chicago",
      experience: 12,
      appliedDaysAgo: 1,
      src: img4,
      rounds: [
        { progress: 60, name: "Round 1", description: "Technical" },
        { progress: 75, name: "Round 2", description: "HR Interview" },
      ],
      skillStack: 95,
      rank: 3,
    },
    {
      name: "Priyansh",
      title: "React Devloper",
      location: "Boston",
      experience: 12,
      appliedDaysAgo: 7,
      src: img5,
      rounds: [
        { progress: 45, name: "Round 1", description: "Research Task" },
        { progress: 88, name: "Round 2", description: "Team Interview" },
      ],
      skillStack: 96,
      rank: 2,
    },
    {
      name: "Joe",
      title: "Visual Designer",
      location: "Seattle",
      experience: 4,
      appliedDaysAgo: 3,
      src: img6,
      rounds: [
        { progress: 55, name: "Round 1", description: "Technical" },
        { progress: 90, name: "Round 2", description: "HR Interview" },
      ],
      skillStack: 85,
      rank: 4,
    },
    {
      name: "Bieden",
      title: "Digital Designer",
      location: "Bieden",
      experience: 6,
      appliedDaysAgo: 4,
      src: img7,
      rounds: [
        { progress: 35, name: "Round 1", description: "Portfolio Review" },
        { progress: 75, name: "Round 2", description: "Team Interview" },
      ],
      skillStack: 60,
      rank: 7,
    },
    {
      name: "Rajan",
      title: "Lead Designer",
      location: "Miami",
      experience: 8,
      appliedDaysAgo: 6,
      src: img8,
      rounds: [
        { progress: 70, name: "Round 1", description: "Technical" },
        { progress: 100, name: "Round 2", description: "Final Round" },
      ],
      skillStack: 48,
      rank: 6,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [helpButton, setHelpButton] = useState(false);
  const gradientRef = useRef(null);
  const rotationRef = useRef(0);
  const [showGradient, setShowGradient] = useState(false);
  const [liylaHelp, setLiylaHelp] = useState(false);
  const [images, setImages] = useState([]);
  const candidatesPerPage = 6;
  const pageCount = Math.ceil(candidates.length / candidatesPerPage);
  const [candidateData, setCandidateData] = useState(candidates);

  const currentCandidates = candidates.slice(
    currentPage * candidatesPerPage,
    (currentPage + 1) * candidatesPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const generateRandomSkillScore = () => {
    return Math.floor(Math.random() * (900 - 600 + 1)) + 600;
  };

  useEffect(() => {
    const rotateGradient = () => {
      if (gradientRef.current) {
        rotationRef.current = (rotationRef.current - 1) % 360;
        gradientRef.current.style.transform = `translateY(10%) rotate(${rotationRef.current}deg)`;
      }
    };

    const animationFrame = requestAnimationFrame(function animate() {
      rotateGradient();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleHelpButton = () => {
    setHelpButton(true);
  };

  const handleSendClick = useCallback(() => {
    setShowGradient(true);
    setHelpButton(false);
    setLiylaHelp(true);
  }, []);

  const handleGradientComplete = useCallback(() => {
    setShowGradient(false);
  }, []);

  const [liylaStatus, setLiylaStatus] = useState(false);
  const conversation = useConversation();

  const toggleLiylaStatus = async () => {
    setLiylaStatus((prev) => !prev);
    if (!liylaStatus) {
      const conversationId = await conversation.startSession({
        agentId: import.meta.env.VITE_APP_ELEVENLABS,
      });
      console.log("11 labs activated: ", conversationId);
    } else {
      await conversation.endSession();
    }
  };

  return (
    <div className="bg-[#F2F2F2] h-full flex flex-col">
      {/* Navbar */}
      <Navbar assistant={Liyla} onLiylaActivate={toggleLiylaStatus} />

      {/* Company Description */}
      <div className="h-[250px] px-12 relative mt-[2%]">
        <div className="relative h-[40%]">
          <div className="h-[70%] w-full bg-gradient-to-b from-[#FEC4CB] via-[#F4C8EF] to-[#F4C8EF] rounded-[20px]"></div>
          <img
            src={Company}
            alt="Company Logo"
            className="absolute top-[70%] left-0 transform -translate-y-1/2"
          />
        </div>
        <div className="bg-white -mt-14 pb-6 rounded-[32px] rounded-t-none h-[50%] pt-[70px] pl-[40px] justify-center flex flex-col">
          <div className="flex">
            <p className="font-bold text-[24px] text-[#353535] mr-3">
              Senior UI/UX Designer
            </p>
            <p className="mt-3 mr-3 flex">
              <img src={Location} alt="Location" className="w-5 h-5 mt-1" />
              <span className="ml-0.5 text-[#979797] text-[14px] font-medium">
                Bangalore
              </span>
            </p>
            <div className="flex items-center mr-[6px]">
              <div className="border border-[#979797] rounded-full h-[4px] w-[4px] bg-[#979797]"></div>
            </div>
            <p className="mt-3 mr-3 flex">
              <img src={Briefcase} alt="Briefcase" className="w-5 h-5 mt-1" />
              <span className="ml-0.5 text-[#979797] text-[14px] font-medium">
                3 - 5 Yrs
              </span>
            </p>
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex">
              <p className="text-[#353535] text-[18px]">Amazon</p>
              <p className="text-[#979797] pl-5 flex">
                <img src={Star} alt="Star" className="w-6 h-6 mt-1" />
                <span className="pl-1 pr-2 text-[16px]">4.7</span>
              </p>
              <p className="pl-4 text-[#979797] text-[16px]">1267 reviews</p>
            </div>
            {helpButton ? (
              <div className={`relative w-[300px] h-[40px] mr-[14px]`}>
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div
                    ref={gradientRef}
                    className="absolute inset-[-620%] origin-center"
                    style={{
                      background: `conic-gradient(from 270deg, #C9FFFC 0%, #002DBF 25%, #4396F7 50%, #FF9BD2 75%, #C9FFFC 100%)`,
                      transform: "translateY(10%)",
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gray-800/70 backdrop-blur-sm" />
                <input
                  type="text"
                  placeholder="Liyla Help"
                  className="w-full h-full px-4 text-white bg-transparent rounded-full outline-none placeholder-gray-400 relative z-10 placeholder:text-white text-lg font-normal pr-[40px]"
                  aria-label="Liyla Help"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                  aria-label="Send"
                  onClick={handleSendClick}
                >
                  <img src={Send} alt="Send" width={20} height={20} />
                </button>
              </div>
            ) : (
              <div
                className="w-[100px] mr-[14px] rounded-full flex items-center justify-center h-[40px] cursor-pointer"
                style={{
                  background: "linear-gradient(to right, #5C9AFF, #154DD1)",
                }}
                onClick={handleHelpButton}
              >
                <button className="text-white font-semibold">Liyla Help</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div
        className=" overflow-y-auto ml-[30px] -mt-[3%]"
        style={{ direction: "rtl" }}
      >
        <div
          className="h-full flex flex-wrap gap-6"
          style={{ direction: "ltr" }}
        >
          {currentCandidates.map((candidate, index) => {
            const skillScore = generateRandomSkillScore();
            return (
              <Card
                key={index}
                index={index}
                candidate={candidate}
                showGradient={showGradient}
                onGradientComplete={handleGradientComplete}
                liylaHelp={liylaHelp}
                skillScore={skillScore}
              />
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="h-[10%] flex items-center mt-4">
        <div className="ml-10 w-[50px] fixed bottom-2 z-10">
          <img src={hamburgerBar} alt="Hamburger menu" />
        </div>
        <div className="flex-grow flex justify-center">
          <ReactPaginate
            previousLabel={<SlArrowLeft />}
            nextLabel={<SlArrowRight />}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex items-center"}
            activeClassName={"active"}
            pageClassName="px-1"
            activeLinkClassName="bg-primary text-white rounded-lg"
            pageLinkClassName="p-[12px] py-[7px] border border-paginationBox bg-paginationBox text-[#5D5D5D] rounded-lg"
            previousClassName={`p-[8px] border rounded-lg ${
              currentPage === 0
                ? "bg-paginationBox border-paginationBox text-[#C9C9C9]"
                : "bg-paginationBox border-paginationBox cursor-pointer"
            }`}
            previousLinkClassName={`${
              currentPage === 0 ? "cursor-default text-[#C9C9C9]" : ""
            }`}
            nextClassName={`p-[8px] border rounded-lg ${
              currentPage === pageCount - 1
                ? "bg-paginationBox border-paginationBox text-[#C9C9C9]"
                : "bg-paginationBox border-paginationBox cursor-pointer"
            }`}
            nextLinkClassName={`${
              currentPage === pageCount - 1
                ? "cursor-default text-[#C9C9C9]"
                : ""
            }`}
            disabledClassName="cursor-default text-[#C9C9C9]"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantResult;
