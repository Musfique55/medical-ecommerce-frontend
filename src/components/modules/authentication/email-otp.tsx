'use client'

import { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { verifyEmail } from '@/services/auth/auth.services'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function EmailOTP({email} : {email : string}) {
  const [otp, setOtp] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async() => {
    if (otp.length === 4) {
      setIsSubmitted(true)
     const res = await verifyEmail(email,otp);
     if(!res.success){
        toast.error(res.message)
     }
     router.push('/');
     toast.success(res.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent a 4-digit code to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isSubmitted ? (
            <>
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">
                  Enter verification code
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={4}
                    value={otp}
                    onChange={setOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={otp.length !== 4}
                className="w-full"
              >
                Verify
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Didn&apos;t receive the code?{' '}
                <button className="text-primary hover:underline">
                  Resend
                </button>
              </p>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-green-600 text-lg font-semibold">
                ✓ Email verified successfully!
              </div>
              <Button
                onClick={() => {
                  setOtp('')
                  setIsSubmitted(false)
                }}
                variant="outline"
                className="w-full"
              >
                Verify another email
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
