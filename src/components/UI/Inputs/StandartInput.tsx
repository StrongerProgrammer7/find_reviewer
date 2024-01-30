import React, { Ref } from 'react';
import { Form } from 'react-bootstrap';

export const StandartInput = ({
  titleLabel,
  placeholder,
  _defaultValue: defaultValue,
  _ref: ref,
  type = 'text'
}: {
  titleLabel: string;
  placeholder: string;
  _defaultValue: string;
  _ref: Ref<HTMLInputElement>;
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
};
