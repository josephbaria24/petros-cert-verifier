import { CertificateVerifier } from "@/components/certificate-verifier"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <CertificateVerifier />
      </main>
    </div>
  )
}
