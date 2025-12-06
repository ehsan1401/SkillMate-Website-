'use client';

import { Dropdown, Input } from "antd";
import { MenuProps } from "antd/lib";
import React, { useState } from "react";
import { AutocompleteInputProps } from "./type";



const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  options,
  placeholder = "",
  onChange,
  LetterLimit,
  width
}) => {
  const [InputData, SetInputData] = useState<string>(value?? "");


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
          className="font-vazir pt-1"
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
                className="italic text-gray-500 font-vazir"
                onMouseDown={e => {
                  e.preventDefault();
                  SetInputData(InputData);
                  onChange(InputData);
                }}
              >
                Add &quot;{InputData}&ldquo;
              </span>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="relative w-full" style={{width :  width?? "100%"}}>
      <Dropdown menu={{ items }} trigger={['click']} className="font-vazir pt-1">
        <Input
          style={{ width:"100%", height: "32px" }}
          className="font-vazir pt-1"
          value={InputData}
          placeholder={placeholder}
          onChange={e =>{
            const val = e.target.value;
            if (val.length <= LetterLimit) {
              SetInputData(val);
              onChange(val);
            }
          }}
          
          suffix={<span className="font-vazir pt-1">{InputData.length}/{LetterLimit}</span>}
        />
      </Dropdown>
    </div>
  );
};

export default AutocompleteInput;
