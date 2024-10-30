import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setFormVisibility, setName, setPhone } from "../actions";


export default function PhonebookForm({ add, keyword, sort }) {
    const dispatch = useDispatch();
    const { name, phone, formVisible } = useSelector((state) => state.phonebooks);


    const handleOpenForm = () => {
        dispatch(setFormVisibility(true));
    };

    const handleCloseForm = () => {
        dispatch(setFormVisibility(false));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(add(name, phone, keyword, sort));
        
        console.log("Form Submitted", { name, phone });
        
        dispatch(setName(""));
        dispatch(setPhone(""));
        dispatch(setFormVisibility(false));
    };

    return (
        <div>
            {/* Button to show the form */}
            <button className='btn' onClick={handleOpenForm} style={{ backgroundColor: "#AF8210" }}>
                <FontAwesomeIcon icon={faUserPlus} />
            </button>

            {/* Fullscreen form overlay */}
            {formVisible && (
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
                    {/* The form inside the overlay */}
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "5px",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="custom-form-control"
                                    id="name"
                                    value={name}
                                    onChange={(e) => dispatch(setName(e.target.value))}
                                    required
                                    style={{ border: '1px solid black' }}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="custom-form-control"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => dispatch(setPhone(e.target.value))}
                                    required
                                    style={{ border: '1px solid black' }}
                                />
                            </div>
                            <div style={{ alignItems: "center", textAlign:"center"}}>

                                <button
                                    type="submit"
                                    className="btn"
                                    style={{ backgroundColor: "#AF8210", color: '#fff', margin: "5px 5px 5px 5px", width: "45%" }}>
                                    save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="btn"
                                    style={{ backgroundColor: "#AF8210", color: '#fff', margin: "5px 5px 5px 5px", width: "45%" }}
                                >
                                    cancel
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
