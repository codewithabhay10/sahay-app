// Mock user database and authentication utilities
export type UserRole = 'ministry' | 'state' | 'ia' | 'pacc' | 'sna' | 'beneficiary';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  stateId?: string; // For state users
  iaId?: string; // For IA users
}

// Mock user database (will be replaced with backend API)
const mockUsers: Record<string, { password: string; user: User }> = {
  'ministry@gov.in': {
    password: 'ministry123',
    user: {
      id: '1',
      email: 'ministry@gov.in',
      name: 'Ministry Officer',
      role: 'ministry'
    }
  },
  'state.mh@gov.in': {
    password: 'state123',
    user: {
      id: '2',
      email: 'state.mh@gov.in',
      name: 'Maharashtra State Officer',
      role: 'state',
      stateId: 'MH'
    }
  },
  'ia.pune@gov.in': {
    password: 'ia123',
    user: {
      id: '3',
      email: 'ia.pune@gov.in',
      name: 'Pune IA Officer',
      role: 'ia',
      iaId: 'IA001'
    }
  },
  'pacc@gov.in': {
    password: 'pacc123',
    user: {
      id: '4',
      email: 'pacc@gov.in',
      name: 'PACC Member',
      role: 'pacc'
    }
  },
  'sna@gov.in': {
    password: 'sna123',
    user: {
      id: '5',
      email: 'sna@gov.in',
      name: 'SNA User',
      role: 'sna'
    }
  },
  'beneficiary@gov.in': {
    password: 'beneficiary123',
    user: {
      id: '6',
      email: 'beneficiary@gov.in',
      name: 'Beneficiary',
      role: 'beneficiary'
    }
  }
};

const AUTH_STORAGE_KEY = 'sahay_auth_user';

// Authentication functions
export async function login(email: string, password: string): Promise<User> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const userRecord = mockUsers[email.toLowerCase()];
  
  if (!userRecord || userRecord.password !== password) {
    throw new Error('Invalid email or password');
  }

  // Store user in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userRecord.user));
  }

  return userRecord.user;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const userJson = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!userJson) {
    return null;
  }

  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

// Get dashboard route based on user role
export function getDashboardRoute(user: User): string {
  switch (user.role) {
    case 'ministry':
      return '/dashboard/central';
    case 'state':
      return `/dashboard/state/${user.stateId || 'MH'}`;
    case 'ia':
      return `/dashboard/ia/${user.iaId || 'IA001'}`;
    case 'pacc':
      return '/pacc';
    case 'sna':
      return '/sna';
    case 'beneficiary':
      return '/beneficiary';
    default:
      return '/';
  }
}
