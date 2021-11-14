import { Friend } from "src/utils/base/base.entity";
import utilsFunction from "src/utils/utilsFunction/utilsFunction";

const userHelper = {
  checkUserIdInFriendList(friends: Friend[], userId: string) {
    for (let i = 0 ; i < friends.length ; i++) {
      if (utilsFunction.compareId(friends[i].friendId, userId)) {
        return true;
      }
    }
    return false;
  },
};

export default userHelper;
