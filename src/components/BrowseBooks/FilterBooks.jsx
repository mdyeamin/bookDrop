"use client";

import React from "react";
import { Input, Select, ListBox, Checkbox } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

const FilterBooks = () => {
  const categoryOptions = [
    { id: "all", label: "All Categories" },
    { id: "Fiction", label: "Fiction" },
    { id: "Sci-Fi", label: "Sci-Fi" },
    { id: "Fantasy", label: "Fantasy" },
    { id: "Mystery-Thriller", label: "Mystery & Thriller" },
    { id: "Romance", label: "Romance" },
    { id: "Academic", label: "Academic" },
    { id: "History", label: "History" },
    { id: "Biography", label: "Biography" },
    { id: "Self-Help", label: "Self-Help" },
    { id: "Business", label: "Business & Economics" },
    { id: "Children", label: "Children's Books" },
    { id: "Poetry", label: "Poetry" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 pt-6">
      
      {/* Page Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6 tracking-tight">
        Browse Books
      </h1>

      {/* Filter Bar Container */}
      <div className="w-full bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
        
        {/* Search Input */}
        <Input
          placeholder="Search title, author, or ISBN..."
          startContent={<FiSearch className="text-slate-400 size-4" />}
          className="w-full lg:flex-grow"
          classNames={{
            inputWrapper:
              "h-11 bg-white border border-slate-200 shadow-none hover:border-slate-300",
          }}
        />

        {/* Dropdowns */}
        <div className="flex w-full lg:w-auto gap-4 flex-col sm:flex-row">
          <Select
            placeholder="All Categories"
            className="w-full sm:w-[180px] lg:w-[200px]"
            aria-label="Select Category"
          >
            <Select.Trigger className="h-11 border-slate-200 bg-white">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox items={categoryOptions}>
                {(item) => (
                  <ListBox.Item id={item.id} textValue={item.label}>
                    {item.label}
                  </ListBox.Item>
                )}
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            placeholder="Delivery Fee"
            className="w-full sm:w-[180px] lg:w-[200px]"
            aria-label="Select Delivery Fee"
          >
            <Select.Trigger className="h-11 border-slate-200 bg-white">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="all">All Fees</ListBox.Item>
                <ListBox.Item id="free">Free</ListBox.Item>
                <ListBox.Item id="low">Under $5</ListBox.Item>
                <ListBox.Item id="high">Above $5</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Checkbox */}
        <div className="flex items-center justify-start w-full lg:w-auto px-2">
          <Checkbox className="text-slate-600 text-sm font-medium">
            Available Now
          </Checkbox>
        </div>
        
      </div>
    </div>
  );
};

export default FilterBooks;