// api/index.js
export default function handler(req: any, res: any) {
    res.status(200).json({ msg: "Hello from API!" });
  }
  