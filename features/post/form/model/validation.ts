import type { RegisterOptions } from "react-hook-form";
import type { PostFormData } from "./types";

export const postTitleValidation: RegisterOptions<PostFormData, "title"> = {
  required: "Title is required",
  minLength: {
    value: 3,
    message: "Title must be at least 3 characters",
  },
  maxLength: {
    value: 200,
    message: "Title must not exceed 200 characters",
  },
};

export const postBodyValidation: RegisterOptions<PostFormData, "body"> = {
  required: "Content is required",
  minLength: {
    value: 10,
    message: "Content must be at least 10 characters",
  },
  maxLength: {
    value: 5000,
    message: "Content must not exceed 5000 characters",
  },
};
