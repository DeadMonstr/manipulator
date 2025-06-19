import {CharacterSchema} from "feature/character/model/characterSlice";
import {UserSchema} from "entity/user/model/userSlice";
import {historyApi} from "entity/history/model/historyApi";

export interface StateSchema {
    character: CharacterSchema;
    user: UserSchema;
    [historyApi.reducerPath]: ReturnType<typeof historyApi.reducer>;
}


