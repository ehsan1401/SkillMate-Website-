// file: IconPreview.tsx
"use client";
import React from "react";
import * as Icons from "@/utils/IConIndex";

export default function IconPreview() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-5 p-5 pt-28">
      {Object.entries(Icons).map(([name, IconComponent]) => (
        <div key={name} className="flex flex-col flex-wrap items-center text-xs">
          <div className="w-12 h-12">
            <IconComponent className="w-full h-full" />
          </div>
          <span className="mt-2">{name}</span>
        </div>
      ))}
    </div>
  );
}
