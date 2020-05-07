import React, { useEffect, useState } from "react";

// Styles
import "./styles.css";

// Services
import api from './services/api'

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    
    const response = await api.post('/repositories', {
      title: `New Repository ${Date.now()}`
    })

    const repository = response.data

    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`)
    .then(() => {
      const newRepositories = repositories.filter(repo => repo.id !== id)
      setRepositories(newRepositories)
    })
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repo =>
          <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
