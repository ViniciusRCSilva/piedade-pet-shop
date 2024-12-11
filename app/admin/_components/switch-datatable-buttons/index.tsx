"use client"

import { Button } from "@/app/_components/ui/button"
import { ClipboardListIcon, LayoutDashboardIcon } from "lucide-react"

interface AdminNavProps {
    activeView: "products" | "orders"
    onViewChange: (view: "products" | "orders") => void
}

const AdminNav = ({ activeView, onViewChange }: AdminNavProps) => {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant={activeView === "products" ? "default" : "outline"}
                onClick={() => onViewChange("products")}
            >
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                Painel Administrativo
            </Button>
            <Button
                variant={activeView === "orders" ? "default" : "outline"}
                onClick={() => onViewChange("orders")}
            >
                <ClipboardListIcon className="mr-2 h-4 w-4" />
                Pedidos
            </Button>
        </div>
    )
}

export default AdminNav