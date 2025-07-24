"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import Loader from "./Loader";

interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  created: Timestamp | string;
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          name: docData.name || "",
          email: docData.email || "",
          role: docData.role || "",
          created: docData.created || Timestamp.now(),
        };
      });
      setUsers(data);
      setFilteredUsers(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let data = [...users];
    if (searchTerm) {
      data = data.filter((u) =>
        `${u.name} ${u.email}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortKey) {
      data.sort((a, b) => {
        if (a[sortKey]! < b[sortKey]!) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey]! > b[sortKey]!) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    setFilteredUsers(data);
  }, [users, searchTerm, sortKey, sortOrder]);

  const toggleSort = (key: keyof User) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border border-gray-300 rounded p-2 w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow border bg-white">
      <table className="min-w-[640px] w-full text-sm text-left text-gray-500 break-words">
          <thead className="text-xs uppercase bg-gray-50 text-gray-700">
            <tr>
              {["name", "email", "role", "created"].map((key) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key as keyof User)}
                  className="px-6 py-3 cursor-pointer select-none"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <span className="ml-1 text-xs">▲▼</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  <Loader />
                </td>
              </tr>
            ) : (
              currentItems.map((user) => {
                const createdDate =
                  user.created instanceof Timestamp
                    ? user.created.toDate().toLocaleDateString()
                    : typeof user.created === "string"
                    ? new Date(user.created).toLocaleDateString()
                    : "Invalid Date";

                return (
                  <tr key={user.id} className="border-t">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{createdDate}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 flex-wrap gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="px-3 h-8 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 h-8 text-sm border rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 h-8 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}