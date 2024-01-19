
import React, { Dispatch, SetStateAction } from 'react'
import { Form } from 'react-bootstrap';

const debounce = (fn: Function, ms = 300) => 
{
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: unknown[]) 
    {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => 
        {
            fn.apply(this, args)
        }, ms);
    };
};


export const MyInput = (
    {titleLabel,placeholder,_defaultValue,setState,type='text'}:
    {
        titleLabel:string,
        placeholder:string,
        _defaultValue:string,
        setState:Dispatch<SetStateAction<string>>
        type?:string,

    }) => 
{
    const debounced = debounce(setState,1000);
  return (
    <> 
    <Form.Group>
        <Form.Label>{titleLabel}</Form.Label>
            <Form.Control 
            type={type} 
            placeholder={placeholder}
            defaultValue={_defaultValue}
            onChange={e=>
            {
                debounced(e.target.value);
            }} />
    </Form.Group>
    </>

  )
}
