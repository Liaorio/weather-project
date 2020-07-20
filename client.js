const searchForm = document.querySelector("#search-form");
const searchBtn = document.querySelector("#search-btn");
const message = document.querySelector('#message');

searchBtn.addEventListener("click", () => {
  message.textContent = 'Loading...';
  const address = searchForm.value;
  fetch(`/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
      const { temp, time } = data;
      const resultStr = `The weather of ${address} at ${time} is ${temp}`;
      message.textContent = resultStr;
    });
  });
});
