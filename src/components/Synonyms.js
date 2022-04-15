import WordItem from "./WordItem";

function Synonyms(props) {
  const synonyms = props.synonyms;
  const saveWord = props.saveWord;
  const loading = props.loading;
  const word = props.word;

  if (loading === "loading...") {
    return <p>loading...</p>;
  }

  let listItems;
  if (synonyms[0] === "no results") {
    listItems = "no results";
    return (
      <>
        <h2>Similar Words to {word}</h2>
        <p>{listItems}</p>
      </>
    );
  }
  if (synonyms.length > 0) {
    listItems = [];
    for (let i = 0; i < synonyms.length; i++) {
      let item = synonyms[i];
      listItems.push(
        <WordItem
          key={"synonyms" + i}
          word={item.word}
          saveWord={saveWord}
        ></WordItem>
      );
    }
    return (
      <>
        <h2>Similar Words to {word}</h2>
        <ul>{listItems}</ul>
      </>
    );
  }
}

export default Synonyms;
