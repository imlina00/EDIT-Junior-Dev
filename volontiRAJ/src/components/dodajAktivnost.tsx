import { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/aktivnosti.css';
import { AddActivityFormProps } from '../interfaces';

const AddActivity = ({ id, onClose, onSubmit }: AddActivityFormProps) => {
  const [formData, setFormData] = useState({
    id: id,
    name: '',
    date: '',
    description: '',
    organizer: '',
    location: '',
    time: '',
    image: '',
    participants: [],
    isAdmin: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    alert('Aktivnost uspješno dodana!');
    onClose();
  };

  return (
    <div className="popupOverlay">
          <span className="closed" onClick={onClose}>&times;</span>
    <div className="popup">
      <div className="popupContent">
        <h2>Dodaj novu aktivnost</h2>
        <div className="formWrapperPopup">
            <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ime" required />
            <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="Datum (DD.MM.YYYY.)" required/>
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Opis" required/>
            <input type="text" name="organizer" value={formData.organizer} onChange={handleChange} placeholder="Organizator" required/>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Lokacija" required/>
            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="URL fotografije" />
            <div><button type="submit">Dodaj</button></div>
            </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddActivity;
