import PhonebookItem from "../containers/PhonebookItem"
import { useSelector, useDispatch } from 'react-redux';


export default function PhonebookList() {
    const { phonebooks } = useSelector((state) => state.phonebooks);

    const nodeList = phonebooks.map(
        (phonebook, index) => <PhonebookItem
            key={phonebook.id}
            id={phonebook.id}
            avatar={phonebook.avatar ? phonebook.avatar : 'null'}
            name={phonebook.name}
            phone={phonebook.phone}
        />)
    return (
        <div className='row justify-content-center' style={{marginTop:"50px"}}>
            {/* {JSON.stringify(data)} */}
            {nodeList}
        </div>
    )
}