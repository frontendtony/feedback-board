import * as React from 'react';

interface TextAreaInputProps extends React.HTMLProps<HTMLTextAreaElement> {
  id: string;
  label?: string;
  hint?: string;
  isInvalid?: boolean;
  validationMessage?: string;
}

export default function TextArea(props: TextAreaInputProps) {
  const { id, label, hint, isInvalid, validationMessage, ...rest } = props;
  return (
    <div>
      <label htmlFor={props.id} className="font-bold text-sm">
        {props.label}
      </label>
      {props.hint && <p className="mt-[.125rem]">{props.hint}</p>}
      <textarea {...rest} id={props.id} aria-invalid={props.isInvalid} />
      {props.isInvalid && props.validationMessage && (
        <p className="text-danger text-sm">{props.validationMessage}</p>
      )}
    </div>
  );
}
