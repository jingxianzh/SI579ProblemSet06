import WordItem from "./WordItem";

function Synonyms(props) {
    const synonyms = props.synonyms
    const saveWord = props.saveWord

    const listItems = []

    if (synonyms.length > 0) {
        for (let i = 0; i < synonyms.length; i++) {
            let item = synonyms[i]
            listItems.push(<WordItem key={'synonyms' + i} word={item.word} saveWord={saveWord}></WordItem>)
        }
    }
    return <ul>{listItems}</ul>
}

export default Synonyms;