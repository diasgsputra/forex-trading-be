require('dotenv').config();
const Binance = require('node-binance-api');

const binance = new Binance();
binance.options({
    APIKEY: process.env.BINANCE_API_KEY,
    APISECRET: process.env.BINANCE_API_SECRET,
    useServerTime: true,
    test: true
});

const getMarketPrice = async (symbol) => {
    try {
        const ticker = await binance.futuresPrices(symbol);
        if (ticker && ticker[symbol]) {
            return parseFloat(ticker[symbol]);
        }
        throw new Error(`Price not found for symbol: ${symbol}`);
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error.message);
        throw error;
    }
};

module.exports = {
    getMarketPrice
};