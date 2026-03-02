import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Users, Clock, TrendingUp, Plus, Eye, Award, 
  X, ChevronRight, MapPin, DollarSign, FileText, Send,
  Filter, MoreHorizontal, Building2, Calendar, Target,
  CheckCircle2, AlertCircle, ArrowLeft, Share2, Edit3, Mail, Download,
  UserCircle, UserPlus, Building, UserCheck, Settings, BarChart3,
  Search, Trash2, Phone, Mail as MailIcon, Globe, Star, Shield,
  Activity, LogOut, Home, PieChart, UserCog, UserMinus, UserPlus as UserPlusIcon,
  CreditCard, Calendar as CalendarIcon, FileText as FileTextIcon, Hash, 
  MapPin as MapPinIcon, Globe2, Briefcase as BriefcaseIcon, Award as AwardIcon,
  Clock as ClockIcon, Download as DownloadIcon, Printer, RefreshCw
} from 'lucide-react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, PieChart as RePieChart, Pie, Cell, Legend
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState('vendor');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('card');
  const [dateRange, setDateRange] = useState('month');

  // --- SAMPLE DATA WITH REAL FIELDS ---
  const vendors = [
    { 
      id: 1, 
      name: 'TechRecruit Solutions', 
      company: 'TechRecruit Inc', 
      email: 'contact@techrecruit.com', 
      phone: '+1 (555) 123-4567',
      gst: '27AAPFU0939F1Z5',
      pan: 'AAPFU0939F',
      tan: 'MUM12345A',
      address: '123 Business Park, San Francisco, CA 94105',
      website: 'www.techrecruit.com',
      contactPerson: 'Robert Johnson',
      contactPhone: '+1 (555) 987-6543',
      status: 'Active', 
      tier: 'Platinum',
      subscriptionStart: '2024-01-15',
      subscriptionEnd: '2025-01-14',
      jobsPosted: 156, 
      placements: 89, 
      revenue: '$1.2M', 
      joinedDate: '2023-01-15',
      bankName: 'Chase Bank',
      accountNumber: '****1234',
      ifscCode: 'CHASUS33',
      paymentTerms: 'Net 30'
    },
    { 
      id: 2, 
      name: 'Global Talent Partners', 
      company: 'Global Talent', 
      email: 'info@globaltalent.com', 
      phone: '+1 (555) 234-5678',
      gst: '29AABCU9603R1ZM',
      pan: 'AABCU9603R',
      tan: 'DEL45678B',
      address: '456 Corporate Tower, New York, NY 10001',
      website: 'www.globaltalent.com',
      contactPerson: 'Sarah Williams',
      contactPhone: '+1 (555) 876-5432',
      status: 'Active', 
      tier: 'Gold',
      subscriptionStart: '2024-02-01',
      subscriptionEnd: '2025-01-31',
      jobsPosted: 98, 
      placements: 45, 
      revenue: '$680K', 
      joinedDate: '2023-03-20',
      bankName: 'Wells Fargo',
      accountNumber: '****5678',
      ifscCode: 'WFBIUS6S',
      paymentTerms: 'Net 45'
    },
    { 
      id: 3, 
      name: 'Elite Staffing Agency', 
      company: 'Elite Staffing', 
      email: 'hello@elitestaffing.com', 
      phone: '+1 (555) 345-6789',
      gst: '33AAACE1234R1ZM',
      pan: 'AAACE1234R',
      tan: 'CHE78901C',
      address: '789 Startup Hub, Austin, TX 78701',
      website: 'www.elitestaffing.com',
      contactPerson: 'Michael Chen',
      contactPhone: '+1 (555) 765-4321',
      status: 'Trial', 
      tier: 'Trial',
      subscriptionStart: '2024-03-01',
      subscriptionEnd: '2024-03-30',
      trialEnds: '2024-03-30',
      jobsPosted: 34, 
      placements: 12, 
      revenue: '$210K', 
      joinedDate: '2024-01-10',
      bankName: 'Bank of America',
      accountNumber: '****9012',
      ifscCode: 'BOFAUS3N',
      paymentTerms: 'Net 15'
    },
    { 
      id: 4, 
      name: 'Innovative Recruiters', 
      company: 'Innovative Rec', 
      email: 'team@innovativerec.com', 
      phone: '+1 (555) 456-7890',
      gst: '27AAPFU0939F1Z6',
      pan: 'AAPFU0939K',
      tan: 'MUM34567C',
      address: '321 Innovation Drive, Boston, MA 02110',
      website: 'www.innovativerec.com',
      contactPerson: 'Emily Davis',
      contactPhone: '+1 (555) 654-3210',
      status: 'Active', 
      tier: 'Gold',
      subscriptionStart: '2023-12-01',
      subscriptionEnd: '2024-11-30',
      jobsPosted: 67, 
      placements: 31, 
      revenue: '$450K', 
      joinedDate: '2023-06-05',
      bankName: 'Citibank',
      accountNumber: '****3456',
      ifscCode: 'CITIUS33',
      paymentTerms: 'Net 30'
    },
    { 
      id: 5, 
      name: 'Startup Staffing Co', 
      company: 'Startup Staffing', 
      email: 'hello@startupstaffing.com', 
      phone: '+1 (555) 567-8901',
      gst: '29ABCDE1234R1ZM',
      pan: 'ABCDE1234F',
      tan: 'BAN78901D',
      address: '555 Tech Street, Seattle, WA 98101',
      website: 'www.startupstaffing.com',
      contactPerson: 'David Miller',
      contactPhone: '+1 (555) 543-2109',
      status: 'Trial', 
      tier: 'Trial',
      subscriptionStart: '2024-03-15',
      subscriptionEnd: '2024-04-14',
      trialEnds: '2024-04-14',
      jobsPosted: 12, 
      placements: 3, 
      revenue: '$45K', 
      joinedDate: '2024-03-15',
      bankName: 'US Bank',
      accountNumber: '****7890',
      ifscCode: 'USBKUS44',
      paymentTerms: 'Net 15'
    },
  ];

  const clients = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      company: 'Microsoft Corporation', 
      email: 'sarah.j@microsoft.com', 
      phone: '+1 (555) 111-2222',
      gst: '27AAACM1234R1ZM',
      pan: 'AAACM1234R',
      tan: 'MS12345A',
      address: 'One Microsoft Way, Redmond, WA 98052',
      website: 'www.microsoft.com',
      designation: 'HR Director',
      department: 'Human Resources',
      industry: 'Technology', 
      status: 'Active',
      contractStart: '2022-11-01',
      contractEnd: '2024-10-31',
      contractValue: '$2.5M',
      paymentTerms: 'Net 45',
      jobsPosted: 45, 
      hires: 23,
      activeJobs: 12,
      pendingInvoices: 3,
      totalSpent: '$1.8M',
      joinedDate: '2022-11-01',
      billingAddress: 'One Microsoft Way, Redmond, WA 98052',
      shippingAddress: 'Same as billing',
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      company: 'Google LLC', 
      email: 'm.chen@google.com', 
      phone: '+1 (555) 222-3333',
      gst: '29AABCG1234R1ZM',
      pan: 'AABCG1234R',
      tan: 'GO45678B',
      address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
      website: 'www.google.com',
      designation: 'Talent Acquisition Lead',
      department: 'People Operations',
      industry: 'Technology', 
      status: 'Active',
      contractStart: '2023-02-14',
      contractEnd: '2024-02-13',
      contractValue: '$1.8M',
      paymentTerms: 'Net 30',
      jobsPosted: 38, 
      hires: 19,
      activeJobs: 8,
      pendingInvoices: 2,
      totalSpent: '$1.2M',
      joinedDate: '2023-02-14',
      billingAddress: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
      shippingAddress: 'Same as billing',
    },
    { 
      id: 3, 
      name: 'Emily Rodriguez', 
      company: 'Amazon Web Services', 
      email: 'e.rodriguez@amazon.com', 
      phone: '+1 (555) 333-4444',
      gst: '33AABCA1234R1ZM',
      pan: 'AABCA1234R',
      tan: 'AM78901C',
      address: '410 Terry Ave N, Seattle, WA 98109',
      website: 'www.aws.amazon.com',
      designation: 'Technical Recruiter',
      department: 'AWS Talent Acquisition',
      industry: 'Cloud Computing', 
      status: 'Active',
      contractStart: '2022-08-22',
      contractEnd: '2024-08-21',
      contractValue: '$3.2M',
      paymentTerms: 'Net 60',
      jobsPosted: 52, 
      hires: 31,
      activeJobs: 15,
      pendingInvoices: 5,
      totalSpent: '$2.5M',
      joinedDate: '2022-08-22',
      billingAddress: '410 Terry Ave N, Seattle, WA 98109',
      shippingAddress: 'Same as billing',
    },
    { 
      id: 4, 
      name: 'David Kim', 
      company: 'Apple Inc', 
      email: 'd.kim@apple.com', 
      phone: '+1 (555) 444-5555',
      gst: '27AABCA1234R1ZM',
      pan: 'AABCA1234K',
      tan: 'AP34567D',
      address: 'One Apple Park Way, Cupertino, CA 95014',
      website: 'www.apple.com',
      designation: 'Engineering Manager',
      department: 'Software Engineering',
      industry: 'Technology', 
      status: 'Trial',
      contractStart: '2024-01-05',
      contractEnd: '2024-02-04',
      contractValue: '$950K',
      paymentTerms: 'Net 30',
      jobsPosted: 12, 
      hires: 4,
      activeJobs: 5,
      pendingInvoices: 1,
      totalSpent: '$350K',
      joinedDate: '2024-01-05',
      billingAddress: 'One Apple Park Way, Cupertino, CA 95014',
      shippingAddress: 'Same as billing',
      trialEnds: '2024-02-04',
    },
    { 
      id: 5, 
      name: 'Lisa Thompson', 
      company: 'Meta Platforms', 
      email: 'l.thompson@meta.com', 
      phone: '+1 (555) 555-6666',
      gst: '29AABCM1234R1ZM',
      pan: 'AABCM1234T',
      tan: 'ME67890E',
      address: '1 Hacker Way, Menlo Park, CA 94025',
      website: 'www.meta.com',
      designation: 'Recruitment Partner',
      department: 'Global Talent',
      industry: 'Social Media', 
      status: 'Inactive',
      contractStart: '2023-09-18',
      contractEnd: '2023-12-17',
      contractValue: '$450K',
      paymentTerms: 'Net 30',
      jobsPosted: 8, 
      hires: 2,
      activeJobs: 0,
      pendingInvoices: 0,
      totalSpent: '$450K',
      joinedDate: '2023-09-18',
      billingAddress: '1 Hacker Way, Menlo Park, CA 94025',
      shippingAddress: 'Same as billing',
    },
  ];

  const candidates = [
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john.smith@email.com', 
      phone: '+1 (555) 777-8888',
      alternatePhone: '+1 (555) 777-8889',
      position: 'Senior Full Stack Developer',
      skills: ['React', 'Node.js', 'Python', 'AWS', 'TypeScript', 'GraphQL'],
      experience: '7 years',
      currentCompany: 'Tech Corp',
      previousCompanies: ['Startup Inc', 'Digital Solutions'],
      education: [
        { degree: 'B.Tech Computer Science', institution: 'Stanford University', year: 2017 }
      ],
      certifications: ['AWS Certified Developer', 'Meta Certified React Developer'],
      status: 'Available',
      matchScore: 95,
      location: 'San Francisco, CA',
      preferredLocations: ['San Francisco', 'Remote', 'Seattle'],
      expectedSalary: '$160k',
      currentSalary: '$140k',
      noticePeriod: '30 days',
      availability: 'Immediate',
      appliedDate: '2024-02-10',
      lastActive: '2024-03-20',
      totalApplications: 12,
      interviews: 4,
      offers: 1,
      resume: 'resume_john_smith.pdf',
      linkedIn: 'linkedin.com/in/johnsmith',
      portfolio: 'johnsmith.dev',
      visaStatus: 'US Citizen',
      languages: ['English', 'Spanish'],
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      email: 'priya.p@email.com', 
      phone: '+1 (555) 888-9999',
      alternatePhone: '+1 (555) 888-9998',
      position: 'Product Manager',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics', 'JIRA', 'Confluence'],
      experience: '6 years',
      currentCompany: 'ProductLabs',
      previousCompanies: ['TechStart', 'InnovateCo'],
      education: [
        { degree: 'MBA', institution: 'Harvard Business School', year: 2018 },
        { degree: 'B.E. Computer Science', institution: 'MIT', year: 2014 }
      ],
      certifications: ['Certified Scrum Product Owner', 'Pragmatic Marketing'],
      status: 'Interviewing',
      matchScore: 88,
      location: 'New York, NY',
      preferredLocations: ['New York', 'Boston', 'Remote'],
      expectedSalary: '$140k',
      currentSalary: '$125k',
      noticePeriod: '60 days',
      availability: '2 weeks',
      appliedDate: '2024-02-08',
      lastActive: '2024-03-19',
      totalApplications: 8,
      interviews: 3,
      offers: 0,
      resume: 'resume_priya_patel.pdf',
      linkedIn: 'linkedin.com/in/priyapatel',
      portfolio: 'priyapatel.com',
      visaStatus: 'H1B',
      languages: ['English', 'Hindi', 'Gujarati'],
    },
    { 
      id: 3, 
      name: 'James Wilson', 
      email: 'j.wilson@email.com', 
      phone: '+1 (555) 999-0000',
      alternatePhone: '+1 (555) 999-0001',
      position: 'UX Designer',
      skills: ['Figma', 'User Research', 'Prototyping', 'Wireframing', 'Adobe XD', 'Sketch'],
      experience: '4 years',
      currentCompany: 'DesignHub',
      previousCompanies: ['CreativeAgency', 'TechStart'],
      education: [
        { degree: 'B.Des Interaction Design', institution: 'Art Center College', year: 2020 }
      ],
      certifications: ['Google UX Design Certificate'],
      status: 'Available',
      matchScore: 92,
      location: 'Austin, TX',
      preferredLocations: ['Austin', 'Remote', 'San Francisco'],
      expectedSalary: '$120k',
      currentSalary: '$105k',
      noticePeriod: '15 days',
      availability: 'Immediate',
      appliedDate: '2024-02-12',
      lastActive: '2024-03-21',
      totalApplications: 6,
      interviews: 2,
      offers: 1,
      resume: 'resume_james_wilson.pdf',
      linkedIn: 'linkedin.com/in/jameswilson',
      portfolio: 'jameswilson.design',
      visaStatus: 'US Citizen',
      languages: ['English'],
    },
    { 
      id: 4, 
      name: 'Maria Garcia', 
      email: 'm.garcia@email.com', 
      phone: '+1 (555) 000-1111',
      alternatePhone: '+1 (555) 000-1112',
      position: 'Data Scientist',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'PyTorch', 'R'],
      experience: '5 years',
      currentCompany: 'DataCorp',
      previousCompanies: ['AnalyticsInc', 'TechGiant'],
      education: [
        { degree: 'MS Data Science', institution: 'UC Berkeley', year: 2019 },
        { degree: 'BS Mathematics', institution: 'UCLA', year: 2017 }
      ],
      certifications: ['TensorFlow Developer Certificate', 'AWS Machine Learning'],
      status: 'Placed',
      matchScore: 96,
      location: 'Seattle, WA',
      preferredLocations: ['Seattle', 'San Francisco', 'Remote'],
      expectedSalary: '$150k',
      currentSalary: '$135k',
      noticePeriod: '30 days',
      availability: 'Immediate',
      appliedDate: '2024-01-25',
      lastActive: '2024-03-15',
      totalApplications: 15,
      interviews: 6,
      offers: 2,
      resume: 'resume_maria_garcia.pdf',
      linkedIn: 'linkedin.com/in/mariagarcia',
      portfolio: 'mariagarcia.dev',
      visaStatus: 'Green Card',
      languages: ['English', 'Spanish'],
    },
  ];

  // Revenue data for charts
  const revenueData = [
    { month: 'Jan', revenue: 1.8, placements: 28 },
    { month: 'Feb', revenue: 2.1, placements: 32 },
    { month: 'Mar', revenue: 2.4, placements: 35 },
    { month: 'Apr', revenue: 2.2, placements: 30 },
    { month: 'May', revenue: 2.8, placements: 42 },
    { month: 'Jun', revenue: 3.2, placements: 48 },
  ];

  const distributionData = [
    { name: 'Vendors', value: vendors.length, color: '#8b5cf6' },
    { name: 'Clients', value: clients.length, color: '#3b82f6' },
    { name: 'Candidates', value: candidates.length, color: '#10b981' },
  ];

  // Stats for overview
  const stats = [
    { 
      label: 'Total Vendors', 
      value: vendors.length.toString(), 
      change: '+2 this month', 
      icon: Building2, 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50', 
      onClick: () => setActiveTab('vendors') 
    },
    { 
      label: 'Active Vendors', 
      value: vendors.filter(v => v.status === 'Active').length.toString(), 
      change: vendors.filter(v => v.status === 'Trial').length + ' on trial', 
      icon: Users, 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50', 
      onClick: () => setActiveTab('vendors') 
    },
    { 
      label: 'Total Clients', 
      value: clients.length.toString(), 
      change: '+1 this month', 
      icon: Briefcase, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50', 
      onClick: () => setActiveTab('clients') 
    },
    { 
      label: 'Active Clients', 
      value: clients.filter(c => c.status === 'Active').length.toString(), 
      change: clients.filter(c => c.status === 'Trial').length + ' on trial', 
      icon: Target, 
      color: 'text-amber-600', 
      bgColor: 'bg-amber-50',
      onClick: () => setActiveTab('clients') 
    },
    { 
      label: 'Total Candidates', 
      value: candidates.length.toString(), 
      change: '+156 this month', 
      icon: Users, 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50', 
      onClick: () => setActiveTab('candidates') 
    },
    { 
      label: 'Placements', 
      value: '187', 
      change: '+23 this month', 
      icon: CheckCircle2, 
      color: 'text-rose-600', 
      bgColor: 'bg-rose-50' 
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const getFilteredData = () => {
    if (!searchTerm) {
      if (activeTab === 'vendors') return vendors;
      if (activeTab === 'clients') return clients;
      if (activeTab === 'candidates') return candidates;
      return [];
    }

    const term = searchTerm.toLowerCase();
    if (activeTab === 'vendors') {
      return vendors.filter(v => 
        v.name.toLowerCase().includes(term) || 
        v.company.toLowerCase().includes(term) || 
        v.email.toLowerCase().includes(term) ||
        v.gst?.toLowerCase().includes(term) ||
        v.pan?.toLowerCase().includes(term) ||
        v.contactPerson?.toLowerCase().includes(term)
      );
    }
    if (activeTab === 'clients') {
      return clients.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.company.toLowerCase().includes(term) || 
        c.email.toLowerCase().includes(term) ||
        c.gst?.toLowerCase().includes(term) ||
        c.designation?.toLowerCase().includes(term)
      );
    }
    if (activeTab === 'candidates') {
      return candidates.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.position.toLowerCase().includes(term) || 
        c.skills.some(s => s.toLowerCase().includes(term)) ||
        c.currentCompany?.toLowerCase().includes(term) ||
        c.location.toLowerCase().includes(term)
      );
    }
    return [];
  };

  const handleAddNew = (type) => {
    setModalType(type);
    setIsAddModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    if (activeTab === 'vendors') setModalType('vendor');
    else if (activeTab === 'clients') setModalType('client');
    else setModalType('candidate');
    setIsAddModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // Handle delete logic here
      console.log('Delete item:', id);
      toast.success('Item deleted successfully');
    }
  };

  const handleExport = () => {
    toast.success('Data exported successfully');
  };

  const handleRefresh = () => {
    toast.info('Refreshing data...');
    // Refresh logic here
  };

  const handleExtendTrial = (item) => {
    toast.success(`Trial extended for ${item.name}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50 text-slate-900 font-sans">
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        trialCount={vendors.filter(v => v.status === 'Trial').length}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-purple-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <div>
            <h1 className="text-xl font-bold text-purple-950 flex items-center gap-2">
              Admin Dashboard <span className="text-gray-300 font-light">|</span>
              <span className="text-sm font-medium text-purple-600">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Date Range Selector */}
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-purple-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="p-2 hover:bg-purple-50 rounded-lg transition-colors text-purple-600"
              title="Refresh"
            >
              <RefreshCw size={20} />
            </button>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="p-2 hover:bg-purple-50 rounded-lg transition-colors text-purple-600"
              title="Export Data"
            >
              <DownloadIcon size={20} />
            </button>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-purple-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* View Toggle */}
            <div className="flex border border-purple-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 ${viewMode === 'card' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 ${viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            {/* Add New Button */}
            <button
              onClick={() => handleAddNew(activeTab === 'overview' ? 'vendor' : activeTab.slice(0, -1))}
              disabled={activeTab === 'overview'}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm ${
                activeTab === 'overview' 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              <Plus size={18} /> Add {activeTab === 'overview' ? '' : activeTab.slice(0, -1)}
            </button>

            {/* User Menu */}
            <div className="h-10 w-10 rounded-full bg-purple-950 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 max-w-[1600px] mx-auto w-full space-y-8">
          {activeTab === 'overview' ? (
            <OverviewTab 
              stats={stats} 
              revenueData={revenueData} 
              distributionData={distributionData}
              vendors={vendors}
              clients={clients}
              candidates={candidates}
              setActiveTab={setActiveTab}
            />
          ) : (
            <DataTab
              type={activeTab}
              data={getFilteredData()}
              viewMode={viewMode}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddNew={() => handleAddNew(activeTab.slice(0, -1))}
              onExtendTrial={handleExtendTrial}
            />
          )}
        </main>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <AddEditModal
            type={modalType}
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              setSelectedItem(null);
            }}
            item={selectedItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Sidebar Component with Logout
function AdminSidebar({ activeTab, setActiveTab, onLogout, trialCount }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'vendors', label: 'Vendors', icon: Building2 },
    { id: 'clients', label: 'Clients', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users },
  ];

  return (
    <aside className="w-64 bg-white border-r border-purple-100 flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-purple-100">
        <div className="flex items-center gap-2">
          <Shield className="text-purple-600" size={28} />
          <span className="font-bold text-lg text-purple-950">Admin Panel</span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
              {item.id === 'vendors' && trialCount > 0 && (
                <span className="ml-auto bg-amber-100 text-amber-600 text-xs px-2 py-0.5 rounded-full">
                  {trialCount}
                </span>
              )}
              {activeTab === item.id && (
                <ChevronRight className="ml-auto" size={16} />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-purple-100 space-y-4">
        {/* Trial Info */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <ClockIcon className="text-purple-600" size={20} />
            <span className="text-sm font-bold text-purple-950">Trial Vendors</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">On Trial</span>
              <span className="font-bold text-purple-950">{trialCount}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Expiring in 7 days</span>
              <span className="font-bold text-amber-600">2</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

// Overview Tab Component
function OverviewTab({ stats, revenueData, distributionData, vendors, clients, candidates, setActiveTab }) {
  const recentActivities = [
    { id: 1, type: 'vendor', action: 'New vendor registered', name: 'TechRecruit Solutions', time: '5 minutes ago' },
    { id: 2, type: 'client', action: 'New client added', name: 'Microsoft', time: '2 hours ago' },
    { id: 3, type: 'candidate', action: 'Candidate placed', name: 'Maria Garcia', time: '3 hours ago' },
    { id: 4, type: 'vendor', action: 'Vendor tier upgraded', name: 'Global Talent Partners', time: '1 day ago' },
    { id: 5, type: 'candidate', action: 'New candidate registered', name: 'James Wilson', time: '2 days ago' },
  ];

  const expiringTrials = vendors.filter(v => v.status === 'Trial').slice(0, 3);

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={stat.onClick}
            className={`bg-white border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all ${stat.onClick ? 'cursor-pointer hover:border-purple-300' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-purple-950 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 font-bold">
              <TrendingUp size={14} /> <span>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-purple-950">Revenue & Placements Trend</h3>
            <select className="text-sm border border-purple-200 rounded-lg px-3 py-1">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue (M)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="placements" name="Placements" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-purple-950 mb-6">Platform Distribution</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-purple-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-purple-950 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-purple-50 rounded-lg transition-all">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'vendor' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'client' ? 'bg-blue-100 text-blue-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  {activity.type === 'vendor' ? <Building2 size={16} /> :
                   activity.type === 'client' ? <Briefcase size={16} /> :
                   <Users size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-950">{activity.action}</p>
                  <p className="text-xs text-purple-600">{activity.name}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-purple-950 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => setActiveTab('vendors')} className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Building2 size={16} /> Manage Vendors
                </button>
                <button onClick={() => setActiveTab('clients')} className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Briefcase size={16} /> Manage Clients
                </button>
                <button onClick={() => setActiveTab('candidates')} className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Users size={16} /> Manage Candidates
                </button>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Activity size={120} />
            </div>
          </div>

          {/* Expiring Trials */}
          <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-purple-950 mb-4">Expiring Trials</h3>
            <div className="space-y-3">
              {expiringTrials.length > 0 ? (
                expiringTrials.map((vendor) => (
                  <div key={vendor.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-purple-950">{vendor.name}</p>
                      <p className="text-xs text-gray-500">Ends: {vendor.trialEnds}</p>
                    </div>
                    <span className="px-2 py-1 bg-amber-100 text-amber-600 rounded-full text-xs font-bold">
                      {Math.ceil((new Date(vendor.trialEnds) - new Date()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No trials expiring soon</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Data Tab Component (Vendors/Clients/Candidates)
function DataTab({ type, data, viewMode, onEdit, onDelete, onAddNew, onExtendTrial }) {
  const getIcon = () => {
    switch(type) {
      case 'vendors': return Building2;
      case 'clients': return Briefcase;
      case 'candidates': return Users;
      default: return Building2;
    }
  };

  const Icon = getIcon();

  return (
    <>
      {/* Header with counts */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-purple-950 flex items-center gap-2">
            <Icon size={24} />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
          <p className="text-purple-700 text-sm mt-1">
            Total {data.length} {type}
          </p>
        </div>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm transition-all shadow-sm"
        >
          <Plus size={18} /> Add New {type.slice(0, -1)}
        </button>
      </div>

      {viewMode === 'card' ? (
        // Card View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              {type === 'vendors' && <VendorCard vendor={item} onEdit={onEdit} onDelete={onDelete} onExtendTrial={onExtendTrial} />}
              {type === 'clients' && <ClientCard client={item} onEdit={onEdit} onDelete={onDelete} onExtendTrial={onExtendTrial} />}
              {type === 'candidates' && <CandidateCard candidate={item} onEdit={onEdit} onDelete={onDelete} />}
            </motion.div>
          ))}
        </div>
      ) : (
        // Table View
        <div className="bg-white border border-purple-100 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-50 border-b border-purple-100">
                <tr>
                  {type === 'vendors' && (
                    <>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Vendor</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">GST/PAN</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Status/Tier</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Performance</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-purple-600 uppercase tracking-wider">Actions</th>
                    </>
                  )}
                  {type === 'clients' && (
                    <>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Industry</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Jobs/Hires</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-purple-600 uppercase tracking-wider">Actions</th>
                    </>
                  )}
                  {type === 'candidates' && (
                    <>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Candidate</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Position</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Skills</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Experience</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">Match Score</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-purple-600 uppercase tracking-wider">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50 transition-colors">
                    {type === 'vendors' && (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                              <Building2 size={16} />
                            </div>
                            <span className="font-medium text-purple-950">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-purple-700">{item.company}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-purple-950">{item.email}</div>
                            <div className="text-purple-600 text-xs">{item.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs">
                            <div>GST: {item.gst}</div>
                            <div className="text-purple-600">PAN: {item.pan}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold block text-center ${
                              item.status === 'Active' ? 'bg-emerald-100 text-emerald-600' :
                              item.status === 'Trial' ? 'bg-amber-100 text-amber-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {item.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold block text-center ${
                              item.tier === 'Platinum' ? 'bg-purple-100 text-purple-600' :
                              item.tier === 'Gold' ? 'bg-amber-100 text-amber-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {item.tier}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-purple-950">{item.placements} placements</div>
                            <div className="text-purple-600 text-xs">{item.revenue}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
                        </td>
                      </>
                    )}
                    {type === 'clients' && (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                              <Briefcase size={16} />
                            </div>
                            <span className="font-medium text-purple-950">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-purple-700">{item.company}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-purple-950">{item.email}</div>
                            <div className="text-purple-600 text-xs">{item.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-purple-700">{item.industry}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            item.status === 'Active' ? 'bg-emerald-100 text-emerald-600' :
                            item.status === 'Trial' ? 'bg-amber-100 text-amber-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-purple-950">{item.jobsPosted} jobs</div>
                            <div className="text-purple-600 text-xs">{item.hires} hires</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
                        </td>
                      </>
                    )}
                    {type === 'candidates' && (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                              <Users size={16} />
                            </div>
                            <span className="font-medium text-purple-950">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-purple-700">{item.position}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {item.skills.slice(0, 2).map((skill, i) => (
                              <span key={i} className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                            {item.skills.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                +{item.skills.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-purple-700">{item.experience}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            item.status === 'Available' ? 'bg-emerald-100 text-emerald-600' :
                            item.status === 'Interviewing' ? 'bg-amber-100 text-amber-600' :
                            item.status === 'Placed' ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-purple-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  item.matchScore >= 90 ? 'bg-emerald-500' :
                                  item.matchScore >= 70 ? 'bg-amber-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${item.matchScore}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-purple-950">{item.matchScore}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

// Vendor Card Component
function VendorCard({ vendor, onEdit, onDelete, onExtendTrial }) {
  const isTrial = vendor.tier === 'Trial' || vendor.status === 'Trial';
  const trialDaysLeft = isTrial && vendor.trialEnds ? Math.ceil((new Date(vendor.trialEnds) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
            <Building2 size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-purple-950 truncate">{vendor.name}</h3>
            <p className="text-xs text-purple-600 truncate">{vendor.company}</p>
            {isTrial && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full text-[10px] font-bold">
                Trial: {trialDaysLeft} days left
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button onClick={() => onEdit(vendor)} className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors text-purple-600">
            <Edit3 size={16} />
          </button>
          <button onClick={() => onDelete(vendor.id)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors text-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <MailIcon size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">{vendor.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Phone size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">{vendor.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Hash size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">GST: {vendor.gst}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <FileTextIcon size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">PAN: {vendor.pan}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <UserCircle size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">{vendor.contactPerson}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-purple-100">
        <div className="flex justify-between items-center mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            vendor.status === 'Active' ? 'bg-emerald-100 text-emerald-600' :
            vendor.status === 'Trial' ? 'bg-amber-100 text-amber-600' :
            'bg-red-100 text-red-600'
          }`}>
            {vendor.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            vendor.tier === 'Platinum' ? 'bg-purple-100 text-purple-600' :
            vendor.tier === 'Gold' ? 'bg-amber-100 text-amber-600' :
            'bg-gray-100 text-gray-600'
          }`}>
            {vendor.tier}
          </span>
        </div>

        {isTrial && (
          <button
            onClick={() => onExtendTrial(vendor)}
            className="w-full mt-2 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg text-xs font-bold transition-colors"
          >
            Extend Trial (30 days)
          </button>
        )}

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-purple-50 rounded-lg p-2 text-center">
            <p className="text-xs text-purple-600">Jobs</p>
            <p className="font-bold text-purple-950">{vendor.jobsPosted}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-2 text-center">
            <p className="text-xs text-purple-600">Placements</p>
            <p className="font-bold text-purple-950">{vendor.placements}</p>
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Subscription:</span>
            <span>{vendor.subscriptionStart} to {vendor.subscriptionEnd}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Payment Terms:</span>
            <span className="font-medium text-purple-700">{vendor.paymentTerms}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Client Card Component
function ClientCard({ client, onEdit, onDelete, onExtendTrial }) {
  const isTrial = client.status === 'Trial';
  const trialDaysLeft = isTrial && client.trialEnds ? Math.ceil((new Date(client.trialEnds) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <Briefcase size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-purple-950 truncate">{client.name}</h3>
            <p className="text-xs text-purple-600 truncate">{client.company}</p>
            {isTrial && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full text-[10px] font-bold">
                Trial: {trialDaysLeft} days left
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button onClick={() => onEdit(client)} className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors text-purple-600">
            <Edit3 size={16} />
          </button>
          <button onClick={() => onDelete(client.id)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors text-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <MailIcon size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">{client.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Phone size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">{client.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Hash size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">GST: {client.gst}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Building size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">{client.industry}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <UserCircle size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">{client.designation}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-purple-100">
        <div className="flex justify-between items-center mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            client.status === 'Active' ? 'bg-emerald-100 text-emerald-600' :
            client.status === 'Trial' ? 'bg-amber-100 text-amber-600' :
            'bg-red-100 text-red-600'
          }`}>
            {client.status}
          </span>
          <span className="text-sm font-bold text-purple-950">{client.contractValue}</span>
        </div>

        {isTrial && (
          <button
            onClick={() => onExtendTrial(client)}
            className="w-full mt-2 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg text-xs font-bold transition-colors"
          >
            Extend Trial (30 days)
          </button>
        )}
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <p className="text-xs text-blue-600">Jobs Posted</p>
            <p className="font-bold text-purple-950">{client.jobsPosted}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <p className="text-xs text-blue-600">Hires</p>
            <p className="font-bold text-purple-950">{client.hires}</p>
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Contract:</span>
            <span>{client.contractStart} to {client.contractEnd}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Payment Terms:</span>
            <span className="font-medium text-purple-700">{client.paymentTerms}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Candidate Card Component
function CandidateCard({ candidate, onEdit, onDelete }) {
  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-purple-950 truncate">{candidate.name}</h3>
            <p className="text-xs text-purple-600 truncate">{candidate.position}</p>
            <p className="text-xs text-purple-500 truncate">{candidate.currentCompany}</p>
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button onClick={() => onEdit(candidate)} className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors text-purple-600">
            <Edit3 size={16} />
          </button>
          <button onClick={() => onDelete(candidate.id)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors text-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <MailIcon size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">{candidate.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Phone size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">{candidate.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <MapPin size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700 truncate">{candidate.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <BriefcaseIcon size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700">Exp: {candidate.experience}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <DollarSign size={14} className="text-gray-400 shrink-0" />
          <span className="text-purple-700">{candidate.expectedSalary}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {candidate.skills.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
              {skill}
            </span>
          ))}
          {candidate.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{candidate.skills.length - 3}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-1 mb-3">
          <div className="text-center">
            <p className="text-[10px] text-gray-500">Applications</p>
            <p className="text-xs font-bold text-purple-950">{candidate.totalApplications}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-500">Interviews</p>
            <p className="text-xs font-bold text-purple-950">{candidate.interviews}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-500">Offers</p>
            <p className="text-xs font-bold text-purple-950">{candidate.offers}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-purple-100">
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            candidate.status === 'Available' ? 'bg-emerald-100 text-emerald-600' :
            candidate.status === 'Interviewing' ? 'bg-amber-100 text-amber-600' :
            candidate.status === 'Placed' ? 'bg-blue-100 text-blue-600' :
            'bg-red-100 text-red-600'
          }`}>
            {candidate.status}
          </span>
          <div className="flex items-center gap-1">
            <Star className="text-amber-400" size={14} />
            <span className="text-sm font-bold text-purple-950">{candidate.matchScore}%</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Action Buttons Component
function ActionButtons({ item, onEdit, onDelete }) {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => onEdit(item)}
        className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors text-purple-600"
        title="Edit"
      >
        <Edit3 size={16} />
      </button>
      <button
        onClick={() => onDelete(item.id)}
        className="p-1.5 hover:bg-red-100 rounded-lg transition-colors text-red-600"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

// Add/Edit Modal Component
function AddEditModal({ type, isOpen, onClose, item }) {
  const [formData, setFormData] = useState(item || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
    console.log('Submit:', formData);
    toast.success(`${type} ${item ? 'updated' : 'created'} successfully`);
    onClose();
  };

  const getTitle = () => {
    if (item) return `Edit ${type}`;
    return `Add New ${type}`;
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-purple-100 flex justify-between items-center bg-white sticky top-0">
          <div>
            <h2 className="text-xl font-bold text-purple-950">{getTitle()}</h2>
            <p className="text-purple-600 text-xs font-medium">Fill in the details below</p>
          </div>
          <button onClick={onClose} className="text-purple-600 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {type === 'vendor' && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Vendor Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. TechRecruit Solutions"
                    defaultValue={item?.name}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Company Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. TechRecruit Inc"
                    defaultValue={item?.company}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Email *</label>
                  <input
                    type="email"
                    placeholder="contact@company.com"
                    defaultValue={item?.email}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Phone *</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    defaultValue={item?.phone}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">GST Number</label>
                  <input
                    type="text"
                    placeholder="27AAPFU0939F1Z5"
                    defaultValue={item?.gst}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">PAN Number</label>
                  <input
                    type="text"
                    placeholder="AAPFU0939F"
                    defaultValue={item?.pan}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-purple-700">Address</label>
                <textarea
                  placeholder="Full address"
                  defaultValue={item?.address}
                  rows="2"
                  className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Contact Person</label>
                  <input
                    type="text"
                    placeholder="Robert Johnson"
                    defaultValue={item?.contactPerson}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 987-6543"
                    defaultValue={item?.contactPhone}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
              
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Website</label>
                  <input
                    type="url"
                    placeholder="www.company.com"
                    defaultValue={item?.website}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
               
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Payment Terms</label>
                  <select
                    defaultValue={item?.paymentTerms || 'Net 30'}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  >
                    <option>Net 15</option>
                    <option>Net 30</option>
                    <option>Net 45</option>
                    <option>Net 60</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Tier</label>
                  <select
                    defaultValue={item?.tier || 'Silver'}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  >
                    <option>Trial</option>
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Status</label>
                  <select
                    defaultValue={item?.status || 'Active'}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  >
                    <option>Active</option>
                    <option>Trial</option>
                    <option>Pending</option>
                    <option>Suspended</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Subscription Start</label>
                  <input
                    type="date"
                    defaultValue={item?.subscriptionStart}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Subscription End</label>
                  <input
                    type="date"
                    defaultValue={item?.subscriptionEnd}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  />
                </div>
              </div>

              {item?.status === 'Trial' && (
                <div className="grid md:grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-purple-700">Trial Ends</label>
                    <input
                      type="date"
                      defaultValue={item?.trialEnds}
                      className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {type === 'client' && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Client Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Johnson"
                    defaultValue={item?.name}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Company Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Microsoft"
                    defaultValue={item?.company}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Email *</label>
                  <input
                    type="email"
                    placeholder="sarah.j@company.com"
                    defaultValue={item?.email}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Phone *</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 111-2222"
                    defaultValue={item?.phone}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">GST Number</label>
                  <input
                    type="text"
                    placeholder="27AAACM1234R1ZM"
                    defaultValue={item?.gst}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">PAN Number</label>
                  <input
                    type="text"
                    placeholder="AAACM1234R"
                    defaultValue={item?.pan}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
               
                
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Designation</label>
                  <input
                    type="text"
                    placeholder="HR Director"
                    defaultValue={item?.designation}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Department</label>
                  <input
                    type="text"
                    placeholder="Human Resources"
                    defaultValue={item?.department}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Industry</label>
                  <input
                    type="text"
                    placeholder="Technology"
                    defaultValue={item?.industry}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Contract Value</label>
                  <input
                    type="text"
                    placeholder="$2.5M"
                    defaultValue={item?.contractValue}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-purple-700">Billing Address</label>
                <textarea
                  placeholder="Billing address"
                  defaultValue={item?.billingAddress}
                  rows="2"
                  className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Status</label>
                  <select
                    defaultValue={item?.status || 'Active'}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  >
                    <option>Active</option>
                    <option>Trial</option>
                    <option>Pending</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Contract Start</label>
                  <input
                    type="date"
                    defaultValue={item?.contractStart}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Contract End</label>
                  <input
                    type="date"
                    defaultValue={item?.contractEnd}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Website</label>
                  <input
                    type="url"
                    placeholder="www.company.com"
                    defaultValue={item?.website}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Payment Terms</label>
                  <select
                    defaultValue={item?.paymentTerms || 'Net 30'}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  >
                    <option>Net 15</option>
                    <option>Net 30</option>
                    <option>Net 45</option>
                    <option>Net 60</option>
                  </select>
                </div>
                {item?.status === 'Trial' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-purple-700">Trial Ends</label>
                    <input
                      type="date"
                      defaultValue={item?.trialEnds}
                      className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {type === 'candidate' && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Candidate Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. John Smith"
                    defaultValue={item?.name}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Position *</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Full Stack Developer"
                    defaultValue={item?.position}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Email *</label>
                  <input
                    type="email"
                    placeholder="john.smith@email.com"
                    defaultValue={item?.email}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Phone *</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 777-8888"
                    defaultValue={item?.phone}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Alternate Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 777-8889"
                    defaultValue={item?.alternatePhone}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Current Company</label>
                  <input
                    type="text"
                    placeholder="Tech Corp"
                    defaultValue={item?.currentCompany}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-purple-700">Skills (comma separated) *</label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, Python"
                  defaultValue={item?.skills?.join(', ')}
                  className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Experience *</label>
                  <input
                    type="text"
                    placeholder="e.g. 7 years"
                    defaultValue={item?.experience}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Location *</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA"
                    defaultValue={item?.location}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Expected Salary</label>
                  <input
                    type="text"
                    placeholder="e.g. $160k"
                    defaultValue={item?.expectedSalary}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Current Salary</label>
                  <input
                    type="text"
                    placeholder="e.g. $140k"
                    defaultValue={item?.currentSalary}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Notice Period</label>
                  <input
                    type="text"
                    placeholder="e.g. 30 days"
                    defaultValue={item?.noticePeriod}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Availability</label>
                  <input
                    type="text"
                    placeholder="e.g. Immediate"
                    defaultValue={item?.availability}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Visa Status</label>
                  <input
                    type="text"
                    placeholder="e.g. US Citizen"
                    defaultValue={item?.visaStatus}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Languages</label>
                  <input
                    type="text"
                    placeholder="e.g. English, Spanish"
                    defaultValue={item?.languages?.join(', ')}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">LinkedIn Profile</label>
                  <input
                    type="url"
                    placeholder="linkedin.com/in/johnsmith"
                    defaultValue={item?.linkedIn}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Portfolio</label>
                  <input
                    type="url"
                    placeholder="johnsmith.dev"
                    defaultValue={item?.portfolio}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Status</label>
                  <select
                    defaultValue={item?.status || 'Available'}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  >
                    <option>Available</option>
                    <option>Interviewing</option>
                    <option>Placed</option>
                    <option>Not Available</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Match Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="95"
                    defaultValue={item?.matchScore}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-700">Applied Date</label>
                  <input
                    type="date"
                    defaultValue={item?.appliedDate}
                    className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5 text-sm focus:border-purple-600"
                  />
                </div>
              </div>
            </>
          )}
        </form>

        <div className="px-8 py-6 border-t border-purple-100 bg-purple-50/50 flex justify-end gap-3 shrink-0 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-purple-600 text-white rounded-lg font-bold text-sm hover:bg-purple-700 shadow-md transition-all"
          >
            {item ? 'Update' : 'Create'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}