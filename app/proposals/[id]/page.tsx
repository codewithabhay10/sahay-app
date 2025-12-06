"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard-layout';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  MessageSquare,
  FileDown,
  Send
} from 'lucide-react';

interface ProposalDetail {
  id: string;
  title: string;
  proposalId: string;
  state: string;
  category: string;
  status: 'Under Review' | 'Approved' | 'Rejected' | 'Pending';
  submittedOn: string;
  totalBudget: number;
  pune: number;
  pwd: string;
  objective: string;
  keyActivities: string[];
  expectedOutcome: string;
  engagingPartners: string[];
  budgetBreakdown: {
    category: string;
    description: string;
    amount: number;
  }[];
  timeline: {
    phase: string;
    duration: string;
    status: 'pending' | 'in-progress' | 'completed';
  }[];
  beneficiaries: {
    expectedBeneficiaries: number;
    targetGroups: string[];
    eligibilityCriteria: string;
  };
  documents: {
    name: string;
    size: string;
    type: string;
  }[];
}

interface AIAnalysis {
  overallScore: number;
  preValidation: {
    status: 'Passed' | 'Failed';
    criteria: {
      name: string;
      passed: boolean;
      message: string;
    }[];
  };
  duplicationCheck: {
    status: 'No Duplication' | 'Possible Duplication';
    confidence: number;
    matches: string[];
  };
  recommendations: string[];
}

interface Comment {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  comment: string;
  action?: string;
}

export default function ProposalReviewPage() {
  const params = useParams();
  const router = useRouter();
  const proposalId = params.id as string;

  const [activeTab, setActiveTab] = useState<'details' | 'documents'>('details');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showConditionalModal, setShowConditionalModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showClarificationModal, setShowClarificationModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [conditions, setConditions] = useState('');
  const [deadline, setDeadline] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [clarificationMessage, setClarificationMessage] = useState('');

  // Mock data
  const proposal: ProposalDetail = {
    id: proposalId,
    title: 'Youth Skill Development Program',
    proposalId: 'PROP-2024-001',
    state: 'Maharashtra',
    category: 'Skill Development',
    status: 'Under Review',
    submittedOn: '15 November 2024',
    totalBudget: 50000000,
    pune: 85.6,
    pwd: 'PWD Department',
    objective: 'Provide vocational training and employment opportunities to 500 unemployed youth in rural areas of Pune district. This program aims to impart job-ready skills and facilitate placement opportunities in various trades.',
    keyActivities: [
      'Identify and register eligible youth beneficiaries',
      'Establish 5 training centers in rural blocks',
      'Conduct skill-training sessions in 15 different trades',
      'Provide certification and placement support',
      'Monitor and evaluate graduate employment within 6 months of training completion'
    ],
    expectedOutcome: 'Aim 400 youth (80%) to receive skill certification, and 300 youth (60%) to be placed in gainful employment within 6 months of training completion.',
    engagingPartners: [
      'State Government',
      'NSDC',
      'Private Sector',
      'Educational Institutions'
    ],
    budgetBreakdown: [
      { category: 'Training Fee', description: 'Training costs for 500 beneficiaries', amount: 20000000 },
      { category: 'Material', description: 'Training materials and equipment', amount: 12000000 },
      { category: 'Infrastructure', description: 'Training center setup and maintenance', amount: 9000000 },
      { category: 'Labour', description: 'Trainers and support staff salaries', amount: 7000000 },
      { category: 'Contingency', description: 'Miscellaneous and emergency expenses', amount: 2000000 }
    ],
    timeline: [
      { phase: 'Planning and Setup', duration: '2 months', status: 'pending' },
      { phase: 'Beneficiary Registration', duration: '1 month', status: 'pending' },
      { phase: 'Training Programs', duration: '6 months', status: 'pending' },
      { phase: 'Placement Support', duration: '2 months', status: 'pending' },
      { phase: 'Monitoring and Evaluation', duration: '1 month', status: 'pending' }
    ],
    beneficiaries: {
      expectedBeneficiaries: 500,
      targetGroups: ['Youth (18-35)', 'SC/ST', 'BPL Families', 'Rural Poor'],
      eligibilityCriteria: 'Unemployed youth aged 18-35 years from rural areas of Pune district with educational qualification between 8th to 12th standard.'
    },
    documents: [
      { name: 'Project_Proposal.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'Budget_Breakdown.pdf', size: '1.2 MB', type: 'pdf' }
    ]
  };

  const aiAnalysis: AIAnalysis = {
    overallScore: 87,
    preValidation: {
      status: 'Passed',
      criteria: [
        { name: 'Pre-Validation Passed', passed: true, message: 'All validation criteria met' },
        { name: 'Completeness: 95%', passed: true, message: 'Comprehensive documentation' },
        { name: 'Compliance: 98%', passed: true, message: 'Meets all regulatory requirements' }
      ]
    },
    duplicationCheck: {
      status: 'No Duplication',
      confidence: 98,
      matches: []
    },
    recommendations: [
      'Consider increasing the beneficiary target by 20%',
      'High skill-youth ratio (1:10) are district aligned with state average',
      'Budget allocation for training materials is within normal range',
      'Timeline aligns well for typical skill development programs',
      'Infrastructure investment for Phase 3 is sufficient based on government scheme 3-to-2 impact'
    ]
  };

  const comments: Comment[] = [
    {
      id: '1',
      author: 'Dr. Rajesh Kumar',
      role: 'PACC Member',
      timestamp: '26 Nov, 2024, 10:20 am',
      comment: 'The proposal looks comprehensive. However, I would like to understand the trainer selection criteria and their qualifications.',
      action: 'Query'
    },
    {
      id: '2',
      author: 'PWD Dept',
      role: 'State User',
      timestamp: '27 Nov, 2024, 1:14 am',
      comment: 'Trainers will be selected based on minimum 5 years experience in relevant trade and certified by National Skill Development Corporation. Detailed criteria is available in Annexure-III of the proposal document.',
      action: 'Responded'
    },
    {
      id: '3',
      author: 'Ms. Priya Sharma',
      role: 'PACC Member',
      timestamp: '28 Nov, 2024, 09:20 am',
      comment: 'The timeline seems ambitious. Please ensure adequate buffer time for beneficiary registration as rural areas may take longer.',
      action: 'Comment'
    }
  ];

  const handleApprove = () => {
    console.log('Approving proposal:', proposalId);
    alert('Proposal approved successfully!');
    setShowApproveModal(false);
  };

  const handleConditionalApprove = () => {
    if (!conditions || !deadline) {
      alert('Please enter conditions and deadline');
      return;
    }
    console.log('Conditional approval:', { proposalId, conditions, deadline });
    alert('Proposal conditionally approved!');
    setShowConditionalModal(false);
  };

  const handleReject = () => {
    if (!rejectionReason) {
      alert('Please enter rejection reason');
      return;
    }
    console.log('Rejecting proposal:', { proposalId, rejectionReason });
    alert('Proposal rejected!');
    setShowRejectModal(false);
  };

  const handleRequestClarification = () => {
    if (!clarificationMessage) {
      alert('Please enter clarification message');
      return;
    }
    console.log('Requesting clarification:', { proposalId, clarificationMessage });
    alert('Clarification request sent!');
    setShowClarificationModal(false);
  };

  const handleGenerateMOM = () => {
    console.log('Generating MOM for proposal:', proposalId);
    alert('Minutes of Meeting generated successfully!');
  };

  const handleCreateSanctionOrder = () => {
    console.log('Creating sanction order for proposal:', proposalId);
    alert('Sanction Order created successfully!');
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    console.log('Posting comment:', newComment);
    setNewComment('');
    alert('Comment posted!');
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-gray-900">Proposal Review</h1>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {proposal.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{proposal.proposalId} · {proposal.title}</p>
              </div>
            </div>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Panel - Proposal Details */}
            <div className="col-span-4 space-y-6">
              {/* Proposal Information Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Proposal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Proposal ID</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{proposal.proposalId}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Title</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{proposal.title}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Category</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{proposal.category}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Status</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{proposal.status}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">State</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{proposal.state}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Pune</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{proposal.pune}%</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">PWD Department</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{proposal.pwd}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Submitted On</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{proposal.submittedOn}</p>
                  </div>
                </div>
              </div>

              {/* Project Blueprint */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-600" />
                    Project Blueprint
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Objective</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{proposal.objective}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Key Activities</h3>
                    <ul className="space-y-2">
                      {proposal.keyActivities.map((activity, index) => (
                        <li key={index} className="text-sm text-gray-700 flex gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Expected Outcome</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{proposal.expectedOutcome}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Engaging Partners</h3>
                    <div className="flex flex-wrap gap-2">
                      {proposal.engagingPartners.map((partner, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Supporting Documents</h2>
                <div className="space-y-3">
                  {proposal.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-orange-400 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.size}</p>
                        </div>
                      </div>
                      <button className="text-orange-600 hover:text-orange-700">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Panel - Budget, Timeline, Beneficiaries */}
            <div className="col-span-5 space-y-6">
              {/* Budget Breakdown */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    Budget Breakdown
                  </h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left text-sm font-semibold text-gray-700 pb-3">CATEGORY</th>
                        <th className="text-left text-sm font-semibold text-gray-700 pb-3">DESCRIPTION</th>
                        <th className="text-right text-sm font-semibold text-gray-700 pb-3">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {proposal.budgetBreakdown.map((item, index) => (
                        <tr key={index}>
                          <td className="py-3 text-sm text-gray-900">{item.category}</td>
                          <td className="py-3 text-sm text-gray-600">{item.description}</td>
                          <td className="py-3 text-sm font-medium text-gray-900 text-right">
                            ₹{item.amount.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-300">
                        <td className="pt-3 text-sm font-semibold text-gray-900" colSpan={2}>Total Budget</td>
                        <td className="pt-3 text-sm font-bold text-gray-900 text-right">
                          ₹{proposal.totalBudget.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Implementation Timeline */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Implementation Timeline
                  </h2>
                </div>

                <div className="space-y-4">
                  {proposal.timeline.map((phase, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            phase.status === 'completed' ? 'bg-green-100 text-green-600' :
                            phase.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                          {index < proposal.timeline.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900">{phase.phase}</h3>
                            <span className="text-xs text-gray-500">{phase.duration}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 capitalize">{phase.status.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beneficiary Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    Beneficiary Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Expected Beneficiaries</label>
                    <p className="text-2xl font-bold text-orange-600 mt-1">
                      {proposal.beneficiaries.expectedBeneficiaries.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Target Groups</label>
                    <div className="flex flex-wrap gap-2">
                      {proposal.beneficiaries.targetGroups.map((group, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Eligibility Criteria</label>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {proposal.beneficiaries.eligibilityCriteria}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - AI Analysis & Actions */}
            <div className="col-span-3 space-y-6">
              {/* AI Analysis */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                    AI Analysis
                  </h2>
                </div>

                {/* Overall Score */}
                <div className="mb-6 p-4 bg-linear-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-700 mb-2">Overall Score</p>
                    <p className="text-4xl font-bold text-orange-600">{aiAnalysis.overallScore}/100</p>
                  </div>
                </div>

                {/* Pre-Validation */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-sm font-semibold text-gray-900">Pre-Validation Passed</h3>
                  </div>
                  <div className="space-y-2">
                    {aiAnalysis.preValidation.criteria.map((criterion, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-gray-700">{criterion.message}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duplication Check */}
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <h3 className="text-sm font-semibold text-green-900">No Duplication</h3>
                  </div>
                  <p className="text-sm text-green-700">
                    Confidence: {aiAnalysis.duplicationCheck.confidence}%
                  </p>
                </div>

                {/* AI Recommendations */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    AI Recommendations
                  </h3>
                  <div className="space-y-3">
                    {aiAnalysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex gap-2 text-sm">
                        <span className="text-orange-600 mt-1">•</span>
                        <p className="text-gray-700 leading-relaxed">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Actions */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowApproveModal(true)}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Approve
                  </button>
                  <button
                    onClick={() => setShowConditionalModal(true)}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5" />
                    Conditional Approve
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject
                  </button>
                  <button
                    onClick={() => setShowClarificationModal(true)}
                    className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Request Clarification
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <button
                    onClick={handleGenerateMOM}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FileDown className="w-4 h-4" />
                    Generate MOM
                  </button>
                  <button
                    onClick={handleCreateSanctionOrder}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Create Sanction Order
                  </button>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Financial Risk</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Low
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Implementation Risk</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                      Medium
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Compliance Risk</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Low
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discussion & Comments Section */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                Discussion & Comments
              </h2>
              <span className="text-sm text-gray-600">{comments.length} Comments</span>
            </div>

            {/* Comments List */}
            <div className="space-y-4 mb-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-orange-400 pl-4 py-2">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {comment.role}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
                    </div>
                    {comment.action && (
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        comment.action === 'Query' ? 'bg-yellow-100 text-yellow-700' :
                        comment.action === 'Responded' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {comment.action}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{comment.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Add a comment or question...</label>
              <div className="flex gap-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Your comment will be visible to all reviewers and stakeholders"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  rows={3}
                />
                <button
                  onClick={handlePostComment}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 h-fit"
                >
                  <Send className="w-4 h-4" />
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approve Proposal</h3>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to approve this proposal? This action will create a sanction order and move the proposal to the approved status.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conditional Approve Modal */}
      {showConditionalModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conditional Approval</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Conditions *</label>
                <textarea
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  placeholder="Enter conditions that must be met..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline *</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConditionalModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConditionalApprove}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Proposal</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rejection Reason *</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a detailed reason for rejection..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={4}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Clarification Modal */}
      {showClarificationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Clarification</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Clarification Message *</label>
              <textarea
                value={clarificationMessage}
                onChange={(e) => setClarificationMessage(e.target.value)}
                placeholder="What additional information do you need?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={4}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClarificationModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestClarification}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
