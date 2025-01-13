const addNewUseBtn = document.querySelector("#addNewUser_btn");
const firstName = document.querySelector("#newUser_firstName");
const lastName = document.querySelector("#newUser_lastName");
const companyName = document.querySelector("#company_Name");
const companyAddress = document.querySelector("#company_Address");
const companyEmail = document.querySelector("#company_email");

addNewUseBtn.addEventListener("click", async () => {
  try {
    const { error } = await supabase.from("users").insert({
      first_name: firstName.value,
      last_name: lastName.value,
      company_name: companyName.value,
      address: companyAddress.value,
      email_address: companyEmail.value,
    });

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }

  console.log(firstName.value);
  console.log(lastName.value);
  console.log(companyName.value);
  console.log(companyAddress.value);
  console.log(companyEmail.value);
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const usersDataTable = document.querySelector("#usersDataTable");

const showData = async () => {
  try {
    const { data, error } = await supabase.from("users").select();

    if (error) throw error;
    if (data) {
      console.log(data)
      usersDataTable.innerHTML = ''
      data.map(
        (user) =>
          (usersDataTable.innerHTML += `
               <tr>
                <th scope="row">${user.id}</th>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.company_name}</td>
                <td>${user.address}</td>
                <td>${user.email_address}</td>
              </tr>
        `)
      );
    }
  } catch (error) {}
};
window.onload = showData();
