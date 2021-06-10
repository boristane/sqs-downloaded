import { Consumer } from "sqs-consumer";
import logger from "logger";

import { handleMessage } from "./handleMessage";

export function startSqsConsumer() {
  const queueUrl = process.env.SQS_QUEUE_URL;
  const region = process.env.SQS_REGION;

  if (!region || !queueUrl) {
    logger.fatal("Required SQS environment variable missing", {
      queueUrl: !!queueUrl,
      region: !!region,
    });
    return;
  }

  const consumer = Consumer.create({
    queueUrl,
    region,
    handleMessage: logger.bindFunction(handleMessage),
  });

  consumer.on("error", (err: any, message: any) => {
    logger.error("Something went wrong with SQS", {
      queueUrl: queueUrl,
      queueMessage: message,
      error: err,
    });
  });

  consumer.start();
  logger.info("SQS properly started", {
    queueUrl: queueUrl,
  });
}

