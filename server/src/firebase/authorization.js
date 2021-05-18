import admin from './admin';
import { getAuthToken } from './authentication';

export const checkIfAdmin = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      const user = await req.context.models.User.findByPk(
        userInfo.uid,
      );

      console.log('ici user', user, 'user');
      return next();

      if (userInfo.admin === true) {
        req.authId = userInfo.uid;
        return next();
      }

      throw new Error('unauthorized');
    } catch (e) {
      return res.status(401).send({
        error: 'You are not authorized to make this request',
      });
    }
  });
};
