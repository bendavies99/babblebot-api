import 'reflect-metadata';
/**
 * Add two numbers together
 * @param {number} a - First number
 * @param {number} b - Second number
 * @return {number} The sim of a and b
 */
export const add = (a: number, b: number): number => {
  return a + b;
};

export * from './interfaces';
export { Application } from './application';
export * from './decorators';
