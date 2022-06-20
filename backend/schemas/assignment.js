export default {
  name: "assignment",
  title: "Assignemnt",
  type: "document",
  fields: [
    {
      name: "assignmentName",
      title: "AssignmentName",
      type: "string",
    },
    {
      name: "assignmentNo",
      title: "AssignmentNo",
      type: "string",
    },

    {
      name: "students",
      title: "Students",
      type: "array",
      of:[{type:"classStudents"}]
    },
  ],
};
