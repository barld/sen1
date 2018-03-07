
export interface Fun<a,b> {
    f: (_:a) => b;
    then: <c>(_:Fun<b,c>) => Fun<a,c>;
}

export function Fun<a,b>(f: (_:a)=>b): Fun<a,b> {
    return ({
        f: f,
        then: <c>(g:Fun<b,c>): Fun<a,c> => Fun<a,c>(a => g.f(f(a)))
    });
};

export const id = <a>() => Fun<a,a>(x => x);