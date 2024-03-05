import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { users } from "./users";

export async function GET() {
	const res = await fetch("/api/login", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return NextResponse.json({ data });
}

export async function POST(request) {
	try {
		const body = await request.json();
		const { email, password } = body;

		// match the body user to server user data
		// Find the user with the given email
		const user = users.find((user) => user.email === email);

		if (!user) {
			// If user not found, return unauthorized
			return NextResponse.json(
				{ message: "Unauthorized user" },
				{ status: 401 }
			);
		}
		// Check if the password matches
		if (user.password != password) {
			// If password doesn't match, return unauthorized
			return NextResponse.json(
				{ message: "Unauthorized user" },
				{ status: 401 }
			);
		}

		// Check if there is already a token
		const existingToken = request.cookies["_parsed"].get("secureJWT");
		// console.log(existingToken.name === "secureJWT");
		if (existingToken.name === "secureJWT") {
			return NextResponse.json(
				{ message: "User already logged in" },
				{ status: 409 }
			);
		}

		// jwt secret
		const secret = "mySecret";
		// create token
		const token = jwt.sign({ email, password }, secret, {
			expiresIn: "1h",
		});

		const serialized = serialize("secureJWT", token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 3600000, // equivalent to one hour
			path: "/",
		});

		return new Response(
			JSON.stringify({
				message: "Login Successful!",
				userEmail: email,
				userPassword: password,
			}),
			{
				status: 200,
				headers: { "Set-Cookie": serialized },
			}
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Something wrong with the user" },
			{ status: 400 }
		);
	}
}
