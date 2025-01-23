/*
Clase 39 - Ejercicios: Clases
Vídeo: https://youtu.be/1glVfFxj8a4?t=18630
*/

// 1. Crea una clase que reciba dos propiedades
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

// 2. Añade un método a la clase que utilice las propiedades
class PersonWithProperties {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    showProperties() {
        console.log(this.name, this.age)
    }
}
// 3. Muestra los valores de las propiedades e invoca a la función
class PersonWithProperties2 {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    showProperties() {
        console.log(this.name, this.age)
    }

}
let person = new PersonWithProperties2("Fernando", 37)
person.showProperties()

// 4. Añade un método estático a la primera clase
class PersonWithStaticMethod {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    showProperties() {
        console.log(this.name, this.age)
    }

    static showStaticMessage() {
        console.log("This is a static method")
    }
}
// 5. Haz uso del método estático
let personWithStaticMethod = new PersonWithStaticMethod("Fernando", 37)
personWithStaticMethod.showProperties()
PersonWithStaticMethod.showStaticMessage()

// 6. Crea una clase que haga uso de herencia
class Animal {
    constructor(name) {
        this.name = name
    }

    showName() {
        console.log(this.name)
    }
}

class Dog extends Animal {
    sound() {
        console.log("Guau!")
    }
}

let dog = new Dog("Toby")
dog.showName()
dog.sound()

// 7. Crea una clase que haga uso de getters y setters
class GetSetPerson {
    #name
    #age

    constructor(name, age) {
        this.#name = name
        this.#age = age
    }

    get name() {
        return this.#name
    }

    set age(age) {
        this.#age = age
    }
}
let getSetPerson = new GetSetPerson("Fernando", 37)
console.log(getSetPerson.name)
getSetPerson.age = 38
console.log(getSetPerson.name)

// 8. Modifica la clase con getters y setters para que use propiedades privadas
class GetSetPerson2 {
    #name
    #age

    constructor(name, age) {
        this.#name = name
        this.#age = age
    }

    get name() {
        return this.#name
    }

    set age(age) {
        this.#age = age
    }
}
let getSetPerson2 = new GetSetPerson2("Fernando", 37)
console.log(getSetPerson2.name)
getSetPerson2.age = 38
console.log(getSetPerson2.name)

// 9. Utiliza los get y set y muestra sus valores
class GetSetPerson3 {
    #name
    #age

    constructor(name, age) {
        this.#name = name
        this.#age = age
    }

    get name() {
        return this.#name
    }

    set age(age) {
        this.#age = age
    }
}
let getSetPerson3 = new GetSetPerson3("Fernando", 37)
console.log(getSetPerson3.name)

// 10. Sobrescribe un método de una clase que utilice herencia 
class Animal2 {
    constructor(name) {
        this.name = name
    }

    showName() {
        console.log(this.name)
    }
}

class Dog2 extends Animal2 {
    sound() {
        console.log("Guau!")
    }

    showName() {
        console.log("El nombre del perro es " + this.name)
    }
}

let dog2 = new Dog2("Toby")
dog2.showName()
dog2.sound()
