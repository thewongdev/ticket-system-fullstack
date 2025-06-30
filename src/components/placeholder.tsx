import { LucideMessageSquareWarning } from "lucide-react";
import React, { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement;
  button?: React.ReactElement;
};

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) => {
  return (
    <div className="flex flex-1 self-center flex-col justify-center items-center gap-y-2">
      {cloneElement(icon, {
        className: "w-12 h-12",
      } as React.SVGProps<SVGSVGElement>)}
      <h2 className="text-lg text-center">{label}</h2>
      {cloneElement(button, {
        className: "h-10",
      } as React.HTMLAttributes<HTMLElement>)}
    </div>
  );
};

export { Placeholder };
