import React, { useState } from 'react';
import axios from 'axios';
import '../styles/volonteri.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { VolunteerProps } from '../interfaces';

const Volunteer: React.FC<VolunteerProps> = ({ id, name, city, occupation, image, isAdmin, onUpdateVolunteer }) => {
    const [showModal, setShowModal] = useState<Boolean>(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleDeleteVolunteer = async (volunteerId: string) => {
        const confirmed = window.confirm("Želite li izbrisati ovog volontera?");
        if (!confirmed) {
            return; 
        }
        try {
            await axios.delete(`http://localhost:3001/volunteers/${volunteerId}`);
            onUpdateVolunteer();
        } catch (error) {
            console.error('Pogreška prilikom brisanja volontera:', error);
        }
    };
        
    return (
        <div className='volunteers'>
            <div className="volunteer">
                <div className="volunteerImageContainer">
                    <img src={image} alt={name} className="volunteerImage" onClick={toggleModal} />
                    <h3 className="volunteerName" onClick={toggleModal}>{name}</h3>
                </div>
                {isAdmin && (
                    <div className="deleteEditContainer">
                        <RiDeleteBinLine onClick={() => handleDeleteVolunteer(id)} className="deleteIcon deleteVolunteer" />
                    </div>
                )}
                <div className={`modal ${showModal ? 'show' : ''}`}>
                    <div className="modalContent">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <>
                            <div className="details">
                                <h3 className='titleThird'>{name}</h3>
                                <img src={image} alt={name} className="modalImage" />
                                <h3 className='strong'><strong>Grad:</strong> {city}</h3>
                                <h3 className='strong'><strong>Uloge:</strong> {occupation.join(', ')}</h3>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Volunteer;
