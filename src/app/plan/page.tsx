"use client";
import { Plan } from "@/app/plan/Plan";
import { Description, Header, StepContent } from "@/app/_components/StepContent";
import { plans } from "@/app/_constants/plans";
import { Switch } from "@/app/add-ons/Switch";
import { useMultiStepFormContext } from "@/app/_modules/subscription-form";

export default function PlanPage() {
  const { setValue, planId, period } = useMultiStepFormContext();

  return (
    <StepContent>
      <Header>Select your plan</Header>
      <Description>You have the option of monthly or yearly billing.</Description>
      <div
        className="flex flex-col lg:flex-row gap-3 mb-8"
        role="radiogroup"
        aria-label="Plan options"
        aria-describedby="planError"
      >
        {plans.map((plan) => (
          <Plan
            key={plan.name}
            {...plan}
            period={period}
            selected={planId === plan.id}
            onSelect={() => {
              setValue("planId", plan.id);
            }}
          />
        ))}
      </div>
      <label className="flex flex-row bg-gray-alabaster rounded-md p-4 justify-center gap-4 items-center cursor-pointer">
        <span className={`${period === "monthly" ? "text-blue-marine" : "text-gray-cool"}`}>Monthly</span>
        <Switch
          onChange={(e) => {
            e.target.checked ? setValue("period", "yearly") : setValue("period", "monthly");
          }}
          name="period"
          value={period === "yearly"}
        />
        <span className={`${period === "yearly" ? "text-blue-marine" : "text-gray-cool"}`}>Yearly</span>
      </label>
    </StepContent>
  );
}
