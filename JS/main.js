'use strict';
var idDom = {
		listprod : document.getElementById('listprod'),
		listfood : document.getElementById('listfood'),
		Ingred : document.getElementById('Ingred'),
		bodycenter : document.getElementById('bodycenter'),
    bin : document.getElementById('bin')
  }
var elements = idDom.bodycenter.querySelectorAll('ul > li');
for (var i = 0; i < elements.length; i++) {
    elements[i].draggable = "true";
    elements[i].ondragstart = function(){drag(event)};
}
idDom.bin.addEventListener('dragover', allowDrop);
idDom.bin.addEventListener('drop', drop);

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

}

function drop(ev) {
    ev.preventDefault();
    var elem = document.getElementById(ev.dataTransfer.getData("text"))
    var parent = elem.parentNode;
    if(parent === idDom.listprod){
      ObjFood.delIngred(elem.innerHTML);
    } else if (parent === idDom.listfood) {
      ObjFood.delFood(elem.id);
    } else {
      ObjFood.delProd(elem.id);
    }
    ev.target.appendChild(elem);
    ev.target.removeChild(elem);
  /*  if (ev.id === 'listIngred') {
      var id = ev.target.id;
      delete objfood[idfood][id];
      alert("удален")
    }*/
}

//генерирует id
function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

//обработчик нажатие button
idDom.bodycenter.onclick = function (event) {
  if (event.target.tagName === 'INPUT'){
  var prod = prompt('Введите, что хотите добавить?',"Название");
  if (prod) {
    var idnew = randomString(8);
    var li = myCreateLi(idnew, prod);
    if (event.target.id === "addfood"){
      ObjFood.setFood(idnew);
      idDom.listfood.appendChild(li);
    } else if (event.target.id === "addIngred"){
      ObjFood.setIngred(idnew, prod);
      listIngred.appendChild(li);
      li.className = ObjFood.redgreen(idnew);
    } else {
      idDom.listprod.appendChild(li);
      ObjFood.setProd(prod);
    }
  }
 }
}

//обработчик нажатий по блюдам
idDom.listfood.onclick = function (event) {
  if (event.target.tagName === 'LI' || event.target.id !== ObjFood.getElById()) {
//меняем фокус (переопрееляем класс activ)
    var elem = ObjFood.getElById();
    elem.classList.remove('activ');
    var newidfood = event.target.id;
    ObjFood.newIdFood(newidfood);
    event.target.className = "activ";
//очищаем список ингредиентов
    listIngred.remove();
    var ul = document.createElement('ul');
    ul.id = "listIngred";
    idDom.Ingred.appendChild(ul);
// вывод нового списка ингредиентов
    var newobj = ObjFood.getIngred();
    for (var key in newobj) {
      var li = myCreateLi(key, newobj[key]);
      li.className = ObjFood.redgreen(key);
      listIngred.appendChild(li);
    }
  }
}

//создание каркаса Li
function myCreateLi(id, value) {
  var li = document.createElement('li');
  li.id = id;
  li.draggable = "true";
  li.ondragstart = function(){drag(event)};
  li.innerHTML = value;
  return li;
}
