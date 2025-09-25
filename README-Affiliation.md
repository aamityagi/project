# Step-by-step: Add Affiliate flow to your Next.js app


1. **Install packages**
```bash
npm i mongoose axios react-hook-form zod @hookform/resolvers next-auth
```


2. **Add environment variables** in `.env.local`:
- `MONGODB_URI` — your MongoDB Atlas connection string
- `NEXTAUTH_SECRET` — next-auth secret
- Provider-specific envs (e.g., GOOGLE_CLIENT_ID/SECRET) if using OAuth


3. **Add files from this bundle** into your project under the same paths shown above.


4. **Adapt `authOptions` path** used in server pages and API routes to point to your actual next-auth options file (where you define providers and adapter). Example: `@/lib/nextauth.options`.


5. **Protect the onboarding page**: the provided onboarding page performs a server-side session check and redirects unauthenticated users to the Auth.js signin page with a callback to return to the onboarding page after login.


6. **Marketing CTA**: add a link from your marketing page to `/app/affiliate/page.tsx` (or directly to `/api/auth/signin?callbackUrl=/onboarding/affiliation`) so that clicking *Sign up / Login to apply* sends users through sign-in and back to the application form.


7. **Dashboard banner**: add `<AffiliateBanner />` into your post-login dashboard to gently prompt already-signed-in users to apply if they haven't.


8. **Admin**: create an admin-only page to list and approve/reject applications (use `/api/affiliations` GET as the backend). Secure admin access by checking `session.user.role` or another role flag.


9. **File uploads**: do not upload big files through the API route. Use presigned S3/Cloudinary uploads and store returned URLs into `proofFiles`.


10. **Payouts & compliance**: store payout details securely, mask values in the UI, and consider a tokenized provider for bank details.


11. **Testing**: run locally, ensure `connectMongo()` logs "MongoDB connected successfully" in dev, try the full flow: marketing CTA -> sign-in -> onboarding -> submit -> check DB.


```


---


## Where to change (quick map)


- `@/lib/nextauth.options` — replace with your actual next-auth options file path in every server file (API routes, pages) that imports it.
- `MONGODB_URI` — set in `.env.local`.
- Admin role detection currently uses `(session.user as any)?.role === 'admin'` — change this to match your auth schema.
- Styling: swap the simple inputs/buttons for your `shadcn/ui` components where required.


---


## How the "prompt after login" flow works (two approaches)


1. **CTA with callback URL (recommended)**
- Marketing CTA or `/app/affiliate` landing page includes a link to `/api/auth/signin?callbackUrl=/onboarding/affiliation`.
- The user signs up / logs in, next-auth redirects the user back to `/onboarding/affiliation` where they see the prefilled form and can apply.


2. **Dashboard banner (non-intrusive)**
- For users who sign in normally (not via the CTA), the `AffiliateBanner` appears on their dashboard if they haven't applied yet. They can click "Apply now" to go to the onboarding form.


Both methods are implemented in the bundle.


---


## Final notes
- The code is intentionally minimal and secure-by-default: it requires authentication for submissions, uses server-side validation, and avoids storing raw files in the DB.
- If you want, I can now:
- Add presigned S3 upload endpoints + client upload component, or
- Create an admin UI to approve/reject applications, or
- Convert the model/queries to Prisma (Mongo) instead of Mongoose.


Choose one and I will add it to this bundle.
