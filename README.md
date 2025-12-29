# 🔗 Node-Based Pipeline Builder (React + FastAPI)

A visual drag-and-drop pipeline builder inspired by LangFlow and Zapier.

## ✨ Features
- Drag & drop nodes (Input, Text, Output, LLM)
- Dynamic variable substitution using `{{variable}}`
- DAG validation (cycle detection)
- Backend execution using FastAPI
- Real-time output rendering
- Custom ReactFlow nodes with Zustand state

## 🛠 Tech Stack
### Frontend
- React
- ReactFlow
- Zustand

### Backend
- FastAPI
- Python

## 🚀 How to Run

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install fastapi uvicorn
uvicorn main:app --reload
