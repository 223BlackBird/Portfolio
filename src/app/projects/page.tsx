import { redirect } from "next/navigation";

export default function ProjectsPage() {
  // Professional work and engineering projects live unified under /work
  redirect("/work");
}
