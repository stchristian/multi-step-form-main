import advancedSvg from "@/../public/images/icon-advanced.svg";
import arcadeSvg from "@/../public/images/icon-arcade.svg";
import proSvg from "@/../public/images/icon-pro.svg";

export type Plan = {
  id: number;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  icon: any;
};

export const plans: ReadonlyArray<Plan> = [
  {
    id: 1,
    name: "Arcade",
    price: {
      monthly: 9,
      yearly: 90,
    },
    icon: arcadeSvg,
  },
  {
    id: 2,
    name: "Advanced",
    price: {
      monthly: 12,
      yearly: 120,
    },
    icon: advancedSvg,
  },
  {
    id: 3,
    name: "Pro",
    price: {
      monthly: 15,
      yearly: 150,
    },
    icon: proSvg,
  },
];
