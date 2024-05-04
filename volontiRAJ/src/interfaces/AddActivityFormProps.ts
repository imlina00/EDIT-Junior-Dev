import { ActivityFormData } from './ActivityFormData';

export interface AddActivityFormProps {
  id: string;
  onClose: () => void;
  onSubmit: (formData: ActivityFormData) => void;
}