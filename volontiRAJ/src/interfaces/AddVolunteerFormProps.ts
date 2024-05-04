import { VolunteerFormData } from './VolunteerFormData';

export interface AddVolunteerFormProps {
    id: string;
    onClose: () => void;
    onSubmit: (formData: VolunteerFormData) => void;
    cities: string[];
    occupations: string[];
  }
  