"use client";

import React, { useState, useMemo } from 'react';
import Sidebar from '@/components/sidebar';
import ReleaseFundsModal from '@/components/release-funds-modal';
import { fundQueueProposals, filterProposals } from '@/lib/fund-queue-mock-data';
import { FundProposal, PACCDecision, UCStatus, ProposalStatus } from '@/lib/types';

export default function FundQueuePage() {
  const [selectedProposalIds, setSelectedProposalIds] = useState<string[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<FundProposal | null>(null);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [proposalsToRelease, setProposalsToRelease] = useState<FundProposal[]>([]);
  
  // Filters
  const [stateFilter, setStateFilter] = useState('All States');
  const [paccFilter, setPaccFilter] = useState('All Decisions');
  const [ucFilter, setUcFilter] = useState('All UC Status');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter proposals
  const filteredProposals = useMemo(() => {
    return filterProposals(fundQueueProposals, {
      state: stateFilter,
      paccDecision: paccFilter === 'All Decisions' ? undefined : paccFilter,
      ucStatus: ucFilter === 'All UC Status' ? undefined : ucFilter,
      status: statusFilter === 'All Status' ? undefined : statusFilter,
      search: searchQuery
    });
  }, [stateFilter, paccFilter, ucFilter, statusFilter, searchQuery]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProposalIds(filteredProposals.map(p => p.id));
    } else {
      setSelectedProposalIds([]);
    }
  };

  const handleSelectProposal = (id: string) => {
    setSelectedProposalIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleRelease = (proposal: FundProposal) => {
    setProposalsToRelease([proposal]);
    setShowReleaseModal(true);
  };

  const handleBulkRelease = () => {
    const proposals = fundQueueProposals.filter(p => selectedProposalIds.includes(p.id));
    setProposalsToRelease(proposals);
    setShowReleaseModal(true);
  };

  const handleConfirmRelease = (paymentMode: 'NEFT' | 'RTGS' | 'ACH') => {
    console.log('Releasing funds via', paymentMode, proposalsToRelease);
    setShowReleaseModal(false);
    setProposalsToRelease([]);
    setSelectedProposalIds([]);
    // In real app, would update proposal status to 'processing'
  };

  const getPACCBadge = (decision: PACCDecision) => {
    const styles: Record<PACCDecision, string> = {
      'approved': 'bg-green-100 text-green-700',
      'pending': 'bg-yellow-100 text-yellow-700',
      'conditionally-approved': 'bg-blue-100 text-blue-700',
      'rejected': 'bg-red-100 text-red-700'
    };
    const labels: Record<PACCDecision, string> = {
      'approved': 'Approved',
      'pending': 'Pending',
      'conditionally-approved': 'Conditional',
      'rejected': 'Rejected'
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[decision]}`}>{labels[decision]}</span>;
  };

  const getUCBadge = (status: UCStatus) => {
    const styles: Record<UCStatus, string> = {
      'submitted': 'bg-blue-100 text-blue-700',
      'approved': 'bg-green-100 text-green-700',
      'pending': 'bg-yellow-100 text-yellow-700',
      'overdue': 'bg-red-100 text-red-700',
      'not-required': 'bg-gray-100 text-gray-700'
    };
    const labels: Record<UCStatus, string> = {
      'submitted': 'Submitted',
      'approved': 'Approved',
      'pending': 'Pending',
      'overdue': 'Overdue',
      'not-required': 'N/A'
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{labels[status]}</span>;
  };

  const getStatusBadge = (status: ProposalStatus) => {
    const styles: Record<ProposalStatus, string> = {
      'pending-release': 'bg-orange-100 text-orange-700',
      'processing': 'bg-blue-100 text-blue-700',
      'completed': 'bg-green-100 text-green-700',
      'on-hold': 'bg-yellow-100 text-yellow-700',
      'rejected': 'bg-red-100 text-red-700'
    };
    const labels: Record<ProposalStatus, string> = {
      'pending-release': 'Pending Release',
      'processing': 'Processing',
      'completed': 'Completed',
      'on-hold': 'On Hold',
      'rejected': 'Rejected'
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{labels[status]}</span>;
  };

  const totalSelectedAmount = selectedProposalIds.reduce((sum, id) => {
    const proposal = fundQueueProposals.find(p => p.id === id);
    return sum + (proposal?.amountRequested || 0);
  }, 0);

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2C3E50]">Fund Release Queue</h1>
              <p className="text-gray-600 mt-1">Review and release funds to state SNA accounts</p>
            </div>
            
            {selectedProposalIds.length > 0 && (
              <button
                onClick={handleBulkRelease}
                className="px-6 py-3 bg-[#EA9000] text-white font-medium rounded-lg hover:bg-[#d88000] transition-colors flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.6667 12.5V15.8333C16.6667 16.2754 16.4911 16.6993 16.1785 17.0118C15.8659 17.3244 15.442 17.5 15 17.5H5C4.55797 17.5 4.13405 17.3244 3.82149 17.0118C3.50893 16.6993 3.33334 16.2754 3.33334 15.8333V12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.83334 8.33333L10 12.5L14.1667 8.33333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 12.5V3.33333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Bulk Release ({selectedProposalIds.length}) - ₹{totalSelectedAmount.toFixed(2)} Cr
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All States</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Tamil Nadu</option>
              <option>Gujarat</option>
            </select>
            
            <select value={paccFilter} onChange={(e) => setPaccFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Decisions</option>
              <option value="approved">Approved</option>
              <option value="conditionally-approved">Conditional</option>
              <option value="pending">Pending</option>
            </select>
            
            <select value={ucFilter} onChange={(e) => setUcFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All UC Status</option>
              <option value="approved">Approved</option>
              <option value="submitted">Submitted</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>

            <input
              type="text"
              placeholder="Search proposals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-12 gap-6 p-8">
          {/* Table */}
          <div className={`${selectedProposal ? 'col-span-8' : 'col-span-12'} bg-white rounded-lg border border-gray-200 overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedProposalIds.length === filteredProposals.length && filteredProposals.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Proposal ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">State</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">PACC</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">UC Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProposals.map(proposal => (
                    <tr 
                      key={proposal.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedProposal?.id === proposal.id ? 'bg-orange-50' : ''}`}
                      onClick={() => setSelectedProposal(proposal)}
                    >
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedProposalIds.includes(proposal.id)}
                          onChange={() => handleSelectProposal(proposal.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900 text-sm">{proposal.proposalId}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{proposal.projectName}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{proposal.stateName}</td>
                      <td className="px-4 py-4 text-right font-semibold text-gray-900">₹{proposal.amountRequested.toFixed(2)} Cr</td>
                      <td className="px-4 py-4">{getPACCBadge(proposal.paccDecision)}</td>
                      <td className="px-4 py-4">{getUCBadge(proposal.ucStatus)}</td>
                      <td className="px-4 py-4">{getStatusBadge(proposal.status)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRelease(proposal);
                            }}
                            disabled={proposal.status !== 'pending-release'}
                            className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Release
                          </button>
                          <button className="px-3 py-1.5 border border-red-600 text-red-600 text-xs font-medium rounded hover:bg-red-50 transition-colors">
                            Reject
                          </button>
                          <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                            Hold
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Panel */}
          {selectedProposal && (
            <div className="col-span-4 bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Proposal Details</h3>
                <button onClick={() => setSelectedProposal(null)} className="text-gray-400 hover:text-gray-600">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Proposal ID</p>
                  <p className="font-semibold text-gray-900">{selectedProposal.proposalId}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Project Name</p>
                  <p className="font-medium text-gray-900">{selectedProposal.projectName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">State</p>
                    <p className="font-medium text-gray-900">{selectedProposal.stateName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Submitted</p>
                    <p className="font-medium text-gray-900">{selectedProposal.submittedDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Amount Requested</p>
                  <p className="text-2xl font-bold text-[#EA9000]">₹{selectedProposal.amountRequested.toFixed(2)} Cr</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-3">SNA Account Information</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Account ID</p>
                      <p className="font-medium text-gray-900">{selectedProposal.snaAccountId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Account Number</p>
                      <p className="font-medium text-gray-900">{selectedProposal.snaAccountNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-3">Documents ({selectedProposal.documents.length})</p>
                  <div className="space-y-2">
                    {selectedProposal.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-500">
                          <path d="M9.33333 1.33333H4C3.26362 1.33333 2.66667 1.93029 2.66667 2.66667V13.3333C2.66667 14.0697 3.26362 14.6667 4 14.6667H12C12.7364 14.6667 13.3333 14.0697 13.3333 13.3333V5.33333L9.33333 1.33333Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9.33333 1.33333V5.33333H13.3333" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.uploadedDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Release Modal */}
      <ReleaseFundsModal
        isOpen={showReleaseModal}
        onClose={() => {
          setShowReleaseModal(false);
          setProposalsToRelease([]);
        }}
        proposals={proposalsToRelease}
        onConfirm={handleConfirmRelease}
      />
    </div>
  );
}
