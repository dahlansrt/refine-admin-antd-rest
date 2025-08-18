import React from "react";
// The package file is too large, how to load it on demand
// Solution 1: Import from es -- Import from the corresponding subpackage
import Scatter from '@ant-design/plots/es/components/scatter';

import { IQueryResult } from "../../../interfaces";

const formatData = (
    dailyOrders: IQueryResult[],
    newCustomers: IQueryResult[],
) => {
    const formattedData = [];

    for (let i = 0; i < dailyOrders.length; i++) {
        if (!dailyOrders[i] || !newCustomers[i]) continue;

        if (dailyOrders[i].date === newCustomers[i].date) {
            formattedData.push({
                date: dailyOrders[i].date,
                dailyOrders: dailyOrders[i].value,
                newCustomers: newCustomers[i].value,
            });
        }
    }

    return formattedData;
};

export const ScatterChartComponent: React.FC<{
    dailyOrders: IQueryResult[];
    newCustomers: IQueryResult[];
}> = ({ dailyOrders, newCustomers }) => {
    const formattedData = formatData(dailyOrders, newCustomers);

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

    return <Scatter {...config} />
};