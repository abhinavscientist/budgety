var incomeTotal = 0;
var expenseTotal = 0;

var incomeArray = [];
var expenseArray = [];

var incomeObject = function(name, amount){
	this.name = name;
	this.amount = amount;
	this.updateIncome = function(){
		incomeTotal += amount; 
	};
};

var expenseObject = function(name, amount){
	this.name = name;
	this.amount = amount;
	this.updateIncome = function(){
		incomeTotal -= amount;
	}
};

//this will go in event listerner
document.querySelector('.add__btn').addEventListener('click', function(){
	var isIncrease = document.querySelector('.add__type').value === 'inc';
	var description = document.querySelector('.add__description').value;
	var value = parseInt(document.querySelector('.add__value').value);
	if ( isIncrease ){
		addIncomeObject = new incomeObject(description, value);
		incomeArray.push(addIncomeObject);
		addIncomeObject.updateIncome();
	} else {	
		addExpenseObject = new expenseObject(description, value); 
		expenseArray.push(addExpenseObject);		
		addExpenseObject.updateIncome();
	}
	console.log(incomeArray);
	console.log(expenseArray);
	console.log(incomeTotal);
});


