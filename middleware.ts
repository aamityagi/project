// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login", // redirect if not logged in
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*", // protects /dashboard and all nested routes
    "/seo/:path*",       // protects /seo and all nested routes
  ],
};
