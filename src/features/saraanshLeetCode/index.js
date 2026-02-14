

import TalkToAI from "../../core/talkToAi";
// <div class="flexlayout__tab" data-layout-path="/ts0/t0" id="32c5ce81-8aa7-a3f5-8634-01407acdb31f" style="left: 0px; top: 36px; position: absolute; --width: 570px; --height: 527.59375px;"></div>

{
  /* <div class="h-full py-2"></div> */
}
import SaraanshMain from "../../core/saraansh";

import getPrompt from "../../core/prompts";

class TalkToAILeet extends TalkToAI {
  constructor(prompt, chunk, className) {
    super(prompt, chunk, className);
  }
  async init() {
    return new Promise(async (res, rej) => {
      const output = await this.createObj();
      console.log("AIClass Initiated  : ", output);
      if (output) res(output);
      else rej("API_ERROR");
    });
  }

  async createObj() {
    const promptObj = { role: "system", content: `${this.prompt}` };
    const transcript = { role: "user", content: `${this.chunkArr}` };
    const objArr = [promptObj, transcript];
    const output = await this.sendToAI(objArr);

    console.log("AIClass objCreated");
    console.log(" testing form create object : ", output);
    return output;
  }

  sendToAI(messageArr) {
    console.log("runningFine", messageArr);
    // let parent = document.getElementById("outputHtml");

    return new Promise((res, rej) => {
      chrome.runtime.sendMessage(
        { action: "sendMessage", type: "REQUEST_AI", data: messageArr },
        (response) => {
          if (chrome.runtime.lastError || !response) {
            console.error("Error:", chrome.runtime.lastError);
            rej(chrome.runtime.lastError || new Error("No response"));
            return;
          }

          console.log("Inside the response you know it is working........");
          res(response.html);
        }
      );
    });
  }
}

class SaraanshLeetUI extends SaraanshMain {
  async createUI() {
    const logo = this.createLogo();
    let grandParentEl;
    let parentEl;
    try {
      grandParentEl = document.querySelector('[data-layout-path="/ts0/t0"]');
      parentEl = grandParentEl?.children[0]?.children[0]?.children[0];
    } catch (err) {
      console.log("parent Not found : ", err);
    }

    const saraanshContainer = parentEl.querySelector(
      "#saraansh-Leet-container"
    );

    if (!saraanshContainer) {
      const saraanshLeetContainer = document.createElement("div");
        saraanshLeetContainer.id = "saraansh-Leet-container";

      const saraanshLeetBtn = document.createElement("div");
      saraanshLeetBtn.id = "saraanshBtn-Leet";
      saraanshLeetBtn.innerHTML = `${logo}`;

      saraanshLeetContainer.className = "saraanshLogoContainer";

      //  not a good handle...
      // saraanshLeetContainer.style.height = "25px";
      // saraanshLeetContainer.style.width = "25px";
      // saraanshLeetContainer.style.marginRight = "10%"
      // saraanshLeetContainer.style.alignContent ="center";
      // saraanshLeetContainer.style.alignSelf ="center";
      // saraanshLeetContainer.style.marginBottom=""

      //  parentEl.insertBefore(saraanshLeetBtn, parentEl.firstChild);
      parentEl.appendChild(saraanshLeetContainer);

      saraanshLeetContainer.appendChild(saraanshLeetBtn);

      await this.createOption(saraanshLeetContainer, logo);
    } else {
      console.log("saraansh button is already created...");
    }
  }

  createOption(parent, logo) {
    return new Promise((res) => {
      console.log("I am inside create Options");
      let leetOptions = parent.querySelector("#saraansh-Leet-Options");
      console.log(parent);

      if (!leetOptions) {
        leetOptions = document.createElement("div");
        leetOptions.id = "saraansh-Leet-Options";

        leetOptions.innerHTML = `

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
     <div class="modal-overlay" id="modalOverlay">
        <div class="modal-card">
            <div class="modal-header">
                ${logo}
                <h2>Saraansh AI Assistant</h2>
                <button class="modal-close" id="modalClose">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-content">
                <div class="options-container">
                    <button class="option-btn" data-action="explain">
                        <i class="fas fa-lightbulb"></i>
                        <span class="btn-text">Explain question with examples</span>
                    </button>
                    
                    <button class="option-btn" data-action="datastructure">
                        <i class="fas fa-sitemap"></i>
                        <span class="btn-text">What data structure to use</span>
                    </button>
                    
                    <button class="option-btn" data-action="hint">
                        <i class="fas fa-question-circle"></i>
                        <span class="btn-text">Give me a hint</span>
                    </button>
                    
                    <button class="option-btn" data-action="optimize">
                        <i class="fas fa-tachometer-alt"></i>
                        <span class="btn-text">Is my code optimized?</span>
                    </button>
                </div>
                
                <div class="input-group">
                    <input type="text" class="input-field" placeholder="Your Query...">
                    <button class="send-btn">
                        <i class="fas fa-paper-plane"></i>
                        Send
                    </button>
                </div>
                
                <div class="output-container">
                    <button id="toggleOptions" class="toggle-options-btn" style="display: none;">
                        <i class="fas fa-chevron-down"></i>
                        Show Options
                    </button>
                    <div class="output" id="output">
                        <p><i class="fas fa-comment-dots"></i> Response will appear here...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
        console.log(leetOptions);
        parent.appendChild(leetOptions);

        console.log("innerHtml is being set");
      } else {
        console.log("found LeetCode options");
      }
      console.log(parent);
      res();
    });
  }
}

class SaraanshLeet {
  constructor() {
    this.Question = null;
    // this.SolutionByUser = this.#getCurrentSolution();
    this.isThrottleActive = false;
  }

  #getCurrentSolution() {

      const Solution = document.querySelector(
      '[data-layout-path="/c1/ts0/t0"]'
    )?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.children[1].innerText;  
    return Solution; 
  }

  async init() {
    const UI = new SaraanshLeetUI();
    await UI.createUI();

    console.log("testing... if UI created successfully");

    this.loadDom();
  }

  handleSClicked(prompt){
    console.log("Working solution...."); 
    return new Promise(async (res, rej)=>{
      const solution = this.#getCurrentSolution(); 
      let aiOutput = await new TalkToAILeet(prompt,solution ).init(); 
      console.log("testing form solution...", aiOutput); 
      res(aiOutput); 
      if(!aiOutput){
        rej("API_ERROR"); 
      }
    }); 
  }

  handleQClicked(prompt) {
    console.log("Inside Handle Clicked");

    return new Promise(async (res, rej) => {
      let aiOutput = await new TalkToAILeet(prompt, this.Question).init();
      console.log("testing from the handleQ1", aiOutput);
      res(aiOutput);
      if (!aiOutput) {
        rej("API_ERROR");
      }
    });
  }


  handleQueryClicked(prompt){
    console.log("query is working....."); 

    const QA = "Question  :  " + this.Question + "Solution :  " + this.#getCurrentSolution(); 
  
    return new Promise(async(res, rej)=>{
      let aiOutput = await new TalkToAI(prompt,QA); 
      console.log("testing from handle handleQuery..", aiOutput); 
      if(!aiOutput){
        rej("API_ERROR"); 
      }else{
        res(aiOutput); 
      }

    })
  }

loadDom() {
  const outputBox = new Array(4).fill(null);
  const triggerBtn = document.getElementById("saraanshBtn-Leet");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");

  const options =  document.querySelector(".options-container"); 
  const optionButtons = options.querySelectorAll(".option-btn");


  const sendBtn = document.querySelector(".send-btn");

  const input = document.querySelector(".input-group"); 
  const inputField = input.querySelector(".input-field");

  const output = document.getElementById("output");
  
  // For managing throttle state
  const self = this;
  const THROTTLE_DELAY = 30 * 1000; 
  const InactiveOpacity = 0.5;
  

  const toggleOptionsBtn = document.getElementById('toggleOptions');

  // Handle showing/hiding options and input
  const showElements = () => {
    options.style.display = 'grid';
    input.style.display = 'flex';
    output.style.height = '';  
    toggleOptionsBtn.style.display = 'none'; 
    toggleOptionsBtn.classList.remove('active');
  };

  const hideElements = () => {
    options.style.display = 'none';
    input.style.display = 'none';
    output.style.height = 'calc(100% - 60px)'; 
    toggleOptionsBtn.style.display = 'flex';  
  };


  toggleOptionsBtn.addEventListener('click', (e) => {
    e.stopPropagation();  
    if (options.style.display === 'none') {
      showElements();
      toggleOptionsBtn.classList.remove('active');
    } else {
      hideElements();
      toggleOptionsBtn.classList.add('active');
    }
  });

  this.Question = document.querySelector('[data-layout-path="/ts0/t0"]').innerText;
  
  triggerBtn.addEventListener("click", () => {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  modalClose.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  function throttle(fn, delay) {
    return async (...args) => {
      if (self.isThrottleActive) {
        console.log('Throttle active, skipping request');
        return null;
      }

      const now = Date.now();
      if (!self.lastCallTime || now - self.lastCallTime >= delay) {
        self.isThrottleActive = true;
        self.lastCallTime = now;
        try {
          const result = await fn.apply(self, args);
          return result;
        } finally {
          setTimeout(() => {
            self.isThrottleActive = false;
          }, delay);
        }
      }
      return null;
    };
  }

  const throttledQClicked = throttle(async (promptText) => {
    return await self.handleQClicked(promptText);
  }, THROTTLE_DELAY);

  const throttledSClicked = throttle(async (promptText) => {
    return await self.handleSClicked(promptText);
  }, THROTTLE_DELAY);

  // Option buttons
  optionButtons.forEach((button, index) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.action;
      const btnText = button.querySelector(".btn-text");
      const icon = button.querySelector("i");
      const originalIcon = icon.className;
      const originalText = btnText.textContent;

 

      if (self.isThrottleActive) {
        output.innerHTML = `<p><i class="fas fa-clock"></i> Please wait ${THROTTLE_DELAY/1000} seconds between requests.</p>`;
        return;
      }

      // Update visual state for all buttons
      optionButtons.forEach((btn) => {
        btn.disabled = true;
        btn.classList.remove("active");
        if (btn !== button) {
          btn.style.opacity = InactiveOpacity;
          // Add a tooltip showing the throttle status
          btn.title = `Will be available in ${THROTTLE_DELAY/1000} seconds`;
        }
      });

      button.classList.add("active");
      button.style.opacity = "1";
      icon.className = "fas fa-cog fa-spin";
      btnText.textContent = "Processing...";

      try {
        let prompt;
        switch (action) {
          case "explain":
            prompt = getPrompt("leetcode", "Example");
            if (!outputBox[0]) {
              outputBox[0] = await throttledQClicked(prompt);
            }
            output.innerHTML = `
              <p><i class="fas fa-check-circle"></i> <strong>Explanation with examples:</strong></p>
              <p>${outputBox[0]}</p>
            `;
            break;

          case "datastructure":
            prompt = getPrompt("leetcode", "DS");
            if (!outputBox[1]) {
              outputBox[1] = await throttledQClicked(prompt);
            }
            output.innerHTML = `
              <p><i class="fas fa-sitemap"></i> <strong>Recommended Data Structure:</strong></p>
              ${outputBox[1]}
            `;
            break;

          case "hint":
            prompt = getPrompt("leetcode", "Hint");
            if (!outputBox[2]) {
              outputBox[2] = await throttledQClicked(prompt);
            }
            output.innerHTML = `
              <p><i class="fas fa-lightbulb"></i> <strong>Hint:</strong></p>
              ${outputBox[2]}
            `;
            break;

          case "optimize":
            const promptOptimize = getPrompt("leetcode", "Optimize");
            if (!outputBox[3]) {
              outputBox[3] = await throttledSClicked(promptOptimize);
            }
            output.innerHTML = `
              <p><i class="fas fa-tachometer-alt"></i> <strong>Optimization Analysis:</strong></p>
              ${outputBox[3]}
            `;
            break;
        }
      } catch (error) {
        console.error(`Error processing ${action}:`, error);
        output.innerHTML = `<p>Error generating ${action} output</p>`;
      } finally {
      
        //original icon back to the 
        icon.className = originalIcon;
        btnText.textContent = originalText;

        // hiding options  once result is on ouput box to expand the size
        hideElements();
    
        if (!self.isThrottleActive) {
          optionButtons.forEach((btn) => {
            btn.disabled = false;
            btn.style.opacity = "1";
          });
        } else {
          setTimeout(() => {
            optionButtons.forEach((btn) => {

              btn.disabled = false;
              btn.style.opacity = "1";
              
            });
          }, THROTTLE_DELAY);
        }

        output.scrollTop = output.scrollHeight;
      }
    });
  });



  // Send button
  sendBtn.addEventListener("click", async () => {
    const query = inputField.value.trim();

    

    let prompt = getPrompt("leetcode", "Question",this.Question, query); 

    if (!prompt) return;

    output.innerHTML = `<p><i class="fas fa-circle-notch fa-spin"></i> Processing your query: "${query}"...</p>`;

    try {
      optionButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = InactiveOpacity;
      });
      sendBtn.disabled = true;
      
      const response = await throttledSClicked(prompt);
      if (response === null) {
        output.innerHTML = `<p><i class="fas fa-clock"></i> Please wait before making another request.</p>`;
      } else {
        output.innerHTML = `
          <p><i class="fas fa-check-circle"></i> <strong>Response to your query:</strong></p>
          <p>${response}</p>
        `;
      }
    } catch (err) {
      console.error("Error handling query:", err);
      output.innerHTML = `<p><i class="fas fa-exclamation-circle"></i> Error generating response</p>`;
    } finally {   
    // hiding the other elements again 
     hideElements(); 
      // reenable and restore opacity of all buttons
      optionButtons.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = "1";
      });
      sendBtn.disabled = false;
    }

    output.scrollTop = output.scrollHeight;
    inputField.value = "";
  });

  // Enter key triggers send
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });
}
}

function main() {
  new SaraanshLeet().init();
}
main();
