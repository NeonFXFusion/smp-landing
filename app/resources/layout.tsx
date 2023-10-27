export default function ProjectsLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen bg-gradient-to-tl to-sky-200 from-zinc-100 via-zinc-900/20">
			{children}
		</div>
	);
}
