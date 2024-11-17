import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { ideasTable } from "@/server/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
	try {
		const randomIdea = await db
			.select({
				id: ideasTable.id,
				text: ideasTable.text,
			})
			.from(ideasTable)
			.where(sql`1=1`) // Required for SQLite random()
			.orderBy(sql`RANDOM()`)
			.limit(1);

		if (!randomIdea.length) {
			return NextResponse.json(
				{ error: "No ideas found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({
			id: randomIdea[0]!.id,
			text: randomIdea[0]!.text,
		});
	} catch (error) {
		console.error("Error fetching random idea:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
