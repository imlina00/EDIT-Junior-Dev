import { Participant } from './Participant';

export interface ActivityFormData {
  id: string;
  name: string;
  date: string;
  description: string;
  organizer: string;
  location: string;
  image: string;
  participants: Participant[];
  isAdmin: boolean;
}