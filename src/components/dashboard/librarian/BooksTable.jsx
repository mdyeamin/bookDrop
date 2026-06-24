"use client";

import { Table, Button, Select, ListBox } from "@heroui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { handleDeleteBook } from "@/lib/action/books";
import { EditBookModal } from "./EditBookModal";

const BooksTable = ({ books }) => {
  const editButton = (
    <Button
      isIconOnly
      size="sm"
      variant="flat"
      className="text-slate-600 hover:text-[#0A2540]"
    >
      <FiEdit2 size={16} />
    </Button>
  );

  console.log(books);

  // শুধুমাত্র ডিজাইনের জন্য স্ট্যাটাস অনুযায়ী কালার বের করার ফাংশন
  const getStatusColorClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "pending":
        return "bg-orange-50 text-orange-700 border border-orange-100";
      case "rejected":
        return "bg-rose-50 text-rose-700 border border-rose-100";
      case "unpublished":
        return "bg-slate-100 text-slate-600 border border-slate-200";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header Section */}
      <div className="p-6 md:p-8 border-b border-slate-100">
        <h2 className="text-[28px] font-bold text-[#0A2540] mb-2 tracking-tight">
          Book Inventory Control
        </h2>
        <p className="text-[14px] text-slate-500 font-medium max-w-3xl">
          Maintain the global repository of titles. Monitor approval statuses
          and toggle visibility.
        </p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Book Inventory" className="min-w-[800px]">
            <Table.Header>
              <Table.Column isRowHeader>BOOK DETAILS</Table.Column>
              <Table.Column>DATE ADDED</Table.Column>
              <Table.Column>ADMIN STATUS</Table.Column>
              <Table.Column>VISIBILITY STATUS</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {books.map((book) => (
                <Table.Row key={book._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-4">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded shadow-sm"
                      />
                      <div>
                        <p className="font-bold text-slate-800">{book.title}</p>
                        <p className="text-xs text-slate-500">{book.author}</p>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(book.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Table.Cell>

                  {/* Admin Status সেল */}
                  <Table.Cell>
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-block ${getStatusColorClass(book?.status)}`}
                    >
                      {book?.status || "Unknown"}
                    </span>
                  </Table.Cell>

                  {/* ✅ আপডেট করা VISIBILITY STATUS সেল */}
                  <Table.Cell>
                    <Select
                      className="w-[140px]"
                      // ১. স্ট্যাটাস approved না হলে disabled থাকবে
                      isDisabled={book?.status?.toLowerCase() !== "approved"}
                      // ২. approved হলে default Published থাকবে, না হলে Unpublished
                      selectedKeys={[
                        book?.status?.toLowerCase() === "approved"
                          ? "Published"
                          : "Unpublished",
                      ]}
                    >
                      <Select.Trigger className="h-8 text-xs font-bold border-slate-200">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="Published" textValue="Published">
                            Published
                          </ListBox.Item>
                          <ListBox.Item
                            id="Unpublished"
                            textValue="Unpublished"
                          >
                            Unpublished
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-2">
                      <EditBookModal book={book} editButton={editButton} />
                      <Button
                        onClick={() => handleDeleteBook(book?._id)}
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="danger"
                      >
                        <FiTrash2 size={14} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default BooksTable;