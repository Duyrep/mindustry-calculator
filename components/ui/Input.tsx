import { twMerge } from "tailwind-merge";

export default function Input({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <input
      {...props}
      className={twMerge(className, "border border-surface-a50 rounded-md focus:border-primary outline-none px-2 duration-200")}
    />
  );
}
