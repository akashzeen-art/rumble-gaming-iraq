export default function PromoBanner() {
  return (
    <div className="mx-auto relative" style={{ direction: 'ltr' }}>
      <div className="relative">
        {/* Banner image - NOT clickable */}
        <img src="/LudoBanner.jpg" className="w-full block sm:block" alt="Ludo Banner" />

        {/* Text overlay */}
        <div className="absolute left-0 top-0 h-full w-full sm:w-5/12 flex flex-row">
          <div className="w-full sm:w-10/12 bg-black bg-opacity-40 sm:bg-opacity-60 rounded-none h-full pl-2 sm:pl-4 md:pl-12">
            <div id="text-on-banner" className="flex flex-col h-full sm:h-auto z-10 sm:relative sm:top-0 justify-center sm:justify-start">
              <div className="flex w-full justify-center sm:justify-start mx-0 items-start">
                <h2
                  className="uppercase font-bold font-heading leading-tight h-auto text-4xl pl-4 md:pl-0 lg:text-6xl xl:text-7xl truncate-2-lines lg:truncate-1-line pt-2 sm:pt-2 md:pt-2 lg:pt-6 text-center md:text-left sm:mt-1 md:mt-2 overflow-hidden mb-0 md:mb-2 lg:mb-0"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.3)',
                  }}
                >
                  Play Ludo
                </h2>
              </div>
              <div className="hidden lg:block">
                <p className="font-body font_main w-full mb-2 lg:py-1 sm:text-xs md:text-sm lg:text-xl truncate-2-lines"></p>
              </div>
            </div>
          </div>
          <div
            className="hidden sm:block relative right-0 top-0 h-full w-2/12"
            style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.55), transparent)' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
