from pydantic import BaseModel


class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str

class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountOutWithHashedPassword(AccountOut):
    pass

class AccountQueries():
    # region properties

    def get(self, email: str) -> AccountOut:
        account = self.collection.find_one({'username': email})
        if account is None:
            return None
        account['id'] = str(account['_id'])
        return AccountOutWithHashedPassword(**account)


    def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
        account_in = account_in.dict()
        if self.get(account_in['username']) is not None:
            raise DuplicateAccountError
        account_in['hashed_password'] = hashed_password
        del account_in['password']
        self.collection.insert_one(account_in)
        account_in['id'] = str(account_in['id'])
        return AccountOutWithHashedPassword(**account_in)
