import { LoginForm } from '@/components/modules/authentication/Login';


const LoginPage = async({searchParams} : {searchParams : Promise<{redirect : string}>}) => {
    const {redirect} = await searchParams;
    return (
        <div>
            <LoginForm redirect={redirect}/>
        </div>
    );
};

export default LoginPage;