import {
    LoginSocialGoogle,
    IResolveParams,
} from 'reactjs-social-login';

import {
    GoogleLoginButton,
} from 'react-social-login-buttons';
import { Container } from './styles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

export function Login() {
    const [loginFailed, setLoginFailed] = useState(false);
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState<any>();
    const REDIRECT_URI = 'http://localhost:5173/login';
    const navigate = useNavigate();
    const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

    const onLoginStart = useCallback(() => {
        alert('login start');
    }, []);

    return (
        <Container >
            <span style={{ marginTop: 12, fontSize: 20, fontWeight: 600, color: '#fff' }}>WAITERAPP para garçons</span>
            <span style={{ marginBottom: 12,marginTop: 4, color: '#fff', opacity: 0.9 }}>Como deseja continuar?</span>

            {loginFailed && toast.error('Could not sign you in! Try again.')}

            <LoginSocialGoogle
                client_id={clientId || ''}
                onLoginStart={onLoginStart}
                redirect_uri={REDIRECT_URI}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }: IResolveParams) => {
                    setProvider(provider);
                    setProfile(data);
                    navigate('/',{ state: { LoggedIn:true,name:data?.name } });
                }}
                onReject={err => {
                    setLoginFailed(true);
                    console.log(err);
                }}
            >
                <GoogleLoginButton text='Continue com o Google'/>
            </LoginSocialGoogle>
        </Container>
    );
}
