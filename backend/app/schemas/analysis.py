from pydantic import BaseModel
from typing import Dict
from datetime import datetime

class AnalysisResultCreate(BaseModel):
    filename: str
    result_data: Dict
    metrics: Dict

class AnalysisResultResponse(BaseModel):
    id: int
    filename: str
    result_data: Dict
    metrics: Dict
    created_at: datetime

    class Config:
        orm_mode = True
