"use client";

import { Table, Select, ListBox, Button, Avatar } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";

import { handleDeleteUser, handleUpdateUserRole } from "@/lib/action/users";

const UsersTable = ({ users }) => {
  const getRoleBadgeClass = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[12px] font-bold border border-blue-100";
      case "librarian":
        return "bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[12px] font-bold border border-orange-100";
      default:
        return "bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[12px] font-bold border border-slate-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Joined N/A";
    const date = new Date(dateString);
    return `Joined ${date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}`;
  };

  return (
    <Table className="w-full bg-white rounded-2xl">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="BiblioDrop Registered Users"
          className="min-w-[800px]"
        >
          <Table.Header>
            <Table.Column
              isRowHeader
              className="text-[11px] font-black uppercase tracking-wider text-slate-500 py-4 pl-6"
            >
              Full Name
            </Table.Column>
            <Table.Column className="text-[11px] font-black uppercase tracking-wider text-slate-500 py-4">
              Email Address
            </Table.Column>
            <Table.Column className="text-[11px] font-black uppercase tracking-wider text-slate-500 py-4">
              Current Role
            </Table.Column>
            <Table.Column className="text-[11px] font-black uppercase tracking-wider text-slate-500 py-4 pr-6 text-right">
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {users?.map((user) => {
              const userId = user?._id;

              return (
                <Table.Row
                  key={userId}
                  className="border-b border-gray-100/60 hover:bg-slate-50/40 transition-colors"
                >
                  <Table.Cell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar
                        className="w-10 h-10 font-bold bg-[#0A2540]/5 text-[#0A2540] shrink-0"
                        alt={user?.name}
                      >
                        <Avatar.Image src={user?.image} alt={user?.name} />

                        <Avatar.Fallback className="bg-[#0A2540]/5 text-[#0A2540] font-bold text-sm uppercase">
                          {user?.name ? user?.name[0].toUpperCase() : "U"}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col text-left">
                        <span className="text-[14px] font-bold text-[#0A2540] tracking-tight">
                          {user?.name || "Anonymous User"}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                          {formatDate(
                            user?.createdAt?.$date || user?.createdAt,
                          )}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="py-4 text-[13px] font-medium text-slate-600">
                    {user?.email}
                  </Table.Cell>

                  <Table.Cell className="py-4">
                    <span className={getRoleBadgeClass(user?.role)}>
                      {user?.role}
                    </span>
                  </Table.Cell>

                  <Table.Cell className="py-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Select
                        className="w-[130px]"
                        defaultValue={user?.role}
                        onSelectionChange={(value) =>
                          handleUpdateUserRole(userId, value)
                        }
                      >
                        <Select.Trigger className="bg-slate-100 hover:bg-slate-200 border-none rounded-lg h-8 text-[12px] font-bold px-3 transition-colors text-slate-700">
                          <Select.Value />
                          <Select.Indicator className="text-slate-500 ml-1.5" />
                        </Select.Trigger>
                        <Select.Popover className="border border-slate-100 bg-white rounded-xl shadow-lg mt-1">
                          <ListBox className="p-1">
                            <ListBox.Item
                              id="user"
                              textValue="Reader"
                              className="text-[12px] font-semibold p-2 hover:bg-slate-50 rounded-md cursor-pointer text-slate-700"
                            >
                              Reader
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item
                              id="librarian"
                              textValue="Librarian"
                              className="text-[12px] font-semibold p-2 hover:bg-slate-50 rounded-md cursor-pointer text-slate-700"
                            >
                              Librarian
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item
                              id="admin"
                              DefaultValue="Admin"
                              className="text-[12px] font-semibold p-2 hover:bg-slate-50 rounded-md cursor-pointer text-slate-700"
                            >
                              Admin
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteUser(user?._id);
                        }}
                        size="sm"
                        variant="light"
                        className="text-rose-600 hover:bg-rose-50 rounded-lg w-8 h-8 flex items-center justify-center transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default UsersTable;
