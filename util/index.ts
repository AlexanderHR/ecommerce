export const removeSpecialCharacters = (input: string) => {
    return input.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
}

export const seoUrlText = (input: string) => {
    return removeSpecialCharacters(input).replace(/\s+/g, ' ').trim().toLocaleLowerCase().replaceAll(' ', '-');
}

export const formatNumber = (float: number, options: { currency?: string, fractionDigits?: number }): string => {
    let formatted = '';
    let currencyId = 'pt-BR';
    let currencyPrefix = 'R$';
    if (options.currency == 'ARS') {
        currencyId = 'es-AR';
        currencyPrefix = '$';
    }

    if (float) {
        formatted = float.toLocaleString(currencyId, { maximumFractionDigits: options.fractionDigits, minimumFractionDigits: options.fractionDigits });
        formatted = `${currencyPrefix} ${formatted}`;
    }
    return formatted;
}
