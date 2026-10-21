// The program an LLM would write. `requestApproval` is a tool like any other;
// the host just chooses not to answer it until a human does.
export const PROGRAM = `
const order = await getOrder({ id: orderId });
const [customer, policy] = await Promise.all([
  getCustomer({ id: order.customerId }),
  getRefundPolicy({ sku: order.sku }),
]);
const amount = Math.min(order.total, policy.maxRefund);

let decision = { approved: true, by: "auto" };
if (amount > 100) {
  decision = await requestApproval({ orderId, amount, customer: customer.name });
}

let result;
if (decision.approved) {
  const refund = await issueRefund({ orderId, amount, idempotencyKey: orderId });
  await notifyCustomer({ email: customer.email, text: \`Refunded $\${amount}\` });
  result = { status: "refunded", amount, refundId: refund.id, approvedBy: decision.by };
} else {
  result = { status: "declined", by: decision.by };
}
result;
`;
