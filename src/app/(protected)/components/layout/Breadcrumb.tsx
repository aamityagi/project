"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 mb-4">
      <ol className="flex gap-1">
        <li>
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
        </li>
        {paths.map((p, i) => {
          const url = "/" + paths.slice(0, i + 1).join("/");
          return (
            <li key={i}>
              <span className="mx-1">/</span>
              <Link href={url} className="hover:underline capitalize">
                {p.replace("-", " ")}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
