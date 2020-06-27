import {createContext} from 'react';
import {getSessionCookie} from "./sessions";

export const UserContext= createContext(getSessionCookie());
