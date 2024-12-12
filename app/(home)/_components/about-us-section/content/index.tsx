import { AccordionContent, AccordionItem, AccordionTrigger } from "@/app/_components/ui/accordion";

interface ContentProps {
    value: string;
    title: string;
    description: string;
}

const Content = ({ value, title, description }: ContentProps) => {
    return (
        <AccordionItem value={value}>
            <AccordionTrigger className="text-xl text-muted-foreground font-bold">
                {title}
            </AccordionTrigger>
            <AccordionContent className="text-center text-muted-foreground lg:text-base lg:text-left">
                {description}
            </AccordionContent>
        </AccordionItem>
    )
}

export default Content;