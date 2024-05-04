interface AssociationP {
    id: string;
    name: string;
    address: string;
    city: string;
    status: string;
    isAdmin: boolean;
    onUpdateAssociation: (associationId: string, newStatus: string) => void;
    cities: string[];
}

export default AssociationP;