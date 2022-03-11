export interface Employee {
    identification: string;
    name: string;
    lastName: string;
    email: string;
    movil: string;
    birthDate?: Date;
    address: string;
    vaccinationStatus: string;
    vaccineType: VaccineType;

}

export interface VaccineType {
    name: string;
	vaccinationDate?: Date;
	doses: number;
}
