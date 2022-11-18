import { useEffect } from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formactCurrency } from '../../utils/formatCurrency';
import { Actions, ModalBody, OrderDetails, Overlay } from './styles';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}

export function OrderModal({ visible, order, onClose }: OrderModalProps) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!visible || !order) {
        return null;
    }

    const total = order.items.reduce((total, { product, quantity }) => {
        return total + (product.price * quantity);
    }, 0);

    return (
        <Overlay>
            <ModalBody>
                <header>
                    <strong>{order.table}</strong>

                    <button type="button" onClick={onClose}>
                        <img src={closeIcon} alt="Ícone de fechar" />
                    </button>
                </header>

                <div className="status-container">
                    <small>Status do Pedido</small>
                    <div>
                        <span>
                            {order.status === 'WAITING' && '🕗'}
                            {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
                            {order.status === 'DONE' && '✅'}
                        </span>
                        <strong>Fila de espera
                            {order.status === 'WAITING' && 'Fila de espera'}
                            {order.status === 'IN_PRODUCTION' && 'Em produção'}
                            {order.status === 'DONE' && 'Pronto!'}
                        </strong>
                    </div>
                </div>

                <OrderDetails>
                    <strong>Itens</strong>
                    <div className="order-items">
                        {order.items.map(({ _id, product, quantity }) => (
                            <div className="item" key={_id}>
                                <img src={`http://localhost:3001/uploads/${product.imagePath}`}
                                    alt={product.name}
                                    width="56"
                                    height="28.51"
                                />

                                <span className="quantity">{quantity}</span>

                                <div className="product-details">
                                    <strong>{product.name}</strong>
                                    <span>{formactCurrency(product.price)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="div total">
                        <span>Total</span>
                        <strong>{formactCurrency(total)}</strong>
                    </div>
                </OrderDetails>

                <Actions >
                    <button type="button" className="primary">
                        <span>👨‍🍳</span>
                        <strong>Iniciar Produção</strong>
                    </button>

                    <button type="button" className="secondary">
            Cancelar Pedido
                    </button>
                </Actions>
            </ModalBody>
        </Overlay>
    );
}
