"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { VerificationResult } from "@/components/verification-result"
import { supabase } from "@/lib/supabase"

export function CertificateVerifier() {
  const [certificateId, setCertificateId] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    status: "valid" | "invalid" | "not-found"
    certificateId: string
    holderName?: string
    issueDate?: string
    expiryDate?: string
    issuer?: string
  } | null>(null)

  const handleVerify = async () => {
    const trimmedCode = certificateId.trim().toUpperCase()
    if (!trimmedCode) return
  
    setIsVerifying(true)
  
    const { data, error } = await supabase
      .from("certs")
      .select("*")
      .eq("code", trimmedCode)
      .maybeSingle()
  
    console.log("Checking certificate:", trimmedCode)
    console.log("Supabase response:", { error, data })
  
    if (error) {
      setVerificationResult({
        status: "invalid",
        certificateId: trimmedCode,
      })
    } else if (!data) {
      setVerificationResult({
        status: "not-found",
        certificateId: trimmedCode,
      })
    } else {
      const fullName = `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim()
  
      setVerificationResult({
        status: "valid",
        certificateId: data.code,
        holderName: fullName || "N/A",
        issueDate: data.issue_date || "N/A",
        expiryDate: data.valid_until || "N/A",
        issuer: data.certificate || "N/A",
      })
    }
  
    setIsVerifying(false)
  }

  const handleReset = () => {
    setCertificateId("")
    setVerificationResult(null)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="space-y-2 p-6">
          <CardTitle className="text-3xl font-semibold text-slate-900">
            Verify Your Certificate
          </CardTitle>
          <CardDescription className="text-slate-600">
            Enter your certificate code to verify its authenticity and view details
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-3">
            <Label htmlFor="certificate-id" className="text-sm font-medium text-slate-900">
              Certificate Code
            </Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                id="certificate-id"
                placeholder="e.g., PSI-5S-0002"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                className="flex-1 h-12"
                disabled={isVerifying}
              />
              <Button
                onClick={handleVerify}
                disabled={!certificateId.trim() || isVerifying}
                className="bg-slate-900 hover:bg-slate-800 text-white h-12 px-6 font-medium"
                size="lg"
              >
                {isVerifying ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {verificationResult && (
        <VerificationResult result={verificationResult} onReset={handleReset} />
      )}
    </div>
  )
}

export default CertificateVerifier