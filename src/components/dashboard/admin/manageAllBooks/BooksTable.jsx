"use client";

import { useState } from "react";
import { Table, Button, Select, ListBox } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/image";

const BooksTable = ({ initialBooks }) => {
  // ডাটা ম্যানেজ করার জন্য State
  const [books, setBooks] = useState(initialBooks || []);

  // স্ট্যাটাস চেঞ্জ হ্যান্ডলার
  const handleStatusChange = async (bookId, newStatusKeys) => {
    // Select থেকে আসা Set থেকে স্ট্রিং ভ্যালু বের করা
    const newStatus = Array.from(newStatusKeys)[0];
    if (!newStatus) return;

    // Optimistic Update (UI সাথে সাথে চেঞ্জ হবে)
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === bookId ? { ...book, status: newStatus } : book
      )
    );

    // TODO: আপনার API কল এখানে বসাবেন
    // await updateBookStatus(bookId, newStatus);
  };

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (bookId) => {
    const isConfirm = window.confirm("Are you sure you want to completely delete this book?");
    if (!isConfirm) return;

    // UI থেকে সাথে সাথে রিমুভ করা
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));

    // TODO: আপনার API কল এখানে বসাবেন
    // await deleteBookAdmin(bookId);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-6">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage All Books" className="min-w-[800px]">
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
                  {/* Book Info Column */}
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
                        <p className="font-bold text-slate-800 line-clamp-1">{book.title}</p>
                        <p className="text-xs text-slate-500">{book.category}</p>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Author Column */}
                  <Table.Cell>
                    <p className="text-sm text-slate-700 capitalize">{book.author}</p>
                  </Table.Cell>

                  {/* Delivery Fee Column */}
                  <Table.Cell>
                    <p className="text-sm text-slate-700 font-medium">৳{book.deliveryFee}</p>
                  </Table.Cell>

                  {/* Status Dropdown Column */}
                  <Table.Cell>
                    <Select
                      className="w-[140px]"
                      selectedKeys={[book.status]}
                      defaultValue={book.status}
                      onSelectionChange={(keys) => handleStatusChange(book._id, keys)}
                    >
                      <Select.Trigger className="h-8 text-xs font-bold border-slate-200 capitalize">
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
                          <ListBox.Item id="unpublished" textValue="Unpublished">
                            Unpublished
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Table.Cell>

                  {/* Actions Column */}
                  <Table.Cell>
                    <Button
                      onClick={() => handleDelete(book._id)}
                      isIconOnly
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