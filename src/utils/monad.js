const Right = x => ({
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: `Right(${x})`
})

const Left = x => ({
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: `Left(${x})`
})

const fromNullable = x =>
    x != null ? Right(x) : Left(null)

const tryCatch = f => {
    try {
        return Right(f())
    } catch (e) {
        return Left(e)
    }
}

const Maybe = x => (x != null ? Right(x) : Left(x));
Maybe.of = x => Maybe(x);

export { Right, Left, fromNullable, tryCatch, Maybe }