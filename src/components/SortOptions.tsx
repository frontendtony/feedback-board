import { Listbox } from '@headlessui/react';
import * as React from 'react';
import { useState } from 'react';
import AngleDown from '../icons/AngleDown';

const sortOptions = [
  { label: 'Most Upvotes' },
  { label: 'Least Upvotes' },
  { label: 'Most Comments' },
  { label: 'Least Comments' },
];

export default function SortOptions() {
  const [selected, setSelected] = useState(sortOptions[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative flex items-center">
        <Listbox.Button className="flex items-center">
          <span className="font-bold text-sm">{selected.label}</span>
          <AngleDown className="text-white ml-2 text-[.5rem]" />
        </Listbox.Button>
        <Listbox.Options className="absolute top-14 overflow-auto bg-white rounded shadow-dropdown max-h-60 focus:outline-none divide-y divide-secondary divide-opacity-10 w-[15.9375rem]">
          {sortOptions.map((option) => (
            <Listbox.Option
              className={({ active }) =>
                `flex items-center justify-between whitespace-nowrap px-6 py-3 ${
                  active ? 'text-primary' : 'text-default'
                }`
              }
              key={option.label}
              value={option}
            >
              {({ selected }) => (
                <>
                  <span>{option.label}</span>
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
