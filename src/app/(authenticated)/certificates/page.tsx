'use client'
import React, { useState } from "react";
import { Award, Download, Search, CheckSquare } from "lucide-react";
type Participant = {
  id: string;
  name: string;
  email: string;
  status: "pending" | "confirmed" | "completed";
  certificateGenerated: boolean;
};
export default function Certificates  () {
  const [participants, setParticipants] = useState<Participant[]>([{
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "completed",
    certificateGenerated: false
  }, {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "completed",
    certificateGenerated: true
  }]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleGenerateCertificates = () => {
    // Implementation for certificate generation
    setParticipants(participants.map(p => selectedParticipants.includes(p.id) ? {
      ...p,
      certificateGenerated: true
    } : p));
    setSelectedParticipants([]);
  };
  const filteredParticipants = participants.filter(p => p.status === "completed" && (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase())));
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Certificate Management
          </h2>
          <p className="text-gray-600">
            Generate and manage participant certificates
          </p>
        </div>
        <button onClick={handleGenerateCertificates} disabled={selectedParticipants.length === 0} className={`bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 ${selectedParticipants.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}>
          <Award size={20} />
          <span>Generate Selected Certificates</span>
        </button>
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
                  <input type="checkbox" onChange={e => {
                  setSelectedParticipants(e.target.checked ? filteredParticipants.map(p => p.id) : []);
                }} checked={selectedParticipants.length === filteredParticipants.length} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
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
              {filteredParticipants.map(participant => <tr key={participant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" checked={selectedParticipants.includes(participant.id)} onChange={e => {
                  setSelectedParticipants(e.target.checked ? [...selectedParticipants, participant.id] : selectedParticipants.filter(id => id !== participant.id));
                }} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {participant.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {participant.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${participant.certificateGenerated ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {participant.certificateGenerated ? "Certificate Generated" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {participant.certificateGenerated && <button className="text-blue-600 hover:text-blue-900">
                        <Download size={20} />
                      </button>}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};