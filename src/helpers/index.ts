export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-PE', {style: 'currency', currency: 'PEN'}).format(amount)
}

export function formatCurrency2(amount: number): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}