"use client";
import NextImage, { ImageProps } from "next/image";

interface CustomImageProps extends ImageProps {
	sizes: string;
	className?: string;
}

export default function Image({ sizes, className, ...props }: CustomImageProps) {
	return (
		<div className={`group relative size-full overflow-hidden bg-muted ${className}`}>
			{/* Shimmer */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden group-has-[img[data-loaded=true]]:hidden">
				<div className="absolute -inset-full animate-[shimmer_1.5s_ease-in-out_infinite]   bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_40%,rgba(255,255,255,1)_50%,rgba(255,255,255,0.4)_60%,transparent_100%)]" />
			</div>

			<NextImage
				fill
				sizes={sizes}
				className="opacity-0 transition-opacity duration-500 data-[loaded=true]:opacity-100"
				onLoad={(e) => {
					e.currentTarget.dataset.loaded = "true";
				}}
				{...props}
			/>
		</div>
	);
}
