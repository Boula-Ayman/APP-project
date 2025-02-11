export type Gender = "male" | "female";

export interface User {
    id: number;
    email: string;
    secondary_email?: string;
    name: string;
    phone_number?: string;
    created_at: string;
    updated_at: string;
    wishlist: any[];  // or more specific type if known
    is_verified: boolean;
    birth_date?: string; // yy-mm-dd format
    job_title?: string;
    country?: string;
    gender?: Gender;
    image_url?: string;
}

export interface ResponseData<T> {
    data: T
}