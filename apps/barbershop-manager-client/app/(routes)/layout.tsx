import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";
import { CART_ITEMS } from "@/data/cartData";
import { CartStoreProvider } from "@/providers/cart-store-provider";
import { QueryClient } from "@tanstack/react-query";

const getCart = async () => {
	// Simulate fetching cart data from an API with a delay
	await new Promise((resolve) => setTimeout(resolve, 100));
	return { items: CART_ITEMS };
};

export default async function RouteLayout({ children }: { children: React.ReactNode }) {
	// only check if the user is logged in, if not send them to the login page, otherwise they can see the app
	// const user = useAuthStoreUser();
	const queryClient = new QueryClient();

	// fetch and cache the cart via TanStack Query, then pass the resolved cart to the provider
	const cart = await queryClient.fetchQuery({
		queryKey: ["cart"],
		queryFn: getCart,
	});
	console.log("Fetched cart:", cart);
	return (
		<CartStoreProvider initialState={cart}>
			<div className="flex min-h-screen flex-col">
				<Navbar />
				<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:px-6">{children}</main>
				<Footer />
			</div>
		</CartStoreProvider>
	);
}
