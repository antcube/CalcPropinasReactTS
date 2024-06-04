import { OrderItem } from "../types";
import { formatCurrency } from "../helpers";
import { useMemo } from "react";

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void
}

export default function OrderTotals({order, tip, placeOrder} : OrderTotalsProps) {
    const subtotalAmount = useMemo(() => order.reduce( (total, item) => total + (item.quantity * item.price), 0), [order])

    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order]);

    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order])

    return (
        <>
            <div className="space-y-3">
                <h3 className="text-2xl font-black">Totales y Propina:</h3>
                <p>Subtotal a pagar: {''} 
                    <span className="font-black">{formatCurrency(subtotalAmount)}</span>
                </p>
                <p>Propina: {''} 
                    <span className="font-black">{formatCurrency(tipAmount)}</span>
                </p>
                <p>Total a pagar: {''} 
                    <span className="font-bold">{formatCurrency(totalAmount)}</span>
                </p>
            </div>

            <button 
                className="w-full bg-black text-white p-3 uppercase font-bold disabled:opacity-10"
                disabled={subtotalAmount === 0}
                onClick={placeOrder}
            >
                Guardar Orden
            </button>
        </>
    )
}
