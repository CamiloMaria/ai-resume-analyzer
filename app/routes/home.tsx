import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Smart Resume Analyzer for Job Seekers" },
  ];
}

export default function Home() {
  return <main>
    <h1>Resume Analyzer</h1>
    <p>Smart Resume Analyzer for Job Seekers</p>
  </main>
}
