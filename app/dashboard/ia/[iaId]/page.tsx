"use client";

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import KPICard from '@/components/kpi-card';
import MilestoneTracker from '@/components/milestone-tracker';
import EvidenceRepository from '@/components/evidence-repository';
import BeneficiaryTable from '@/components/beneficiary-table';
import UploadDocumentModal from '@/components/upload-document-modal';
import { getIAData, filterBeneficiaries } from '@/lib/ia-mock-data';
import { EvidenceCategory } from '@/lib/types';

export default function IADashboard() {
  const params = useParams();
  const iaId = params.iaId as string;
  const data = getIAData(iaId);

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [placementFilter, setPlacementFilter] = useState('All Placement Status');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  // Filter beneficiaries
  const filteredBeneficiaries = useMemo(() => {
    return filterBeneficiaries(data.beneficiaries, searchQuery, placementFilter);
  }, [data.beneficiaries, searchQuery, placementFilter]);

  // Handlers
  const handleMarkComplete = (milestoneId: string) => {
    console.log('Mark complete:', milestoneId);
    // In real app, would call API
  };

  const handleAddRemark = (milestoneId: string) => {
    console.log('Add remark:', milestoneId);
    setSelectedMilestone(milestoneId);
    // Show remark modal
  };

  const handleUploadEvidence = () => {
    setShowUploadModal(true);
  };

  const handleFileUpload = (files: File[], category: EvidenceCategory) => {
    console.log('Upload files:', files.length, 'Category:', category);
    setShowUploadModal(false);
    // In real app, would upload files
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{data.project.iaName}</h1>
              <p className="text-sm text-gray-600 mt-1">{data.project.projectName}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>Project ID: <span className="font-medium text-gray-700">{data.project.projectId}</span></span>
                <span>•</span>
                <span>Start Date: <span className="font-medium">{data.project.startDate}</span></span>
                <span>•</span>
                <span>End Date: <span className="font-medium">{data.project.endDate}</span></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#EA9000] text-white text-sm font-medium rounded-lg hover:bg-[#d88000] transition-colors">
                Register Beneficiary
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.66667 6.66667L8 10L11.3333 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Generate FTO
              </button>
              <button 
                onClick={handleUploadEvidence}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.3333 5.33333L8 2L4.66667 5.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Upload Document
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10.6667 1.33333H4C3.26362 1.33333 2.66667 1.93029 2.66667 2.66667V13.3333C2.66667 14.0697 3.26362 14.6667 4 14.6667H12C12.7364 14.6667 13.3333 14.0697 13.3333 13.3333V5.33333L10.6667 1.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.6667 1.33333V5.33333H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Submit Report
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-2">Beneficiaries Registered</p>
              <p className="text-3xl font-bold text-[#2C3E50] mb-1">{data.kpis.beneficiariesRegistered.current.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mb-3">Target: {data.kpis.beneficiariesRegistered.target.toLocaleString()}</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#EA9000]"
                  style={{ width: `${(data.kpis.beneficiariesRegistered.current / data.kpis.beneficiariesRegistered.target) * 100}%` }}
                />
              </div>
            </div>

            <KPICard
              title="Amount Released"
              value={`₹${data.kpis.amountReleased.amount} Cr`}
              change={8}
              changeType="positive"
              subtitle={`of ₹${data.kpis.amountReleased.allocated} Cr allocated`}
              iconBgColor="bg-blue-50"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />

            <KPICard
              title="Amount Utilized"
              value={`₹${data.kpis.amountUtilized.amount} Cr`}
              change={data.kpis.amountUtilized.percentage}
              changeType="positive"
              subtitle={`${data.kpis.amountUtilized.percentage}% of released`}
              iconBgColor="bg-green-50"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />

            <KPICard
              title="Placement Rate"
              value={`${data.kpis.placementRate.percentage}%`}
              change={5}
              changeType="positive"
              subtitle={`${data.kpis.placementRate.placed} placed out of ${data.kpis.placementRate.total}`}
              iconBgColor="bg-orange-50"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#EA9000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#EA9000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#EA9000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#EA9000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Milestone Tracker */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Project Milestones</h3>
              <MilestoneTracker
                milestones={data.milestones}
                onMarkComplete={handleMarkComplete}
                onAddRemark={handleAddRemark}
              />
            </div>

            {/* Evidence Repository */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Evidence Repository</h3>
              <EvidenceRepository
                evidence={data.evidence}
                onUpload={handleUploadEvidence}
              />
            </div>
          </div>

          {/* Beneficiary List */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-[#2C3E50] mb-6">Beneficiary List</h3>
            <BeneficiaryTable
              beneficiaries={filteredBeneficiaries}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placementFilter={placementFilter}
              onFilterChange={setPlacementFilter}
            />
            
            {/* Pagination */}
            {filteredBeneficiaries.length > 5 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing 1 to 5 of {filteredBeneficiaries.length} beneficiaries
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-2 bg-[#EA9000] text-white rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <UploadDocumentModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleFileUpload}
      />
    </div>
  );
}
