import React from 'react';
import axios from 'axios';
import '../styles/udruge.css';
import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import AssociationP from '../interfaces/AssociationP';

const Association: React.FC<AssociationP> = ({ id, name, address, city, status, isAdmin, onUpdateAssociation }) => {

    const handleAcceptAssociation = async (associationId: string) => {
        const confirmed = window.confirm("Jeste li sigurni da želite odobriti ovu udrugu?");
        if (confirmed) {
            onUpdateAssociation(associationId, 'approved');
        }
    };

    const handlRejectAssociation = async (associationId: string) => {
        const confirmed = window.confirm("Jeste li sigurni da želite odbiti ovu udrugu?");
        if (!confirmed) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3001/associations/${associationId}`);
            onUpdateAssociation(associationId, 'pending');
            alert('Udruga odbijena!');
        } catch (error) {
            console.error('Pogreška prilikom odbijanja udruge:', error);
        }
    };

    return (
        <div className='association_1'>
            <div className="association">
                {isAdmin && status === 'pending' && (
                    <div className='approvalButtonsWrapper'>
                        <IoIosCheckmarkCircleOutline className='approvalBtn accept' onClick={() => handleAcceptAssociation(id)} />
                        <MdOutlineCancel className='approvalBtn cancel' onClick={() => handlRejectAssociation(id)} />
                    </div>
                )}
                <h3>{name}</h3>
                <p><strong>Adresa:</strong> {address}</p>
                <p><strong>Grad:</strong> {city}</p>
            </div>
        </div>
    );
};

export default Association;