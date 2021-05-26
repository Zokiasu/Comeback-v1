import admin from './admin';
import { getAuthToken } from './authentication';

export const hasRoles = (req, res, next, roles) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      const user = await req.context.models.User.findByPk(
        userInfo.uid,
      );

      if (roles.includes(user.role)) {
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
