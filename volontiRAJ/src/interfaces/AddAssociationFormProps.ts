import AssociationFormData from "./AssociationFormData";

interface AddAssociationFormProps {
    id: string;
    onClose: () => void;
    onSubmit: (formData: AssociationFormData) => void;
    cities: string[];
}

export default AddAssociationFormProps;