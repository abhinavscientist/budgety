var changedType = {0: 'income', 1:'expense'};
var totalIncome, totalExpense, budget; 
var incomeArray = [];
var expenseArray = [];

//Income constructor
var Income = function (description, amount){
	this.description = description;
	this.amount = amount;
}

//Expense constructor
var Expense = function (description, amount){
	this.description = description;
	this.amount = amount;
	this.percentage = '-%';
}

// APP Controller
// initialize variables
function init(){
	totalIncome = totalExpense = budget = 0;
	displayMonth();
	displayBudget();

}
init();

//set up event listener
document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
document.querySelector('.add__value').addEventListener('keydown', function(e){
	if (e.keyCode === 13) {
		ctrlAddItem();
	}
});

//ctrl for add item
function ctrlAddItem(){
	var input = getInput();
	var isIncome = (changedType[input['type']] === changedType[0])? true : false;
	addItem(isIncome, input['description'], input['amount']);
	var position = (isIncome)? incomeArray.length - 1 : expenseArray.length - 1;
	addListItem(isIncome, input['description'], input['amount'], position);
	updateBudget();
	updatePercentages();
}

// ctrl for update Budget
function updateBudget(){
	calculateBudget();
	displayBudget();
}

//ctrl for  upodate percentages
function updatePercentages(){
	calculatePercentages();
	displayPercentages();
}

//ctrl for delete item
function ctrlDeleteItem(el){
	deleteListItem(el);

	incomeListNode = document.querySelector('.income__list');
	while (incomeListNode.hasChildNodes()){
		incomeListNode.removeChild(incomeListNode.firstChild);
	}

	expensesListNode = document.querySelector('.expenses__list');

	while (expensesListNode.hasChildNodes()){
		expensesListNode.removeChild(expensesListNode.firstChild);
	}

	updateBudget();

	for (var i = 0; i < incomeArray.length; i++) {
		addListItem(true, incomeArray[i].description, incomeArray[i].amount, i);
	}

	for (var i = 0; i < expenseArray.length; i++) {
		addListItem(false, expenseArray[i].description, expenseArray[i].amount, i);
	}

	updatePercentages();
}


// Budget Controller
// add Expense and Income object
function addItem(isIncome, description, amount){
	if (isIncome){
		incomeArray.push(new Income(description, amount));
	} else if (!isIncome) {
		expenseArray.push(new Expense(description, amount));
	}
}

// calculate budget
function calculateBudget(){
	calculateTotal();
	budget = totalIncome - totalExpense;
	// console.log('total budget is: ' + budget);
}

// calculate total
function calculateTotal(){
	totalIncome = 0;
	for (var i = 0; i < incomeArray.length; i++) {
		totalIncome += incomeArray[i].amount;
	}
	// console.log('total income is: ' + totalIncome);

	totalExpense = 0;
	for (var i = 0; i < expenseArray.length; i++) {
		totalExpense  += expenseArray[i].amount;
	}
	// console.log('total expense is: ' + totalExpense);
}

// retrieve budget
function getBudget(){}

// calculate percentage
function calculatePercentages(){
	for (var i = 0; i < expenseArray.length; i++) {
		expenseArray[i].percentage = calculatePercentage(expenseArray[i].amount,totalIncome);
	}
}

// get percentage
function getPercentages(){}

// delete an item
function deleteItem(array, position){
	array.splice(position, 1);
}

//calculate percentage
function calculatePercentage(num, den){
	if (den > 0){
		return ((num/den)*100).toFixed(2) + '%';
	} else {
		return '0.00%';
	}
}


// UI Controller
//get getInput
function getInput(){
	var type = document.querySelector('.add__type').value === 'inc'? 0:1;
	var description = document.querySelector('.add__description').value;
	var amount = parseFloat(document.querySelector('.add__value').value);
	clearFields();
	return {'type': type, 'description': description, 'amount': amount};
}


//clear fields
function clearFields(){
	document.querySelector('.add__description').value = '';
	document.querySelector('.add__value').value = '';
	document.querySelector('.add__description').select();
}

//displayBudget
function displayBudget(){
	document.querySelector('.budget__income--value').textContent = '+ ' + formatNumber(totalIncome);
	document.querySelector('.budget__expenses--value').textContent = '- ' + formatNumber(totalExpense);
	document.querySelector('.budget__value').textContent = formatNumber(budget);
	document.querySelector('.budget__expenses--percentage').textContent = calculatePercentage(totalExpense, totalIncome);
}

//formating number
function formatNumber(number){
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// display percentages
function displayPercentages(){
	for (var i = 0; i < expenseArray.length; i++) {
		document.querySelector('#expense-' + i).querySelector('.item__percentage').textContent = expenseArray[i].percentage;
	}
}

//delete list item
var temp;
function deleteListItem(el){
	var itemId = el.parentElement.parentElement.parentElement.id.split('-');
	if (itemId[0] === 'income'){
		deleteItem(incomeArray, parseInt(itemId[1]));
	} else {
		deleteItem(expenseArray, parseInt(itemId[1]));	
	}
}

//get user input data
function getDOMstrings(){}

// Display month
function displayMonth(){
	var date = new Date();
	var month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Nov', 'Dec'];
	document.querySelector('.budget__title--month').textContent = month[date.getMonth()];
}

// add list item
function addListItem(isIncome, description, amount, position){
	var newrow = document.createElement('div');
	newrow.className = "item clearfix";
	newrow.id = isIncome ? "income-" + position : "expense-" + position;

	//newrow is the parent of itemdesc. itemdesc stands for item description.
	itemdesc = document.createElement('div');
	itemdesc.className = 'item__description';
	itemdesc.textContent = description;
	newrow.appendChild(itemdesc);

	// innerdesc is the child of newrow. innerdesc stands for inner description.
	innerdesc = document.createElement('div');
	innerdesc.className = 'right clearfix';

	// itemvalue is the child of innerdesc
	itemvalue = document.createElement('div');
	itemvalue.className = "item__value";
	itemvalue.textContent = formatNumber(amount);
	innerdesc.appendChild(itemvalue);

	if (!isIncome){
		itempercentage = document.createElement('div');
		itempercentage.className = "item__percentage";
		itempercentage.textContent = calculatePercentage(amount, totalIncome);
		innerdesc.appendChild(itempercentage);
	}

	itemdelete = document.createElement('div');
	itemdelete.className = "item__delete";
	itemdelete.innerHTML = '<button onclick=\"ctrlDeleteItem(this)\" class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>';
	innerdesc.appendChild(itemdelete);

	newrow.appendChild(innerdesc);

	if (isIncome){
		document.querySelector('.income__list').appendChild(newrow);
	} else {
		document.querySelector('.expenses__list').appendChild(newrow);
	}	
}
