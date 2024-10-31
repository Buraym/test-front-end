import { ThemeDropdownButton } from "@/components/theme/theme-dropdown-btn";
import { IItemDetails } from "@/types/ItemDetails";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import GryffindorLogoComponentIcon from "@/assets/gryffindorLogoComponent";
import SlytherinLogoComponentIcon from "@/assets/slytherinLogoComponent";
import RavenclawLogoComponentIcon from "@/assets/ravenclawLogoComponent";
import HufflePuffLogoComponentIcon from "@/assets/hufflepuffLogoComponent";
import placeholderImage from "@/assets/placeholderImg.png";

export default function ItemDetails() {
    let { id } = useParams();
    const navigate = useNavigate();
    const { isFetching, data, isError } = useQuery<
        any,
        Error,
        IItemDetails,
        any
    >({
        queryKey: ["staff_details", id],
        queryFn: async () => {
            const response = await fetch(
                `https://hp-api.onrender.com/api/character/${id}`
            );
            let result = await response.json();
            if (result.length === 0) {
                return new Response("", {
                    status: 404,
                    statusText: "Not Found",
                });
            }
            result = result[0];
            let species_dict = {
                human: "Humano",
                "half-giant": "Meio gigante",
                werewolf: "Lobisomen",
                cat: "Gato",
                ghost: "Fantasma",
                centaur: "Centauro",
            };
            // @ts-ignore
            result.species = species_dict[result.species];
            let houses_dict = {
                gryffindor: "Grifinória",
                hufflepuff: "Lufa-Lufa",
                ravenclaw: "Corvinal",
                slytherin: "Sonserina",
            };
            let houses_icon_dict = {
                gryffindor: (
                    <GryffindorLogoComponentIcon
                        fill="#ca8a04"
                        className="w-10 h-10"
                    />
                ),
                hufflepuff: (
                    <HufflePuffLogoComponentIcon
                        fill="#eab308"
                        className="w-10 h-10"
                    />
                ),
                ravenclaw: (
                    <RavenclawLogoComponentIcon
                        fill="#1e3a8a"
                        className="w-10 h-10"
                    />
                ),
                slytherin: (
                    <SlytherinLogoComponentIcon
                        fill="#14532d"
                        className="w-10 h-10"
                    />
                ),
            };
            result.house_icon =
                // @ts-ignore
                houses_icon_dict[String(result.house).toLowerCase()];
            // @ts-ignore
            result.house = houses_dict[String(result.house).toLowerCase()];
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
            result.wand.wood =
                // @ts-ignore
                wand_wood_dict[String(result.wand.wood).toLowerCase()];
            let wand_core_dict = {
                "dragon heartstring": "Corda do Coração de Dragão",
                "unicorn tail hair": "Pelo de caúda de unicórnio",
                "unicorn hair": "Pelo de unicórnio",
            };
            result.wand.core =
                // @ts-ignore
                wand_core_dict[String(result.wand.core).toLowerCase()];
            let formated_date = new Date(result.dateOfBirth);
            if (formated_date && formated_date.valueOf()) {
                result.dateOfBirth = `${
                    formated_date.getDate() < 10
                        ? "0" + String(formated_date.getDate())
                        : formated_date.getDate()
                }/${
                    formated_date.getMonth() + 1 < 10
                        ? "0" + String(formated_date.getMonth() + 1)
                        : formated_date.getMonth() + 1
                }/${formated_date.getFullYear()}`;
            } else {
                result.dateOfBirth = "--/--/--";
            }
            let patronus_dict = {
                "tabby cat": "a gata malhada",
                doe: "a cerva",
                wolf: "o lobo",
                phoenix: "a fenix",
                "persian cat": "o gato persa",
            };
            result.patronus =
                // @ts-ignore
                patronus_dict[String(result.patronus).toLowerCase()];
            let hair_colour_dict = {
                black: "moreno",
                brown: "castanho",
                blonde: "loiro",
                blond: "loiro",
                grey: "cinza",
                silver: "prateado",
            };
            // @ts-ignore
            result.hairColour = hair_colour_dict[result.hairColour];
            let eye_colour_dict = {
                yellow: "amarelos",
                dark: "pretos",
                blue: "azulados",
                green: "esverdeados",
                black: "pretos",
                brown: "castanhos",
            };
            result.eyeColour =
                result.eyeColour !== ""
                    ? // @ts-ignore
                      eye_colour_dict[result.eyeColour]
                    : "escuros";
            let ancestry_dict = {
                "half-blood": "meio-sangue",
                "pure-blood": "puro-sangue",
                squib: "aborto",
            };
            // @ts-ignore
            result.ancestry = ancestry_dict[result.ancestry];
            return result;
        },
    });

    return (
        <div className="flex flex-col place-items-start w-full p-8 gap-y-2">
            <div className="flex justify-between items-center w-full gap-2">
                <div className="flex justify-start items-center gap-x-2">
                    <Button
                        variant="ghost"
                        className="hover:text-primary hover:bg-transparent"
                        onClick={() => navigate("/")}
                    >
                        <MoveLeft size={16} />
                    </Button>
                </div>
                <ThemeDropdownButton />
            </div>
            <div className="flex flex-col place-items-start sm:items-center md:items-start w-full">
                <div className="flex flex-col md:flex-row justify-start items-center gap-4">
                    {!isFetching && !isError ? (
                        <img
                            loading="lazy"
                            src={data!.image}
                            alt={data!.name}
                            onError={(ev) => {
                                ev.currentTarget.src = placeholderImage;
                                ev.currentTarget.className = `${ev.currentTarget.className} object-scale-down bg-repeat grayscale`;
                            }}
                            className="rounded-lg w-full sm:h-[360px] md:w-[270px] md:h-[422px] lg:w-[400px] lg:h-[580px] object-cover object bg-repeat-round"
                        />
                    ) : (
                        <Skeleton className="w-[270px] h-[422px] rounded-lg" />
                    )}
                    <Separator
                        orientation="vertical"
                        className="h-[1px] w-full md:h-[408px] md:w-[1px] lg:w-[1px] lg:h-[560px]"
                    />
                    <div className="flex flex-col w-full min-h-[422px] justify-start items-center md:items-start gap-2">
                        {!isFetching && !isError ? (
                            <h2 className="flex justify-start items-center text-center md:text-start md:border-b pb-3 text-3xl md:text-5xl font-semibold tracking-tight first:mt-0">
                                {data!.name}
                            </h2>
                        ) : (
                            <Skeleton className="w-[120px] h-[20px] rounded-md" />
                        )}
                        {!isFetching && !isError && (
                            <>
                                <p className="leading-7 text-sm md:text-base text-center md:text-start">
                                    {data!.species},{" "}
                                    {data!.gender === "male"
                                        ? "Masculino"
                                        : "Feminino"}
                                    , nascido em {data!.dateOfBirth}
                                </p>
                                <p className="leading-7 text-sm md:text-base text-center md:text-start">
                                    {!data!.wizard
                                        ? `Não feiticeir${
                                              data!.gender === "male"
                                                  ? "o"
                                                  : "a"
                                          }`
                                        : `Feiticeir${
                                              data!.gender === "male"
                                                  ? "o"
                                                  : "a"
                                          }`}
                                    , olhos {data!.eyeColour}, cabelo{" "}
                                    {data!.hairColour}, {data!.ancestry}
                                </p>
                                {data!.wand.wood !== "" &&
                                    data!.wand.core !== "" &&
                                    data!.wand.length !== null && (
                                        <p className="leading-1 md:leading-7 text-sm md:text-base text-center md:text-start">
                                            Varinha de madeira de{" "}
                                            <i>
                                                <strong>
                                                    {data!.wand.wood}
                                                </strong>
                                            </i>{" "}
                                            {data!.wand.length &&
                                                `de ${data!.wand.length.toFixed(
                                                    2
                                                )} polegadas
                                                    de comprimento `}
                                            com núcleo mágico de{" "}
                                            <i>
                                                <strong>
                                                    {data!.wand.core}
                                                </strong>
                                            </i>
                                        </p>
                                    )}

                                {data!.house && (
                                    <p className="leading-1 md:leading-7 text-sm md:text-base">
                                        <div className="flex justify-start items-center gap-x-2">
                                            Afiliad
                                            {data!.gender === "male"
                                                ? "o"
                                                : "a"}{" "}
                                            a casa {data!.house}{" "}
                                            {data!.house_icon}
                                        </div>
                                    </p>
                                )}
                                {data!.patronus && (
                                    <p className="leading-1 md:leading-7 text-sm md:text-base">
                                        <div className="flex justify-start items-center gap-x-2">
                                            Tem como patrono {data!.patronus}
                                        </div>
                                    </p>
                                )}
                                <p className="leading-1 md:leading-7 text-sm md:text-base">
                                    <div className="flex justify-start items-center gap-x-2">
                                        El{data!.gender === "male" ? "e" : "a"}
                                        {data!.alive ? (
                                            <> ainda está vivo &#128512;</>
                                        ) : (
                                            <> não está mais vivo &#128128;</>
                                        )}
                                    </div>
                                </p>
                                {data!.actor !== "" && (
                                    <p className="leading-1 md:leading-7 text-sm md:text-base text-center md:text-start">
                                        O nome d
                                        {data!.gender === "male"
                                            ? "o ator"
                                            : "a atriz"}{" "}
                                        que interpreta é <i>"{data!.actor}"</i>
                                    </p>
                                )}
                                {data!.alternate_actors.length > 0 && (
                                    <div className="text-sm md:text-base">
                                        Outros artistas que tambem interpretaram
                                        este papel:
                                        <ul className="ml-6 list-disc">
                                            {data!.alternate_actors.map(
                                                (alternate_name) => (
                                                    <li>
                                                        <i>
                                                            "{alternate_name}"
                                                        </i>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </>
                        )}
                        {!isFetching &&
                            !isError &&
                            data!.alternate_names.length > 0 && (
                                <div className="text-sm">
                                    <p className="leading-1 md:leading-7 text-sm md:text-base">
                                        Tambem conhecido como:
                                    </p>
                                    <ul className="ml-6 list-disc">
                                        {data!.alternate_names.map(
                                            (alternate_name, idx) => (
                                                <li key={idx}>
                                                    <i>"{alternate_name}"</i>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
