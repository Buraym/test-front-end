import LogoSvgIcon from "@/assets/logoComponent";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ItemDetailsNotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen p-8 gap-y-4">
            <h1 className="flex items-center text-3xl font-extrabold tracking-tight lg:text-5xl gap-x-2">
                <LogoSvgIcon className="w-12 h-12" />
                Ocorreu um erro !
            </h1>
            <p className="leading-7 text-center">
                Infelizmente não foi possivel achar este personagem, tente
                novamente mais tarde.
            </p>
            <Button
                variant="outline"
                className="text-primary"
                onClick={() => navigate("/")}
            >
                <MoveLeft size={16} />
                Voltar
            </Button>
        </div>
    );
}
