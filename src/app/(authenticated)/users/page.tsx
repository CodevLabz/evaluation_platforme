'use client'
import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Edit2,
  Trash2,
  Shield,
  UserCog,
  User as UserIcon,
} from "lucide-react";
type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "organizer" | "staff";
  status: "active" | "inactive";
};
export default function Index() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: "2",
      name: "Event Organizer",
      email: "organizer@example.com",
      role: "organizer",
      status: "active",
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    role: "admin" | "organizer" | "staff";
  }>({
    name: "",
    email: "",
    role: "staff",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "staff" ,
  });
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield size={20} className="text-red-600" />;
      case "organizer":
        return <UserCog size={20} className="text-blue-600" />;
      default:
        return <UserIcon size={20} className="text-green-600" />;
    }
  };
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role as "staff",
    });
    setShowEditModal(true);
  };
  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };
  const handleEditSubmit = () => {
    if (!selectedUser) return;
    setUsers(
      users.map((u:any) =>
        u.id === selectedUser.id
          ? {
              ...u,
              ...editForm,
            }
          : u,
      ),
    );
    setShowEditModal(false);
  };
  const handleDeleteConfirm = () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setShowDeleteModal(false);
  };
  const handleAddUser = () => {
    const newUserData: User = {
      id: Date.now().toString(),
      ...newUser,
      status: "active",
    };
    setUsers([...users, newUserData]);
    setShowAddModal(false);
    setNewUser({
      name: "",
      email: "",
      role: "staff",
    });
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600">Manage platform users and their roles</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <UserPlus size={20} />
          <span>Add User</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getRoleIcon(user.role)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(user)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      email: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value as "admin" | "organizer" | "staff" ,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="staff">Staff</option>
                  <option value="organizer">Organizer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      email: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={editForm.role}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      role: e.target.value as "admin" | "organizer" | "staff",
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="staff">Staff</option>
                  <option value="organizer">Organizer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete {selectedUser.name}?</p>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
