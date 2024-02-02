"use client";
import { Description, Header, StepContent } from "@/components/StepContent";
import { addons } from "@/constants/addons";
import checkmargSvg from "@/../public/images/icon-checkmark.svg";
import Image from "next/image";
import { formatAddonPrice } from "@/utils";
import { useFormWithStepsContext } from "@/multiStepForm";

export default function AddonsPage() {
  const { setValue, selectedAddonIds, period } = useFormWithStepsContext();

  return (
    <StepContent>
      <Header>Pick add-ons</Header>
      <Description>Add-ons help enhance your gaming experience.</Description>
      <ul className="flex flex-col gap-3 mb-8" role="listbox" aria-multiselectable="true" tabIndex={0}>
        {addons.map((addon) => (
          <li
            key={addon.name}
            role="option"
            aria-selected={selectedAddonIds?.includes(addon.id)}
            className="flex flex-row p-4
          gap-4 border-gray-light border rounded-lg cursor-pointer items-center aria-selected:border-blue-purplish
          hover:border-blue-purplish
          aria-selected:bg-gray-alabaster group"
            onClick={() => {
              setValue(
                "selectedAddonIds",
                selectedAddonIds?.includes(addon.id)
                  ? selectedAddonIds.filter((id) => id !== addon.id)
                  : [...(selectedAddonIds || []), addon.id]
              );
            }}
          >
            <div className="w-4 h-4 border border-gray-light rounded-sm group-aria-selected:bg-blue-purplish group-aria-selected:border-none flex items-center justify-center p-[3px] pt-[4px]">
              <Image src={checkmargSvg} alt="checkmark" />
            </div>
            <div className="flex flex-col grow">
              <div className="text-blue-marine font-medium text-sm lg:text-base">{addon.name}</div>
              <span className="text-gray-cool text-xs lg:text-base">{addon.description}</span>
            </div>
            <div className="text-blue-purplish text-sm lg:text-base">{formatAddonPrice(addon, period)}</div>
          </li>
        ))}
      </ul>
    </StepContent>
  );
}
