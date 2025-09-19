import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Smart Resume Analyzer for Job Seekers" },
  ];
}

export default function Home() {
  const { kv } = usePuterStore()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loadingResumes, setLoadingResumes] = useState(false)

  useEffect(() => {
    const fetchResumes = async () => {
      setLoadingResumes(true)

      const resumes = await kv.list('resume_*', true) as KVItem[]

      const parsedResumes = resumes.map((resume) => JSON.parse(resume.value as string) as Resume)

      setResumes(parsedResumes || [])
      setLoadingResumes(false)
    }
    fetchResumes()
  }, [])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Analysis</h1>

          {!loadingResumes && resumes.length > 0 && (
            <h2>Review your submissions and get feedback on your resume and cover letter.</h2>
          )}

          {loadingResumes && (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/resume-scan-2.gif" alt="Loading resumes" className="w-[200px]" />
            </div>
          )}
        </div>

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="resumes-section">
            <h1>No resumes found</h1>
          </div>
        )}

      </section>
    </main>
  )
}
