"use client";

import { Textarea } from "@/components/ui/textarea";

interface IdeaPlanPageProps {
	originalIdea: string;
}

export default function IdeaPlanPage({ originalIdea }: IdeaPlanPageProps) {
	return (
		<div className="w-full max-w-4xl p-4">
			<Textarea
				defaultValue={originalIdea}
				className="min-h-[200px] w-full"
			/>
		</div>
	);
}
