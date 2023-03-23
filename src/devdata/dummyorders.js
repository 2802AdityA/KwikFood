const orders = [
    {
        id: 1,
        items: [
            {
                id: 1,
                name: 'Paneer Patties',
                quantity: 5,
                price: 100
            },
            {
                id: 2,
                name: 'Burger',
                quantity: 2,
                price: 60
            },
            {
                id: 3,
                name: 'Cold Coffee',
                quantity: 7,
                price: 210
            }
        ],
        
        total: 300,
        paymentType: 'cash',
        orderStatus: 'preparing'
    },

    {
        id: 2,
        items: [
            {
                id: 1,
                name: 'Paneer Patties',
                quantity: 2,
                price: 40
            },
            {
                id: 3,
                name: 'Cold Coffee',
                quantity: 2,
                price: 60
            }
        ],
        
        total: 100,
        paymentType: 'upi',
        orderStatus: 'out-for-delivery'
    },

    {
        id: 3,
        items: [
            {
                id: 1,
                name: 'Paneer Patties',
                quantity: 5,
                price: 100
            },
            {
                id: 2,
                name: 'Burger',
                quantity: 2,
                price: 60
            },
            {
                id: 3,
                name: 'Cold Coffee',
                quantity: 7,
                price: 210
            },
            {
                id: 4,
                name: 'Lichi Fressca',
                quantity: 1,
                price: 25
            }
        ],
        
        total: 325,
        paymentType: 'card',
        orderStatus: 'delivered'
    }
];

export default orders;