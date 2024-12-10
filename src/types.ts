export type Advice = {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedAdvices = {
  advices: Advice[];
  total: number;
  page: number;
  limit: number;
};

//

export interface TeacherSchedule {
  id: number;
  teacherCourseRegistrationId: number;
  courseName: string;
  classroomName: string;
  startTime: string;
  endTime: string;
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
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
};

export type HomeWorkFormData = {
  title: string;
  description: string;
  deadline: string;
  sessionId: string;
};

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
};

// Homework item interface
export type Homework = {
  id: number;
  title: string;
  description: string;
  deadline: string; // Consider using Date if you're parsing the date
};

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
};

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
  data: { content: Lesson[] };
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
};

export type StudyStageResponse = {
  success: boolean;
  message: string;
  data: StudyStage[];
};

export type StudyStage = {
  studyLevel: string;
  courseId: number;
};

export interface LessonTopic {
  topicId: number;
  topicName: string;
  hasFile: boolean;
  fileLink: string | null;
  videoUrls: string[];
}

export interface LessonTopicResponse {
  success: boolean;
  message: string;
  data: {
    content: LessonTopic[];
    totalElementsCount: number;
    totalPagesCount: number;
    pageElementsCount: number;
    pageSize: number;
    pageNumber: number;
    firstPage: boolean;
    lastPage: boolean;
    emptyPage: boolean;
    sortedPage: boolean;
  };
}


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
  PRESENT = "PRESENT"
  // Add other potential statuses if needed
}

export type AbsenceReason = 'OTHER';

// Type for individual session attendance record
export type SessionAttendanceRecord = {
    studentId: number;
    studentName: string;
    sessionStatus: AttendanceStatus;
    absenceReason: AbsenceReason | null;
};

// Type for the full API response
export type SessionAttendanceResponse = {
    success: boolean;
    message: string;
    data: SessionAttendanceRecord[];
};

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

export type Attachment = {
  id: string;
  viewLink: string;
  downloadLink: string;
  isVideo: boolean;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  publisherName: string;
  publisherPicture: string;
  creationDate: string;
  updateDate: string;
  isPublisherPictureExists: boolean;
  isLiked: boolean;
  isEdited: boolean;
  likesCount: number;
  attachmentsCount: number;
  commentsCount: number;
  attachments: Attachment[];
};

export type PostResponse = {
  success: boolean;
  message: string;
  data: {
    content: Post[];
    totalElementsCount: number;
    totalPagesCount: number;
    pageElementsCount: number;
    pageSize: number;
    pageNumber: number;
    firstPage: boolean;
    lastPage: boolean;
    emptyPage: boolean;
    sortedPage: boolean;
  };
};

export type SinglePostResponse = {
  success: boolean;
  message: string;
  data: Post;
};
// Comment

export interface CommentsResponse {
  success: boolean;
  message: string;
  data: {
    content: Comment[];
    totalElementsCount: number;
    totalPagesCount: number;
    pageElementsCount: number;
    pageSize: number;
    pageNumber: number;
    firstPage: boolean;
    lastPage: boolean;
    emptyPage: boolean;
    sortedPage: boolean;
  };
}

export interface Comment {
  id: number;
  postId: number;
  comment: string;
  creatorName: string;
  creatorPicture: string;
  createdDate: string;
  updatedDate: string;
  isCreatorPictureExists: boolean;
  isEdited: boolean;
  isLiked: boolean;
  likesCount: number;
}

export interface PostCommentRequest {
  comment: string;
}

/** Teacher Profile */

export type TeacherProfile = {
  success: boolean;
  message: string;
  data: {
    id: number;
    username: string;
    email: string;
    picture: string;
    hasPicture: boolean;
    nid: string;
    gender: string;
    role: string;
    nationality: string;
    religion: string;
    birthDate: string | null;
    regionId: number;
    number: string;
    name: string;
    about: string;
    qualification: string;
    enabled: boolean;
    locked: boolean;
    authorities: string[];
    address: string | null;
    subjects: string[];
  };
};

export type TeacherProfileUpdate = {
  username: string;
  email: string;
  name_en: string;
  name_fr: string;
  name_ar: string;
  number?: string;
  gender: "MALE" | "FEMALE";
  nationality: string;
  qualification?: string;
  subjects: string[];
};

// password

export type ChangePassword = {
  password: string;
  newPassword: string;
};

export type SessionMaterial = {
  materialId: number;
  title: string;
  description: string;
  fileId: string | null;
  fileName: string | null;
  fileExtension: string | null;
  fileLink: string | null;
};

// Type for the full API response
export type SessionMaterialResponse = {
  success: boolean;
  message: string;
  data: SessionMaterial[];
};

export type SessionExplainedItem = {
  id: number;
  topicId: number;
  topicName: string;
  description: string;
};

// Type for the full API response
export type SessionExplainedResponse = {
  success: boolean;
  message: string;
  data: SessionExplainedItem[];
};

export type ComplaintType = 'Teacher to student' | 'Parent to teacher';

// Type for individual complaint
export type Complaint = {
    id: number;
    subject: string;
    message: string;
    deleted: boolean;
    approved: boolean;
    type: ComplaintType;
    creationDateTime: string;
    updateDateTime: string;
    teacherId: number;
    teacherName: string;
    studentId: number;
    studentName: string;
    isVoiceNoteExists: boolean;
    viewVoiceNoteLink: string;
    downloadVoiceNoteLink: string;
};

// Type for the full API response
export type ComplainsResponse = {
    success: boolean;
    message: string;
    data: {
        content: Complaint[];
        totalElementsCount: number;
        totalPagesCount: number;
        pageElementsCount: number;
        pageSize: number;
        pageNumber: number;
        firstPage: boolean;
        lastPage: boolean;
        emptyPage: boolean;
        sortedPage: boolean;
    };
};

// Material 

export type Material = {
  sessionId: string;
  title: string;
  description: string;
  file: File;
};

export type LessonSessionData = {
  sessionId: number;
  courseId: number;
  courseName: string;
  classroomCode: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type LessonSessionResponse = {
  success: boolean;
  message: string;
  data: LessonSessionData;
};

// complaint

export type ComplaintResponse = {
    studentId: number,
    subject: string,
    message: string,
    file?: File
}

// Student

export type Student = {
  studentId: number;
  studentName: string;
  studyLevel: string;
  hasPhoto: boolean;
  photoLink: string | null;
  chatId: string | null;
  score?: number;
  passed?: boolean;
};

export type StudentsResponse = {
  success: boolean;
  message: string;
  data: {
    content: Student[];
    totalElementsCount: number;
    totalPagesCount: number;
    pageElementsCount: number;
    pageSize: number;
    pageNumber: number;
    firstPage: boolean;
    lastPage: boolean;
    emptyPage: boolean;
    sortedPage: boolean;
  };
};

export type StudentsWithGradesResponse = {
  success: boolean;
  message: string;
  data: {
    students: Student[];
    finalScore: number;
  };
};

// Events

export type EventAttendee = {
  id: number; 
};

export type Event = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isAttendee: boolean;
  attendees: EventAttendee[]; 
};

export type EventsResponse = {
  success: boolean;
  message: string;
  data: {
    content: Event[];
    totalElementsCount: number;
    totalPagesCount: number;
    pageElementsCount: number;
    pageSize: number;
    pageNumber: number;
    firstPage: boolean;
    lastPage: boolean;
    emptyPage: boolean;
    sortedPage: boolean;
  };
};

export type CustomEvent = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isAttendee: boolean;
  attendees: any[];
};


export type BankAccount = {
  id: number;
  createdDate: string;
  updatedDate: string;
  bankName: string;
  bankShortName: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
  beneficiaryAccountNumber: string;
};

export type BankAccountResponse = {
  success: boolean;
  message: string;
  data: {
      content: BankAccount[];
      totalElementsCount: number;
      totalPagesCount: number;
      pageElementsCount: number;
      pageSize: number;
      pageNumber: number;
      firstPage: boolean;
      lastPage: boolean;
      emptyPage: boolean;
      sortedPage: boolean;
  };
};

export type BankAccountFormData = {
  request: {
    invoiceId: number;
    bankAccountId: number;
    receiptNumber: string;
    amount: number;
    depositDate: string;
  };
  file: File | null;
}

export type ExamFormData = {
  name: string;
  examDate: string;
  examBeginning: string;
  examEnding: string;
  teacherId: number;
  courseId: number;
  classroomId: number;
  examTypeId: number;
}


export type ExamResult = {
  id: number;
  examId: number;
  studentId: number;
  studentName: string;
  status: "PASSED" | "FAILED"; 
  score: number;
  scoreDate: string;
}

export type ExamResultsResponse = ExamResult[];
