"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// This is a Fucking Test!

const data = [
  { name: "Jan", projects: 2 },
  { name: "Feb", projects: 5 },
  { name: "Mar", projects: 3 },
  { name: "Apr", projects: 7 },
];

export default function MainDashboardChart() {
  return (
    <div className="w-full h-full p-1">
      <h2 className="px-5 py-1" style={{fontFamily:'TwCenMt'}}>Project Growth</h2>
      <ResponsiveContainer width="90%" height="80%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip />
          <Line type="monotone" dataKey="projects" stroke="#000" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
