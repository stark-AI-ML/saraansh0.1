import UserConfig from "./userConfig";

class SaraanshLogin {
  CreateLoginOptionUI() {
    const LoginPage = document.createElement("div");
    const logo = new SaraanshMain().createLogo();

    LoginPage.innerHTML = `
    <div class="signInGoogle">
      ${logo}
      <div id="signInWithGoogle" class="google-signin-btn" aria-label="Sign in with Google">
        <span class="orbit-dot dot-1"></span>
        <span class="orbit-dot dot-2"></span>
        <svg
          class="google-icon"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span class="btn-text">Sign in with Google</span>
      </div>
    </div>

`;

    return LoginPage;
  }

  loadLoginDom(LoginPage) {
    console.log("Initializing login button...");

    const SignInBtn = LoginPage.querySelector("#signInWithGoogle");
    if (SignInBtn) {
      SignInBtn.addEventListener("click", async () => {
        try {
          console.log("Sign in button clicked");
          SignInBtn.disabled = true;

          const response = await chrome.runtime.sendMessage({
            type: "GOOGLE_SIGN_IN",
          });
          console.log("Sign in response:", response);

          if (response.success && response.user) {
            console.log("Successfully signed in:", response.user);
            // Hide the login page
            LoginPage.style.display = "none";

            // Trigger event for UI updates
            const event = new CustomEvent("userSignedIn", {
              detail: { user: response.user },
            });
            document.dispatchEvent(event);

            // The background script now handles storing the user in chrome.storage
          } else {
            console.error("Sign in failed:", response.error);
            // Show error to user
            const errorEl = document.createElement("div");
            errorEl.className = "sign-in-error";
            errorEl.textContent = "Sign in failed. Please try again.";
            SignInBtn.parentNode.appendChild(errorEl);
            setTimeout(() => errorEl.remove(), 3000);
          }
        } catch (error) {
          console.error("Error during sign in:", error);
        } finally {
          SignInBtn.disabled = false;
        }
      });
    }

    // Check if user is already signed in
    chrome.storage.local.get(["currentUser"], (result) => {
      if (result.currentUser) {
        LoginPage.style.display = "none";
        // Trigger event for UI updates
        const event = new CustomEvent("userSignedIn", {
          detail: { user: result.currentUser },
        });
        document.dispatchEvent(event);
      }
    });
  }
}

class SaraanshMain extends SaraanshLogin {
  constructor() {
    super();
  }

  createLogo() {
    const logoHtml = ` 
        <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
      <div class="logo-container">
        <div class="saaransh-logo" role="img" aria-label="Saaransh logo">
          <svg
            class="logo-svg"
            viewBox="0 0 100 100"
            focusable="false"
            aria-hidden="true"
          >
            <defs>
              <!-- Dark color palette with glowing effects -->
              <radialGradient id="bgGlow" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stop-color="#5b2cff" stop-opacity="0.5" />
                <stop offset="55%" stop-color="#302b63" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#0f0c29" stop-opacity="0.8" />
              </radialGradient>

              <linearGradient id="glyphGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffd6ff" />
                <stop offset="100%" stop-color="#c8b6ff" />
              </linearGradient>

              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#c8b6ff" />
                <stop offset="60%" stop-color="#7c4dff" />
                <stop offset="100%" stop-color="#5b2cff" />
              </linearGradient>

              <!-- Glow filter for revolving ring -->
              <filter
                id="glowFilter"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2.5"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5"
                  result="glow"
                />
                <feBlend in="SourceGraphic" in2="glow" mode="screen" />
              </filter>
            </defs>

            <!-- Background circle with dark gradient -->
            <g class="disc">
              <circle cx="50" cy="50" r="46" fill="url(#bgGlow)" />
              <circle cx="50" cy="50" r="45" fill="rgba(15, 12, 41, 0.8)" />
            </g>

            <!-- Revolving ring with glow effect -->
            <g class="revolve">
              <circle
                class="ring"
                cx="50"
                cy="50"
                r="39"
                fill="none"
                stroke="url(#ringGrad)"
                stroke-width="3"
                stroke-linecap="round"
                stroke-dasharray="52 290"
              />
            </g>
            <!-- Orbiting dots -->
            <g class="orbit">
                <g class="orbit-track orbit--a">
                <circle cx="50" cy="5" r="30" fill="none" />
                <circle class="dot" r="0.5" transform="translate(70 14)" />
              </g>

              <g class="orbit-track orbit--a">
                <circle cx="50" cy="50" r="30" fill="none" />
                <circle class="dot" r="1" transform="translate(80 40)" />
              </g>
               
              <g class="orbit-track orbit--a">
                <circle cx="50" cy="50" r="30" fill="none" />
                <circle class="dot" r="0.6" transform="translate(40 30)" />
              </g>

              <g class="orbit-track orbit--b">
                <circle cx="50" cy="50" r="23" fill="none" />
                <circle class="dot" r="1.4" transform="translate(73 50)" />
              </g>
              <g class="orbit-track orbit--c">
                <circle cx="50" cy="50" r="36" fill="none" />
                <circle class="dot" r="1.2" transform="translate(50 14)" />
              </g>
            </g>
            <!-- Hindi glyph -->
            <g class="glyph">
              <text
                x="50"
                y="61"
                text-anchor="middle"
                dominant-baseline="middle"
                font-size="56"
                font-weight="700"
                fill="url(#glyphGrad)"
                stroke="rgba(124,77,255,0.35)"
                stroke-width="0.5"
                style="
                  paint-order: stroke fill;
                  font-family: var(--font-devanagari);
                "
              >
                श
              </text>
            </g>
          </svg>
        </div>
      </div>
        `;
    return logoHtml;
  }

  createUserBtn() {
    const btnHtml = ` 
        <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
      <div id="settingsToggleBtn" class="logo-container">
        <div  class="saaransh-logo" role="img" aria-label="Saaransh logo">
          <svg
            class="logo-svg"
            viewBox="0 0 100 100"
            focusable="false"
            aria-hidden="true"
          >
            <defs>
              <!-- Dark color palette with glowing effects -->
              <radialGradient id="bgGlow" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stop-color="#5b2cff" stop-opacity="0.5" />
                <stop offset="55%" stop-color="#302b63" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#0f0c29" stop-opacity="0.8" />
              </radialGradient>

              <linearGradient id="glyphGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffd6ff" />
                <stop offset="100%" stop-color="#c8b6ff" />
              </linearGradient>

              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#c8b6ff" />
                <stop offset="60%" stop-color="#7c4dff" />
                <stop offset="100%" stop-color="#5b2cff" />
              </linearGradient>

              <!-- Glow filter for revolving ring -->
              <filter
                id="glowFilter"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2.5"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5"
                  result="glow"
                />
                <feBlend in="SourceGraphic" in2="glow" mode="screen" />
              </filter>
            </defs>

            <!-- Background circle with dark gradient -->
            <g class="disc">
              <circle cx="50" cy="50" r="46" fill="url(#bgGlow)" />
              <circle cx="50" cy="50" r="45" fill="rgba(15, 12, 41, 0.8)" />
            </g>

            <!-- Revolving ring with glow effect -->
            <g class="revolve">
              <circle
                class="ring"
                cx="50"
                cy="50"
                r="39"
                fill="none"
                stroke="url(#ringGrad)"
                stroke-width="3"
                stroke-linecap="round"
                stroke-dasharray="52 290"
              />
            </g>
            <!-- Orbiting dots -->
            <g class="orbit">
                <g class="orbit-track orbit--a">
                <circle cx="50" cy="5" r="30" fill="none" />
                <circle class="dot" r="0.5" transform="translate(70 14)" />
              </g>

              <g class="orbit-track orbit--a">
                <circle cx="50" cy="50" r="30" fill="none" />
                <circle class="dot" r="1" transform="translate(80 40)" />
              </g>
               
              <g class="orbit-track orbit--a">
                <circle cx="50" cy="50" r="30" fill="none" />
                <circle class="dot" r="0.6" transform="translate(40 30)" />
              </g>

              <g class="orbit-track orbit--b">
                <circle cx="50" cy="50" r="23" fill="none" />
                <circle class="dot" r="1.4" transform="translate(73 50)" />
              </g>
              <g class="orbit-track orbit--c">
                <circle cx="50" cy="50" r="36" fill="none" />
                <circle class="dot" r="1.2" transform="translate(50 14)" />
              </g>
            </g>
            <!-- Hindi glyph -->
            <g class="glyph">
              <text
                x="50"
                y="61"
                text-anchor="middle"
                dominant-baseline="middle"
                font-size="56"
                font-weight="700"
                fill="url(#glyphGrad)"
                stroke="rgba(124,77,255,0.35)"
                stroke-width="0.5"
                style="
                  paint-order: stroke fill;
                  font-family: var(--font-devanagari);
                "
              >
                श
              </text>
            </g>
          </svg>
        </div>
      </div>
        `;
    return btnHtml;
  }

  createUserAcc() {
    const accHtml = `
    <div id="userContainer"  class="ai-settings-wrapper">
    <div class="dropdown-container" id="dropdownContainer">
      <div class="dropdown-content">
        <div class="dropdown-item">
          <div class="item-icon">
            <i class="fas fa-coins"></i>
          </div>
          <div class="item-content">
             <div class="userOptions" style="margin-top: 10px; padding: 8px 16px; display: inline-flex; align-items: center;">
              <i class="fas fa-coins" style="margin-right: 8px;"></i> 
              TOKENS LEFT: <span id="tokenLeft" style="margin-left: 6px; font-weight: 700;"></span>
            </div>
          </div>
        </div>
        <div class="dropdown-item">
          <div class="item-icon">
            <i class="fas fa-brain"></i>
          </div>
          <div class="item-content">
            <div class="item-title">Select AI Model</div>
            <div class="custom-select-wrapper">
              <div class="custom-select">
                <div class="custom-select-trigger">
                  <img src="https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg" 
       alt="ChatGpt Logo" class="model-logo" />

                  <span class="selected-option-text">gpt-oss-20b:free</span>
                  <i class="fas fa-chevron-down arrow"></i>
                </div>
                <div class="custom-options">
                  <div class="custom-option" data-value="google/gemini-2.0-flash-exp:free">
                    <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png" alt="Gemini Logo" class="model-logo" />
                    <span>Gemini</span>
                  </div>

                  <div class="custom-option" data-value="openai/gpt-oss-20b:free">
                    <img src="https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg" alt="OpenAI Logo" class="model-logo invert-color" />
                    <span>gpt-oss-20b:free</span>
                  </div>

                  
                  <div class="custom-option" data-value="nvidia/nemotron-nano-9b-v2:free">
                    <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/235_Nvidia_logo-1024.png" alt="NvidiaLogo" class="model-logo invert-color" />
                    <span>nemotron-nano-9b-v2:free</span>
                  </div>

                  <div class="custom-option" data-value="deepseek/deepseek-chat-v3.1:free">
                    <img src="https://crystalpng.com/wp-content/uploads/2025/01/deepseek-logo-03-1024x1024.png" alt="deepseek logo" class="model-logo invert-color" />
                    <span>Deepsee-R1</span>
                  </div>


                  

                  <div class="custom-option" data-value="tngtech/deepseek-r1t2-chimera:free">
                    <img src="https://crystalpng.com/wp-content/uploads/2025/01/deepseek-logo-03-1024x1024.png" alt="deepseek logo" class="model-logo invert-color" />
                    <span>deepseek-r1t2-chimera:free(617B)</span>
                  </div>
                
                  <div class="custom-option" data-value="qwen/qwen3-30b-a3b:free">
                    <img src="https://images.seeklogo.com/logo-png/61/1/qwen-icon-logo-png_seeklogo-611724.png" alt="qwen logo" class="model-logo" />
                    <span>qwen3-30b-a3b:free</span>
                  </div>

                   <div class="custom-option" data-value="qwen/qwen3-coder:free">
                    <img src="https://images.seeklogo.com/logo-png/61/1/qwen-icon-logo-png_seeklogo-611724.png" alt="qwen logo" class="model-logo" />
                    <span>qwen3-coder:free(480B)</span>
                  </div>

                   <div class="custom-option" data-value="moonshotai/kimi-dev-72b:free">
                    <img src="https://asiatechdaily.com/wp-content/uploads/2024/02/Alibaba-Leads-1-Billion-Investment-in-Moonshot-AI-for-LLM-Development.jpg" alt="moonShot logo" class="model-logo" />
                    <span>moonshotai/kimi-dev-72b:free(72B)</span>
                  </div>  
                </div>
              </div>
            </div>
            <div class="item-value" style="margin-top: 8px">
              Choose the model for your tasks.
            </div>
          </div>
        </div>
        
        <div class="dropdown-item">
          <div class="item-icon">
            <i class="fas fa-plug"></i>
          </div>
          <div class="item-content">
            <div class="item-title">Your API Key</div>
            <input id = "inputAPI" type="text" class="api-input" placeholder="Enter your API key" />
            <div class="item-value" style="margin-top: 8px">
             Select Model and enter any custom API key you want to use.
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="save-btn">
            <i class="fas fa-save"></i> Save Settings
          </button>
          <button id="resetBtn" class="userOptions">
            <i class="fas fa-cog"></i> reset
          </button>
        </div>
      </div>
    </div>
  </div>

    `;
    return accHtml;
  }

  async loadUserAccDom() {
    setTimeout(async () => {
      const settingsToggleBtn = document.getElementById("settingsToggleBtn");
      const dropdownContainer = document.getElementById("dropdownContainer");
      const settingsWrapper = document.querySelector(".ai-settings-wrapper");
      const userContainer = document.getElementById("userContainer");

      if (
        !settingsToggleBtn ||
        !dropdownContainer ||
        !settingsWrapper ||
        !userContainer
      ) {
        console.warn("Some elements not found in DOM:", {
          settingsToggleBtn: !!settingsToggleBtn,
          dropdownContainer: !!dropdownContainer,
          settingsWrapper: !!settingsWrapper,
          userContainer: !!userContainer,
        });
        return;
      }

      // Initially hide the dropdown
      userContainer.style.display = "none";

      settingsToggleBtn.addEventListener("click", (e) => {
        console.log("Settings button clicked");
        e.stopPropagation();

        // Toggle visibility
        userContainer.style.display =
          userContainer.style.display === "none" ? "block" : "none";
        dropdownContainer.classList.toggle("show");
        settingsToggleBtn.classList.toggle("open");
      });

      // Close dropdown when clicking outside of it
      window.addEventListener("click", (e) => {
        if (
          !settingsWrapper.contains(e.target) &&
          !settingsToggleBtn.contains(e.target)
        ) {
          userContainer.style.display = "none";
          dropdownContainer.classList.remove("show");
          settingsToggleBtn.classList.remove("open");
        }
      });

      // --- Custom Select (AI Model) Logic ---
      const customSelect = document.querySelector(".custom-select");
      const trigger = customSelect.querySelector(".custom-select-trigger");
      const options = customSelect.querySelectorAll(".custom-option");
      const selectedText = trigger.querySelector(".selected-option-text");
      const selectedLogo = trigger.querySelector(".model-logo");

      // Hydrate UI from storage
      const config = await UserConfig.loadConfig();
      if (config.model) {
        const savedOption = document.querySelector(
          `.custom-option[data-value="${config.model}"]`
        );
        if (savedOption) {
          selectedText.textContent =
            savedOption.querySelector("span").textContent;
          const newLogoSrc = savedOption.querySelector(".model-logo").src;
          selectedLogo.src = newLogoSrc;

          // Sync classes
          const newLogoClasses =
            savedOption.querySelector(".model-logo").classList;
          selectedLogo.className = "model-logo";
          newLogoClasses.forEach((cls) => {
            if (cls !== "model-logo") {
              selectedLogo.classList.add(cls);
            }
          });
        }
      }

      // Dropdown toggle
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        customSelect.classList.toggle("open");
      });

      // Handle option selection
      options.forEach((option) => {
        option.addEventListener("click", async () => {
          selectedText.textContent = option.querySelector("span").textContent;
          const newLogoSrc = option.querySelector(".model-logo").src;
          selectedLogo.src = newLogoSrc;

          const newLogoClasses = option.querySelector(".model-logo").classList;
          selectedLogo.className = "model-logo";
          newLogoClasses.forEach((cls) => {
            if (cls !== "model-logo") {
              selectedLogo.classList.add(cls);
            }
          });

          customSelect.classList.remove("open");
          const selectedValue = option.getAttribute("data-value");
          console.log("Selected model:", selectedValue);

          // Persist selection
          const userConfig = new UserConfig();
          userConfig.setModel(selectedValue);

          // Debug: confirm storage
          console.log(await UserConfig.loadConfig());
        });
      });

      /* Token Left */
      const tokenViewEle = document.getElementById("tokenLeft");
      if (tokenViewEle) {
        let tokenLeft = await UserConfig.getTokenLeft();
        if (tokenLeft === null) tokenLeft = 0; // fallback
        tokenViewEle.innerText = `${tokenLeft}`;
      }


      // Update Based on Users API KEY 

      const saveBtn = document.querySelector(".save-btn"); 

      saveBtn.addEventListener('click', ()=>{
       saveBtn.style.opacity = "0.5";
 
       const inputField =  document.querySelector("#inputAPI"); 

       if(inputField.value == null || inputField.value === ""){
          console.warn("Enter the API KEY"); 
       }else{

         const config = new UserConfig({tokenKey:inputField.value}); 
         config.save({tokenKey:config.tokenKey}); 

         console.log("Token Updated:", config.tokenKey); 

         setTimeout(()=>{
            saveBtn.style.opacity = "1";

         }, 3000)
       }
      }); 

      // Reset API KEY........



      document.querySelector("#resetBtn").addEventListener('click',()=>{
        
      chrome.runtime.sendMessage({
            type: "RESET_TOKEN"
          });
      })

    });
  }
}
export default SaraanshMain;
