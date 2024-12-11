"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../../../_components/ui/button";
import { useState } from "react";
import CreateProductDialog from "../create-product-dialog";

const ButtonAddProduct = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Novo Produto
            </Button>

            <CreateProductDialog
                open={open}
                onOpenChange={setOpen}
            />
        </>
    )
}

export default ButtonAddProduct;