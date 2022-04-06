import WordItem from "./WordItem";

function Rhyme(props) {
    const rhyme = props.rhyme
    const saveWord = props.saveWord

    const listItems = []

    if (Object.keys(rhyme).length > 0) {
        for (const [idx, group] of Object.entries(rhyme)) {
            listItems.push(<h3 key={idx}>Syllables: {idx}</h3>)
            for (let i = 0; i < group.length; i++) {
                let item = group[i]
                listItems.push(<WordItem key={'rhymes_group' + idx + '_' + i} word={item.word} saveWord={saveWord}></WordItem>)
            }
        }
    }
    return <ul>{listItems}</ul>
}

export default Rhyme;