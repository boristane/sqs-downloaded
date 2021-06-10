import AWS from "aws-sdk";

export function setAWSCredentials() {
  AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  });
}
