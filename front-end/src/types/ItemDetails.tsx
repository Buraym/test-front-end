import React from "react";

export interface IItemDetails {
    id: string;
    name: string;
    alternate_names: [];
    species: string;
    gender: "female" | "male";
    house: string;
    house_icon?: React.JSX.Element;
    dateOfBirth: string;
    yearOfBirth: number;
    wizard: boolean;
    ancestry: string;
    eyeColour: string;
    hairColour: string;
    wand: {
        wood: string;
        core: string;
        length: number;
    };
    patronus: string;
    hogwartsStudent: boolean;
    hogwartsStaff: boolean;
    actor: string;
    alternate_actors: Array<string>;
    alive: boolean;
    image: string;
}
