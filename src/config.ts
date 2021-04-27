import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  uptimeRobotReadonlyKey: string;
}

const config = (): EnvConfig => {
  return {
    uptimeRobotReadonlyKey: process.env.UPTIME_ROBOT_READONLY_KEY,
  };
};

export default config;
