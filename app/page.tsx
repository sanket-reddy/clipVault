"use client";

import Navbar from "@/components/ui/navbar";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <div className=" relative w-full min-h-screen  flex flex-cols overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 ">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          speed={13}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#FFA500"
        />
      </div>
      <div className="z-10 w-full mx-5 pt-5 ">
        <Navbar />
        <div className="w-full flex flex-col items-center justify-center">
        <TypeAnimation
          sequence={[
            "Connect Inspire Share !!!",
            1000, 
            "More than a site, it's a community",
            1000,
            "Turn moments into masterpieces",
            1000,
            "Join the fun, Share the joy",
            1000,
          ]}
          wrapper="span"
          speed={60}
          style={{
            fontSize: "2em",
            color: "blueviolet",
            display: "inline-block",
          }}
          repeat={Infinity}
        />
        <Link className="text-white inset-3 z-10" href="/user">
          <h1 className="text-xl mt-3">GET STARTED</h1>
        </Link>
        </div>
      </div>
    </div>
  );
}
