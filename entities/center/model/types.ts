export interface CounselCenter {
  id: string;
  name: string;
  address: string;
  distanceM: number;
  tags: string[];
  hours: string;
  phone: string;
}

export interface EmergencyHotline {
  id: string;
  number: string;
  label?: string;
}
