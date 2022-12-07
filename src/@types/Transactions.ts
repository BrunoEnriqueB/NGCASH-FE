interface Transaction {
  debitedAccountUsername: number;
  creditedAccountUsername: number;
  value: number;
  date: Date;
}

export default interface Transactions {
  sentTransaction: Array<Transaction>;
  receivedTransaction: Array<Transaction>;
}
