"use client";

import { useState } from "react";
import { Table, Button, Select, ListBox } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import { handleDeleteBookByAdmin, updateBookStatusByAdmin } from "@/lib/action/books";

const BooksTable = ({ initialBooks }) => {
  const books = initialBooks

 
  const getStatusColorClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none";
      case "pending":
        return "bg-orange-50 text-orange-700 hover:bg-orange-100 border-none";
      case "rejected":
        return "bg-rose-50 text-rose-700 hover:bg-rose-100 border-none";
      case "unpublished":
        return "bg-slate-100 text-slate-600 hover:bg-slate-200 border-none";
      default:
        return "bg-transparent border-slate-200 text-slate-700";
    }
  };


 

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-6">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Manage All Books"
            className="min-w-[800px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>BOOK INFO</Table.Column>
              <Table.Column>AUTHOR</Table.Column>
              <Table.Column>DELIVERY FEE</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {books.map((book) => (
                <Table.Row key={book._id}>
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
                        <p className="font-bold text-slate-800 line-clamp-1">
                          {book.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {book.category}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <p className="text-sm text-slate-700 capitalize">
                      {book.author}
                    </p>
                  </Table.Cell>

                  <Table.Cell>
                    <p className="text-sm text-slate-700 font-medium">
                     ${book.deliveryFee}
                    </p>
                  </Table.Cell>

                
                  <Table.Cell>
                    <Select
                      className="w-[130px]"
                      defaultValue={book?.status}
                      onSelectionChange={(value) =>
                        updateBookStatusByAdmin(book?._id, value)
                      }
                    >
                      <Select.Trigger 
                        className={`h-8 text-xs font-bold capitalize transition-colors ${getStatusColorClass(book?.status)}`}
                      >
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="approved" textValue="Approved">
                            Approved
                          </ListBox.Item>
                          <ListBox.Item id="pending" textValue="Pending">
                            Pending
                          </ListBox.Item>
                          <ListBox.Item id="rejected" textValue="Rejected">
                            Rejected
                          </ListBox.Item>
                          <ListBox.Item
                            id="unpublished"
                            textValue="Unpublished"
                          >
                            Unpublished
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      onClick={() => handleDeleteBookByAdmin(book?._id)}
                      
                      size="sm"
                      variant="flat"
                      color="danger"
                      className="hover:bg-danger-100"
                    >
                      <FiTrash2 size={14} />
                    </Button>
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