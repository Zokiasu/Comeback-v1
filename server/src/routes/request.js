import { Router } from 'express';
import { queriesToDict } from '../helpers/routes';

const router = Router();

router.get('/', async (req, res) => {
  const requets = await req.context.models.Request.findAll({
    ...queriesToDict(req.query),
    include: [req.context.models.User],
  });
  return res.send(requets);
});

router.get('/:requestId', async (req, res) => {
  const request = await req.context.models.Request.findByPk(
    req.params.requestId,
    {
      include: [req.context.models.User],
    },
  );
  return res.send(request);
});

router.post('/', async (req, res) => {
  const definitiveBody = {
    method: req.body.method,
    endpoint: req.body.endpoint,
    body: req.body.body,
    current_data: req.body.current_data,
    userId: req.body.userId,
  };
  const request = await req.context.models.Request.create(
    definitiveBody,
  );
  return res.send(request);
});

router.put('/:requestId', async (req, res) => {
  const request = await req.context.models.Request.findByPk(
    req.params.requestId,
  );
  request.update(req.body);
  return res.send(request);
});

router.delete('/:requetId', async (req, res) => {
  const request = await req.context.models.Request.findByPk(
    req.params.requetId,
  );
  request.destroy(req.body);
  return res.send(request);
});

export default router;
