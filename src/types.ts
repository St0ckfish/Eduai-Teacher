// src/types/advice.ts

export type Advice = {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export type PaginatedAdvices = {
  advices: Advice[];
  total: number;
  page: number;
  limit: number;
}

export type SignUpFormData = {
  username: string;
  email: string;
  schoolId: string;
  regionId: string;
  name_en: string;
  name_fr: string;
  name_ar: string;
  subjects: string[];
  qualification: string;
  password: string;
  about?: string;
  nationality: string;
  gender: string;
  nid: string;
  birthDate: string;
  countryCode: string;
  number: string;
}