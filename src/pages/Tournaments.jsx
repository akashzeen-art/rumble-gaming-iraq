import { useState } from 'react';
import GameCard from '../components/GameCard';
import { gamesData } from '../gamesData';
import t from '../i18n/ar';

const CATS = [
  { key: 'All',          label: t.filter_all },
  { key: 'Arcade',       label: t.filter_arcade },
  { key: 'Puzzle',       label: t.filter_puzzle },
  { key: 'Action',       label: t.filter_action },
  { key: 'Easy to Play', label: t.filter_easy },
  { key: 'Top 10',       label: t.filter_top10 },
];

const tournamentGames = [
  { name: 'Milk For Cat',      game_url: 'https://cdn.timepass.games/games/6ebe7cf6-cfec-4853-af8e-f2dabfb485e4/ef2d4959-a3e0-462a-a560-9317703d77b7/', thumbnail_url: 'https://cdn.timepass.games/images/9d29f79f-027f-46db-a7a4-f0712dbe6268.webp',          categories: ['All Games'] },
  { name: 'Pick it',           game_url: 'https://cdn.timepass.games/games/69f239ad-74ac-4518-b1df-6e4eb37a57a9/1d7ea5a8-8ff6-4d62-a3d6-a00a10ede072/', thumbnail_url: 'https://cdn.simpleviralgames.com/images/843d66a7-0a97-49cf-8392-ac817ab88b92.webp', categories: ['All Games'] },
  { name: 'Car Out',           game_url: 'https://cdn.timepass.games/games/1daf8d2c-f867-40ee-b72f-5c878a69bc7b/9ad8d834-cbce-479e-8e48-826c2db9b265/', thumbnail_url: 'https://cdn.simpleviralgames.com/images/aee481ae-9494-4097-b8e5-6c0b67724113.webp', categories: ['All Games'] },
  { name: '2048',              game_url: 'https://cdn.timepass.games/games/5a273870-0424-49a5-b485-68e7e73a7504/6229f31e-d835-4856-ab33-4cef07f3be5b/', thumbnail_url: 'https://cdn.timepass.games/images/d5914139-6ddb-4b6a-b198-ae4c49028530.webp',          categories: ['Top 10 Games','All Games','Puzzle'] },
  { name: 'Color Cannon',      game_url: 'https://cdn.timepass.games/games/4dcfd91b-3ff6-461b-b655-aab5013d05ef/1dd76b9f-1b48-4c2c-a948-c6d5156a32d7/', thumbnail_url: 'https://cdn.timepass.games/images/jktkaqinoy.webp',                                    categories: ['All Games','Easy to Play'] },
  { name: 'Space Shooter',     game_url: 'https://cdn.timepass.games/games/cfc03ecd-e59d-4b96-851c-984b2afc9cdd/b5530b1d-8811-49e8-8c62-a6e94408272b/', thumbnail_url: 'https://cdn.timepass.games/images/00b6cfcd-e5ce-4c17-a489-4e4e86851b98.webp',          categories: ['All Games'] },
  { name: 'Hero Rescue',       game_url: 'https://cdn.timepass.games/games/b2586f6b-3e72-4e8d-ba03-90ba510ef2fa/52c75446-c4b3-473b-9a04-c9c760c4e2cb/', thumbnail_url: 'https://cdn.simpleviralgames.com/images/5ba6a5c4-e09e-4732-879f-ef0259c71b8b.webp', categories: ['All Games'] },
  { name: 'Make7',             game_url: 'https://cdn.timepass.games/games/4004da42-84ca-4fa6-8db9-e24a1a248031/6b75e397-26d1-4cac-8e71-174632c807de/', thumbnail_url: 'https://cdn.timepass.games/images/932faa9d-df03-427d-ab87-29e38437f188.webp',          categories: ['All Games'] },
  { name: 'Pixel Brick Breaker',game_url:'https://cdn.timepass.games/games/197b2d64-9d1c-475f-8b7f-b06c55a54ed7/2d564def-b895-478d-aebc-ef89724bd260/', thumbnail_url: 'https://cdn.timepass.games/images/b35ed56d-72bd-46fb-86b1-2b7cbfd05572.webp',          categories: ['All Games'] },
  { name: 'Blocky',            game_url: 'https://cdn.timepass.games/games/4477ab03-2d5c-48e0-a629-4e1ec0966493/166e3664-52c2-4879-b386-9df154803599/', thumbnail_url: 'https://cdn.timepass.games/images/95d88209-f3ad-43d2-aa1c-9421b419058c.webp',          categories: ['All Games'] },
  { name: 'Image Quiz',        game_url: 'https://cdn.timepass.games/games/320437db-59f5-4f7a-ba61-714d2712dfb0/29ad9a7a-7fa3-4493-89ff-323329ed4f4b/', thumbnail_url: 'https://cdn.timepass.games/images/c3b1807a-18a6-4d35-8999-1c47f7083012.webp',          categories: ['All Games'] },
  { name: 'Polygami',          game_url: 'https://cdn.timepass.games/games/aafe7145-7061-48ff-813b-a8bc5a6370b1/f4ef272e-8e8d-43ba-aabc-1b8dbeeabb7b/', thumbnail_url: 'https://cdn.timepass.games/images/6a8af6d6-9e99-4fab-b647-d5ee0a927171.webp',          categories: ['All Games'] },
  { name: 'Pop Us 3D',         game_url: 'https://cdn.timepass.games/games/ef6644b1-f9ba-4fe5-ae33-05b26b8b7671/e3adf6e5-09fb-4068-ada3-3d65f3cd0e1f/', thumbnail_url: 'https://cdn.timepass.games/images/d4a21b20-7b5a-4e2e-b342-cbedede6a63b.webp',          categories: ['All Games'] },
  { name: 'Stack It',          game_url: 'https://cdn.timepass.games/games/553d8d1c-2679-4903-9923-90eb0593f195/6493c988-fc99-4204-9c5b-39c3308fc07b/', thumbnail_url: 'https://cdn.simpleviralgames.com/images/bf3ab094-42e4-459a-b6df-632450a24967.webp', categories: ['All Games'] },
  { name: 'Santa Chase',       game_url: 'https://cdn.timepass.games/games/b69648bb-3433-403d-8ef7-0486b77cbab3/eaf0988d-ff31-4a4f-a823-da6190ef044c/', thumbnail_url: 'https://cdn.timepass.games/images/ea4395b2-a95b-4833-beec-342944c707ae.webp',          categories: ['All Games'] },
  { name: 'Word Swipe',        game_url: 'https://cdn.timepass.games/games/22ba6a71-ab9b-422d-92d5-d3b072f65a02/c687dc73-6b29-4b55-8814-d385e442de49/', thumbnail_url: 'https://cdn.timepass.games/images/03c0db20-09b3-4afb-b04b-f4f7dfd7a56f.webp',          categories: ['All Games'] },
  ...gamesData.filter(g => g.categories.includes('Arcade')).slice(0, 8),
  ...gamesData.filter(g => g.categories.includes('Puzzle')).slice(0, 8),
  ...gamesData.filter(g => g.categories.includes('Action')).slice(0, 8),
];

// deduplicate by name
const seen = new Set();
const allTournamentGames = tournamentGames.filter(g => {
  if (seen.has(g.name)) return false;
  seen.add(g.name);
  return true;
});

export default function Tournaments() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? allTournamentGames
    : activeFilter === 'Top 10'
    ? allTournamentGames.filter(g => g.categories.includes('Top 10 Games'))
    : allTournamentGames.filter(g => g.categories.includes(activeFilter));

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <h1 className="font-heading text-4xl lg:text-5xl font-black uppercase mb-2">{t.tourn_hero}</h1>
        <p className="font-body text-lg opacity-80">{t.tourn_sub}</p>
      </div>

      {/* Filter bar */}
      <div className="bg_hue_4_start py-3 px-4 sticky top-0 z-40">
        <div className="lg:container lg:mx-auto flex flex-wrap gap-2 justify-center">
          {CATS.map(f => (
            <button key={f.key} onClick={() => setActiveFilter(f.key)}
              className={`font-heading font-bold text-sm uppercase px-4 py-1 rounded-full border-2 transition-colors ${
                activeFilter === f.key
                  ? 'bg_hue_1_start border_hue_1_start font_main'
                  : 'border_hue_1_start font_hue_1_start hover:bg_hue_1_start hover:text-white'
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="lg:container lg:px-4 lg:mx-auto px-3 py-6">
        <p className="font-body text-sm grey_font mb-4 text-center">{t.tourn_count(filtered.length)}</p>
        <div className="quest-grid">
          {filtered.map((g, i) => (
            <GameCard key={`${g.name}-${i}`} game={g}
              borderClass="border_hue_1_start"
              btnBgClass="bg_hue_2_start"
              textClass="hue_2_fontcol"
              titleClass="font_hue_4_start" />
          ))}
        </div>
      </div>
    </>
  );
}
