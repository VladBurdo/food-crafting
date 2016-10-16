var ObjFood = (function () {
	'use strict';

  var idFood = 'six';
  var elById = document.getElementById('six');
  //объект рецептов
  var _objfood = {
    'six':{
      'eight':"Булка",
      'nane':"Сосиски",
    },
    'seven':{
      'ten':"Кетчуп",
      'eleven':"Булка",
    }
  }
  //список продуктов
  var _product = ["Сосиски" , "Помидоры" , "Ветчина" , "Сыр" , "Булка"];

	function setFood (id) {
    _objfood[id] ={};
	}

  function getIngred () {
    var obj = {};
    obj = _objfood[idFood];
    return obj;
	}

	function setIngred (id, value) {
    _objfood[idFood][id] = value;
	}

  function newIdFood (id) {
    idFood = id;
    elById = document.getElementById(id);
	}

  function setIdFood () {
    return idFood;
  }

  function setProd (value) {
    _product.push(value);
	}

  function getProd () {
    return _product;
	}

//окраска в зелёный либо в красный
  function redgreen(value) {
    if (_product.indexOf(_objfood[idFood][value]) < 0) { //окраска в зелёный либо в красный
      return "red";
    } else {
      return "green";
    }
  }
  function delIngred(value) {
    for (var i = 0; i < _product.length; i++) {
      if(_product[i] === value){
        _product.splice(i,1);
        break;
      }
    }
  }

  function delFood(value) {
    delete _objfood[value];
  }

  function delProd(value) {
    delete _objfood[idFood][value]
  }
  function getElById() {
    return elById;
  }

	return {
		setFood : setFood,
		getIngred : getIngred,
		setIngred : setIngred,
    idFood : setIdFood,
    newIdFood : newIdFood,
    getProd : getProd,
    setProd : setProd,
    redgreen : redgreen,
    delIngred : delIngred,
    delFood : delFood,
    delProd : delProd,
    getElById : getElById
	};

})();
