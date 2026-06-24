"use client";

import { Table, Button } from "@heroui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { handleDeleteBook, unpublishBookByLibrarian } from "@/lib/action/books";

import { EditBookModal } from "./EditBookModal";
import Image from "next/image";

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

  const getStatusColorClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "pending":
        return "bg-orange-50 text-orange-700 border border-orange-100";
      case "rejected":
        return "bg-rose-50 text-rose-700 border border-rose-100";
      case "unpublished":
      case "unpublish":
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
              {books.map((book) => {
                const status = book?.status?.toLowerCase();

                return (
                  <Table.Row key={book._id}>
                    {/* BOOK DETAILS */}
                    <Table.Cell>
                      <div className="flex items-center gap-4">
                        <Image
                          width={100}
                          height={100}
                          src={book.image}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded shadow-sm"
                        />
                        <div>
                          <p className="font-bold text-slate-800">
                            {book.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* DATE */}
                    <Table.Cell>
                      {new Date(book.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Table.Cell>

                    {/* ADMIN STATUS */}
                    <Table.Cell>
                      <span
                        className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide inline-block ${getStatusColorClass(
                          status,
                        )}`}
                      >
                        {status || "Unknown"}
                      </span>
                    </Table.Cell>

                    {/* ✅ VISIBILITY STATUS  */}
                    <Table.Cell>
                      {status === "approved" ? (
                        // Approved হলে Unpublish
                        <Button
                          size="sm"
                          className="font-semibold text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-100/80 shadow-sm hover:shadow transition-all duration-200 rounded-full px-5 active:scale-95"
                          onClick={() =>
                            unpublishBookByLibrarian(book._id, "unpublished")
                          }
                        >
                          Unpublish
                        </Button>
                      ) : status === "unpublished" || status === "unpublish" ? (
                        // Unpublished হলে Publish
                        <Button
                          size="sm"
                          className="font-semibold text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border border-emerald-100/80 shadow-sm hover:shadow transition-all duration-200 rounded-full px-5 active:scale-95"
                          onClick={() =>
                            unpublishBookByLibrarian(book._id, "approved")
                          }
                        >
                          Publish
                        </Button>
                      ) : (
                        // Disabled / Waiting
                        <Button
                          size="sm"
                          isDisabled
                          variant="flat"
                          className="text-[10px] font-bold tracking-widest uppercase text-slate-400 bg-slate-50 border border-slate-200/60 rounded-full px-5 cursor-not-allowed shadow-none"
                        >
                          {status || "Waiting"}
                        </Button>
                      )}
                    </Table.Cell>

                    {/* ACTIONS */}
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
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default BooksTable;
