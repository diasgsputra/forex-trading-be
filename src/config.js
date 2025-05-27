// backend/src/config.js
// const fs = require('fs'); // Hapus
// const path = require('path'); // Hapus

// Ubah ini menjadi objek di memori, bukan dari file
// let CONFIG_FILE = path.join(__dirname, '..', 'strategy_config.json'); // Hapus
// let ORDERS_FILE = path.join(__dirname, '..', 'simulated_orders.json'); // Hapus

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

// Variabel di memori untuk menyimpan konfigurasi dan order
// Ini akan hilang saat fungsi direset atau di-deploy ulang!
let currentConfig = DEFAULT_STRATEGY_PARAMS;
let simulatedOrders = [];

const loadConfig = () => {
    // Hanya kembalikan konfigurasi yang ada di memori
    return currentConfig;
};

const saveConfig = (config) => {
    // Simpan ke memori
    currentConfig = { ...config }; // Buat salinan agar tidak ada referensi langsung
    console.log('Config saved to memory:', currentConfig);
};

const loadOrders = () => {
    // Hanya kembalikan order yang ada di memori
    return simulatedOrders;
};

const saveOrder = (order) => {
    // Tambahkan order ke array di memori
    simulatedOrders.push(order);
    console.log('Order saved to memory. Current orders count:', simulatedOrders.length);
};

module.exports = {
    loadConfig,
    saveConfig,
    loadOrders,
    saveOrder,
    DEFAULT_STRATEGY_PARAMS
};