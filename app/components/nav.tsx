"use client";
import { ArrowLeftIcon, BookOpenIcon, ChatBubbleOvalLeftIcon, ClipboardIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const navigation = [
		{ name: "Resources", href: "/resources", icon: <BookOpenIcon className="w-4 h-4"/> },
		{ name: "Contact", href: "/contact", icon: <ChatBubbleOvalLeftIcon className="w-4 h-4"/>  },
		{ name: "Apply", href: "https://t.ly/5bB12", icon: <ClipboardIcon className="w-4 h-4"/>  },
	];

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b  ${
					isIntersecting
						? "border-transparent bg-zinc-100/10"
						: "bg-zinc-100/500 border-zinc-300"
				}`}
			>
				<div className="container flex flex-row-reverse justify-between items-center p-6 mx-auto">
					<div className="flex gap-8 justify-between">
						{navigation.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="flex gap-1 items-center text-sm lowercase duration-500 text-zinc-400 hover:text-zinc-100"
							>
								{item.icon}
								{item.name}
							</Link>
						))}
					</div>
					<Link
						href="/"
						className="duration-200 text-zinc-100 hover:text-zinc-300"
					>
						<ArrowLeftIcon className="w-6 h-6" />
					</Link>
				</div>
			</div>
		</header>
	);
};
