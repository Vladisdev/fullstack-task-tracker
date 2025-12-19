import { NextFunction, Request, response, Response } from "express";
import { getColumn } from "../../database/columns-repository";
import { ColumnIdParams } from "../../types/common";

export const checkColumnExistence = async (
	req: Request<ColumnIdParams>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const {
		params: { boardId, columnId },
	} = req;

	const data = await getColumn(columnId, boardId);

	if (data) return next();

	response.status(404).send(`There is no column with id ${columnId}`);
};
