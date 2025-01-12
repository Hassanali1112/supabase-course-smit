
const signup_btn = document.querySelector("#signup_btn");
const signupEmail = document.querySelector("#signup_email");
const signupPass = document.querySelector("#signup_password");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

signup_btn.addEventListener("click", async ()=>{
  event.preventDefault();
  console.log(signupEmail.value)
 if(emailRegex.test(signupEmail.value)){
  console.log(signupPass.value)
  if(passwordRegex.test(signupPass.value)){
    try{
         const { data, error } = await supabase.auth.signUp({
           email: signupEmail.value,
           password: signupPass.value,
         });
      if (error) throw error;

         if(data) {
          console.log(data)
           Swal.fire({
             title: "Email confirmation",
             text: "Kindly check your email",
             icon: "success",
           });
         }
    } catch(error){
      console.log(error)
    }
 


  }else{
    Swal.fire({
      title: "Password",
      text: "Invalid password",
      icon: "error",
    });
  }
 } else {
  Swal.fire({
    title: "Email",
    text: "Invalid email",
    icon: "error",
  });
 }
})


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const signin_btn = document.querySelector("#signin_btn");
const signinEmail = document.querySelector("#signin_email");;
const signinPass = document.querySelector("#signin_password");


signin_btn.addEventListener("click",async ()=>{
  
  try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signinEmail.value,
        password: signinPass.value,
      });

      if(error) throw error;
      if(data){
        console.log(data)
        Swal.fire({
          title: "Session stated",
          text: "welcome User",
          icon: "success",
        });
      }
    
  } catch (error) {
    
  }


})


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const logout_btn = document.querySelector("#logout_btn");

logout_btn.addEventListener("click", async ()=>{
  console.log("logout");
  try {
    const { error } = await supabase.auth.signOut();
    if(error){
      Swal.fire({
          title: "Session expired",
          text: "user logged out successfully",
          icon: "info",
        });
        console.log("llll")
    }
  } catch (error){
    console.log(error)
  }finally{
    alert("finally")
  }
})