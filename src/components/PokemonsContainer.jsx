import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

import fire from '../data/fire.json';
import ice from '../data/ice.json';
import { formatPokemonData } from "../utils/pokemon-helper";

const PokemonsContainer = ({ type }) => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        load()
    }, [type])

    const load = async () => {
        let pokemonList = fire.pokemon;
        if (type == 'ice')
            pokemonList = ice.pokemon
        // const { pokemon: pokemonList } = await apiFetch(`/type/${type}`);

        const novosPokemons = await Promise.all(
            pokemonList.map(async ({ pokemon }) => {
                const res = await fetch(pokemon.url);
                const data = await res.json();

                return formatPokemonData(data);
            })
        );

        setPokemons(novosPokemons)
    }

    return (
        <div className='pokemons-container'>
            {pokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
        </div>
    );
};

export default PokemonsContainer;