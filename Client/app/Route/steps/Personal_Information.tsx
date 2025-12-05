'use client';
import { UserInfo } from "../pages/type";
import { DatePicker, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { useEffect, useState } from "react";
import countryList from "country-region-data/data.json";
import TextArea from "antd/es/input/TextArea";

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
    } , [country , region])

  return (
    <div className="w-full h-[450px] flex flex-col gap-4 pr-10 pt-5">

      <div className="grid grid-cols-2 gap-x-5 gap-y-8 w-full">

        <div className="flex items-center gap-2">
          <label className="font-bold w-[25%] text-right">User Name:</label>
          <div className="w-[75%]">
            <Input
              style={{ width: "100%", height: "32px" }}
              value={user?.userName}
              disabled
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-bold w-[25%] text-right">Email:</label>
          <div className="w-[75%]">
            <Input
              style={{ width: "100%", height: "32px" }}
              value={user?.email}
              disabled
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-bold w-[25%] text-right">Phone Number:</label>
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
          <label className="font-bold w-[25%] text-right">Date Of Birth:</label>
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
          <label className="font-bold w-[25%] text-right">Location:</label>
          <div className="w-auto flex gap-2 justify-end">
                <Select
                    showSearch
                    style={{ width: 180 }}
                    placeholder="Select country"
                    optionFilterProp="label"
                    filterSort={(a, b) => (a.label ?? '').toLowerCase().localeCompare((b.label ?? '').toLowerCase())}
                    value={country || null}
                    onChange={val => { setCountry(val); setRegion(undefined); }}
                    options={countryOptions}
                />
                <Select
                    showSearch
                    style={{ width: 180 }}
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

        <div className="flex items-center gap-2">
          <label className="font-bold w-[25%] text-right">Gender:</label>
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
                disabled
            />
          </div>
        </div>

        <div className="flex items-start gap-2 col-span-2">
        <label className="font-bold w-[12%] text-right pt-2">Bio:</label>
        <div className="w-[88%]">
            <TextArea
                rows={6}
                value={formData.bio}
                onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                style={{ resize: "none", maxHeight: 200 }}
                count={{
                    show: true,
                    max: 800,
                }}
            />
        </div>
        </div>
      </div>
    </div>
  );
}
