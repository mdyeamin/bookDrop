"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  TextField,
  Select,
  ListBox,
  Form,
} from "@heroui/react";
import {  FiSave, FiUpload } from "react-icons/fi";
import Image from "next/image";
import { handleUpdateBook } from "@/lib/action/books";

export function EditBookModal({ book,editButton }) {
  const [photoURL, setPhotoURL] = useState(book.image);
  const [isUploading, setIsUploading] = useState(false);

  const categoryOptions = [
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 500KB validation
    const maxSizeInBytes = 500 * 1024;

    if (file.size > maxSizeInBytes) {
      alert("File size is too large! Maximum allowed size is 500KB.");
      e.target.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const imgFormData = new FormData();
      imgFormData.append("image", file);
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: imgFormData,
        },
      );
      const imgData = await response.json();

      if (imgData.success) {
        setPhotoURL(imgData.data.display_url);
      } else {
        alert("Upload failed: " + (imgData.error?.message || "unknown error"));
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };
  const handleUpdateBookData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());
    const payload = {
      ...updatedData,
      image: photoURL,
    };

    await handleUpdateBook(book?._id, payload);
  };

  return (
    <Modal>
      {editButton}

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-lg border-0 shadow-2xl rounded-2xl">
            <Modal.CloseTrigger className="hover:bg-slate-100 p-2 rounded-full" />

            <Modal.Header className="pb-2">
              <Modal.Heading className="text-xl font-bold text-[#0A2540]">
                Edit Book Details
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="px-6 py-4">
              <Form
                onSubmit={handleUpdateBookData}
                className="flex flex-col gap-5"
              >
                {/* Image Section with Modern Style */}
                <div className="flex items-center gap-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Image
                    src={photoURL}
                    alt="Cover"
                    width={200}
                    height={200}
                    className="w-16 h-20 object-cover rounded-lg shadow-sm"
                  />
                  <label className="flex items-center gap-2 cursor-pointer bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:border-[#0A2540] transition-all">
                    <FiUpload size={14} />
                    {isUploading ? "Uploading..." : "Change Cover"}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    className="col-span-2"
                    name="title"
                    defaultValue={book.title}
                  >
                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Title
                    </Label>
                    <Input className="h-10" />
                  </TextField>

                  <TextField
                    className="col-span-1"
                    name="author"
                    defaultValue={book.author}
                  >
                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Author
                    </Label>
                    <Input className="h-10" />
                  </TextField>

                  <TextField
                    className="col-span-1"
                    name="deliveryFee"
                    type="number"
                    defaultValue={book.deliveryFee}
                  >
                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Fee ($)
                    </Label>
                    <Input className="h-10" />
                  </TextField>
                </div>

                <Select
                  name="category"
                  defaultValue={[book.category]}
                  label="Category"
                  className="w-full"
                >
                  <Select.Trigger className="h-10 border-slate-200">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox items={categoryOptions}>
                      {(item) => (
                        <ListBox.Item id={item.id}>{item.label}</ListBox.Item>
                      )}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <TextField
                  className="w-full"
                  name="description"
                  defaultValue={book.description}
                >
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Description
                  </Label>
                  <Input className="h-10" />
                </TextField>
                <Modal.Footer className="pt-2">
                  <Button
                    slot="close"
                    variant="secondary"
                    className="font-semibold text-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    slot="close"
                    className="bg-[#0A2540] text-white hover:bg-[#153e66] font-semibold px-6"
                    isDisabled={isUploading}
                  >
                    <FiSave className="mr-2" /> Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
