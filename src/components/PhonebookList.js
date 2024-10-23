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
        <div className='row justify-content-center' style={{marginTop:"50px"}}>
            {/* {JSON.stringify(data)} */}
            {nodeList}
        </div>
    )
}