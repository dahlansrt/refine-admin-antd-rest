// The package file is too large, how to load it on demand
// Solution 1: Import from es -- Import from the corresponding subpackage
import Area from '@ant-design/plots/es/components/area';

import { IQueryResult } from "../../../interfaces";

export const AreaChartComponent: React.FC<{ dailyRevenue: IQueryResult[] }> = ({
    dailyRevenue,
}) => {
    const config = {
        data: dailyRevenue,
        xField: 'date',
        yField: 'value',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };

    return <Area {...config} />
};