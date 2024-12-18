import { useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import PhonebookDeleteConfirmation from "./PhonebookDeleteConfirmation";
import { useSelector, useDispatch } from 'react-redux';
import { handleFileUpload, updatePhonebook } from "../actions";

export default function PhonebookItem({ id, avatar, name, phone}) {
  const dispatch = useDispatch();
  const { keyword, sort } = useSelector((state) => state.phonebooks);

  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(name);
  const [editablePhone, setEditablePhone] = useState(phone);
  const fileInputRef = useRef(null);


  const handleEditClick = () => {
    setIsEditing(!isEditing);  
  };

  const handleNameChange = (e) => {
    setEditableName(e.target.value);  
  };

  const handlePhoneChange = (e) => {
    setEditablePhone(e.target.value);  
  };

  const handleSave = () => {
    dispatch(updatePhonebook(id, editableName, editablePhone))
    setIsEditing(false); 
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert('No file selected')
      return
    }
    dispatch(handleFileUpload(file, id, keyword, sort))
  };

  return (
    <div className="custom-width mb-1 mt-3" aria-label="PhonebookItem" >
      <div className="card" style={{ background: "#CCC", paddingLeft: "5px"}}>
        <div className='row g-0'>
          {avatar !== "null" ? (
            <div className='col-auto circle-icon mt-2 mb-2' onClick={handleIconClick} style={{ cursor: 'pointer' }}>
              <img src={`http://localhost:3001/uploads/${avatar}`} style={{height:"100%"}} alt="profile"/>
            </div>
          ) : (
            <div className='col-auto circle-icon mt-2 mb-2' onClick={handleIconClick} style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faUserTie} />
            </div>
          )
          }
          <div className='col'>
            <div className="card-body p-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editableName}
                    onChange={handleNameChange}
                    className="custom-form-control"
                    style={{marginBottom:"5px"}}
                    aria-label="edit-name"
                  />
                  <input
                    type="text"
                    value={editablePhone}
                    onChange={handlePhoneChange}
                    className="custom-form-control"
                    style={{marginBottom:"5px"}}
                    aria-label="edit-phone"
                  />
                  <button className="btn" onClick={handleSave} aria-label="save-item">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </button>
                </>
              ) : (
                <>
                  <p className='m-0'>{editableName}</p>
                  <p className='m-0'>{editablePhone}</p>
                  {/* <p>{id}</p> */}
                  <button className="btn p-1" onClick={handleEditClick} aria-label="edit-item">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <PhonebookDeleteConfirmation id={id}/>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}