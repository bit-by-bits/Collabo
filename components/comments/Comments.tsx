import { Suspense } from "react";
import { CommentsOverlay } from "@/components/comments/CommentsOverlay";

export const Comments = () => (
  <Suspense fallback={null}>
    <CommentsOverlay />
  </Suspense>
);
