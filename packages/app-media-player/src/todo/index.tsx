export function createCounter() {
    let el = <div />;
    let count = 0;

    const render = () => {
        el.textContent = String(count);
    };

    render();

    return {
        el,
        get count() {
            return count;
        },
        inc() {
            ++count, render();
        },
        dec() {
            --count, render();
        },
    };
}
