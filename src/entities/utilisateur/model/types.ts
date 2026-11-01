export interface Credentials { email: string; password: string; }       
export interface Inscription extends Credentials { firstName: string; lastName: string; } 
export interface TokenResponse { type: string; token: string; }  