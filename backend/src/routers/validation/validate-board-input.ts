import { NextFunction, Request, Response } from "express";
import { Board, CreateBoardRequest } from "../../types/boards";
import { BoardIdParam } from "../../types/common";

export const validateBoardInput = (
	{ body }: Request<BoardIdParam, Board, CreateBoardRequest>,
	res: Response,
	next: NextFunction,
) => {
	const sendInputError = (message: string) =>
		res.status(400).send({ error: message });

	if (typeof body !== "object") return sendInputError("Body must be object");
	if (typeof body.name !== "string")
		return sendInputError("Field 'name' must be a string");
	if (!body.name) return sendInputError("Field 'name' must be a non-empty");

	next();
};
