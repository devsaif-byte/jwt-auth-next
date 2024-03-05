"use client";
import { Button, Card } from "@geist-ui/core";
import Link from "next/link";
import React from "react";

export default function Navigation() {
	return (
		<Card>
			<Link href="/">
				<Button>Home</Button>
			</Link>
			<Link href="/this-is-public">
				<Button>Public-Route</Button>
			</Link>
			<Link href="/this-is-private">
				<Button>Private-Route</Button>
			</Link>
		</Card>
	);
}
