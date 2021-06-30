import { Router } from 'express';
import { queriesToDict } from '../helpers/routes';

const router = Router();

router.get('/', async (req, res) => {
  const requests = await req.context.models.Request.findAll({
    ...queriesToDict(req.query),
    include: [req.context.models.User],
  });
  return res.send(requests);
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
  // we don't want anyone to manipulate the state
  delete req.body['state'];
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
