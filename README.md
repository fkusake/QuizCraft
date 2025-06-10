QUIZ CRAF DOCUMENTATION



INTRODUCTION:

Quizcraft is a lightweight, client-side web app that uses AI to generate interactive quizzes (MCQs, Fill-in-the-Blanks, and summaries) from user-provided text or PDF documents. Built with HTML, CSS, and JavaScript, it’s designed to simplify learning and self-testing.



FEATURES:
•
Upload `.pdf` files.
•
Uses Gemini AI to generate: Multiple Choice Questions (MCQs) , Fill-in-the-Blanks (FIBs), Summaries.
•
Dynamic UI rendering using DOM.
•
Export MCQs, FIBs, and Summaries as PDFs.
•
Smooth transitions and animations.
•
Test mode and study mode supported.




TECH STACK:
•
HTML5, CSS3, JavaScript (Vanilla).
•
[Google Gemini API](https://ai.google.dev/).
•
[jsPDF](https://github.com/parallax/jsPDF) – For generating PDFs.
•
[pdf.js](https://mozilla.github.io/pdf.js/) – For reading PDF content.
PROJECT STRUCTURE:
•
quizcraft/
•
index.html # Main UI.
•
index.css # Styling for all sections.
•
index.js # Main logic (upload, parse, render, export).




HOW TO USE:
1. Open `index.html` in a browser.
2. Upload a `.pdf` file using the upload button.
3. Click one of the generation options:
Generate MCQs
Generate Fill-in-the-Blanks
Generate Summary
4. Interact with the quiz:
Select answers (MCQs)
View feedback
5. Use `Download PDF` buttons to export content.
Dependencies
These libraries are loaded via CDN in the project:
jsPDF: for PDF export
-pdf.js: for reading PDFs client-side
Make sure your HTML includes:
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>


OUTPUT:
•
MCQS:
1. What is the process where water vapor turns into liquid?
A. Evaporation
B. Condensation
Etc.
•
FILL IN THE BLANKS:
The process of plants releasing water vapor is called ________.
Answer: Transpiration





FUTURE ENHANCEMENTS:
•
User login and saved sessions.
•
Mobile-first UI redesign.
•
Text-to-speech questions.




AUTHOR:
Made with by Gagan Deep
•
Email: [your.email@example.com]
•
GitHub: [github.com/your-profile]
•
Powered by: Google Gemini API




LINCENSE:
This project is open source and free to use.