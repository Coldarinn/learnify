import { Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components"

interface Props {
  confirmationUrl: string
  firstName: string
  lastName: string
}

export const ConfirmEmailTemplate = ({ confirmationUrl, firstName, lastName }: Props) => (
  <Html>
    <Head />
    <Preview>Confirm your email to get started with Tessera</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Confirm your email</Heading>

        <Text style={text}>
          Hi, {lastName} {firstName}!
          <br />
          <br />
          Welcome to <strong>Tessera</strong>! Please confirm your email address to activate your account.
        </Text>

        <Section style={{ textAlign: "center", margin: "30px 0" }}>
          <Button href={confirmationUrl} style={button}>
            Confirm Email
          </Button>
        </Section>

        <Text style={text}>If the button doesn't work, copy and paste the following link into your browser:</Text>

        <Text style={linkText}>
          <Link href={confirmationUrl} style={link}>
            {confirmationUrl}
          </Link>
        </Text>

        <Text style={footerText}>If you did not sign up for Tessera, you can safely ignore this email.</Text>
      </Container>
    </Body>
  </Html>
)

export default ConfirmEmailTemplate

const main = {
  backgroundColor: "#f9fafb",
  padding: "40px 0",
  fontFamily: "'Segoe UI', Roboto, sans-serif",
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 24px",
  borderRadius: "8px",
  maxWidth: "600px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
}

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  textAlign: "center" as const,
  marginBottom: "20px",
}

const text = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#111827",
}

const button = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontSize: "16px",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
}

const link = {
  color: "#2563eb",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
}

const linkText = {
  fontSize: "14px",
  color: "#111827",
  margin: "10px 0",
}

const footerText = {
  fontSize: "12px",
  color: "#6b7280",
  marginTop: "32px",
}
