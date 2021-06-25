import { Router } from 'express';
import { queriesToDict } from '../helpers/routes';

const router = Router();

router.get('/', async(req, res) => {
    const comments = await req.context.models.Comment.findAll({
        ...queriesToDict(req.query),
        include: [
            {model: req.context.models.Comment, as: "answers"},
        ],
    });
    return res.send(comments);
});

export default router;