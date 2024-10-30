import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownZA, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PhonebookForm from './PhonebookForm';
import { useDispatch } from 'react-redux';
import { setKeyword } from '../actions';


export default function PhonebookTopBar({ search, add, sort, keyword}) {
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        const value = e.target.value;
        dispatch(setKeyword(value))
        dispatch(search(value, sort, 1));
    };

    const handleSortChange = (e) => {
        if (sort === 'asc') {
            dispatch(search(keyword, 'desc'));
        } else {
            dispatch(search(keyword, 'asc'));
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
                        value={keyword}  // Set the input's value to the query state
                        onChange={handleSearchChange} 
                    />
                </div>
            </div>
            <div className='custom-col-auto'>
                <PhonebookForm add={add} keyword={keyword} sort={sort} />
            </div>
        </div>
    )
}