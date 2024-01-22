
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { FC } from 'react'
import { Button } from 'react-bootstrap'

const MyButton:FC<{title:string,callback?:()=>void}> = ({title,callback}:{title:string,callback?:()=>void}) => 
{
    return (
        <>
            <Button variant="primary"
            className='mt-5'
            onClick={e=>
            {
                if(callback)
                    callback();
            }}
            > {title} 
            </Button>
        </>
    )
}

export default MyButton
