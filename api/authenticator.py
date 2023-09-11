import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries
from models import AccountOut, AccountOutWithHashedPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithHashedPassword):
        return account.hashed_password

    def get_account_data_for_cookie(
        self, account: AccountOutWithHashedPassword
    ):
        return account.username, AccountOut(**account.dict())


authenticator = MyAuthenticator(os.environ["8561AEF9223AD68F607B7EDD6636E123"])
