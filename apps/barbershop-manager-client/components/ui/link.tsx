import NextLink, { LinkProps } from "next/link";
interface CustomLinkProps extends LinkProps {
	children: React.ReactNode;
	className?: string;
	external?: boolean; // new prop to indicate if the link is external
}
export default function Link({ children, className, external = false, ...props }: CustomLinkProps) {
	return (
		<NextLink
			className={className}
			target={external ? "_blank" : undefined}
			rel={external ? "noreferrer noopener" : undefined}
			{...props}
		>
			{children}
		</NextLink>
	);
}
