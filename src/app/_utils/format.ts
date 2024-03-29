import { Addon } from "@/app/_constants/addons";
import { Plan } from "@/app/_constants/plans";

export function formatPlanPrice(plan: Plan, period: string) {
  return `$${period === "monthly" ? `${plan.price.monthly}/mo` : `${plan.price.yearly}/yr`}`;
}

export function formatAddonPrice(addon: Addon, period: string) {
  return `+$${period === "monthly" ? `${addon.price.monthly}/mo` : `${addon.price.yearly}/yr`}`;
}
