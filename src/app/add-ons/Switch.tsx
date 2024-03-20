interface SwitchProps {
  name: string;
  value: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const base = "h-[1.125rem] w-9 rounded-full bg-blue-marine flex flex-row p-1 cursor-pointer";
const after =
  "after:z-[2] after:h-2.5 after:w-2.5 after:rounded-full after:border-none after:bg-white after:content-[''] ";
const checked = "checked:justify-end";

export function Switch({ name, value, onChange }: SwitchProps) {
  return (
    <input
      type="checkbox"
      role="switch"
      name={name}
      checked={value}
      onChange={onChange}
      className={`appearance-none ${base} ${after} ${checked}`}
    />
  );
}
