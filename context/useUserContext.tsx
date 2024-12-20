import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { IUser, IUserContext } from "../types/IUser";
import Api from "../axios";
import { useUserInitialValue, useUserReducer } from "../reducers/useUserReducer";
import useEditUserDetails from "../requests/user/useEditUserDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type Prop = {
    children: ReactNode;
};

export const UseUserContext = createContext<IUserContext | null>(null);

export const UseUserContextProvider = ({ children }: Prop) => {
    const [state, dispatch] = useReducer(useUserReducer, useUserInitialValue);
    const [loaded, setLoaded] = useState(false);
    const [token, setToken] = useState<string | null>(null); // Estado para armazenar o token

    // Função para obter o token
    useEffect(() => {
        console.log("teste");
        const getToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token"); // Espera o token ser obtido
                setToken(storedToken);
            } catch (error) {
                console.log("Erro ao obter o token:", error);
            }
        };

        getToken(); // Chama a função ao montar o componente
    }, []);

    // Função para buscar o usuário se o token estiver disponível ou o state for null
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, status } = await Api.get("user");
                if (status !== 200) {
                    router.navigate("/login");
                    return;
                }
                dispatch({ type: "set", payload: data });
                setLoaded(true);
            } catch (error) {
                console.log("Erro ao buscar o usuário:", error);
            }
        };

        // Verifica se o token existe e se o state está vazio ou nulo
        if (token && (!loaded || state === null)) {
            fetchUser();
        }
    }, [token, state, loaded]); // Executa o efeito quando o token, o estado ou o carregamento muda

    const UseEditUserRequest = useEditUserDetails();
    const editUser = (user: IUser) => {
        UseEditUserRequest(user).then(() => {
            dispatch({ type: "set", payload: user });
        });
    };

    return <UseUserContext.Provider value={{ state, editUser }}>{children}</UseUserContext.Provider>;
};
