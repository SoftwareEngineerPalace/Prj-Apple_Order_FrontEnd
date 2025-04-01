import React, { useState } from 'react';
import './App.less';
import type { TableColumnsType } from 'antd';
import { Image, Table, Card } from 'antd';
import { useEffect } from 'react';
import queryString from 'query-string';
import { Order, LineItem } from './model';
// test
const hostname = 'localhost';

const App = () => {
    const [forceFresh, setForceFresh] = useState(false);
    const [orderList, setOrderList] = useState<Array<Order>>([]);
    const [subOrderListMap, setSubOrderListMap] = useState<{
        [orderId: string]: LineItem[];
    }>({});

    // 获取订单列表
    useEffect(() => {
        const getOrderList = async () => {
            const { data } = await fetch(`http://${hostname}:3001/order/getOrderList`).then((response) => response.json());
            setOrderList(data);
        };
        getOrderList();
    }, []);

    /** 根据订单 id 获取商品列表 test 1*/
    const getLineItemList = React.useCallback(
        async (orderId: string) => {
            const paramStr = queryString.stringify({ orderId });
            const { data } = await fetch(`http://${hostname}:3001/order/getLineItemByOrderId?${paramStr}`).then((response) =>
                response.json(),
            );
            const map: { [key: string]: LineItem[] } = subOrderListMap;
            map[orderId] = data;
            setSubOrderListMap(map);
            setForceFresh(!forceFresh);
        },
        [subOrderListMap, forceFresh],
    );

    const expandedRowRender = React.useCallback(
        ({ id, image }: any) => {
            const columns: TableColumnsType<LineItem> = [
                { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
                { title: 'ID', dataIndex: 'id', key: 'id' },
                { title: 'Item', dataIndex: 'item', key: 'item' },
                { title: 'Profit', dataIndex: 'profit', key: 'profit' },
                { title: 'Sales', dataIndex: 'sales', key: 'sales' },
            ];
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={subOrderListMap[id]}
                        pagination={false}
                        rowKey={'id'}
                        locale={{
                            emptyText: (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <p style={{ marginBottom: 0 }}>no items</p>
                                </div>
                            ),
                        }}
                    />
                    {image ? <Image width={200} height={150} src={`/assets/${image}`}></Image> : <span>no image</span>}
                </div>
            );
        },
        [subOrderListMap],
    );

    const columns: TableColumnsType<Order> = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        { title: 'Sub-Category', dataIndex: 'subCategory', key: 'subCategory' },
        { title: 'Segment', dataIndex: 'segment', key: 'segment' },
        { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
        { title: 'Order Date', dataIndex: 'orderDate', key: 'orderDate' },
        { title: 'Region', dataIndex: 'region', key: 'region' },
        { title: 'Profit', dataIndex: 'profit', key: 'profit' },
        { title: 'Sales', dataIndex: 'sales', key: 'sales' },
    ];

    return (
        <div>
            <Card>
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender,
                        expandRowByClick: true,
                        expandIcon: ({ expanded, onExpand, record }) =>
                            expanded ? <div onClick={(e) => onExpand(record, e)} /> : <div onClick={(e) => onExpand(record, e)} />,
                    }}
                    dataSource={orderList}
                    rowKey="id"
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                if (!subOrderListMap?.[record.id]) {
                                    getLineItemList(record.id);
                                }
                            },
                        };
                    }}
                />
            </Card>
        </div>
    );
};

export default App;
