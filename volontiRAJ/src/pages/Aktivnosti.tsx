import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/aktivnosti.css';
import Activity from '../components/Aktivnost';
import { useUserRole } from '../components/UserRoleContext';
import AddActivity from '../components/dodajAktivnost';
import { ActivityFormData } from '../interfaces';

const Aktivnosti: React.FC = () => {
  const [activities, setActivities] = useState<ActivityFormData[]>([]);
  const { role } = useUserRole();
  const [showAddActivityPopup, setShowAddActivityPopup] = useState(false);

  const handleAddButton = () => {
    setShowAddActivityPopup(true); 
  };

  const handleSubmitActivity = (formData: ActivityFormData) => {
    axios.post(`http://localhost:3001/activities/`, formData)
      .then(response => {
        console.log('Aktivnost uspješno dodana:', response.data);
        fetchActivities();
      })
      .catch(error => {
        console.error('Greška prilikom dodavanja aktivnosti:', error);
      });
  };

  const fetchActivities = () => {
    axios.get('http://localhost:3001/activities')
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja aktivnosti:', error);
      });
  };

  const handleDeleteParticipant = () => {
    fetchActivities();
  };

  useEffect(() => {
    fetchActivities(); 
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
    <div className='activityWrapper'>
      <h1>Naše aktivnosti</h1>

      {role === 'admin' && (
        <button className='addActivityBtn' onClick={handleAddButton}>Dodaj aktivnost</button>
      )}

      {showAddActivityPopup && <AddActivity id={generateRandomId(4)} onClose={() => setShowAddActivityPopup(false)} onSubmit={handleSubmitActivity} />}    

      <div className="activities">
        {activities.map(activity => (
          <Activity
            key={activity.id}
            id={activity.id}
            name={activity.name}
            date={activity.date}
            description={activity.description}
            organizer={activity.organizer}
            location={activity.location}
            image={activity.image}
            participants={activity.participants}
            isAdmin={role === 'admin'}
            onDeleteParticipant={handleDeleteParticipant}
          />
        ))}
      </div>
    </div>
  );
};

export default Aktivnosti;
