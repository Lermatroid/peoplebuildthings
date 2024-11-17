import { Button } from "@/components/ui/button";

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b text-black">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
				<h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
					building stuff can be hard.
				</h1>
				<h2 className="text-xl font-bold tracking-tight text-black">
					But you've got this {":)"}
				</h2>
				<Button>Let's Do This</Button>
			</div>
		</main>
	);
}
