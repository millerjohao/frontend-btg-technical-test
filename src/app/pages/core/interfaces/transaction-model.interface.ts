export interface ITransaction {
    id:              string;
    customer:        Customer;
    fund:            Fund;
    transactionType: string;
    transactionDate: Date;
    amount:          number;
}

export interface Customer {
    id:               number;
    name:             string;
    email:            string;
    phone:            string;
    balance:          number;
    notificationType: string;
}

export interface Fund {
    id:        number;
    name:      string;
    minAmount: number;
    category:  string;
}