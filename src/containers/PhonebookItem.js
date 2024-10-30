import { useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import PhonebookDeleteConfirmation from "./PhonebookDeleteConfirmation";
import { useDispatch } from 'react-redux';

export default function PhonebookItem({ id, avatar, name, phone, remove, update, uploadAvatar, keyword, sort }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(name);
  const [editablePhone, setEditablePhone] = useState(phone);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

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
    dispatch(update(id, editableName, editablePhone))
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
    dispatch(uploadAvatar(file, id))
  };

  return (
    <div className="custom-width mb-1 mt-3">
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
                  />
                  <input
                    type="text"
                    value={editablePhone}
                    onChange={handlePhoneChange}
                    className="custom-form-control"
                    style={{marginBottom:"5px"}}
                  />
                  <button className="btn" onClick={handleSave}>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </button>
                </>
              ) : (
                <>
                  <p className='m-0'>{editableName}</p>
                  <p className='m-0'>{editablePhone}</p>
                  {/* <p>{id}</p> */}
                  <button className="btn p-1" onClick={handleEditClick}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <PhonebookDeleteConfirmation id={id} remove={remove} keyword={keyword} sort={sort}/>
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