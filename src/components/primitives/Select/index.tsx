import { Listbox } from '@headlessui/react';
import * as React from 'react';
import AngleDown from '../../../icons/AngleDown';
import Check from '../../../icons/Check';

interface SelectProps {
  id: string;
  label: string;
  inputProps?: Omit<React.HTMLProps<HTMLSelectElement>, 'value' | 'onChange'>;
  value: { label: string; value: string; disabled?: boolean };
  options?: SelectProps['value'][];
  onChange(value: SelectProps['value']): void;
  hint?: string;
  isInvalid?: boolean;
  validationMessage?: string;
}

export default function Select(props: SelectProps) {
  const { options = [], value, onChange } = props;

  return (
    <div>
      <label htmlFor={props.id} className="font-bold text-sm">
        {props.label}
      </label>
      {props.hint && <p className="mt-[.125rem]">{props.hint}</p>}
      <Listbox value={value} onChange={onChange}>
        <div className="relative flex items-center mt-4">
          <Listbox.Button
            className="select mt-0 flex items-center justify-between"
            id={props.id}
            aria-invalid={props.isInvalid}
          >
            {value.label}
            <AngleDown className="text-xs" />
          </Listbox.Button>
          <Listbox.Options className="absolute top-0 overflow-auto bg-white rounded shadow-dropdown max-h-60 focus:outline-none divide-y divide-secondary divide-opacity-10 w-full">
            {options.map((option) => (
              <Listbox.Option
                className={({ active }) =>
                  `flex items-center justify-between whitespace-nowrap px-6 py-3 ${
                    active ? 'text-primary' : 'text-default'
                  }`
                }
                key={option.value}
                value={option}
                disabled={option.disabled}
              >
                {({ selected }) => (
                  <>
                    <span>{option.label}</span>
                    {selected && <Check />}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      {props.isInvalid && props.validationMessage && (
        <p className="text-danger text-sm mt-2">{props.validationMessage}</p>
      )}
    </div>
  );
}
