// const Id = <T>(x: T) => ({
//     map: <T1>(fn: (p: T) => T1) => Id<T1>(fn(x)),
//     chain: <T1>(fn: (p: T) => T1) => fn(x),
//     valueOf: () => x,
//     inspect: `Box(${x})`,
// });


const Id = x => ({
    map: f => Id(f(x)),
    chain: f => f(x),
    fold: f => f(x),
    extra: () => x,
    toString: `Box(${x})`,
});


const charFromNumberString = (str) => {
    const trimmed = str.trim()
    const number = parseInt(trimmed, 10)
    const nextNumber = number + 1
    return String.fromCharCode(nextNumber)
}

const charFromNumberStringId = (str) =>
    Id(str)
        .map(x => x.trim())
        .map(trimmed  => parseInt(trimmed, 10))
        .map(number => number + 1)
        // .fold(String.fromCharCode)

/////
const moneyToFloat = (str) =>
    Id(str)
        .map(s => s.replace(/\$/, ''))
        .fold(s => parseFloat(s))

const percentToFloat = (str) =>
    Id(str)
        .map( s => s.replace(/%/, ''))
        .map(s => parseFloat(s))
        .fold(f => f * 0.0100)


const applyDiscount = (price, discount) =>
    Id(moneyToFloat(price))
        .chain((cents) =>
            Id(percentToFloat(discount)).map((saving) => cents - cents * saving)
        )

export const functorExample = () => {
    // console.log('imperative: ', charFromNumberString(' 64 '));
    // console.log('declarative: ', charFromNumberStringId(' 64   '))
    console.log('Id ', applyDiscount("$5.00", "20%"));
}
