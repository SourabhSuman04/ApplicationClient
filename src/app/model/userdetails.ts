export interface Userdetails {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth?: Date;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    role: string;
    status: string;
    createdDate?: Date;
    lastLogin: Date;
    avatar?: string;
    file?:string;
    imageId?:number;
    imageUrl?:string;
}