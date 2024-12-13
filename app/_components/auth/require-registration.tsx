"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { checkRegistration } from "@/app/_actions/check-registration"
import Image from "next/image"

interface RequireRegistrationProps {
    children: React.ReactNode
}

export function RequireRegistration({ children }: RequireRegistrationProps) {
    const router = useRouter()
    const { user, isLoaded } = useUser()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        let isMounted = true

        async function verifyRegistration() {
            if (!isLoaded) return

            if (!user) {
                if (isMounted) setIsChecking(false)
                return
            }

            try {
                const dbUser = await checkRegistration(user.id)

                if (isMounted && (!dbUser || !dbUser.phone || !dbUser.address)) {
                    router.replace("/registro")
                }
            } catch (error) {
                console.error("Error checking user registration:", error)
                if (isMounted) router.replace("/registro")
            } finally {
                if (isMounted) setIsChecking(false)
            }
        }

        verifyRegistration()

        return () => {
            isMounted = false
        }
    }, [isLoaded, user, router])

    if (!isLoaded || isChecking) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-6">
                    <Image
                        src="/logo_draw.svg"
                        alt="Verificando..."
                        width={180}
                        height={180}
                        priority
                        className="animate-pulse"
                    />
                    {user && (
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="text-xl font-semibold text-foreground">
                                Verificando sua conta
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Aguarde um momento...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return <>{children}</>
}
