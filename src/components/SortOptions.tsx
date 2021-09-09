import { Listbox } from '@headlessui/react';
import * as React from 'react';
import AngleDown from '../icons/AngleDown';

export default function SortOptions(props: {
  value: string;
  onChange(value: string): void;
  options: string[];
}) {
  return (
    <Listbox value={props.value} onChange={props.onChange}>
      <Listbox.Label className="text-sm">Sort by:&nbsp;</Listbox.Label>
      <div className="relative flex items-center">
        <Listbox.Button className="flex items-center">
          <span className="font-bold text-sm">{props.value}</span>
          <AngleDown className="text-white ml-2 text-[.5rem]" />
        </Listbox.Button>
        <Listbox.Options className="absolute top-14 overflow-auto bg-white rounded shadow-dropdown max-h-60 focus:outline-none divide-y divide-secondary divide-opacity-10 w-[15.9375rem]">
          {props.options.map((option) => (
            <Listbox.Option
              className={({ active }) =>
                `flex items-center justify-between whitespace-nowrap px-6 py-3 cursor-pointer ${
                  active ? 'text-primary' : 'text-default'
                }`
              }
              key={option}
              value={option}
            >
              {({ selected }) => (
                <>
                  <span>{option}</span>
                  {selected && (
                    <svg
                      width="13"
                      height="10"
                      viewBox="0 0 13 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-4"
                    >
                      <path
                        d="M0.968262 4.85894L4.49995 8.39062L11.9999 0.890625"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
