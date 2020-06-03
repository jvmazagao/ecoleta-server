import knex from '../database/connection';
import { Request, Response } from 'express';

class PointsController {

    async create(req: Request, res: Response) {

        // try {
            const {
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
                items
            } = req.body;

            const point = {
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
                image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80'
            }

            const [id] = await knex('points').returning('id').insert(point);

            const receivedPointItems = items.map((item_id: number) => {
                return {
                    item_id,
                    point_id: Number(id)
                }
            })

            await knex('point_items').insert(receivedPointItems);

            return res.json({
                point_items: {
                    ...receivedPointItems
                },
                point: {
                    id,
                    ...point,
                }
            });
        // } catch {
        //     console.log('error')
        //     return res.sendStatus(400);
        // }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const point = await knex('points').where('id', id).first();

            if (!point) {
                res.status(400).json({ message: 'Point not found' });
            }

            const items = await knex('items').join('point_items', 'items.id', '=', 'point_items.item_id').where('point_items.point_id', id).select('items.title');

            res.json({
                point: {
                    ...point,
                    items: {
                        items,
                    }
                }
            });
        }
        catch{
            res.sendStatus(404)
        }
    }

    async index(req: Request, res: Response) {
        try {
            const { city, uf, items } = req.query;
            const parsedItems = String(items).split(',').map(item => Number(item.trim()));

            const points = await knex('points')
                .join('point_items', 'points.id', '=', 'point_items.point_id')
                .whereIn('point_items.item_id', parsedItems)
                .where('city', String(city))
                .where('uf', String(uf))
                .distinct()
                .select('*');

            res.json(points);

        } catch {
            res.sendStatus(500)
        }
    }
}

export default PointsController;