const { pool } = require("../config/db");
const { getNextAvailableIP } = require("../services/IP_service");
// Get all machines
exports.getAllMachines = async () => {
    try {
      const result = await pool.query("SELECT * FROM machines");
      return result.rows;  // Return all rows from the query result
    } catch (error) {
      console.error("Error fetching all machines:", error);
      throw new Error("Failed to fetch machines");
    }
  };
  
// Add a new machine
exports.addMachine = async ({ name, unit, service }) => {
try {
    const IP = await getNextAvailableIP(service);
    const result = await pool.query(
    "INSERT INTO machines (name, unit, IP, service) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, unit, IP, service]
    );
    return result.rows[0];  // Return the added machine
} catch (error) {
    console.error("Error adding machine:", error);
    throw new Error("Failed to add machine");
}
};

// Delete a machine by name
exports.deleteMachine = async (name) => {
try {
    const result = await pool.query("DELETE FROM machines WHERE name = $1", [name]);
    if (result.rowCount === 0) {
    return { message: `No machine found with the name: ${name}` };  // Handle case where no rows were deleted
    }
    return { message: `Machine ${name} deleted successfully` };
} catch (error) {
    console.error("Error deleting machine:", error);
    throw new Error("Failed to delete machine");
}
};