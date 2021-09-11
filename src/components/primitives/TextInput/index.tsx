import * as React from 'react';

interface TextInputProps {
  label: string;
  hint?: string;
  isInvalid?: boolean;
  validationMessage?: string;
  inputProps?: Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'>;
}

export default function TextInput(props: TextInputProps) {
  return (
    <div>
      <label htmlFor={props.inputProps?.id || props.inputProps?.name} className="font-bold text-sm">
        {props.label}
      </label>
      {props.hint && <p className="mt-[.125rem]">{props.hint}</p>}
      <input type="text" {...props.inputProps} aria-invalid={props.isInvalid} />
      {props.validationMessage && (
        <p className={`${props.isInvalid ? 'text-danger' : 'text-light'} text-sm mt-2`}>
          {props.validationMessage}
        </p>
      )}
    </div>
  );
}
