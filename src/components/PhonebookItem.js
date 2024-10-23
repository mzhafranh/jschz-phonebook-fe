import { useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import PhonebookDeleteConfirmation from "./PhonebookDeleteConfirmation";


export default function PhonebookItem({ id, avatar, name, phone, remove, update, uploadAvatar }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(name);
  const [editablePhone, setEditablePhone] = useState(phone);
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(!isEditing);  // Toggle between edit and view modes
  };

  const handleNameChange = (e) => {
    setEditableName(e.target.value);  // Update the name as user types
  };

  const handlePhoneChange = (e) => {
    setEditablePhone(e.target.value);  // Update the phone as user types
  };

  const handleSave = () => {
    update(id, editableName, editablePhone)
    setIsEditing(false);  // Exit edit mode after saving
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
    uploadAvatar(file, id)
  };

  return (
    <div className="custom-width mb-1 mt-3">
      <div className="card" style={{ background: "#CCC", paddingLeft: "5px"}}>
        <div className='row g-0'>
          {avatar != "null" ? (
            <div className='col-auto circle-icon mt-2 mb-2' onClick={handleIconClick} style={{ cursor: 'pointer' }}>
              <img src={`http://localhost:3001/uploads/${avatar}`} style={{height:"100%"}}/>
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
                  {/* Editable name and phone inputs */}
                  <input
                    type="text"
                    value={editableName}
                    onChange={handleNameChange}
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    value={editablePhone}
                    onChange={handlePhoneChange}
                    className="form-control mb-2"
                  />
                  <button className="btn" onClick={handleSave}>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </button>
                </>
              ) : (
                <>
                  {/* Display name and phone as text when not editing */}
                  <p className='m-0'>{editableName}</p>
                  <p className='m-0'>{editablePhone}</p>
                  <button className="btn p-1" onClick={handleEditClick}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <PhonebookDeleteConfirmation id={id} remove={remove}/>
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