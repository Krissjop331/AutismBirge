import { useCallback, useEffect, useState } from "react";
import { createVisit } from "../http/visitApi";
export const useVisit = (path) => {
  useEffect(() => {
    createVisit(path);
  }, [path]);
};
