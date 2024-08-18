import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public (not protected by Clerk)
const publicRoutes = ["/sign-in", "/sign-up"];

// Create a route matcher to check for protected routes
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

export default clerkMiddleware((auth, req) => {
  // Check if the request path matches any public route
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return;
  }

  // Protect all other routes
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
