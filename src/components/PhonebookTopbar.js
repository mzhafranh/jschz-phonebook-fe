import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownZA, faUserPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export default function PhonebookTopBar() {

    return (
        <div className='row' style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            right: '10px',
            width: '100%'
        }}>
            <div className='col-auto'>
                <button className='btn' style={{ backgroundColor: "#AF8210" }}>
                    <FontAwesomeIcon icon={faArrowDownZA} />
                </button>
            </div>
            <div className='col'>
                <div className='input-group' style={{ border: '1px solid black', borderRadius: '3px' }} >
                    <span className='input-group-text' style={{ borderRight: 'none', background: 'white' }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <input className='form-control' type='text' style={{ borderLeft: 'none' }}>
                    </input>
                </div>
            </div>
            <div className='col-auto'>
                <button className='btn' style={{ backgroundColor: "#AF8210" }}>
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
            </div>
        </div>
    )
}