import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { BookOpenIcon, ChatBubbleOvalLeftIcon, ClipboardIcon } from "@heroicons/react/20/solid";
import Background from "./components/background";

const navigation = [
	{ name: "Resources", href: "/resources", icon: <BookOpenIcon className="w-4 h-4"/> },
	{ name: "Contact", href: "/contact", icon: <ChatBubbleOvalLeftIcon className="w-4 h-4"/>  },
	{ name: "Apply", href: "https://t.ly/5bB12", icon: <ClipboardIcon className="w-4 h-4"/>  },
];

export default function Home() {

	return (
		<div className="flex overflow-hidden flex-col justify-center items-center w-screen h-screen bg-gradient-to-tl to-sky-200 from-zinc-100 via-zinc-900/20">
			<div className="z-20">
			<nav className="my-4 animate-fade-in">
				<ul className="flex flex-wrap gap-4 justify-center items-center">
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="flex gap-1 items-center text-sm lowercase font-semibold duration-500 text-emerald-300 hover:text-sky-300"
						>
							{item.icon}
							{item.name}
						</Link>
					))}
				</ul>
			</nav>
			<div className="hidden w-screen h-[.1em] bg-gradient-to-r animate-glow md:block animate-fade-left from-sky-300/0 via-white to-sky-200/0" />
			<div className="bg-zinc-100/10 animate-title backdrop-blur-sm flex flex-col items-center justify-center">
				<div className="w-full relative flex justify-center bottom-0">
					<Image id="grass" src="/grass.png" alt="Grass" width="128" height="128" className="absolute top-1 brightness-150 animate-glow animate-fade-in drop-shadow-2xl"/>
				</div>
				<h1 className="transition duration-1000 py-4 font-semibold text-center text-6xl text-transparent whitespace-nowrap bg-clip-text bg-white cursor-default z-14 text-edge-outline animate-title font-display sm:text-6xl md:text-9xl drop-shadow-2xl">
					aseben smp 
				</h1>
			</div>
			<div className="hidden w-screen h-[.1em] bg-gradient-to-r animate-glow md:block animate-fade-right from-sky-300/0 via-white to-sky-200/0" />
				<div className="my-4 text-center animate-fade-in">
					<h2 className="mx-6 text-sm text-zinc-100 flex justify-center gap-2 items-center font-semibold">
						The most elite SMP server in minecraft.<br/>We are giving away free griddy points for bonus ohio rizz.
					</h2>
				</div>
			</div>
			<Background />
		</div>
	);
}
