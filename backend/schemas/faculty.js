export default {
  name: "faculty",
  title: "Faculty",
  type: "document",
  fields: [
    { name: "faculty", title: "Faculty", type: "string" },
    {
      name: "verified",
      title: "verified",
      type: "boolean",
      initialValue: "false",
    },
  ],
};
