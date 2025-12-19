import { NextFunction, Request, Response } from "express";
import { Card, CreateCardRequest } from "../../types/cards";
import { CardIdParams } from "../../types/common";

export const validateCardInput = (
	{ body }: Request<CardIdParams, Card, CreateCardRequest>,
	res: Response,
	next: NextFunction,
) => {
	const sendInputError = (message: string) =>
		res.status(400).send({ error: message });

	if (typeof body !== "object") return sendInputError("Body must be object");
	if (typeof body.text !== "string")
		return sendInputError("Field 'text' must be a string");
	if (!body.text) return sendInputError("Field 'text' must be a non-empty");

	next();
};
