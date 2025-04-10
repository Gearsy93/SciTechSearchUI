import { Menu } from "lucide-react";
import { MdButton } from "@/components/ui/md-button";
import { useNavigationDrawer } from "@/components/navigation-drawer-context";

export default function Header() {
    const { openDrawer } = useNavigationDrawer()

    return (
        <header
            className="sticky top-0 z-40 flex h-20 w-full items-center bg-surface-container-low/90 backdrop-blur-sm px-4 shadow-sm">
            <MdButton variant="text" size="icon" className="md-elevation-0" onClick={openDrawer}>
                <Menu className="h-6 w-6"/>
                <span className="sr-only">Open menu</span>
            </MdButton>
            <h1 className="ml-4 text-[26px] font-medium tracking-tight text-on-surface">SciTech Search</h1>

        </header>
    );
}
