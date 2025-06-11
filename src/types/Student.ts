interface Student {
    allowRetake: boolean;
    courseId: number | null | undefined;
    courseName: string | null | undefined;
    courseRevisionId: number | null | undefined;
    creationDate: string;
    isCourseCompleted: boolean | null | undefined;
    isActive: boolean;
    isSelfStudy: boolean | null | undefined;
    lessonCount: number | null | undefined;
    nextLessonId: number | null | undefined;
    nextLessonName: string | null | undefined;
    studentAvatarUrl: string;
    studentId: number;
    studentLastActive: string;
    submitted: number | null | undefined;
    studentName: string;
}

export default Student;
