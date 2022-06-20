// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import Student from "./student";
import Admin from "./admin";
import Subject from "./subject";
import Assignment from "./assignment";
import Dates from "./dates";
import DatesTime from "./datesTime";
import ClassStudents from "./classStudents";
import ExamSubject from "./examSubject";
import Terms from "./terms";
import StudentMarks from "./studentMarks";
import NotesChapters from "./notesChapters";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    Admin,
    Student,
    ClassStudents,
    Subject,
    Assignment,
    NotesChapters,
   
    Dates,
    DatesTime,ExamSubject,Terms,StudentMarks,
  ]),
});
