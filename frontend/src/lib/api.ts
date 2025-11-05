const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

// FIX: The 'export' keyword MUST be here
export interface Patient {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob?: string;
  gender?: 'MALE' | 'FEMALE';
  createdAt?: string;
  updatedAt?: string;
}

// FIX: The 'export' keyword MUST be here
export interface Doctor {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialty: string;
  rpps?: string;
  clinicAddress?: string;
  createdAt?: string;
  updatedAt?: string;
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP ${response.status}`);
  }

  const text = await response.text();
  // Return the parsed JSON if text exists, otherwise return an empty object
  // This handles DELETE requests that might not return a body
  return text ? JSON.parse(text) : ({} as T);
}

// Patient API
export const patientApi = {
  getAll: () => fetchApi<Patient[]>('/api/patients'),
  getOne: (id: string) => fetchApi<Patient>(`/api/patients/${id}`),
  create: (data: Patient) => fetchApi<Patient>('/api/patients', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Patient) => fetchApi<Patient>(`/api/patients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchApi<void>(`/api/patients/${id}`, { method: 'DELETE' }),
};

// Doctor API
export const doctorApi = {
  getAll: () => fetchApi<Doctor[]>('/api/doctors'),
  getOne: (id: string) => fetchApi<Doctor>(`/api/doctors/${id}`),
  create: (data: Doctor) => fetchApi<Doctor>('/api/doctors', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Doctor) => fetchApi<Doctor>(`/api/doctors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchApi<void>(`/api/doctors/${id}`, { method: 'DELETE' }),
};