
import { Observable } from 'rxjs';



export interface UserRegistration {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    passwordConfirm: string;
    termsAgreed: boolean;
}