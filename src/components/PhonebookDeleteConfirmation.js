import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function PhonebookDeleteConfirmation({ id, remove }) {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleOpenConfirmation = () => {
        setIsFormVisible(true);
    };

    const handleCloseConfirmation = () => {
        setIsFormVisible(false);
    };

    const handleDelete = (e) => {
        remove(id)
        setIsFormVisible(false);
    };

    return (
        <>
            {/* Button to show the form */}
            <button className='btn p-1' onClick={handleOpenConfirmation}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>

            {/* Fullscreen form overlay */}
            {isFormVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999 // Ensure it blocks the entire screen
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "5px",
                            width: "40%",
                            height: "13%"
                        }}
                    >
                        <div style={{alignItems:"center", textAlign:"center"}}>
                        <p>Apakah anda yakin menghapus data ini? </p>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="btn"
                            style={{ backgroundColor: "#AF8210", color: '#fff', margin:"5px 5px 5px 5px", width:"45%"}}
                        >ya
                        </button>
                        <button
                            type="button"
                            onClick={handleCloseConfirmation}
                            className="btn"
                            style={{ backgroundColor: "#AF8210", color: '#fff', margin:"5px 5px 5px 5px", width:"45%" }}
                        >
                            tidak
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
