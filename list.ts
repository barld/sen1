import { Fun, id } from "./fun";

export type List<a> = {
    kind: "Cons";
    head: a;
    tail: List<a>;
} | {
    kind: "Empty";
}

export const Cons = <a>(value:a, tail: List<a>): List<a> => ({kind: "Cons", head: value, tail: tail});
export const Empty = <a>(): List<a> => ({kind: "Empty"});

export let map_list = <a,b>(f:Fun<a,b>): Fun<List<a>,List<b>> => 
    Fun<List<a>,List<b>>(l => 
        l.kind === "Cons" 
        ? Cons(f.f(l.head), map_list(f).f(l.tail)) 
        : Empty<b>());

const string_list = Cons("B", Cons("A", Empty()));

let encode: Fun<number, Fun<List<string>, List<string>>> = 
    Fun((n: number) => map_list(Fun<string,string>(s => String.fromCharCode(s.charCodeAt(0) + n))));

console.log(encode.f(3).f(string_list))  
// ==
console.log(id<List<string>>().then(encode.f(3)).f(string_list))

