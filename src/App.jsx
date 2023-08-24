import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import "./App.css"

const API_ADDRESS = "https://api.datamuse.com/words"

function App() {
  const [wordQuery, setWordQuery] = useState("")
  
  const fetchSynonyms = async (key) => {
    const queryWord = key.queryKey[1]
    const res = await fetch(`${API_ADDRESS}?rel_syn=${queryWord}`)
    return res.json()
  }
  
  const {isLoading, data} = useQuery(["synonym", wordQuery], fetchSynonyms)

  const getSynonymLis = () => {
    const synonymLis = data.map(synonym => 
      <li 
        key={synonym.word}
        className="synonym-li"
      >
        {synonym.word}
      </li>
    )

    return synonymLis.length > 0 ? 
      <ul className="synonym-ul">{synonymLis}</ul> : 
      <p>{wordQuery && `No synonyms found for "${wordQuery}"`}</p>
  }

  return (
    <main className="container">
      <header>
        <h1>Thesaurus</h1>
        <form>
          <input
            value={wordQuery}
            onChange={e => setWordQuery(e.target.value)}
            placeholder="Type in a word"
          />
        </form>
      </header>

      { isLoading ? <p>loading...</p> : getSynonymLis()}
    </main>
  )
}

export default App
