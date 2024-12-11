import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface MiniCardProps {
    icon: ReactNode;
    content: string;
}

const MiniCard = ({ icon, content }: MiniCardProps) => {
    return (
        <Card className="flex flex-col w-36 items-center">
            <CardHeader>
                <CardTitle>
                    {icon}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    );
};

export default MiniCard;