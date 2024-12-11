import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "../ui/sheet";
import { House, InstagramLogo, Layout, List, Note, SignIn, SignOut, Storefront, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

const Navbar = async () => {
    const user = await currentUser();
    const isAdmin = user?.publicMetadata.role === "admin"

    return (
        <nav className="fixed w-full z-50">
            <div className="flex w-full items-center justify-between border-b border-muted bg-white/90 px-6 py-4 backdrop-blur-md">
                {/* Logo */}
                <Link className="flex items-center gap-2" href="/">
                    <Image src="/logo_draw.png" alt="Piedade Pet Shop" width={50} height={50} draggable={false} quality={80} />
                    <Image src="/logo_name.png" alt="Piedade Pet Shop" width={100} height={50} className="hidden lg:flex" draggable={false} quality={80} />
                </Link>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost">
                            <List className="h-6 w-6 text-muted-foreground" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <div className="flex flex-col gap-6">
                            <SheetTitle className="flex items-center gap-2">
                                <span className="text-2xl font-medium">Menu</span>
                            </SheetTitle>

                            <div className="border-t pt-6">
                                <SignedIn>
                                    <div className="flex items-center gap-3">
                                        <UserButton
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    avatarBox: "h-10 w-10"
                                                }
                                            }}
                                        />
                                        <div className="flex flex-col">
                                            <p>
                                                {user?.firstName} {user?.lastName}
                                            </p>
                                            <p
                                                className="text-sm text-muted-foreground"
                                            >
                                                {user?.emailAddresses[0].emailAddress}
                                            </p>
                                        </div>
                                    </div>
                                </SignedIn>

                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <SheetClose asChild>
                                            <Button className="w-full gap-2">
                                                <SignIn className="h-4 w-4" />
                                                Entrar
                                            </Button>
                                        </SheetClose>
                                    </SignInButton>
                                </SignedOut>
                            </div>

                            {isAdmin && (
                                <div className="flex flex-col gap-3 border-t pt-6">
                                    <p>Função de Administrador</p>
                                    <Link
                                        href="/admin"
                                        className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        <Layout className="h-4 w-4" />
                                        Painel Administrativo
                                    </Link>
                                </div>
                            )}

                            <div className="flex flex-col gap-6 border-t pt-6">
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <House className="h-4 w-4" />
                                    Página inicial
                                </Link>

                                <Link
                                    href="/products"
                                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <Storefront className="h-4 w-4" />
                                    Produtos
                                </Link>

                                {user && (
                                    <Link
                                        href="/orders"
                                        className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        <Note className="h-4 w-4" />
                                        Meus pedidos
                                    </Link>
                                )}
                            </div>

                            <div className="flex flex-col gap-6 border-t pt-6">
                                <Link
                                    href="http://api.whatsapp.com/send?1=pt_BR&phone=5581991919853"
                                    target="_blank"
                                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <WhatsappLogo className="h-4 w-4" />
                                    Contato
                                </Link>

                                <Link
                                    href="https://www.instagram.com/piedadepetshop/"
                                    target="_blank"
                                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <InstagramLogo className="h-4 w-4" />
                                    Instagram
                                </Link>
                            </div>

                            <SignedIn>
                                <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
                                    <span className="flex items-center gap-3 border-t pt-6 text-muted-foreground transition-colors cursor-pointer hover:text-primary">
                                        <SignOut className="h-4 w-4" />
                                        Sair da conta
                                    </span>
                                </SignOutButton>
                            </SignedIn>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav >
    );
}

export default Navbar;