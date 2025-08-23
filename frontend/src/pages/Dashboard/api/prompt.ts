export const PROMPT = `
Generate a learning course in **valid JSON** only, based strictly on the provided user input.

Rules:
1. Output must be **only valid JSON** with no extra text or code blocks.
2. Follow the schema exactly (do not add or remove fields).
3. All values must be logically consistent with the user input and relevant to the course topic.
4. Number of chapters (numOfChapters) should be **decided by AI based on course difficulty**:
   - Beginner: 4–8 chapters
   - Intermediate: 8–15 chapters
   - Advanced: 12–20 chapters
5. For "bannerImagePrompt" and "imagePrompt":
   - They must be **long, detailed text prompts** describing the image.
   - Style: modern flat-style 2D digital illustration, vibrant color palette (blues, purples, oranges), clean professional look, tech-savvy, educational.
   - Include elements relevant to the course topic, e.g., mockup screens, icons, diagrams, sticky notes, creative workspace tools.
   - Write them as **a single JSON string on one line**, escape any internal quotes if needed.
6. Text length recommendations:
   - course.name: ≤ 60 characters
   - course.description: ≤ 200 characters
   - chapter.name: ≤ 50 characters
   - chapter.description: ≤ 150 characters
   - topic.name: ≤ 40 characters
   - topic.description: ≤ 100 characters
7. totalDuration format: "X hours Y minutes".
8. Do not include explanations, comments, or any text outside the JSON.

Schema:
{
  name: "string"
  description: "string"
  numOfChapters: "number"
  includeVideo: "boolean"
  difficultyLevel: "string"
  category: "string"
  bannerImagePrompt: "string"
  totalDuration: "string"
  learningObjectives: "string"[]
  prerequisites: "string"[]
  chapters: Chapter[]
}

Chapter = {
  name: "string"
  description: "string"
  duration: "string"
  imagePrompt: "string"
  topics: Topic[]
}

Topic = {
  name: "string"
  description: "string"
  duration: "string"
}

User input:
`
