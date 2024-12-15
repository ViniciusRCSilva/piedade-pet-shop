import { db } from "@/app/_lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import NavbarContent from "./navbar-content";

const Navbar = async () => {
    const clerkUser = await currentUser();
    const isAdmin = clerkUser?.publicMetadata.role === "admin";

    if (!clerkUser) {
        return <NavbarContent userdb={null} isAdmin={false} />;
    }

    const user = await db.user.findUnique({
        where: {
            clerkId: clerkUser.id
        }
    });

    return (
        <NavbarContent userdb={user} isAdmin={isAdmin} />
    );
}

export default Navbar;