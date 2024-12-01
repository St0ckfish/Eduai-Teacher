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

/** Posts */

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
