// AI MODEL GENERATION
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyANIxClowOyTW9srm3LH6yecVyB17T6JBo";

async function generateContent(userData,outputType) {

    let promptText = ``;

    if(outputType === "mcq"){
    promptText = `Given the following text: "${userData}", generate 5 multiple-choice questions with 4 options each, and indicate the correct answer. And return the result in the form of an array holding objects with properties Question, Options in form of array, correctAnswer`;
    }else if(outputType === "summary"){
        promptText = `Given the following text: "${userData}", generate summary over given userData`;
    }else if(outputType === "fill"){
       promptText = `Given the following text: "${userData}", generate 5 fill in the blanks questions, and indicate the correct answer. And return the result in the form of an array holding objects with properties Question, correctAnswer`; 
    }


    try {
        const genAi = new GoogleGenerativeAI(API_KEY);
        const modelUsed = genAi.getGenerativeModel({ model:"gemini-1.5-flash"});

        const result = await modelUsed.generateContent(promptText);
        const response = await result.response;
        const text = response.text();
        if(outputType === "mcq" || outputType === "fill"){
            let modifiedText = JSON.parse(text.replace("```json", "").replace("```", "") .trim());
            return modifiedText;
        }else{
             return text;
        }
   
}catch(err){
    console.log(err);
}
}
// ------------------------------------------------------------------------

// FILE UPLOAD PART :

let data = "";

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const fileInput = document.querySelector(".fileinput");

fileInput.addEventListener("change",async(event)=>{

    const file = event.target.files[0]
    if (!file){
        alert("Add file");
        return;
    } 

  const reader = new FileReader();

  reader.onload = async function () {
    const typedArray = new Uint8Array(this.result);

    const pdf = await pdfjsLib.getDocument(typedArray).promise;
    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items.map(item => item.str).join(" ");
      fullText += `${pageText}`;
    }
    
    data = fullText;
  };

  reader.readAsArrayBuffer(file);

  fileInput.style.display = "none";

  const fileLabel = document.querySelector(".custombutton");
  fileLabel.style.display = "none";

  const crossfile = document.querySelector(".crossFile");
  crossfile.style.display = "none";


  let generateBtnFile = document.querySelector(".generatebyfile");

  generateBtnFile.style.display = "inline-block";
   requestAnimationFrame(() => {
      generateBtnFile.classList.add("popin");
    });

})
// ----------------------------------------------------------------------------------------

// CLEAR BUTTONS FOR PAGE RELOAD :
const clearBtn1 = document.querySelector(".clearbtn1");
clearBtn1.addEventListener("click",(event)=>{
    event.preventDefault();
    location.reload();
})


const clearBtn2 = document.querySelector(".clearbtn2");
clearBtn2.addEventListener("click",(event)=>{
    event.preventDefault();
    location.reload();
})
// ------------------------------------------------------------------------------------------


// ANIMATION FOR CROSS MARK :

// FILE CROSS MARK :
const fileDiv = document.querySelector(".div2sub2");

const textDiv = document.querySelector(".div2sub1")

const upload = document.querySelector(".fileinput");

const crossFile = document.querySelector(".crossFile");

crossFile.addEventListener("click",(event)=>{
    event.preventDefault();
     textDiv.style.display = "flex";
     fileDiv.classList.remove("enlarge1");
     crossFile.style.display = "none";

    const sec2 = document.querySelector(".Sec2");
    sec2.classList.remove("g1");
    sec2.style.height = "60vh";

    const sec2div2 = document.querySelector(".sec2div2");
    sec2div2.classList.remove("g2");
    sec2div2.style.height = "80%";

    const sec2Emp1 = document.querySelector(".sec2Emp1");
    sec2Emp1.classList.remove("g3");
    sec2Emp1.style.height = "100%";

    const sec2Emp2 = document.querySelector(".sec2Emp2");
    sec2Emp2.style.display = "none";


    const textGenerate = document.querySelector(".generatebytext");
    textGenerate.style.display = "none";

})

upload.addEventListener("click",()=>{
    textDiv.style.display = "none";
    fileDiv.classList.add("enlarge1");
    crossFile.style.display = "inline-block";
    crossFile.style.left = "88em" 
})
// ------------------------------------------------

// TEXT CROSS MARK :
const plainText = document.querySelector(".textArea");

const crossText = document.querySelector(".crossText");

crossText.addEventListener("click",(event)=>{
    event.preventDefault();
    fileDiv.style.display = "flex";
    textDiv.classList.remove("enlarge2")
    crossText.style.display = "none";

    const sec2 = document.querySelector(".Sec2");
    sec2.classList.remove("g1");
    sec2.style.height = "60vh";

    const sec2div2 = document.querySelector(".sec2div2");
    sec2div2.classList.remove("g2");
    sec2div2.style.height = "80%";

    const sec2Emp1 = document.querySelector(".sec2Emp1");
    sec2Emp1.classList.remove("g3");
    sec2Emp1.style.height = "100%";

    const sec2Emp2 = document.querySelector(".sec2Emp2");
    sec2Emp2.style.display = "none";

})

plainText.addEventListener("focus",()=>{
    fileDiv.style.display = "none";
    textDiv.classList.add("enlarge2");
    crossText.style.display = "inline-block";
    crossText.style.left = "88em";
})

// ----------------------------------------------------------------------------------------------

// GENERATE BUTTON ON TEXT INPUT :

const textGenerate = document.querySelector(".generatebytext");

textGenerate.addEventListener("click",(event)=>{
    event.preventDefault();

    const sec2 = document.querySelector(".Sec2");
    sec2.classList.add("g1");

    const sec2div2 = document.querySelector(".sec2div2");
    sec2div2.classList.add("g2");

    const sec2Emp1 = document.querySelector(".sec2Emp1");
    sec2Emp1.classList.add("g3");

    const sec2Emp2 = document.querySelector(".sec2Emp2");
    sec2Emp2.style.display = "flex";
})
// ---------------------------------------------------------------------------------------------------

// GENERATE BUTTON ON FILE INPUT :
const fileGenerate = document.querySelector(".generatebyfile");

fileGenerate.addEventListener("click",(event)=>{
    event.preventDefault();

    const sec2 = document.querySelector(".Sec2");
    sec2.classList.add("g1");

    const sec2div2 = document.querySelector(".sec2div2");
    sec2div2.classList.add("g2");

    const sec2Emp1 = document.querySelector(".sec2Emp1");
    sec2Emp1.classList.add("g3");

    const sec2Emp2 = document.querySelector(".sec2Emp2");
    sec2Emp2.style.display = "flex";
})
// -------------------------------------------------------------------------------

// SUMIT BUTTON ON TEXT INPUT :
const submitText = document.querySelector(".textbutton");

const textArea = document.querySelector(".textArea");

submitText.addEventListener("click",()=>{

const crossText = document.querySelector(".crossText");
crossText.style.display = "none";

submitText.style.display = "none";

textArea.classList.add("dis");


const btnTogenerateText = document.querySelector(".generatebytext");

    const text = textArea.value;

    if(text != ""){
        data = text;
        textArea.value = "";
     btnTogenerateText.style.display = "inline-block";
      requestAnimationFrame(() => {
      btnTogenerateText.classList.add("popin");
    });
    }else{
        alert("Add text to generate");
        location.reload();
    }
})
// ----------------------------------------------------------------------------------------------

let demoResult;

let demoValue;


// GENRATING MCQ,FILLS,SUMMARY :

const generatingSummary = document.querySelector(".summarybtn");

const generateFills = document.querySelector(".fillsbtn");

const generateMcq = document.querySelector(".mcqbtn");



// MCQ PART

generateMcq.addEventListener("click",async ()=>{
    
const Sec3 = document.querySelector(".Sec3");
Sec3.style.display = "flex";


generatingSummary.style.display = "none";
generateFills.style.display = "none";

generateMcq.classList.add("grow")

const section3 = document.querySelector(".Sec3");
section3.style.display = "flex";

let counter = 1;

const value = generateMcq.value;

if(data === ""){
    alert("Add Text to generate");
    location.reload(true);
    return;
}

const result = await generateContent(data,value);

demoResult = result;
demoValue = value;


let form = document.querySelector(".questionform");

let submitDiv = document.querySelector(".submitDiv");


result.forEach((curr)=>{

let div = document.createElement("div");
div.classList.add("QuestionDiv");
form.insertBefore(div,submitDiv);

let h3 = document.createElement("h3");
h3.textContent = curr.Question;
div.appendChild(h3);




curr.Options.forEach((current)=>{

let outerLabel = document.createElement("label");
outerLabel.classList.add("ques");
outerLabel.setAttribute("for",counter+""+curr.Options.indexOf(current));
div.appendChild(outerLabel)

let input = document.createElement("input");
input.setAttribute("type","radio");
input.setAttribute("name","q"+counter);
input.setAttribute("value",current);
input.setAttribute("id",counter+""+curr.Options.indexOf(current));
outerLabel.appendChild(input);

let innerLabel = document.createElement("label");
innerLabel.setAttribute("for",counter+""+curr.Options.indexOf(current));
innerLabel.textContent = current;
outerLabel.appendChild(innerLabel);
})
counter++;
})

const sec3h1 = document.querySelector(".sec3h1");
sec3h1.textContent = "QuizCraft";

submitDiv.style.display = "flex";


},{ once: true })

// -------------------------------------------------------------------------------------------

// FILLS PART
generateFills.addEventListener("click",async ()=>{

const Sec3 = document.querySelector(".Sec3");
Sec3.style.display = "flex";

let fillCounter = 1;

generatingSummary.style.display = "none";
generateMcq.style.display = "none";

generateFills.classList.add("grow");

const section3 = document.querySelector(".Sec3");
section3.style.display = "flex";

const value = generateFills.value;

const result = await generateContent(data,value);
demoResult = result;
demoValue = value;

let form = document.querySelector(".questionform");

let submitDiv = document.querySelector(".submitDiv");


result.forEach((curr)=>{

let div = document.createElement("div");
div.classList.add("QuestionDiv");
form.insertBefore(div,submitDiv);

let h3 = document.createElement("h3");
h3.textContent = curr.Question;
div.appendChild(h3);

let textArea = document.createElement("textarea");
textArea.classList.add("fillarea");
textArea.setAttribute("name","Q"+fillCounter);
textArea.setAttribute("id",fillCounter);
textArea.setAttribute("placeholder","Answer")
div.appendChild(textArea);
fillCounter++;
})

const sec3h1 = document.querySelector(".sec3h1");
sec3h1.textContent = "QuizCraft";


 submitDiv.style.display = "flex";
},{ once: true })
// --------------------------------------------------------------------------
// SUMMARY PART :
generatingSummary.addEventListener("click",async ()=>{

const Sec3 = document.querySelector(".Sec3");
Sec3.style.display = "flex";

generateFills.style.display = "none";
generateMcq.style.display = "none";

generatingSummary.classList.add("grow");

const section3 = document.querySelector(".Sec3");
section3.style.display = "flex";
section3.style.width = "auto";

const value = generatingSummary.value;

const result = await generateContent(data,value);


let form = document.querySelector(".questionform");
form.style.display = "none";

let outerMostDiv = document.querySelector(".sec3div3");

let paraDiv = document.createElement("div");
paraDiv.classList.add("summaryPara");

let para = document.createElement("p");
para.textContent = result;
paraDiv.appendChild(para);

outerMostDiv.appendChild(paraDiv);

let exitSummary = document.createElement("button");
exitSummary.classList.add("exitBtn");
exitSummary.textContent = "EXIT";
exitSummary.style.margin = "auto";
paraDiv.appendChild(exitSummary)
 exitSummary.addEventListener("click",()=>{
        location.reload(true);
    })

const sec3h1 = document.querySelector(".sec3h1");
sec3h1.textContent = "QuizCraft";
sec3h1.classList.add("")


},{ once: true });
// -------------------------------------------------------------------------------------

// SUBMIT BUTTON AFTER QUIZ :
let submitBtn = document.querySelector(".formSubmit");

let questionForm = document.querySelector(".questionform");

let score = 0;

submitBtn.addEventListener("click",(event)=>{


    event.preventDefault();
    let q1Ans;
    let q2Ans;
    let q3Ans;
    let q4Ans;
    let q5Ans;
    if(demoValue === "mcq"){
        try{
         q1Ans = document.querySelector(`input[name="q1"]:checked`).value;
         q2Ans = document.querySelector(`input[name="q2"]:checked`).value;
         q3Ans = document.querySelector(`input[name="q3"]:checked`).value;
         q4Ans = document.querySelector(`input[name="q4"]:checked`).value;
         q5Ans = document.querySelector(`input[name="q5"]:checked`).value;
        }catch(err){
            if(err){
                  alert("Please Select the answer");
                  return;
            }
        }
        
        if(q1Ans === demoResult[0].correctAnswer){
            score++;
        }
        if(q2Ans === demoResult[1].correctAnswer){
            score++;
        }
        if(q3Ans === demoResult[2].correctAnswer){
            score++;
        }
        if(q4Ans === demoResult[3].correctAnswer){
            score++;
        }
        if(q5Ans === demoResult[4].correctAnswer){
            score++;
        }
    }else if(demoValue === "fill"){

        let Q1Ans;
        let Q2Ans;
        let Q3Ans;
        let Q4Ans;
        let Q5Ans;

        
        Q1Ans = document.querySelector(`textarea[name="Q1"]`).value;
        Q2Ans = document.querySelector(`textarea[name="Q2"]`).value;
        Q3Ans = document.querySelector(`textarea[name="Q3"]`).value;
        Q4Ans = document.querySelector(`textarea[name="Q4"]`).value;
        Q5Ans = document.querySelector(`textarea[name="Q5"]`).value;

        if(Q1Ans === "" || Q2Ans === "" || Q3Ans === "" || Q4Ans === "" || Q5Ans === ""){
            alert("Please fill the Answer");
            return;
        }


        if(Q1Ans === demoResult[0].correctAnswer){
            score++;
        }
        if(Q2Ans === demoResult[1].correctAnswer){
            score++;
        }
        if(Q3Ans === demoResult[2].correctAnswer){
            score++;
        }
        if(Q4Ans === demoResult[3].correctAnswer){
            score++;
        }
        if(Q5Ans === demoResult[4].correctAnswer){
            score++;
        }
    }

    let h1Div = document.querySelector(".sec3h1");
    h1Div.style.display = "none";

    questionForm.classList.replace("fade-in", "fade-out");
    
    questionForm.addEventListener("transitionend",function removeForm(){
        questionForm.remove();
        questionForm.removeEventListener("transitionend",removeForm);
    })

    let sec3Div = document.querySelector(".sec3div3");
    sec3Div.style.height = "198px";

    let resultDiv = document.createElement("div");
    resultDiv.classList.add("resultDiv");
    resultDiv.classList.add("fade-in");
    sec3Div.appendChild(resultDiv);


    let scorePara = document.createElement("h1");
    scorePara.textContent = `Score : ${score}/5`;
    scorePara.classList.add("scorePara")
    resultDiv.appendChild(scorePara);


    let scoreDiv = document.createElement("div");
    scoreDiv.classList.add("scoreDiv");
    resultDiv.appendChild(scoreDiv);

    let exportBtn = document.createElement("button");
    exportBtn.textContent = "EXPORT";
    exportBtn.classList.add("exportBtn");
    scoreDiv.appendChild(exportBtn);
// -----------------------------------------------------------------------------------------------
// Export to PDF :
exportBtn.addEventListener("click",async()=>{
        const {jsPDF} = window.jspdf;
        const doc = new jsPDF;

        doc.setFontSize(18);
        doc.text("QuizCraft", 105, 15, { align: "center" });

        let y = 30;

        if(demoValue === "mcq"){
            demoResult.forEach((q,index)=>{
            doc.setFontSize = 12;
            doc.text(`${index + 1} ${q.Question}`,10,y);
            y+=7;

            q.Options.forEach((opt,i)=>{
                const Letter = String.fromCharCode(65 + i);
                doc.text(`${Letter} ${opt}`,15,y);
                y+=6;
            })

            doc.text(`Correct Answer :${q.correctAnswer}`,15,y);
            y+=10;
            if(y>270){
                doc.addPage();
                doc.setFontSize(18);
                doc.text("QuizCraft", 105, 15, { align: "center" });
                y = 30;
            }
        })
        }else if(demoValue === "fill"){

            demoResult.forEach((q,index)=>{
            doc.setFontSize = 12;
            doc.text(`${index + 1} ${q.Question}`,10,y);
            y+=7;


            doc.text(`Correct Answer :${q.correctAnswer}`,15,y);
            y+=10;

            if(y>270){
                doc.addPage();
               doc.setFontSize(18);
                doc.text("QuizCraft", 105, 15, { align: "center" });
                y = 30;
            }
        })
        

        }

       
        doc.save("QuizCraft.pdf");

    })
    // -------------------------------------------------------------------------------------------

    // EXIT BUTTON
    let exitBtn = document.createElement("button");
    exitBtn.textContent = "EXIT";
    exitBtn.classList.add("exitBtn");
    scoreDiv.appendChild(exitBtn);
    exitBtn.addEventListener("click",()=>{
        location.reload(true);
    })
    

})
// -------------------------------------------------------------------------------------


// BAISC DOM MANUPULATION :
let generateButton1 = document.querySelector(".generatebytext");

let generateButton2 = document.querySelector(".generatebyfile")


// Elements on textButton Event :
let section2 = document.querySelector(".Sec2");

let mainDiv = document.querySelector(".sec2div2");

let emp1Div = document.querySelector(".sec2Emp1");

let emp2Div = document.querySelector(".sec2Emp2");



generateButton1.addEventListener("click",(event)=>{
    event.preventDefault();
    section2.style.height="100vh";
    mainDiv.style.height = "95%";
    emp1Div.style.height = "50%";
    emp2Div.style.display = "flex";
})

generateButton2.addEventListener("click",(event)=>{
    event.preventDefault();
    section2.style.height="100vh";
    mainDiv.style.height = "95%";
    emp1Div.style.height = "50%";
    emp2Div.style.display = "flex";
})

// -------------------------------------------------------------------------------------

// FOOTER DOM :

const feedbtn = document.querySelector(".feedbtn");
const feedtext = document.querySelector(".feedtext");

feedbtn.addEventListener("click",(event)=>{
    event.preventDefault();
    feedtext.value= "";
    alert("Thanks for the feedBack")
})
// -----------------------------------------------END-----------------------------------------