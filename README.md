# Event Management Platform

A comprehensive event management platform built with Next.js, TypeScript, and Tailwind CSS. This platform helps organizations manage events, participants, certificates, and QR code-based attendance tracking.

## Features

- **User Management**
  - Role-based access control (Admin, Organizer, Staff)
  - User profile management
  - Secure authentication system

- **Participant Management**
  - Registration tracking
  - Payment status monitoring
  - Document generation (QR codes, certificates)
  - Attendance tracking

- **QR Code System**
  - Generate unique QR codes for participants
  - Scan and track attendance
  - Real-time attendance monitoring

- **Certificate Management**
  - Automated certificate generation
  - Bulk certificate processing
  - Digital certificate distribution

- **Analytics & Statistics**
  - Real-time dashboard
  - Participant statistics
  - Payment analytics
  - Attendance reports

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: React Bootstrap
- **Authentication**: Custom auth context
## Getting Started

1. Clone the repository:
 ```bash
git clone [repository-url]
```
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
```

├── app/
│ ├── (authenticated)/ # Protected routes
│ │ ├── dashboard/
│ │ ├── participants/
│ │ ├── certificates/
│ │ └── statistics/
│ ├── login/
│ └── layout.tsx
├── components/
│ └── Layout.tsx # Main application layout
├── context/
│ └── authContext.tsx # Authentication context
└── styles/
└── globals.css
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
