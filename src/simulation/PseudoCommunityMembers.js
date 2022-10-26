const randomNum = (minNum, maxNum) => {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
};

const CommunityMember = {
  name: "",
  personality: "",
  address: [],
  amenitiesNeeded: {},
  voteForIncentive: () => {
    return randomNum(0, 10);
  },
  voteForEndowment: () => {
    return randomNum(0, 16);
  },
};

const createCommunityMember = (name, personality, address, amenitiesNeeded) => {
  let member = Object.create(CommunityMember);
  member.name = name;
  member.personality = personality;
  member.address = address;
  member.amenitiesNeeded = amenitiesNeeded;

  return member;
};
