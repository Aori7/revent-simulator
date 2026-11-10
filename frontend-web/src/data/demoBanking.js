
/**
 * Fictional banking data for the OCBC stakeholder prototype.
 * No real customer information or banking API is used.
 */

export const demoCustomer = {
  id: "demo-kiki",
  firstName: "Kiki",
};

export const demoAccount = {
  id: "demo-savings-1",
  type: "REVENT Savings Account",
  accountNumber: "987-545678-876",
  currency: "SGD",
  balance: 6700,
  lockedAmount: 10000,
};

export const demoTransactions = [
  {
    id: "txn-1005",
    accountId: demoAccount.id,
    customerId: demoCustomer.id,
    name: "NTUC FairPrice",
    type: "Card Payment",
    date: "9 Nov 2026",
    time: "17:42",
    amount: -42.80,
    icon: "shopping",
    status: "Completed",
    reference: "RV-20261109-1005",
    counterparty: "NTUC FairPrice",
    counterpartyNumber: "4567890123456789",
    description: "Grocery purchase",
  },
  {
    id: "txn-1004",
    accountId: demoAccount.id,
    customerId: demoCustomer.id,
    name: "Alex Tan",
    type: "PayNow Transfer",
    date: "8 Nov 2026",
    time: "14:20",
    amount: -150,
    icon: "transfer",
    status: "Completed",
    reference: "RV-20261108-1004",
    counterparty: "Alex Tan",
    counterpartyNumber: "91234567",
    description: "Transfer to contact",
  },
  {
    id: "txn-1003",
    accountId: demoAccount.id,
    customerId: demoCustomer.id,
    name: "Salary Credit",
    type: "Bank Transfer",
    date: "7 Nov 2026",
    time: "09:05",
    amount: 2500,
    icon: "incoming",
    status: "Completed",
    reference: "RV-20261107-1003",
    counterparty: "ABC Company",
    counterpartyNumber: "123456789012",
    description: "Monthly salary",
  },
  {
    id: "txn-1002",
    accountId: demoAccount.id,
    customerId: demoCustomer.id,
    name: "SP Services",
    type: "Bill Payment",
    date: "6 Nov 2026",
    time: "10:12",
    amount: -85.60,
    icon: "bill",
    status: "Completed",
    reference: "RV-20261106-1002",
    counterparty: "SP Services",
    counterpartyNumber: "1133557799",
    description: "Utilities bill",
  },
  {
    id: "txn-1001",
    accountId: demoAccount.id,
    customerId: demoCustomer.id,
    name: "Grab",
    type: "Card Payment",
    date: "5 Nov 2026",
    time: "20:31",
    amount: -18.90,
    icon: "shopping",
    status: "Completed",
    reference: "RV-20261105-1001",
    counterparty: "Grab Singapore",
    counterpartyNumber: "5555444433332222",
    description: "Transport fare",
  },
];

export const startingPayment = {
  recipientName: "Online Marketplace Seller",
  recipientNumber: "91234567",
  amount: "280.00",
  reference: "Headphones purchase",
};
