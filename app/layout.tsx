import "../global.css";
import { Exo_2, Inter } from "next/font/google";
import { Jura } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
	title: {
		default: "aseben smp",
		template: "%s | aseben smp",
	},
	description: "Software engineer at upstash.com and founder of planetfall.io",
	openGraph: {
		title: "aseben smp",
		description:
			"Software engineer at upstash.com and founder of planetfall.io",
		url: "https://smp.surreal.sh",
		siteName: "smp.surreal.sh",
		images: [
			{
				url: "https://chronark.com/og.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Chronark",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/favicon.png",
	},
};
const fontNormal = Exo_2({
	subsets: ["latin"],
	variable: "--font-normal",
});

const fontAccent = Jura({
	subsets: ["latin"],
	variable: "--font-accent",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={[fontNormal.variable, fontAccent.variable].join(" ")}
		>
			<head>
				<Analytics />
			</head>
			<body
				className={`bg-white ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
			</body>
		</html>
	);
}
