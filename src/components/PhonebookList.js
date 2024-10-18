import PhonebookItem from "./PhonebookItem"

export default function PhonebookList({ data, removePhonebook, updatePhonebook }) {
    const nodeList = data.map(
        (phonebook, index) => <PhonebookItem
            key={phonebook.id}
            avatar={phonebook.avatar}
            name={phonebook.name}
            phone={phonebook.phone}
            remove={removePhonebook}
            update={updatePhonebook}
        />)
    return (
        <>
            {nodeList}
        </>
    )
}