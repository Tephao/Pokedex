import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

import fire from '../data/fire.json';
import ice from '../data/ice.json';
import { apifetch } from '../utils/api-fetch';
import { formatPokemonData } from "../utils/pokemon-helper";
import Loader from './Loader';

const PokemonsContainer = ({ type }) => {
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        load()
    }, [type])

    useEffect(() => {
        setLoading(false)
    }, [pokemons])

    const load = async () => {
        setLoading(true);
       // let pokemonList = fire.pokemon;
       // if (type == 'ice')
       //     pokemonList = ice.pokemon

         const { pokemon: pokemonList } = await apifetch(`/type/${type}`);

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
        <>
            {
                loading ?
                    <Loader />
                    :
                    <div className='pokemons-container'>
                        {pokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
                    </div>
            }
        </>
    );
};

export default PokemonsContainer;