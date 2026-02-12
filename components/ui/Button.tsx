import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  asChild,
  className,
  ...props
}: {
  children?: React.ReactNode;
  asChild?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return asChild ? (
    children
  ) : (
    <button
      className={twMerge(
        className,
        "bg-primary text-background px-2 py-1 rounded-md font-bold"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
