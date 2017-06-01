import Tzu from '../models/tzu';

export function createTzu(req, res) {
  const newTzu = new Tzu(req.body.tzu);
  newTzu.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tzu: saved });
  });
}
