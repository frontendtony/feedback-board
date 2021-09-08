import * as React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  inputProps?: Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'>;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  hint?: string;
  isInvalid?: boolean;
  validationMessage?: string;
}

export default function TextInput(props: TextInputProps) {
  return (
    <div>
      <label htmlFor={props.id} className="font-bold text-sm">
        {props.label}
      </label>
      {props.hint && <p className="mt-[.125rem]">{props.hint}</p>}
      <input
        {...props.inputProps}
        id={props.id}
        type="text"
        value={props.value}
        onChange={props.onChange}
        aria-invalid={props.isInvalid}
      />
      {props.isInvalid && props.validationMessage && (
        <p className="text-danger text-sm mt-2">{props.validationMessage}</p>
      )}
    </div>
  );
}
