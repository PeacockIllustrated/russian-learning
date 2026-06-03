import { redirect } from "next/navigation";

// the bare /lesson opens unit 1, lesson 1
export default function LessonIndex() {
  redirect("/lesson/1/1");
}
