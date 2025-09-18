import { useState, type FormEvent } from "react"
import FileUploader from "~/components/FileUploader"
import Navbar from "~/components/Navbar"
import { usePuterStore } from "~/lib/puter"
import { useNavigate } from "react-router"
import { convertPdfToImage } from "~/lib/pdf2img"
import { generateUUID } from "~/lib/utils"
import { prepareInstructions } from "~/constants"

const upload = () => {
    const { fs, ai, kv } = usePuterStore()
    const navigate = useNavigate()

    const [isProcessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState("")
    const [file, setFile] = useState<File | null>(null)


    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyzeResume = async ({ companyName, jobTitle, jobDescription, resume }: { companyName: string, jobTitle: string, jobDescription: string, resume: File }) => {
        setIsProcessing(true)
        setStatusText("Processing your resume...")

        const uploadedResume = await fs.upload([resume])

        if (!uploadedResume) {
            setStatusText("Failed to upload resume")
            return
        }

        setStatusText("Converting your resume to image...")
        const imageFile = await convertPdfToImage(resume)

        if (!imageFile) {
            setStatusText("Failed to convert resume to image")
            return
        }

        setStatusText("Uploading the image...")
        const uploadedImage = await fs.upload([imageFile.file as File])

        if (!uploadedImage) {
            setStatusText("Failed to upload image")
            return
        }

        setStatusText("Preparing your resume...")

        const uuid = generateUUID()
        const data = {
            id: uuid,
            resumePath: uploadedResume.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: '',
        }

        await kv.set(`resume_${uuid}`, JSON.stringify(data))

        setStatusText("Analyzing your resume...")

        const feedback = await ai.feedback(
            uploadedResume.path,
            prepareInstructions({ jobTitle, jobDescription })
        )

        if (!feedback) {
            setStatusText("Failed to analyze resume")
            return
        }

        const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text

        data.feedback = JSON.parse(feedbackText)

        await kv.set(`resume_${uuid}`, JSON.stringify(data))

        setStatusText("Resume analyzed successfully")
        navigate(`/resume/${uuid}`)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget.closest("form")
        if (!form) {
            setStatusText("Please select a resume to analyze")
            return
        }

        if (!file) {
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

        await handleAnalyzeResume({ companyName, jobTitle, jobDescription, resume: file })
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