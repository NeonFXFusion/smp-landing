"use client";

import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
	useEffect(() => {
		const abortController = new AbortController();
		const incrementView = async () => {
			try {
				await fetch("/api/incr", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ slug }),
					signal: abortController.signal
				});
			} catch (error) {
				
			}
		}
		incrementView();
		return () => abortController.abort();
	}, [slug]);

	return null;
};
