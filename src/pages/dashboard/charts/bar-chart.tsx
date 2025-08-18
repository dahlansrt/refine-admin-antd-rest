import React from "react";

// The package file is too large, how to load it on demand
// Solution 1: Import from es -- Import from the corresponding subpackage
import Bar from '@ant-design/plots/es/components/bar';

import { IQueryResult } from "../../../interfaces";

export const BarChartComponent: React.FC<{ newCustomers: IQueryResult[] }> = ({
    newCustomers,
}) => {
    const config = {
        data: newCustomers,
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

    return <Bar {...config} />
};