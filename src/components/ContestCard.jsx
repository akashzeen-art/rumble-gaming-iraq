import { Link } from 'react-router-dom';

export default function ContestCard({ contest }) {
  return (
    <div className="contest-card-wrap card-hover">
      <Link to={`/tournament/${contest.slug}/${contest.id}`}>
        <div className="rounded-2xlg overflow-hidden border_hue_1_start relative z-10 border-3 lg:border-4 bg-white">
          <div className="relative">
            <img src={contest.img} alt={contest.name} className="w-full mx-auto object-cover" />
          </div>
          <div className="text-center relative h-14 lg:h-16 flex justify-center mt-1 lg:mt-4">
            <h2 className="uppercase font-bold font-heading text-center text-base px-1 lg:text-xl leading-4 lg:leading-6 pt-2 lg:pt-1 h-5 lg:h-5 overflow-hidden lg:w-full lg:p-2 lg:pb-0 truncate-1-line font_hue_4_start">
              {contest.name}
            </h2>
            <p className="flex flex-row justify-center mx-auto font-body text-center bg_hue_1_with_transparency rounded-lg w-11/12 lg:w-4/5 mb-2 absolute bottom-0 right-0 left-0 items-center">
              {contest.badge === 'members' && (
                <span className="memberAccessText font-heading font-bold text-lg leading-4 pt-2 font_hue_4_start">Members Access</span>
              )}
              {contest.badge === 'free' && (
                <>
                  <span className="font_hue_1_start px-1 font-black">
                    <img src={contest.freeIcon} className="w-6 inline-block" alt="" />
                  </span>
                  <span className="font-heading font-bold text-lg leading-4 pt-2 font_hue_4_start">Free</span>
                </>
              )}
              {contest.badge === 'cost' && (
                <>
                  <span className="font-heading font-bold text-lg leading-4 pt-2 font_hue_4_start">Cost</span>
                  <span className="font_hue_1_start px-1">
                    <img src={contest.costIcon} className="w-6 inline-block" alt="" />
                  </span>
                  <span className="font-heading font-bold text-xl leading-4 pt-2 font_hue_4_start">{contest.cost}</span>
                </>
              )}
            </p>
          </div>
          <div className="font-body text-left md:text-center uppercase pl-2 mx-auto bg_hue_1_start hue_1_fontcol font-bold relative lg:mt-4">
            <div className="flex flex-row justify-center">
              <span className="-mt-2 md:-mt-3 lg:-mt-4 -ml-4">
                <img src={contest.prizeImg} alt="Prize" className="w-8 md:w-10 lg:w-12 p-1 mr-1" />
              </span>
              <p className="text-sm md:text-lg font_main">{contest.prize}</p>
            </div>
          </div>
        </div>
      </Link>
      <Link to="/login">
        <div className="flex flex-row w-16/20 mx-auto justify-center rounded-b-3xl bg_hue_2_start -mt-5 pt-5 lg:pt-6 pb-1 lg:pb-0 px-2 relative z-5">
          <div className="flex content-center pb-1 text-xs font_main font-body mt-auto">
            <p className="hue_2_fontcol text-center uppercase font-black font-heading leading-1 lg:leading-5 pt-4 text-xl lg:text-3xl font-semibold cursor-pointer">
              Play Now
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
