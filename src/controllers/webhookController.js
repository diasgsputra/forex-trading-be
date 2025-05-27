const { loadConfig, saveOrder } = require('../config');
const { getMarketPrice } = require('../services/binanceService');

const handleWebhook = async (req, res) => {
    const signal = req.body;
    console.log(`Received webhook signal: ${JSON.stringify(signal)}`);

    if (!signal) {
        return res.status(400).json({ message: "No signal data received" });
    }

    const requiredFields = ["symbol", "plusDI", "minusDI", "adx", "timeframe"];
    if (!requiredFields.every(field => signal.hasOwnProperty(field))) {
        return res.status(400).json({ message: "Missing required fields in signal" });
    }

    const currentConfig = loadConfig();
    console.log(`Active configuration: ${JSON.stringify(currentConfig)}`);

    const signalSymbol = signal.symbol;
    const signalPlusDI = parseFloat(signal.plusDI);
    const signalMinusDI = parseFloat(signal.minusDI);
    const signalAdx = parseFloat(signal.adx);
    const signalTimeframe = signal.timeframe;

    // Validate signal based on configured thresholds
    let action = null;
    if (
        signalPlusDI > currentConfig.plusDI_threshold &&
        signalMinusDI < currentConfig.minusDI_threshold &&
        signalAdx > currentConfig.adx_minimum
    ) {
        action = "BUY";
    } else if (
        signalMinusDI > currentConfig.plusDI_threshold && 
        signalPlusDI < currentConfig.minusDI_threshold && 
        signalAdx > currentConfig.adx_minimum
    ) {
        action = "SELL";
    }

    if (!action) {
        return res.status(200).json({ message: "Signal not valid for BUY or SELL based on current strategy" });
    }

    if (signalSymbol !== currentConfig.symbol || signalTimeframe !== currentConfig.timeframe) {
        return res.status(400).json({
            message: `Symbol or timeframe mismatch. Config: ${currentConfig.symbol}/${currentConfig.timeframe}, Signal: ${signalSymbol}/${signalTimeframe}`
        });
    }

    try {
        const currentPrice = await getMarketPrice(signalSymbol);
        console.log(`Current price for ${signalSymbol}: ${currentPrice}`);

        const tpPercent = currentConfig.take_profit_percent / 100;
        const slPercent = currentConfig.stop_loss_percent / 100;

        let tpPrice, slPrice;
        if (action === "BUY") {
            tpPrice = currentPrice * (1 + tpPercent);
            slPrice = currentPrice * (1 - slPercent);
        } else if (action === "SELL") {
            tpPrice = currentPrice * (1 - tpPercent);
            slPrice = currentPrice * (1 + slPercent);
        }

        const simulatedOrder = {
            symbol: signalSymbol,
            action: action,
            price_entry: currentPrice.toFixed(2),
            tp_price: parseFloat(tpPrice.toFixed(2)),
            sl_price: parseFloat(slPrice.toFixed(2)),
            leverage: `${currentConfig.leverage}x`,
            timeframe: signalTimeframe,
            timestamp: new Date().toISOString()
        };

        saveOrder(simulatedOrder);
        console.log(`Simulated order saved: ${JSON.stringify(simulatedOrder)}`);

        res.json({ message: "Order simulated successfully", order: simulatedOrder });

    } catch (error) {
        console.error(`Error processing webhook: ${error.message}`);
        res.status(500).json({ message: `Error processing webhook: ${error.message}` });
    }
};

module.exports = {
    handleWebhook
};