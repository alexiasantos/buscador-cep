import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/Api';
function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({})
  async function handleSearch() {
    if (!input) {
      alert("preencha algum CEP");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      alert("Ops erro ao buscar CEP!");
      setInput("");
    }
  }
  return (
    <div className="container">
      <h1 className="title">BUSCADOR CEP</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP" value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Estado: {cep.localidade} - {cep.uf} </span>
        </main>
      )}
    </div>
  );
}

export default App;
