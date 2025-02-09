import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { QRBadge } from './QRBadge';

interface QRBadgeModalProps {
  participant: {
    id: string;
    name: string;
    category: string;
    organization: string;
  };
  onClose: () => void;
}

export const QRBadgeModal = ({ participant, onClose }: QRBadgeModalProps) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Failed to open print window');
      return;
    }

    // Get all stylesheet links from the current document
    const styleSheets = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          if (styleSheet.href) {
            return `<link rel="stylesheet" type="text/css" href="${styleSheet.href}">`;
          }
          return '';
        } catch (e) {
          return '';
        }
      })
      .join('');

    // Get the QR code data URL if it exists
    const qrCanvas = document.querySelector('#qr-badge canvas') as HTMLCanvasElement;
    const qrDataUrl = qrCanvas ? qrCanvas.toDataURL('image/png') : '';

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Badge - ${participant.name}</title>
          ${styleSheets}
          <style>
            body {
              margin: 0;
              padding: 20px;
              display: flex;
              justify-content: center;
              background-color: white;
            }
            .badge-container {
              width: 350px;
              page-break-inside: avoid;
            }
            @page {
              size: A4;
              margin: 0;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="badge-container">
            ${document.getElementById('qr-badge')?.outerHTML.replace(
              /<canvas[^>]*>/g,
              `<img src="${qrDataUrl}" style="width: 100%; height: auto;" />`
            ) || ''}
          </div>
          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
                window.onafterprint = () => window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">QR Code Badge</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div id="qr-badge">
          <QRBadge participant={participant} />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download size={20} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 