const canisterIds = require('../../../../config/user.json');
const whitelist = [canisterIds.backendCanisterId, canisterIds.cryptoCanisterId];

const verifyConnection = async () => {
  const connected = await window.ic.plug.isConnected();
  if (!connected) await window.ic.plug.requestConnect({ whitelist });
};

export default verifyConnection;