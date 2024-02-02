interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

export function Button({ children, onClick, variant = "primary", className = "" }: ButtonProps) {
  const primaryClasses = "bg-blue-marine text-white hover:bg-opacity-70";
  const secondaryClasses = "text-gray-cool hover:text-blue-marine";
  const tertiaryClasses = "text-white bg-blue-purplish hover:bg-opacity-70 px-7";
  return (
    <button
      className={
        `button text-sm px-4 py-3 rounded-md ${
          variant === "primary" ? primaryClasses : variant === "secondary" ? secondaryClasses : tertiaryClasses
        }` + className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
