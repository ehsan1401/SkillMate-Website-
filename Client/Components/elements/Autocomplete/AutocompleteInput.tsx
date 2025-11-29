'use client';

import { Dropdown, Input } from "antd";
import { MenuProps } from "antd/lib";
import React, { useState } from "react";

type AutocompleteInputProps = {
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (val: string) => void;
};

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  options,
  placeholder = "",
  onChange,
}) => {
  const [InputData, SetInputData] = useState<string>("");

  // فقط ۱۰ مورد اول فیلتر شده رو نشون بده
  const filteredOptions = options
    .filter(opt => opt.toLowerCase().includes(InputData.toLowerCase()))
    .slice(0, 10);

  const showCustomOption =
    InputData.trim() !== "" &&
    !options.some(opt => opt.toLowerCase() === InputData.toLowerCase());

  const items: MenuProps['items'] = [
    ...filteredOptions.map((opt, index) => ({
      key: index.toString(),
      label: (
        <span
          onMouseDown={e => {
            e.preventDefault();
            SetInputData(opt);
            onChange(opt);
          }}
        >
          {opt}
        </span>
      ),
    })),
    ...(showCustomOption
      ? [
          {
            key: "custom",
            label: (
              <span
                className="italic text-gray-500"
                onMouseDown={e => {
                  e.preventDefault();
                  SetInputData(InputData);
                  onChange(InputData);
                }}
              >
                Add "{InputData}"
              </span>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="relative w-full">
      <Dropdown menu={{ items }} trigger={['click']}>
        <Input
          style={{ width: "100%", height: "32px" }}
          value={InputData}
          placeholder={placeholder}
          onChange={e =>{
            const val = e.target.value;
            if (val.length <= 50) {
              SetInputData(val);
              onChange(val);
            }
          }}
          suffix={<span>{InputData.length}/50</span>}
        />
      </Dropdown>
    </div>
  );
};

export default AutocompleteInput;
