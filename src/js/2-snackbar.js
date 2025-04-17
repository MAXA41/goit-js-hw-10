import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); 

    const delay = Number(event.target.elements.delay.value); 
    const shouldResolve = event.target.elements.state.value === "fulfilled"; 

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })
    .then((delay) => {
        iziToast.success({
            title: "Ok",
            message: `Fulfilled promise in ${delay}ms`,
            position: "topRight",
            class: "icon-svg-success",
            iconUrl: "/img/success.svg", 
            backgroundColor: "#59a10d",
            titleColor: "#fff",
            messageColor: "#fff",
        });
    })
    .catch((delay) => {
        iziToast.error({
            title: "Error",
            message: `Rejected promise in ${delay}ms`,
            position: "topRight",
            class: "icon-svg-error",
            backgroundColor: "#ef4040",
            titleColor: "#fff",
            messageColor: "#fff",
            iconUrl: "/img/error.svg",
            
        });
    });
}






// Напиши скрипт, який після сабміту форми створює проміс. 
// В середині колбека цього промісу через вказану користувачем кількість 
// мілісекунд проміс має виконуватися (при fulfilled) або 
// відхилятися (при rejected), залежно від обраної опції в радіокнопках. 
// Значенням промісу, яке передається як аргумент у методи resolve/reject, 
// має бути значення затримки в мілісекундах.

// Створений проміс треба опрацювати у відповідних для вдалого/невдалого 
// виконання методах.

// Якщо проміс виконується вдало, виводь у консоль наступний рядок, де
//  delay — це значення затримки виклику промісу в мілісекундах.

//  `✅ Fulfilled promise in ${delay}ms`


// Якщо проміс буде відхилено, то виводь у консоль наступний рядок, 
// де delay — це значення затримки промісу в мілісекундах.

// `❌ Rejected promise in ${delay}ms`



// Бібліотека повідомлень



// Для відображення повідомлень, замість console.log(), використовуй 
// бібліотеку iziToast. Для того щоб підключити CSS код бібліотеки в 
// проєкт, необхідно додати ще один імпорт, крім того, що описаний у документації.

