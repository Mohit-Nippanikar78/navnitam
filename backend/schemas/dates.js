export default {
  name: "dates",
  title: "Dates",
  type: "document",
  fields: [
     
      { name: "date", title: "Date", type: "date",options:{dateFormar:"YYYY-MM-DD"} },
      { name:"time",title:"Time",type:"array",of:[{type:"datesTime"}]}
  ],
};
