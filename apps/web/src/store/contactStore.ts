import { create } from 'zustand';
import { apiUrl } from '@/lib/api';

export interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface ContactState {
  submissions: Submission[];
  isSubmitted: boolean;
  fetchAll: () => Promise<void>;
  submitForm: (data: Omit<Submission, 'id' | 'createdAt'>) => Promise<void>;
  resetSubmissionState: () => void;
  clearSubmissions: () => void;
  // Fallbacks for compatibility
  addSubmission: (data: Omit<Submission, 'id' | 'createdAt'>) => Promise<void>;
  submitInquiry: (data: Omit<Submission, 'id' | 'createdAt'>) => Promise<void>;
  addContact: (data: Omit<Submission, 'id' | 'createdAt'>) => Promise<void>;
}

export const useContactStore = create<ContactState>()((set, get) => ({
  submissions: [],
  isSubmitted: false,
  fetchAll: async () => {
    try {
      const res = await fetch(apiUrl('/api/contacts'));
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      set({ submissions: data.map((d: any) => ({ ...d, id: d._id || d.id })) });
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  },
  submitForm: async (data) => {
    try {
      const res = await fetch(apiUrl('/api/contacts'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to create');
      const created = await res.json();
      const mapped = { ...created, id: created._id || created.id };
      set((state) => ({
        submissions: [...state.submissions, mapped],
        isSubmitted: true,
      }));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  },
  addSubmission: async (data) => get().submitForm(data),
  submitInquiry: async (data) => get().submitForm(data),
  addContact: async (data) => get().submitForm(data),
  resetSubmissionState: () => set({ isSubmitted: false }),
  clearSubmissions: () => set({ submissions: [] })
}));