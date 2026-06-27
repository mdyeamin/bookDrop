"use client";

import React, { useState, useEffect } from "react";

import { Select, ListBox, Checkbox } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const FilterBooks = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  const categoryOptions = [
    { id: "all", label: "All Categories" },
    { id: "Fiction", label: "Fiction" },
    { id: "Sci-Fi", label: "Sci-Fi" },
    { id: "Fantasy", label: "Fantasy" },
    { id: "Mystery-Thriller", label: "Mystery-Thriller" },
    { id: "Romance", label: "Romance" },
    { id: "Academic", label: "Academic" },
    { id: "History", label: "History" },
    { id: "Biography", label: "Biography" },
    { id: "Self-Help", label: "Self-Help" },
    { id: "Business", label: "Business" },
    { id: "Children", label: "Children" },
    { id: "Poetry", label: "Poetry" },
  ];

  const updateQueryParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue !== (searchParams.get("search") || "")) {
        updateQueryParams("search", searchValue);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 pt-6">
      <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6 tracking-tight">
        Browse Books
      </h1>

      <div className="w-full bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative w-full lg:flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <FiSearch className="text-slate-400 size-[18px]" />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search title, author, or ISBN..."
            className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl outline-none hover:border-slate-300 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex w-full lg:w-auto gap-4 flex-col sm:flex-row">
          <Select
            placeholder="All Categories"
            defaultSelectedKeys={
              new Set([searchParams.get("category") || "all"])
            }
            onSelectionChange={(keys) => {
              const selectedValue =
                keys instanceof Set ? Array.from(keys)[0] : keys;
              if (selectedValue) {
                updateQueryParams("category", selectedValue.toString());
              }
            }}
            className="w-full sm:w-[180px] lg:w-[200px]"
            aria-label="Select Category"
          >
            <Select.Trigger className="h-11 border-slate-200 bg-white">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {categoryOptions.map((item) => (
                  <ListBox.Item
                    key={item.id}
                    id={item.id === "all" ? "all" : item.label}
                    textValue={item.label}
                  >
                    {item.label}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            placeholder="Delivery Fee"
            defaultSelectedKeys={new Set([searchParams.get("fee") || "all"])}
            onSelectionChange={(keys) => {
              const selectedValue =
                keys instanceof Set ? Array.from(keys)[0] : keys;
              if (selectedValue) {
                updateQueryParams("fee", selectedValue.toString());
              }
            }}
            className="w-full sm:w-[180px] lg:w-[200px]"
            aria-label="Select Delivery Fee"
          >
            <Select.Trigger className="h-11 border-slate-200 bg-white">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="all" textValue="All Fees">
                  All Fees
                </ListBox.Item>
                <ListBox.Item id="free" textValue="Free">
                  Free
                </ListBox.Item>
                <ListBox.Item id="low" textValue="Under $5">
                  Under $5
                </ListBox.Item>
                <ListBox.Item id="high" textValue="Above $5">
                  Above $5
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterBooks;
