import Api from "../../axios";
import { ILogin } from "../../types/ILogin";

export const useLoginApi = () => {
    return async (user: ILogin) => {
        return await Api.post("/login", user)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            });
    };
};
