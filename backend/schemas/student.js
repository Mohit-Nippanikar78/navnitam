export default {
  name: "student",
  title: "Student",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
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
      name: "verified",
      title: "Verified",
      type: "boolean",
      initialValue: false,
    }
  ],
};
