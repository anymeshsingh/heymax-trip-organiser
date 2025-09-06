"use client";

import { PrimaryButton } from '@repo/ui/primaryButton';

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col w-full max-w-md min-h-screen px-2">
        <div className="flex-1 overflow-y-auto px-4 pt-10">
          
          {/* Airline Logos Grid - 4 in first row, 3 in second row */}
          <div className="mb-10 flex flex-col items-center">
            <div className="flex w-full justify-evenly mb-4">
              <div className="w-[70px] h-[70px] rounded-2xl bg-red-600 flex justify-center items-center">
                <img className="w-full h-full rounded-2xl object-contain" src="/airlines/airline1.png" alt="AirAsia" />
              </div>
              <div className="w-[70px] h-[70px] rounded-2xl bg-purple-900 flex justify-center items-center">
                <img className="w-full h-full rounded-2xl object-contain" src="/airlines/airline2.png" alt="Qatar" />
              </div>
              <div className="w-[70px] h-[70px] rounded-2xl bg-white flex justify-center items-center">
                <img className="w-full h-full rounded-2xl object-contain" src="/airlines/airline3.png" alt="Cathay" />
              </div>
              <div className="w-[70px] h-[70px] rounded-2xl bg-blue-500 flex justify-center items-center">
                <img className="w-full h-full rounded-2xl object-contain" src="/airlines/airline4.jpg" alt="Singapore" />
              </div>
            </div>
            <div className="flex w-3/4 justify-evenly">
              <div className="w-[70px] h-[70px] rounded-2xl bg-blue-500 flex justify-center items-center">
                <img className="w-full h-full rounded-2xl object-contain" src="/airlines/airline4.jpg" alt="Singapore Alt" />
              </div>
              <div className="w-[70px] h-[70px] rounded-2xl bg-red-600 flex justify-center items-center">
                <img className="w-full h-full rounded-2xl object-contain" src="/airlines/airline5.png" alt="Emirates" />
              </div>
              <div className="w-[70px] h-[70px] rounded-2xl bg-white flex justify-center items-center">
                <img className="w-full h-full rounded-2xl object-contain" src="/airlines/airline6.jpg" alt="White Logo" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl font-bold text-white text-center mb-10 leading-9">
            Organise all your travels in one place
          </h1>

          {/* Features List */}
          <div className="mb-15">
            {/* Feature 1 */}
            <div className="flex flex-row mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-500 bg-opacity-20 flex justify-center items-center mr-4">
                <img className="w-8 h-8" src="/icons/ote-icon1.png" alt="Feature 1" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">All-in-one Flight Search</h3>
                <p className="text-sm text-white leading-5">
                  The most comprehensive flight search, at par with Google Flight Search, scanning hundreds of airlines
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-row mb-8">
              <div className="w-12 h-12 rounded-xl bg-orange-500 bg-opacity-20 flex justify-center items-center mr-4">
                <img className="w-8 h-8" src="/icons/ote-icon2.png" alt="Feature 2" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Compare Cash vs Award Tickets</h3>
                <p className="text-sm text-white leading-5">
                  Gain insights on the best deals with cents/mile value, comparing award flights to cash prices
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-row mb-8">
              <div className="w-12 h-12 rounded-xl bg-red-500 bg-opacity-20 flex justify-center items-center mr-4">
                <img className="w-8 h-8" src="/icons/ote-icon3.png" alt="Feature 3" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Make your travel rewarding</h3>
                <p className="text-sm text-white leading-5">
                  Earn miles when you book a flight ticket through HeyMax
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-row justify-between items-center px-2">
          {/* Page Indicators */}
          <div className="flex flex-row items-center px-5">
            <div className="w-6 h-2 rounded-full bg-blue-600 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-white mx-1"></div>
          </div>

          {/* Next Button */}
          <PrimaryButton
            title="Next"
            dark={true}
            onClick={() => console.log("Button Pressed")}
          />
        </div>
      </div>
    </div>
  );
}
