import React, { useState, useEffect } from 'react';
import { apifetch } from '../utils/api-fetch';
import { getTypeIconSrc } from '../utils/pokemon-helper';

//import { results } from '../data/type.json';

const TypesBar = ({ toggleType }) => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const { results } = await apifetch('/type');
        const tipos = results
        .filter(item => item.name !== 'unknown' &&
        item.name !== 'shadow')
        setTypes(tipos)
    }

    return (
        <nav className='types-bar'>
            {
                types.map(({ name }) => {
                    const typeImg = getTypeIconSrc(name);

                    return (
                        <a
                            key={name}
                            className={name}
                            onClick={() => toggleType(name)}
                        >
                            <img src={typeImg} alt={name} />
                        </a>
                    );
                })
            }
        </nav>
    );
};

export default TypesBar;