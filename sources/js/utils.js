// 这里可以放置一些通用的工具函数
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('zh-CN', options);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 可以根据需要添加更多工具函数
const arr = [
    {name: 'a', age: 10},
    {name: 'b', age: 12},
    {name: 'c', age: 30},
    {name: 'd', age: 46},
    {name: 'e', age: 35},
    {name: 'f', age: 62},
    {name: 'g', age: 47},
    {name: 'h', age: 39},
]

const newArr = arr.sort((a,b)=>a.age-b.age);
console.log(newArr);

function customSort(arr, compFunc) {
    for (let i=0; i< arr.length-1;i++){
        for (let j=0;j<arr.length-1-i;j++){
            if (compFunc(arr[j], arr[j+1])>0){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

customSort(arr, (a,b)=>a.age-b.age);
console.log(arr);
