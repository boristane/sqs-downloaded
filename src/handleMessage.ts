import { createWriteStream } from "fs";
import logger from "logger";
import { SQSMessage } from "sqs-consumer";

process.env.FILENAME = "result.json";
const stream = createWriteStream(process.env.FILENAME!, { flags: 'a' });

export async function handleMessage(message: SQSMessage) {
  logger.info("Message received from SQS", { id: message.MessageId });
  if (!message.Body) return;
  const data = JSON.parse(message.Body);
  stream.write(`${JSON.stringify(data)},\n`);
}
