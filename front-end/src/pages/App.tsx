import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";

import { ThemeDropdownButton } from "@/components/theme/theme-dropdown-btn";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { CalendarX, WandSparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme/theme-provider";

export default function App() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [characterNameSearch, setCharacterNameSearch] = useState<string>("");
    const { isFetching, data } = useQuery<any, Error, GridColDef[], any[]>({
        queryKey: ["staff", characterNameSearch],
        queryFn: async () => {
            const response = await fetch(
                "https://hp-api.onrender.com/api/characters/staff"
            );
            let result = await response.json();
            if (characterNameSearch !== "") {
                result = result.filter((char: any) =>
                    String(char.name).includes(characterNameSearch)
                );
            }
            result = result.map((char: any) => {
                return {
                    id: char.id,
                    name: char.name,
                    species: char.species,
                    gender: char.gender,
                    house: char.house,
                    dateOfBirth: char.dateOfBirth,
                    wand: char.wand,
                    patronus: char.patronus,
                    actor: char.actor,
                };
            });
            return result;
        },
    });
    const columns: GridColDef[] = [
        {
            field: "name",
            cellClassName: "cursor-pointer",
            headerName: "Nome completo",
            width: 150,
        },
        {
            field: "species",
            renderCell: (params) => {
                let species_dict = {
                    human: "Humano",
                    "half-giant": "Meio gigante",
                    werewolf: "Lobisomen",
                    cat: "Gato",
                    ghost: "Fantasma",
                    centaur: "Centauro",
                };
                // @ts-ignore
                return species_dict[params.value];
            },
            align: "center",
            headerAlign: "center",
            headerName: "Espécie",
            width: 150,
        },
        {
            field: "gender",
            renderCell: (params) =>
                params.value === "male"
                    ? "Masculino"
                    : params.value === "female" && "Feminino",
            align: "center",
            headerAlign: "center",
            headerName: "Gênero",
            width: 150,
        },
        {
            field: "house",
            renderCell: (params) => {
                let houses_dict = {
                    Gryffindor: "Grifinória",
                    Hufflepuff: "Lufa-Lufa",
                    Ravenclaw: "Corvinal",
                    Slytherin: "Sonserina",
                };
                return (
                    // @ts-ignore
                    houses_dict[params.value] && (
                        <div className="flex w-full h-full justify-center items-center">
                            <Badge variant={params.value}>
                                {/* @ts-ignore */}
                                {houses_dict[params.value]}
                            </Badge>
                        </div>
                    )
                );
            },
            align: "center",
            headerAlign: "center",
            headerName: "Casa",
            width: 150,
        },
        {
            field: "dateOfBirth",
            renderCell: (params) => {
                let date = new Date(params.value);
                return date && date.valueOf() ? (
                    `${
                        date.getDate() < 10
                            ? "0" + String(date.getDate())
                            : date.getDate()
                    }/${
                        date.getMonth() + 1 < 10
                            ? "0" + String(date.getMonth() + 1)
                            : date.getMonth() + 1
                    }/${date.getFullYear()}`
                ) : (
                    <div className="flex w-full h-full justify-center items-center">
                        <CalendarX className="text-primary" size={18} />
                    </div>
                );
            },
            align: "center",
            headerAlign: "center",
            headerName: "Data de nascimento",
            width: 150,
        },
        {
            field: "wand",
            renderCell: (params) => {
                let wand = params.value;
                let wand_wood_dict = {
                    holly: "Azevinho",
                    yew: "Teixo",
                    birch: "Vidoeiro",
                    walnut: "Nogueira",
                    willow: "Salgueiro",
                    oak: "Carvalho",
                    maple: "Bordo",
                    cherry: "Cerejeira",
                    cedar: "Cedro",
                    acacia: "Acácia",
                    ebony: "Ébano",
                    pine: "Pinho",
                    elm: "Olmo",
                    ash: "Freixo",
                    ivy: "Hera",
                    chestnut: "Castanheira",
                    hawthorn: "Espinheiro",
                    laurel: "Louro",
                    fir: "Abeto",
                    lime: "Tília",
                    beech: "Faia",
                    poplar: "Álamo",
                    pear: "Pereira",
                    redwood: "Sequoia",
                    sycamore: "Plátano",
                    cypress: "Cipreste",
                    hazel: "Aveleira",
                    alder: "Amieiro ",
                };
                let wand_core_dict = {
                    "dragon heartstring": "Corda do Coração de Dragão",
                    "unicorn tail hair": "Pelo de caúda de unicórnio",
                    "unicorn hair": "Pelo de unicórnio",
                };
                return (
                    wand.wood !== "" &&
                    wand.core !== "" && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex w-full justify-start items-center gap-2">
                                        <WandSparkles
                                            size={18}
                                            className="text-primary"
                                        />
                                        {/* @ts-ignore */}
                                        {wand_wood_dict[wand.wood]}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        <b>Material:</b> {/* @ts-ignore */}
                                        {wand_wood_dict[wand.wood]}
                                    </p>
                                    <p>
                                        <b>Núcleo:</b> {/* @ts-ignore */}
                                        {wand_core_dict[wand.core]}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )
                );
            },
            align: "center",
            headerAlign: "center",
            headerName: "Varinha",
            description: "TESTE",
            width: 150,
        },
        {
            field: "patronus",
            renderCell: (params) => {
                let patronus_dict = {
                    "tabby cat": "Gata malhada",
                    doe: "Cerva",
                    wolf: "Lobo",
                    phoenix: "Fenix",
                    "persian cat": "Gato persa",
                };
                // @ts-ignore
                return patronus_dict[String(params.value).toLowerCase()];
            },
            align: "center",
            headerAlign: "center",
            headerName: "Patrono",
            width: 150,
        },
        {
            field: "actor",
            align: "center",
            headerAlign: "center",
            headerName: "Ator ou Atriz",
            width: 150,
        },
    ];

    return (
        <div className="flex flex-col place-items-start w-full p-8 gap-y-2">
            <div className="flex justify-between items-center w-full gap-2">
                <div className="w-1/3 flex justify-start items-center gap-2">
                    <Input
                        value={characterNameSearch}
                        className="min-w-24"
                        onChange={(ev) =>
                            setCharacterNameSearch(ev.target.value)
                        }
                        placeholder="Procurar pelo nome"
                    />
                </div>
                <ThemeDropdownButton />
            </div>
            <div className="flex flex-col place-items-start w-full">
                <DataGrid
                    className="w-full"
                    onCellClick={(params) => navigate(`/${params.id}`)}
                    loading={isFetching}
                    rows={data}
                    columns={columns}
                    localeText={
                        ptBR.components.MuiDataGrid.defaultProps.localeText
                    }
                    slotProps={{
                        loadingOverlay: {
                            variant: "skeleton",
                            noRowsVariant: "skeleton",
                        },
                    }}
                    ignoreDiacritics
                    density="compact"
                    sx={{
                        // background: "#fff",
                        "& .MuiTablePagination-toolbar": {
                            background: "#fff",
                            color: "#000",
                        },
                        "& .MuiDataGrid-cell": {
                            color: theme === "dark" ? "#fff" : "#000",
                        },
                    }}
                />
            </div>
        </div>
    );
}
