import React, { Dispatch, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';

function trimSpaces(input: string): string {
  return input.trim();
}
const debounce = (
  fn: Function,
  ms = 300,
  setLoading?: Dispatch<SetStateAction<boolean>> | undefined
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      if (setLoading) setLoading(false);
    }, ms);
    if (setLoading) setLoading(true);
  };
};

export const MyInput = ({
  titleLabel,
  placeholder,
  _defaultValue,
  setState,
  type = 'text',
  setStateLoading = undefined
}: {
  titleLabel: string;
  placeholder: string;
  _defaultValue: string;
  setState: Dispatch<SetStateAction<string>>;
  type?: string;
  setStateLoading?: Dispatch<SetStateAction<boolean>>;
}) => {
  const debounced = debounce(setState, 3000, setStateLoading);
  return (
    <>
      <Form.Group>
        <Form.Label>{titleLabel}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          defaultValue={_defaultValue}
          onChange={(e) => {
            debounced(trimSpaces(e.target.value));
          }}
        />
      </Form.Group>
    </>
  );
};
