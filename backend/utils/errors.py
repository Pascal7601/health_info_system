from fastapi import HTTPException, status


class HTTPError:
  @staticmethod
  def bad_request(detail: str = "Bad request"):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)

  @staticmethod
  def unauthorized(detail: str = "Unauthorized"):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=detail)


  @staticmethod
  def not_found(detail: str = "Not found"):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=detail)

  @staticmethod
  def internal_server_error(detail: str = "Internal server error"):
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)