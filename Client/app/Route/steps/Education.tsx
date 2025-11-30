'use client'

import AutocompleteInput from "@/Components/elements/Autocomplete/AutocompleteInput";
import { UserInfo } from "../pages/type";
import FieldOfStudy from "@/Data/FieldOfStudy";
import { Input, Select, Button, Divider, DatePicker, Checkbox } from "antd";
import { useEffect, useState } from "react";
import countryList from "country-region-data/data.json";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import EmptyFolder from "@/Icons/Vector/EmptyFolder";
import { EducationIcon } from "@/Icons/EducationIcon";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import { CityIcon } from "@/Icons/CityIcon";

type Country = {
  countryName: string;
  countryShortCode: string;
  regions: { name: string; shortCode: string }[];
}
const allCountries = countryList as Country[];

function countryCodeToEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

type degree =
  | "High School"
  | "Diploma"
  | "Associate"
  | "Bachelor"
  | "Master"
  | "Doctorate"
  | "Bootcamp"
  | "Certificate";

type Props = {
  formData: UserInfo;
  setFormData: React.Dispatch<React.SetStateAction<UserInfo>>;
};

export default function Education({ formData, setFormData }: Props) {
  const [country, setCountry] = useState<string | undefined>(formData.Location?.country);
  const [region, setRegion] = useState<string | undefined>(formData.Location?.City);
    const { showAlert } = useAlert();
  

  const countryOptions = allCountries.map(c => ({
    value: c.countryName,
    label: `${countryCodeToEmoji(c.countryShortCode)} ${c.countryName}`
  }));

  const regionOptions = country
    ? allCountries.find(c => c.countryName === country)?.regions.map(r => ({
        value: r.name,
        label: r.name
      })) ?? []
    : [];

  const degreeOptions = [
    { value: "High School", label: "High School" },
    { value: "Diploma", label: "Diploma" },
    { value: "Associate", label: "Associate" },
    { value: "Bachelor", label: "Bachelor" },
    { value: "Master", label: "Master" },
    { value: "Doctorate", label: "Doctorate" },
    { value: "Bootcamp", label: "Bootcamp" },
    { value: "Certificate", label: "Certificate" },
  ];

  const [eduForm, setEduForm] = useState({
    id: generateId(),
    degree: "High School" as degree,
    fieldOfStudy: "",
    school: "",
    country: "",
    city: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    grade: "",
    description: "",
  });

  useEffect(() => {
    setEduForm(prev => ({
      ...prev,
      country: country || "",
      city: region || ""
    }));
  }, [country, region]);


    const handleAddEducation = () => {


    if (!eduForm.fieldOfStudy ) {
        showAlert("Please enter your field of study.", "Error");
        return;
    }
    if (!eduForm.school) {
        showAlert("Please enter your school or university name.", "Error");
        return;
    }
    if (!eduForm.startDate) {
        showAlert("Please select a start date.", "Error");
        return;
    }
    if (!eduForm.endDate && !eduForm.isCurrent) {
        showAlert("Please select an end date or check 'Im still studying this field'.","Error");
    return;
    }


    setFormData(prev => ({
        ...prev,
        Education: [...prev.Education, eduForm]
    }));


    setEduForm({
        id: generateId(),
        degree: "High School",
        fieldOfStudy: "",
        school: "",
        country: "",
        city: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        grade: "",
        description: "",
    });
    setCountry(undefined);
    setRegion(undefined);
    };


  return (
    <div className="w-full h-[450px] flex gap-4">
      <div className="w-1/2 h-full flex flex-col gap-4">
        <div className="flex w-full gap-2">
          <AutocompleteInput
            value={eduForm.fieldOfStudy}
            options={FieldOfStudy}
            placeholder="Type or select your field of study"
            LetterLimit={30}
            onChange={(val: string) =>
              setEduForm(prev => ({ ...prev, fieldOfStudy: val }))
            }
          />
          <Select
            placeholder="Select a degree"
            options={degreeOptions}
            value={eduForm.degree}
            style={{ width: "40%" }}
            onChange={(val: string) =>
              setEduForm(prev => ({ ...prev, degree: val as degree }))
            }
            className="font-vazir"
          />
        </div>

        <Input
          value={eduForm.school}
          placeholder={getSchoolPlaceholder(eduForm.degree)}
          onChange={(e) =>
            setEduForm(prev => ({ ...prev, school: e.target.value }))
          }
          className="font-vazir pt-1"
        />

        <div className="w-full flex gap-3">
          <DatePicker
            picker="month"
            style={{ width: "50%", height: "32px" }}
            value={eduForm.startDate ? dayjs(eduForm.startDate) : null}
            onChange={(date, dateString) =>
              setEduForm(prev => ({ ...prev, startDate: dateString as string }))
            }
            placeholder="Start Date"
            className="font-vazir"
          />
          <DatePicker
            picker="month"
            style={{ width: "50%", height: "32px" }}
            value={eduForm.endDate ? dayjs(eduForm.endDate) : null}
            onChange={(date, dateString) =>
              setEduForm(prev => ({ ...prev, endDate: dateString as string }))
            }
            placeholder="End Date"
            disabled={eduForm.isCurrent}
            className="font-vazir"
          />
        </div>

        <Checkbox
          checked={eduForm.isCurrent}
          onChange={(e) =>
            setEduForm(prev => ({
              ...prev,
              isCurrent: e.target.checked,
              endDate: e.target.checked ? "" : prev.endDate
            }))
          }
          className="font-vazir"
        >
          I'm still studying this field.
        </Checkbox>

        <div className="-my-4">
            <Divider orientation="left" plain className="font-vazir">Optional</Divider>
        </div>

        <div className="flex w-full gap-2">
          <Select
            showSearch
            style={{ width: "50%" }}
            placeholder="Where did you study?"
            optionFilterProp="label"
            filterSort={(a, b) =>
              (a.label ?? '').toLowerCase().localeCompare((b.label ?? '').toLowerCase())
            }
            value={country || null}
            onChange={val => { setCountry(val); setRegion(undefined); }}
            options={countryOptions}
            className="font-vazir"
          />
          <Select
            showSearch
            style={{ width: "50%" }}
            placeholder="Select your city or region"
            optionFilterProp="label"
            filterSort={(a, b) =>
              (a.label ?? '').toLowerCase().localeCompare((b.label ?? '').toLowerCase())
            }
            value={region || null}
            onChange={val => setRegion(val)}
            options={regionOptions}
            disabled={!country}
            className="font-vazir"
          />
        </div>

        <Input
            type="text"
            value={eduForm.grade}
            placeholder="Grade"
            onChange={(e) => {
                let val = e.target.value;
                const regex = /^\d{0,2}(\.\d{0,2})?$/;
                if (val === "" || regex.test(val)) {
                if (parseFloat(val) > 20) {
                    val = "20";
                }
                setEduForm(prev => ({ ...prev, grade: val }));
                }
            }}
            className="font-vazir"
        />





        <div className="relative">
          <TextArea
            value={eduForm.description}
            onChange={(e) => {
              const val = e.target.value;
              setEduForm(prev => ({ ...prev, description: val.length <= 150 ? val : prev.description }));
            }}
            placeholder="Description"
            style={{ height: 80, resize: 'none', width: "100%" }}
            className="font-vazir"
          />
          <div className="absolute bottom-1 right-2 text-sm text-gray-400 font-vazir">
            {eduForm.description.length}/150
          </div>
        </div>

        <Button type="primary" onClick={handleAddEducation} className="font-vazir pt-1">
          Add Education
        </Button>
      </div>

      <div className="w-1/2 h-[90%] overflow-y-auto overflow-x-hidden px-2 pb-2">
        {formData.Education.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-3 w-full h-full">
            <EmptyFolder width={200} opacity={0.5}/>
            <p className="text-gray-500 pl-10 font-vazir">No education added yet.</p>
          </div>
        ) : (
          formData.Education.map(item => (
            <div key={item.id} className="p-4 shadow-md rounded-lg bg-neutral-50 mb-4">
                <h2 className="flex gap-2">
                    <EducationIcon className="text-xl mt-[0px] text-blue-400 "/>
                    <span className="font-vazir">
                        <span className="font-bold">{item.fieldOfStudy}</span> at <span className="text-sm">{item.school}</span>
                    </span>
                </h2>
                <p className="pl-8">
                    <span className="flex">
                        <span className="text-sm font-vazir">{item.degree} {item.degree !== "Bootcamp" && item.degree !== "Certificate" ? "degree" : ""} •  </span>
                        
                        <span className="text-xs font-vazir pl-1 pt-[2px]">
                            From {ConvertDate(item.startDate)} to 
                            <span className="pl-[2px]">
                            {
                                item.endDate ? (
                                    item.endDate !== "" ? ConvertDate(item.endDate) : "Now" 
                                ) : "Now"
                            }
                            </span>
                        </span>
                        {   item.grade &&
                            <span className="text-xs font-vazir pl-[2px] pt-[2px]"> • Grade: {item.grade} </span>
                        }
                    </span>
                    <span>
                        {item.country &&
                            <span className="text-xs flex gap-1 py-2">
                               <CityIcon className="text-base" /> Based in <span>{item.city}</span> Province of <span>{item.country}</span>
                            </span>
                        }
                    </span>
                    {item.description &&
                        <span className="text-xs py-1">
                            {item.description}
                        </span>
                    }
                </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const getSchoolPlaceholder = (degree: degree) => {
  if (degree === "High School" || degree === "Diploma") return "Name of your school";
  if (["Associate", "Bachelor", "Master", "Doctorate"].includes(degree)) return "Name of your university";
  if (degree === "Bootcamp") return "Name of bootcamp / training center";
  if (degree === "Certificate") return "Name of institute / training center";
  return "School / University / Institute";
};

const generateId = (): string => {
  if (typeof globalThis !== "undefined" && globalThis.crypto && "randomUUID" in globalThis.crypto) {
    return (globalThis.crypto as Crypto).randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
};


const ConvertDate = (date: string | null) => {
  if (!date) return "";
  return dayjs(date, "YYYY-MM").format("MMMM YYYY");
};

