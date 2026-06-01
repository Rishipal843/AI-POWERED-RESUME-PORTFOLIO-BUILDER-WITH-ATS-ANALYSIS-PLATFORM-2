const cron = require("node-cron");
const delresumes = require("../model/Atsmodel");

// Runs at 00:00 on the 1st day of every month
cron.schedule("00 00 1 * *", async () => {
  try {
    const result = await delresumes.deleteMany({});
    console.log("Data deleted:", result.deletedCount);
  } catch (error) {
    console.error("Cron error:", error);
  }
}, {
  timezone: "Asia/Kolkata"
});