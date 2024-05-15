import { IUser } from "@/utils/interface/user";
import { createContext } from "react";

interface IUserContext extends IUser {
    saveUser: (user: IUser) => void;
}

export const UserContext = createContext<IUserContext>({
    username: '',
    saveUser: () => { }
});
