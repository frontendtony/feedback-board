import * as React from 'react';

interface TextAreaInputProps {
  id?: string;
  label?: string;
  inputProps?: React.HTMLProps<HTMLTextAreaElement>;
  hint?: string;
  isInvalid?: boolean;
  validationMessage?: string;
}

export default function TextArea(props: TextAreaInputProps) {
  return (
    <div>
      <label htmlFor={props.id} className="font-bold text-sm">
        {props.label}
      </label>
      {props.hint && <p className="mt-[.125rem]">{props.hint}</p>}
      <textarea {...props.inputProps} id={props.id} aria-invalid={props.isInvalid} />
      {props.isInvalid && props.validationMessage && (
        <p className="text-danger text-sm">{props.validationMessage}</p>
      )}
    </div>
  );
}
