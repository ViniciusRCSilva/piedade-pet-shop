interface MoneyFormatProps {
    value: number;
}

const MoneyFormat = ({ value }: MoneyFormatProps) => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency', currency: 'BRL',
    }).format(value);

    return <span>{formattedValue}</span>;
}

export default MoneyFormat;