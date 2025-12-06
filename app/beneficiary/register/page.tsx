"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';

interface FormData {
  beneficiaryName: string;
  aadhaar: string;
  mobile: string;
  bankAccount: string;
  ifsc: string;
  projectId: string;
  aadhaarDoc?: File;
  casteCertificate?: File;
}

export default function RegisterBeneficiaryPage() {
  const [formData, setFormData] = useState<FormData>({
    beneficiaryName: '',
    aadhaar: '',
    mobile: '',
    bankAccount: '',
    ifsc: '',
    projectId: '',
  });

  const [validation, setValidation] = useState({
    aadhaar: { validated: false, loading: false, message: '' },
    bank: { validated: false, loading: false, message: '' },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Mask Aadhaar - show only last 4 digits
  const maskAadhaar = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) return numbers;
    return 'XXXX-XXXX-' + numbers.slice(-4);
  };

  // Mask Bank Account - show only last 4 digits
  const maskBankAccount = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) return numbers;
    return 'XXXX-XXXX-' + numbers.slice(-4);
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 12);
    setFormData({ ...formData, aadhaar: value });
    setValidation(prev => ({ ...prev, aadhaar: { validated: false, loading: false, message: '' } }));
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, mobile: value });
  };

  const handleBankAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setFormData({ ...formData, bankAccount: value });
    setValidation(prev => ({ ...prev, bank: { validated: false, loading: false, message: '' } }));
  };

  const handleValidateAadhaar = async () => {
    if (formData.aadhaar.length !== 12) {
      setValidation(prev => ({
        ...prev,
        aadhaar: { validated: false, loading: false, message: 'Aadhaar must be 12 digits' }
      }));
      return;
    }

    setValidation(prev => ({ ...prev, aadhaar: { ...prev.aadhaar, loading: true } }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation (in real app, call API)
    const isValid = formData.aadhaar.length === 12;
    setValidation(prev => ({
      ...prev,
      aadhaar: {
        validated: isValid,
        loading: false,
        message: isValid ? 'Aadhaar verified successfully' : 'Invalid Aadhaar number'
      }
    }));
  };

  const handleValidateBank = async () => {
    if (!formData.bankAccount || !formData.ifsc) {
      setValidation(prev => ({
        ...prev,
        bank: { validated: false, loading: false, message: 'Please enter both account number and IFSC' }
      }));
      return;
    }

    if (formData.ifsc.length !== 11) {
      setValidation(prev => ({
        ...prev,
        bank: { validated: false, loading: false, message: 'IFSC must be 11 characters' }
      }));
      return;
    }

    setValidation(prev => ({ ...prev, bank: { ...prev.bank, loading: true } }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation
    const isValid = formData.bankAccount.length >= 9 && formData.ifsc.length === 11;
    setValidation(prev => ({
      ...prev,
      bank: {
        validated: isValid,
        loading: false,
        message: isValid ? 'Bank details verified successfully' : 'Invalid bank details'
      }
    }));
  };

  const handleFileChange = (field: 'aadhaarDoc' | 'casteCertificate', file: File | undefined) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation checks
    if (!validation.aadhaar.validated) {
      setSubmitMessage({ type: 'error', text: 'Please validate Aadhaar before submitting' });
      return;
    }

    if (!validation.bank.validated) {
      setSubmitMessage({ type: 'error', text: 'Please validate bank details before submitting' });
      return;
    }

    if (!formData.casteCertificate) {
      setSubmitMessage({ type: 'error', text: 'Please upload caste certificate' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock success
    setSubmitMessage({ type: 'success', text: 'Beneficiary registered successfully! ID: BEN-2024-' + Math.floor(Math.random() * 10000) });
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        beneficiaryName: '',
        aadhaar: '',
        mobile: '',
        bankAccount: '',
        ifsc: '',
        projectId: '',
      });
      setValidation({
        aadhaar: { validated: false, loading: false, message: '' },
        bank: { validated: false, loading: false, message: '' },
      });
      setSubmitMessage(null);
    }, 3000);
  };

  const projects = [
    { id: 'PROJ-001', name: 'Rural Infrastructure Development - Maharashtra' },
    { id: 'PROJ-002', name: 'Skill Development Initiative - Pune' },
    { id: 'PROJ-003', name: 'Water Supply Enhancement - Nashik' },
    { id: 'PROJ-004', name: 'Urban Housing Scheme - Mumbai' },
  ];

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-[#2C3E50]">Register Beneficiary</h1>
          <p className="text-gray-600 mt-1">Add new beneficiaries to projects</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8">
              {/* Success/Error Message */}
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <p className="text-sm font-medium">{submitMessage.text}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Beneficiary Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Beneficiary Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.beneficiaryName}
                    onChange={(e) => setFormData({ ...formData, beneficiaryName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA9000] focus:border-transparent"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Aadhaar */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={formData.aadhaar.length > 0 ? maskAadhaar(formData.aadhaar) : ''}
                      onChange={handleAadhaarChange}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA9000] focus:border-transparent"
                      placeholder="XXXX-XXXX-1234"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleValidateAadhaar}
                      disabled={validation.aadhaar.loading || formData.aadhaar.length !== 12}
                      className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {validation.aadhaar.loading ? 'Validating...' : 'Validate Aadhaar'}
                    </button>
                  </div>
                  {validation.aadhaar.message && (
                    <p className={`text-sm mt-2 ${validation.aadhaar.validated ? 'text-green-600' : 'text-red-600'}`}>
                      {validation.aadhaar.validated && '✓ '}{validation.aadhaar.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">12-digit Aadhaar number (masked for security)</p>
                </div>

                {/* Aadhaar Document Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Aadhaar Document (optional)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('aadhaarDoc', e.target.files?.[0])}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA9000] focus:border-transparent"
                  />
                  {formData.aadhaarDoc && (
                    <p className="text-sm text-green-600 mt-2">✓ {formData.aadhaarDoc.name}</p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={handleMobileChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA9000] focus:border-transparent"
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">10-digit mobile number</p>
                </div>

                {/* Bank Account & IFSC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bank Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.bankAccount.length > 0 ? maskBankAccount(formData.bankAccount) : ''}
                      onChange={handleBankAccountChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA9000] focus:border-transparent"
                      placeholder="XXXX-XXXX-1234"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.ifsc}
                      onChange={(e) => setFormData({ ...formData, ifsc: e.target.value.toUpperCase().slice(0, 11) })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA9000] focus:border-transparent"
                      placeholder="SBIN0001234"
                      pattern="[A-Z]{4}0[A-Z0-9]{6}"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleValidateBank}
                  disabled={validation.bank.loading || !formData.bankAccount || !formData.ifsc}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {validation.bank.loading ? 'Validating...' : 'Validate Bank Details'}
                </button>

                {validation.bank.message && (
                  <p className={`text-sm ${validation.bank.validated ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.bank.validated && '✓ '}{validation.bank.message}
                  </p>
                )}

                {/* Caste Certificate */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Caste Certificate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('casteCertificate', e.target.files?.[0])}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA9000] focus:border-transparent"
                    required
                  />
                  {formData.casteCertificate && (
                    <p className="text-sm text-green-600 mt-2">✓ {formData.casteCertificate.name}</p>
                  )}
                </div>

                {/* Project Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project to Enroll <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA9000] focus:border-transparent"
                    required
                  >
                    <option value="">Select a project</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !validation.aadhaar.validated || !validation.bank.validated}
                    className="px-6 py-2.5 bg-[#EA9000] text-white rounded-lg hover:bg-[#d88000] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Registering...' : 'Save & Register'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
