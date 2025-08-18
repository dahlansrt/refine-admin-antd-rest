import React from "react";

// The package file is too large, how to load it on demand
// Solution 1: Import from es -- Import from the corresponding subpackage
import Line from '@ant-design/plots/es/components/line';

import { IQueryResult } from "../../../interfaces";

export const LineChartComponent: React.FC<{
    dailyOrders: IQueryResult[];
}> = ({ dailyOrders }) => {
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
        title: {
            // Title
            title: "Daily Sales", // text of the chart title    
            // Subtitle
            subtitle: "I'am a subtitle", // text of the chart subtitle  
        }
    };

    return <Line {...config} />
};