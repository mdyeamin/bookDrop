import TotalUsers from "@/components/dashboard/admin/TotalUsers";
import UsersTable from "@/components/dashboard/admin/UsersTable";
import UserTableSkeleton from "@/components/Loading/UserTableSkeleton";
import { getUsers } from "@/lib/api/users";
import React, { Suspense } from "react";

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <div>
      <TotalUsers users={users} />
      <Suspense fallback={<UserTableSkeleton />}>
        <UsersTable users={users} />
      </Suspense>
    </div>
  );
};

export default UsersPage;
