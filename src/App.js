// import logo from './logo.svg';
import './App.css';
import PhonebookBox from './components/PhonebookBox';
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownZA, faUserPlus, faMagnifyingGlass, faUserTie, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';



function App() {
  return (
    <div className='container'>
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
      <div className='row mt-5'>

        <div className="col-lg col-md-4 col-sm-12 mb-4 mt-3">
          <div className="card" style={{ background: "#CCC" }}>
            <div className='row g-0'>
              <div className='col-auto circle-icon mt-2'>
                  <FontAwesomeIcon icon={faUserTie} />
              </div>
              <div className='col'>
                <div className="card-body p-2">
                  <p className='m-0'>John Doe</p>
                  <p className='m-0'>+123 456 789</p>
                  <button className="btn p-1"><FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className="btn p-1"><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg col-md-4 col-sm-12 mb-4 mt-3">
          <div className="card" style={{ background: "#CCC" }}>
            <div className='row g-0'>
              <div className='col-auto circle-icon mt-2'>
                  <FontAwesomeIcon icon={faUserTie} />
              </div>
              <div className='col'>
                <div className="card-body p-2">
                  <p className='m-0'>John Doe</p>
                  <p className='m-0'>+123 456 789</p>
                  <button className="btn p-1"><FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className="btn p-1"><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg col-md-4 col-sm-12 mb-4 mt-3">
          <div className="card" style={{ background: "#CCC" }}>
            <div className='row g-0'>
              <div className='col-auto circle-icon mt-2'>
                  <FontAwesomeIcon icon={faUserTie} />
              </div>
              <div className='col'>
                <div className="card-body p-2">
                  <p className='m-0'>John Doe</p>
                  <p className='m-0'>+123 456 789</p>
                  <button className="btn p-1"><FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className="btn p-1"><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg col-md-4 col-sm-12 mb-4 mt-3">
          <div className="card" style={{ background: "#CCC" }}>
            <div className='row g-0'>
              <div className='col-auto circle-icon mt-2'>
                  <FontAwesomeIcon icon={faUserTie} />
              </div>
              <div className='col'>
                <div className="card-body p-2">
                  <p className='m-0'>John Doe</p>
                  <p className='m-0'>+123 456 789</p>
                  <button className="btn p-1"><FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className="btn p-1"><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg col-md-4 col-sm-12 mb-4 mt-3">
          <div className="card" style={{ background: "#CCC" }}>
            <div className='row g-0'>
              <div className='col-auto circle-icon mt-2'>
                  <FontAwesomeIcon icon={faUserTie} />
              </div>
              <div className='col'>
                <div className="card-body p-2">
                  <p className='m-0'>John Doe</p>
                  <p className='m-0'>+123 456 789</p>
                  <button className="btn p-1"><FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className="btn p-1"><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
