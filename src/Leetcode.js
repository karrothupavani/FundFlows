// //febonocci
// const  a=2000;
// var x=0,y=1;
// var n ;
// for (let i=2;i<=a;i++){
//     console.log(x);
//      n = x+y;
//      x=y;
//     y=n;

// }
// const a = 2000;
// let x = 0, y = 1;
// let i = 2;

// while (i <= a) {
//     console.log(x);
//     let n = x + y;
//     x = y;
//     y = n;
//     i++;
// }
//factorial using recursion
// function factorial(n) {
//     if (n === 0) {
//         return 1; // Base case: 0! = 1
//     } else {
//         return n * factorial(n - 1); 
//     }
// }
// const number = 100; 
// const result = factorial(number);
// console.log(`Factorial of ${number} is ${result}`);
// function calculateFactorial(n) {
//     if (n < 0) {
//         return "Factorial is not defined for negative numbers";
//     } else if (n === 0 || n === 1) {
//         return 1; 
//     } else {
//         let result = 1;
//         for (let i = 2; i <= n; i++) {
//             result *= i;
//         }
//         return result;
//     }
// }
// const number = 1; 
// const result = calculateFactorial(number);
// console.log(`Factorial of ${number} is ${result}`);
//merge two sorted arrays
var mergeTwoLists = function (l1, l2) {
    // Check if either of the lists is null 
    if (!l1) {
        return l2;
    }
    if (!l2) {
        return l1;
    }
    // Head of the new linked list - this is the head of the resultant list
    let head = null;
    // Reference of head which is null at this point
    let temp = head;
    // Choose head which is smaller of the two lists
    if (l1.val < l2.val) {
        temp = head = new ListNode(l1.val);
        l1 = l1.next;
    } else {
        temp = head = new ListNode(l2.val);
        l2 = l2.next;
    }
    // Loop until any of the list becomes null
    while (l1 && l2) {
        if (l1.val < l2.val) {
            temp.next = new ListNode(l1.val);
            l1 = l1.next;
            temp = temp.next;
        } else {
            temp.next = new ListNode(l2.val);
            l2 = l2.next;
            temp = temp.next;
        }
    }
    // Add all the nodes in l1, if remaining
    while (l1) {
        temp.next = new ListNode(l1.val);
        l1 = l1.next;
        temp = temp.next;
    }
    // Add all the nodes in l2, if remaining
    while (l2) {
        temp.next = new ListNode(l2.val);
        l2 = l2.next;
        temp = temp.next;
    }
    return head;
};

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
var  l1=[2,4,6,7,8];
var  l2=[7,5,3,1];

console.log(mergeTwoLists(l1,l2));