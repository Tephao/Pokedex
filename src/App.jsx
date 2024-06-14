import './App.css';
import React, { Suspense, useState } from 'react';
import TypesBar from './components/TypesBar';
import PokemonsContainer from './components/PokemonsContainer';

function App() {
  const [type, setType] = useState('fire');

  return (
    <div className='wrapper'>
      <h1 className='logo-pokemon'>Pokédex</h1>
      <TypesBar toggleType={setType} />
      <PokemonsContainer type={type} />
    </div>
  )
}

export default App
