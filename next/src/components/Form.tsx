import { ReactNode } from "react";

export function FormLabel({
  htmlFor,
  text,
  optional = false,
}: {
  htmlFor: string;
  text: string;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor}>
      {text} {!optional && <span className="text-red-500">*</span>}
    </label>
  );
}

export function FormHint({ text }: { text: string }) {
  return <span className="text-xs mb-1 text-sand-400">{text}</span>;
}

export function FormInput({
  type,
  name,
  placeholder,
  required = false,
  defaultValue,
}: {
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
}) {
  return (
    <input
      className="bg-sand-100 p-2 font-light border-b-2 border-b-sand-600 text-sm w-full"
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
    />
  );
}

export function FormGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

export function Form({
  children,
  action,
}: {
  children: ReactNode;
  action?: (payload: FormData) => void | string;
}) {
  return (
    <form
      action={action}
      className="w-full max-w-[700px] flex flex-col gap-6 border-b bg-sand-50 border-b-sand-200 p-6 pb-8 md:p-12 mb-6"
    >
      <p>
        {" "}
        <span className="text-red-500">*</span> : champs obligatoires
      </p>
      {children}
    </form>
  );
}
