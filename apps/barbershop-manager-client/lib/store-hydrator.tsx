"use client";
type HydratorProps = {
    stores: string[] | string ;
    children: React.ReactNode;
}
export default function StoreHydrator({ stores, children }: HydratorProps) {
    
	return <>{children}</>;
}
