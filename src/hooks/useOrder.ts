import { useEffect, useState } from "react";
import type { MenuItem, OrderItem } from "../types";

export default function useOrder() {
    const initialOrder : OrderItem[] = JSON.parse(localStorage.getItem('order') || '[]');

    const [order, setOrder] = useState(initialOrder);
    const [tip, setTip] = useState(0);

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    const addItem = (item : MenuItem) => {
        const itemExist = order.find( orderItem => orderItem.id === item.id);

        if(itemExist) {
            const updateOrder = order.map( orderItem => orderItem.id === item.id ? {...orderItem, quantity: orderItem.quantity + 1} : orderItem);
            setOrder(updateOrder);
        } else {
            const newItem = {...item, quantity: 1};
            setOrder([...order, newItem]);
        }
    }

    const removeItem = (id: MenuItem['id']) => {
        if(order.length === 1) {
            setTip(0)
        }
        setOrder(order.filter(item => item.id !== id));
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}
