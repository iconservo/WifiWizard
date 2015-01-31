function WifiWizard() {
    /**
     * This methods adds a network to the list of available networks.
     * Currently, only WPA authentication and unauthenticated are supported.
     *
     * @param {WifiConfig}  wifi    WifiConfig object to add
     * @param {callback}    win     Success callback
     * @param {callback}    fail    Error callback
     */
    this.addNetwork = function(wifi, win, fail) {
        if (wifi instanceof WifiConfig === false) {
            throw new Error("WifiConfig must be WifiConfig object");
        }

        cordova.exec(win, fail, 'WifiWizard', 'addNetwork', wifi.toArray());
    };

    /**
     * This method removes a given network from the list of configured networks.
     * The network may be specified either as a string, in which case the
     * string must be wrapped in double quotes, or as a WifiConfig object.
     *
     * @param {string|WifiConfig} network  network to remove 
     * @param {callback}    win     success callback
     * @param {callback}    fail    error callback
     */
    this.removeNetwork = function(network, win, fail) {
        var remove = network instanceof WifiConfig ? network.ssid() : network;
        cordova.exec(win, fail, 'WifiWizard', 'removeNetwork', [remove]);
    };

    /**
     * This method connects to a network. The network may be specified either
     * as a string or a WifiConfig object. If the parameter is a string, then 
     * it must be wrapped in double quotes.
     *
     * @param {string|WifiConfig} network   The network to connect
     * @param {callback}    win     success callback
     * @param {callback}    fail    error callback
     */
    this.connect = function(network, win, fail) {
        var connect = network instanceof WifiConfig ? network.ssid() : network;
        cordova.exec(win, fail, 'WifiWizard', 'connectNetwork', [connect]);
    };

    /**
     * This method disables a network if it has been configured. The network
     * can be specified as a double quote wrapped string or as a WifiConfig
     * object.
     *
     * @param {string|WifiConfig} network the network to disable
     * @param {callback}    win     success callback
     * @param {callback}    fail    error callback
     */
    this.disableNetwork = function(network, win, fail) {
        var disable = network instanceof WifiConfig ? network.ssid() : network;
        cordova.exec(win, fail, 'WifiWizard', 'disableNetwork', [disable]);
    };

    /**
     * Hands the list of previously used and configured networks to the `win` success callback function.
     *
     * @param {callback}    win     function that handles array of networks
     * @param {callback}    fail    error callback
     */
    this.listNetworks = function(win, fail) {
        if (typeof win != "function") {
            throw new Error("listNetworks first parameter must be a function to handle array.");
        }
        cordova.exec(win, fail, 'WifiWizard', 'listNetworks', []);
    };

    /**
     * Begins scanning the wifi.
     *
     * @param {callback}    win     success callback
     * @param {callback}    fail    error callback
     */
    this.startScan = function(win, fail) {
        cordova.exec(win, fail, 'WifiWizard', 'startScan', []);
    };

    /**
     * Hands the list of scanned  networks to the `win` success callback function.
     *
     * @param {callback}    win	    callback function that receives list of networks
     * @param {callback}    fail    error callback
     */
    this.getScanResults = function(win, fail) {
        if (typeof win != "function") {
            throw new Error("getScanResults first parameter must be a function to handle array of scan results.");
        }
        cordova.exec(win, fail, 'WifiWizard', 'getScanResults', []);
    };

    /**
     * Retrieves the currently connected SSID and passes it to `win`
     *
     * @param {callback}    win	    function to handle SSID name
     * @param {callback}    fail    error callback
     */
    this.getCurrentSSID = function(win, fail) {
        if (typeof win != "function") {
            throw new Error("getCurrentSSID first parameter must be function to handle SSID");
        }
        cordova.exec(win, fail, 'WifiWizard', 'getConnectedSSID', []);
    };

    /**
     * Enables the wifi adapter. Calls win if successful, calls fail
     * otherwise.
     *
     * @param {callback}    win     success callback function
     * @param {callback}    fail    error callback
     */
    this.enableWifi = function(win, fail) {
        cordova.exec(win, fail, 'WifiWizard', 'setWifiEnabled', [true]); 
    };

    /**
     * Disables the wifi adapater. Callls win if successful, calls fail
     * otherwise.
     *
     * @param {callback}    win     success callback
     * @param {callback}    fail    error callback
     */
    this.disableWifi = function(win, fail) {
        cordova.exec(win, fail, 'WifiWizard', 'setWifiEnabled', [false]);
    };

    /**
     * Passes `true` or `false` to win callback function.
     *
     * @param {callback}    win     success callback
     * @param {callback}    fail    error callback
     */
    this.isWifiEnabled = function(win, fail) {
        if (typeof win != "function") {
            throw new Error("isWifiEnabled first parameter must be a function to handle wifi status.");
        }
        cordova.exec(function(result) { win(!!result); }, 
                     fail, 'WifiWizard', 'isWifiEnabled', []);
    };

    /**
     * Disconnects the currently connected wifi network.
     *
     * @param {callback}    win	    succes callback
     * @param {callback}    fail    error callback
     */
    this.disconnect = function(win, fail) {
        cordova.exec(win, fail, 'WifiWizard', 'disconnect', []);
    };
};

module.exports = WifiWizard;
