export interface IsAllParametersDefinedOptions {
  nullable?: boolean;
  message?: string;
}

/**
 *
 * @param options.nullable @default true
 * @param options.message @default "[array of key undefined args] is undefined"
 * @throws {Error}
 */
export const IsAllParametersDefined = (options?: IsAllParametersDefinedOptions): MethodDecorator => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validate = (args: any[]) =>
    args
      .filter((arg) => arg)
      .flatMap((arg) => Object.keys(arg).filter((k) => arg[k] === undefined || (options?.nullable === false && arg[k] === null)));

  return (_: unknown, _methodName: string | symbol, descriptor: TypedPropertyDescriptor<unknown>) => {
    const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

    descriptor.value = function (...args: unknown[]) {
      const undefinedArgs = validate(args);
      if (undefinedArgs.length > 0) throw new Error(options?.message ? options?.message : `[${undefinedArgs}] is undefined`);

      return originalMethod.apply(this, args);
    };
  };
};
