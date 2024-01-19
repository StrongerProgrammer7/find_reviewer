import { IDataUser } from "./store/interfaces/IDataUser";

export const getLocalStorageItem = (key:string):Array<string> | undefined =>
{
    if(window.localStorage && window.localStorage.getItem(key))
    {
        const elem:string = window.localStorage.getItem(key) || '';
        try 
        {
            const arr:Array<string> = JSON.parse(elem); 
            return arr;   
        } catch (error) 
        {
            console.log("Error with JSON parse from localStorage");
            console.error(error);
        }
    }
}

export const setLocalStorageItem =(key:string,value:string):void =>
{
    try
    {
        localStorage.setItem(key,value);
    }
    catch(error)
    {
        console.log("Error with set to local storage key:" , key, " value:",value);
        console.error(error);
    }
}

export const setDataContextFromLocalStorage = (user:IDataUser,key:string):void =>
{
    const elem:Array<string> | undefined = getLocalStorageItem(key);
    if(!elem) return;
    user.setLogin(elem[0]);
    user.setRepo(elem[1]);
    try
    {
        const blackList = JSON.parse(elem[2]);
        user.setBlacklist(blackList);
    }
    catch(error)
    {
        console.log("Error with parse blacklist from array string got from local storage");
        console.error(error);
    }
    
}