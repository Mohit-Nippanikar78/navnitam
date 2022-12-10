import axios from "axios";
import Exception from "Elements/Exception";
import Spinner from "Elements/Spinner";
import React, { useEffect, useState } from "react";
import { MdPhotoLibrary, MdPictureAsPdf } from "react-icons/md";
import { SiJpeg } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "utils";
import NotesFiles from "../Files/NotesFiles";

const NotesFolder = () => {
  let { folderId } = useParams();

  return <NotesFiles folderId={folderId} />;
};

export default NotesFolder;
