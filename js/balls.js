const hole = document.querySelector('#hole');

const stuff = document.createElement('p');
stuff.textContent = "YO YO YO My Name is LUKE and I'm here to say!";
stuff.style.color = 'red';
hole.appendChild(stuff);

const morestuff = document.createElement('h3');
morestuff.textContent = "Gargamel!?";
morestuff.style.color = 'blue';
hole.appendChild(morestuff);

const funstuff = document.createElement('div');
funstuff.style.backgroundColor = 'pink';
funstuff.style.border = '1px solid black'

const toughstuff = document.createElement('h1');
toughstuff.textContent = "am here";
toughstuff.style.color = 'red';
funstuff.appendChild(toughstuff);

const roughstuff = document.createElement('p');
roughstuff.textContent = "ME tooo-hoo!";
roughstuff.style.color = 'pink';
funstuff.appendChild(roughstuff);

hole.appendChild(funstuff);
