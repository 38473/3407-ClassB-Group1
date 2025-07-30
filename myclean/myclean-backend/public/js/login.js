
async function loginUser(email, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json().then(result => ({ ok: response.ok, result }));
}


async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const { ok, result } = await loginUser(email, password);

    if (ok && result.success) {
      localStorage.setItem('myclean_user_id', result.userId);
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Login failed: " + result.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred.");
  }
}


document.getElementById("loginForm")?.addEventListener("submit", handleLogin);


module.exports = { handleLogin, loginUser };
