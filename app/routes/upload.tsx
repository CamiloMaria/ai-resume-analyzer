import { useState, type FormEvent } from "react"
import FileUploader from "~/components/FileUploader"
import Navbar from "~/components/Navbar"

const upload = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState("")
    const [file, setFile] = useState<File | null>(null)


    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget.closest("form")
        if (!form) {
            setStatusText("Please select a resume to analyze")
            return
        }

        const formData = new FormData(form)
        const companyName = formData.get("company-name") as string
        const jobTitle = formData.get("job-title") as string
        const jobDescription = formData.get("job-description") as string

        if (!companyName || !jobTitle || !jobDescription) {
            setStatusText("Please fill in all fields")
            return
        }

        setIsProcessing(true)
        setStatusText("Processing your resume...")
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart Resume Analyzer</h1>

                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif"
                                alt="resume-scan"
                                className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvements tips</h2>
                    )}
                    {!isProcessing && (
                        <form
                            id="upload-form"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 mt-8"
                        >
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" id="company-name" name="company-name" placeholder="Enter company name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" id="job-title" name="job-title" placeholder="Enter job title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} id="job-description" name="job-description" placeholder="Enter job description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="resume">Upload your resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button type="submit" className="primary-button">Analyze Resume</button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}

export default upload