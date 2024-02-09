interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export default function TextInput({ label, name, value, onChange, required, placeholder, error }: TextInputProps) {
  return (
    <div className="mb-4 flex flex-col">
      <label className="text-blue-marine text-sm mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        className={`border border-gray-light rounded-md px-4 py-2 ${error ? "border-red-strawberry" : ""}`}
        name={name}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required}
        placeholder={placeholder}
        aria-describedby={error ? getMessageId(name) : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <span className="text-red-strawberry text-sm font-bold" id={getMessageId(name)}>
          {error}
        </span>
      )}
    </div>
  );
}

function getMessageId(name: string) {
  return `${name}Error`;
}
