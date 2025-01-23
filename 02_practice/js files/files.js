const fileInput = document.querySelector("#fileInput");
const fileUploadBtn = document.querySelector("#fileUploadBtn");

fileUploadBtn?.addEventListener("click", async ()=>{
  const fileDetails = fileInput.files[0]
  console.log(fileDetails)
try {
  const { data, error } = await supabase.storage
    .from("usersprofile")
    .upload(`public/${fileDetails.name}`, fileDetails, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) throw error;
  if (data) {
    console.log(data);
  }
} catch (error) {
  console.log(error)
}

})

const getAllFiles = async ()=>{
  try {
    const { data, error } = await supabase.storage
      .from("usersprofile")
      .list("public", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
      if(error) throw error;
      if(data){
        console.log(data)
        try {
          const { data : fileData , error : fileError } = supabase.storage
            .from("usersprofile")
            .getPublicUrl(`public/${data[1].name}`);
          if(fileError) throw fileError;
          if(fileData){
            console.log(fileData)
          }
        } catch (error) {
          
        }
      }

  } catch (error) {
    
  }
}
window.onload = getAllFiles()