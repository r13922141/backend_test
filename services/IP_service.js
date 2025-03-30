const { pool } = require("../config/db");

async function getNextAvailableIP(service) {
  try {
    // 取得 service 對應的 subnet (10.0.N.x)
    let subnet;
    const subnetQuery = await pool.query(
      "SELECT DISTINCT substring(IP FROM '10\\.0\\.(\\d+)\\.')::int AS subnet FROM machines WHERE service = $1",
      [service]
    );

    if (subnetQuery.rows.length === 0) {
      // 沒有找到此 service，分配新 subnet
      const maxSubnetQuery = await pool.query(
        "SELECT MAX(substring(IP FROM '10\\.0\\.(\\d+)\\.')::int) AS max_subnet FROM machines"
      );
      subnet = maxSubnetQuery.rows[0].max_subnet ? maxSubnetQuery.rows[0].max_subnet + 1 : 1;
    } else {
      // 已有此 service，使用現有 subnet
      subnet = subnetQuery.rows[0].subnet;
    }

    // 查詢目前該 subnet 最大的 IP
    const result = await pool.query(
      "SELECT IP FROM machines WHERE IP LIKE $1 ORDER BY IP DESC LIMIT 1",
      [`10.0.${subnet}.%`]
    );

    let nextIP;
    if (result.rows.length === 0) {
      nextIP = `10.0.${subnet}.0`;
    } else {
      const lastIP = result.rows[0].ip;
      const ipParts = lastIP.split(".").map(Number);

      if (ipParts[3] < 254) {
        ipParts[3] += 1;
      } else {
        throw new Error(`No available IPs left in subnet 10.0.${subnet}.x`);
      }

      nextIP = ipParts.join(".");
    }

    // 確保 IP 沒有重複
    const checkIP = await pool.query("SELECT IP FROM machines WHERE IP = $1", [nextIP]);
    if (checkIP.rows.length > 0) {
      return await getNextAvailableIP(service);
    }

    return nextIP;
  } catch (error) {
    console.error("Error getting next available IP:", error);
    throw new Error("Failed to get available IP");
  }
}

module.exports = { getNextAvailableIP };