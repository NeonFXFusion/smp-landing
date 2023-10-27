"use client";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { SiDiscord, SiInstagram } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Image from "next/image";

const socials = [
	{
		icon: <EnvelopeIcon className="w-5 h-5" />,
		href: "mailto:neon@surreal.sh",
		label: "Email",
		handle: "neon@surreal.sh",
	},
	{
		icon: <SiDiscord size={20} />,
		href: "#",
		label: "Discord",
		handle: "@neonx_x",
	},
	{
		icon: <SiInstagram size={20} />,
		href: "https://www.instagram.com/jax_xc",
		label: "Instagram",
		handle: "@jax_xc",
	},
];

export default function Example() {
	return (
		<div className="bg-gradient-to-tl to-sky-200 from-zinc-100 via-zinc-900/20">
			<Navigation />
			<div className="fixed w-full top-[-40%] h-0 pb-[56.25%] flex flex-col items-center animate-fade-in">
				<Image id="cloud2" src="/cloud2.png" alt="Clouds back" fill className="w-full h-auto brightness-110 animate-glow blur-sm drop-shadow-xl"/>
			</div>
			<div className="fixed w-full bottom-[-40%] h-0 pb-[56.25%] flex flex-col items-center animate-fade-in">
				<Image id="cloud2" src="/cloud2.png" alt="Clouds back" fill className="w-full h-auto brightness-110 animate-glow blur-sm drop-shadow-xl"/>
			</div>
			<div className="container flex justify-center items-center px-4 mx-auto min-h-screen relative animate-title">
				<div className="grid grid-cols-1 gap-8 mx-auto mt-32 w-full sm:mt-0 sm:grid-cols-3 lg:gap-16">
					{socials.map((s) => (
						<Card>
							<Link
								href={s.href}
								target="_blank"
								className="flex relative flex-col gap-4 items-center p-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16"
							>
								<span
									className="absolute h-2/3 bg-gradient-to-b to-transparent w-[1.5px] from-zinc-300 via-zinc-400/50"
									aria-hidden="true"
								/>
								<span className="flex relative z-10 justify-center items-center w-12 h-12 text-sm rounded-full border border-white duration-1000 text-zinc-400 group-hover:text-white group-hover:bg-zinc-300 bg-zinc-100 group-hover:border-zinc-200 drop-shadow-orange">
									{s.icon}
								</span>{" "}
								<div className="flex z-10 flex-col items-center">
									<span className="font-medium duration-150 lg:text-xl xl:text-3xl text-zinc-400 group-hover:text-white font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-100">
										{s.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
