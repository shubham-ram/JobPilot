import { Router, Request, Response } from "express";
import { generateAnswer } from "../services/gemini.service";

const router = Router();

// POST /api/generate — stateless proxy to Gemini
router.post("/", async (req: Request, res: Response) => {
  try {
    const { profileContext, jobDescription, question, companyName, maxChars, captchaToken } =
      req.body;

    if (!jobDescription || !question) {
      res
        .status(400)
        .json({ error: "jobDescription and question are required" });
      return;
    }

    if (!captchaToken) {
      res.status(400).json({ error: "CAPTCHA token is required" });
      return;
    }

    // Verify Turnstile Token
    const secret = process.env.TURNSTILE_SECRET_KEY || "";
    if (secret) {
      const verifyFormData = new URLSearchParams();
      verifyFormData.append("secret", secret);
      verifyFormData.append("response", captchaToken);

      const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: verifyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const verifyData = await verifyResponse.json() as any;
      if (!verifyData.success) {
        console.error("Turnstile verification failed:", verifyData);
        res.status(403).json({ error: "CAPTCHA verification failed" });
        return;
      }
    }

    const answer = await generateAnswer({
      profileContext: profileContext || "",
      jobDescription,
      question,
      companyName,
      maxChars: maxChars ? parseInt(maxChars, 10) : undefined,
    });

    res.json({ answer });
  } catch (error) {
    console.error("Error generating answer:", error);
    res.status(500).json({ error: "Failed to generate answer" });
  }
});

export default router;
