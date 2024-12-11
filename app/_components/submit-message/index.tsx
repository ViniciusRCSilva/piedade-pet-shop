"use client"

import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

const SubmitMessage = () => {
    const [message, setMessage] = useState('')

    const handleSubmitMessage = () => {
        window.open(`https://wa.me/5581991919853?text=${message}`, '_blank')
        setMessage("")
    }

    return (
        <>
            <Textarea
                placeholder="Escreva aqui sua mensagem..."
                className="mb-6 h-[15vh] resize-none text-muted-foreground placeholder:text-muted-foreground"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />

            <Button disabled={message.length == 0} className="flex w-fit items-center gap-2" onClick={handleSubmitMessage}>
                <CaretRight />
                Enviar mensagem
            </Button >
        </>
    );
}

export default SubmitMessage;