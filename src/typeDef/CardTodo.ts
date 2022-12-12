export interface CardTodo {
    id : number|string,
    status : "BACKLOG"|"INPROGRESS"|"DONE",
    title : string ,
    content : string,
    priority : 1|2|3
    estimate : string,
    // assign : number,
    createdAt : string,
  }
export interface CardAssign extends CardTodo {
    userIds : number[]|string[]
}