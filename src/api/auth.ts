import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthForm, RegisterForm } from "../types/Forms";
import { db, firebaseAuth } from "../db";
import { User } from "../types/User";
import { doc, getDoc, setDoc } from "firebase/firestore";


export type AuthType = "login" | "register";

const register = async (form: RegisterForm) => {
    const { user: registeredUser } = await createUserWithEmailAndPassword(firebaseAuth, form.email, form.password)
    const user: User = {
        uid: registeredUser.uid,
        fullName: form.fullName,
        nickName: form.nickName,
        email: form.email,
        avatar: form.avatar,
        points: 0,
        favoriteCandy: []
    }
    await setDoc(doc(db, "users", registeredUser.uid), user)
    return registeredUser;
}

const login = async (loginForm: AuthForm) => {
    const { user } = await signInWithEmailAndPassword(firebaseAuth, loginForm.email, loginForm.password)
    return user;
}

const authenticate = (form: AuthForm, type: AuthType) => {
    return type === 'login' ? login(form) : register(form as RegisterForm);
}

const logout = () => {
    return signOut(firebaseAuth);
}

const getUser = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as User;
};

export { register, login, logout, authenticate, getUser };