'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');

  });
}
createUsernames(accounts);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,mov) => acc+mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
  


}

const displayMovements = function(movements,sort = false){
  containerMovements.innerHTML = '';
const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

  movs.forEach(function(mov,i){
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__value">${mov}€</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
      });
};

const calcDisplaySummary = function (accnt){
  const incomes = accnt.movements
  .filter(mov => mov > 0)
  .reduce((acc,mov) => acc+mov,0);
  labelSumIn.textContent = `${incomes}€`;

  const out = accnt.movements
  .filter(mov => mov < 0)
  .reduce((acc,mov) => acc+mov,0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = accnt.movements
  .filter(mov => mov > 0)
  .map(deposit => deposit*accnt.interestRate/100)
  .filter(int => int >= 1)
  .reduce((acc,int) => acc+int,0)

  labelSumInterest.textContent = `${interest}€`
}

const updateUI = function(acc){
  displayMovements(acc.movements);

      //Display balance
calcDisplayBalance(acc);

      //Display summary
calcDisplaySummary(acc);
}






//////////EVENT HANDLER
let currentAccount; 
//LOGIN BUTTON FUNCTIONALITY
btnLogin.addEventListener('click', function(e){
  //prevent form from submitting 
  e.preventDefault();
currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value);
    if(currentAccount?.pin === Number(inputLoginPin.value)){
      //Display UI and Welcome Message
labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
containerApp.style.opacity = 100; 
inputLoginUsername.value = inputLoginPin.value = '';
inputLoginPin.blur();
updateUI(currentAccount);
}

})


btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(amount,recieverAcc);
inputTransferAmount.value = inputTransferTo.value = '';


  if(amount > 0 && 
    recieverAcc &&
    currentAccount.balance >= amount && recieverAcc?.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);
    //DELETE ACCOUNT
    accounts.splice(index, 1);

    //HIDE UI
    containerApp.style.opacity = 0;
    console.log(accounts)
  }
  inputCloseUsername.value = inputClosePin = '';
 
})

btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)){
    //add movement
    currentAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);

  }
  inputLoanAmount.value ='';

})

let sorted = false;

btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements);

// const owners = ['Jonas','Zach','Adam','Martha'];
// console.log(owners.sort());
// console.log(owners);

// //Numbers
// console.log(movements);

// //return < 0 a,b (keep order)
// //return > 0 b a (switch order)
// movements.sort((a, b) => b - a);
// console.log(movements);



// //EQUALITY
// console.log(movements.includes(-130));
// // //CONDITION
// const anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits);

// displayMovements(account1.movements); 

// //EVERY
// console.log(movements.every(mov => mov > 0))
// console.log(account4.movements.every(mov => mov > 0));

// //Separate Call back 
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// // const arr= [[1,2,3],[4,5,6],7,8];
// // const arrDeep= [[[1,2],3],[4,[5,6]],7,8];
// // console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);

// const allMovements = accountMovements.flat();


// const overallBalance = allMovements.reduce((acc,mov) => acc+mov,0);
// console.log(overallBalance);
// //flat
// const overalBalance = accounts.map(acc => acc.movements).flat().reduce((acc,mov) => acc+mov,0);
// console.log(overalBalance);


// //flatmap
// const overlBalance = accounts.flatMap(acc => acc.movements).reduce((acc,mov) => acc+mov,0);
// console.log(overlBalance);




 

// const checkDogs = function(dogsJulia,dogsKate){
//   const  juliaCorrected = dogsJulia.slice();
//   juliaCorrected.splice(0,1);
//   juliaCorrected.splice(-2);

//   const dogs = juliaCorrected.concat(dogsKate);
//   dogs.forEach(function(value,i){

//     value > 2 ? console.log(`Dog number ${i+1} is an adult, and is ${value} years old`) : console.log(`Dog number ${i+1} is still a puppy 🐶`);
    
    
//   })
// }

// checkDogs([3,5,2,12,7],[4,1,15,8,3])


// const euroToUsd = 1.1;
// const movementsUSD = account1.movements.map(function(mov){
//   return mov * euroToUsd;
// })

// console.log(movements);
// console.log(movementsUSD);


// const movementsUsdfor = [];
// for(const mov of movements)
// movementsUsdfor.push(mov * euroToUsd);
// console.log(movementsUsdfor);



// const movementsDescriptions = movements.map((mov,i) =>
//   `Movement ${i+1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
//   );

// console.log(movementsDescriptions);

//Maximum value

// const maxmov = movements.reduce((max,cur) => {
//   if(max > cur)
//   return max;
//   else 
//   return max = cur;
// }, movements[0]);

// console.log(maxmov);

// Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// const calcAverageHumanAge = ages => 
// ages
// .map(age => (age <= 2 ? 2*age : 16 + age*4))
// .filter(age => age >= 18)
// .reduce((acc,age,i,arr) => acc+age / arr.length,0);

//  console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

//pipeline
// const euroToUsd = 1.1;
// const totalDepositsUSD = movements
// .filter(mov => mov > 0)
// //.map(mov => mov * euroToUsd)
// .map((mov,i,arr) => {
//   console.log(arr);
//   return mov * euroToUsd})
// .reduce((acc,mov) => acc+mov,0)
// console.log(totalDepositsUSD);

// const firstWithdrawal = movements.find(mov => mov<0);

// console.log(movements);
// console.log(firstWithdrawal); 
// console.log(accounts);

// const account  = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// const deposits = movements.filter(function(mov){
//   return mov > 0;
// })
// console.log(movements);
// console.log(deposits);


// const depositsFor = [];
// for( const mov of movements) if(mov > 0) depositsFor.push(mov);

// console.log(depositsFor);

// const withdrawals = movements.filter(mov => mov < 0)
// console.log(withdrawals);

// console.log(movements);


//accumulator is like a snowball
// const balance = movements.reduce(function(acc,val,i,arr){
//   console.log(`iteration ${i}: ${acc}`)
//   return acc + val;
// },0)

// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);
