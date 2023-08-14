from fastapi import APIRouter, Depends, Request, Response
from models import AccountToken, AccountIn
from queries.accounts import AccountQueries
from authenticator import authenticator

router = APIRouter()

@router.post('/api/accounts', response_model=AccountToken)
def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    queries: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password),
    account = queries.create(info)
    
    
