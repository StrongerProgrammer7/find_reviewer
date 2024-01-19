import { IDataUser } from "../store/interfaces/IDataUser";

export const getLocalStorageItem = (key:string):string | undefined =>
{
    if(window.localStorage && window.localStorage.getItem(key))
    {
        
        try 
        {
            const elem:string = window.localStorage.getItem(key) || '';
            return elem; 
        } catch (error) 
        {
            console.log("Error with get data from localstorage");
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
    const elem:string | undefined = getLocalStorageItem(key);
    if(!elem) return;
    const arr = elem.split(';');

    user.setLogin(arr[0]);
    user.setRepo(arr[1]);
    const blackList = arr[2].split(',');
    user.setBlacklist(blackList);
    
}