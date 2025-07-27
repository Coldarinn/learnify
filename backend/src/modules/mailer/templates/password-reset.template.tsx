import { Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components"

import { SessionMetadataModel } from "@/modules/session/models/session.model"

interface Props {
  resetUrl: string
  username: string
  metadata: SessionMetadataModel
}

export const PasswordResetTemplate = ({ resetUrl, username, metadata }: Props) => (
  <Html>
    <Head />
    <Preview>Reset your Tessera password</Preview>

    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Reset your password</Heading>

        <Text style={text}>
          {`Hi, ${username}!`}
          <br />
          <br />
          We received a request to reset your password for your Tessera account. If you made this request, click the button below to set a new
          password.
        </Text>

        <Section style={{ textAlign: "center", margin: "30px 0" }}>
          <Button href={resetUrl} style={button}>
            Reset Password
          </Button>
        </Section>

        <Section style={requestInfoSection}>
          <Heading style={requestInfoHeading}>Request details:</Heading>
          <ul style={ulStyle}>
            <li>
              🌍 Location: {metadata.location.country}, {metadata.location.city}
            </li>
            <li>📱 Operating System: {metadata.device.os}</li>
            <li>🌐 Browser: {metadata.device.browser}</li>
            <li>💻 IP Address: {metadata.ip}</li>
          </ul>
          <Text style={grayText}>If you didn’t request this, please ignore this message.</Text>
        </Section>

        <Text style={text}>If the button above doesn't work, copy and paste this link into your browser:</Text>

        <Text style={linkText}>
          <Link href={resetUrl} style={link}>
            {resetUrl}
          </Link>
        </Text>

        <Text style={footerText}>If you didn’t request a password reset, you can safely ignore this email. Your password will not be changed.</Text>
      </Container>
    </Body>
  </Html>
)

export default PasswordResetTemplate

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

const requestInfoSection = {
  backgroundColor: "#f3f4f6",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "24px",
}

const requestInfoHeading = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#18B9AE",
  marginBottom: "12px",
}

const ulStyle = {
  listStyleType: "disc",
  paddingLeft: "20px",
  color: "#111827",
  marginBottom: "8px",
}

const grayText = {
  color: "#6b7280",
  fontSize: "14px",
  marginTop: "8px",
}
