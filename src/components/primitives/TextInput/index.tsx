import * as React from 'react';

interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label: string;
  hint?: string;
  isInvalid?: boolean;
  validationMessage?: string;
}

export default function TextInput(props: TextInputProps) {
  const { id, label, hint, isInvalid, validationMessage, ...rest } = props;
  return (
    <div>
      <label htmlFor={props.id} className="font-bold text-sm">
        {props.label}
      </label>
      {props.hint && <p className="mt-[.125rem]">{props.hint}</p>}
      <input type="text" {...rest} aria-invalid={props.isInvalid} />
      {props.validationMessage && (
        <p className={`${props.isInvalid ? 'text-danger' : 'text-light'} text-sm mt-2`}>
          {props.validationMessage}
        </p>
      )}
    </div>
  );
}
