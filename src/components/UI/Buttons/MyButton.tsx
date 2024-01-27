import 'bootstrap/dist/css/bootstrap.min.css';
import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

const MyButton: FC<{ title: string; callback?: () => void }> = ({ title, callback }) => {
  return (
    <>
      <Button variant="primary" className="mt-5" onClick={callback}>
        {' '}
        {title}
      </Button>
    </>
  );
};

export default MyButton;
