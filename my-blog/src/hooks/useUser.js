import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    // DO NOT TOUCH
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    return { user, isLoading };
}

export default useUser;


//const user = useUser ----- if used in other files, can access if a user and also which user is logged in