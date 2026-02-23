# Enterprise Management System

A comprehensive integrated platform for HR, Customer Relationship Management, and Document Management built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## 🚀 Features

This system includes three major modules:

### 1. HRMS (Human Resource Management System)
- **Dashboard & Overview**: HR metrics, employee directory, org chart
- **Employee Management**: Complete employee lifecycle management
- **Self-Service Portal**: Employee self-service features
- **Recruitment & ATS**: Job postings and applicant tracking
- **Attendance & Time**: Attendance tracking, shifts, and leave management
- **Payroll & Compensation**: Salary management and payroll processing
- **Performance Management**: OKRs, reviews, and recognition

### 2. CRM (Customer Relationship Management)
- **Sales Dashboard**: Pipeline value, forecasts, and analytics
- **Lead Management**: Lead tracking and scoring
- **Pipeline & Deals**: Deal tracking through sales stages
- **Customer Management**: 360° customer profiles
- **Quotation & Invoicing**: Quote and invoice generation
- **Commission Management**: Sales commission tracking
- **Field Sales**: Visit planning and GPS tracking
- **Marketing Automation**: Campaigns and lead nurturing

### 3. DMS (Document Management System)
- **Document Repository**: Centralized document storage
- **Version Control**: Document version tracking
- **Document Workflows**: Approval and review processes
- **E-Signature**: Digital signature management
- **AI Document Intelligence**: OCR, classification, smart search
- **Document Templates**: Reusable document templates
- **Audit & Compliance**: Audit trail and compliance reporting

## 📁 Project Structure

```
app/
├── components/
│   └── Navigation.tsx          # Global navigation component
├── hrms/                       # HR Management System
│   ├── dashboard/              # HR dashboards and overview
│   ├── employees/              # Employee management
│   ├── self-service/           # Employee self-service portal
│   ├── recruitment/            # Recruitment and ATS
│   ├── attendance/             # Attendance and time tracking
│   ├── payroll/                # Payroll and compensation
│   └── performance/            # Performance management
├── crm/                        # Customer Relationship Management
│   ├── dashboard/              # Sales dashboards
│   ├── leads/                  # Lead management
│   ├── pipeline/               # Deal pipeline
│   ├── customers/              # Customer management
│   ├── quotations/             # Quotations and invoicing
│   ├── commissions/            # Commission management
│   ├── field-sales/            # Field sales tracking
│   └── marketing/              # Marketing automation
├── dms/                        # Document Management System
│   ├── repository/             # Document repository
│   ├── my-documents/           # Personal documents
│   ├── workflows/              # Document workflows
│   ├── e-signature/            # E-signature features
│   ├── ai-features/            # AI document intelligence
│   ├── templates/              # Document templates
│   └── audit/                  # Audit and compliance
├── layout.tsx                  # Root layout with navigation
└── page.tsx                    # Home page
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Fonts**: Geist Sans & Geist Mono

## 🚦 Getting Started

### Prerequisites
- Node.js 20+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Available Routes

### Home
- `/` - Landing page with module overview

### HRMS Routes
- `/hrms` - HRMS home
- `/hrms/dashboard` - HR executive dashboard
- `/hrms/employees` - Employee management
- `/hrms/self-service` - Employee self-service portal
- `/hrms/recruitment` - Recruitment and ATS
- `/hrms/attendance` - Attendance tracking
- `/hrms/payroll` - Payroll management
- `/hrms/performance` - Performance management

### CRM Routes
- `/crm` - CRM home
- `/crm/dashboard` - Sales dashboard
- `/crm/leads` - Lead management
- `/crm/pipeline` - Pipeline and deals
- `/crm/customers` - Customer management
- `/crm/quotations` - Quotations and invoicing
- `/crm/commissions` - Commission management
- `/crm/field-sales` - Field sales tracking
- `/crm/marketing` - Marketing automation

### DMS Routes
- `/dms` - DMS home
- `/dms/repository` - Document repository
- `/dms/my-documents` - Personal documents
- `/dms/workflows` - Document workflows
- `/dms/e-signature` - E-signature management
- `/dms/ai-features` - AI document features
- `/dms/templates` - Document templates
- `/dms/audit` - Audit and compliance

## 🎯 Current Status

This is a **basic scaffolding** implementation with:
- ✅ Complete folder structure and routing
- ✅ Navigation component with active state
- ✅ Placeholder pages for all major screens
- ✅ Responsive layout with Tailwind CSS
- ⏳ No database integration yet
- ⏳ No authentication system yet
- ⏳ No API endpoints yet

## 🔧 Next Steps

To turn this into a fully functional system, you would need to:

1. **Database Setup**: Configure a database (PostgreSQL, MongoDB, etc.)
2. **Authentication**: Implement user authentication and authorization
3. **API Routes**: Create API endpoints for each module
4. **Data Models**: Define database schemas/models
5. **Form Handling**: Implement form validation and submission
6. **State Management**: Add state management (React Context, Zustand, Redux)
7. **Real UI Components**: Build out actual UI components with data
8. **File Upload**: Implement file upload functionality for DMS
9. **Email Integration**: Add email functionality for notifications
10. **Testing**: Add unit and integration tests

## 📝 License

This project is part of a private enterprise system.

## 🤝 Contributing

This is a private project. For questions or contributions, please contact the development team.

