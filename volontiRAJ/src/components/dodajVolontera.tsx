import { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/volonteri.css';
import { AddVolunteerFormProps } from '../interfaces/AddVolunteerFormProps';
import { VolunteerFormData } from '../interfaces/VolunteerFormData';

const AddVolunteer = ({ id, onClose, onSubmit, cities, occupations }: AddVolunteerFormProps) => {
  const [formData, setFormData] = useState<VolunteerFormData>({
    id: id,
    name: '',
    contact: '',
    city: '',
    occupation: [],
    image: '',
    isAdmin: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'occupation' ? [value] : value, 
    }));
  };
  

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isChecked = e.target.checked;
    if (isChecked) {
      setFormData(prevState => ({
        ...prevState,
        occupation: [...prevState.occupation, value],
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        occupation: prevState.occupation.filter(item => item !== value),
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };
  

  return (
    <div className="modalAdd">
    <div className="modalContentAdd">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Dodavanje novog volontera</h2>
        <div className="formWrapperPopupAdd">
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ime i prezime" required />
                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="URL fotografije" />

                <div>
                <select name="city" value={formData.city} onChange={handleChange} required>
                    <option value="">Odaberi grad</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                </div>

                <h2>Odaberi uloge:</h2>
                <div className="checkboxWrapperAdd">
                    {occupations.map((occupation) => (
                        <label key={occupation}>
                        <input
                            type="checkbox"
                            name="occupation"
                            value={occupation}
                            checked={formData.occupation.includes(occupation)}
                            onChange={handleCheckboxChange}
                        />
                        {occupation}
                        </label>
                    ))}
                </div>
                <div><button type="submit">Dodaj</button></div>
            </form>
        </div>
    </div>
</div>
  );
};

export default AddVolunteer;
