export default {
  name: "admin",
  title: "Admin",
  type: "document",
  fields: [
    {
      name: "class",
      title: "Class",
      type: "string",
    },
    {
      name: "crName",
      title: "CrName",
      type: "string",
    },
    {
      name: "classTr",
      title: "ClassTr",
      type: "string",
    },

    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      name: "rollNo",
      title: "Roll Number",
      type: "string",
    },
    {
      name: "students",
      title: "Students",

      type: "array",
      of: [{ type: "classStudents" }],
    },
    {
      name: "pendingStudents",
      title: "Pending Students",

      type: "array",
      of: [{ type: "classStudents" }],
    },
    {
      name: "subject",
      title: "Subject",
      type: "array",
      of: [{ type: "subject" }],
    },
    {
      name: "attendance",
      title: "Attendence",
      type: "array",
      of: [{ type: "dates" }],
    },
    { name: "marks", title: "Marks", type: "array", of: [{ type: "terms" }] },
    {
      name: "classNotices",
      title: "Class Notices",
      type: "array",
      of: [{ type: "noticeInfo" }],
    },
  ],
};
