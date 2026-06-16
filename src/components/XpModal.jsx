import { AWARDS_FLAG_L, AWARDS_FLAG_R } from '../data';

export default function XpModal({ onClose }) {
  return (
    <div id="xpDetailsModal" className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div role="dialog" aria-modal="true" aria-labelledby="modal-headline"
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 lg:my-0 sm:align-middle max-w-xl w-full">
          <span onClick={onClose}
            className="absolute top-0 right-0 text-gray-700 text-4xl leading-none px-2 float-right font-bold no-underline hover:text-black hover:cursor-pointer">
            ×
          </span>
          <div className="bg-white px-8 pb-4 sm:p-6 sm:pb-4">
            <div className="relative">
              <div className="flex flex-row">
                <div className="w-2/6">
                  <img src={AWARDS_FLAG_L} alt="" className="w-9/12 my-3 pl-0 greyScale90 float-right lg:pl-6" />
                </div>
                <div className="flex-10 flex w-2/6 items-bottom">
                  <div className="flex flex-col flex-1">
                    <p className="font-heading font-black font_hue_1_start uppercase text-xl text-center mb-3 mx-2 my-5">
                      Unlock XP
                    </p>
                  </div>
                </div>
                <div className="w-2/6">
                  <img src={AWARDS_FLAG_R} alt="" className="w-9/12 my-3 pr-0 greyScale90 lg:pr-6" />
                </div>
              </div>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="mt-2 w-full text-base">
                  <ul className="list-disc">
                    <li>Complete Game Quests</li>
                    <li>Complete Site Tutorial Tasks</li>
                    <li>Earn 10 XP when entering a PvP Clash (Limit to 10 per week)</li>
                    <li>Earn 10 XP when entering a Contest (Limit to 5 per week)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:justify-center">
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto sm:mx-4">
              <button type="button" onClick={onClose}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Close
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
