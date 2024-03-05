import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
/*
The middleware.js|ts file is used to write Middleware and run code on the server before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Middleware executes before routes are rendered. It's particularly useful for implementing custom server-side logic like authentication, logging, or handling redirects.

*/
export function middleware(request) {
	// Checking if the token exist or not.
	const cookie = cookies().get("secureJWT");
	console.log(cookie);
	// if there is no cookie found redirect to the login
	if (!cookie) return NextResponse.redirect(new URL("/login", request.url));

	// if there is cookie name matched? validate it.
	const secret = "mySecret";
	const getToken = cookie.value;
	try {
		const decoded = jwt.verify(getToken, secret);
		if (decoded) {
			return NextResponse.redirect(new URL("/this-is-private", request.url));
		}
	} catch (error) {
		console.log(error);
	}
}

export const config = {
	/*
    Good to know: The matcher values need to be (constants) so they can be statically analyzed at build-time. Dynamic values such as variables will be ignored.
    Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware
    */
	matcher: ["/this-is-private", "/this-is-private/:path*"],
};
