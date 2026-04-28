import EmailOTP from '@/components/modules/authentication/email-otp';


const VerifyPinPage =async ({searchParams} : {searchParams : Promise<{email : string}>}) => {
    const {email} = await searchParams;
    return (
        <EmailOTP email={email}/>
    );
};

export default VerifyPinPage;