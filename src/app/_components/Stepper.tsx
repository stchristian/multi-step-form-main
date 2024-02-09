"use client";

import { steps } from "../../constants/steps";
import bgDesktop from "@/../public/images/bg-sidebar-desktop.svg";
import Image from "next/image";
import { useMultiStepFormContext } from "@/app/SubscriptionMultiStepForm";

interface StepProps {
  active?: boolean;
  index: number;
  name: string;
}

export function Step({ index, name, active }: StepProps) {
  return (
    <li key="step" aria-current={active ? "step" : undefined} className="lg:flex lg:flex-row lg:gap-4 lg:items-center">
      <div
        className={`w-8 h-8 flex justify-center items-center border-white border rounded-full text-sm ${
          active ? "text-blue-marine bg-blue-light border-none" : "text-white"
        }`}
      >
        {index + 1}
      </div>
      <div className="hidden lg:flex lg:flex-col uppercase">
        <span className="text-blue-pastel text-xs">Step {index + 1}</span>
        <span className="text-white text-xs font-medium tracking-widest">{name}</span>
      </div>
    </li>
  );
}

export function Stepper() {
  const { currentStep } = useMultiStepFormContext();

  return (
    <nav aria-label="Steps of your order" className="lg:relative">
      <Image src={bgDesktop} alt="steps background" className="hidden lg:block" />

      <ol className="flex lg:flex-col lg:pl-8 justify-center gap-4 lg:gap-8 py-2 my-6 lg:absolute top-0">
        {steps.map((step, i) => (
          <Step active={currentStep === i + 1} key={step.path} name={step.name} index={i} />
        ))}
      </ol>
    </nav>
  );
}
