import { Navigate } from "react-router-dom";

function ProtectedRoute(
{children}:any
){

const user=
JSON.parse(
localStorage.getItem("user") || "null"
);

return user
? children
: <Navigate to="/" />

}

export default ProtectedRoute;