import { Request, Response } from 'express';
import pool from '../db';

// Get paginated users
export const getUsers = async (req: Request, res: Response) => {
    try {
        let { page, limit } = req.query;

        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const offset = (pageNumber - 1) * limitNumber;

        const users = await pool.query(
            `SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2`,
            [limitNumber, offset]
        );

        const total = await pool.query(`SELECT COUNT(*) FROM users`);
        const totalUsers = parseInt(total.rows[0].count);

        res.json({
            totalUsers,
            totalPages: Math.ceil(totalUsers / limitNumber),
            currentPage: pageNumber,
            users: users.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};
