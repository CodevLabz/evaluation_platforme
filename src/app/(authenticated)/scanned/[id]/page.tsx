'use client'
import React, { useEffect, useState } from "react";
import { QrCode, Check, X } from "lucide-react";
import { QRCodeCanvas } from 'qrcode.react';

export default function Scanned() {
  const [scannedData, setScannedData] = useState<null | {
    id: string;
    name: string;
    email: string;
    status: string;
  }>(null);
  const [selectedSalle, setSelectedSalle] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  
  useEffect(() => {
    setScannedData({
        id: "123",
        name: "John Doe",
        email: "john@example.com",
        status: "registered"
      });
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [])
  
 
  
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">QR Code Scanner</h2>
          <p className="text-gray-600">
            Scan participant QR codes to validate presence
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              {currentUrl && (
                <div className="p-4">
                  <QRCodeCanvas 
                    value={currentUrl}
                    size={200}
                    level="H"
                  />
                </div>
              )}
            </div>
            <p className="text-center text-sm text-gray-500">
              Scan this QR code to access this page
            </p>
          </div>
        </div>
        {scannedData && <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">
              Participant Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{scannedData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{scannedData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {scannedData.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Salle
                </label>
                <select value={selectedSalle} onChange={e => setSelectedSalle(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="">Choose a salle...</option>
                  <option value="salle1">Salle 1</option>
                  <option value="salle2">Salle 2</option>
                  <option value="salle3">Salle 3</option>
                  <option value="salle4">Salle 4</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2">
                  <Check size={20} />
                  <span>Validate Presence</span>
                </button>
                <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2">
                  <X size={20} />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};