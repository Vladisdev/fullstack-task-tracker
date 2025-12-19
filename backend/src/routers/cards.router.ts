import { randomUUID } from "crypto";
import express, { Request, Response } from "express";
import {
	createCard,
	deleteCard,
	getCard,
	getCards,
	updateCard,
} from "../database/cards-repository";
import { getColumn } from "../database/columns-repository";
import {
	Card,
	CreateCardRequest,
	GetCardsResponse,
	UpdateCardRequest,
} from "../types/cards";
import { CardIdParams, ColumnIdParams } from "../types/common";
import { checkCardExistence, checkColumnExistence } from "./middleware";
import { validateCardInput } from "./validation";

export const cardsRouter = express.Router({
	mergeParams: true,
});

cardsRouter.get(
	"/",
	async (req: Request<ColumnIdParams>, res: Response<GetCardsResponse>) => {
		const { params } = req;

		const cards = await getCards(params);

		res.status(200).send(cards);
	},
);

cardsRouter.get(
	"/:cardId",
	async (req: Request<CardIdParams>, res: Response<Card | string>) => {
		const { params } = req;

		const card = await getCard(params);

		if (!card) {
			res.status(404).send(`There is no card with id ${params.cardId}`);
			return;
		}

		res.status(200).send(card);
	},
);

cardsRouter.post(
	"/",
	validateCardInput,
	checkColumnExistence,
	async (
		req: Request<ColumnIdParams, Card, CreateCardRequest>,
		res: Response<Card>,
	) => {
		const { params, body } = req;

		const card: Card = {
			id: randomUUID(),
			text: body.text,
			columnId: params.columnId,
		};

		await createCard(card);

		res.status(201).send(card);
	},
);

cardsRouter.put(
	"/:cardId",
	validateCardInput,
	checkCardExistence,
	async (
		req: Request<CardIdParams, Card, UpdateCardRequest>,
		res: Response<Card | string>,
	) => {
		const { params, body } = req;

		if (!("columnId" in body)) {
			return res.status(400).send('You must provide a "columnId" field');
		}

		if (params.columnId !== body.columnId) {
			const newColumn = await getColumn(body.columnId, params.boardId);

			if (!newColumn)
				return res
					.status(404)
					.send(`No column with id ${body.columnId}`);
		}

		const card: Card = {
			id: params.cardId,
			text: body.text,
			columnId: params.columnId,
		};

		await updateCard(card);
		res.sendStatus(204);
	},
);

cardsRouter.delete(
	"/:cardId",
	checkCardExistence,
	async (req: Request<CardIdParams>, res: Response<void>) => {
		const { params } = req;

		await deleteCard(params.cardId);
		res.sendStatus(205);
	},
);
