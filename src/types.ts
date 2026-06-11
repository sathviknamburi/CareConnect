export interface PatientRequest {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  phoneNumber: string;
  email: string;
  healthConcern: string;
  supportNeeded: 'Medical Assistance' | 'Financial Aid' | 'Diagnostics' | 'Medicines' | 'Other';
  additionalNotes?: string;
  createdAt: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Assigned' | 'Resolved';
  assignedVolunteerId?: string;
  aiSummary: string;
  aiRecommendation: string;
}

export interface VolunteerRegistration {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  skills: string[]; // e.g., ['Medical', 'Counseling', 'Administrative', 'Event Management', 'Other']
  availability: 'Weekdays' | 'Weekends' | 'Both';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
}
