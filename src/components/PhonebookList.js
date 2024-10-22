import PhonebookItem from "./PhonebookItem"

export default function PhonebookList({ data, removePhonebook, updatePhonebook, uploadAvatar }) {
    const nodeList = data.map(
        (phonebook, index) => <PhonebookItem
            key={phonebook.id}
            id={phonebook.id}
            avatar={phonebook.avatar ? phonebook.avatar : 'null'}
            name={phonebook.name}
            phone={phonebook.phone}
            remove={removePhonebook}
            update={updatePhonebook}
            uploadAvatar={uploadAvatar}
        />)
    return (
        <div className='row mt-5 justify-content-center'>
            {/* {JSON.stringify(data)} */}
            {nodeList}
        </div>
    )
}