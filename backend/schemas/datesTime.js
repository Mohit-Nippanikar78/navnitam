export default {
  name: "datesTime",
  title: "DatesTime",
  type: "document",
  fields: [
    {
      name: "timing",
      title: "Timing",
      type: "string",
    },

    {
      name: "subject",
      title: "Subject",
      type: "array",
      of: [{ type: "classStudents" }],
    },
  ],
};
