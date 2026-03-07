import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
	const media = typeof window !== "undefined" ? window.matchMedia(query) : null; // avoid matchMedia duplication in subscribe and getSnapshot by creating it once and reusing it

	return useSyncExternalStore(
		(callback) => {
			// subscribe - how to subscribe/listen to changes.

			if (!media) return () => {};
			media.addEventListener("change", callback);
			return () => media.removeEventListener("change", callback);
		},
		() =>
			// how to read/get the current value. this gets called on the client, during render.
			media?.matches ?? false,

		// ! in nextjs components are rendered on the server first by default, so we tell the hook that the media query doesn't match on the server, to avoid hydration mismatches.
		() => false
	);
}
