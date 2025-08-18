import React from "react";
// The package file is too large, how to load it on demand
// Solution 1: Import from es -- Import from the corresponding subpackage
import Treemap from '@ant-design/plots/es/components/treemap';

const data =
{
    name: "root",
    children: [
        { name: "Axes", value: 1302 },
        { name: "Axis", value: 24593 },
        { name: "AxisGridLine", value: 652 },
        { name: "AxisLabel", value: 636 },
        { name: "CartesianAxes", value: 6703 },
    ],
}


export const TreemapComponent: React.FC = () => {
    const config = {
        data,
        colorField: 'value',
        valueField: 'value',
        scale: {
            color: {
                range: [
                    '#4e79a7',
                    '#f28e2c',
                    '#e15759',
                    '#76b7b2',
                    '#59a14f',
                    '#edc949',
                    '#af7aa1',
                    '#ff9da7',
                    '#9c755f',
                    '#bab0ab',
                ],
            },
        },
        legend: false,
    };
    return <Treemap {...config} />;
};