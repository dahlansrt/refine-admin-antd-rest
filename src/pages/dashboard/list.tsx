import React from "react";
import { Card, Row, Col, Spin, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useApiUrl, useCustom } from "@refinedev/core";

import dayjs from "dayjs";

const query = {
    start: dayjs().subtract(7, "days").startOf("day"),
    end: dayjs().startOf("day"),
};

import { AreaChartComponent, BarChartComponent, LineChartComponent, PieChartComponent, ScatterChartComponent, TreemapComponent } from "./charts";

import { IQueryResult } from "../../interfaces";

export const formatDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    day: "numeric",
});

const transformData = (data: IQueryResult[]): IQueryResult[] => {
    return data.map(({ date, value }) => ({
        date: formatDate.format(new Date(date)),
        value,
    }));
};

export const DashboardPage: React.FC = () => {
    const API_URL = useApiUrl("metrics");

    const { data: dailyRevenue } = useCustom({
        url: `${API_URL}/dailyRevenue`,
        method: "get",
        config: {
            query,
        },
        queryOptions: {
            select: ({ data }) => {
                return { data: transformData(data.data) };
            },
        },
    });

    const { data: dailyOrders, isLoading } = useCustom({
        url: `${API_URL}/dailyOrders`,
        method: "get",
        config: {
            query,
        },
        queryOptions: {
            select: ({ data }) => {
                return { data: transformData(data.data) };
            },
        },
    });

    const { data: newCustomers } = useCustom({
        url: `${API_URL}/newCustomers`,
        method: "get",
        config: {
            query,
        },
        queryOptions: {
            select: ({ data }) => {
                return { data: transformData(data.data) };
            },
        },
    });

    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={6}>
                    <Card variant="borderless">
                        <Statistic
                            title="Active"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card variant="borderless">
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card variant="borderless">
                        <Statistic title="Active Users" value={112893} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card variant="borderless">
                        <Statistic title="Account Balance (USD)" value={112893} precision={2} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                    {isLoading ? <Spin /> : <LineChartComponent dailyOrders={dailyOrders?.data ?? []} />}
                </Col>
                <Col span={12}>
                    {isLoading ? <Spin /> : <AreaChartComponent dailyRevenue={dailyRevenue?.data ?? []} />}
                </Col>
                <Col span={12}>
                    {isLoading ? <Spin /> : <BarChartComponent newCustomers={newCustomers?.data ?? []} />}
                </Col>
                <Col span={12}>
                    {isLoading ? <Spin /> : <ScatterChartComponent
                        dailyOrders={dailyOrders?.data ?? []}
                        newCustomers={newCustomers?.data ?? []}
                    />}
                </Col>
                <Col span={12}>
                    {isLoading ? <Spin /> : <PieChartComponent dailyOrders={dailyOrders?.data ?? []} />}
                </Col>
                <Col span={12}>
                    {isLoading ? <Spin /> : <TreemapComponent />}
                </Col>
            </Row>
        </>
    );
};