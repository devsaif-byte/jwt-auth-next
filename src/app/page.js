"use client";
import Link from "next/link";
import styles from "./page.module.css";
import {
	GeistProvider,
	CssBaseline,
	Page,
	Text,
	Button,
	Dot,
} from "@geist-ui/core";

export default function Home() {
	return (
		<GeistProvider>
			<CssBaseline />
			<main className={styles.main}>
				<Page>
					<Text h1>Hello and Welcome.</Text>
					<Link href="/login">
						<Button shadow type="secondary">
							Login
						</Button>
						<Text paddingTop={1}>
							<Dot style={{ marginRight: "15px" }} />
							<Dot style={{ marginRight: "15px" }} type="success" />
							<Dot style={{ marginRight: "15px" }} type="warning" />
							<Dot type="error" />
						</Text>
					</Link>
				</Page>
			</main>
		</GeistProvider>
	);
}
