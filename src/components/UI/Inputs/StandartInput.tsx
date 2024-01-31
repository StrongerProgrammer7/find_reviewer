import { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

interface IPropsInput
{
  titleLabel:string, 
  placeholder:string, 
  defaultValue:string, 
  type?:string
}
export const StandartInput = forwardRef<HTMLInputElement, IPropsInput>(
  ({ titleLabel, placeholder, defaultValue, type="text" }, ref) => {
  return (
    <>
      <Form.Group>
        <Form.Label>{titleLabel}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={ref}
        />
      </Form.Group>
    </>
  );
});
