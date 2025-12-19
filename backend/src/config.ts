import { CorsOptions } from "cors";
import "dotenv/config";

export const PORT = +(process.env.PORT ?? 4000);
export const SQLITE_PATH = process.env.SQLITE_PATH ?? "./db.db";
export const CORS_OPTIONS: CorsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200,
};
