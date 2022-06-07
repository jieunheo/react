// 기본형(Primitives): number, string, boolean
// 복잡합 형태의 타입: arrays, objects
// Function types, parameters

// 기본형
let age: number;
age = 12;

let userName: string;
userName = 'Hong';

let isInstructor: boolean;
isInstructor = false;

// 복잡한 형태의 타입
let hobbise: string[];
hobbise = ['hello', '12'];

// 타입 만들기
type Person = {
  name: string;
  age: number;
};

let person: Person;
person = {
  name: 'Hong',
  age: 21
};

let people: Person[];

// 타입 추론(type inference)
let course = 'React = The Complete Guide';
// course = 123; // 타입추론에 의해 string으로 인식 -> error

// Union - 한 개 이상의 타입을 지정할 수 있게
let classId: string | number = 'Hello';
classId = 123;


// Function & types
function add(a: number, b: number) {
  return a + b;
}

function printOutput(value: any)/* : void */ {
  console.log(value);
}