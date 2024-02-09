"use client";
import Image from "next/image";
import { addons } from "@/constants/addons";
import { Description, Header, StepContent } from "@/app/_components/StepContent";
import { plans } from "@/constants/plans";
import { formatAddonPrice, formatPlanPrice } from "@/utils";
import { Fragment, useMemo } from "react";
import thankYouSvg from "@/../public/images/icon-thank-you.svg";
import Link from "next/link";
import { useMultiStepFormContext } from "@/app/SubscriptionMultiStepForm";

interface SummaryPageProps {}

export default function SummaryPage({}: SummaryPageProps) {
  const { planId, selectedAddonIds, period, completed } = useMultiStepFormContext();

  const plan = useMemo(() => plans.find((p) => p.id === planId)!, [planId]);
  const selectedAddons = useMemo(
    () => selectedAddonIds!.map((id) => addons.find((a) => a.id === id)!),
    [selectedAddonIds]
  );

  const totalPrice = useMemo(() => {
    if (period === "monthly") {
      return plan?.price.monthly + selectedAddons?.reduce((acc, addon) => acc + addon?.price.monthly, 0);
    } else {
      return plan?.price.yearly + selectedAddons?.reduce((acc, addon) => acc + addon?.price.yearly, 0);
    }
  }, [plan, selectedAddons, period]);

  return (
    <StepContent>
      {completed ? (
        <div className="flex items-center justify-center flex-col text-center my-auto py-8">
          <Image src={thankYouSvg} alt="Big checkmark" className="mb-6" />
          <Header>Thank you!</Header>
          <Description>
            Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support
            please feel free to email us at support@loremgaming.com
          </Description>
        </div>
      ) : (
        <>
          <Header>Finishing up</Header>
          <Description>Double-check everything looks OK before confirming.</Description>
          <div className="bg-gray-alabaster rounded-lg grid grid-cols-[1fr_min-content] p-6 items-center gap-4">
            <div>
              <div className="text-blue-marine font-medium">
                {plan?.name}({period === "monthly" ? "Monthly" : "Yearly"})
              </div>
              <Link href="/plan" className="text-gray-cool underline text-sm hover:text-blue-purplish">
                Change
              </Link>
            </div>
            <div className="text-blue-marine font-medium">{formatPlanPrice(plan!, period)}</div>
            {!!selectedAddons.length && <hr className="col-span-2 border-t-0 bg-gray-light h-[1px]" />}
            {selectedAddons?.map((addon) => (
              <Fragment key={addon?.name}>
                <div className="text-sm text-gray-cool">{addon?.name}</div>
                <div className="text-sm text-blue-marine">{formatAddonPrice(addon!, period)}</div>
              </Fragment>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_min-content] p-6">
            <div className="text-gray-cool text-sm">Total ({period === "monthly" ? "per month" : "per year"})</div>
            <div className="text-lg font-bold text-blue-purplish">
              {totalPrice}/{period === "monthly" ? "mo" : "yr"}
            </div>
          </div>{" "}
        </>
      )}
    </StepContent>
  );
}
