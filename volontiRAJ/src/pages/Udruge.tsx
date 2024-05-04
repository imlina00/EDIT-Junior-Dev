import React, { useState, useEffect } from 'react';
import '../styles/udruge.css';
import { useUserRole } from '../components/UserRoleContext';
import axios from 'axios';
import Association from '../components/Udruga';
import AddAssociation from '../components/dodajUdrugu';
import AssociationProps from '../interfaces/AssociationProps';

const Udruge: React.FC = () => {
  const [associations, setAssociations] = useState<AssociationProps[]>([]);
  const [sortedAssociations, setSortedAssociations] = useState<AssociationProps[]>([]);
  const { role } = useUserRole();
  const [cities, setCities] = useState<string[]>([]);
  const [showAddAssociationModal, setShowAddAssociationModal] = useState<Boolean>(false);

  const fetchAssociations = () => {
    axios.get('http://localhost:3001/associations')
      .then(response => {
        setAssociations(response.data);
        setSortedAssociations(response.data)
      })
      .catch(error => {
        console.error('Error fetching associations:', error);
      });
  };

  const handleUpdateAssociations = async (associationId: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:3001/associations/${associationId}`, { status: newStatus });
      fetchAssociations();
    } catch (error) {
      console.error('Error updating association:', error);
    }
  };

  const sortAssociationsByCity = () => {
    const sorted = [...associations].sort((a, b) => a.city.localeCompare(b.city));
    setSortedAssociations(sorted);
  };

  const sortAssociationsByName = () => {
    const sorted = [...associations].sort((a, b) => a.name.localeCompare(b.name));
    setSortedAssociations(sorted);
  };

  const resetFilter = () => {
    setSortedAssociations(associations);
  };

  const handleToggleModal = () => {
    setShowAddAssociationModal(!showAddAssociationModal);
  };

  const handleSubmitAssociation = (formData: AssociationProps) => {
    axios.post(`http://localhost:3001/associations/`, formData)
      .then(response => {
        console.log('Association added successfully:', response.data);
        fetchAssociations();
      })
      .catch(error => {
        console.error('Error adding association:', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/cities/')
      .then(res => {
        setCities(res.data.map((city: { name: string }) => city.name));
      })
    fetchAssociations();
  }, []);

  const generateRandomId = (length: number): string => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomId = '';
    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomId;
  };


  return (
    <div className='udruge'>
      <h1>Naše udruge</h1>

      {role !== 'admin' && (
        <button onClick={handleToggleModal}>Dodaj udrugu</button>)}
      {showAddAssociationModal && <AddAssociation id={generateRandomId(4)} onClose={handleToggleModal} onSubmit={handleSubmitAssociation} cities={cities} />}

      <h3 className='titleSecond'>Sortiraj:</h3>

      <div className='sortWrapper'>
        <button onClick={sortAssociationsByCity} className='sortBtn'>Po gradu</button>
        <button onClick={sortAssociationsByName} className='sortBtn'>Po imenu</button>
        <button onClick={resetFilter} className='sortBtn'>Ukloni sortiranje</button>
      </div>

      <div className='aContainer'>
        {sortedAssociations
          .filter(association => association.status.includes('approved'))
          .map(association => (
            <Association
              key={association.id}
              id={association.id}
              name={association.name}
              address={association.address}
              city={association.city}
              status={association.status}
              isAdmin={role === 'admin'}
              onUpdateAssociation={handleUpdateAssociations}
              cities={cities}
            />
          ))}</div>

      {role === 'admin' && (
        <div className='titleSecond'>
          <h3 >Zahtjevi:</h3>

          <div className='pendingAssociations'>
            {sortedAssociations
              .filter(association => association.status.includes('pending'))
              .map(association => (
                <Association
                  key={association.id}
                  id={association.id}
                  name={association.name}
                  address={association.address}
                  city={association.city}
                  status={association.status}
                  isAdmin={role === 'admin'}
                  onUpdateAssociation={handleUpdateAssociations}
                  cities={cities}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Udruge;
