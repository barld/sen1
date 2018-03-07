import { Fun } from "./fun";

type Exception<a> = {
    kind: "Result",
    result: a
} | {
    kind: "Error"
}

let Exception_result = <a>(result: a): Exception<a> => ({kind: "Result", result: result});
let Exception_error = <a>(): Exception<a> => ({kind: "Error"});

let map_exception = <a,b>(f:Fun<a,b>) => 
    Fun<Exception<a>, Exception<b>>(e => 
        e.kind === "Result" 
        ? Exception_result(f.f(e.result)) 
        : Exception_error())