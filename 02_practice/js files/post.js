const postContent = document.querySelector("#postContent");
const postFile = document.querySelector("#postFile");
const postBtn = document.querySelector("#postBtn");

const activeUser = JSON.parse(localStorage.getItem("currentUserData"));
postBtn?.addEventListener("click", async () => {
  console.log(activeUser);
  if (postContent.value !== "") {
   try {
     const { data, error } = await supabase
       .from("posts")
       .insert({
         content: postContent.value,
         userId: activeUser.userId,
       })
       .select();
     if (error) throw error;
     if (data) {
      //  console.log(data);
      if(postFile.files.length){
        try {
          const avatarFile = postFile.files[0];
          const { data : postData, error : postErorr } = await supabase.storage
            .from("images")
            .upload(`${data[0].id}`, avatarFile, {
              cacheControl: "3600",
              upsert: false,
            });
            if(postErorr)throw postErorr;
            if(postData){
              console.log(postData)
              try {
                const { data : imageData } = supabase.storage
                  .from("images")
                  .getPublicUrl(`${postData.path}`);
                  if(imageData){
                    console.log(imageData)
                    try {
                      const { data :finalPostData, error:finalPostError } = await supabase
                        .from("posts")
                        .update({ imageUrl : imageData.publicUrl})
                        .eq("id", data[0].id)
                        .select();
                        if(finalPostError) throw error;
                        if(finalPostData){
                          console.log(finalPostData)
                          postContent.value = "";
                          postFile.value = ""
                        }


                    } catch (finalPostError) {
                      console.log(finalPostError)
                      
                    }
                  }

              } catch (error) {
                
              }
            }
        } catch (error) {
          
        }
      }
       
     }
   } catch (error) {
    console.log(error)
   }
  } else {
    console.log("kindly create a valid post");
  }
});
