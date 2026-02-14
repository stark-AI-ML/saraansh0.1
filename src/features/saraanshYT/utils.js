// import SaraanshMain from "../../core/saraansh";
// import createChunkArray from "../../core/textChunk";
// import TalkToAI from "../../core/talkToAi";
// import getPrompt from "./prompts";
// import htmlToPdf from "../../core/HtmlToPdf";
// // import { AuthHandler } from "../../background/Firebase/fireBaseLogin.js";
// import UserConfig from "../../core/userConfig.js";
// // function getFirebaseConfig() {
// //   const firebaseConfig = {
// //     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// //     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// //     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// //     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// //     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// //     appId: import.meta.env.VITE_FIREBASE_APP_ID,
// //     measurementId: import.meta.env.VITE_Firebase_MEASUREMENT_ID,
// //   };
// //   return firebaseConfig;
// // }

// class TalkToAIYt extends TalkToAI {
//   constructor(prompt, chunk, className) {
//     super(prompt, chunk, className);
//   }

//   sendToAI(messageArr, i) {
//     console.log("runningFine", messageArr);
//     let parent = document.getElementById("outputHtml");

//     return new Promise((res, rej) => {
//       chrome.runtime.sendMessage(
//         { type: "REQUEST_AI", data: messageArr },

//         async (response) => {
//           if (chrome.runtime.lastError || !response) {
//             console.error("Error:", chrome.runtime.lastError);
//             rej(chrome.runtime.lastError || new Error("No response"));
//             return;
//           }

//           console.log("Inside the response you know it is working........");

//           const tempElement = document.createElement("div");
//           tempElement.innerHTML = await response.html;
//           parent.appendChild(tempElement);

//           console.log("HTML : \n", response.html);
//           console.log("Received Data:", response.data);
//           console.log(parent);
//           let conclusion;
//           let conclusionParent = document.querySelector(`.conclusionTextYt`);
//           if (conclusionParent) {
//             conclusion = conclusionParent.innerText;
//             res(conclusion);
//           }
//           res();
//         }
//       );
//     });
//   }
// }

// class TranscriptHandler {
//   clickShow() {
//     setTimeout(() => {
//       const transcriptBtnParent = document.querySelector(
//         "ytd-video-description-transcript-section-renderer"
//       )?.children[2];
//       console.log("Under_Transcript", transcriptBtnParent);
//       if (transcriptBtnParent) {
//         const button =
//           transcriptBtnParent?.children[0]?.children[0]?.children[0]
//             ?.children[0];
//         if (button) button.click();
//       }
//     }, 1200);
//   }

//   async getTranscriptString() {
//     this.clickShow();
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const val = document.querySelector("ytd-transcript-renderer");
//         resolve(val ? val.innerText : "");
//       }, 5000);
//     });
//   }
// }

// class SaraanshYTUI extends SaraanshMain {
//   constructor() {
//     super();
//   }
//   createSaraanshBtnYT() {
//     const logo = this.createLogo();

//     const leftControl = document.querySelector(".ytp-left-controls");
//     let saraanshBtn = document.getElementById("saraansh-btn");
//     if (!saraanshBtn) {
//       saraanshBtn = document.createElement("div");
//       saraanshBtn.id = "saraansh-btn";
//       // removing the button I do may need to revert it back...................
//       saraanshBtn.innerHTML = `${logo}`;
//       leftControl.appendChild(saraanshBtn);
//     }
//     return saraanshBtn;
//   }

//   async createLoginOption() {
//     const loginPage = this.CreateLoginOptionUI();
//     console.log("printing the login page html code to see if its working");
//     console.log(loginPage);
//     // this.loadLoginDom(loginPage);

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const saraanshParent = document.querySelector(
//           "ytd-watch-next-secondary-results-renderer"
//         )?.children[1];

//         // instead of searching whole can't we search withing the saraansh parent cuz that's
//         // where we are going to insert right?
//         let LoginOptions = document.getElementById("Login-Options");

//         if (!LoginOptions) {
//           LoginOptions = document.createElement("div");

//           LoginOptions.id = "Login-Options";
//           LoginOptions.className = "loginOptions";
//           LoginOptions.style.display = "none";
//           LoginOptions.appendChild(loginPage);
//           console.log(loginPage);
//           // LoginOptions.innerHTML =`${loginPage}`;
//           // LoginOptions.innerHTML = `<h1> Hello how are you </h1>`;
//           console.log("Login Html :  \n", loginPage);

//           saraanshParent.insertBefore(LoginOptions, saraanshParent.firstChild);
//           // this.loadUserBtnDom();

//           // User.loadUserBtnDom();
//         }
//         console.log("logging inner Login Html");
//         console.log(LoginOptions);

//         resolve(LoginOptions);
//       }, 1000);
//     });
//   }

//   async createSaraanshOptions() {
//     // const logo = new SaraanshMain().createLogo();
//     // creating a new change from logo to btn....

//     const User = new SaraanshMain();
//     const Btn = User.createUserBtn();
//     const userAcc = User.createUserAcc();
//     // const Btn = new SaraanshMain().createUserBtn();

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const saraanshParent = document.querySelector(
//           "ytd-watch-next-secondary-results-renderer"
//         )?.children[1];
//         let saraanshOptions = document.getElementById("saraansh-Options");
//         if (!saraanshOptions) {
//           saraanshOptions = document.createElement("div");
//           saraanshOptions.id = "saraansh-Options";
//           saraanshOptions.style.display = "none";

//           saraanshOptions.innerHTML = `
//  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
// <div class="ytContainer">
//   <div class="navbar-container">
//     <div class="top-row">
//       <div id="user-options" class="logo">${Btn}</div>

//       <div class="download-area">
//         <div class="loading-spinner" id="loadingSpinner"></div>
//         <button class="download-btn" id="viewHtml">
//           <i class="fa-solid fa-eye"></i>
//         </button>
//       </div>
//     </div>
//     <div class="bottom-row">
//       <div class="nav-options">
//         <div id="normal" class="option active">Normal</div>
//         <div id="detailed" class="option">Detailed</div>
//         <div id="concise" class="option">Concise</div>
//       </div>
//     </div>
//   </div>
//   <div id="userDetails"> 
          
//   ${userAcc}
    
//   </div>
//     <div id="outputHtml"> 
//   </div>
// </div>
//           `;

//           saraanshParent.insertBefore(
//             saraanshOptions,
//             saraanshParent.firstChild
//           );
//           // this.loadUserBtnDom();
//           User.loadUserAccDom(saraanshOptions);
//         }
//         resolve(saraanshOptions);
//       }, 1000);
//     });
//   }
// }

// class SaraanshEventsYt {
//   constructor() {
//     this.transcriptChunk = null;
//     this.isThrottleActive = false;
//   }

//   async init() {
//     this.transcript = await new TranscriptHandler().getTranscriptString();
//     console.log("****", this.transcript);
//     console.log("Starting The Events...");
//     console.log(this.transcript);
//     console.log("Got The Transcript");
//     this.transcriptChunk = createChunkArray(this.transcript, 50000);

//     console.log(this.transcriptChunk);
//     console.log("transcriptChunk");
//   }

//   async createUI() {
//     const UI = new SaraanshYTUI();
//     const btn = UI.createSaraanshBtnYT();

//     const options = await UI.createSaraanshOptions();
//     this.loadSaraanshDom(btn, options);

//     // const Login = await UI.createLoginOption();

//     // this.loginOptionFun(btn, Login);
//   }

//   loginOptionFun(saraanshBtn, LoginOptions) {
//     saraanshBtn.addEventListener("click", () => {
//       console.log("LoginOptions has to load...");
//       LoginOptions.style.display = "flex";
//     });

//     const signInWithGoogleBtn = LoginOptions.querySelector("#signInWithGoogle");

//     console.log("*************sign IN Btn*******************");
//     console.log(signInWithGoogleBtn);

//     //   // if (signInWithGoogleBtn) {
//     //   //   signInWithGoogleBtn.addEventListener("click", () => {
//     //   //     console.log("Sign in button clicked");

//     //   //     // One-time listener for auth state changes
//     //   //     const authStateListener = (msg, sender, sendResponse) => {
//     //   //       if (msg.type === "AUTH_STATE") {
//     //   //         const payload = msg.payload;
//     //   //         console.log("Auth state in content script:", payload);

//     //   //         if (payload.status === "signed_in") {
//     //   //           const uid = payload.uid;
//     //   //           chrome.runtime.sendMessage({ type: "GET_DOC", collection: "users", id: uid }, (docResp) => {
//     //   //             if (chrome.runtime.lastError) {
//     //   //               console.error("GET_DOC error:", chrome.runtime.lastError);
//     //   //             }
//     //   //             if (docResp && docResp.ok && docResp.data) {
//     //   //               LoginOptions.style.display = "none";
//     //   //               const UI = new SaraanshYTUI();
//     //   //               UI.createSaraanshOptions().then(options => {
//     //   //                 this.loadSaraanshDom(saraanshBtn, options);
//     //   //               });
//     //   //               chrome.runtime.onMessage.removeListener(authStateListener);
//     //   //             } else {
//     //   //               const profile = { uid, email: payload.email, displayName: payload.displayName, photoURL: payload.photoURL };
//     //   //               chrome.runtime.sendMessage({ type: "SET_DOC", collection: "users", id: uid, data: profile }, (setResp) => {
//     //   //                 LoginOptions.style.display = "none";
//     //   //                 const UI = new SaraanshYTUI();
//     //   //                 UI.createSaraanshOptions().then(options => {
//     //   //                   this.loadSaraanshDom(saraanshBtn, options);
//     //   //                 });
//     //   //                 chrome.runtime.onMessage.removeListener(authStateListener);
//     //   //               });
//     //   //             }
//     //   //           });
//     //   //         }
//     //   //       }
//     //   //     };

//     //   //     // Add the auth state listener
//     //   //     chrome.runtime.onMessage.addListener(authStateListener);

//     //   //     // Initiate sign in
//     //   //     chrome.runtime.sendMessage({ type: "SIGN_IN" }, (response) => {
//     //   //       if (chrome.runtime.lastError) {
//     //   //         console.error("Sign in error:", chrome.runtime.lastError);
//     //   //         return;
//     //   //       }

//     //   //       if (response && response.ok && response.user) {
//     //   //         const payload = { status: "signed_in", uid: response.user.uid, email: response.user.email, displayName: response.user.displayName, photoURL: response.user.photoURL };
//     //   //         chrome.runtime.sendMessage({ type: "GET_DOC", collection: "users", id: response.user.uid }, (docResp) => {
//     //   //           if (docResp && docResp.ok && docResp.data) {
//     //   //             LoginOptions.style.display = "none";
//     //   //             const UI = new SaraanshYTUI();
//     //   //             UI.createSaraanshOptions().then(options => this.loadSaraanshDom(saraanshBtn, options));
//     //   //           } else {
//     //   //             const profile = { uid: response.user.uid, email: response.user.email, displayName: response.user.displayName, photoURL: response.user.photoURL };
//     //   //             chrome.runtime.sendMessage({ type: "SET_DOC", collection: "users", id: response.user.uid, data: profile }, () => {
//     //   //               LoginOptions.style.display = "none";
//     //   //               const UI = new SaraanshYTUI();
//     //   //               UI.createSaraanshOptions().then(options => this.loadSaraanshDom(saraanshBtn, options));
//     //   //             });
//     //   //           }
//     //   //         });
//     //   //       } else if (response && response.error) {
//     //   //         console.error("Sign in failed:", response.error);
//     //   //       }
//     //   //     });
//     //   //   });
//     //   // }

//     //   if (signInWithGoogleBtn) {
//     //     // signInWithGoogleBtn.addEventListener("click", () => {
//     //     //   console.log("*****SIGN IN BTN CLICKED*********");
//     //     //   chrome.runtime.sendMessage({ type: "GOOGLE_SIGN_IN" }, (response) => {
//     //     //     if (response.ok) {
//     //     //       // Successfully signed in
//     //     //       console.log("Signed in as:", response.email);
//     //     //       window.close(); // Close the popup after successful sign in
//     //     //     } else {
//     //     //       // Handle sign in error
//     //     //       console.error("Sign in failed:", response.error);
//     //     //       alert("Sign in failed: " + response.error);
//     //     //     }
//     //     //   });
//     //     // });
//     //   }
//     // }
//   }
//   loadSaraanshDom(saraanshBtn, saraanshOptions) {
//     saraanshBtn.addEventListener("click", () => {
//       saraanshOptions.style.display = "flex";
//     });

//     setTimeout(() => {
//       this.loadOptionDom(saraanshOptions);
//     }, 1500);
//   }

// loadOptionDom(saraanshOption) {

//   const loadingSpinner = saraanshOption.querySelector("#loadingSpinner");

//    const resArr = Array(4).fill(null);

//     /*View Html Start */
  
//     const viewPage = saraanshOption.querySelector("#viewHtml");

//     viewPage.addEventListener("click", () => {
//        console.log("indside the view Function*********"); 
//       const page = saraanshOption.querySelector("#outputHtml");
//       const pageHtmlStr = `${page.innerHTML}`;
//       chrome.runtime.sendMessage({ type: "open-preview", html: pageHtmlStr });
//     });


//     function throttle(fn, delay) {
//       let lastCall = 0;
//       return function (...args) {
//         const now = Date.now();
//         if (now - lastCall >= delay) {
//           lastCall = now;
//           return fn.apply(this, args);
//         }
//       };
//     }

//     const throttledClick = (prompt) => {
//       return new Promise(async (res, rej) => {
//         if (this.isThrottleActive) {
//           console.log("Throttle is active, ignoring click");
//           return;
//         }

//         this.isThrottleActive = true;
//         console.log("Under the Throttle");

//         try {
//           await this.handleOptionClick(prompt);
//           res();
//         } catch (error) {
//           rej("API_ERROR");
//         } finally {
//           // Set a timeout to reset the throttle
//           setTimeout(() => {
//             this.isThrottleActive = false;
//             // Re-enable all options after throttle
//             document.querySelectorAll(".option").forEach((opt) => {
//               opt.style.pointerEvents = "auto";
//               opt.style.opacity = "1";
//             });
//           }, 30 * 1000);
//         }
//       });
//     };

//     async function updateToken(value, addOrSub) {
//       const userProfile = new UserConfig();

//       // Await the stored token value
//       let tokenLeft = await UserConfig.getTokenLeft();
//       if (tokenLeft === null) tokenLeft = 0; // default if nothing stored yet

//       console.log("Current tokenLeft:", tokenLeft);

//       if (addOrSub === "sub") {
//         console.log("reducing the token");

//         if (tokenLeft > value) {
//           const newTokenVal = tokenLeft - value;
//           userProfile.setTokenLeft(newTokenVal);
//           tokenLeft = newTokenVal;
//         } else {
//           console.log("no more Token left");
//         }
//       } else {
//         const newTokenVal = tokenLeft + value;
//         userProfile.setTokenLeft(newTokenVal);
//         tokenLeft = newTokenVal;
//       }

//       console.log("Updated tokenLeft:", tokenLeft);

//       // Update the UI
//       const tokenViewEle = document.getElementById("tokenLeft");
//       if (tokenViewEle) {
//         tokenViewEle.innerText = `${tokenLeft}`;
//       }
//     }

//     document.querySelectorAll(".option").forEach((option) => {
//       option.addEventListener("click", async () => {
//         const outputContainer = saraanshOption.querySelector("#outputHtml");
//         if (!outputContainer) {
//           console.error("Output HTML container not found");
//           return;
//         }

//         if (this.isThrottleActive) {
//           console.log("Throttle active, ignoring option change");
//           return;
//         }

//         document.querySelectorAll(".option").forEach((opt) => {
//           opt.classList.remove("active");
//           opt.style.pointerEvents = "none";
//           opt.style.opacity = "0.5";
//         });

//         option.classList.add("active");
//         option.style.pointerEvents = "auto";
//         option.style.opacity = "1";

//         try {
//           let prompt, index, elementId;

//           switch (option.id) {
//             case "normal":
//               prompt = getPrompt("yt", "normal");
//               index = 0;
//               elementId = "#normalSaraansh";
//               break;
//             case "detailed":
//               prompt = getPrompt("yt", "detailed");
//               index = 1;
//               elementId = "#detailedSaraansh";
//               break;
//             case "concise":
//               prompt = getPrompt("yt", "concise");
//               index = 2;
//               elementId = "#conciseSaraansh";
//               break;
//           }

//           // If content isn't cached, generate it
//           if (!resArr[index]) {
//             const content = saraanshOption.querySelector("#outputHtml");
//             content.innerHTML = ``;
//             await throttledClick(prompt);

//             // Handling Token limit..........

//             updateToken(10, "sub");

//             // end of handeling token Limit

//             if (content) {
//               resArr[index] = content.innerHTML;
//               console.log(`${option.id} content stored`);
//             } else {
//               console.log(`${elementId} not found`);
//               outputContainer.innerHTML = `Failed to generate ${option.id} summary`;
//               return;
//             }
//           }

//           // Display the content
//           outputContainer.innerHTML = resArr[index];

//           if (resArr[index]) {
//             // Re-enable all options now that the operation is complete.
//             document.querySelectorAll(".option").forEach((opt) => {
//               opt.style.pointerEvents = "auto";
//               opt.style.opacity = "1";
//             });
//             // Ensure the current one is marked active
//             option.classList.add("active");
//             this.isThrottleActive = false;
//           }
//           console.log(
//             `${option.id} view loaded ${
//               resArr[index] ? "from cache" : "newly generated"
//             }`
//           );
//         } catch (error) {
//           console.error(`Error in ${option.id} view:`, error);
//           outputContainer.innerHTML = `Error generating ${option.id} summary`;
//         }
//       });
//     });
//   }

//   // added promise on 24 Aug 22:17

//   async handleOptionClick(promptAll) {
//     console.log("Normal Clicked");
//     return new Promise(async (res, rej) => {
//       let ai = new TalkToAIYt(promptAll, this.transcriptChunk, "outputHtml");
//       this.toggleLoading();
//       console.log("before Toggle......");
//       await ai.init();
//       console.log("under the HandleOptionClick");
//       this.toggleLoading();

//       console.log("Toggle has to be to off is off or not**************");
//       res();
//     });
//   }

//   toggleLoading() {
//     const loadingSpinner = document.getElementById("loadingSpinner");
//     if (loadingSpinner) {
//       loadingSpinner.style.display =
//         loadingSpinner.style.display === "block" ? "none" : "block";
//     }
//   }

//   createSparkles(sparkleContainer) {
//     sparkleContainer.innerHTML = "";
//     for (let i = 0; i < 12; i++) {
//       const spark = document.createElement("div");
//       spark.classList.add("spark");
//       spark.style.left = `${Math.random() * 100}%`;
//       spark.style.top = `${Math.random() * 100}%`;
//       spark.style.width = `${0.5 + Math.random() * 1.5}px`;
//       spark.style.height = `${0.5 + Math.random() * 1.5}px`;
//       spark.style.animationDelay = `${Math.random() * 0.5}s`;
//       spark.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
//       sparkleContainer.appendChild(spark);
//     }
//     sparkleContainer.classList.add("show");
//     setTimeout(() => sparkleContainer.classList.remove("show"), 1000);
//   }
// }

// // Main navigation logic
// let isInitializing = false;

// async function onYouTubeNavigation() {
//   if (isInitializing) {
//     console.log("Already initializing, skipping...");
//     return;
//   }
  
//   try {
//     isInitializing = true;
//     console.log("Video changed:", location.href);
//     const events = new SaraanshEventsYt();
//     await events.init();
//     await events.createUI();
//   } finally {
//     isInitializing = false;
//   }
// }

// function main() {
//   // Handle both initial load and navigation in one place
//   const handleNavigation = () => {
//     if (location.href.includes("watch?v=")) {
//       onYouTubeNavigation();
//     }
//   };

//   // Initial check
//   handleNavigation();
  
//   // Navigation changes
//   document.addEventListener("yt-navigate-finish", handleNavigation);
// }

// main();
