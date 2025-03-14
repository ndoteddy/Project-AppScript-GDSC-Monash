# Project-AppScript-GDSC-Monash
App script integration with Gemini API

Get The Google Doc Here For Sample Data
https://docs.google.com/spreadsheets/d/1mces2hX-KOGLCwiW66PJktqD74ktwkJkpG1xQVozyKc/edit?usp=sharing


Courier A	2025-03-15 10:00 AM	courierA@example.com	Package delivery 1	34.0522	-118.2437	12.5
Courier B	2025-03-16 1:00 PM	courierB@example.com	Package delivery 2	40.7128	-74.006	8.3
Courier C	2025-03-17 3:30 PM	courierC@example.com	Package delivery 3	51.5074	-0.1278	15.7
Courier D	2025-03-18 9:15 AM	courierD@example.com	Package delivery 4	48.8566	2.3522	6
Courier E	2025-03-19 11:45 AM	courierE@example.com	Package delivery 5	35.6895	139.6917	20.1
Courier F	2025-03-20 10:30 AM	courierF@example.com	Package delivery 6	34.0522	-118.2437	12.5
Courier G	2025-03-21 2:00 PM	courierG@example.com	Package delivery 7	40.7128	-74.006	8.3
Courier H	2025-03-22 11:00 AM	courierH@example.com	Package delivery 8	51.5074	-0.1278	15.7
Courier A	2025-03-23 3:45 PM	courierA@example.com	Package delivery 9	48.8566	2.3522	6
Courier B	2025-03-24 1:15 PM	courierB@example.com	Package delivery 10	35.6895	139.6917	20.1
Courier C	2025-03-25 8:00 AM	courierC@example.com	Package delivery 11	55.7558	37.6173	10.8
Courier A	2025-03-26 4:00 PM	courierA@example.com	Package delivery 12	-33.4489	-70.6693	5.2
Courier A	2025-03-27 9:30 AM	courierA@example.com	Package delivery 13	39.9042	116.4074	14.4
Courier B	2025-03-28 6:00 PM	courierB@example.com	Package delivery 14	-34.6037	-58.3816	3.7
Courier C	2025-03-29 12:15 PM	courierC@example.com	Package delivery 15	37.7749	-122.4194	7.9


=analyzeWithGeminiApiKey("A2:G16",B25,"courier")



which courier has the most task	"Let's count the number of tasks for each courier:

*   **Courier A:** 4 tasks
*   **Courier B:** 3 tasks
*   **Courier C:** 3 tasks
*   **Courier D:** 1 task
*   **Courier E:** 1 task
*   **Courier F:** 1 task
*   **Courier G:** 1 task
*   **Courier H:** 1 task

Therefore, **Courier A** has the most tasks with 4."