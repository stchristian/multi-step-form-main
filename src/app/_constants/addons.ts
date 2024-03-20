export type Addon = {
  id: number;
  name: string;
  description: string;
  price: {
    yearly: number;
    monthly: number;
  };
};

export const addons: ReadonlyArray<Addon> = [
  {
    id: 1,
    name: "Online service",
    description: "Access to multiplayer games",
    price: {
      yearly: 10,
      monthly: 1,
    },
  },
  {
    id: 2,
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: {
      yearly: 20,
      monthly: 2,
    },
  },
  {
    id: 3,
    name: "Customizable profile",
    description: "Custom theme on your profile",
    price: {
      yearly: 20,
      monthly: 2,
    },
  },
];
