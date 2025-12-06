'use client';
import { UserInfo } from "../pages/type";
import { DatePicker, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { useEffect, useState } from "react";
import countryList from "country-region-data/data.json";
import TextArea from "antd/es/input/TextArea";
import { useBreakpoint } from "@/Components/hooks/useBreakpoint";

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

export default function PersonalInformation(
  { formData, setFormData }: 
  { formData: UserInfo; setFormData: React.Dispatch<React.SetStateAction<UserInfo>> }
) {
  const { user } = useUser();
  const breakPoint = useBreakpoint();
  const breakPointRec = breakPoint === "base" || breakPoint === "sm" || breakPoint === "md"
  const [country, setCountry] = useState<string | undefined>(formData.Location.country);
  const [region, setRegion] = useState<string| undefined>(formData.Location.City);

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

    useEffect(()=>{
        if(country && region ){
            setFormData(prev => ({ ...prev, Location: { City : region , country : country} }))
        }
    } , [country , region , setFormData])

  return (
    <div className="w-full lg:h-[450px] h-auto flex flex-col lg:pr-10 lg:pt-5">

      <div className="lg:grid flex flex-col grid-cols-2 lg:gap-x-5 lg:gap-y-8 gap-y-2 w-full">

        <div className="flex items-center gap-2 w-full">
          <label className="font-bold w-[25%] text-right text-xs lg:text-base">User Name:</label>
          <div className="w-[75%]">
            <Input
              style={{ width: "100%", height: "32px" }}
              value={user?.userName}
              disabled
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-bold w-[25%] text-right text-xs lg:text-base">Email:</label>
          <div className="w-[75%]">
            <Input
              style={{ width: "100%", height: "32px" }}
              value={user?.email}
              disabled
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-bold w-[25%] text-right text-xs lg:text-base">Phone Number:</label>
          <div className="w-[75%]">
            <Space.Compact style={{ width: "100%" }}>
              <Input style={{ width: "15%", height: "32px" }} value="+98" disabled />
              <Input
                style={{ width: "85%", height: "32px" }}
                value={formData.phone}
                placeholder="Phone Number"
                onChange={e => {
                  const val = e.target.value;
                  if (/^\d{0,12}$/.test(val)) setFormData(prev => ({ ...prev, phone: val }));
                }}
              />
            </Space.Compact>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-bold w-[25%] text-right text-xs lg:text-base">Date Of Birth:</label>
          <div className="w-[75%]">
            <DatePicker
              style={{ width: "100%", height: "32px" }}
              value={formData.dateofbirth ? dayjs(formData.dateofbirth) : null}
              onChange={(date, dateString) =>
                setFormData(prev => ({
                  ...prev,
                  dateofbirth: Array.isArray(dateString) ? dateString[0] || "" : dateString
                }))
              }
            />
          </div>
        </div>

        <div className="flex items-start gap-2">
          <label className="font-bold w-[25%] text-right text-xs lg:text-base pt-2 lg:pt-0">Location:</label>
          <div className="w-auto flex gap-2 justify-end">
                <Select
                    showSearch
                    style={{ width : breakPointRec ?  152 : 180}}
                    placeholder="Select country"
                    optionFilterProp="label"
                    filterSort={(a, b) => (a.label ?? '').toLowerCase().localeCompare((b.label ?? '').toLowerCase())}
                    value={country || null}
                    onChange={val => { setCountry(val); setRegion(undefined); }}
                    options={countryOptions}
                />
                <Select
                    showSearch
                    style={{  width : breakPointRec ?  152 : 180 }}
                    placeholder="Select region"
                    optionFilterProp="label"
                    filterSort={(a, b) => (a.label ?? '').toLowerCase().localeCompare((b.label ?? '').toLowerCase())}
                    value={region || null}
                    onChange={val => setRegion(val)}
                    options={regionOptions}
                    disabled={!country}
                />


          </div>
        </div>

        <div className="flex items-start gap-2">
          <label className="font-bold w-[25%] text-right text-xs lg:text-base pt-2 lg:pt-0">Gender:</label>
          <div className="w-[75%]">
            <Select
                showSearch
                style={{ width: "100%", height: "32px" }}
                placeholder="Select Your Gender"
                value={formData.Gender ?? user?.Gender}
                onChange={value => setFormData(prev => ({ ...prev, Gender: value }))}
                options={[
                    {
                        value: 'Male',
                        label: 'Male',
                    },
                    {
                        value: 'Female',
                        label: 'Female',
                    },
                    {
                        value: 'Other',
                        label: 'Other',
                    },
                ]}
            />
          </div>
        </div>

        <div className="flex items-start gap-2 col-span-2">
        <label className="font-bold w-[12%] text-right pt-2 text-xs lg:text-base">Bio:</label>
        <div className="lg:w-[88%] w-[95%]">
            <TextArea
                rows={6}
                value={formData.bio}
                onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                style={{ resize: "none", maxHeight: 200 }}
                count={{
                    show: true,
                    max: 800,
                }}
                className="text-xs lg:text-base"
            />
        </div>
        </div>
      </div>
    </div>
  );
}
