import { Listbox, Transition } from '@headlessui/react';
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
      {props.hint && (
        <p className="mt-[.125rem]" id={`helper-text-for-${props.id}`}>
          {props.hint}
        </p>
      )}
      <Listbox value={value} onChange={onChange}>
        <div className="relative flex items-center mt-4">
          <Listbox.Button
            className="select mt-0 flex items-center justify-between"
            id={props.id}
            aria-invalid={props.isInvalid}
            aria-describedby={`helper-text-for-${props.id}`}
          >
            {value.label}
            <AngleDown className="text-xs" />
          </Listbox.Button>
          <Transition
            appear
            as={Listbox.Options}
            className="absolute top-0 overflow-auto bg-white rounded shadow-dropdown max-h-60 focus:outline-none divide-y divide-secondary divide-opacity-10 w-full z-10"
            leave={`transition ease-in duration-75`}
            leaveFrom={`transform opacity-100 scale-100`}
            leaveTo={`transform opacity-0 scale-95`}
          >
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
          </Transition>
        </div>
      </Listbox>
      {props.isInvalid && props.validationMessage && (
        <p className="text-danger text-sm mt-2" aria-live="assertive">
          {props.validationMessage}
        </p>
      )}
    </div>
  );
}
