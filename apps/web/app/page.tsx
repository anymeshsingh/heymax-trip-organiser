"use client";

import { PrimaryButton } from '@repo/ui/primaryButton';
import { FeatureItem } from '../src/components/FeatureItem';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex justify-center min-h-screen bg-background-dark">
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
          <h1 className="text-3xl font-bold text-foreground-dark text-center mb-10 leading-9">
            Organise all your travels in one place
          </h1>

          {/* Features List */}
          <div className="mb-15">
            <FeatureItem
              icon="/icons/ote-icon1.png"
              title="All-in-one Flight Search"
              description="The most comprehensive flight search, at par with Google Flight Search, scanning hundreds of airlines"
              iconBackgroundColor="bg-blue-500 bg-opacity-20"
            />

            <FeatureItem
              icon="/icons/ote-icon2.png"
              title="Compare Cash vs Award Tickets"
              description="Gain insights on the best deals with cents/mile value, comparing award flights to cash prices"
              iconBackgroundColor="bg-orange-500 bg-opacity-20"
            />

            <FeatureItem
              icon="/icons/ote-icon3.png"
              title="Make your travel rewarding"
              description="Earn miles when you book a flight ticket through HeyMax"
              iconBackgroundColor="bg-red-500 bg-opacity-20"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-row justify-between items-center px-2 py-10">
          {/* Page Indicators */}
          <div className="flex flex-row items-center px-5">
            <div className="w-6 h-2 rounded-full bg-primary-dark mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-background-light mx-1"></div>
          </div>

          {/* Next Button */}
          <PrimaryButton
            title="Next"
            dark={true}
            onClick={() => router.push('/onboarding')}
          />
        </div>
      </div>
      {/* temperary work around for making tailwindcss work for the primaryBurron component */}
      {/* <div className='bg-[#802EFF] bg-[#5046C5] text-white items-center justify-center whitespace-nowrap rounded-[25px] px-[60px] py-[14px] text-base font-semibold transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed hidden absolute'></div>
      <div className='inline-flex absolute'></div> */}
    </div>
  );
}
