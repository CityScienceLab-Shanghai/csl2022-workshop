const CommunityMember = {
    name:"",
    personality:"",
    address:[],
    amenitiesNeeded:{},
    vote: () => {}
}

const createCommunityMember = (
    name,
    personality,
    address,
    amenitiesNeeded
) => {
    let member = Object.create(CommunityMember);
    member.name = name;
    member.personality = personality;
    member.address = address;
    member.amenitiesNeeded = amenitiesNeeded;

    return member;
}