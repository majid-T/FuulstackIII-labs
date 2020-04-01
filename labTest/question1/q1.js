let balance = 0;

const deposit = (amount)=>{
    balance += amount;
    console.log(`Deposit ${amount} into account.`);
}

const withdrawal = (amount)=>{
    balance -= amount;
    console.log(`Withdrawal ${amount} from account.`);
}

const checkBalance = ()=>{
    console.log(`The balance is ${balance}`);
}

// Code output checks
checkBalance();
deposit(100);
checkBalance();
withdrawal(25);
checkBalance();
