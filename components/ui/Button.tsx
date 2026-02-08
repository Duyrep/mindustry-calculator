import { twMerge } from "tailwind-merge";

export default function Button({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return <button {...props} className={twMerge("font-bold p-2 rounded-md duration-200 bg-primary hover:bg-primary/70 active:bg-primary/90 hover:cursor-pointer", className)} />;
}
