"use client";
import { Input, Textarea, Select } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "date" | "number" | "textarea" | "select";
  value: string | number | undefined;
  onChange: (value: string) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export function FormField({ label, name, type = "text", value, onChange, required, options, placeholder }: FormFieldProps) {
  const val = value === undefined || value === null ? "" : String(value);

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {type === "textarea" ? (
        <Textarea
          name={name}
          value={val}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      ) : type === "select" ? (
        <Select name={name} value={val} onChange={(e) => onChange(e.target.value)} required={required}>
          <option value="">Select...</option>
          {options?.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </Select>
      ) : (
        <Input
          type={type}
          name={name}
          value={val}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
