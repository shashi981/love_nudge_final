'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Calendar", path: "/" },
  { name: "Fights", path: "/fights" },
  { name: "Happy Moments", path: "/happy-moments" },
  { name: "Special Occasions", path: "/special-occasions" },
  { name: "Gallery", path: "/gallery" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-4 p-2 bg-gray-100 rounded-lg">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`px-4 py-2 rounded-md ${
                pathname === item.path
                  ? "bg-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
} 