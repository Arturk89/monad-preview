import './App.css'
import { curryExample } from "./utils/curry.js";
import { monoidTest } from './utils/monoid.js'
import { functorExample } from "./utils/functor.js";
import { Task } from "./utils/task.js";
import { fromNullable, tryCatch } from "./utils/monad.js";
import { Maybe } from "monet";

const users = [
    {
        id: '123',
        name: 'test1'
    },
    {
        id: '234',
        name: 'test2'
    },
    {
        id: '345',
        name: 'test3'
    },
    {
        id: '456',
        name: 'test4'
    },
    {
        id: '567',
        name: 'test5'
    }
]

const getUser = (userId, users) => users.find(user => user.id === userId)

const getConfigParam = () => {
    const isError = true;
    if (isError) throw new Error()

    return 3000
}

const errHandle = (...err) => {
    console.log("ERR ", ...err);
};

const getData = (data) => {
    console.log("data ", data);
};

function App() {
    // curryExample()
    // functorExample()
    // monoidTest()

    // const nullable = fromNullable(getUser('123456', users))
    //     .map(el => el.name.toUpperCase())
    //     .map(el => el)
    //     .fold(() => [], x => x)
    // console.log('nullable user ', nullable)

    // const maybe = Maybe.of(getUser('1243', users)).map(el => el.name.toUpperCase()).fold(() => 'no user!!!', x => x)
    // console.log('maybe user ', maybe)

    // const getConfig = tryCatch(() => getConfigParam()).map(p => p * 100).fold(() => 5000, x => x)
    // console.log('tryCatch config ', getConfig)



    // Monet example
    // const user1 = Maybe.fromNull(getUser('1s23', users)).map(user => user.name.toUpperCase()).getOrElse([])
    // console.log('user1 ', user1)


    //api monad
    const apicall = () =>
        Task((rej, res) =>
            fetch("https://randomuser.me/api/")
                .then((u) => u.json())
                .then(res)
                .catch((y) => rej("err", y))
        );

    apicall()
        .map((x) => {
            console.log("mapping: ", x);
            return x.results;
        })
        .fork(errHandle, getData);


    console.log('task monad ', apicall)


    return (
      <>
        <p>fn examples</p>
      </>
    )
}

export default App
