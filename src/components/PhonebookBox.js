import { useState } from "react"
import PhonebookForm from "./PhonebookForm"
import PhonebookList from "./PhonebookList"


export default function PhonebookBox() {
    const [phonebook, setPhonebook] = useState([])
    const addPhonebook = (id, name, phone) => {
        setPhonebook([{id, name, phone, avatar: null}, ...phonebook])
    }
    const removePhonebook = (id) => {
        setPhonebook(phonebook.filter(pb => pb.id !== id))
    }
    
    const updatePhonebook = (id, name, phone) => {
        setPhonebook(phonebook.map(pb => {
            if (pb.id === id) {
                pb.name = name
                pb.phone = phone
            }
            return pb
        }))
    }
    
    return (
        <div className="card">
            <PhonebookForm />
            <div className="card-body">
                <PhonebookList data={[phonebook, removePhonebook, updatePhonebook]}/>
            </div>
        </div>
    )
}