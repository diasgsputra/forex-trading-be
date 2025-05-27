const { loadConfig, saveConfig } = require('../config');

const getConfig = (req, res) => {
    const config = loadConfig();
    res.json(config);
};

const updateConfig = (req, res) => {
    const newConfig = req.body;
    if (!newConfig || Object.keys(newConfig).length === 0) {
        return res.status(400).json({ message: "Invalid configuration data" });
    }
    saveConfig(newConfig);
    res.json({ message: "Configuration saved successfully", config: newConfig });
};

module.exports = {
    getConfig,
    updateConfig
};