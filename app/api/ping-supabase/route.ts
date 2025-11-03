import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const now = new Date().toISOString()
  console.log(`[PING] Running certificate-verifier ping at ${now}`)

  try {
    // Lightweight query — just touches the certs table to keep Supabase awake
    const { data, error } = await supabase
      .from('certs')
      .select('id')
      .limit(1)

    if (error) throw error

    console.log(`[PING] Success! Supabase responded at ${now}`)
    return NextResponse.json({ success: true, pingedAt: now })
  } catch (err: any) {
    console.error(`[PING] Failed: ${err.message}`)
    return NextResponse.json({ success: false, error: err.message })
  }
}
