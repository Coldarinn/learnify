module.exports = {
  "frontend/src/**/*.{js,jsx,ts,tsx,md,html,css}": ["npm --prefix frontend run format"],
  "backend/{src,test}/**/*.ts": ["npm --prefix backend run format"],
};
