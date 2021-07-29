const logger = require('../utils/logger');
const sendEmail = require('../helpers/send-order-email');
const generateReport = require('../helpers/generate-report-order');

exports.generateReportAndSendEmail = async ({ order }) => {
  try {
    await sendEmail({ order });
    await generateReport({ order });
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
