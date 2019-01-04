var incomeTotal = 0;
var expenseTotal = 0;

var incomeArray = [];
var expenseArray = [];

init();

(function setMonth(){
	var date = new Date();
	var month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Nov', 'Dec'];
	document.querySelector('.budget__title--month').textContent = month[date.getMonth()];
})();

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
	};
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

function updateIncomeTotal(){
	document.querySelector('.budget__income--value').textContent = '+ ' + incomeTotal; 
}

function updateExpenseTotal(){
	document.querySelector('.budget__expenses--value').textContent = '+ ' + expenseTotal;
	document.querySelector('.budget__expenses--percentage').textContent = ((expenseTotal/incomeTotal)*100).toFixed(2) + '%';
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
		
	} else {	
		addExpenseObject = new expenseObject(description, value); 
		expenseArray.push(addExpenseObject);		
		addExpenseObject.updateIncome();	
	}
	updateAvailableBudget();
	// updateTable(isIncrease, description, value);
	reBuildTable();
});

function updateTable(isIncrease, description, value){
	var newrow = document.createElement('div');
	newrow.className = "item clearfix";
	var idprefix, idsuffix;
	if (isIncrease){
		idprefix = "income-";
		idsuffix = document.querySelector('.income__list').children.length;
	} else {
		idprefix = "expense-";
		idsuffix = document.querySelector('.expenses__list').children.length;
	}
	newrow.id = idprefix + idsuffix;

	itemdesc = document.createElement('div');
	itemdesc.className = 'item__description';
	itemdesc.textContent = description;
	newrow.appendChild(itemdesc);

	innerdesc = document.createElement('div');
	innerdesc.className = 'right clearfix';

	itemvalue = document.createElement('div');
	itemvalue.className = "item__value";
	itemvalue.textContent = value;
	innerdesc.appendChild(itemvalue);

	if (!isIncrease){
		itempercentage = document.createElement('div');
		itempercentage.className = "item__percentage";
		itempercentage.textContent = ((value/incomeTotal)*100).toFixed(2) + '%';
		innerdesc.appendChild(itempercentage);
	}

	itemdelete = document.createElement('div');
	itemdelete.className = "item__delete";
	itemdelete.innerHTML = '<button onclick=\"remove(this)\" class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>';
	innerdesc.appendChild(itemdelete);

	newrow.appendChild(innerdesc);

	if (isIncrease){
		document.querySelector('.income__list').appendChild(newrow);
		updateIncomeTotal();
		updateAvailableBudget();
	} else {
		document.querySelector('.expenses__list').appendChild(newrow);
		updateExpenseTotal();
		updateAvailableBudget();
	}
	
}

// document.querySelector('.item__delete--btn').addEventListener('click', function(){
// 	console.log();
// });
var t, id;
function remove(el){
	var isIncome, position;
	id = el.parentElement.parentElement.parentElement.id;
	isIncome = (id.split('-')[0] === 'income');
	position = parseInt(id.split('-')[1]);
	if (isIncome) {
		incomeArray.splice(position, 1);
	} else {
		expenseArray.splice(position, 1);
	}
	reBuildTable();
}

function reBuildTable(){
	incomeListNode = document.querySelector('.income__list');

	while (incomeListNode.hasChildNodes()){
		incomeListNode.removeChild(incomeListNode.firstChild);
	}
	expensesListNode = document.querySelector('.expenses__list');

	while (expensesListNode.hasChildNodes()){
		expensesListNode.removeChild(expensesListNode.firstChild);
	}

	incomeTotal = 0;
	for (var i = 0; i < incomeArray.length; i++) {
		incomeTotal += incomeArray[i].amount;
	}
	for (var i = 0; i < incomeArray.length; i++) {
		updateTable(true, incomeArray[i].name, incomeArray[i].amount);
	}

	expenseTotal = 0;
	for (var i = 0; i < expenseArray.length; i++) {
		expenseTotal += expenseArray[i].amount;
	}
	for (var i = 0; i < expenseArray.length; i++) {
		updateTable(false, expenseArray[i].name, expenseArray[i].amount);
	}
	
	updateIncomeTotal();
	updateExpenseTotal();
	updateAvailableBudget();	
}

function init(){
	updateIncomeTotal();
	updateExpenseTotal();
	updateAvailableBudget();
}

