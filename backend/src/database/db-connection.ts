import { Database } from "sqlite3";
import { SQLITE_PATH } from "../config";

const db = new Database(SQLITE_PATH, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log("Database connected");
});

export const sqliteRun = async (
	sql: string,
	params?: unknown[],
): Promise<unknown> =>
	new Promise((resolve, reject) => {
		db.run(sql, params, (err: unknown, data: unknown) => {
			if (err) return reject(err);

			resolve(data);
		});
	});

export const sqliteGet = async (
	sql: string,
	params?: string[],
): Promise<unknown> =>
	new Promise((resolve, reject) => {
		db.get(sql, params, (err: unknown, data: unknown) => {
			if (err) return reject(err);
			resolve(data);
		});
	});

export const sqliteAll = async (
	sql: string,
	params?: string[],
): Promise<unknown> =>
	new Promise((resolve, reject) => {
		db.all(sql, params, (err: unknown, data: unknown) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
