import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

const Card = ({
  index,
  candidate,
  showGradient,
  onGradientComplete,
  liylaHelp,
}) => {
  const [isGradientVisible, setIsGradientVisible] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const gradientRef = useRef(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    let animationFrame;
    if (showGradient) {
      setIsGradientVisible(true);
      setShowRecommendation(false);

      const rotateGradient = () => {
        if (gradientRef.current) {
          rotationRef.current = (rotationRef.current - 8) % 360;
          gradientRef.current.style.transform = `translateY(10%) rotate(${rotationRef.current}deg)`;
        }
      };

      animationFrame = requestAnimationFrame(function animate() {
        rotateGradient();
        animationFrame = requestAnimationFrame(animate);
      });

      const timer = setTimeout(() => {
        setIsGradientVisible(false);
        setShowRecommendation(true);
        if (onGradientComplete) {
          onGradientComplete();
        }
      }, 5000);

      return () => {
        cancelAnimationFrame(animationFrame);
        clearTimeout(timer);
      };
    }
  }, [showGradient, onGradientComplete]);

  const generateDots = (progress) => {
    const totalDots = 10;
    const fullDotsCount = Math.floor((progress / 100) * totalDots);
    const hasHalfDot = progress % 10 >= 5;

    return Array.from({ length: totalDots }, (_, index) => {
      if (index < fullDotsCount) {
        return {
          background: "#0071db",
          boxShadow: "0px 0px 8px rgba(0, 113, 219, 0.4)",
        };
      }
      if (index === fullDotsCount && hasHalfDot) {
        return {
          background:
            "linear-gradient(to top left, #004a9f, #0071db, rgba(0, 113, 219, 0.2), #d9d9d9)",
          boxShadow: "0px 0px 8px rgba(0, 113, 219, 0.3)",
        };
      }
      return { background: "#d9d9d9" };
    });
  };

  const getDotPosition = (index, radius = 31) => {
    const angle = ((2.5 - index) / 10) * 2 * Math.PI;
    return {
      left: `${Math.round(radius + radius * Math.cos(angle))}%`,
      top: `${Math.round(radius - radius * Math.sin(angle))}%`,
    };
  };

  const calculateAverageProgress = (rounds) => {
    const totalProgress = rounds.reduce(
      (sum, round) => sum + round.progress,
      0
    );
    return Math.round(totalProgress / rounds.length);
  };

  return (
    <div
      className={`w-full md:w-[48%] lg:w-[48%] border border-white bg-white rounded-[24px] py-[16px] px-[24px]  relative overflow-hidden`}
      style={{ direction: "ltr" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0px 4px 3px rgba(0, 114, 220, 0.3)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {isGradientVisible && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={gradientRef}
            className="absolute inset-[-630%] origin-center"
            style={{
              background: `conic-gradient(from -62.75deg at 50.01% 48.12%, #5C9AFF -58.82deg, #5C9AFF 0.91deg, #3973E8 52.72deg, #2760DD 100.52deg, #1E57D7 168.35deg, #3873E1 210.22deg, #5290EB 251.44deg, #5C9AFF 301.18deg, #5C9AFF 360.91deg)`,
              opacity: 0.8, // Adjust this value to fine-tune opacity
            }}
          />
        </div>
      )}
      <div
        className={`relative z-10 flex flex-col gap-[32px] ${
          isGradientVisible ? "text-gray-800" : "text-black"
        }`}
      >
        <div className="flex flex-col justify-between gap-[40px]">
          <div>
            <div
              className={`flex border-b border-[#B9B9B9]  ${
                showRecommendation && [1, 2, 3].includes(candidate.rank)
                  ? "pb-4"
                  : "pb-[18px]"
              }`}
            >
              <figure className="w-[48px] h-[48px]">
                <img
                  src={candidate.src}
                  alt={candidate.name}
                  className="w-full h-full object-cover rounded-full shadow-inner grayscale-0"
                />
              </figure>
              <div className="ml-4 flex justify-between w-[90%]">
                <div>
                  <p
                    className={`text-[16px] font-bold  ${
                      isGradientVisible ? "text-slate-300" : "text-[#1E1E1E]"
                    }`}
                  >
                    {candidate.name}
                  </p>
                  <p
                    className={` text-[12px] ${
                      isGradientVisible ? "text-slate-300" : "text-[#6F6F6F]"
                    }`}
                  >
                    {candidate.title} at {candidate.location}
                  </p>
                  <p
                    className={` ${
                      isGradientVisible ? "text-slate-300" : "text-[#6F6F6F]"
                    } text-[12px]`}
                  >
                    {candidate.experience} years experience
                  </p>
                  {showRecommendation && liylaHelp && (
                    <div>
                      {[1, 2, 3].includes(candidate.rank) && (
                        <div
                          className={`text-[12px] font-semibold text-white  ${
                            isGradientVisible
                              ? "text-[#0072DC] bg-slate-300"
                              : "text-white bg-lyla-gradient"
                          } flex justify-center items-center rounded-full py-[4px] px-[8px] my-1  shadow-[0px_0px_4px_0px_#C9FFFC]`}
                        >
                          LIYLA RECOMMENDED
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div
                  className={`py-[8px] px-[4px] w-[64px]  rounded-[12px] gap-[6px] flex flex-col items-center justify-center ${
                    isGradientVisible ? "bg-slate-300 " : "bg-[#55557C]"
                  }`}
                >
                  <p
                    className={` text-[14px] font-[300] ${
                      isGradientVisible ? "text-[#0072DC]" : "text-white"
                    }`}
                  >
                    RANK
                  </p>
                  <p
                    className={`${
                      isGradientVisible ? "text-[#0072DC]" : "text-white"
                    } text-[28px] font-bold`}
                  >
                    {candidate.rank}
                  </p>
                </div>
              </div>
            </div>
            <div className=" relative">
              <div className="flex justify-between py-[8px] px-[16px]">
                {candidate.rounds.map((round, roundIndex) => (
                  <div key={roundIndex} className="relative text-center">
                    <div className="flex justify-center ml-[10px] mb-[23px]">
                      <p
                        className={`mt-2 text-[12px] ${
                          isGradientVisible
                            ? "text-slate-300"
                            : "text-[#6F6F6F]"
                        }`}
                      >
                        {round.name}
                      </p>
                    </div>
                    <div className="relative w-[63px] h-[61px] mx-auto">
                      {generateDots(round.progress).map((style, index) => (
                        <div
                          key={index}
                          className="absolute w-[12px] h-[12px] rounded-full"
                          style={{
                            ...style,
                            ...getDotPosition(index, 50),
                          }}
                        />
                      ))}
                      <div className="absolute inset-0 flex items-center justify-center ml-[10px] mt-[15px]">
                        <p
                          className={`${
                            isGradientVisible
                              ? "text-slate-300"
                              : "text-[#6F6F6F]"
                          } font-semibold`}
                        >
                          {round.progress}%
                        </p>
                      </div>
                    </div>
                    <p
                      className={`${
                        isGradientVisible ? "text-slate-300" : "text-[#6F6F6F]"
                      } font-semibold mt-[23px] ml-[10px] text-[12px]`}
                    >
                      {round.description}
                    </p>
                  </div>
                ))}
                <div className="flex flex-col justify-between mt-2 items-center">
                  <p
                    className={`${
                      isGradientVisible ? "text-slate-300" : "text-[#6F6F6F]"
                    }`}
                  >
                    Total
                  </p>
                  <p
                    className={`text-[40px]  ${
                      isGradientVisible ? "text-slate-300" : "text-[#24DF3A]"
                    } font-semibold`}
                  >
                    {calculateAverageProgress(candidate.rounds)}%
                  </p>
                  <div className="justify-center flex">
                    <p
                      className={`font-semibold ${
                        isGradientVisible ? "text-slate-300" : "text-[#6F6F6F]"
                      }`}
                    >
                      Cumulative score
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-2 justify-between items-center">
                  <p
                    className={`${
                      isGradientVisible
                        ? "text-slate-300"
                        : "bg-skill-gradient bg-clip-text text-transparent"
                    } `}
                  >
                    Score
                  </p>
                  <p
                    className={`text-[40px] font-semibold ${
                      isGradientVisible
                        ? "text-slate-300"
                        : "bg-skill-gradient bg-clip-text text-transparent"
                    }`}
                  >
                    {candidate.skillStack}
                  </p>
                  <div className="justify-center flex items-end ">
                    <p
                      className={`font-semibold  ${
                        isGradientVisible
                          ? "text-slate-300"
                          : "bg-skill-gradient bg-clip-text text-transparent"
                      }`}
                    >
                      Skill Stack
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-[9px]">
            <p
              className={`font-semibold text-[12px] border-2  rounded-full h-[28px] w-[86px] flex items-center justify-center cursor-pointer shadow-[0px_0px_4px_0px_#00000040] ${
                isGradientVisible
                  ? "text-slate-300 border-slate-300"
                  : "text-[#0072DC] border-[#0072DC]"
              }`}
            >
              View more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  index: PropTypes.number.isRequired,
  candidate: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    rounds: PropTypes.arrayOf(
      PropTypes.shape({
        progress: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    skillStack: PropTypes.number.isRequired,
  }).isRequired,
  showGradient: PropTypes.bool.isRequired,
  onGradientComplete: PropTypes.func,
  liylaHelp: PropTypes.bool,
};

export default Card;
