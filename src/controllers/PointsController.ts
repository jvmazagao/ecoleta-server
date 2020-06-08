import knex from '../database/connection';
import { Request, Response } from 'express';

class PointsController {

    async create(req: Request, res: Response) {

        try {
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
                image: req.file.filename
            }

            const [id] = await knex('points').returning('id').insert(point);

            const receivedPointItems = items.split(',').map((item: string) => Number(item.trim)).map((item_id: number) => {
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
        } catch {
            console.log('error')
            return res.sendStatus(400);
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const point = await knex('points').where('id', id).first();

            if (!point) {
                res.status(400).json({ message: 'Point not found' });
            }

            const serialization = 
                 {
                    ...point,
                    image_url: `http://192.168.31.199:3333/uploads/${point.image}`
                }
            
            const items = await knex('items').join('point_items', 'items.id', '=', 'point_items.item_id').where('point_items.point_id', id).select('items.title');


            res.json({
                point: {
                    ...serialization,
                    items,
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

            const serialization = points.map(point => {
                return {
                    ...point,
                    image_url: `http://192.168.31.199:3333/uploads/${point.image}`
                }
            })

            return res.json(serialization);

        } catch {
            res.sendStatus(500)
        }
    }
}

export default PointsController;