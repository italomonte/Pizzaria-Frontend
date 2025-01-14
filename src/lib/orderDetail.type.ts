export interface OrderDetailProps {
    id: string,
    amount: number,
    created_at: string,
    order_id: string,
    update_at: string,
    product_id: string,
    product: {
        id: string,
        name: string,
        price:string,
        description: string,
        banner: string,
        created_at: string,
        update_at: string,
        category_id: string,
    },
    order: {
        id: string,
        table: number,
        status: boolean,
        draft: boolean,
        name: string,
        created_at: string,
        update_at: string
    }
}
