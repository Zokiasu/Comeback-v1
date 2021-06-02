import { ROLES } from '../constants';
import admin from './admin';

export const createUser = async (req, res) => {
  const { email, username, password } = req.body;

  admin
    .auth()
    .createUser({
      email,
      password,
    })
    .then(async (user) => {
      const data = {
        id: user.uid,
        username,
        email,
        role: ROLES.ADMIN,
      };

      const user_data = await req.context.models.User.create(data);

      req.context = {
        me: user_data,
      };

      return res.send(user_data);
    })
    .catch((error) => {
      return res.send(error);
    });
};
