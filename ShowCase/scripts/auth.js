export var userID = 3;
export var currentGroup = 0;

export function setCurrentGroup(id){
    currentGroup = id;
}

export function getCurrentGroup(){
    return currentGroup;
}

export function isAuthUserId(id){
    return id == userID;
}