import admin from './admin';

export const createUser = async (req, res) => {
  const { email, username, password } = req.body;

  const user = await admin.auth().createUser({
    email,
    password,
  });

  const data = { id: user.uid, username };

  const user_data = await req.context.models.User.create(data);

  return res.send(user_data);
};
