export const processChartData = (datasets, theme) => {
    if (!datasets) return [];

    return datasets.map(element => {
        const colorMapping = {
            "Consciência Fonológica": theme.colors.cyan[3],
            "Sistema de Escrita Alfabética": theme.colors.violet[2],
        };

        const backgroundColor = colorMapping[element.label] || theme.colors.orange[3];
        const borderColor = colorMapping[element.label] || theme.colors.orange[3];

        return {
            ...element,
            backgroundColor,
            borderColor,
            yAxisID: 'y'
        };
    });
};