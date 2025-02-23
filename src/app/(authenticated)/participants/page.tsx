'use client'
import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Check, X, Upload, QrCode, FileText, Download, Info, Calendar, Type, Globe, UserCheck, Contact, Mail, Phone, Building2, MapPin, MessageSquare, FileType, Layers, Users, AlignLeft, Target, User, Clock } from "lucide-react";
import { QRBadgeModal } from 'src/components/QRBadgeModal';

type IForm = {
  symposiumDetails: any;
  roundtableDetails:any;
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

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export default function Participants() {
  const [participants, setParticipants] = useState<IForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10
  });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchParticipants();
  }, [pagination.currentPage, debouncedSearchTerm]);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/participants?page=${pagination.currentPage}&limit=${pagination.limit}&search=${debouncedSearchTerm}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch participants');
      }
      
      const data = await response.json();
      setParticipants(data.participants);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id: string, newStatus: "pending" | "accepted" | "paid") => {
    setParticipants(participants.map((p: any) => p.id === id ? {
      ...p,
      status: newStatus
    } : p));
  };

  const handleAddParticipant = () => {
    const participant: any = {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

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
                  Form Type
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
              {participants.map((participant: any) => (
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
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {participant.formType}
                    </span>
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
        
        {/* Pagination controls */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
              disabled={pagination.currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
              disabled={pagination.currentPage === pagination.totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{((pagination.currentPage - 1) * pagination.limit) + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)}
                </span>{' '}
                of <span className="font-medium">{pagination.totalItems}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {/* Generate page numbers */}
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      pagination.currentPage === i + 1
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedParticipant.type === "author" ? "Form Details" : "Contribution Details"}
                  </h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    selectedParticipant.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : selectedParticipant.status === "paid"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {selectedParticipant.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FileText size={16} />
                    ID: {selectedParticipant.formId}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    Registered: {new Date(selectedParticipant.registrationDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowDetailsModal(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Basic Information Card */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info size={20} className="text-gray-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Basic Information</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <FileText size={16} />
                      Form Type
                    </p>
                    <p className="mt-1 text-gray-900 capitalize">{selectedParticipant.formType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Type size={16} />
                      Title
                    </p>
                    <p className="mt-1 text-gray-900">{selectedParticipant.title || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Globe size={16} />
                      Language
                    </p>
                    <p className="mt-1 text-gray-900 capitalize">{selectedParticipant.language}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <UserCheck size={16} />
                      Type
                    </p>
                    <p className="mt-1 text-gray-900 capitalize">{selectedParticipant.type}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information Card */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Contact size={20} className="text-gray-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <User size={16} />
                      Name
                    </p>
                    <p className="mt-1 text-gray-900">{selectedParticipant.contact?.name || selectedParticipant.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Mail size={16} />
                      Email
                    </p>
                    <p className="mt-1 text-gray-900">{selectedParticipant.contact?.email || selectedParticipant.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Phone size={16} />
                      Phone
                    </p>
                    <p className="mt-1 text-gray-900">{selectedParticipant.contact?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Building2 size={16} />
                      Institution
                    </p>
                    <p className="mt-1 text-gray-900">{selectedParticipant.contact?.institution || selectedParticipant.institution || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <MapPin size={16} />
                      Address
                    </p>
                    <p className="mt-1 text-gray-900">{selectedParticipant.contact?.address || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Globe size={16} />
                      Country
                    </p>
                    <p className="mt-1 text-gray-900">{selectedParticipant.contact?.country || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Communication Details Card */}
              {selectedParticipant.formType === "communication" && selectedParticipant.communicationDetails && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare size={20} className="text-gray-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Communication Details</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <FileType size={16} />
                        Contribution Type
                      </p>
                      <p className="mt-1 text-gray-900">{selectedParticipant.communicationDetails.contributionType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <Layers size={16} />
                        Nature
                      </p>
                      <p className="mt-1 text-gray-900">{selectedParticipant.communicationDetails.contributionNature}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <Target size={16} />
                        Axis
                      </p>
                      <p className="mt-1 text-gray-900">{selectedParticipant.communicationDetails.axis}</p>
                    </div>
                  </div>

                  {/* Co-Authors Section */}
                  {selectedParticipant.communicationDetails.coAuthors && selectedParticipant.communicationDetails.coAuthors.length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                        <Users size={16} />
                        Co-Authors
                      </h5>
                      <div className="space-y-3">
                        {selectedParticipant.communicationDetails.coAuthors.map((coAuthor) => (
                          <div key={coAuthor._id} className="bg-white p-3 rounded-lg">
                            <p className="font-medium">{coAuthor.name}</p>
                            <p className="text-sm text-gray-500">{coAuthor.email}</p>
                            <p className="text-sm text-gray-500">{coAuthor.institution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Summary Card */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlignLeft size={20} className="text-gray-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Summary</h4>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedParticipant.summary}</p>
              </div>

              {/* Symposium Details Card */}
              {selectedParticipant.formType === "symposium" && selectedParticipant.symposiumDetails && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare size={20} className="text-gray-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Symposium Details</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <User size={16} />
                        Coordinator
                      </p>
                      <p className="mt-1 text-gray-900">{selectedParticipant.symposiumDetails.coordinator.name}</p>
                      <p className="text-sm text-gray-500">{selectedParticipant.symposiumDetails.coordinator.email}</p>
                      <p className="text-sm text-gray-500">{selectedParticipant.symposiumDetails.coordinator.affiliation}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <Target size={16} />
                        Axis
                      </p>
                      <p className="mt-1 text-gray-900">{selectedParticipant.symposiumDetails.axis}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <Clock size={16} />
                        Duration
                      </p>
                      <p className="mt-1 text-gray-900">{selectedParticipant.symposiumDetails.duration}</p>
                    </div>
                  </div>

                  {/* Main Contribution */}
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <FileText size={16} />
                      Main Contribution
                    </h5>
                    <p className="text-gray-700 bg-white p-3 rounded-lg">
                      {selectedParticipant.symposiumDetails.mainContribution}
                    </p>
                  </div>

                  {/* Contributions Section */}
                  {selectedParticipant.symposiumDetails.contributions && selectedParticipant.symposiumDetails.contributions.length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                        <Users size={16} />
                        Contributions
                      </h5>
                      <div className="space-y-3">
                        {selectedParticipant.symposiumDetails.contributions.map((contribution: any, index: any) => (
                          <div key={index} className="bg-white p-4 rounded-lg">
                            <h6 className="font-medium text-gray-900">{contribution.title}</h6>
                            <p className="text-sm text-gray-500 mt-1">Nature: {contribution.nature}</p>
                            <p className="text-sm text-gray-600 mt-2">{contribution.summary}</p>
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <p className="text-sm font-medium text-gray-700">Author</p>
                              <p className="text-sm text-gray-600">{contribution.author.name}</p>
                              <p className="text-sm text-gray-500">{contribution.author.email}</p>
                              <p className="text-sm text-gray-500">{contribution.author.affiliation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Roundtable Details Card */}
              {selectedParticipant.formType === "roundtable" && selectedParticipant.roundtableDetails && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare size={20} className="text-gray-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Roundtable Details</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <User size={16} />
                        Organizer
                      </p>
                      <p className="mt-1 text-gray-900">{selectedParticipant.roundtableDetails.organizer.name}</p>
                      <p className="text-sm text-gray-500">{selectedParticipant.roundtableDetails.organizer.institution}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <Target size={16} />
                        Axis
                      </p>
                      <p className="mt-1 text-gray-900">{selectedParticipant.roundtableDetails.axis}</p>
                    </div>
                  </div>

                  {/* Participants Section */}
                  {selectedParticipant.roundtableDetails.participants && selectedParticipant.roundtableDetails.participants.length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                        <Users size={16} />
                        Participants
                      </h5>
                      <div className="space-y-3">
                        {selectedParticipant.roundtableDetails.participants.map((participant: any, index: any) => (
                          <div key={index} className="bg-white p-3 rounded-lg">
                            <p className="font-medium">{participant.name}</p>
                            <p className="text-sm text-gray-500">{participant.email}</p>
                            <p className="text-sm text-gray-500">{participant.institution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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