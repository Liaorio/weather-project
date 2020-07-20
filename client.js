const searchForm = document.querySelector("#search-form");
const searchBtn = document.querySelector("#search-btn");
const message = document.querySelector('#message');

searchBtn.addEventListener("click", () => {
  message.textContent = 'Loading...';
  const address = searchForm.value;
  fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
      console.log(data);
      message.textContent = data.temp;
    });
  });
});
