export default async function handler(req, res) {
  // Zoom Challenge-Response validation
  if (req.body?.event === "endpoint.url_validation") {
    const crypto = require("crypto");
    const hash = crypto
      .createHmac("sha256", process.env.ZOOM_SECRET_TOKEN)
      .update(req.body.payload.plainToken)
      .digest("hex");
    return res.json({
      plainToken: req.body.payload.plainToken,
      encryptedToken: hash,
    });
  }
  res.status(200).json({ ok: true });
}
