const { loadOrders } = require('../config');

const getOrders = (req, res) => {
    const orders = loadOrders();
    res.json(orders);
};

module.exports = {
    getOrders
};