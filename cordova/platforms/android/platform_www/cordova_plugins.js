cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-sqlite-2.sqlitePlugin",
        "file": "plugins/cordova-plugin-sqlite-2/dist/sqlite-plugin.js",
        "pluginId": "cordova-plugin-sqlite-2",
        "clobbers": [
            "sqlitePlugin"
        ]
    },
    {
        "id": "cordova-fabric-plugin.FabricPlugin",
        "file": "plugins/cordova-fabric-plugin/www/FabricPlugin.js",
        "pluginId": "cordova-fabric-plugin",
        "clobbers": [
            "window.fabric.core"
        ]
    },
    {
        "id": "cordova-fabric-plugin.FabricAnswersPlugin",
        "file": "plugins/cordova-fabric-plugin/www/FabricPlugin.Answers.js",
        "pluginId": "cordova-fabric-plugin",
        "clobbers": [
            "window.fabric.Answers"
        ]
    },
    {
        "id": "cordova-fabric-plugin.FabricCrashlyticsPlugin",
        "file": "plugins/cordova-fabric-plugin/www/FabricPlugin.Crashlytics.js",
        "pluginId": "cordova-fabric-plugin",
        "clobbers": [
            "window.fabric.Crashlytics"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-console": "1.0.6",
    "cordova-plugin-device": "1.1.6",
    "cordova-plugin-network-information": "1.3.2",
    "cordova-plugin-sqlite-2": "1.0.4",
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-fabric-plugin": "1.1.9",
    "cordova-plugin-crosswalk-webview": "2.3.0"
};
// BOTTOM OF METADATA
});