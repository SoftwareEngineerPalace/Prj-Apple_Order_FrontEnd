/**
 * Order
 */
interface Order {
    /**
     * 商品类型
     */
    category?: string;
    /**
     * 订单 id
     */
    id: string;
    /**
     * 下单时间
     */
    orderDate?: string;
    /**
     * 产品名称
     */
    productName?: string;
    /**
     * 利润
     */
    profit?: string;
    /**
     * 部门所在区域
     */
    region?: string;
    /**
     * 销售额
     */
    sales?: string;
    /**
     * 部门
     */
    segment?: string;
    /**
     * 商品子类型
     */
    subCategory?: string;
    [property: string]: any;
}

/**
 * 商品
 */
interface LineItem {
    /**
     * 商品 id
     */
    id: string;
    /**
     * 商品名
     */
    item?: string;
    /**
     * 商品所属的订单号
     */
    orderId?: string;
    /**
     * 利润
     */
    profit?: string;
    /**
     * 销售额
     */
    sales?: string;
    [property: string]: any;
}

export { Order, LineItem };
