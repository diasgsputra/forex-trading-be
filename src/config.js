const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, '..', 'strategy_config.json');
const ORDERS_FILE = path.join(__dirname, '..', 'simulated_orders.json');

const DEFAULT_STRATEGY_PARAMS = {
    symbol: "BTCUSDT",
    timeframe: "5m",
    plusDI_threshold: 25.0,
    minusDI_threshold: 20.0,
    adx_minimum: 20.0,
    take_profit_percent: 2.0,
    stop_loss_percent: 1.0,
    leverage: 10
};

const loadConfig = () => {
    try {
        if (fs.existsSync(CONFIG_FILE)) {
            const data = fs.readFileSync(CONFIG_FILE, 'utf8');
            return JSON.parse(data);
        }
        return DEFAULT_STRATEGY_PARAMS;
    } catch (error) {
        console.error('Error loading config:', error);
        return DEFAULT_STRATEGY_PARAMS;
    }
};

const saveConfig = (config) => {
    try {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 4));
    } catch (error) {
        console.error('Error saving config:', error);
    }
};

const loadOrders = () => {
    try {
        if (fs.existsSync(ORDERS_FILE)) {
            const data = fs.readFileSync(ORDERS_FILE, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error loading orders:', error);
        return [];
    }
};

const saveOrder = (order) => {
    try {
        const orders = loadOrders();
        orders.push(order);
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 4));
    } catch (error) {
        console.error('Error saving order:', error);
    }
};

module.exports = {
    loadConfig,
    saveConfig,
    loadOrders,
    saveOrder,
    DEFAULT_STRATEGY_PARAMS
};