import { AspectRatio as AspectRatioPrimitive } from "radix-ui";

export default function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
	return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}
