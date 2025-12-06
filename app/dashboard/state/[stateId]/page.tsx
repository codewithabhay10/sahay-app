"use client";

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard-layout';
import KPICard from '@/components/kpi-card';
import ProposalFunnel from '@/components/proposal-funnel';
import SNAAccountsList from '@/components/sna-accounts-list';
import ProjectsTable from '@/components/projects-table';
import { getStateData, filterProjects, sortProjects, paginateProjects, getFilterOptions } from '@/lib/mock-data';
import { FilterOptions, SortField, SortOrder } from '@/lib/types';

export default function StateDashboard() {
  const params = useParams();
  const stateId = params.stateId as string;
  const data = getStateData(stateId);

  // State for filters and sorting
  const [selectedMonth, setSelectedMonth] = useState('November, 2024');
  const [filters, setFilters] = useState<FilterOptions>({
    district: 'All Districts',
    iaType: 'All IA Types',
    status: 'All Statuses',
    search: ''
  });
  const [sortConfig, setSortConfig] = useState<{ field: SortField; order: SortOrder }>({
    field: 'submittedDate',
    order: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  // Get filter options
  const filterOptions = getFilterOptions(data.projects);

  // Apply filters and sorting
  const processedProjects = useMemo(() => {
    let filtered = filterProjects(data.projects, filters);
    let sorted = sortProjects(filtered, sortConfig.field, sortConfig.order);
    return sorted;
  }, [data.projects, filters, sortConfig]);

  // Paginate
  const paginatedData = useMemo(() => {
    return paginateProjects(processedProjects, currentPage, projectsPerPage);
  }, [processedProjects, currentPage]);

  const handleSort = (field: SortField, order: SortOrder) => {
    setSortConfig({ field, order });
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#2C3E50]">{data.stateName} Dashboard</h1>
              <p className="text-gray-600 mt-1">State-level fund management and project overview</p>
            </div>
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
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* KPI Cards Row */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <KPICard
              title={data.kpis.totalProjects.title}
              value={data.kpis.totalProjects.value}
              change={data.kpis.totalProjects.change}
              changeType={data.kpis.totalProjects.changeType}
              subtitle={data.kpis.totalProjects.subtitle}
              iconBgColor="bg-orange-50"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 11L12 14L22 4"
                    stroke="#EA9000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H16"
                    stroke="#EA9000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            
            <KPICard
              title={data.kpis.fundsReceived.title}
              value={data.kpis.fundsReceived.value}
              change={data.kpis.fundsReceived.change}
              changeType={data.kpis.fundsReceived.changeType}
              subtitle={data.kpis.fundsReceived.subtitle}
              iconBgColor="bg-blue-50"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 8V16M12 11V16M8 14V16M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            
            <KPICard
              title={data.kpis.unspentBalance.title}
              value={data.kpis.unspentBalance.value}
              change={data.kpis.unspentBalance.change}
              changeType={data.kpis.unspentBalance.changeType}
              subtitle={data.kpis.unspentBalance.subtitle}
              iconBgColor="bg-red-50"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3H21M3 9H21M3 15H21M3 21H21"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="7" y="11" width="10" height="6" stroke="#EF4444" strokeWidth="2" fill="none"/>
                </svg>
              }
            />
            
            <KPICard
              title={data.kpis.pendingUCs.title}
              value={data.kpis.pendingUCs.value}
              change={data.kpis.pendingUCs.change}
              changeType={data.kpis.pendingUCs.changeType}
              subtitle={data.kpis.pendingUCs.subtitle}
              iconBgColor="bg-yellow-50"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            {/* Left Column - Proposal Funnel */}
            <div className="col-span-7 bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Proposal Pipeline</h3>
              <ProposalFunnel data={data.proposalFunnel} />
            </div>

            {/* Right Column - SNA Accounts */}
            <div className="col-span-5 bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">SNA Accounts</h3>
              <SNAAccountsList 
                accounts={data.snaAccounts.accounts}
                totalBalance={data.snaAccounts.totalBalance}
              />
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#2C3E50]">Projects</h3>
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent w-56"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                      stroke="#9CA3AF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 14L11.1 11.1"
                      stroke="#9CA3AF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* District Filter */}
                <select
                  value={filters.district}
                  onChange={(e) => handleFilterChange('district', e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent cursor-pointer"
                >
                  {filterOptions.districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {/* IA Type Filter */}
                <select
                  value={filters.iaType}
                  onChange={(e) => handleFilterChange('iaType', e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent cursor-pointer"
                >
                  {filterOptions.iaTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent cursor-pointer"
                >
                  {filterOptions.statuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <ProjectsTable 
              projects={paginatedData.projects}
              onSort={handleSort}
              currentSort={sortConfig}
            />

            {/* Pagination */}
            {paginatedData.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * projectsPerPage) + 1} to{' '}
                  {Math.min(currentPage * projectsPerPage, paginatedData.totalCount)} of{' '}
                  {paginatedData.totalCount} projects
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={!paginatedData.hasPrev}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: paginatedData.totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-[#EA9000] text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(paginatedData.totalPages, p + 1))}
                    disabled={!paginatedData.hasNext}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
    </DashboardLayout>
  );
}
