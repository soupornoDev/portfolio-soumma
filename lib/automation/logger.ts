import { AutomationRunLog } from "./types";
import fs from "fs";
import path from "path";

const MAX_LOGS = 50;
const memoryLogs: AutomationRunLog[] = [];

/**
 * Record an automation run entry to memory and disk (if writable).
 */
export function recordAutomationLog(entry: Omit<AutomationRunLog, "id" | "timestamp">): AutomationRunLog {
  const fullLog: AutomationRunLog = {
    id: `run_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };

  memoryLogs.unshift(fullLog);
  if (memoryLogs.length > MAX_LOGS) {
    memoryLogs.pop();
  }

  // Attempt to write to local logs directory in development or persistent environments
  try {
    const logsDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const logFilePath = path.join(logsDir, "automation-runs.json");
    fs.writeFileSync(logFilePath, JSON.stringify(memoryLogs.slice(0, 30), null, 2), "utf8");
  } catch (err) {
    // Graceful fallback for read-only serverless file systems
    console.warn("[Logger] Local file write skipped:", err);
  }

  return fullLog;
}

export function getAutomationLogs(): AutomationRunLog[] {
  // If memory log is empty, try to hydrate from file
  if (memoryLogs.length === 0) {
    try {
      const logFilePath = path.join(process.cwd(), "logs", "automation-runs.json");
      if (fs.existsSync(logFilePath)) {
        const fileContent = fs.readFileSync(logFilePath, "utf8");
        const parsed = JSON.parse(fileContent);
        if (Array.isArray(parsed)) {
          memoryLogs.push(...parsed);
        }
      }
    } catch {
      // Ignore
    }
  }

  return memoryLogs;
}
