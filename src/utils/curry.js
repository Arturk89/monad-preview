export const curryExample = () => {
    const add = (a, b) => a + b
    const pair = f => ([x, y]) => f(x, y)

    const res = pair(add)([1, 2])

    // console.log('result add ', res)


//

    const multiply = (a, b) => a * b
    const curry = f => x => y => f(x, y)

    const aa = (a, b, c) => {}

    aa(2, 3, _)
    const curriedFn = curry(multiply)

    const multiplyBy = curriedFn(2)

    const result = multiplyBy(3)

    // console.log('result multiply ', result)

    const modulo = curry((x, y) => x % y)
    const isOdd = modulo(2) // (2, y) => 2 % y
    const res1 = !!isOdd(3)
    const res2 = !!isOdd(2)

    console.log('res1 ', res1);
    console.log('res2 ', res2);

}