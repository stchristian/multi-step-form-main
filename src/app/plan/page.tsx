"use client";
import { Plan } from "@/components/Plan";
import { Description, Header, StepContent } from "@/components/StepContent";
import { plans } from "@/constants/plans";
import { Switch } from "@/components/Switch";
import { useFormWithStepsContext } from "@/multiStepForm";

export default function PlanPage() {
  const { setValue, planId, period } = useFormWithStepsContext();

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
      {/* <input
          type="checkbox"
          name="period"
          onChange={(e) => {
            setPeriod(e.target.checked ? "yearly" : "monthly");
          }}
        /> */}
    </StepContent>
  );
}
