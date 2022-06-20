export default {
  name: "examSubject",
  title: "ExamSubject",
  type: "document",
  fields: [
    { name: "subjectName", title: "SubjectName", type: "string" },

    {
      name: "student",
      title: "Student",
      type: "array",
      of: [{ type: "studentMarks" }],
    },
  ],
};
