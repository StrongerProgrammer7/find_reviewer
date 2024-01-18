import { useContext } from "react";
import { Context } from "../../App";

const useGetComplexObject = () => 
{
    const object = useContext(Context);
    if (!object) { throw new Error("useGetComplexObject must be used within a Provider") }
    return object;
}

export default useGetComplexObject;