import React from "react";
import { CircularProgress } from "@nextui-org/react";
import styles from "./skeleton.module.css";

export default function Skeleton() {
  return (
    <div className="container">
      <CircularProgress label="Loading..." />
    </div>
  );
}
