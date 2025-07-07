import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center">
      <LucideLoaderCircle className="h-16 w-16 animate-spin" />
    </div>

    // <div className="flex flex-1 self-center flex-col justify-center items-center">
    //   <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    // </div>
  );
};

export { Spinner };
