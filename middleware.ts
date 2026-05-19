import { auth } from "@/services/auth";

export default auth((req) => {
    const isLoggedIn = !!req.auth?.user;
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/cart") ||
                             req.nextUrl.pathname.startsWith("/checkout");

    if (isProtectedRoute && !isLoggedIn) {
        return Response.redirect(new URL("/signin", req.nextUrl));
    }
});

export const config = {
    matcher: ["/cart/:path*", "/checkout/:path*"],
};