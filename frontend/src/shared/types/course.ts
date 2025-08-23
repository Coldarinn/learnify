export type Course = {
  name: "string"
  description: "string"
  includeVideo: "boolean"
  difficultyLevel: "string"
  category: "string"
  bannerImagePrompt: "string"
  totalDuration: "string"
  learningObjectives: "string"[]
  prerequisites: "string"[]
  chapters: Chapter[]
}

export type Chapter = {
  name: "string"
  description: "string"
  duration: "string"
  imagePrompt: "string"
  topics: Topic[]
}

export type Topic = {
  name: "string"
  description: "string"
  duration: "string"
}
