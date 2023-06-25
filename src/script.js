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

const calcDisplayBalance = function(movements){
  const balance = movements.reduce((acc,mov) => acc+mov, 0);
  labelBalance.textContent = `${balance} EUR`;

}

calcDisplayBalance(account1.movements);
const displayMovements = function(movements){
  containerMovements.innerHTML = '';
movements.forEach(function(mov,i){
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__value">${mov}</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);

});
};
const movements =  [200, 450, -400, 3000, -650, -130, 70, 1300]
displayMovements(account1.movements);

const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');

  });
}
createUsernames(accounts)



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






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////LECTURES

// displayMovements(account1.movements); 

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

// const calcAverageHumanAge = function (ages){

//   let humanAge = ages.map(dogAge => (dogAge <= 2 ? 2*dogAge : 16 + dogAge*4));
//   console.log(humanAge);
//   const adults = humanAge.filter(age => age >= 18);
//   console.log(adults);

//   const averageAge = adults.reduce((acc,curr) => acc+curr,0) / adults.length;

//   return  console.log(averageAge);
   

// }
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);


