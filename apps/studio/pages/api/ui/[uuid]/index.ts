
export default function handler(req, res) {
  if (req.method === 'GET') {
    const { uuid } = req.query;
    console.log(uuid);
    res.status(200).json({});
  }
}
