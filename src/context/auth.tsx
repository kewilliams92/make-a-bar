import { ParentComponent, Show, createContext, onMount, useContext } from "solid-js";
import { User } from "../types/User";
import { createStore } from "solid-js/store";
import { useLocation, useNavigate } from "@solidjs/router";
import Loader from "../component/utils/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../db";
import { getUser } from "../api/auth";

type AuthStateContextValues = {
    isAuthenticated: boolean;
    loading: boolean;
    user: User | null;
}

const initialState = () => ({
    isAuthenticated: false,
    loading: true,
    user: null,
});

const AuthStateContext = createContext<AuthStateContextValues>();

export const isAuthenticated = () => {
    const contextValue = useContext(AuthStateContext);
    if (!contextValue) {
        throw new Error("AuthStateContext value is undefined");
    }
    const { isAuthenticated } = contextValue;
    return isAuthenticated;
}


const AuthProvider: ParentComponent = (props) => {
    const [store, setStore] = createStore<AuthStateContextValues>(initialState());
    const location = useLocation();
    const navigate = useNavigate();

    onMount(async () => {
        setStore("loading", true);
        listenToAuthChanges()
    })

    const listenToAuthChanges = () => {
        onAuthStateChanged(firebaseAuth, async (user) => {
            console.log(location.pathname)
            if(!!user){
                const barUser = await getUser(user.uid);
                setStore("isAuthenticated", true);
                setStore("user", barUser);
                if(location.pathname.includes('/auth')) {
                    navigate('/', {replace: true})
                }
            } else {
                setStore("isAuthenticated", false);
                setStore("user", null);
            }

            setStore("loading", false)
        })
    }

    return (
        <AuthStateContext.Provider value={store}>
            <Show when={store.loading} fallback={props.children}>
                <Loader size={100} />
            </Show>
        </AuthStateContext.Provider>
    )
}

export const useAuthState = () => useContext(AuthStateContext)

export default AuthProvider;