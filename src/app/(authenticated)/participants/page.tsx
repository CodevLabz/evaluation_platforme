'use client'
import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, Check, X, Upload, QrCode, FileText, Download, Info } from "lucide-react";
type Category = "student" | "teacher" | "professional" | "other";
type Participant = {
  id: string;
  name: string;
  email: string;
  status: "pending" | "accepted" | "paid";
  paymentProof?: string;
  category: Category;
  registrationDate: string;
  phone: string;
  organization: string;
  attendance: number;
};
export default function Participants() {
  const [participants, setParticipants] = useState<Participant[]>([{
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "pending",
    category: "student",
    registrationDate: "2024-01-20",
    phone: "+1234567890",
    organization: "University XYZ",
    attendance: 2
  }, {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "accepted",
    category: "professional",
    registrationDate: "2024-01-22",
    phone: "+1234567891",
    organization: "Company ABC",
    attendance: 1
  }]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: ""
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const handleStatusChange = (id: string, newStatus: "pending" | "accepted" | "paid") => {
    setParticipants(participants.map(p => p.id === id ? {
      ...p,
      status: newStatus
    } : p));
  };
  const handleAddParticipant = () => {
    const participant: Participant = {
      id: Date.now().toString(),
      ...newParticipant,
      status: "pending",
      category: "other",
      registrationDate: new Date().toISOString().split("T")[0],
      phone: "",
      organization: "",
      attendance: 0
    };
    setParticipants([...participants, participant]);
    setShowAddModal(false);
    setNewParticipant({
      name: "",
      email: ""
    });
  };
  const handlePaymentConfirmation = (participant: Participant) => {
    setSelectedParticipant(participant);
    setShowPaymentModal(true);
  };
  const handlePaymentSubmit = (participant: Participant) => {
    setParticipants(participants.map(p => p.id === participant.id ? {
      ...p,
      status: "paid"
    } : p));
    setShowPaymentModal(false);
    setShowDocumentModal(true);
  };
  const filteredParticipants = participants.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Participant Management
        </h2>
        
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search participants..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParticipants.map(participant => <tr key={participant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {participant.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {participant.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                      {participant.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {participant.registrationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${participant.status === "paid" ? "bg-green-100 text-green-800" : participant.status === "accepted" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {participant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {participant.attendance} sessions
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button onClick={() => {
                    setSelectedParticipant(participant);
                    setShowDetailsModal(true);
                  }} className="text-gray-600 hover:text-gray-900">
                        <Info size={18} />
                      </button>
                      {participant.status !== "paid" ? <button onClick={() => handlePaymentConfirmation(participant)} className="text-green-600 hover:text-green-800 px-2 py-1 rounded-md border border-green-600 hover:bg-green-50 text-sm">
                          Mark as Paid
                        </button> : <button onClick={() => {
                    setSelectedParticipant(participant);
                    setShowDocumentModal(true);
                  }} className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded-md border border-blue-600 hover:bg-blue-50 text-sm">
                          Generate Documents
                        </button>}
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {showPaymentModal && selectedParticipant && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Payment - {selectedParticipant.name}
            </h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <Upload className="text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-600">
                    Upload payment proof (optional)
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                <input type="file" className="hidden" />
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setShowPaymentModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Cancel
                </button>
                <button onClick={() => handlePaymentSubmit(selectedParticipant)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>}
      {showDocumentModal && selectedParticipant && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Generate Documents</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50" onClick={() => {
            /* Handle QR code generation */
          }}>
                <span className="flex items-center">
                  <QrCode className="mr-2" size={20} />
                  QR Code Badge
                </span>
                <Download size={20} />
              </button>
              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50" onClick={() => {
            /* Handle invoice generation */
          }}>
                <span className="flex items-center">
                  <FileText className="mr-2" size={20} />
                  Invoice (Facture)
                </span>
                <Download size={20} />
              </button>
              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50" onClick={() => {
            /* Handle receipt generation */
          }}>
                <span className="flex items-center">
                  <FileText className="mr-2" size={20} />
                  Receipt
                </span>
                <Download size={20} />
              </button>
              <div className="flex justify-end">
                <button onClick={() => setShowDocumentModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>}
      {showDetailsModal && selectedParticipant && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Participant Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{selectedParticipant.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedParticipant.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{selectedParticipant.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{selectedParticipant.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Organization</p>
                <p className="font-medium">
                  {selectedParticipant.organization}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration Date</p>
                <p className="font-medium">
                  {selectedParticipant.registrationDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${selectedParticipant.status === "paid" ? "bg-green-100 text-green-800" : selectedParticipant.status === "accepted" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {selectedParticipant.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Attendance</p>
                <p className="font-medium">
                  {selectedParticipant.attendance} sessions
                </p>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};