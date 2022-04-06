function WordItem(props) {
    const word = props.word
    const saveWord = props.saveWord

    return (<li>
        <span>{word}</span>
        <button type="button" className="btn btn-secondary" onClick={() => { saveWord(word) }}>Save</button>
    </li>
    )
}

export default WordItem;