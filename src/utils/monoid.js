const Sum = (x) => ({
    x,
    concat: (other) => Sum(x + other.x),
    fold: () => x
});

Sum.empty = () => Sum(0);

const Any = (x) => ({
    x,
    concat: (other) => Any(x || other.x),
    fold: () => x
});
Any.empty = () => Any(false);

const All = (x) => ({
    x,
    concat: (other) => All(x && other.x),
    fold: () => x
});
All.empty = () => All(true);

const User = (x) => ({
    x,
    concat: (other) => Sum(x + other.x),
    fold: () => x
})
User.default = () => User({})

export const monoidTest = () => {
    const listOfPrizes = [10, 20, 30, 40, 50]
    const listOfBooleansMix = [true, false, true, false]
    const listOfTrue = [true, true, true]

    const result = listOfPrizes
        .map(Sum)
        .reduce((acc, n) => acc.concat(n), Sum.empty()).fold()

    console.log('listOfPrizes ', result)

    const res = listOfBooleansMix
        .map(Any)
        .reduce((acc, n) => acc.concat(n), Any.empty())
        .fold()

    const res1 = listOfTrue
        .map(All)
        .reduce((acc, n) => acc.concat(n), All.empty())
        .fold()



    console.log('booleansMix ', res)
    console.log('all true ', res1)

}