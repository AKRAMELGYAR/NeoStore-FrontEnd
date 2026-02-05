import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";



export default function GuestRoutes({children}: {children: JSX.Element}) {
    const {token} = useContext(UserContext);

    if(!token){
        return children;
    }
    else{
        return <Navigate to="/" replace={true}/>;
    }
}