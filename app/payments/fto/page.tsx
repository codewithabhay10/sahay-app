"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import CreateFTOModal from "@/components/create-fto-modal";
import {
  mockFTOs,
  mockBeneficiariesForFTO,
  getVerifiedBeneficiaries,
  type FTOManagement,
  type BeneficiaryForFTO,
  type FTOManagementStatus,
} from "@/lib/fto-mock-data";

export default function FTOManagementPage() {
  const [ftos, setFtos] = useState<FTOManagement[]>(mockFTOs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleCreateFTO = (selectedBeneficiaryIds: string[], authFile: File | null) => {
    const selectedBeneficiaries = mockBeneficiariesForFTO.filter(b =>
      selectedBeneficiaryIds.includes(b.id)
    );
    
    const totalAmount = selectedBeneficiaries.reduce((sum, b) => sum + b.amount, 0);
    const projectName = selectedBeneficiaries[0]?.projectName || "Mixed Projects";
    const projectId = selectedBeneficiaries[0]?.projectId || "MIXED";

    const newFTO: FTOManagement = {
      id: String(ftos.length + 1),
      ftoId: `FTO-2024-${String(ftos.length + 1).padStart(3, '0')}`,
      projectId,
      projectName,
      beneficiaryCount: selectedBeneficiaries.length,
      totalAmount,
      status: 'draft',
      createdAt: new Date().toISOString(),
      createdBy: 'IA Officer',
      authorizationDoc: authFile?.name,
      beneficiaryIds: selectedBeneficiaryIds,
    };

    setFtos([newFTO, ...ftos]);
    setIsModalOpen(false);
  };

  const handleSendToPFMS = (ftoId: string) => {
    setFtos(ftos.map(fto => 
      fto.id === ftoId
        ? {
            ...fto,
            status: 'sent' as FTOManagementStatus,
            sentAt: new Date().toISOString(),
            pfmsReferenceId: `PFMS-REF-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          }
        : fto
    ));
  };

  const filteredFTOs = ftos.filter(fto => {
    const matchesSearch = 
      fto.ftoId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fto.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || fto.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: FTOManagementStatus) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700',
      pending: 'bg-yellow-100 text-yellow-700',
      sent: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700',
    };
    return styles[status] || styles.draft;
  };

  const verifiedBeneficiaries = getVerifiedBeneficiaries();

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#2C3E50]">FTO Management</h1>
              <p className="text-gray-600 mt-1">Create and manage Fund Transfer Orders</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#EA9000] text-white text-sm font-medium rounded-lg hover:bg-[#d88000] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3.33333V12.6667M3.33333 8H12.6667"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Create FTO
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by FTO ID or Project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14L11.1 11.1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA9000] focus:border-transparent cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="sent">Sent</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
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

        {/* Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-1">Total FTOs</p>
              <p className="text-2xl font-bold text-[#2C3E50]">{ftos.length}</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-1">Draft</p>
              <p className="text-2xl font-bold text-gray-600">
                {ftos.filter(f => f.status === 'draft').length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-1">Sent to PFMS</p>
              <p className="text-2xl font-bold text-blue-600">
                {ftos.filter(f => f.status === 'sent').length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {ftos.filter(f => f.status === 'completed').length}
              </p>
            </div>
          </div>

          {/* FTO Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      FTO ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Beneficiaries
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredFTOs.map((fto) => (
                    <tr key={fto.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{fto.ftoId}</div>
                            {fto.pfmsReferenceId && (
                              <div className="text-xs text-gray-500">{fto.pfmsReferenceId}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{fto.projectName}</div>
                        <div className="text-xs text-gray-500">{fto.projectId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{fto.beneficiaryCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ₹{fto.totalAmount.toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                            fto.status
                          )}`}
                        >
                          {fto.status.charAt(0).toUpperCase() + fto.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(fto.createdAt).toLocaleDateString('en-IN')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(fto.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {fto.status === 'draft' || fto.status === 'pending' ? (
                          <button
                            onClick={() => handleSendToPFMS(fto.id)}
                            className="text-[#EA9000] hover:text-[#d88000] font-medium"
                          >
                            Send to PFMS
                          </button>
                        ) : fto.status === 'sent' ? (
                          <span className="text-blue-600">Processing...</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredFTOs.length === 0 && (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No FTOs found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new Fund Transfer Order.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Create FTO Modal */}
      <CreateFTOModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        beneficiaries={verifiedBeneficiaries}
        onCreateFTO={handleCreateFTO}
      />
    </DashboardLayout>
  );
}
