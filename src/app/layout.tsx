import "@/styles/globals.css";

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "People Build Things",
    description: "Building things is hard, but you got this :)",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${GeistSans.variable}`}>
                <body>
                    <div className="flex justify-end p-4"><SignedOut>
                        <SignInButton />
                    </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn></div>

                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
