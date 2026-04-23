import Image from "next/image";
import Link from "next/link";
export const Header = () => {
  return (
    <header className="w-full bg-white shadow-md overflow-visible p-4 top-0 fixed z-20">
      <div className="flex items-center align-bottom justify-start gap-2">
        <Link href="/">
          <Image
            data-testid="header-logo"
            src="/residence-logo.svg"
            alt="Residence Vision"
            width={200}
            height={80}
            className="object-contain"
            priority
          />
        </Link>
      </div>
    </header>
  );
};
