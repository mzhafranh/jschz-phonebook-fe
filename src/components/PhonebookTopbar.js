import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownZA, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PhonebookForm from './PhonebookForm';


export default function PhonebookTopBar({ search, add, sort }) {
    const [query, setQuery] = useState('');  // State to hold the search query

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);  // Update the query state
        search(value, 'asc');    // Call the search function passed as a prop
    };

    const handleSortChange = (e) => {
        if (sort === 'asc') {
            search(query, 'desc');
        } else {
            search(query, 'asc');
        }
    }

    return (
        <div className='custom-row' style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            right: '10px',
        }}>
            <div className='custom-col-auto'>
                <button className='btn' onClick={handleSortChange} style={{ backgroundColor: "#AF8210" }}>
                    <FontAwesomeIcon icon={faArrowDownZA} />
                </button>
            </div>
            <div className='custom-col'>
                <div className='custom-input-group' style={{ border: '1px solid black', borderRadius: '3px' }} >
                    <span className='custom-input-group-text' style={{ borderRight: 'none', background: 'white' }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <input
                        className='custom-form-control'
                        type='text'
                        style={{ borderLeft: 'none' }}
                        value={query}  // Set the input's value to the query state
                        onChange={handleSearchChange}  // Call handleSearchChange on input change
                    />
                </div>
            </div>
            <div className='custom-col-auto'>
                <PhonebookForm add={add} />
            </div>
        </div>
    )
}