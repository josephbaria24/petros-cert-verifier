"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, Calendar, User, Building2, Hash } from "lucide-react"

interface VerificationResultProps {
  result: {
    status: "valid" | "invalid" | "not-found"
    certificateId: string
    holderName?: string
    issueDate?: string
    expiryDate?: string
    issuer?: string
  }
  onReset: () => void
}

const statusConfig: Record<string, {
  icon: typeof CheckCircle2
  color: string
  borderColor: string
  badgeVariant: string
  label: string
  description: string
}> = {
  valid: {
    icon: CheckCircle2,
    color: "bg-slate-900 text-white",
    borderColor: "border-slate-200",
    badgeVariant: "bg-slate-900 text-white border-slate-200",
    label: "Valid Certificate",
    description: "This certificate has been verified and is authentic",
  },
  invalid: {
    icon: XCircle,
    color: "bg-slate-100 text-slate-900",
    borderColor: "border-slate-300",
    badgeVariant: "bg-white text-slate-900 border-slate-300",
    label: "Invalid Certificate",
    description: "This certificate could not be verified or has been revoked",
  },
  "not-found": {
    icon: AlertCircle,
    color: "bg-slate-100 text-slate-600",
    borderColor: "border-slate-200",
    badgeVariant: "bg-slate-100 text-slate-600 border-slate-200",
    label: "Not Found",
    description: "No certificate found with this ID",
  },
}

export function VerificationResult({ result, onReset }: VerificationResultProps) {
  const config = statusConfig[result.status]
  const StatusIcon = config.icon

  return (
    <Card className={`border-0 shadow-sm border-2 ${config.borderColor} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <CardHeader className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${config.color} shrink-0`}>
              <StatusIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <CardTitle className="text-xl font-semibold text-slate-900">
                {config.label}
              </CardTitle>
              <p className="text-sm text-slate-600">
                {config.description}
              </p>
            </div>
          </div>
          <Badge className={`shrink-0 ${config.badgeVariant}`}>
            {result.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      {result.status === "valid" && (
        <CardContent className="p-6 pt-0 space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
              <Hash className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Certificate ID
                </p>
                <p className="text-sm font-mono text-slate-900 break-all mt-1">
                  {result.certificateId}
                </p>
              </div>
            </div>

            {result.holderName && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <User className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    Certificate Holder
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {result.holderName}
                  </p>
                </div>
              </div>
            )}

            {result.issuer && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <Building2 className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    Issued By
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {result.issuer}
                  </p>
                </div>
              </div>
            )}

            {(result.issueDate || result.expiryDate) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {result.issueDate && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <Calendar className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                        Issue Date
                      </p>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {result.issueDate !== "N/A" && !isNaN(new Date(result.issueDate).getTime())
                          ? new Date(result.issueDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </p>
                    </div>
                  </div>
                )}

                {result.expiryDate && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <Calendar className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                        Expiry Date
                      </p>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {result.expiryDate !== "N/A" && !isNaN(new Date(result.expiryDate).getTime())
                          ? new Date(result.expiryDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "0000-00-00"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <Button 
            onClick={onReset} 
            variant="outline" 
            className="w-full h-11 font-medium"
          >
            Verify Another Certificate
          </Button>
        </CardContent>
      )}

      {result.status !== "valid" && (
        <CardContent className="p-6 pt-0">
          <Button 
            onClick={onReset} 
            variant="outline" 
            className="w-full h-11 font-medium"
          >
            Try Again
          </Button>
        </CardContent>
      )}
    </Card>
  )
}

export default VerificationResult