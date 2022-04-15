import WordItem from "./WordItem";

function Rhyme(props) {
  const rhyme = props.rhyme;
  const saveWord = props.saveWord;
  const loading = props.loading;
  const word = props.word;

  if (loading === "loading...") {
    return <p>loading...</p>;
  }

  let listItems;
  if (rhyme[0] === "no results") {
    listItems = "no results";
    return (
      <>
        <h2>Words that Rhyme with {word}</h2>
        <p>{listItems}</p>
      </>
    );
  }
  if (Object.keys(rhyme).length > 0) {
    listItems = [];
    for (const [idx, group] of Object.entries(rhyme)) {
      listItems.push(<h3 key={idx}>Syllables: {idx}</h3>);
      for (let i = 0; i < group.length; i++) {
        let item = group[i];
        listItems.push(
          <WordItem
            key={"rhymes_group" + idx + "_" + i}
            word={item.word}
            saveWord={saveWord}
          ></WordItem>
        );
      }
    }
    return (
      <>
        <h2>Words that Rhyme with {word}</h2>
        <ul>{listItems}</ul>
      </>
    );
  }
}

export default Rhyme;
