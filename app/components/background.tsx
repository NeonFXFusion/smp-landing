"use client";

import { useRef } from "react";
import Particles from "./particles";
import Image from "next/image";

export default function Background () {
	const bgRef = useRef<HTMLImageElement>(null);
	const mdRef = useRef<HTMLImageElement>(null);

	return (
		<>
			<Particles
				className="absolute inset-0 z-10 animate-fade-in"
				quantity={100}
				bgRef={bgRef}
				mdRef={mdRef}
			/>
			<div className="fixed w-full h-0 pb-[56.25%] flex flex-col items-center">
				<Image ref={bgRef} id="cloud2" src="/cloud2.png" alt="Clouds " fill className="w-full h-auto brightness-110 animate-glow animate-fade-in drop-shadow-xl blur-sm"/>
        <Image ref={mdRef} id="cloud3" src="/cloud3.png" alt="Clouds " fill className="w-full h-auto brightness-110 animate-glow animate-fade-in drop-shadow-2xl"/>
        <Image id="cloud1" src="/cloud1.png" alt="Clouds front" fill className="animate-bounce w-full h-auto brightness-110 animate-glow animate-fade-in drop-shadow-2xl"/>
			</div>
		</>
	)
}
