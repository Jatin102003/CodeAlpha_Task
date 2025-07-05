let button = document.querySelectorAll('.button');
Array.from(button).forEach((button) => {
  button.addEventListener('click', (e) => {
    // console.log(e.target);
    const string = e.target.innerHTML;
    document.querySelector('input[type="text"]').value = string;
    
    
  })
});