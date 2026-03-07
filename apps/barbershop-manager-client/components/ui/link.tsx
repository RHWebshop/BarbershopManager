import { cn } from "@/lib/utils";
import NextLink, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";
interface CustomLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
	label: string;
	external?: boolean;
	disabled?: boolean;
}
export default function Link({ children,label, className, external = false, disabled = false, ...props }: CustomLinkProps) {
	return (
		<NextLink
			title={label}
			aria-label={label}
			className={cn("aria-disabled:pointer-events-none", className)}
			aria-disabled={disabled}
			target={external ? "_blank" : undefined}
			rel={external ? "noreferrer noopener" : undefined}
			{...props}
		>
			{children}
		</NextLink>
	);
}
