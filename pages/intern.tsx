import { storage } from "../firebase";
import Input from "../src/frontend/components/Input";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import React from "react";
import { useState, ChangeEvent } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { ValidationErrors } from "../src/Resources";
import AddNews from "../src/frontend/components/AddNews";

export default function Intern() {
  return <AddNews />;
}
