import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';


export default function PhonebookItem({id, avatar, name, phone, remove, update}) {
    return (
        <div className="col-lg-auto col-md-4 col-sm-12 mb-1 mt-3">
          <div className="card" style={{ background: "#CCC" }}>
            <div className='row g-0'>
              <div className='col-auto circle-icon mt-2 mb-2'>
                  <FontAwesomeIcon icon={faUserTie} />
              </div>
              <div className='col'>
                <div className="card-body p-2">
                  <p className='m-0'>{name}</p>
                  <p className='m-0'>{phone}</p>
                  <button className="btn p-1"><FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className="btn p-1"><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}