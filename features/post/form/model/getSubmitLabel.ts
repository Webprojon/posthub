import type { PostFormMode } from "./types";

export function getSubmitLabel(mode: PostFormMode, isSubmitting: boolean) {
  if (mode === "create") {
    return isSubmitting ? "Creating..." : "Create Post";
  }

  return isSubmitting ? "Updating..." : "Update Post";
}
