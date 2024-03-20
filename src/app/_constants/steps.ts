import { FormStep } from "@/app/_modules/generic-multi-step-form";

export const steps: ReadonlyArray<FormStep> = [
  {
    path: "/personal-info",
    name: "Your Info",
  },
  {
    path: "/plan",
    name: "Select plan",
  },
  {
    path: "/add-ons",
    name: "Add-ons",
  },
  {
    path: "/summary",
    name: "Summary",
  },
];
