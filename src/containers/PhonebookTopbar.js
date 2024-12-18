import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownZA, faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import PhonebookForm from './PhonebookForm';
import { useSelector, useDispatch } from 'react-redux';
import { cleanPhonebook, refreshPhonebookData, setKeyword } from '../actions';
import { useNavigate } from 'react-router-dom';


export default function PhonebookTopBar() {
    const dispatch = useDispatch();
    const { keyword, sort } = useSelector((state) => state.phonebooks);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const value = e.target.value;
        dispatch(setKeyword(value))
        dispatch(refreshPhonebookData(value, sort, 1));
    };

    const handleSortChange = (e) => {
        if (sort === 'asc') {
            dispatch(refreshPhonebookData(keyword, 'desc'));
        } else {
            dispatch(refreshPhonebookData(keyword, 'asc'));
        }
    }

    const handleOpenForm = () => {
        dispatch(cleanPhonebook())
        navigate('/add')
    }

    return (
        <div className='custom-row' aria-label="PhonebookTopBar"
            style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                right: '10px',
            }}>
            <div className='custom-col-auto'>
                <button className='btn' onClick={handleSortChange} style={{ backgroundColor: "#AF8210" }} aria-label="sort">
                    <FontAwesomeIcon icon={faArrowDownZA} />
                </button>
            </div>
            <div className='custom-col'>
                <div className='custom-input-group' style={{ border: '1px solid black', borderRadius: '3px' }} aria-label="search">
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
                <button className='btn' onClick={handleOpenForm} style={{ backgroundColor: "#AF8210" }} data-testid="form-button">
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
            </div>
        </div>
    )
}