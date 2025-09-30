// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Redirect to custom unauthorized page if not logged in
  pages: {
    signIn: "/unauthorized", // your custom page
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/seo/:path*",
    // Add other protected routes here if needed
  ],
};
