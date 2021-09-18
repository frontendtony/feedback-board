import { RadioGroup } from '@headlessui/react';
import * as React from 'react';

export default function FilterOptions(props: {
  options: string[];
  selected: string;
  setSelected(value: string): void;
}) {
  return (
    <RadioGroup value={props.selected} onChange={props.setSelected}>
      <RadioGroup.Label className="sr-only">Filter feedback</RadioGroup.Label>
      <div className="flex flex-wrap -ml-2 -mb-2">
        {props.options.map((option) => (
          <RadioGroup.Option
            key={option}
            value={option}
            className={({ checked }) =>
              `px-4 py-2 rounded font-semibold text-small ml-2 mb-2 cursor-pointer ${
                checked ? 'bg-alternate' : 'bg-alternate-light'
              }`
            }
          >
            {({ checked }) => (
              <RadioGroup.Label
                as="p"
                className={`font-medium  ${checked ? 'text-white' : 'text-alternate'}`}
              >
                {option}
              </RadioGroup.Label>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
