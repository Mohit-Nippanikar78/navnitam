export default {
  name: "terms",
  title: "Terms",
  type: "document",
  fields: [
    {
      name: "termName",
      title: "TermName",
      type: "string",
      initialValue: "Unit-1",
    },
    {
      name: "examSubjects",
      title: "ExamSubjects",
      type: "array",
      of: [{ type: "examSubject" }],
    },
  ],
};
