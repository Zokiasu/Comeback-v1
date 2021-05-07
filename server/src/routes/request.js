import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const requets = await req.context.models.Request.findAll({
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
  const request = await req.context.models.Request.create(req.body);
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
