import PhonebookItem from "./PhonebookItem"

export default function PhonebookList({ data, removePhonebook, updatePhonebook }) {
    const nodeList = data.map(
        (phonebook, index) => <PhonebookItem
            id={phonebook.id}
            avatar={phonebook.avatar ? phonebook.avatar : 'null'}
            name={phonebook.name}
            phone={phonebook.phone}
            remove={removePhonebook}
            update={updatePhonebook}
        />)
    return (
        <div className='row mt-5 justify-content-center'>
            {nodeList}
        </div>
    )
}