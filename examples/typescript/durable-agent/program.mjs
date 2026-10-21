// The program an LLM would write. `requestApproval` is a tool like any other;
// the host just chooses not to answer it until a human does.
export const PROGRAM = `
const order = await getOrder({ id: orderId });
const [customer, policy] = await Promise.all([
  getCustomer({ id: order.customerId }),
  getRefundPolicy({ sku: order.sku }),
]);
const amount = Math.min(order.total, policy.maxRefund);

if (amount > 100) {
  const ok = await requestApproval({ orderId, amount });
  if (!ok.approved) throw new Error(\`denied by \${ok.by}\`);
}
const refund = await issueRefund({ orderId, amount });
await notifyCustomer({ email: customer.email, amount });
({ refundId: refund.id, amount });
`;
