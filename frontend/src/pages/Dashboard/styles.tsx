import styled from "@emotion/styled"

export const Banner = styled.div`
  padding: var(--gap-4xl) var(--gap-3xl);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--radius-md);

  background: linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-yellow-400) 40%, var(--color-blue-500) 100%);

  .content {
    padding: var(--gap-3xl) var(--gap-2xl);

    max-width: 100%;
    width: 720px;

    background: var(--color-transparent-dark-100);
    border-radius: var(--radius-md);
    backdrop-filter: blur(16px);

    text-align: center;

    h2 {
      margin-bottom: var(--gap-md);

      font: var(--font-heading-m);
    }

    p {
      margin-bottom: var(--gap-2xl);

      font: var(--font-subheading-xl);
    }
  }
`
export const Intro = styled.div`
  margin-top: var(--gap-xl);
`
export const Empty = styled.section`
  padding: var(--gap-3xl) var(--gap-2xl);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background: var(--color-surface-base-secondary);
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--radius-md);

  img {
    width: 200px;
  }

  h2 {
    margin-bottom: var(--gap-xl);

    font: var(--font-heading-s);
  }
`
export const Courses = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-2xl);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--color-text-primary);
    }
  }
`
export const CoursesHeader = styled.div``
export const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`
