"use client";

import { PrimaryButton } from "@repo/ui/primaryButton";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  return (
    <div className="flex justify-center min-h-screen bg-background-dark">
      <div className="flex flex-col w-full max-w-md min-h-screen">
        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-center">
          {/* Main Illustration Image */}
          <div className="h-[280px] mb-5 flex justify-center items-center px-10">
            <img
              src="/prompt-illustration.png"
              alt="Track Your Trips"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Main Content */}
          <div className="px-6 flex flex-col items-center">
            <h1 className="text-[32px] font-bold text-foreground-dark text-center mb-6 leading-[38px]">
              Track Your
              <br />
              Upcoming Trips
            </h1>

            <p className="text-base text-foreground-dark text-center leading-6 px-2">
              We've tracked your recent flight booking made via HeyMax. Check your
              upcoming trip anytime, and enjoy exclusive upsizes on hotels,
              activities, and more.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-6 pb-10">
          {/* Let's go Button */}
          <PrimaryButton
            title="Let's go!"
            dark={true}
            onClick={() => router.push("/trips")}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
