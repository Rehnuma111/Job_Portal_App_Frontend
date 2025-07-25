import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Navbar from "../shared/Navbar";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/all`, {
          withCredentials: true,
        });
        setUsers(res.data.users);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e3e0ff] flex flex-col font-sans">
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col p-2 md:p-8">
          <h2 className="text-3xl font-extrabold mb-8 text-[#4B2996] drop-shadow-lg tracking-tight">
            All Users
          </h2>
          <div className="bg-white/95 rounded-2xl shadow-2xl p-2 md:p-8 border border-gray-100 overflow-x-auto transition-all duration-300">
            {loading ? (
              <div className="text-center py-10 text-lg">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-semibold">
                        {user.fullName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <button
                          className="px-3 py-1 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                          onClick={() => alert(`Edit user ${user._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
                          onClick={() => alert(`Delete user ${user._id}`)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
