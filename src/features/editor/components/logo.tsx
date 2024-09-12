import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="relative size-8 shrink-0">
        <Image
          src="/logo.svg"
          alt="logo"
          fill
          className="shrink-0 transition hover:opacity-75"
        />
      </div>
    </Link>
  );
};

export default Logo;
