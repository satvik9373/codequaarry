const dummyDB = [
    {email: 'codequarry@gmail.com', password: 'codequarry2023!'}
  ]
  
  const form = document.getElementById("form");
  const emailI = document.getElementById("email");
  const password = document.getElementById("password");
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modal-close");
  const toast = document.getElementById("toast");
  const toastClose = document.getElementById("close");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    checkInput();
  })
  
  function checkInput() {
    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const userInput = [];
    
    if(emailValue === '' || emailValue == null) {
      setErrorFor(email, "Email cannot be blank");
      userInput.push(false);
    } else if(!isEmail(emailValue)){
      setErrorFor(email, "Email is not valid");
      userInput.push(false);
    } else {
      setSuccessFor(email);
      userInput.push(emailValue);
    }
    
    if(passwordValue === '' || passwordValue == null) {
      setErrorFor(password, "Password cannot be blank");
      userInput.push(false);
    } else {
      setSuccessFor(password);
      userInput.push(passwordValue);
    }
    
    const isValidUserInput = userInput.every(el => {
      return el !== "" && el != null && el !== false;
    });
    
    if(!isValidUserInput) {
      console.log("Oops, Something went wrong!");
      return;
    }
    
    checkLogin(userInput);
  }
  
  function checkLogin(dataArr) {
    const findResult = dummyDB.find(el => {
      return el.email === dataArr[0] && el.password === dataArr[1]
    })
    
    if(findResult === undefined) {
      showToastError();
      return;
    }
    
    openModal(findResult);
  }
  
  function showToastError() {
    toast.classList.add("active");
    setTimeout(() => {
      toast.classList.remove("active");
    }, 5000);
  }
  
  function openModal(dataLogin) {
    const modalContainer = modal.parentElement;
    const loggedUser = document.getElementById("logged-user");
    loggedUser.innerText = dataLogin.email;
    modalContainer.classList.add("active");
  }
  
  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    
    small.innerText = message;
    
    formControl.className = "form-control error"
  }
  
  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }
  
  function isEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }
  
  modalClose.addEventListener("click", () => {
    const modalContainer = modal.parentElement;
    modalContainer.classList.remove("active");
  })
  
  toastClose.addEventListener("click", () => {
    toast.classList.remove("active");
  })