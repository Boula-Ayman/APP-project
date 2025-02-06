export type Gender = "male" | "female";

export interface User {
    id: number;
    email: string;
    secondary_email?: string;
    name: string;
    phone_number?: string;
    created_at: string;
    updated_at: string;
    wishlist: number[];
    is_verified: boolean;
    birth_date?: string; // yy-mm-dd format
    job_title?: string;
    country?: string;
    gender?: Gender;
    profile_picture?: string;
  }

export interface ResponseData<T> {
    data: T
}