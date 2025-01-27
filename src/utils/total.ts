export default  function getTheTotal(arr:string[]):number {
    const total = arr.map(el=>+el).reduce((ac, cur) => ac + cur,0);
    return total;
}