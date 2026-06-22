import { useState } from 'react';
import { Link } from 'react-router-dom';
import PromoBanner from '../components/PromoBanner';
import GameCard from '../components/GameCard';
import XpModal from '../components/XpModal';
import { newestGames } from '../data';
import { useTranslation } from '../i18n';

// ── QuickPlay section games (unique) ─────────────────────────────────────
const quickPlayGames = [
  { name: 'Racoon Rescue', game_url: 'https://cdn.timepass.games/games/8a31626c-daea-47ef-8112-ec3388960b10/cee72dd3-bc59-4305-8876-51abc46360c5/', thumbnail_url: 'https://cdn.timepass.games/images/qawbgrinzp.webp', categories: ['Top 10 Games','All Games','Action'] },
  { name: 'Fantasy Forest', game_url: 'https://cdn.timepass.games/games/a640e65e-f8cf-45ed-904b-6f95e125c358/699be819-8b88-4e6d-a042-c3c0f5bcfc62/', thumbnail_url: 'https://cdn.timepass.games/images/xvmhylbhxe.webp', categories: ['All Games','Easy to Play','Puzzle'] },
  { name: 'Dig The Way Up', game_url: 'https://cdn.timepass.games/games/2bb41d75-521a-4905-bfde-819db24e353f/87afae6f-005d-4366-8a17-d96ab07673e6/', thumbnail_url: 'https://cdn.timepass.games/images/bfjgemfozs.webp', categories: ['Top 10 Games','All Games','Easy to Play','Puzzle'] },
  { name: 'Word Game', game_url: 'https://cdn.timepass.games/games/538ff814-69c1-4bea-a072-a2ca6504ff95/26254883-f4c0-4fdc-bc15-6f58e15c9c06/', thumbnail_url: 'https://cdn.simpleviralgames.com/images/d6757053-2cc4-45cf-89aa-bbe21f215f2c.webp', categories: ['All Games','Easy to Play','Puzzle'] },
  { name: 'Stack Builder', game_url: 'https://cdn.timepass.games/games/fe35e910-31a9-4759-abdb-5549ad5feb7f/402bbc3a-3ebf-4e0f-8c0a-1f4367315c98/', thumbnail_url: 'https://cdn.timepass.games/images/cf9f42e4-d560-4c9a-8b49-ae5ad4a52daf.webp', categories: ['All Games','Easy to Play','Arcade'] },
];

// ── Contests section games (unique) ───────────────────────────────────────
const contestGames = [
  { name: 'Wordplay',          game_url: 'https://cdn.timepass.games/games/c219bbd2-f21b-43aa-a873-3e619091296b/5cd0efc6-bfb6-4520-a6c8-e833a0b1139c/', thumbnail_url: 'https://cdn.timepass.games/images/pcsyxfdvpy.webp',                                    categories: ['All Games','Easy to Play'] },
  { name: 'Archery',           game_url: 'https://cdn.timepass.games/games/18afb0ff-5ea9-40fe-8c27-83a010d011fd/00c78c6f-8563-4b18-ad43-e39fb1e9e76a/', thumbnail_url: 'https://cdn.timepass.games/images/2f9ea5d0-a8ea-4a37-81fc-9c90986759c6.webp',          categories: ['All Games'] },
  { name: 'Monster Destroyer', game_url: 'https://cdn.timepass.games/games/c285d0da-08e0-48a8-a212-fb86d39af22a/ab83604a-544e-46cd-b4a1-17dd6498bf03/', thumbnail_url: 'https://cdn.timepass.games/images/d9f27984-22be-494f-aec4-99f95acf09b6.webp',          categories: ['All Games'] },
  { name: 'Small Archer',      game_url: 'https://cdn.timepass.games/games/6650a506-2f5e-4040-b4c6-bd8658489564/34887794-3580-45bd-a938-8353d0edd889/', thumbnail_url: 'https://cdn.timepass.games/images/87d1db02-194e-49f8-a773-fc49ad2d7b7f.webp',          categories: ['All Games'] },
  { name: 'Piggy Night',       game_url: 'https://cdn.timepass.games/games/366755e9-05d7-48e2-a926-5d6577772d3f/2a61e7a4-a516-4a60-ac81-44ae877767cf/', thumbnail_url: 'https://cdn.simpleviralgames.com/images/459d5e9e-1385-449b-bf8a-3601e027c7ed.webp', categories: ['All Games'] },
];

// ── Quest Games section games (unique) ────────────────────────────────────
const questGames = [
  { name: 'Word Search 2',       game_url: 'https://cdn.timepass.games/games/cd325bd8-f518-4a47-b5b5-8260d49b7a64/b6355aec-ef96-4008-a695-eb2663869d5b/', thumbnail_url: 'https://cdn.timepass.games/images/96fcf343-0f18-47e9-8e97-db78351bd40c.webp', categories: ['Top 10 Games','All Games','Easy to Play','Puzzle'] },
  { name: 'Path Control',        game_url: 'https://cdn.timepass.games/games/7cf88aaf-ff21-4ddf-8151-8cefe72374a4/da389ea3-a94a-473b-85b6-ff65d2595ace/', thumbnail_url: 'https://cdn.timepass.games/images/dibafecjwc.webp', categories: ['All Games','Easy to Play','Puzzle'] },
  { name: 'Rope Bawling',        game_url: 'https://cdn.timepass.games/games/c87d3aef-358a-4db1-9543-f31f40144236/22519678-ead9-423c-84c6-e40bdb7d01d6/', thumbnail_url: 'https://cdn.timepass.games/images/chafyrtssj.webp', categories: ['All Games','Easy to Play','Arcade'] },
  { name: 'Water Sort 2',        game_url: 'https://cdn.timepass.games/games/d4f51a91-ac7d-4e51-8743-aeb04aa785cc/77699e88-698d-4be3-ac00-cfff056485c9/', thumbnail_url: 'https://cdn.simpleviralgames.com/images/8bcbaffc-36b7-49a9-8a6e-4ee911a9290d.webp', categories: ['Top 10 Games','All Games','Puzzle'] },
  { name: 'Happy Filled Glass 3',game_url: 'https://cdn.timepass.games/games/8e40178e-2457-4dc1-ae60-add884f03f54/7f463157-8984-48fe-86e7-467047a4746b/', thumbnail_url: 'https://cdn.timepass.games/images/f804e254-5946-4ee3-b400-a4d4cd4eafa3.webp', categories: ['Top 10 Games','All Games','Puzzle'] },
  { name: 'Filled Glass',        game_url: 'https://cdn.timepass.games/games/39b82257-d32b-4635-ab73-e338e7092e3b/d0cf5ca1-f0f5-44a9-8a12-aa0f9985e320/', thumbnail_url: 'https://cdn.timepass.games/images/tpbgwvlcek.webp', categories: ['All Games','Easy to Play','Puzzle'] },
  { name: 'Zombie Crusher',      game_url: 'https://cdn.timepass.games/games/9cac2c11-67b6-4303-891a-f3c5fe9d4b03/a15f234b-2818-4ea1-91d9-1f8e30e5a396/', thumbnail_url: 'https://cdn.timepass.games/images/ebf2dbe2-7ecc-463a-a844-946bb4b275b4.webp', categories: ['All Games','Easy to Play','Action'] },
  { name: 'Soccer Free Kick',    game_url: 'https://cdn.timepass.games/games/7fef838f-cb11-4296-b289-d1b44236a66c/d85f3049-c241-4204-a045-9df040dd7137/', thumbnail_url: 'https://cdn.timepass.games/images/lcxgyvpymf.webp', categories: ['All Games','Easy to Play','Action'] },
  { name: 'Coloured Water And Pin', game_url: 'https://cdn.timepass.games/games/1cf52380-4aa2-40a1-b255-d76e8f99c920/48a669cb-d918-4672-ad3b-be0ea0eb7bc1/', thumbnail_url: 'https://media.simpleviralgames.com/images/swtnvgdxne.webp', categories: ['All Games','Easy to Play'] },
  { name: 'Flappy UFO',          game_url: 'https://cdn.timepass.games/games/bc249551-0bce-46d0-9760-3d249d2db2c9/e7c52d5c-d943-4662-9fe8-8607751dcaac/', thumbnail_url: 'https://cdn.timepass.games/images/f9d2fe90-da86-4c3f-8da0-179e6a8fefeb.webp', categories: ['All Games','Easy to Play','Action'] },
];

function SectionDivider({ showArrow = true, mb = 'mb-6' }) {
  return (
    <div className={`relative ${mb}`}>
      <div className="divider w-full mb-16 h-2 absolute -mt-2 z-20">
        {showArrow && <span className="dividerArrow -m-8 absolute z-min1 w-0 h-0 bottom-0 inset-x-0 mx-auto lg:block"></span>}
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const [xpOpen, setXpOpen] = useState(false);

  return (
    <>
      {xpOpen && <XpModal onClose={() => setXpOpen(false)} />}

      {/* Promo Banner */}
      <PromoBanner />

      {/* Divider */}
      <div className="relative mb-0">
        <div className="divider w-full mb-6 h-2 absolute -mt-2 z-20"></div>
      </div>

      {/* ── Newest Games ── */}
      <div className="w-full bg_hue_4_start pb-6">
        <div className="mb-5 lg:container lg:px-4 lg:mx-auto select-none pl-3 pr-3">
          <Link to="/games">
            <h1 className="text-3xl font-bold text-center font-heading leading-3 pt-8 px-2 font_main">{t.home_newest}</h1>
            <p className="text-base font-medium text-center font-body mb-4 mx-2 font_main"></p>
          </Link>
          <div className="relative mx-0 sm:mx-8">
            <div className="scroll-row">
              {newestGames.map((g, i) => (
                <GameCard key={i} game={g} borderClass="border_spot_start" btnBgClass="bg_spot_start" textClass="spot_fontcol" titleClass="text-black" />
              ))}
            </div>
            <div className="flex flex-row justify-center mx-auto text-center lg:hidden mt-2">
              <div className="block focus:outline-none font_hue_1_start mx-1">
                <i className="fas fa-circle text-base"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider showArrow={true} mb="mb-6" />

      {/* ── Contests ── */}
      <div className="w-full">
        <div className="w-full xl:w-9/12 sm:px-0 sm:pr-2 md:px-0 md:pr-2 lg:px-4 sm:mx-auto">
          <Link to="/tournaments">
            <h1 className="text-3xl font-bold text-center font-heading leading-3 pt-8 px-2 darklight_fontcol">{t.home_contests}</h1>
            <p className="text-base font-medium text-center font-body mb-2 px-2 darklight_fontcol">{t.home_contests_sub}</p>
          </Link>
          <div className="w-full pb-0 md:pb-5 pl-3 pr-3 lg:mx-auto">
            <div className="relative mx-0">
              <div className="scroll-row">
                {contestGames.map((g, i) => (
                  <GameCard key={i} game={g}
                    borderClass="border_hue_1_start"
                    btnBgClass="bg_hue_2_start"
                    textClass="hue_2_fontcol"
                    titleClass="font_hue_4_start" />
                ))}
              </div>
              <div className="flex flex-row justify-center mx-auto text-center mt-2">
                <Link to="/tournaments">
                  <div className="block focus:outline-none font_hue_1_start mx-1 font-body font-semibold">
                    <i className="fas fa-angle-double-right"></i> {t.home_viewMore} <i className="fas fa-angle-double-left"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider showArrow={true} mb="mb-20" />

      {/* ── Quest Games ── */}
      <div className="mb-5 lg:container lg:px-4 lg:mx-auto select-none pl-3 pr-3">
        <Link to="/games">
          <h1 className="text-3xl font-bold text-center font-heading leading-3 mt-8 px-2 darklight_fontcol">{t.home_quest}</h1>
          <p className="text-base font-medium text-center font-body mb-4 mx-2 darklight_fontcol">{t.home_quest_sub}</p>
        </Link>
        <div className="relative mx-0 sm:mx-8">
          <div className="quest-grid">
            {questGames.map((g, i) => (
              <GameCard key={i} game={g} borderClass="border_spot_start" btnBgClass="bg_spot_start" textClass="spot_fontcol" titleClass="darklight_fontcol" />
            ))}
          </div>
          <div className="flex flex-row justify-center mx-auto text-center mt-4">
            <Link to="/games">
              <div className="block focus:outline-none font_spot_start mx-1 font-body font-semibold">
                <i className="fas fa-angle-double-right"></i> {t.home_viewMore} <i className="fas fa-angle-double-left"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <SectionDivider showArrow={true} mb="mb-20" />

      {/* ── QuickPlay ── */}
      <div className="mb-5 lg:container lg:px-4 lg:mx-auto select-none">
        <Link to="/quickplay">
          <h1 className="text-3xl font-bold text-center font-heading leading-3 mt-8 px-2 darklight_fontcol">{t.home_quickplay}</h1>
          <p className="text-base font-medium text-center font-body mb-4 mx-2 darklight_fontcol">{t.home_quickplay_sub}</p>
        </Link>
        <div className="relative mx-0 sm:mx-8">
          <div className="scroll-row">
            {quickPlayGames.map((g, i) => (
              <GameCard key={i} game={g} borderClass="border_hue_1_start" btnBgClass="bg_hue_2_start" textClass="hue_2_fontcol" titleClass="darklight_fontcol" />
            ))}
          </div>
          <div className="flex flex-row justify-center mx-auto text-center mt-2">
            <Link to="/quickplay">
              <div className="block focus:outline-none font_hue_1_start mx-1 font-body font-semibold">
                <i className="fas fa-angle-double-right"></i> {t.home_viewMore} <i className="fas fa-angle-double-left"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
