import { createSignal } from "solid-js";
import { AuthForm } from "../types/Forms";
import { AuthType, authenticate } from "../api/auth";
import { FirebaseError } from "firebase/app";


const useAuthenticate = (authType: AuthType) => {
    const [loading, setLoading] = createSignal(false);
    const authUser = async (form: AuthForm) => {
        setLoading(true);
        try{
            await authenticate(form, authType)
            window.location.href = '/';
        } catch(err){
            const message = ( err as FirebaseError).message;
            console.log(message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, authUser };
}

export default useAuthenticate;