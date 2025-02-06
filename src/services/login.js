import axios from "axios";

export function LoginSevices({username, password}) {
   const res = axios.post('https://sleeplyfedev.iboon.in/api/user/login/', { username, password })   
   return res
}