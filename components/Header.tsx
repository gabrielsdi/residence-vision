import { HouseIcon } from "lucide-react";
export const Header = () => {
  return (
    <>
      <header className="w-full bg-white shadow-md overflow-visible p-4 top-0 fixed z-20">
        <div className="flex items-center align-bottom justify-start gap-2">
          <HouseIcon className="w-10 h-10 text-indigo-500" />
          <h1 className="text-xl font-bold text-indigo-500">
            Residence Vision
          </h1>
        </div>
      </header>
    </>
  );
};
