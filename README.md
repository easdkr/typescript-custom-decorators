## Typescript Custom Decorator

1. [IsAllParametersDefined](./src/decorators/is-all-paramerts-defined.ts)

```typescript
@IsAllParametersDefined({ message?: string, nullable?: boolean })
someMethod(args: any){
  /** ... */
}
```

- 함수의 모든 parameters 에 대하여 undefined 인지 검증하는 데코레이터
- option
  - nullable: false인 경우 paramters의 값이 null 일 때도 exception 발생
  - message: Error의 message를 커스텀하기 위함
