export default {
  name: "subject",
  title: "Subject",
  type: "document",
  fields: [
    {
      name: "subName",
      title: "Subject Name",
      type: "string",
    },
    {
      name: "subId",
      title: "Subject Id",
      type: "string",
    },
    {
      name: "subTr",
      title: "Subject Teacher",
      type: "string",
    },
    {
      name: "subTr",
      title: "Subject Teacher",
      type: "string",
    },

    {
      name: "assignments",
      title: "assignments",
      type: "array",
      of: [{ type: "assignment" }],
    },
  ],
};
