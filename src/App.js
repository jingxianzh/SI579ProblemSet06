import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Synonyms from './components/Synonyms';
import Rhyme from './components/Rhyme';
// import WordItem from './components/WordItem'

function groupBy(objects, property) {
  // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
  // value for property (obj[property])
  if (typeof property !== 'function') {
    const propName = property;
    property = (obj) => obj[propName];
  }

  const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
  for (const object of objects) {
    const groupName = property(object);
    //Make sure that the group exists
    if (!groupedObjects.has(groupName)) {
      groupedObjects.set(groupName, []);
    }
    groupedObjects.get(groupName).push(object);
  }

  // Create an object with the results. Sort the keys so that they are in a sensible "order"
  const result = {};
  for (const key of Array.from(groupedObjects.keys()).sort()) {
    result[key] = groupedObjects.get(key);
  }
  return result;
}

function App() {

  const [search, setSearch] = useState('');
  const [rhyme, setRhyme] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [saved, setSaved] = useState([]);
  const [searchRhymes, setSearchRhymes] = useState(false);
  const [searchSynonyms, setSearchSynonyms] = useState(false);
  const [url, setUrl] = useState('')

  const saveWord = (item) => {
    if (saved.includes(item)) return;
    setSaved([...saved, item])
  }

  const handleSearch = (type) => {
    //e.preventDefault();
    if (search === '') return;
    if (type === 'rhyme') {
      const url1 = 'https://api.datamuse.com/words?rel_rhy=' + search
      setUrl(url1)
      setSearchRhymes(~searchRhymes)
    } else if (type === 'synonyms') {
      const url2 = 'https://api.datamuse.com/words?ml=' + search
      setUrl(url2)
      setSearchSynonyms(~searchSynonyms)
    }
  }

  //update Rhyme
  useEffect(() => {
    if (url === '') return
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          setSaved([])
          data = groupBy(data, 'numSyllables'); //object
          setRhyme({ ...data })
          setSynonyms([])
        }
      }, (err) => {
        console.error(err);
      })
  }, [searchRhymes])
  // .then((json) => setRhyme(Object.values(json)))
  // .then((json) => setSynonyms(Object.values(json)))

  //update Synonyms
  useEffect(() => {
    if (url === '') return
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          setSaved([])
          setRhyme({})
          setSynonyms([...data]) //array
        }
      }, (err) => {
        console.error(err);
      })
  }, [searchSynonyms])

  return (
    <main className="container">
      <h1 class="row">Rhyme Finder (579 Problem Set 5)</h1>
      <h2>YOUR GITHUB CODE LINK GOES HERE: https://github.com/jingxianzh/SI579ProblemSet06/</h2>
      <div className="row">
        <div className="col">Saved words: {saved.join(', ')}</div>
      </div>
      <div className="row">
        <div className="input-group col"
          onSubmit={handleSearch}>
          <input className="form-control"
            type="text"
            placeholder="Enter a word"
            value={search}
            onChange={e => setSearch(e.target.value)} />
          <button type="button" className="btn btn-primary" onClick={() => { handleSearch('rhyme') }}>Show rhyming words</button>
          <button type="button" className="btn btn-secondary" onClick={() => { handleSearch('synonyms') }}>Show synonyms</button>
        </div>
      </div>
      <div className="row">
        <h2 className="col" ></h2>
      </div>
      <div className="output row">
        <output className="col">
          <Rhyme rhyme={rhyme} saveWord={saveWord}></Rhyme>
          <Synonyms synonyms={synonyms} saveWord={saveWord}></Synonyms>
        </output>
      </div>
    </main>
  );
}

export default App;
