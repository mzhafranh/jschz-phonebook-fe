import { useState } from "react"

export default function PhonebookItem({ id, avatar, name, phone, remove, update }) {
    const [onEdit, setOnEdit] = useState(false)
    const [phonebookName, setName] = useState(name)
    const [phonebookPhone, setPhone] = useState(phone)

    if (onEdit) {
        return (
            <div className="card">
                <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="form-control"
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
            </div>
        )
    } else {
        return (
            <div className="card">
                {id} {avatar} {name} {phone}
            </div>
        )
    }

}