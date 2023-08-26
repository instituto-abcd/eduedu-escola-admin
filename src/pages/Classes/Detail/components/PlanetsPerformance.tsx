import { Table, useMantineTheme } from "@mantine/core";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export function PlanetsPerformance() {
    const theme = useMantineTheme();

    return (
        <Table horizontalSpacing="sm" verticalSpacing="md">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Planetas Oferecidos</th>
                    <th>Planetas Realizados</th>
                    <th>Média Estrelas</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ color: theme.colors.blue[6] }}>
                        Consciência Fonológica
                    </td>
                    <td>30</td>
                    <td>30</td>
                    <td>
                        <Rating readOnly value={2} key={Math.random()} style={{ width: '100px' }} />
                    </td>
                </tr>
                <tr>
                    <td style={{ color: theme.colors.blue[6] }}>
                        Sistema de Escrita Alfabética
                    </td>
                    <td>25</td>
                    <td>20</td>
                    <td>
                        <Rating readOnly value={3.5} key={Math.random()} style={{ width: '100px' }} />
                    </td>
                </tr>
                <tr>
                    <td style={{ color: theme.colors.blue[6] }}>
                        Leitura e Compreensão de Texto
                    </td>
                    <td>18</td>
                    <td>17</td>
                    <td>
                        <Rating readOnly value={4} key={Math.random()} style={{ width: '100px' }} />
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}