from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.services import save_analysis
from app.core.schemas import AnalysisResultResponse
from app.core.auth import get_current_user  # ajuste conforme seu auth

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResultResponse)
async def analyze_file(
    file: UploadFile = File(...),
    result_data: dict = {},
    metrics: dict = {},
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    analysis = save_analysis(
        db=db,
        user_id=current_user["id"],
        file=file,
        result_data=result_data,
        metrics=metrics
    )
    return analysis
