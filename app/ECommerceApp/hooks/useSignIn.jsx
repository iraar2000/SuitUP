import useApiServiceFetch from "../hooks/apiServiceFetch";
import signInData from "../assets/json/userMainData.json";

export const useSignIn = () => {
    const {useGet, usePost} = useApiServiceFetch();
    const {useLoadJson, useSaveJson} = useLoadSaveJsonData();

    const signIn = async (APIHOST, email, password) => {
        const promise = await usePost(`${APIHOST}/api/Ecommerce/client/signin`, {
            email: email,
            password: password
        });

        try {
            const data = (promise.data)[0];
            useSaveJson("userAccount", data); 
            console.log("LOG: user data: ", data);  
        } catch (error) {
            console.log("LOG: No data available to save, it failed with the error: ", error)
        }

        const userAccountData = useLoadJson("userAccount");
        console.log("LOG: user account data: ", userAccountData);
    }

    return ({ signIn })
}
