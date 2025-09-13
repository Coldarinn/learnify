import { Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components"

import { SessionMetadataModel } from "@/modules/session/models/session.model"

interface Props {
  changeUrl: string
  firstName: string
  lastName: string
  metadata: SessionMetadataModel
}

export const EmailChangeTemplate = ({ changeUrl, firstName, lastName, metadata }: Props) => (
  <Html>
    <Head />
    <Preview>Confirm your email change request</Preview>

    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Confirm your new email</Heading>

        <Text style={text}>
          Hi, {lastName} {firstName}!
          <br />
          <br />
          You recently requested to change the email associated with your Learnlify account. To confirm this change, please click the button below:
        </Text>

        <Section style={buttonSection}>
          <Button href={changeUrl} style={button}>
            Confirm Email Change
          </Button>
        </Section>

        <Section style={requestInfoSection}>
          <Heading style={requestInfoHeading}>Request details:</Heading>
          <ul style={ulStyle}>
            <li>
              🌍 Location: {metadata.location.country}, {metadata.location.city}
            </li>
            <li>📱 OS: {metadata.device.os}</li>
            <li>🌐 Browser: {metadata.device.browser}</li>
            <li>💻 IP Address: {metadata.ip}</li>
          </ul>
          <Text style={grayText}>If this wasn't you, please ignore this email — your email address won’t be changed.</Text>
        </Section>

        <Text style={text}>If the button doesn't work, copy and paste this link into your browser:</Text>

        <Text style={linkText}>
          <Link href={changeUrl} style={link}>
            {changeUrl}
          </Link>
        </Text>

        <Text style={footerText}>This link will expire shortly for your security.</Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeTemplate

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
  backgroundColor: "#f76818",
  color: "#ffffff",
  fontSize: "16px",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
}

const link = {
  color: "#f76818",
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

const buttonSection = {
  textAlign: "center" as const,
  margin: "30px 0",
}
