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

//

export interface TeacherSchedule {
  id: number;
  teacherCourseRegistrationId: number;
  courseName: string;
  classroomName: string;
  startTime: string;
  endTime: string;
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
}

export interface TeacherScheduleResponse {
  success: boolean;
  message: string;
  data: TeacherSchedule[];
}

//

// Root response interface
export type HomeworkResponse = {
  success: boolean;
  message: string;
  data: PaginationData<Homework>;
}

export type HomeWorkFormData = {
  title: string;
  description: string;
  deadline: string;
  sessionId: string;
}

// Generic pagination data interface
export type PaginationData<T> = {
  content: T[];
  totalElementsCount: number;
  totalPagesCount: number;
  pageElementsCount: number;
  pageSize: number;
  pageNumber: number;
  firstPage: boolean;
  lastPage: boolean;
  emptyPage: boolean;
  sortedPage: boolean;
}

// Homework item interface
export type Homework = {
  id: number;
  title: string;
  description: string;
  deadline: string; // Consider using Date if you're parsing the date
}


//

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

/** TextBook **/
export type SubjectSummaryResponse = {
  success: boolean;
  message: string;
  data: SubjectSummary[];
};

export type SubjectSummary = {
  subject: string;
  numberOfGrades: number;
};

export type LessonPageResponse = {
  success: boolean;
  message: string;
  data: {content: Lesson[];};
};

export type Lesson = {
  lessonId: number;
  lessonName: string;
};

export type LessonPageData = {
  content: Lesson[];
  totalElementsCount: number;
  totalPagesCount: number;
  pageElementsCount: number;
  pageSize: number;
  pageNumber: number;
  firstPage: boolean;
  lastPage: boolean;
  emptyPage: boolean;
  sortedPage: boolean;
}

export type StudyStageResponse = {
  success: boolean;
  message: string;
  data: StudyStage[];
};

export type StudyStage = {
  studyLevel: string;
  courseId: number;
};

/** Fess **/

export type Fee = {
  invoiceId: number;
  semesterName: string;
  creationDate: string;
  updateDate: string;
  dueDate: string;
  paidAmount: number;
  totalFeesAmount: number;
  feesCurrency: string;
  paymentStatus: string;
  discountAmount: number;
};

// Type for the full API response
export type FeesResponse = {
  success: boolean;
  message: string;
  data: Fee[];
};

export type Exam = {
  id: number;
  examDate: string;
  examBeginning: string;
  examEnding: string;
  examName: string;
  courseName: string;
  className: string;
  examTypeName: string;
  examLegalTypeName: string;
};

// Type for the exam list response
export type ExamListResponse = Exam[];

export type Upcoming_Previous_Exams = {
  success: boolean;
  message: string;
  data: Fee[];
};

export enum AttendanceStatus {
  ABSENT = "ABSENT",
  // Add other potential statuses if needed
}

// Enum for day names
export enum DayName {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY", 
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}

// Interface for individual attendance record
export type AttendanceRecord = {
  checkInTime: string;
  checkOutTime: string;
  status: AttendanceStatus;
  date: string;
  dayName: DayName;
}

// Interface for the full attendance API response
export type AttendanceResponse = {
  success: boolean;
  message: string;
  data: {
    content: AttendanceRecord[];
    totalElementsCount: number;
    totalPagesCount: number;
    pageElementsCount: number;
    pageSize: number;
    pageNumber: number;
    firstPage: boolean;
    lastPage: boolean;
    emptyPage: boolean;
    sortedPage: boolean;
  }
}

export type AttendanceNumbersResponse = {
  success: boolean;
  message: string;
  data: {
    totalAbsent: number;
    totalEarlyDeparture: number;
    totalPresent: number;
    totalLeaveDays: number;
  }
}

export type LeaveRecord ={
  leaveBalance: number;
  applyDays: number;
  startDate: string;
  endDate: string;
}

// Interface for the full leave attendance API response
export type LeaveAttendanceResponse = {
  success: boolean;
  message: string;
  data: {
    content: LeaveRecord[];
    totalElementsCount: number;
    totalPagesCount: number;
    pageElementsCount: number;
    pageSize: number;
    pageNumber: number;
    firstPage: boolean;
    lastPage: boolean;
    emptyPage: boolean;
    sortedPage: boolean;
  }
}