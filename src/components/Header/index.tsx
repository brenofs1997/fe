import logo from '../../assets/images/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  nameUser: string;
}

export function Header({ nameUser }: HeaderProps) {
    return (
        <Container>
            <Content>
                <span style={{ marginTop: 12, fontSize: 20, fontWeight: 600, color: '#fff' }}>Olá, {nameUser}</span>
                <div className="page-details">
                    <h1>Pedidos</h1>
                    <h2>Acompanhe os pedidos dos clientes</h2>
                </div>

                <img src={logo} alt="WAITERAPP" />
            </Content>
        </Container>
    );
}
