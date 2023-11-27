import  axios  from "../api/axios";

export function handleLogin(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  axios
    .post("/auth/login", {
      email: data.get("email"),
      password: data.get("password"),
    })
    .then((response) => {
      localStorage.setItem("savedRole", response.data.role);
      if (response.status === 200 && response.data.role === "patient") {
        window.location.href = "/patient-profile";
      }
      else if (response.status === 200 && response.data.role === "opo") {
        window.location.href = "/pending-donations";
      }
      else if (response.status === 200 && response.data.role === "provider") {
        window.location.href = "/donors";
      }
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}
