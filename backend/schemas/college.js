export default {
  name: "college",
  title: "College",
  type: "document",
  fields: [
    {
      name: "allNotices",
      title: "All Notices",
      type: "array",
      of: [{ type: "noticeInfo" }],
    },
    {
      name: "students",
      title: "Students",

      type: "array",
      of: [{ type: "classStudents" }],
    },
    {
      name: "class",
      title: "Class",

      type: "array",
      of: [{ type: "admin" }],
    },
  ],
};
