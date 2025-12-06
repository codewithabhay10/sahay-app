"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import { 
  ProposalFormData, 
  BudgetLineItem, 
  Activity, 
  TimelinePhase,
  ProposalDocument,
  AIValidationResult,
  DuplicationCheck,
  AIRecommendation,
  ImplementationPartner,
  ProposalStatus
} from '@/lib/types';

export default function SubmitProposalPage() {
  const [formData, setFormData] = useState<ProposalFormData>({
    // Basic Information
    title: '',
    category: 'Income',
    district: '',
    estimatedBudget: 0,
    startDate: '',
    endDate: '',

    // Beneficiary Information
    expectedBeneficiaryCount: 0,
    targetGroups: {
      women: false,
      youth: false,
      scSt: false,
      minorities: false,
      disabled: false,
      bplFamilies: false,
      farmers: false,
      ruralPoor: false,
    },
    eligibilityCriteria: '',

    // Project Blueprint
    objective: '',
    activities: [],
    expectedOutcomes: '',
    implementationPartners: [],
    timeline: [],
    convergenceNeeds: {
      mgnrega: false,
      stateSkill: false,
      others: false,
    },

    // Budget Breakup
    budgetLineItems: [],

    // Documents
    documents: [],

    // Status
    status: 'Draft' as ProposalStatus,
  });

  const [aiAnalysis, setAiAnalysis] = useState<{
    validation?: AIValidationResult;
    duplication?: DuplicationCheck;
    recommendation?: AIRecommendation;
  }>({});

  const [isRunningPrecheck, setIsRunningPrecheck] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // District options (example)
  const districts = ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 'Kolhapur'];

  // Add Activity
  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, { id: Date.now().toString(), description: '' }]
    }));
  };

  // Remove Activity
  const removeActivity = (id: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter(a => a.id !== id)
    }));
  };

  // Update Activity
  const updateActivity = (id: string, description: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.map(a => a.id === id ? { ...a, description } : a)
    }));
  };

  // Add Timeline Phase
  const addTimelinePhase = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { 
        id: Date.now().toString(), 
        name: '', 
        startDate: '', 
        endDate: '', 
        status: 'not-started' 
      }]
    }));
  };

  // Remove Timeline Phase
  const removeTimelinePhase = (id: string) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter(t => t.id !== id)
    }));
  };

  // Update Timeline Phase
  const updateTimelinePhase = (id: string, field: keyof TimelinePhase, value: string) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.map(t => t.id === id ? { ...t, [field]: value } : t)
    }));
  };

  // Add Budget Line Item
  const addBudgetLineItem = () => {
    setFormData(prev => ({
      ...prev,
      budgetLineItems: [...prev.budgetLineItems, { 
        id: Date.now().toString(), 
        category: 'Labour', 
        description: '', 
        amount: 0 
      }]
    }));
  };

  // Remove Budget Line Item
  const removeBudgetLineItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      budgetLineItems: prev.budgetLineItems.filter(b => b.id !== id)
    }));
  };

  // Update Budget Line Item
  const updateBudgetLineItem = (id: string, field: keyof BudgetLineItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      budgetLineItems: prev.budgetLineItems.map(b => b.id === id ? { ...b, [field]: value } : b)
    }));
  };

  // Calculate Total Budget
  const calculateTotalBudget = () => {
    return formData.budgetLineItems.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newDocuments: ProposalDocument[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: file.type.includes('pdf') ? 'pdf' : file.type.includes('video') ? 'video' : 'image',
      url: URL.createObjectURL(file),
      size: file.size,
      uploadDate: new Date().toISOString(),
    }));

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments]
    }));
  };

  // Remove Document
  const removeDocument = (id: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== id)
    }));
  };

  // Run Precheck (Mock AI Analysis)
  const runPrecheck = async () => {
    setIsRunningPrecheck(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock validation
    const mockValidation: AIValidationResult = {
      isValid: true,
      completeness: 95,
      compliance: 98,
      issues: formData.title ? [] : ['Proposal title is required']
    };

    // Mock duplication check
    const mockDuplication: DuplicationCheck = {
      isDuplicate: false,
      possibleDuplicates: [
        {
          proposalId: 'PRO-2024-001',
          proposalTitle: 'Skill Training for Youth in ' + formData.district,
          similarity: 45,
          submittedBy: 'Maharashtra State',
          submittedDate: '2024-10-15'
        }
      ]
    };

    // Mock recommendation
    const mockRecommendation: AIRecommendation = {
      score: 87,
      strengths: [
        'Clear alignment with district needs',
        'Well-defined target beneficiary groups',
        'Realistic budget allocation'
      ],
      improvements: [
        'Consider increasing the training duration',
        'Add more convergence with MGNREGA',
        'Include monitoring mechanisms'
      ],
      budgetAssessment: 'Budget is well-structured with appropriate allocation across categories.'
    };

    setAiAnalysis({
      validation: mockValidation,
      duplication: mockDuplication,
      recommendation: mockRecommendation
    });

    setIsRunningPrecheck(false);
  };

  // Validate Form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.estimatedBudget || formData.estimatedBudget <= 0) newErrors.estimatedBudget = 'Budget must be greater than 0';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (formData.documents.length === 0) newErrors.documents = 'At least 1 document is required';

    const totalBudget = calculateTotalBudget();
    if (totalBudget !== formData.estimatedBudget) {
      newErrors.budgetLineItems = `Sum of line items (₹${totalBudget.toLocaleString('en-IN')}) must equal total budget (₹${formData.estimatedBudget.toLocaleString('en-IN')})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save Draft
  const saveDraft = () => {
    console.log('Saving draft...', formData);
    alert('Draft saved successfully!');
  };

  // Submit Proposal
  const submitProposal = () => {
    if (!validateForm()) {
      alert('Please fix all errors before submitting');
      return;
    }

    const submitData = {
      ...formData,
      status: 'Submitted' as const
    };

    console.log('Submitting proposal...', submitData);
    alert('Proposal submitted successfully!');
  };

  return (
    <DashboardLayout>
      <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2C3E50]">Submit Proposal</h1>
            <p className="text-gray-600 mt-1">Create a new project proposal for review and approval</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Preview
            </button>
            <button
              onClick={saveDraft}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Save Draft
            </button>
            <button
              onClick={submitProposal}
              className="px-4 py-2 text-sm font-medium text-white bg-[#EA9000] rounded-lg hover:bg-[#d18200]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 p-8">
        {/* Main Form */}
        <div className="flex-1 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#EA9000]">
                  <path d="M11.6667 3.33333H5C4.55797 3.33333 4.13405 3.50893 3.82149 3.82149C3.50893 4.13405 3.33333 4.55797 3.33333 5V15C3.33333 15.442 3.50893 15.866 3.82149 16.1785C4.13405 16.4911 4.55797 16.6667 5 16.6667H15C15.442 16.6667 15.866 16.4911 16.1785 16.1785C16.4911 15.866 16.6667 15.442 16.6667 15V8.33333L11.6667 3.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.6667 3.33333V8.33333H16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#2C3E50]">Basic Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposal Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter proposal title"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000] ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                  >
                    <option value="Income">Income Generation</option>
                    <option value="Skill">Skill Development</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000] ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select District</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Budget (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.estimatedBudget || ''}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: Number(e.target.value) })}
                  placeholder="Enter amount in rupees"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000] ${errors.estimatedBudget ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.estimatedBudget && <p className="text-red-500 text-sm mt-1">{errors.estimatedBudget}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000] ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000] ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Beneficiary Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#EA9000]">
                  <path d="M13.3333 17.5V15.8333C13.3333 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.884 12.5 10 12.5H5C4.11594 12.5 3.2681 12.8512 2.64298 13.4763C2.01786 14.1014 1.66667 14.9493 1.66667 15.8333V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.3333 17.5V15.8333C18.3333 15.0948 18.0999 14.3773 17.6666 13.7772C17.2334 13.1771 16.6204 12.7237 15.9166 12.4833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.3333 2.98333C14.0385 3.22319 14.6528 3.67705 15.0867 4.27818C15.5206 4.87931 15.7541 5.59845 15.7541 6.33833C15.7541 7.07821 15.5206 7.79735 15.0867 8.39848C14.6528 8.99961 14.0385 9.45347 13.3333 9.69333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#2C3E50]">Beneficiary Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Beneficiary Count <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.expectedBeneficiaryCount || ''}
                  onChange={(e) => setFormData({ ...formData, expectedBeneficiaryCount: Number(e.target.value) })}
                  placeholder="Enter number of beneficiaries"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Groups <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { key: 'women', label: 'Women' },
                    { key: 'youth', label: 'Youth (<35)' },
                    { key: 'scSt', label: 'SC/ST' },
                    { key: 'minorities', label: 'Minorities' },
                    { key: 'disabled', label: 'Disabled' },
                    { key: 'bplFamilies', label: 'BPL Families' },
                    { key: 'farmers', label: 'Farmers' },
                    { key: 'ruralPoor', label: 'Rural Poor' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.targetGroups[key as keyof typeof formData.targetGroups]}
                        onChange={(e) => setFormData({
                          ...formData,
                          targetGroups: { ...formData.targetGroups, [key]: e.target.checked }
                        })}
                        className="w-4 h-4 text-[#EA9000] border-gray-300 rounded focus:ring-[#EA9000]"
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Eligibility Criteria
                </label>
                <textarea
                  value={formData.eligibilityCriteria}
                  onChange={(e) => setFormData({ ...formData, eligibilityCriteria: e.target.value })}
                  placeholder="Describe the eligibility criteria for beneficiaries..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                />
              </div>
            </div>
          </div>

          {/* Project Blueprint */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#EA9000]">
                  <path d="M2.5 7.5L10 2.5L17.5 7.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 17.5V10H12.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#2C3E50]">Project Blueprint</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objective <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  placeholder="Describe the main objective of this proposal..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activities <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {formData.activities.map((activity, index) => (
                    <div key={activity.id} className="flex gap-2">
                      <input
                        type="text"
                        value={activity.description}
                        onChange={(e) => updateActivity(activity.id, e.target.value)}
                        placeholder={`Activity ${index + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                      />
                      <button
                        onClick={() => removeActivity(activity.id)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addActivity}
                    className="w-full px-4 py-2 text-sm font-medium text-[#EA9000] border border-[#EA9000] rounded-lg hover:bg-orange-50"
                  >
                    + Add Activity
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Outcomes
                </label>
                <textarea
                  value={formData.expectedOutcomes}
                  onChange={(e) => setFormData({ ...formData, expectedOutcomes: e.target.value })}
                  placeholder="Describe the expected outcomes and impact..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Implementation Partners
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'State Government',
                    'District Administration',
                    'Educational Institutions',
                    'NGOs',
                    'Community Organizations'
                  ].map((partner) => (
                    <label key={partner} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.implementationPartners.includes(partner as ImplementationPartner)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              implementationPartners: [...formData.implementationPartners, partner as ImplementationPartner]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              implementationPartners: formData.implementationPartners.filter(p => p !== partner)
                            });
                          }
                        }}
                        className="w-4 h-4 text-[#EA9000] border-gray-300 rounded focus:ring-[#EA9000]"
                      />
                      <span className="text-sm text-gray-700">{partner}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Implementation Timeline
                </label>
                <div className="space-y-2">
                  {formData.timeline.map((phase, index) => (
                    <div key={phase.id} className="flex gap-2 items-start">
                      <input
                        type="text"
                        value={phase.name}
                        onChange={(e) => updateTimelinePhase(phase.id, 'name', e.target.value)}
                        placeholder={`Phase ${index + 1} name`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                      />
                      <input
                        type="date"
                        value={phase.startDate}
                        onChange={(e) => updateTimelinePhase(phase.id, 'startDate', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                      />
                      <input
                        type="date"
                        value={phase.endDate}
                        onChange={(e) => updateTimelinePhase(phase.id, 'endDate', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                      />
                      <button
                        onClick={() => removeTimelinePhase(phase.id)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addTimelinePhase}
                    className="w-full px-4 py-2 text-sm font-medium text-[#EA9000] border border-[#EA9000] rounded-lg hover:bg-orange-50"
                  >
                    + Add Phase
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Convergence Needs
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.convergenceNeeds.mgnrega}
                      onChange={(e) => setFormData({
                        ...formData,
                        convergenceNeeds: { ...formData.convergenceNeeds, mgnrega: e.target.checked }
                      })}
                      className="w-4 h-4 text-[#EA9000] border-gray-300 rounded focus:ring-[#EA9000]"
                    />
                    <span className="text-sm text-gray-700">MGNREGA</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.convergenceNeeds.stateSkill}
                      onChange={(e) => setFormData({
                        ...formData,
                        convergenceNeeds: { ...formData.convergenceNeeds, stateSkill: e.target.checked }
                      })}
                      className="w-4 h-4 text-[#EA9000] border-gray-300 rounded focus:ring-[#EA9000]"
                    />
                    <span className="text-sm text-gray-700">State Skill Development</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.convergenceNeeds.others}
                      onChange={(e) => setFormData({
                        ...formData,
                        convergenceNeeds: { ...formData.convergenceNeeds, others: e.target.checked }
                      })}
                      className="w-4 h-4 text-[#EA9000] border-gray-300 rounded focus:ring-[#EA9000]"
                    />
                    <span className="text-sm text-gray-700">Others</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Breakup */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#EA9000]">
                  <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 5.83333V10L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 3.33333V1.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 18.3333V16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#2C3E50]">Budget Breakup</h2>
            </div>

            <div className="space-y-4">
              {errors.budgetLineItems && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{errors.budgetLineItems}</p>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount (₹)</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.budgetLineItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <select
                            value={item.category}
                            onChange={(e) => updateBudgetLineItem(item.id, 'category', e.target.value)}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                          >
                            <option value="Labour">Labour</option>
                            <option value="Material">Material</option>
                            <option value="Asset">Asset</option>
                            <option value="Training Fee">Training Fee</option>
                            <option value="Contingency">Contingency</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateBudgetLineItem(item.id, 'description', e.target.value)}
                            placeholder="Description"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={item.amount || ''}
                            onChange={(e) => updateBudgetLineItem(item.id, 'amount', Number(e.target.value))}
                            placeholder="0"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EA9000]"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => removeBudgetLineItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-semibold">
                      <td colSpan={2} className="py-3 px-4 text-right">Total Budget:</td>
                      <td className="py-3 px-4">₹{calculateTotalBudget().toLocaleString('en-IN')}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <button
                onClick={addBudgetLineItem}
                className="w-full px-4 py-2 text-sm font-medium text-[#EA9000] border border-[#EA9000] rounded-lg hover:bg-orange-50"
              >
                + Add Line Item
              </button>
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#EA9000]">
                  <path d="M10.8333 2.5H5C4.55797 2.5 4.13405 2.67559 3.82149 2.98816C3.50893 3.30072 3.33333 3.72464 3.33333 4.16667V15.8333C3.33333 16.2754 3.50893 16.6993 3.82149 17.0118C4.13405 17.3244 4.55797 17.5 5 17.5H15C15.442 17.5 15.866 17.3244 16.1785 17.0118C16.4911 16.6993 16.6667 16.2754 16.6667 15.8333V7.5L10.8333 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.8333 2.5V7.5H16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66667 10.8333L9.16667 13.3333L13.3333 9.16667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#2C3E50]">Supporting Documents</h2>
            </div>

            <div className="space-y-4">
              {errors.documents && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{errors.documents}</p>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#EA9000] transition-colors cursor-pointer">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.mp4,.mov"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#EA9000]">
                      <path d="M21.3333 21.3333L16 16L10.6667 21.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 16V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M27.7867 24.12C28.8643 23.4794 29.7117 22.5248 30.2121 21.3863C30.7124 20.2478 30.8416 18.9833 30.5818 17.7697C30.322 16.556 29.6863 15.4546 28.7616 14.6186C27.8369 13.7825 26.6701 13.2548 25.4267 13.1067C24.9164 11.1448 23.7536 9.40979 22.1226 8.18318C20.4916 6.95656 18.4838 6.30258 16.4267 6.32C14.3695 6.33742 12.3739 7.02646 10.7639 8.28404C9.15385 9.54163 8.01953 11.3003 7.54666 13.28C6.08289 13.4549 4.72779 14.116 3.69821 15.1577C2.66864 16.1994 2.02458 17.5619 1.87332 19.0267C1.72206 20.4915 2.07222 21.9661 2.86585 23.2067C3.65949 24.4473 4.8495 25.3832 6.22666 25.8667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21.3333 21.3333L16 16L10.6667 21.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium mb-1">
                    <span className="text-[#EA9000]">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-gray-500 text-sm">PDF, Images (JPG, PNG) or Video (max 100MB each)</p>
                </label>
              </div>

              {formData.documents.length > 0 && (
                <div className="space-y-2">
                  {formData.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                          {doc.type === 'pdf' && (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-red-500">
                              <path d="M11.6667 1.66667H5C4.55797 1.66667 4.13405 1.84226 3.82149 2.15482C3.50893 2.46738 3.33333 2.8913 3.33333 3.33333V16.6667C3.33333 17.1087 3.50893 17.5326 3.82149 17.8452C4.13405 18.1577 4.55797 18.3333 5 18.3333H15C15.442 18.3333 15.866 18.1577 16.1785 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V6.66667L11.6667 1.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M11.6667 1.66667V6.66667H16.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {doc.type === 'image' && (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-blue-500">
                              <rect x="2.5" y="2.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="7.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17.5 12.5L13.75 8.75L5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {doc.type === 'video' && (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-purple-500">
                              <path d="M18.3333 5L12.5 9.16667L18.3333 13.3333V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <rect x="1.66667" y="3.33333" width="10.8333" height="11.6667" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{doc.name}</p>
                          <p className="text-xs text-gray-500">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeDocument(doc.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Summary Panel */}
        <div className="w-96 space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles w-5 h-5 text-orange-600" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
              </div>
              <h2 className="text-xl font-semibold text-[#2C3E50]">AI Analysis</h2>
            </div>

            <button
              onClick={runPrecheck}
              disabled={isRunningPrecheck}
              className="w-full px-4 py-2.5 mb-4 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isRunningPrecheck ? 'Running Pre-Check...' : '🔍 Run Pre-Check'}
            </button>

            {!aiAnalysis.validation && !isRunningPrecheck && (
              <div className="text-center py-8 text-gray-500 text-sm">
                Click "Run Pre-Check" to validate your proposal and get AI recommendations
              </div>
            )}

            {isRunningPrecheck && (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Analyzing proposal...</p>
              </div>
            )}

            {aiAnalysis.validation && !isRunningPrecheck && (
              <div className="space-y-4">
                {/* Pre-Validation */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-700">Pre-Validation</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${aiAnalysis.validation.isValid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {aiAnalysis.validation.isValid ? 'Passed' : 'Review'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Completeness</span>
                      <span className="font-medium text-gray-900">{aiAnalysis.validation.completeness}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${aiAnalysis.validation.completeness}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Compliance</span>
                      <span className="font-medium text-gray-900">{aiAnalysis.validation.compliance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${aiAnalysis.validation.compliance}%` }}
                      ></div>
                    </div>
                  </div>
                  {aiAnalysis.validation.issues.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {aiAnalysis.validation.issues.map((issue, i) => (
                        <p key={i} className="text-xs text-red-600">⚠️ {issue}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Duplication Alert */}
                {aiAnalysis.duplication && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-700">Duplication Check</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${aiAnalysis.duplication.isDuplicate ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {aiAnalysis.duplication.isDuplicate ? 'Duplicate' : 'Unique'}
                      </span>
                    </div>
                    {aiAnalysis.duplication.possibleDuplicates.length > 0 && (
                      <div className="space-y-2 mt-3">
                        <p className="text-xs text-gray-600">Possible duplicates found:</p>
                        {aiAnalysis.duplication.possibleDuplicates.map((dup, i) => (
                          <div key={i} className="bg-yellow-50 rounded p-2 text-xs">
                            <p className="font-medium text-gray-700">{dup.proposalTitle}</p>
                            <p className="text-gray-600 mt-1">Similarity: {dup.similarity}%</p>
                            <p className="text-gray-500 mt-0.5">by {dup.submittedBy}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* AI Recommendations */}
                {aiAnalysis.recommendation && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-700">AI Recommendation</h3>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl">⭐</span>
                        <span className="text-lg font-bold text-gray-900">{aiAnalysis.recommendation.score}/100</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-green-700 mb-1">Strengths</p>
                        <ul className="space-y-1">
                          {aiAnalysis.recommendation.strengths.map((s, i) => (
                            <li key={i} className="text-xs text-gray-700 flex items-start gap-1">
                              <span className="text-green-500">✓</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-orange-700 mb-1">Improvements</p>
                        <ul className="space-y-1">
                          {aiAnalysis.recommendation.improvements.map((i, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                              <span className="text-orange-500">→</span>
                              <span>{i}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded p-2 mt-2">
                        <p className="text-xs text-gray-700">{aiAnalysis.recommendation.budgetAssessment}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
