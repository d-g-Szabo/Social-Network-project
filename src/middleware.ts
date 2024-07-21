import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(
  // define the routes that are protected
  // ["/rollers(.*)", "/newRoller(.*)"]
  ["/", "/user/(.*)"]
);

export default clerkMiddleware((auth, req) => {
  // if the route is protected, protect it
  if (isProtectedRoute(req)) auth().protect();
});
// export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
