export interface VolunteerProps {
    id: string;
    name: string;
    contact: string;
    city: string;
    occupation: string[];
    image: string;
    isAdmin: boolean;
    onUpdateVolunteer: () => void;
    cities: string[];
    occupations: string[];
  }
  