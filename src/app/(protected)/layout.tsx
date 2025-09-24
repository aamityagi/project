// src/app/(protected)/layout.tsx
import ProtectedLayoutServer from "./ProtectedLayoutServer";
import ProtectedLayoutClient from "./ProtectedLayoutClient";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayoutServer>
      <ProtectedLayoutClient>{children}</ProtectedLayoutClient>
    </ProtectedLayoutServer>
  );
}
