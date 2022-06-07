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

let person: {
  name: string;
  age: number;
};
person = {
  name: 'Hong',
  age: 21
};

let people: {
  name: string;
  age: number;
}[];