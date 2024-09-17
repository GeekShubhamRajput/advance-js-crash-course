// Nested function scope
const a = 10;
function outer(){
  let b = 20;
  function inner(){
    let c = 30;
    console.log(a, b, c, d)
  }
  let d = 40;
  inner()
}
outer() // 10, 20, 30, 40

// Closure
function outer1(){
  let counter = 0;
  function inner(){
    counter++;
    console.log(counter)
  }
  return inner
}
const fn = outer1()
fn()  // 1
fn()  // 2
fn()  // 3

// Function Currying
function sum(a, b, c){
  return a + b + c
}
console.log(sum(3, 4, 12))

function mul(a, b, c){
  return a * b * c
}

function curry(fn){
  return function(a){
    return function(b){
      return function(c){
        return fn(a, b, c)
      }
    }
  }
}

const curriedSum = curry(sum)
console.log(curriedSum(3)(4)(5)) // 12

const curriedSum1 = curry(mul)
console.log(curriedSum1(3)(4)(5)) // 60

const add = curriedSum(10)
const add2 = add(20)
const add3 = add2(30)
console.log(add3) // 60


// this keyword
// implicit binding
const person = {
  name: 'Vishwas',
  sayMyName: function(){
    console.log(`My name is ${this.name}`)    
  }
}
person.sayMyName() // My name is Vishwas

// explicit binding
function sayMyName(){
  console.log(`My name is Mr. ${this.name}`)
}

sayMyName.call(person)

// new binding
function Person(name){
  // this = {}
  this.name = name;
}
const p1 = new Person('Shubham')
const p2 = new Person('Abhishek')
console.log(p1.name, p2.name)

// default binding
globalThis.name = 'Vijay'
function sayMyName(){
  console.log(`My name is ${this.name}`)
}
sayMyName()
// * Order of precedence *
// New binding
// Explicit binding
// Implicit binding
// Default binding

// Prototype
function Person(fName, lName){
  this.firstName = fName
  this.lastName = lName
}

const person1 = new Person('Brush', 'Wayne')
const person2 = new Person('Clark', 'Kent')
const person3 = new Person('Harry', 'Nixon')

Person.prototype.getFullName = function(){
  return this.firstName + ' ' + this.lastName
}

console.log(person1.getFullName())
console.log(person2.getFullName())
console.log(person3.getFullName())

// Prototypal Inheritance
function SuperHero(fName, lName){
  Person.call(this, fName, lName)
  this.isSuperHero = true
}
SuperHero.prototype.fightCrime = function(){
  console.log('Fighting Crime')
}
SuperHero.prototype = Object.create(Person.prototype)
const batman = new SuperHero('Bruce', 'Wayne')
SuperHero.prototype.constructor = SuperHero
console.log(batman.getFullName())


// Class
class User{
  constructor(fName, lName){
    this.firstName = fName
    this.lastName = lName
  }

  getUserFullname(){
    return this.firstName + ' ' + this.lastName
  }
}

const user = new User('Tim', 'Clinton')
console.log(user.getUserFullname())

class AdminUser extends User{
  constructor(fName, lName){
    super(fName, lName)
    this.superUser = true
  }

  getAccess(){
    console.log('Grant access')
  }
}

const ad = new AdminUser('Donald', 'Trump')
console.log(ad.getUserFullname())
ad.getAccess()

// Iterables and Iterators - Protocols
// for loop (string)
const str = 'Shubham'

for(i=0; i < str.length; i++){
  console.log(str[i])
}

// for loop (array)
const arr = ['S', 'h', 'u', 'b', 'h', 'a', 'm']

for(i=0; i < arr.length; i++){
  console.log(arr[i])
}

// For.. of loop
const str1 = 'ABCD'
for(const char of str1){
  console.log(char)
}

const arr1 = ['A', 'b', 'c']
for(const ele of arr1){
  console.log(ele)
}

// Own iterator

const obj = {
  [Symbol.iterator]: function(){
    let step = 0
    const iterator = {
      next: function(){
        step++
        if(step === 1){
          return {value: 'Hello', done: false}
        }else if(step === 2){
          return {value: 'World', done: false}
        }
        return {value: undefined, done: true}
      }
    }
    return iterator
  }
}

for(const word of obj){
  console.log(word)
}

// Generators
function normalFunction(){
  console.log('Hello')
  console.log('JS')
}

normalFunction()
normalFunction()

function* generatorFunction(){
  yield 'Hello'
  yield 'World'
  yield 'Test'
}

const generatorObject = generatorFunction()
for(const word of generatorObject){
  console.log(word)
}

