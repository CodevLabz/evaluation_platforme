'use client'
import React, { useState } from "react";
import { QrCode, Calendar, Clock, Award } from "lucide-react";
type ScanRecord = {
  id: string;
  participantName: string;
  salle: string;
  scannedBy: string;
  timestamp: string;
};
export default function QRCodes()  {
  const [scanRecords] = useState<ScanRecord[]>([
    {
      id: "1",
      participantName: "John Doe",
      salle: "Salle 1",
      scannedBy: "Staff Member",
      timestamp: "2024-01-26 14:30",
    },
    // Add more mock data
  ]);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
    null,
  );
  const handleGenerateCertificate = (participantName: string) => {
    setSelectedParticipant(participantName);
    setShowCertificateModal(true);
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">QR Code Scan History</h2>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scanned By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scanRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <QrCode size={20} className="text-blue-600 mr-2" />
                      {record.participantName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.salle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.scannedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {record.timestamp}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        handleGenerateCertificate(record.participantName)
                      }
                      className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                    >
                      <Award size={16} />
                      <span>Generate Certificate</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showCertificateModal && selectedParticipant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Generate Certificate</h3>
            <p>Generate certificate for {selectedParticipant}?</p>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle certificate generation
                  setShowCertificateModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
