import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "../ui/link";

export default function CartEmpty() {
	return (
		<div className="space-y-4 py-16 text-center">
			<ShoppingCartIcon className="mx-auto size-12 text-muted-foreground" />
			<h1 className="text-2xl font-bold">העגלה ריקה</h1>
			<p className="text-muted-foreground">הוסיפו מוצרים מהחנות כדי לראותם כאן</p>
			<Button asChild>
				<Link href="/store">לחנות</Link>
			</Button>
		</div>
	);
}
