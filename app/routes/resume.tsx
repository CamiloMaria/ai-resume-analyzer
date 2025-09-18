import { Link, useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { usePuterStore } from "~/lib/puter"
import Summary from "~/components/Summary"
import ATS from "~/components/ATS"
import Details from "~/components/Details"

export const meta = ({ params }: { params: { id: string } }) => ([
    { title: `Resume Analyzer - Resume ${params.id}` },
    { name: "description", content: `Resume Analyzer - Resume ${params.id}` }
])

const resume = () => {
    const { id } = useParams<{ id: string }>()
    const { fs, isLoading, kv } = usePuterStore()
    const navigate = useNavigate()

    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [feedback, setFeedback] = useState<Feedback | null>(null)

    useEffect(() => {
        const fetchResume = async () => {
            const resume = await kv.get(`resume_${id}`)
            if (!resume) {
                navigate("/")
                return
            }
            const resumeData = JSON.parse(resume)

            const resumeBlob = await fs.read(resumeData.resumePath)
            if (!resumeBlob) {
                navigate("/")
                return
            }

            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" })
            const pdfUrl = URL.createObjectURL(pdfBlob)

            const imageBlob = await fs.read(resumeData.imagePath)
            if (!imageBlob) {
                navigate("/")
                return
            }

            const resumeImageBlob = new Blob([imageBlob], { type: "image/png" })
            const resumeImageUrl = URL.createObjectURL(resumeImageBlob)

            setImageUrl(resumeImageUrl)
            setPdfUrl(pdfUrl)
            setFeedback(resumeData.feedback)
        }
        fetchResume()
    }, [id])

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="back" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
                <Link to="/upload">
                    <p className="primary-button w-fit">Analyze Another Resume</p>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && pdfUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imageUrl}
                                    alt="resume"
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="Resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-bold">
                        Resume Review
                    </h2>

                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary />
                            <ATS />
                            <Details />
                        </div>
                    ) : (
                        <img
                            src="/images/resume-scan-2.gif"
                            alt="resume-scan"
                            className="w-full" />
                    )}
                </section>

            </div>
        </main>
    )
}

export default resume