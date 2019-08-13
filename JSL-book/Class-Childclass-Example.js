// Определение простого класса прямоугольников.
// Этот класс имеет ширину и высоту и может вычислять свою площадь
function Rectangle(w, h) {
    this.width = w;
    this.height = h;
}
Rectangle.prototype.area = function( ) { return this.width * this.height; }
// Далее идет определение подкласса
function PositionedRectangle(x, y, w, h) {
    // В первую очередь необходимо вызвать конструктор надкласса
    // для инициализации свойств width и height нового объекта.
    // Здесь используется метод call, чтобы конструктор был вызван
    // как метод инициализируемого объекта.
    // Это называется вызов конструктора по цепочке.
    Rectangle.call(this, w, h);
    // Далее сохраняются координаты верхнего левого угла прямоугольника
    this.x = x;
    this.y = y;
}
// Если мы будем использовать объектпрототип по умолчанию,
// который создается при определении конструктора PositionedRectangle(),
// был бы создан подкласс класса Object.
// Чтобы создать подкласс класса Rectangle, необходимо явно создать объектпрототип.
PositionedRectangle.prototype = new Rectangle();
// Мы создали объектпрототип с целью наследования, но мы не собираемся
// наследовать свойства width и height, которыми обладают все объекты
// класса Rectangle, поэтому удалим их из прототипа.
delete PositionedRectangle.prototype.width;
delete PositionedRectangle.prototype.height;
// Поскольку объектпрототип был создан с помощью конструктора
// Rectangle(), свойство constructor в нем ссылается на этот
// конструктор. Но нам нужно, чтобы объекты PositionedRectangle
// ссылались на другой конструктор, поэтому далее выполняется
// присваивание нового значения свойству constructor
PositionedRectangle.prototype.constructor = PositionedRectangle;
// Теперь у нас имеется правильно настроенный прототип для нашего
// подкласса, можно приступать к добавлению методов экземпляров.
PositionedRectangle.prototype.contains = function(x,y) {
    return (x > this.x && x < this.x + this.width &&
        y > this.y && y < this.y + this.height);
}

Rectangle.prototype.toString = function () {
    return "width: "+ this.width + " height: " + this.height;
}

PositionedRectangle.prototype.toString = function () {
    return "" + "x: " + this.x + " y: " + this.y + " " + Rectangle.prototype.toString.apply(this);
}

var rec = new Rectangle(20,30);
var prec = new PositionedRectangle(0,0,20,30);
alert(PositionedRectangle);
