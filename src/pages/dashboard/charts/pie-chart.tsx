import React from "react";
// The package file is too large, how to load it on demand
// Solution 1: Import from es -- Import from the corresponding subpackage
import Pie from '@ant-design/plots/es/components/pie';

import { IQueryResult } from "../../../interfaces";

export const PieChartComponent: React.FC<{ dailyOrders: IQueryResult[] }> = ({
    dailyOrders,
}) => {
    const config = {
        data: dailyOrders,
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

    return <Pie {...config} />
};