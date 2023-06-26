import { logout } from "../api/auth";


const useLogout = () => {
    const logoutUser = async () => {
    try{
        await logout();
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
    }

    return {
        logoutUser
    }
};

export default useLogout;