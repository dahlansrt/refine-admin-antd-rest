import React from "react";
import { useShow, useOne } from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    MarkdownField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ProductShow = () => {
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: "categories",
        id: record?.category?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Name</Title>
            <TextField value={record?.name} />
            <Title level={5}>Description</Title>
            <MarkdownField value={record?.description} />
            <Title level={5}>Price</Title>
            <NumberField value={record?.price ?? ""} />
            <Title level={5}>Material</Title>
            <TextField value={record?.material} />
            <Title level={5}>Category</Title>
            {categoryIsLoading ? (
                <>Loading...</>
            ) : (
                <>{categoryData?.data?.title}</>
            )}
        </Show>
    );
};
