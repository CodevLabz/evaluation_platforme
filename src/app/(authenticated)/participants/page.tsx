'use client'
import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, Check, X, Upload, QrCode, FileText, Download, Info } from "lucide-react";
import { QRBadgeModal } from 'src/components/QRBadgeModal';

type IForm = {
  id: string;
  formId: string;
  formType: "communication" | "symposium" | "roundtable";
  title: string;
  contact: {
    name: string;
    phone: string;
    email: string;
    address: string;
    country: string;
    institution: string;
    status: string;
  };
  language: string;
  summary: string;
  finalVersion: boolean;
  technicalMetadata: {
    ip: string;
    userAgent: string;
    referrer: string;
  };
  registrationDate: string;
  status: "pending" | "accepted" | "paid";
  name: string;
  email: string;
  institution: string;
  type: "author" | "coAuthor" | "coordinator" | "organizer";
  communicationDetails?: {
    contributionType: string;
    contributionNature: string;
    axis: string;
    coAuthors: Array<{
      name: string;
      email: string;
      institution: string;
      _id: string;
    }>;
  };
};

export default function Participants() {
  const [participants, setParticipants] = useState<IForm[]>([
    {
      id: "67b7a20e7689333475236f85",
      formId: "67b790177689333475236f32",
      formType: "communication",
      title: "Updated Communication Title",
      contact: {
        name: "John Doe",
        phone: "+1234567890",
        email: "john@example.com",
        address: "123 Test St",
        country: "Tunisia",
        institution: "Test University",
        status: "active"
      },
      language: "English",
      summary: "Updated summary content",
      finalVersion: false,
      technicalMetadata: {
        ip: "::1",
        userAgent: "PostmanRuntime/7.43.0",
        referrer: "unknown"
      },
      registrationDate: "2025-02-20T20:27:03.774Z",
      status: "pending",
      name: "John Doe",
      email: "john@example.com",
      institution: "Test University",
      type: "author",
      communicationDetails: {
        contributionType: "Research",
        contributionNature: "Original",
        axis: "Education Technology",
        coAuthors: [
          {
            name: "Jane Smith",
            email: "jane@example.com",
            institution: "Another University",
            _id: "67b790177689333475236f33"
          }
        ]
      }
    },
    {
      id: "67b7a20e7689333475236f86",
      formId: "67b790177689333475236f32",
      formType: "communication",
      title: "Updated Communication Title",
      contact: {
        name: "John Doe",
        phone: "+1234567890",
        email: "john@example.com",
        address: "123 Test St",
        country: "Tunisia",
        institution: "Test University",
        status: "active"
      },
      language: "English",
      summary: "Updated summary content",
      finalVersion: false,
      technicalMetadata: {
        ip: "::1",
        userAgent: "PostmanRuntime/7.43.0",
        referrer: "unknown"
      },
      registrationDate: "2025-02-20T20:27:03.774Z",
      status: "accepted",
      name: "Jane Smith",
      email: "jane@example.com",
      institution: "Another University",
      type: "coAuthor",
      communicationDetails: {
        contributionType: "Research",
        contributionNature: "Original",
        axis: "Education Technology",
        coAuthors: [
          {
            name: "Jane Smith",
            email: "jane@example.com",
            institution: "Another University",
            _id: "67b790177689333475236f33"
          }
        ]
      }
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: ""
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<IForm | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showQRBadgeModal, setShowQRBadgeModal] = useState(false);

  const handleStatusChange = (id: string, newStatus: "pending" | "accepted" | "paid") => {
    setParticipants(participants.map((p: any) => p.id === id ? {
      ...p,
      status: newStatus
    } : p));
  };

  const handleAddParticipant = () => {
    const participant: IForm = {
      id: Date.now().toString(),
      formId: "",
      ...newParticipant,
      status: "pending",
      type: "author",
      registrationDate: new Date().toISOString().split("T")[0],
      institution: "",
      formType: "communication",
      title: "",
      contact: {
        name: "",
        phone: "",
        email: "",
        address: "",
        country: "",
        institution: "",
        status: ""
      },
      language: "",
      summary: "",
      finalVersion: false,
      technicalMetadata: {
        ip: "",
        userAgent: "",
        referrer: ""
      }
    };
    setParticipants([...participants, participant]);
    setShowAddModal(false);
    setNewParticipant({
      name: "",
      email: ""
    });
  };

  const handlePaymentConfirmation = (participant: IForm) => {
    setSelectedParticipant(participant);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (participant: IForm) => {
    setParticipants(participants.map((p: any) => p.id === participant.id ? {
      ...p,
      status: "paid"
    } : p));
    setShowPaymentModal(false);
    setShowDocumentModal(true);
  };

  const filteredParticipants = participants.filter((p: any) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Participants</h2>
          <p className="text-gray-600">Manage conference participants</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search participants..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
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
              {filteredParticipants.map((participant: any) => (
                <tr key={participant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {participant.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {participant.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        ID: {participant.formId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {participant.contact?.phone || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {participant.type}
                    </span>
                    {participant.type === 'coAuthor' && (
                      <div className="text-xs text-gray-500 mt-1">
                        Form: {participant.formId}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {participant.institution}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {participant.contact?.country || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {participant.contact?.address || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      participant.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : participant.status === "paid"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {participant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePaymentConfirmation(participant)}
                        className="text-green-600 hover:text-green-800"
                        title="Process Payment"
                      >
                        <Download size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedParticipant(participant);
                          setShowDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Info size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
              <button
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                onClick={() => {
                  setShowDocumentModal(false);
                  setShowQRBadgeModal(true);
                }}
              >
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
      {showDetailsModal && selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Participant Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Basic Information */}
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{selectedParticipant.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedParticipant.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Institution</p>
                <p className="font-medium">{selectedParticipant.institution}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{selectedParticipant.type}</p>
              </div>

              {/* Contact Information */}
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{selectedParticipant.contact.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{selectedParticipant.contact.address || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{selectedParticipant.contact.country || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Form ID</p>
                <p className="font-medium">{selectedParticipant.formId}</p>
              </div>

              {/* Form Details */}
              <div>
                <p className="text-sm text-gray-500">Form Type</p>
                <p className="font-medium">{selectedParticipant.formType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration Date</p>
                <p className="font-medium">
                  {new Date(selectedParticipant.registrationDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{selectedParticipant.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Language</p>
                <p className="font-medium">{selectedParticipant.language}</p>
              </div>

              {/* Communication Details */}
              {selectedParticipant.communicationDetails && (
                <>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 font-semibold mt-2">Communication Details</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contribution Type</p>
                    <p className="font-medium">
                      {selectedParticipant.communicationDetails.contributionType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contribution Nature</p>
                    <p className="font-medium">
                      {selectedParticipant.communicationDetails.contributionNature}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Axis</p>
                    <p className="font-medium">
                      {selectedParticipant.communicationDetails.axis}
                    </p>
                  </div>

                  {/* Co-Authors Section - Only show for main authors */}
                  {selectedParticipant.type === 'author' && selectedParticipant.communicationDetails.coAuthors.length > 0 && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 font-semibold mt-2">Co-Authors</p>
                      <div className="mt-2 space-y-2">
                        {selectedParticipant.communicationDetails.coAuthors.map((coAuthor) => (
                          <div key={coAuthor._id} className="border rounded p-2">
                            <p className="font-medium">{coAuthor.name}</p>
                            <p className="text-sm text-gray-500">{coAuthor.email}</p>
                            <p className="text-sm text-gray-500">{coAuthor.institution}</p>
                            <p className="text-sm text-gray-500">ID: {coAuthor._id}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Summary */}
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Summary</p>
                <p className="font-medium whitespace-pre-wrap">{selectedParticipant.summary}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showQRBadgeModal && selectedParticipant && (
        <QRBadgeModal
          participant={{
            id: selectedParticipant.id,
            name: selectedParticipant.name,
            category: selectedParticipant.type,
            organization: selectedParticipant.institution
          }}
          onClose={() => setShowQRBadgeModal(false)}
        />
      )}
    </div>;
};