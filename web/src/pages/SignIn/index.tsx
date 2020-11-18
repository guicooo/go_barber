import React from 'react';
import { Background, Container, Content } from './styles';
import fileLogo from '../../assets/logo.svg'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn : React.FC = () => (
    <Container>
        <Content>
            <img src={fileLogo} alt="GoBarber"/>

            <form>
                <h1>Faça seu logon</h1>
                <Input name="email" placeholder="E-mail" icon={FiMail} />
                <Input name="password" type="password" placeholder="Senha" icon={FiLock}/>

                <Button>Entrar</Button>
                <a>Esqueci minha senha</a>
            </form>

            <a href="Login">
                <FiLogIn />
                Criar conta
            </a>

        </Content>
        <Background />
    </Container>
)
export default SignIn;