import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addPhonebook } from "../actions";
import { useNavigate } from 'react-router-dom';


export default function PhonebookForm() {
    const dispatch = useDispatch();
    const { keyword, sort } = useSelector((state) => state.phonebooks);
    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleCloseForm = () => {
        navigate('/');    
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addPhonebook(name, phone, keyword, sort));
        
        console.log("Form Submitted", { name, phone });
        
        setName("")
        setPhone("")
        navigate('/');    
    };

    return (
        <div aria-label="PhonebookForm" >
            {/* Button to show the form */}
            {/* Fullscreen form overlay */}
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
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
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    style={{ border: '1px solid black' }}
                                    aria-label="input-name"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="custom-form-control"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    style={{ border: '1px solid black' }}
                                    aria-label="input-phone"
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
        </div>
    );
}
