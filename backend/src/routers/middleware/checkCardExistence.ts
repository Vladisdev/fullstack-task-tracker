import { NextFunction, Request, response, Response } from "express";
import { getCard } from "../../database/cards-repository";
import { CardIdParams } from "../../types/common";

export const checkCardExistence = async (
	req: Request<CardIdParams>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { params } = req;

	const data = await getCard(params);

	if (data) return next();

	response.status(404).send(`Some of id's is wrong`);
};
