import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const ratelimiternew = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(250, "1 m"),
});

export async function ratelimiter(req, res, next) {
  try {
    const { success } = await ratelimiternew.limit("job");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many request please try again later" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "error in ratelimiter", error: error });
  }
}
    