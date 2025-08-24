from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.utils.jwt import create_access_token
from app.schemas.auth import Token
from datetime import timedelta

router = APIRouter()

@router.post("/login", response_model=Token)
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not user.verify_password(password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    access_token = create_access_token(
        data={"user_id": user.id},
        expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer"}

    from app.api.dependencies import get_current_user

@router.get("/protegido")
def rota_protegida(current_user: dict = Depends(get_current_user)):
    return {"msg": f"Olá, usuário {current_user['user_id']}"}

