"use client";

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard-layout';
import { 
  FolderOpen, 
  Wallet, 
  FileText, 
  TrendingUp,
  Building2,
  Search,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  MessageSquare,
  Upload
} from 'lucide-react';

interface KPIStat {
  label: string;
  value: string;
  subtitle: string;
  icon: any;
  trend: {
    value: string;
    isPositive: boolean;
  };
}

interface PipelineStage {
  label: string;
  count: number;
  percentage: number;
  conversion?: string;
  color: string;
}

interface SNAAccount {
  name: string;
  accountNumber: string;
  balance: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
  updatedAt: string;
}

interface Project {
  id: string;
  name: string;
  district: string;
  iaType: string;
  status: string;
  allocated: string;
  released: string;
  releasePercentage: string;
  ucStatus: string;
}

export default function StateDashboard() {
  const params = useParams();
  const stateId = params.stateId as string;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedIAType, setSelectedIAType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('November, 2024');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  // KPI Stats
  const kpiStats: KPIStat[] = [
    {
      label: 'Total Projects',
      value: '234',
      subtitle: '42 active this month',
      icon: FolderOpen,
      trend: { value: '12%', isPositive: true }
    },
    {
      label: 'Funds Received',
      value: '₹1,250.5 Cr',
      subtitle: 'Current FY',
      icon: Wallet,
      trend: { value: '8%', isPositive: true }
    },
    {
      label: 'Unspent Balance',
      value: '₹342.8 Cr',
      subtitle: '27.4% of received',
      icon: Wallet,
      trend: { value: '3%', isPositive: false }
    },
    {
      label: 'Pending UCs',
      value: '18',
      subtitle: '6 overdue',
      icon: FileText,
      trend: { value: '', isPositive: true }
    }
  ];

  // Pipeline Stages
  const pipelineStages: PipelineStage[] = [
    { label: 'Submitted', count: 156, percentage: 100, conversion: '63% conversion', color: 'bg-orange-600' },
    { label: 'In Review', count: 98, percentage: 63, conversion: '73% conversion', color: 'bg-orange-500' },
    { label: 'Approved', count: 72, percentage: 46, conversion: '81% conversion', color: 'bg-orange-400' },
    { label: 'Funds Released', count: 58, percentage: 37, conversion: '', color: 'bg-orange-300' }
  ];

  // SNA Accounts
  const snaAccounts: SNAAccount[] = [
    {
      name: 'State Treasury - Main',
      accountNumber: '****8901',
      balance: '₹1500.0Cr',
      trend: { value: '5.2%', isPositive: true },
      updatedAt: '2 hours ago'
    },
    {
      name: 'District Fund - North',
      accountNumber: '****7234',
      balance: '₹420.0Cr',
      trend: { value: '2.8%', isPositive: false },
      updatedAt: '5 hours ago'
    },
    {
      name: 'District Fund - South',
      accountNumber: '****5678',
      balance: '₹380.0Cr',
      trend: { value: '1.5%', isPositive: true },
      updatedAt: '1 day ago'
    },
    {
      name: 'District Fund - East',
      accountNumber: '****9012',
      balance: '₹290.0Cr',
      trend: { value: '0.8%', isPositive: true },
      updatedAt: '1 day ago'
    },
    {
      name: 'District Fund - West',
      accountNumber: '****3456',
      balance: '₹310.0Cr',
      trend: { value: '3.2%', isPositive: false },
      updatedAt: '6 hours ago'
    }
  ];

  // Projects
  const projects: Project[] = [
    {
      id: 'PRJ006',
      name: 'Agriculture Extension Program',
      district: 'Pune',
      iaType: 'Agriculture Dept',
      status: 'Approved',
      allocated: '₹6.2Cr',
      released: '₹3.1Cr',
      releasePercentage: '50%',
      ucStatus: 'pending'
    },
    {
      id: 'PRJ005',
      name: 'Integrated Child Development',
      district: 'Aurangabad',
      iaType: 'Women & Child',
      status: 'Submitted',
      allocated: '₹4.5Cr',
      released: '₹0.0L',
      releasePercentage: '0%',
      ucStatus: 'pending'
    },
    {
      id: 'PRJ002',
      name: 'Primary Health Center Upgradation',
      district: 'Mumbai',
      iaType: 'Health Dept',
      status: 'Approved',
      allocated: '₹8.5Cr',
      released: '₹4.3Cr',
      releasePercentage: '50%',
      ucStatus: 'submitted'
    },
    {
      id: 'PRJ001',
      name: 'Rural Road Construction - Phase 2',
      district: 'Pune',
      iaType: 'PWD',
      status: 'Funds Released',
      allocated: '₹12.5Cr',
      released: '₹7.5Cr',
      releasePercentage: '60%',
      ucStatus: 'pending'
    },
    {
      id: 'PRJ003',
      name: 'School Building Construction',
      district: 'Nagpur',
      iaType: 'Education Dept',
      status: 'In Review',
      allocated: '₹9.5Cr',
      released: '₹0.0L',
      releasePercentage: '0%',
      ucStatus: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Submitted':
        return 'bg-blue-100 text-blue-700';
      case 'In Review':
        return 'bg-yellow-100 text-yellow-700';
      case 'Funds Released':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getUCStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-100 text-yellow-700';
      case 'pending':
        return 'bg-red-100 text-red-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const totalBalance = snaAccounts.reduce((acc, account) => {
    const balance = parseFloat(account.balance.replace(/[₹,Cr]/g, ''));
    return acc + balance;
  }, 0);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistrict = selectedDistrict === 'all' || project.district === selectedDistrict;
      const matchesIAType = selectedIAType === 'all' || project.iaType === selectedIAType;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      return matchesSearch && matchesDistrict && matchesIAType && matchesStatus;
    });
  }, [searchQuery, selectedDistrict, selectedIAType, selectedStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-xl font-semibold">Maharashtra Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">State-level fund management and project overview</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-600">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <input type="month" className="border-none outline-none focus:ring-0 text-sm bg-transparent" defaultValue="2024-11" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <stat.icon className="w-5 h-5 text-orange-600" />
                </div>
                {stat.trend.value && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                    stat.trend.isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {stat.trend.isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingUp className="w-3 h-3 rotate-180" />
                    )}
                    {stat.trend.value}
                  </div>
                )}
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
              <p className="text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Proposal Pipeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Proposal Pipeline</h2>
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent cursor-pointer"
              >
                <option>November, 2024</option>
                <option>October, 2024</option>
                <option>September, 2024</option>
                <option>August, 2024</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="#4A4A4A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          
          {/* Pipeline Stages */}
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{stage.label}</span>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{stage.count}/{pipelineStages[0].count}</span>
                    <span>{stage.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className={`h-full ${stage.color}`} style={{ width: `${stage.percentage}%` }} />
                </div>
                {stage.conversion && (
                  <p className="text-xs text-gray-500">{stage.conversion}</p>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm">
              <p className="text-gray-600">Overall Conversion Rate: <span className="font-semibold text-gray-900">37%</span></p>
              <p className="text-xs text-gray-500 mt-1">14 days avg. processing time</p>
            </div>
          </div>
        </div>

        {/* SNA Accounts and Projects Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* SNA Accounts */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SNA Accounts</h2>
            
            {/* Total Balance */}
            <div className="bg-orange-50 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-600">Total Balance</p>
              <p className="text-2xl font-bold text-orange-900">₹{totalBalance.toFixed(1)}Cr</p>
            </div>
            
            {/* Account Cards */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {snaAccounts.map((account, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-orange-50/30 hover:border-orange-200 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{account.name}</p>
                        <p className="text-xs text-gray-500">{account.accountNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-sm font-semibold text-gray-900">{account.balance}</p>
                    <div className={`flex items-center gap-1 text-xs ${
                      account.trend.isPositive ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {account.trend.isPositive ? '+' : '-'}{account.trend.value}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{account.updatedAt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
              <div className="relative w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-6">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent cursor-pointer"
              >
                <option value="all">All Districts</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Aurangabad">Aurangabad</option>
              </select>

              <select
                value={selectedIAType}
                onChange={(e) => setSelectedIAType(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent cursor-pointer"
              >
                <option value="all">All IA Types</option>
                <option value="Agriculture Dept">Agriculture Dept</option>
                <option value="Health Dept">Health Dept</option>
                <option value="Education Dept">Education Dept</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="In Review">In Review</option>
                <option value="Approved">Approved</option>
                <option value="Funds Released">Funds Released</option>
              </select>
            </div>

            {/* Projects Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <div className="flex items-center gap-1">
                        Project <ChevronUp className="w-4 h-4 text-orange-600" />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <div className="flex items-center gap-1">
                        Status <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <div className="flex items-center gap-1">
                        Allocated <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <div className="flex items-center gap-1">
                        Released <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">UC Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProjects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{project.name}</p>
                          <p className="text-xs text-gray-500">{project.id} • {project.district}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-medium">{project.allocated}</td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-gray-900 font-medium">{project.released}</p>
                          <p className="text-xs text-gray-500">{project.releasePercentage}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUCStatusColor(project.ucStatus)}`}>
                          {project.ucStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <ExternalLink className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <MessageSquare className="w-4 h-4 text-gray-600" />
                          </button>
                          {project.ucStatus !== 'submitted' && (
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <Upload className="w-4 h-4 text-gray-600" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * projectsPerPage) + 1} to {Math.min(currentPage * projectsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-orange-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
