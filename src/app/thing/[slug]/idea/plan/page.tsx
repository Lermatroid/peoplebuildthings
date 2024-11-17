import IdeaPlanPage from "./client";
import { db } from "@/server/db";
import { ideasTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

interface Props {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: Props) {
	const ideaId = searchParams.idea as string;
	let originalIdea = "";

	if (ideaId) {
		const idea = await db
			.select({ text: ideasTable.text })
			.from(ideasTable)
			.where(eq(ideasTable.id, parseInt(ideaId)))
			.get();

		originalIdea = idea?.text ?? "";
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="pb-10 text-5xl font-bold">The Plan</h1>
			<IdeaPlanPage originalIdea={originalIdea} />
		</main>
	);
}
