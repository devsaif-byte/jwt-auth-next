"use client";
import React, { useState } from "react";
import { Input, Page } from "@geist-ui/core";
import "./style.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = async (e) => {
		e.preventDefault();
		const user = { email, password };
		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			const data = await response.json();
			console.log(data);

			// Check for errors
			if (!response.ok) {
				toast.error(response.statusText);
				throw new Error(
					`HTTP error! Status: ${response.status}` || "Login failed!"
				);
			}
			toast.success("Login Successful");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<section>
			<Page>
				<h2 className="center">Hello, Please Login.</h2>

				<form onSubmit={handleLogin}>
					<Input
						name="email"
						width="100%"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="admin@gmail.com"
						scale={5 / 4}
					/>
					<Input
						name="password"
						width="100%"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="123456"
						scale={5 / 4}
					/>
					<button type="submit" className="btn">
						Login
					</button>
				</form>
			</Page>
		</section>
	);
}
