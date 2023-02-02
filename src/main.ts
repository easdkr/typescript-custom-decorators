import 'reflect-metadata';
import { IsAllParametersDefined } from './decorators/index';

export class UndefinedException extends Error {
  constructor(message?: string) {
    super(message);
  }
}

class Foo {
  @IsAllParametersDefined({})
  nullableTargetMethod(first: unknown, second: unknown) {
    console.log(first, second);
  }

  @IsAllParametersDefined({ nullable: false })
  nonNullableTargetMethod(first: unknown) {
    console.log(first);
  }
}

const foo = new Foo();

foo.nullableTargetMethod({ a: 123, b: 1234, c: null, d: 'asdf' }, { e: null }); //not throws
// foo.nonNullableTargetMethod({ f: null }); // throws
// foo.nullableTargetMethod({ g: undefined }, { h: 1 }); //throws
