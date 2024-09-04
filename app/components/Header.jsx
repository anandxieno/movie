import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="container flex items-center py-2.5">
        <Link className="block text-teal-600" href="/">
          <Image src="/logo.png" width="150" height="70" priority={true} ></Image>
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <nav aria-label="Global" className="">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link className="text-gray-500 transition hover:text-gray-500/75" href={'/movies'}>Movies</Link>
              </li>

              <li>
                <Link className="text-gray-500 transition hover:text-gray-500/75" href={'/celebrities'}>Celebrity's</Link>
              </li>

              <li>
                <Link className="text-gray-500 transition hover:text-gray-500/75" href={'/tvshow'}>Tv Shows</Link>
              </li>
            </ul>
          </nav>

          <div className="items-center gap-4 !hidden md:flex">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="#"
              >
                Login
              </a>

              <a
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                href="#"
              >
                Register
              </a>
            </div>

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
