from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from jose import jwt, JWTError
from backend.core.config import settings

class JWTAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Exclude public endpoints like login and health
        public_paths = ["/api/v1/auth/login", "/api/v1/system/health", "/docs", "/openapi.json"]
        if request.url.path in public_paths or request.url.path.startswith("/static"):
            return await call_next(request)

        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            # Let FastAPI dependency handlers enforce strict 401 response if needed
            return await call_next(request)

        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            request.state.user_id = payload.get("sub")
        except JWTError:
            pass

        response = await call_next(request)
        return response
