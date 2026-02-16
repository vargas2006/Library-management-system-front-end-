function showLogin(){
    document.getElementById("mainButtons").style.display="none";
    document.getElementById("formOverlay").style.display="flex";

    document.getElementById("formBox").innerHTML = `
        <h2>Login</h2>
        <input type="email" placeholder="Enter Email" required>
        <input type="password" placeholder="Enter Password" required>
        <input type="submit" value="LOGIN">
        <button class="back-btn" onclick="goBack()">Back</button>
    `;
}

function showSignup(){
    document.getElementById("mainButtons").style.display="none";
    document.getElementById("formOverlay").style.display="flex";

    document.getElementById("formBox").innerHTML = `
        <h2>Sign Up</h2>
        <input type="text" placeholder="Full Name" required>
        <input type="email" placeholder="Enter Email" required>
        <input type="password" placeholder="Enter Password" required>
        <select>
            <option>--Select Role--</option>
            <option>User</option>
            <option>Admin</option>
        </select>
        <input type="submit" value="REGISTER">
        <button class="back-btn" onclick="goBack()">Back</button>
    `;
}

function goBack(){
    document.getElementById("formOverlay").style.display="none";
    document.getElementById("mainButtons").style.display="block";
}