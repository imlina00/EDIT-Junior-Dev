import React, { useState } from 'react';
import axios from 'axios';
import '../styles/aktivnosti.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { useUserRole } from './UserRoleContext';
import { Participant } from '../interfaces';
import { ActivityProps } from '../interfaces';

const Activity: React.FC<ActivityProps> = ({ id, name, date, description, organizer, location, image, participants, isAdmin, onDeleteParticipant }) => {
    const [showForm, setShowForm] = useState(false);
    const [participantName, setParticipantName] = useState('');
    const { role } = useUserRole();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newParticipant: Participant = {
                id: String(Math.random()),
                name: participantName,
            };

            const updatedParticipants = [...participants, newParticipant];

            await axios.patch(`http://localhost:3001/activities/${id}`, { participants: updatedParticipants })

            onDeleteParticipant();
            setParticipantName('');
            setShowForm(false);
        } catch (error) {
            console.error('Greška prilikom slanja podataka:', error);
        }
    };

    const handleDeleteParticipant = async (participantId: string) => {
        const confirmed = window.confirm("Jeste li sigurni da želite izbrisati ovog sudionika?");
        if (!confirmed) {
            return;
        }
        try {
            const filteredParticipants = participants.filter(participant => participant.id !== participantId);
            await axios.patch(`http://localhost:3001/activities/${id}`, { participants: filteredParticipants });
            onDeleteParticipant();
        } catch (error) {
            console.error('Greška prilikom brisanja sudionika:', error);
        }
    };

    const handleDeleteActivity = async (activityId: string) => {
        const confirmed = window.confirm("Jeste li sigurni da želite izbrisati ovu aktivnost?");
        if (!confirmed) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3001/activities/${activityId}`);
            onDeleteParticipant();
        } catch (error) {
            console.error('Greška prilikom brisanja aktivnosti:', error);
        }
    };

    return (
        <div className="activity">
            <div className="deleteActivityContainer">
                {isAdmin && (
                    <RiDeleteBinLine onClick={() => handleDeleteActivity(id)} className="deleteIcon deleteActivity" />
                )}
            </div>
            <div className="imageContainer">
                <img src={image} alt="Slika aktivnosti" className="activityImage" />
            </div>

            <div className="details">
                <h2 id="activityName">{name}</h2>
                <p><strong>Datum:</strong> {date}</p>
                <p><strong>Opis:</strong> {description}</p>
                <p><strong>Organizator:</strong> {organizer}</p>
                <p><strong>Lokacija:</strong> {location}</p>
                <p><strong>Sudionici:</strong></p>
                <ol>
                    {participants.map(participant => (
                        <li key={participant.id}>
                            {participant.name}
                            {isAdmin && (
                                <RiDeleteBinLine onClick={() => handleDeleteParticipant(participant.id)} className="deleteIcon" />
                            )}
                        </li>
                    ))}
                </ol>
                {role !== 'admin' && !showForm && (
                    <button onClick={() => setShowForm(true)}>Prijavi se</button>
                )}

                {showForm && (
                    <form onSubmit={handleFormSubmit} className="popup-form">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Ime i prezime"
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)}
                        />
                        <button type="submit" className='confirmBtn'>Potvrdi</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Activity;
