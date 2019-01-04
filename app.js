var incomeTotal = 0;
var expenseTotal = 0;

var incomeArray = [];
var expenseArray = [];

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
		document.querySelector('.budget__expenses--percentage').textContent = ((expenseTotal/incomeTotal)*100).toFixed(2) + '%';
	}
	updateAvailableBudget();
	updateTable(isIncrease, description, value);
	console.log(incomeArray);
	console.log(expenseArray);
	console.log(incomeTotal);
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
	} else {
		document.querySelector('.expenses__list').appendChild(newrow);
	}
	
}

// document.querySelector('.item__delete--btn').addEventListener('click', function(){
// 	console.log();
// });
var t;
function remove(el){
	t = el;
	el.parentElement.parentElement.parentElement.remove();
}

