import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { KeyboardEventHandler, useCallback } from "react";

interface PlanProps {
  period: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  selected?: boolean;
  icon: StaticImport;
  monthsFree?: number;
  onSelect: () => void;
}

export function Plan({ period, name, price, selected = false, icon, monthsFree, onSelect: onSelect }: PlanProps) {
  // To be fully accessible we should handle more keyboard events..
  const handleKeyPress = useCallback<KeyboardEventHandler<HTMLLIElement>>(
    (evt) => {
      switch (evt.key) {
        case " ":
          onSelect();
      }
    },
    [onSelect]
  );

  return (
    <li
      tabIndex={0}
      className={`flex flex-row lg:flex-col cursor-pointer border p-4 py-3 lg:py-4 rounded-md flex-1 aria-checked:border-blue-marine hover:border-blue-marine aria-checked:bg-gray-alabaster border-gray-light gap-4 lg:gap-10 items-start`}
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      onKeyDown={handleKeyPress}
    >
      <Image src={icon} alt="icon" />
      <div>
        <div className="text-blue-marine text-lg font-medium">{name}</div>
        <div className="text-gray-cool text-sm">{`$${
          period === "monthly" ? `${price.monthly}/mo` : `${price.yearly}/yr`
        }`}</div>
        {period === "yearly" && <div className="text-blue-marine text-sm">{`2 months free`}</div>}
      </div>
    </li>
  );
}
