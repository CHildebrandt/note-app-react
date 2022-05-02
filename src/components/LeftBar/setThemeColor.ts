function setThemeColor(val: string, darkmode: boolean) {
    const style = document.documentElement.style;
    let v: any;
    if (val === '1') v = [255, 30, 30];
    else if (val === '2') v = [255, 127, 30];
    else if (val === '3') v = [255, 255, 30];
    else if (val === '4') v = [30, 255, 30];
    else if (val === '5') v = [30, 255, 127];
    else if (val === '6') v = [30, 127, 255];
    else if (val === '7') v = [127, 127, 255];
    else if (val === '8') v = [255, 30, 127];
    else v = 'var(--background)';
    if (val !== '0') {
        if (darkmode) v = v.map((x: number) => Math.floor(x * 0.3))
        else v = v.map((x: number) => Math.min((x + 100), 255))
    }
    style.setProperty('--theme', (val !== '0') ? `rgba(${v[0]},${v[1]},${v[2]},1)` : v);
}

export default setThemeColor