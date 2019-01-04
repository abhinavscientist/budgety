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
		expenseTotal += amount;
	}
};

function updateAvailableBudget(){
	var s;
	if ((incomeTotal - expenseTotal) >= 0){
		s = '+';
	} else {
		s = '';
	}
	document.querySelector('.budget__value').textContent = s + ' ' + (incomeTotal - expenseTotal);	
}

//this will go in event listerner
document.querySelector('.add__btn').addEventListener('click', function(){
	var isIncrease = document.querySelector('.add__type').value === 'inc';
	var description = document.querySelector('.add__description').value;
	var value = parseInt(document.querySelector('.add__value').value);
	if ( isIncrease ){
		addIncomeObject = new incomeObject(description, value);
		incomeArray.push(addIncomeObject);
		addIncomeObject.updateIncome();
		document.querySelector('.budget__income--value').textContent = '+ ' + incomeTotal; 
	} else {	
		addExpenseObject = new expenseObject(description, value); 
		expenseArray.push(addExpenseObject);		
		addExpenseObject.updateIncome();
		document.querySelector('.budget__expenses--value').textContent = '+ ' + expenseTotal;
		document.querySelector('.budget__expenses--percentage').textContent = parseInt((expenseTotal/incomeTotal)*100) + '%';
	}
	updateAvailableBudget();
	console.log(incomeArray);
	console.log(expenseArray);
	console.log(incomeTotal);
});


