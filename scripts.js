
window.addEventListener("load", init, false);
	var tableContainer = document.getElementById("tableContainer"),
		addBtn = document.getElementById("addProduct"),
		addBlock = document.getElementById("addBlock"),
		addForm = document.getElementById("addForm");
		submitForm = document.getElementById("submit"),
		cancelForm = document.getElementById("cancel");

// ------------------- default products array -------------------

	var products = [
			{id: 1, name: "T-shirt", category: "clothes", description: "Cool summer T-shirt", price: "16.99"}, 
			{id: 2, name: "Shorts", category: "clothes", description: "Cool summer shorts", price: "20"}, 
			{id: 3, name: "Hawians", category: "shoes", description: "Nice beach flip-flops", price: "15"},
			{id: 4, name: "Nacklace", category: "accessories", description: "Silver nacklace", price: "25"}, 
			{id: 5, name: "Dress", category: "clothes", description: "Long sleeveless", price: "29.90"}, 
			{id: 6, name: "Boots", category: "shoes", description: "Warm winter boots", price: "50"}];


	var output = function(){ 

		var myTable = "<table id='productsTable' class='table'><thead align='left'>";
		myTable += "<th>ID</th> <th>Product name</th> <th>Category</th> <th>Description</th> <th id='priceTH' data-type='number'>Price $</th><th> Action </th> </thead>";
		myTable += "<tbody>"
			for (var i = 0; i < products.length; i++) {
				myTable += "<tr class="+products[i].category+" id="+products[i].id+"><td>" + products[i].id + "</td> <td>" + products[i].name + "</td><td>" + products[i].category + "</td><td>"
				+ products[i].description + "</td><td class='price'>" + products[i].price + "</td> <td class='delProduct'><button class='btn btn-danger btn-xs'>Delete</button></td></tr>";
			}
		myTable += "</tbody> </table>";
		tableContainer.innerHTML = myTable;
	}
	output();

// -------------------------- adding a product -------------------

	addBtn.addEventListener("click", addingNewProd);


	function addingNewProd () {
		if (addBlock.className == "hideBlock") {
			addBlock.className = "showBlock";
		} else {
			addBlock.className = "hideBlock"
		}
	};


	var item;

	submitForm.addEventListener("click", function () {
		var last = products.length;
		item = {
			id: last+1, name: document['addForm']['name'].value, 
			category: document['addForm']['category'].value, 
			description: document['addForm']['desc'].value, 
			price: document['addForm']['price'].value
		};


		products.push(item);
		console.log(products);
		output();
		document.forms["addForm"].reset();
		addingNewProd();
	});
	

	cancelForm.addEventListener("click", function(){
		alert("Do you want to discard changes?");
		document.forms["addForm"].reset();
		addingNewProd();
	});

// ------------------------- deleting a product -----------------------
	
	var delProducts = document.getElementsByClassName("delProduct");

	var delProductsArr = [].slice.call(delProducts);

	for (var i = 0; i < delProductsArr.length; i++) {
		delProductsArr[i].onclick = function(){
			this.parentNode.parentNode.removeChild(this.parentNode);
		}
	}

// --------------------------- category sort -----------------------------

	var categorySort = document.getElementById("categorySort");

	categorySort.onchange = setCategory;

	var shoesArr = document.getElementsByClassName("shoes"),
		clothesArr = document.getElementsByClassName("clothes"),
		accessArr = document.getElementsByClassName("accessories"),
		bagsArr = document.getElementsByClassName("bags");

	function setCategory(){
		var categoryName = categorySort.value;

		switch(categoryName){
			case 'clothes':
			{
				clearSortRes();
				for (var i = 0; i < shoesArr.length; i++) {
					shoesArr[i].style.display = "none";
				}
				for (var i = 0; i < accessArr.length; i++) {
					accessArr[i].style.display = "none";
				}
				for (var i = 0; i < bagsArr.length; i++) {
					bagsArr[i].style.display = "none";
				}
			};
			break;
			
			case 'shoes':
			{
				clearSortRes();
				for (var i = 0; i < clothesArr.length; i++) {
					clothesArr[i].style.display = "none";
				}
				for (var i = 0; i < accessArr.length; i++) {
					accessArr[i].style.display = "none";
				}
				for (var i = 0; i < bagsArr.length; i++) {
					bagsArr[i].style.display = "none";
				}
			};
			break;
			
			case 'accessories':
			{
				clearSortRes();
				for (var i = 0; i < shoesArr.length; i++) {
					shoesArr[i].style.display = "none";
				}
				for (var i = 0; i < clothesArr.length; i++) {
					clothesArr[i].style.display = "none";
				}
				for (var i = 0; i < bagsArr.length; i++) {
					bagsArr[i].style.display = "none";
				}
			};
			break;

			case 'bags':
			{
				clearSortRes();
				for (var i = 0; i < shoesArr.length; i++) {
					shoesArr[i].style.display = "none";
				}
				for (var i = 0; i < accessArr.length; i++) {
					accessArr[i].style.display = "none";
				}
				for (var i = 0; i < clothesArr.length; i++) {
					clothesArr[i].style.display = "none";
				}
			};
			break;
			case 'defaultCat':
			{
				clearSortRes();
			};
			break;
		}
	}

	function clearSortRes(){
		for (var i = 0; i < clothesArr.length; i++) {
			clothesArr[i].style.display = "table-row";
		}
		for (var i = 0; i < shoesArr.length; i++) {
			shoesArr[i].style.display = "table-row";
		}
		for (var i = 0; i < accessArr.length; i++) {
			accessArr[i].style.display = "table-row";
		}
		for (var i = 0; i < bagsArr.length; i++) {
			bagsArr[i].style.display = "table-row";
		}
	}
					
// -------------------------- price sort ---------------------------

	var priceSort = document.getElementById("priceSort");
	var productsTable = document.getElementById("productsTable");
 	var priceCell = document.getElementById("priceTH");

	priceSort.onchange = function(){ 
    	sortByPrice(4, priceSort.value);
  	};



	function sortByPrice(colNum, type){
    	var tbody = productsTable.getElementsByTagName('tbody')[0];
    	var priceRowsArr = [].slice.call(tbody.rows);
    	var compare;  
    
    switch (type) {
        case 'ascending':
        compare = function(rowA, rowB){
          return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
        };
    	break;
    	case 'descending':
        compare = function(rowA, rowB){
          return rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML;
        };
    	break;
    	case 'defaultPrice':
    	compare = function(rowA, rowB){
          return rowA.cells[0].innerHTML - rowB.cells[0].innerHTML;
        };
    	break;
    }
    
    priceRowsArr.sort(compare);
    
    productsTable.removeChild(tbody);
    
    for (var i = 0; i < priceRowsArr.length; i++){
      tbody.appendChild(priceRowsArr[i]);
    }
    
    productsTable.appendChild(tbody);
  }

// ----------------------- form validation -------------------
	
	function init() {
		addForm.name.onchange = nameOnChange;
		addForm.price.onchange = priceOnChange;
		addForm.add.onclick = onAdd; 
	}

	function validate(elem, pattern){
		var res = elem.value.search(pattern);
		if (res == -1) {
			elem.parentNode.className = "has-error";
		} else {
			elem.parentNode.className = "has-success";
		} 
		if (addForm.name.parentNode.className == "has-success" && addForm.price.parentNode.className == "has-success") {
			submitForm.removeAttribute("disabled");
		}
	}

	function nameOnChange() {
		var pattern = /\D\S/;
		validate(this, pattern);
	}

	function priceOnChange() {
		var pattern = /\d\S/;
		validate(this, pattern);
	}

	function onAdd (){
		var invalid = false;

		for (var i = 0; i < addForm.elements.length; ++i) {
			var e = addForm.elements[i];
			if (e.type == "text" && e.onchange) {
				e.onchange();
			 	if (e.parentNode.className == "has-error") {
					invalid = true;
				}
			}
			if (invalid) {
				return false;
			}
		}
	}







