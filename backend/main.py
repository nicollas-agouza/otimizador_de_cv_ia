def main():
    print("Hello from backend!")


if __name__ == "__main__":
    main()

from fastapi import FastAPI
from app.core.api import router as analysis_router

app = FastAPI()

app.include_router(analysis_router, prefix="/api", tags=["Analysis"])
