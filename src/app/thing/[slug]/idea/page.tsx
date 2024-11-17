"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Idea {
	id: number;
	text: string;
}

// const mockIdeas: Idea[] = [
// 	{ id: 1, text: "Build a rocket ship to Mars" },
// 	{ id: 2, text: "Create a social network for pets" },
// 	{ id: 3, text: "Develop a time machine" },
// 	{ id: 4, text: "Invent a teleportation device" },
// 	{ id: 5, text: "Design a flying car" },
// ];

export default function IdeaPage() {
	const [shownIdeas, setShownIdeas] = useState<Idea[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const fetchRandomIdea = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("/api/idea/random");
			if (!response.ok) throw new Error("Failed to fetch idea");
			const idea: Idea = await response.json();
			setShownIdeas((prev) => ([idea, ...prev] as Idea[]).slice(0, 5));
			setCurrentIndex((prev) => prev + 1);
		} catch (error) {
			console.error("Error fetching idea:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const handleKeyPress = async (event: KeyboardEvent) => {
			if (event.code === "Space") {
				event.preventDefault();
				if (!isLoading) {
					await fetchRandomIdea();
				}
			} else if (event.code === "Enter") {
				event.preventDefault();
				if (shownIdeas.length > 0) {
					alert(`Idea selected: ${shownIdeas[0]?.text}`);
				}
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [isLoading, shownIdeas]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-between">
			<div className="flex max-h-36 w-screen items-center justify-center pt-12 text-center">
				<div>
					<h1 className="text-5xl font-bold">Idea</h1>
					<p className="mt-2 text-xl text-gray-600">
						all great things begin with an idea
					</p>
				</div>
			</div>

			<div className="relative flex w-full max-w-2xl items-center justify-center">
				<AnimatePresence>
					{shownIdeas.map((idea, index) => (
						<motion.div
							key={`${idea.id}-${index}`}
							initial={
								index === 0 ? { opacity: 0, y: 20 } : false
							}
							animate={{
								opacity: 1 - index * 0.2,
								y: index * -3 + "rem",
							}}
							transition={
								index === 0
									? {
											type: "spring",
											stiffness: 500,
											damping: 30,
										}
									: {
											type: "tween",
											duration: 0.2,
										}
							}
							className="absolute left-0 right-0 text-center"
						>
							<p className="text-4xl font-bold tracking-tight">
								{idea.text}
							</p>
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			<div className="flex max-h-36 w-screen items-center justify-center gap-4 pb-12 text-sm text-gray-600">
				<div className="flex items-center gap-2">
					<kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1">
						space
					</kbd>
					<span>next idea</span>
				</div>
				<div className="flex items-center gap-2">
					<kbd className="rounded border border-gray-200 bg-gray-100 px-2 py-1">
						enter
					</kbd>
					<span>select idea</span>
				</div>
			</div>
		</div>
	);
}
