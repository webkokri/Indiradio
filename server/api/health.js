export default function handler(req, res) {
  res.status(200).json({ ok: true, service: 'indiradio-server', time: new Date().toISOString() })
}
