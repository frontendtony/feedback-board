import * as React from 'react';

interface TextAreaInputProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  id: string;
  label?: string;
  hint?: string;
  isInvalid?: boolean;
  validationMessage?: string;
}

export default React.forwardRef<HTMLTextAreaElement, TextAreaInputProps>(function TextArea(
  props,
  ref
) {
  const { id, label, hint, isInvalid, validationMessage, ...rest } = props;

  return (
    <div>
      <label htmlFor={id} className="font-bold text-sm">
        {label}
      </label>
      {props.hint && <p className="mt-[.125rem]">{hint}</p>}
      <textarea {...rest} id={id} aria-invalid={isInvalid} ref={ref} />
      {isInvalid && validationMessage && <p className="text-danger text-sm">{validationMessage}</p>}
    </div>
  );
});
