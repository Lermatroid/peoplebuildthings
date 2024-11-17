import { createSafeActionClient, returnValidationErrors } from "next-safe-action";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

export const publicAction = createSafeActionClient();

export const protectedAction = publicAction.use(async ({next, ctx}) => {
    const { userId } = await auth();
		if (!userId)
			returnValidationErrors(z.null(), {
				_errors: ["Unauthorized (No User ID)"],
			});
		// TODO: add check for registration
		return next({ ctx: { userId } });
});