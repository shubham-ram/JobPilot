import { GoogleGenerativeAI } from "@google/generative-ai";

interface GenerateParams {
  profileContext: string;
  jobDescription: string;
  question: string;
  companyName?: string;
  maxChars?: number;
}

export async function generateAnswer(params: GenerateParams): Promise<string> {
  const { profileContext, jobDescription, question, companyName, maxChars } =
    params;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const charLimitGuideline = maxChars
    ? `- CRITICAL: The answer MUST be under ${maxChars} characters total. Count carefully. This is a hard limit from the application form.`
    : `- Keep the answer concise and under 800 characters. Most job application fields have tight limits.`;

  const prompt = `You are a career assistant helping a job applicant answer application questions.
Based on their professional background and the job description provided, generate a tailored, authentic-sounding answer.

## USER PROFILE
${profileContext}

## JOB DESCRIPTION
${companyName ? `Company: ${companyName}\n` : ""}${jobDescription}

## QUESTION
${question}

## GUIDELINES
- Sound human and genuine, not AI-generated
- Reference specific experiences from the user's profile when relevant
- Connect the user's background to the company/role requirements mentioned in the JD
${charLimitGuideline}
- Don't use overly formal or generic language
- Be specific rather than vague — mention real projects, technologies, or achievements from the profile
- Do NOT include any heading, label, or prefix — output ONLY the answer text`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}
