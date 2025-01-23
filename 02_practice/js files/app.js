// const isSessionActive = async () => {
//   const { data, error } = await supabase.auth.getSession();

//   const { session } = data;
//   const authPage = ["/", "/index.html", "/login.html"];
//   const currentPage = window.location.pathname;
//   const isAuthPage = authPage.some(page => page.includes(currentPage))

//   if(session){
//     if(isAuthPage){
//       window.location.assign("/dashbord.html"); 
//     }
//   } else{
//     if(!isAuthPage){
//       window.location.assign("/login.html");

//     }
// }

// };

// window.onload = isSessionActive();
const getUserDetails = async ()=>{
  console.log("user data getting ....")
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if(user){
      
        const { data, error } = await supabase
          .from("usersdata")
          .select("userName, userEmail, userId")
          .eq("userId", user.id);
          if(data){
            console.log(data)
            const currentUserData = {
              name : data[0].userName,
              email : data[0].userEmail,
              userId : user.id,
              id : data[0].userId
            }
            localStorage.setItem("currentUserData",JSON.stringify(currentUserData))

          }
    }
  } catch (error) {
    
  }



}
console.log(JSON.parse(localStorage.getItem("currentUserData")));

window.onload = getUserDetails()