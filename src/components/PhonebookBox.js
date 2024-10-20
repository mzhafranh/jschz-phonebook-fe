import { useState, useEffect } from "react"
import PhonebookForm from "./PhonebookForm"
import PhonebookList from "./PhonebookList"
import PhonebookTopBar from "./PhonebookTopbar"

export default function PhonebookBox() {
    const [data, setData] = useState([]);  // To store the fetched data
    const [loading, setLoading] = useState(true);  // To manage loading state
    const [error, setError] = useState(null);  // To handle errors

    useEffect(() => {
        // Fetch data when the component mounts
        fetch('http://localhost:3001/api/phonebooks')  // Example API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  // Parse the response as JSON
            })
            .then(data => {
                setData(data);  // Update state with the fetched data
                setLoading(false);  // Set loading to false once data is fetched
            })
            .catch(error => {
                setError(error);  // Handle errors by setting the error state
                setLoading(false);  // Also stop loading if there's an error
            });
    }, []);  // Empty dependency array means this effect runs only once after the initial render

    const [phonebook, setPhonebook] = useState(data.phonebooks)

    const addPhonebook = (id, name, phone) => {
        setPhonebook([{ id, name, phone, avatar: null }, ...phonebook])
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


    if (!loading) {
        return (
            <div className='container'>
                <PhonebookTopBar />
                <div className="card-body">
                    {data ? <PhonebookList data={data.phonebooks} remove={removePhonebook} update={updatePhonebook} /> : ''}
                </div>
                {/* {data ? <p>Data: {JSON.stringify(data.phonebooks)}</p> : <p>Loading...</p>} */}
            </div>
        )
    }
}