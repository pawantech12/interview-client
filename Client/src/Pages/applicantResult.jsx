import { useState, useRef, useEffect, useCallback } from "react";
import Liyla from "../assets/Type=Layila.svg";
import Company from "../assets/company logo.png";
import Location from "../assets/location.svg";
import Briefcase from "../assets/briefcase.svg";
import Sanjay from "../assets/sanjay.jpeg";
import Mukesh from "../assets/mukesh.jpeg";
import Debaleena from "../assets/debaleena.jpg";
import Manjeet from "../assets/manjeet.jpeg";
import Priyansh from "../assets/priyansh.jpg";
import Bieden from "../assets/bieden.jpeg";
import Joe from "../assets/joe.jpeg";
import sundar from "../assets/sundar pitchai.jpg";
import edwin from "../assets/edwin.jpg";
import joseph from "../assets/joseph.jpg";
import raj from "../assets/raj.jpg";
import boy1 from "../assets/boy1.jpg";
import boy2 from "../assets/boy2.jpg";
import boy3 from "../assets/boy3.jpg";
import boy4 from "../assets/boy4.jpg";
import girl1 from "../assets/girl1.jpg";
import girl2 from "../assets/girl2.jpg";
import girl3 from "../assets/girl3.jpg";
import girl4 from "../assets/girl4.jpg";
import Rajan from "../assets/rajan.jpg";
import hamburgerBar from "../assets/hamburgerBar.png";
import Star from "../assets/star.svg";
import Send from "../assets/whiteSend.svg";
import Card from "../Components/card";
import Navbar from "../Components/Navbar";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import ReactPaginate from "react-paginate";
import { useConversation } from "@11labs/react";

const ApplicantResult = () => {
  const candidates = [
    {
      name: "Sanjay Prasath",
      title: "MERN Stack",
      location: "India",
      experience: 12,
      appliedDaysAgo: 15,
      src: Sanjay,
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
      src: Mukesh,
      rounds: [
        { progress: 20, name: "Round 1", description: "Design Task" },
        { progress: 35, name: "Round 2", description: "Team Interview" },
      ],
      skillStack: 80,
      rank: 10,
    },
    {
      name: "Ayushi",
      title: "UI/UX designer",
      location: "Austin",
      experience: 8,
      appliedDaysAgo: 10,
      src: Debaleena,
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
      src: Manjeet,
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
      src: Priyansh,
      rounds: [
        { progress: 45, name: "Round 1", description: "Research Task" },
        { progress: 88, name: "Round 2", description: "Team Interview" },
      ],
      skillStack: 96,
      rank: 2,
    },
    {
      name: "Rahul",
      title: "Visual Designer",
      location: "Seattle",
      experience: 4,
      appliedDaysAgo: 3,
      src: Joe,
      rounds: [
        { progress: 55, name: "Round 1", description: "Technical" },
        { progress: 90, name: "Round 2", description: "HR Interview" },
      ],
      skillStack: 85,
      rank: 4,
    },
    {
      name: "Rohan",
      title: "Digital Designer",
      location: "Bieden",
      experience: 6,
      appliedDaysAgo: 4,
      src: Bieden,
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
      src: Rajan,
      rounds: [
        { progress: 70, name: "Round 1", description: "Technical" },
        { progress: 100, name: "Round 2", description: "Final Round" },
      ],
      skillStack: 48,
      rank: 6,
    },
    {
      name: "Priya",
      title: "Frontend Developer",
      location: "New York",
      experience: 5,
      appliedDaysAgo: 10,
      src: raj,
      rounds: [
        { progress: 60, name: "Round 1", description: "Technical" },
        { progress: 80, name: "Round 2", description: "HR Interview" },
      ],
      skillStack: 42,
      rank: 8,
    },
    {
      name: "Amit",
      title: "Backend Engineer",
      location: "San Francisco",
      experience: 7,
      appliedDaysAgo: 3,
      src: sundar,
      rounds: [
        { progress: 50, name: "Round 1", description: "Technical Coding" },
        { progress: 90, name: "Round 2", description: "System Design" },
      ],
      skillStack: 55,
      rank: 3,
    },
    {
      name: "Ranveer",
      title: "UI/UX Designer",
      location: "Chicago",
      experience: 6,
      appliedDaysAgo: 8,
      src: edwin,
      rounds: [
        { progress: 70, name: "Round 1", description: "Portfolio Review" },
        { progress: 100, name: "Round 2", description: "Design Challenge" },
      ],
      skillStack: 47,
      rank: 7,
    },
    {
      name: "Raju",
      title: "Full Stack Developer",
      location: "Austin",
      experience: 4,
      appliedDaysAgo: 5,
      src: joseph,
      rounds: [
        { progress: 60, name: "Round 1", description: "Coding Assessment" },
        { progress: 85, name: "Round 2", description: "Team Interview" },
      ],
      skillStack: 50,
      rank: 5,
    },
    {
      name: "Ravi",
      title: "Product Manager",
      location: "Los Angeles",
      experience: 10,
      appliedDaysAgo: 12,
      src: boy1,
      rounds: [
        { progress: 70, name: "Round 1", description: "Behavioral Interview" },
        { progress: 100, name: "Round 2", description: "Panel Discussion" },
      ],
      skillStack: 40,
      rank: 4,
    },
    {
      name: "Ranveer",
      title: "DevOps Engineer",
      location: "Seattle",
      experience: 9,
      appliedDaysAgo: 7,
      src: boy2,
      rounds: [
        { progress: 80, name: "Round 1", description: "Technical" },
        { progress: 100, name: "Round 2", description: "Final Interview" },
      ],
      skillStack: 60,
      rank: 2,
    },
    {
      name: "Meera",
      title: "Software Engineer",
      location: "Dallas",
      experience: 3,
      appliedDaysAgo: 14,
      src: girl1,
      rounds: [
        { progress: 50, name: "Round 1", description: "Online Test" },
        { progress: 75, name: "Round 2", description: "Technical Interview" },
      ],
      skillStack: 38,
      rank: 10,
    },
    {
      name: "Vikram",
      title: "Data Scientist",
      location: "Boston",
      experience: 6,
      appliedDaysAgo: 9,
      src: boy3,
      rounds: [
        { progress: 60, name: "Round 1", description: "Data Analysis Test" },
        {
          progress: 85,
          name: "Round 2",
          description: "ML Concepts Discussion",
        },
      ],
      skillStack: 52,
      rank: 5,
    },
    {
      name: "Roshni",
      title: "Content Strategist",
      location: "Denver",
      experience: 5,
      appliedDaysAgo: 11,
      src: girl2,
      rounds: [
        { progress: 70, name: "Round 1", description: "Writing Test" },
        { progress: 90, name: "Round 2", description: "Strategy Review" },
      ],
      skillStack: 45,
      rank: 9,
    },
    {
      name: "Arjun",
      title: "Cybersecurity Specialist",
      location: "Washington",
      experience: 8,
      appliedDaysAgo: 4,
      src: boy4,
      rounds: [
        {
          progress: 80,
          name: "Round 1",
          description: "Vulnerability Assessment",
        },
        { progress: 100, name: "Round 2", description: "Risk Management" },
      ],
      skillStack: 57,
      rank: 4,
    },
    {
      name: "Maya",
      title: "Cloud Architect",
      location: "Phoenix",
      experience: 9,
      appliedDaysAgo: 6,
      src: girl3,
      rounds: [
        {
          progress: 85,
          name: "Round 1",
          description: "Cloud Architecture Test",
        },
        { progress: 95, name: "Round 2", description: "System Design Review" },
      ],
      skillStack: 65,
      rank: 1,
    },
    {
      name: "Meenakshi",
      title: "Marketing Analyst",
      location: "San Diego",
      experience: 4,
      appliedDaysAgo: 13,
      src: girl4,
      rounds: [
        { progress: 60, name: "Round 1", description: "Data Analysis" },
        { progress: 80, name: "Round 2", description: "Marketing Strategy" },
      ],
      skillStack: 44,
      rank: 6,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [helpButton, setHelpButton] = useState(false);
  const gradientRef = useRef(null);
  const rotationRef = useRef(0);
  const [showGradient, setShowGradient] = useState(false);
  const [liylaHelp, setLiylaHelp] = useState(false);

  const candidatesPerPage = 6;
  const pageCount = Math.ceil(candidates.length / candidatesPerPage);

  const currentCandidates = candidates.slice(
    currentPage * candidatesPerPage,
    (currentPage + 1) * candidatesPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
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
    <div className="bg-[#F2F2F2] h-screen flex flex-col">
      {/* Navbar */}
      <Navbar assistant={Liyla} onLiylaActivate={toggleLiylaStatus} />

      {/* Company Description */}
      <div className="h-[200px] px-12 relative mt-[2%]">
        <div className="relative h-[90px]">
          <div className="h-[70%] w-full bg-gradient-to-b from-[#FEC4CB] via-[#F4C8EF] to-[#F4C8EF] rounded-[20px]"></div>
          <img
            src={Company}
            alt="Company Logo"
            className="absolute top-[70%] left-0 transform -translate-y-1/2"
          />
        </div>
        <div className="bg-white -mt-16 pb-2 rounded-[32px] rounded-t-none h-[160px] pt-[60px] pl-[40px] justify-between flex ">
          <div className="">
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
            </div>
          </div>
          <div className="self-end pb-4 pr-5">
            {helpButton ? (
              <div className={`relative w-[300px] h-[40px] mr-[14px] self-end`}>
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div
                    ref={gradientRef}
                    className="absolute inset-[-630%] "
                    style={{
                      background: `conic-gradient(from -62.75deg at 50.01% 48.12%, #5C9AFF -58.82deg, #5C9AFF 0.91deg, #3973E8 52.72deg, #2760DD 100.52deg, #1E57D7 168.35deg, #3873E1 210.22deg, #5290EB 251.44deg, #5C9AFF 301.18deg, #5C9AFF 360.91deg)`,
                      transform: "translateY(10%)",
                    }}
                  />
                </div>

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
      <div className="mt-[4rem] bg-[#F2F2F2]">
        <div className=" mx-[30px] ">
          <div className="h-full flex flex-wrap justify-center gap-[30px]  ">
            {currentCandidates.map((candidate, index) => (
              <Card
                key={index}
                index={index}
                candidate={candidate}
                showGradient={showGradient}
                onGradientComplete={handleGradientComplete}
                liylaHelp={liylaHelp}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="h-[10%] flex items-center bg-[#F2F2F2] py-8">
        <div className="ml-10 w-[50px] fixed bottom-5">
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
