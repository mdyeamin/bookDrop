import TotalUsers from '@/components/dashboard/admin/TotalUsers';
import UsersTable from '@/components/dashboard/admin/UsersTable';
import { getUsers } from '@/lib/api/users';
import React from 'react';


const UsersPage = async() => {
    const users = await  getUsers()
    console.log(users);
    
    return (
        <div>
            <TotalUsers users={users}/>
            <UsersTable users={users}/>
        </div>
    );
};

export default UsersPage;

