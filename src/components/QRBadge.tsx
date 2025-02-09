import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { format } from 'date-fns';

interface QRBadgeProps {
  participant: {
    id: string;
    name: string;
    category: string;
    organization: string;
  };
  eventName?: string;
}

export const QRBadge = ({ participant, eventName = "Forum Tunisien Education" }: QRBadgeProps) => {
  return (
    <div className="w-[350px]  border border-gray-200 rounded-xl p-6 bg-white shadow-xl relative overflow-hidden mb-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-500" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-blue-500" />
      </div>

      {/* Header */}
      <div className="text-center mb-6 relative">
        <img 
          src="https://forumtunisieneducation.org/wp-content/uploads/2023/03/ftte.png" 
          alt="Event Logo" 
          className="h-20 mx-auto mb-3 hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{eventName}</h2>
      </div>

      {/* Participant Info */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">{participant.name}</h3>
        <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-2 inline-block">
          {participant.category}
        </span>
        <p className="text-gray-600 mt-2">{participant.organization}</p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center ">
        <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <QRCodeCanvas 
            value={'zeby'}
            size={150}
            level="H"
            includeMargin={true}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center space-y-1">
        <p className="text-sm text-gray-500 font-medium">ID: {participant.id}</p>
        <p className="text-sm text-gray-500">
          Generated on {format(new Date(), 'MMMM dd, yyyy')}
        </p>
      </div>
    </div>
  );
}; 