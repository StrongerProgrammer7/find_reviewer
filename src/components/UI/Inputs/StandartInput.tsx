import React, { forwardRef, Ref } from 'react';
import { Form } from 'react-bootstrap';

export const StandartInput = forwardRef(({
  titleLabel,
  placeholder,
  defaultValue,
  ref,
  type = 'text'
}: {
  titleLabel: string;
  placeholder: string;
  defaultValue: string;
  ref: Ref<HTMLInputElement>;
  type?: string;
}) => {
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
