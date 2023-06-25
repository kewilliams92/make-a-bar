

export type Form = {
    [key: string]: string
}
export type FormErrors = {
    [key: string]: string[]
}


export type AuthForm = {
    email: string;
    password: string;
} & Form;

export type RegisterForm = {
    fullName: string;
    nickName: string;
    email: string;
    avatar?: string;
    password: string;
    confirmPassword: string;
} & AuthForm;

export type SubmitCallback<T extends Form> = (form: T) => void;