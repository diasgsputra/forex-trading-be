// backend/src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configRoutes = require('./routes/configRoutes');
const orderRoutes = require('./routes/orderRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
// const { loadConfig, saveConfig, DEFAULT_STRATEGY_PARAMS } = require('./config'); // Hapus import ini jika tidak dipakai
// const path = require('path'); // Hapus
// const fs = require('fs'); // Hapus

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Hapus blok inisialisasi file JSON ini
// const configFilePath = path.join(__dirname, '..', 'strategy_config.json');
// const ordersFilePath = path.join(__dirname, '..', 'simulated_orders.json');
// if (!fs.existsSync(configFilePath)) {
//     saveConfig(DEFAULT_STRATEGY_PARAMS);
//     console.log('Initialized strategy_config.json with default parameters.');
// }
// if (!fs.existsSync(ordersFilePath)) {
//     fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 4));
//     console.log('Initialized simulated_orders.json.');
// }

// Rute API
app.use('/api/config', configRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/webhook', webhookRoutes);

// Endpoint health check sederhana
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});