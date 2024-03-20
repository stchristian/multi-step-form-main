import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import bgMobile from "@/../public/images/bg-sidebar-mobile.svg";
import Image from "next/image";
import { Stepper } from "@/app/_components/Stepper";
import { SubscriptionMultiStepFormProvider } from "@/app/_modules/subscription-form";

const ubuntu = localFont({
  src: [
    {
      path: "../fonts/Ubuntu-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Ubuntu-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Ubuntu-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Multi step form",
  description: "The solution for a challenge by Frontend Mentor",
  authors: [{ name: "Krisztian Hubner" }],
  icons: ["/images/favicon-32x32.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-dvh">
      <body
        className={
          ubuntu.className +
          " bg-gray-magnolia flex flex-col lg:items-center lg:justify-center lg:h-full overflow-auto min-h-full"
        }
      >
        <div className="lg:hidden fixed top-0 -z-10 left-0 right-0">
          <Image
            src={bgMobile}
            alt="background"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="contents lg:flex lg:flex-row lg:w-[1000px] bg-white container p-4 rounded-lg shadow-lg">
          <SubscriptionMultiStepFormProvider>
            <Stepper />
            {children}
          </SubscriptionMultiStepFormProvider>
        </div>
      </body>
    </html>
  );
}
